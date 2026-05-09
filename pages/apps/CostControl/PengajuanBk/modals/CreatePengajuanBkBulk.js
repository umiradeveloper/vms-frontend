import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";
import { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import DataTable from "react-data-table-component";
import BasicTableCostControl from "../../../DataTables/DataTablesCostControl";

import * as XLSX from "xlsx";

const Select = dynamic(() => import("react-select"), { ssr: false });


const CreatePengajuanBkBulk = ({ openModal, setOpenModal }) => {
    const [loader, setLoader] = useState(false);
    const [rapa, setRapa] = useState([]);
    const [userApprover, setUserApprover] = useState([]);
    const [dataPengajuanBk, setdataPengajuanBk] = useState({
        id_pengajuan_bk: "",
        id_proyek: "",
        catatan: "",
        id_user: []
    });
    const [arrBk, setArrBk] = useState([]);
    const [dataProyek, setDataProyek] = useState({});

    const [dataTable, setDataTable] = useState([]);

    const COLUMNS = [
        {
            Header: "Cost Code",
            accessor: "cost_code",
        },
        {
            Header: "Tanggal",
            accessor: "tanggal",
        },
        {
            Header: "Kategori",
            accessor: "kategori",
        },
       
        {
            Header: "Nama",
            accessor: "nama",
        },
       
        // {
        //     Header: "Spesifikasi",
        //     accessor: "spesifikasi",
        // },
        {
            Header: "satuan",
            accessor: "satuan",
        },
        {
            Header: "Volume",
            accessor: "volume",
        },
        {
            Header: "Harga Satuan",
            accessor: "harga_satuan",
        },
        {
            Header: "Harga Total",
            accessor: "harga_total",
        },
        {
            Header: "Invoice Nota",
            accessor: "invoice_nota",
        },
        {
            Header: "NO PO",
            accessor: "no_po",
        },
    ];

     const excelDateToSQL = (value) => {
        if (!value) return null;

        if (typeof value === "string") {
            const d = new Date(value);
            return isNaN(d) ? null : d.toISOString().split("T")[0];
        }

        if (typeof value === "number") {
            const excelEpoch = new Date(Date.UTC(1899, 11, 30));
            const jsDate = new Date(excelEpoch.getTime() + value * 86400000);
            return jsDate.toISOString().split("T")[0];
        }

        return null;
    };

     const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
    };
    
    const formatdate = (tanggal) =>
        new Date(tanggal).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
    );
    const formatPercent = (value, digits = 2) => `${Number(value).toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
    const calcPercentage = (part, total) => {
        const t = Number(total) || 0;
        if (t === 0) return 0;
        const p = (Number(part) / t) * 100;
        return p;
    };

    const calcRabAkhir = (rab, kerjaKurang, kerjaTambah) => {
        const r = Number(rab) || 0;
        const kk = Number(kerjaKurang) || 0;
        const kt = Number(kerjaTambah) || 0;
        return r - kk + kt;
    };

    const getRapa = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Rapa/get-rapa-proyek?id_proyek=" + openModal.id_proyek, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status == 200) {
                if (result.data.data.length > 0) {
                    const rapaArr = [];
                    for (const res of result.data.data) {
                        rapaArr.push({
                            value: res.id_rapa,
                            label: res.kode_rap + " | " + res.kategori + " | " + res.item_pekerjaan
                        })
                    }
                    setRapa(rapaArr);
                }

                // console.log(result.data)
                setLoader(false);
            }
        } catch (e) {
            setLoader(false);
            console.log("e = " + e);
        }
    }

    const getUserApprover = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const res = await apiConfig.get(apiUrl + "/users/all/staff", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(res);
            if (res.status === 200) {
                const userArr = res.data.data.map(u => ({
                    value: u.id_user,
                    label: u.username
                }));
                setUserApprover(userArr);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const submitDataPengajuanBk = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const id_users = [];
        const urutan = [];
        const cost_code = [];
        const invoice_nota = [];
        const no_po = [];
        const volume_bk = [];
        const harga_total = [];
        const tanggal_penerima = [];
        dataPengajuanBk.id_user.forEach(element => {
            id_users.push(element.id_user);
            urutan.push(element.urutan);
        });
        arrBk.forEach(element => {
            cost_code.push(element.cost_code);
            invoice_nota.push(element.invoice_nota);
            no_po.push(element.no_po);
            volume_bk.push(element.volume);
            harga_total.push(element.total_harga);
            tanggal_penerima.push(element.tanggal);
        })
        const dataSubmit = {
            id_proyek: openModal.id_proyek,
            cost_code,
            invoice_nota,
            no_po,
            volume_bk,
            harga_total,
            tanggal_penerima,
            // id_rapa: dataPengajuanBk.id_rapa,
            // nama_vendor: dataPengajuanBk.nama_vendor,
            // volume_bk: dataPengajuanBk.volume_bk,
            // harga_total: cleanCurrency(dataPengajuanBk.harga_total),
            // nama_penerima: dataPengajuanBk.nama_penerima,
            // tanggal_penerima: dataPengajuanBk.tanggal_penerima,
            id_user: id_users,
            urutan: urutan,
            catatan: dataPengajuanBk.catatan
        }


        try {
            const result = await apiConfig.post(apiUrl + "/CostControl/pengajuan/create-pengajuan-bk-bulk", dataSubmit, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status == 200) {


                // console.log(result)
                swalAlert(result.data.message, result.statusText, "success");

                setLoader(false);
                setOpenModal({ ...openModal, open_modal: false });
            }
        } catch (e) {
            setLoader(false);
            console.log("e = " + e);
        }
    }
    const cleanCurrency = (value) => {
        if (!value) return 0;

        return Number(
            value
                .replace(/[^0-9]/g, "") // hapus semua selain angka
        );
    };

    const swalAlert = (message, title, icon) => {
        let timerInterval;

        Swal.fire({
            title: title,
            html: message,
            icon: icon,
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
    }
     const handleFile = async(e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        setLoader(true);
        reader.onload = async(evt) => {
            const bstr = evt.target.result;
            // const workbook = XLSX.read(bstr, { type: "binary" });
            const workbook = await XLSX.read(bstr, { type: "binary" });

            const sheetName = workbook.SheetNames[0]; // sheet pertama
            const sheet = workbook.Sheets[sheetName];

            // const jsonData = XLSX.utils.sheet_to_json(sheet);
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            // setData(jsonData);
            // console.log(jsonData);
            const arrUpload = [];
            const normalized = jsonData.map(row => {
                const newRow = {};
                Object.keys(row).forEach(key => {
                    const cleanKey = key.trim();  // hilangkan spasi
                    newRow[cleanKey] = row[key];
                });
                return newRow;
            });
            const costCodeUpload = [];
            const mergeArrayUpload = [];
            // console.log(normalized)
           for(const data of normalized){
            if(data["Cost Code"]){
                
                costCodeUpload.push((data["Cost Code"])?data["Cost Code"]:"")
                mergeArrayUpload.push({
                    cost_code: (data["Cost Code"])?data["Cost Code"]:"",
                    tanggal: (data["TANGGAL"])?excelDateToSQL(data["TANGGAL"]):"",
                    no_po: (data["NO PO"])?data["NO PO"]:"",
                    invoice_nota: (data["INVOICE NOTA"])?data["INVOICE NOTA"]:"",
                    volume: (data["VOLUME"])?data["VOLUME"]:"",
                    harga_satuan: (data["HARGA SATUAN"])?data["HARGA SATUAN"]:"",
                    total_harga: (data["TOTAL HARGA"])?data["TOTAL HARGA"]:""
                })
            }
            // console.log(data)
            // console.log(data["ITEM PEKERJAAN"])
            // if(data["ITEM PEKERJAAN"]){
            //     arrUpload.push({
            //         kode_rap: (data["KODE RAP"])?data["KODE RAP"]:"",
            //         kategori: (data["KATEGORI"])?data["KATEGORI"]:"",
            //         item_pekerjaan: (data["ITEM PEKERJAAN"])?data["ITEM PEKERJAAN"]:"",
            //         spesifikasi: (data["SPESIFIKASI"])?data["SPESIFIKASI"]:"",
            //         satuan: (data["SAT"])?data["SAT"]:"",
            //         volume: (data["VOLUME"])?data["VOLUME"]:"",
            //         harga_satuan: (data["HARGA SATUAN"])?toCurrency(data["HARGA SATUAN"]):"",
            //         harga_total: (data["TOTAL HARGA"])?toCurrency(data["TOTAL HARGA"]):"",
            //         harga_satuan_ori: (data["HARGA SATUAN"])?data["HARGA SATUAN"]:"",
            //         harga_total_ori: (data["TOTAL HARGA"])?data["TOTAL HARGA"]:"",
            //     });
            // }
             
           }
        //    console.log(costCodeUpload)
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                try {
                    const result = await apiConfig.post(apiUrl + "/CostControl/BiayaKonstruksi/get-cost-code-rapa", {CostCode: costCodeUpload},{
                        params:{
                            id_proyek: openModal.id_proyek
                        },  
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    
                    if(result.data.data.length > 0){
                        const merged = mergeArrayUpload.map(a => {
                            const match = result.data.data.find(b => String(b.cost_code).trim() === String(a.cost_code).trim());
                            return {
                                ...a,
                                ...match // merge if found
                            };
                        });
                        // console.log(merged);
                        merged.forEach(element => {
                            arrUpload.push({
                                cost_code: element.cost_code,
                                kategori: element.kategori?.nama_kategori,
                                nama: element.nama,
                                spesifikasi: element.spesifikasi,
                                satuan: element.satuan,
                                volume: element.volume,
                                tanggal: element.tanggal,
                                no_po: element.no_po,
                                invoice_nota: element.invoice_nota,
                                harga_satuan: toCurrency(element.harga_satuan),
                                harga_total: toCurrency(element.total_harga)
                            })
                        });
                    }
                    
                    
                    console.log(result) 
                }catch(error){
                    setLoader(false);
                    console.log("e = "+error);
                }
            // console.log(arrUpload)
           setArrBk(mergeArrayUpload);
           setDataTable(arrUpload);
           setLoader(false);
        };

        reader.readAsBinaryString(file);
    };
    const changeFormatCurrency = (e) => {
        let val = e.replace(/[^\d]/g, ""); // hanya angka
        val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
        return val;
    };
    useEffect(() => {
        if (openModal.open_modal) {
            getRapa();
            getUserApprover();
            setDataProyek(openModal.dataProyek);
        }
    }, [openModal.open_modal])

    return (
        <Modal size="xl" show={openModal.open_modal} onHide={() => setOpenModal({ ...openModal, open_modal: false })} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <LoadersSimUmira open={loader} />
            <Modal.Header closeButton>
                <h6 className="modal-title" id="exampleModalLabel">Tambah Pengajuan Biaya Kontruksi</h6>
            </Modal.Header>
            <Modal.Body className="">
                <Row>
                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">
                            
                           
                             <Col xl={12}>
                                <Card className="custom-card">
                                   
                                    <Card.Body>
                                        <h5>Kode Proyek : {dataProyek.kode_proyek}</h5>
                                        <h5>Nama Proyek : {dataProyek.nama_proyek}</h5>
                                        <h5>Tanggal Awal Kontrak :  {formatdate(dataProyek.tanggal_awal_kontrak)}</h5>
                                        <h5>Tanggal Berakhir Kontrak : {formatdate(dataProyek.tanggal_akhir_kontrak)}</h5>
                                        <h5>RAB (Rincian Anggaran Biaya) : {toCurrency(dataProyek.biaya_rab)}</h5>
                                        <h5>RAP (Rincian Anggaran Proyek) : {toCurrency(dataProyek.biaya_rap)}</h5>
                                        <h5>Pendapatan Usaha : {toCurrency(dataProyek.total_pu)}</h5>
                                        <h5>Posisi Biaya Konstruksi : {toCurrency(dataProyek.total_bk)}</h5>
                                        <h5>Material On Site: {toCurrency(dataProyek.nominal_mos)}</h5>
                                        <h5>BK/PU Awal : {dataProyek.bk_pu_awal}</h5>
                                        <h5>BK/PU Terkini : {formatPercent(calcPercentage(dataProyek.total_bk, dataProyek.total_pu))}</h5>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col xl={12}>
                                <label htmlFor="contact-address-firstname" className="form-label ">Upload BK <span style={{ color: "red" }}>*</span> :</label>
                                <input type="file" className={`form-control`} id="upload_rapa" onChange={handleFile}  placeholder="Upload Rapa"  />
                            </Col>

                            <Col xl={12}>
                                    <div className="table-responsive">
                                        <BasicTableCostControl column={COLUMNS} datatable={dataTable} />
                                    </div>
                            </Col>
                             <Col xl={12}>
                                <label className="form-label">
                                    Pilih Approver <span style={{ color: "red" }}>*</span> :
                                </label>

                                <Select
                                    options={userApprover}
                                    isMulti
                                    isSearchable
                                    placeholder="Pilih approver (berurutan)"
                                    classNamePrefix="Select2"
                                    onChange={(selected) => {
                                        const approverArr = selected
                                            ? selected.map((item, index) => ({
                                                id_user: item.value,
                                                urutan: index + 1
                                            }))
                                            : [];
                                        setdataPengajuanBk({
                                            ...dataPengajuanBk,
                                            id_user: approverArr
                                        });
                                    }}
                                />

                            </Col>

                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Catatan<span style={{ color: "red" }}>*</span> :</label>
                                <textarea type="text" className={`form-control`} id="harga_total" placeholder="Isi Catatan" rows={3} onChange={(e) => setdataPengajuanBk({...dataPengajuanBk, catatan: e.target.value})} />
                            </Col>
                            


                        </div>

                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={submitDataPengajuanBk}>Tambah</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open_modal: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    );

}

export default dynamic(() => Promise.resolve(CreatePengajuanBkBulk), { ssr: false });