import { Fragment, useEffect, useState } from "react";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import Seo from "@/shared/layout-components/seo/seo";
import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "../../DataTables/DataTablesCostControl";
import { Button} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import apiConfig from "../../../../utils/AxiosConfig";
import UploadDataRapa from "./modals/UploadDataRapa";
import EditDataRapa from "./modals/EditDataRapa";
import Swal from "sweetalert2";

const DetailRapa = () => {
    const [loader, setLoader] = useState(false);
    const params = useSearchParams();
    const [reload, setReload] = useState(false);
    const [statusDelete, setStatusDelete] = useState(false);
    const [openModalUpload, setOpenModalUpload] = useState({
        id_proyek:"",
        open: false
    })
    
    const [dataProyek, setDataProyek] = useState({
        kode_proyek:"",
        nama_proyek: "",
        deskripsi_proyek: "",
        tanggal_kontrak: "",
        biaya_rap: "",
        biaya_rab:""
    })
    const [openModalEdit, setOpenModalEdit] = useState({
        id_rapa:"",
        kode_proyek:"",
        open_modal: false
    })
    const navigate = useRouter();
    const [datatable, setDataTable] = useState([]);
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
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];
    const getDataById = async() =>{
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek-id?id="+params.get("id"), {
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
            console.log(result) 
        }catch(error){
            setLoader(false)
            console.log("e = "+error);
        }
    }

    const getRapa = async() => {
         setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Rapa/get-rapa-proyek?id_proyek="+params.get("id"), {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			});
            if(result.status){
                const arrRapa = [];
                for(const data of result.data.data){
                    arrRapa.push({
                        kode_rap: (data.kode_rap)?data.kode_rap:"",
                        kategori: (data.kategori)?data.kategori:"",
                        group: (data.group)?data.group:"",
                        item_pekerjaan: (data.item_pekerjaan)?data.item_pekerjaan:"",
                        spesifikasi: (data.spesifikasi)?data.spesifikasi:"",
                        satuan: (data.satuan)?data.satuan:"",
                        volume: (data.volume)?data.volume:"",
                        harga_satuan: (data.harga_satuan)?toCurrency(data.harga_satuan):"",
                        harga_total: (data.harga_total)?toCurrency(data.harga_total):"",
                        aksi: <div className="d-flex flex-row gap-2">
                                    <button className="btn btn-success" onClick={() => setOpenModalEdit({id_rapa: data.id_rapa,open_modal: true})}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => {deleteData(data.id_rapa)}}>Delete</button>
                                </div>
                    })
                }
                setDataTable(arrRapa);
              
                
            }
            setLoader(false)
            console.log(result) 
        }catch(error){
            setLoader(false)
            console.log("e = "+error);
        }
    }
    const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
    };
    const deleteData = async(id) => {
        const resultConfirm = await AlertConfirm("Apakah anda yakin ingin menghapus data ini ? ", "warning", "Hapus", false, "Data berhasil di hapus");
        if(resultConfirm.status){
            setLoader(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            try {
                const result = await apiConfig.delete(apiUrl + "/CostControl/Rapa/delete-rapa?id="+id, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                if(result.status == 200){
                    
                    setLoader(false);
				    swalAlert(result.data.message, result.statusText, "success");
                }
                
            } catch (error) {
                console.log(error);
                setLoader(false);
			    swalAlert(error.message, error.code, "error");
            }
            

        }
        // console.log(id)
    }
    
    const AlertConfirm = async (message, icon, confirmButtonName, textarea = false, messageDeleted = "Your file has been deleted.") => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger me-2"
            },
            buttonsStyling: false
        });
        let objSwall = {
            title: "Apakah Yakin?",
            text: message,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonName,
            cancelButtonText: "Kembali",
            reverseButtons: true,

        };

        if (textarea) {
            objSwall.input = 'textarea';
            objSwall.inputLabel = 'Catatan';
            objSwall.inputPlaceholder = 'Catatan....';

        }
        const result = await swalWithBootstrapButtons.fire(objSwall);
        if (result.isConfirmed) {
            setReload(prev => !prev);
            return {
                status: true,
                value: result.value
            };
            // ✅ user confirmed
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // await swalWithBootstrapButtons.fire(
            //     "Cancelled",
            //     // "Your imaginary file is safe :)",
            //     "error"
            // );
            return {
                status: false,
                // value: result.value
            }; // ✅ user cancelled
        }

        return false;
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

    useEffect(() => {
        // console.log(params.get("id"))
        if(params.get("id")){
            getDataById()
            getRapa();
        }
        
    },[params.get("id"), openModalEdit.open_modal, reload])
    return(
         <Fragment>
            <Seo title={"Detail Rapa"} />
            <PageHeaderVms title='Daftar Rapa' item='Daftar Rapa' active_item='Detail Rapa' />
            <LoadersSimUmira open={loader} />
            <UploadDataRapa openModal={openModalUpload} setOpenModal={setOpenModalUpload} reload={reload} setReload={setReload} />
            <EditDataRapa openModal={openModalEdit} setOpenModal={setOpenModalEdit}/>
             <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header className="d-flex align-items-center justify-content-between">
                             <button
                                type="button" className="btn btn-warning label-btn rounded-pill"
                                onClick={() => navigate.push("/apps/CostControl/Rapa/DaftarRapa")}
                            >
                                <i className="ri-arrow-left-line label-btn-icon me-2 rounded-pill"/>
                                kembali
                            </button>
                            <button
                                type="button" className="btn btn-primary label-btn rounded-pill"
                                onClick={() => setOpenModalUpload({id_proyek: params.get("id"), open: true})}
                                // onClick={() => navigate.push("/apps/CostControl/Rapa/DaftarRapa")}
                            >
                                <i className="ri-add-circle-line label-btn-icon me-2 rounded-pill"/>
                                Upload
                            </button>
                           
                        </Card.Header>
                        <Card.Body>
                            <h5>Kode Proyek : {dataProyek.kode_proyek}</h5>
                            <h5>Nama Proyek : {dataProyek.nama_proyek}</h5>
                            <h5>Tanggal Berakhir Kontrak : {dataProyek.tanggal_kontrak}</h5>
                            <h5>RAB (Rincian Anggaran Biaya) : {dataProyek.biaya_rab}</h5>
                            <h5>RAP (Rincian Anggaran Proyek) : {dataProyek.biaya_rap}</h5>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Data Rapa
                            </div>
                        </Card.Header>
                        <Card.Body>
                            
                            <div className="table-responsive">
                                <BasicTableCostControl column={COLUMNS} datatable={datatable} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}
DetailRapa.layout = "ContentlayoutVms";


export default DetailRapa;