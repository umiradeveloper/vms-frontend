import { Button, Col, Modal, Row } from "react-bootstrap";
import BasicTableCostControl from "../../../DataTables/DataTablesCostControl";
import { useEffect, useState } from "react";
import apiConfig from "@/utils/AxiosConfig";
import { Divider } from "@mui/material";
import * as XLSX from "xlsx";
import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";
import Swal from "sweetalert2";



const UploadDataRapa = ({openModal, setOpenModal}) => {
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
            Header: "Kode RAP",
            accessor: "kode_rap",
        },
        {
            Header: "Kategori",
            accessor: "kategori",
        },
        {
            Header: "Group",
            accessor: "group",
        },
        {
            Header: "Item Pekerjaan",
            accessor: "item_pekerjaan",
        },
       
        {
            Header: "Spesifikasi",
            accessor: "spesifikasi",
        },
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
    ];
    const getDataById = async() =>{
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek-id?id="+openModal.id_proyek, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
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
            kode_proyek: dataProyek.kode_proyek,
            kategori:[],
            kode_rap:[],
            group:[],
            item_pekerjaan:[],
            spesifikasi:[],
            satuan:[],
            volume:[],
            harga_satuan:[],
            harga_total:[]
        }
        for(const data of dataTable){
            dataSubmit.kategori.push((data.kategori)?data.kategori:"-");
            dataSubmit.kode_rap.push((data.kode_rap)?data.kode_rap:"-");
            dataSubmit.group.push((data.group)?data.group:"-");
            dataSubmit.item_pekerjaan.push((data.item_pekerjaan)?data.item_pekerjaan:"-");
            dataSubmit.spesifikasi.push((data.spesifikasi)?data.spesifikasi:"-");
            dataSubmit.satuan.push((data.satuan)?data.satuan:"-");
            dataSubmit.volume.push((data.volume)?data.volume:0);
            dataSubmit.harga_satuan.push((data.harga_satuan_ori)?data.harga_satuan_ori:0);
            dataSubmit.harga_total.push((data.harga_total_ori)?data.harga_total_ori:0);
        }
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.post(apiUrl + "/CostControl/Rapa/create-rapa-bulk", dataSubmit,{
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
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
           for(const data of normalized){
            // console.log(data["ITEM PEKERJAAN"])
            if(data["ITEM PEKERJAAN"]){
                arrUpload.push({
                    kode_rap: (data["KODE RAP"])?data["KODE RAP"]:"",
                    kategori: (data["KATEGORI"])?data["KATEGORI"]:"",
                    item_pekerjaan: (data["ITEM PEKERJAAN"])?data["ITEM PEKERJAAN"]:"",
                    spesifikasi: (data["SPESIFIKASI"])?data["SPESIFIKASI"]:"",
                    satuan: (data["SAT"])?data["SAT"]:"",
                    volume: (data["VOLUME"])?data["VOLUME"]:"",
                    harga_satuan: (data["HARGA SATUAN"])?toCurrency(data["HARGA SATUAN"]):"",
                    harga_total: (data["TOTAL HARGA"])?toCurrency(data["TOTAL HARGA"]):"",
                    harga_satuan_ori: (data["HARGA SATUAN"])?data["HARGA SATUAN"]:"",
                    harga_total_ori: (data["TOTAL HARGA"])?data["TOTAL HARGA"]:"",
                });
            }
             
           }
        //    console.log(normalized)
           setDataTable(arrUpload);
           setLoader(false);
        };

        reader.readAsBinaryString(file);
    };
    
    
    const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
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
                <h6 className="modal-title" id="exampleModalLabel">Upload Rapa</h6>
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
                            <label htmlFor="contact-address-firstname" className="form-label ">Upload Rapa <span style={{ color: "red" }}>*</span> :</label>
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

export default UploadDataRapa;

