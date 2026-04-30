import { Col, Modal } from "react-bootstrap";
import BasicTableCostControl from "../../DataTables/DataTablesCostControl";
import { useEffect, useState } from "react";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import { Button, Divider } from "@mui/material";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
const Select = dynamic(() => import("react-select"), { ssr: false });


const DetailUploadCostCode = ({openModal, setOpenModal, loader, setLoader}) => {
    const [dataTable, setDataTable] = useState([]);
    const [kategori, setKategori] = useState([]);
    const [datasKategori, setDatasKategori] = useState({
        nama_kategori: "",
        kode_kategori:""
    });
    const COLUMNS = [
        {
            Header: "Kode",
            accessor: "kode",
        },
        {
            Header: "Kategori",
            accessor: "kategori",
        },
        {
            Header: "Kode Kategori",
            accessor: "kode_kategori",
        },
        {
            Header: "Klasifikasi",
            accessor: "klasifikasi",
        },
        {
            Header: "Kode Jenis",
            accessor: "kode_jenis",
        },
        {
            Header: "Spesifikasi",
            accessor: "spesifikasi",
        },
        {
            Header: "Jenis",
            accessor: "jenis",
        },
        {
            Header: "Nama",
            accessor: "nama",
        },
        {
            Header: "Satuan",
            accessor: "satuan",
        },
    ]

    const getKategori = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Kategori/get-kategori", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result)
            if(result.status == 200){
                 if(result.data.data.length > 0){
                    const kategoriArr = [];
                    for(const res of result.data.data){
                        kategoriArr.push({
                            value: res.id_kategori,
                            label: res.kode_kategori+" | "+res.nama_kategori
                        })
                    }
                    setKategori(kategoriArr);
                    setLoader(false);
                }
            }
            // console.log(result)
        } catch (error) {
            console.log(error);
        }
    }
    const handleFile = (e) => {
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
            console.log(jsonData);
            const arrUpload = [];
            const normalized = jsonData.map(row => {
                const newRow = {};
                Object.keys(row).forEach(key => {
                    const cleanKey = key.trim();  // hilangkan spasi
                    newRow[cleanKey] = row[key];
                });
                return newRow;
            });
            console.log(normalized)
           
           for(const data of normalized){
            // console.log(data[""]);
            // console.log(data["ITEM PEKERJAAN"])
                
                if(data["Kode Barang"]){
                    arrUpload.push({
                        kode: (data["Kode Barang"])?data["Kode Barang"]:"",
                        kategori: datasKategori.nama_kategori,
                        kode_kategori: datasKategori.kode_kategori,
                        klasifikasi: (data["Klasifikasi"])?data["Klasifikasi"]:"",
                        kode_jenis: (data["Kode Jenis"])?data["Kode Jenis"]:"",
                        spesifikasi: (data["Spesifikasi"])?data["Spesifikasi"]:"",
                        jenis: (data["Jenis"])?data["Jenis"]:"",
                        nama: (data["Nama Bahan"])?data["Nama Bahan"]:"",
                        satuan: (data["Satuan"])?data["Satuan"]:"",
                    });
                }
             
           }
           setDataTable(arrUpload)
        //    console.log(normalized)
        //    setDataTable(arrUpload);
           setLoader(false);
        };

        reader.readAsBinaryString(file);


    }

    const submit = async() => {
         const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const arrCostCode = {
            kode: [],
            kategori: [],
            kode_kategori: [],
            klasifikasi: [],
            kode_jenis: [],
            spesifikasi: [],
            jenis: [],
            nama: [],
            satuan: []
        }
        for(const dataArr of dataTable){
            arrCostCode.kode.push(dataArr.kode)
            arrCostCode.kategori.push(dataArr.kategori)
            arrCostCode.kode_kategori.push(dataArr.kode_kategori)
            arrCostCode.klasifikasi.push(dataArr.klasifikasi)
            arrCostCode.kode_jenis.push(dataArr.kode_jenis)
            arrCostCode.spesifikasi.push(dataArr.spesifikasi)
            arrCostCode.jenis.push(dataArr.jenis)
            arrCostCode.nama.push(dataArr.nama)
            arrCostCode.satuan.push(dataArr.satuan)
        }

        try {
            const result = await apiConfig.post(apiUrl + "/CostControl/Cost-Code/create-cost-code", arrCostCode, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result)
            if(result.status == 200){
                setLoader(false);
                swalAlert(result.data.message, result.statusText, "success");
                setOpenModal({...openModal, open: false})
            }
            // console.log(result)
        } catch (error) {
            setLoader(false);
            console.log(error);
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
                    clearInterval(timerInterval);
                },
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
        }

    useEffect(() => {
        getKategori();
    },[openModal.open])
    return(
         <Modal size="xl" show={openModal.open} onHide={() => {setOpenModal({...openModal, open: false});setDataTable([])}}>
            
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Upload Cost Code</h6>
            </Modal.Header>
            <Modal.Body>
                <Col xl={12} className="mb-2">
                    <label htmlFor="kategori" className="form-label ">Kategori <span style={{ color: "red" }}>*</span> :</label>
                    <Select name="state"  className="basic-multi-select " options={kategori} isSearchable
                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Kategori" onChange={(e) => {
                            const splitE = e.label.split("|");
                            setDatasKategori({
                                nama_kategori: splitE[1],
                                kode_kategori: splitE[0]
                            });
                        }}
                    />
                </Col>
                <Col xl={12} className="mb-2">
                    <label htmlFor="contact-address-firstname" className="form-label ">Upload Cost Code <span style={{ color: "red" }}>*</span> :</label>
                    <input type="file" className={`form-control`} id="upload_rapa" onChange={handleFile} placeholder="Upload Rapa"  />
                </Col>
                <Divider />
                <div className="table-responsive mt-2">
                    <BasicTableCostControl column={COLUMNS} datatable={dataTable} />
                 </div>
                 <Col xl={12} className="mb-2 d-flex gap-2">
                   <Button variant="contained" onClick={submit}>Submit</Button>
                   <Button variant="contained" color="warning" onClick={() => setOpenModal({open: false})}>Cancel</Button>
                </Col>
            </Modal.Body>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(DetailUploadCostCode), { ssr: false });