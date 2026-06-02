import { Button, Col, Modal, Row } from "react-bootstrap";
import BasicTableCostControl from "../../../DataTables/DataTablesCostControl";
import { useEffect, useState } from "react";
import apiConfig from "@/utils/AxiosConfig";
import { Divider } from "@mui/material";
import * as XLSX from "xlsx";
import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";



const UploadBk = ({openModal, setOpenModal, reload, setReload}) => {
    const [loader, setLoader] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const [dataProyek, setDataProyek] = useState({
        kode_proyek:"",
        nama_proyek: "",
        deskripsi_proyek: "",
        tanggal_kontrak: "",
        biaya_rap: "",
        biaya_rab:""
    })
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
    const getDataById = async() =>{
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek-id?id="+openModal.id_proyek, {
				headers: {
					"Content-Type": "application/json"
				}
			});
            if(result.status){
                setDataProyek({
                    nama_proyek: result.data.data.nama_proyek,
                    kode_proyek: result.data.data.kode_proyek,
                    deskripsi_proyek: result.data.data.deskripsi_proyek,
                    tanggal_kontrak: (result.data.data.tanggal_akhir_kontrak)?result.data.data.tanggal_akhir_kontrak:"",
                    biaya_rap: (result.data.data.biaya_rap)?toCurrency(result.data.data.biaya_rap):"",
                    biaya_rab: (result.data.data.biaya_rab)?toCurrency(result.data.data.biaya_rab):""
                });
                
            }
            setLoader(false)
            // console.log(result) 
        }catch(error){
            console.log("e = "+error);
        }
    }

    const submit = async() => {
        setLoader(true);
        let dataSubmit = {
            id_proyek: openModal.id_proyek,
            
            cost_code: [],
            volume_bk:[],
            tanggal:[],
            harga_total:[],
            no_po:[],
            invoice_nota:[]
        }
        for(const data of dataTable){
            // dataSubmit.kategori.push((data.kategori)?data.kategori:"-");
            // dataSubmit.kode_rap.push((data.kode_rap)?data.kode_rap:"-");
            // dataSubmit.group.push((data.group)?data.group:"-");
            // dataSubmit.item_pekerjaan.push((data.item_pekerjaan)?data.item_pekerjaan:"-");
            // dataSubmit.spesifikasi.push((data.spesifikasi)?data.spesifikasi:"-");
            // dataSubmit.satuan.push((data.satuan)?data.satuan:"-");
            dataSubmit.cost_code.push((data.cost_code)?data.cost_code:"");
            dataSubmit.volume_bk.push((data.volume)?data.volume:0);
            dataSubmit.tanggal.push((data.tanggal)?data.tanggal:null);
            dataSubmit.no_po.push((data.no_po)?data.no_po:null);
            dataSubmit.invoice_nota.push((data.invoice_nota)?data.invoice_nota:null);
            dataSubmit.harga_total.push((data.harga_total)?clearCurrency(data.harga_total):0);
        }
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.post(apiUrl + "/CostControl/BiayaKonstruksi/create-bk-bulk", dataSubmit,{
				headers: {
					"Content-Type": "application/json"
				}
			});
            if(result.status){
               setLoader(false);
               swalAlert(result.data.message, result.statusText, "success");
               setDataTable([]);
               setOpenModal({id_proyek:"", open: false})
            
            }
            
            // console.log(result) 
        }catch(error){
            setLoader(false);
            console.log("e = "+error);
        }
    }

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
                setReload(prev => !prev);
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
            console.log(normalized)
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
            console.log(arrUpload)
           setDataTable(arrUpload);
           setLoader(false);
        };

        reader.readAsBinaryString(file);
    };
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

    const clearCurrency = (value) => {
        if (!value) return 0;

        return Number(
            value
                .replace(/[^0-9,-]+/g, "") // hapus Rp, spasi, dll
                .replace(",", ".")         // handle decimal kalau ada
        );
    };
    useEffect(() => {
        if(openModal.open){
            getDataById()
        }
        
    },[openModal.open, dataTable])
    return(
        <Modal size="xl" show={openModal.open} onHide={() => {setOpenModal({...openModal, open: false});setDataTable([])}}>
            <LoadersSimUmira open={loader} />
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Upload BK</h6>
            </Modal.Header>
            <Modal.Body>
                <h6>Kode Proyek : {dataProyek.kode_proyek}</h6>
                <h6>Nama Proyek : {dataProyek.nama_proyek}</h6>
                <h6>Tanggal Berakhir Kontrak : {dataProyek.tanggal_kontrak}</h6>
                <h6>RAB (Rincian Anggaran Biaya) : {dataProyek.biaya_rab}</h6>
                <h6>RAP (Rincian Anggaran Proyek) : {dataProyek.biaya_rap}</h6>
                <Divider />
                    <Row className="g-3 pt-2 pb-2">
                        <Col xl={6}>
                            <label htmlFor="contact-address-firstname" className="form-label ">Upload BK<span style={{ color: "red" }}>*</span> :</label>
                            <input type="file" className={`form-control`} id="upload_rapa" onChange={handleFile} placeholder="Upload Rapa"  />
                        </Col>
                        {/* <Col xl={6}>
                            <Button variant='contained' type="button" className="btn btn-primary">Upload</Button>
                        </Col> */}
                    </Row>
                <Divider />
                 <div className="table-responsive mt-2">
                    <BasicTableCostControl column={COLUMNS} datatable={dataTable} />
                 </div>
            </Modal.Body>
            <Modal.Footer>
                 <Button variant='contained' type="button" className="btn btn-primary" onClick={submit}>Upload</Button>
                <Button variant='contained' type="button" className="btn btn-secondary" 
                    data-bs-dismiss="modal" onClick={() => {setOpenModal({...openModal, open: false});setDataTable([])}}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(UploadBk), { ssr: false });

