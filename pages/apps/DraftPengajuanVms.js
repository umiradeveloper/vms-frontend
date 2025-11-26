
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
// import { BasicTable, ResponsiveDataTable, Savetable, columns, data } from "@/shared/data/tables/datatablesdata";
import  BasicTableVendor  from "./DataTables/DataTablesVendor";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "./Component/PageHeaderVms";
import LoadersSimUmira from "./Component/LoaderSimUmira";
import Swal from "sweetalert2";
import axios from "axios";
import DetailDraftPengajuanVms from "./DetailDraftPengajuanVms";
import { useRouter } from "next/router";

const DraftPengajuanVms = () => {
     const [datatable, setDatatable] = useState([]);
     const router = useRouter();
    const [openDetail, setOpenDetail] = useState({
        open_modal: false,
        data_detail: {}
    });
    const [appStatus, setAppStatus] = useState(true);
    const [loader, setLoader] = useState();
    const COLUMNS = [
        {
            Header: "ID Pengajuan",
            accessor: "id_pengajuan",
        },
        {
            Header: "Nama Perusahaan",
            accessor: "nama_perusahaan",
        },
        {
            Header: "Tanggal Pengajuan",
            accessor: "tanggal_pengajuan",
        },
        {
            Header: "Kualifikasi Usaha",
            accessor: "kualifikasi_usaha",
        },
        {
            Header: "Klasifikasi Usaha",
            accessor: "klasifikasi_usaha",
        },
       
        {
            Header: "Kategori",
            accessor: "kategori",
        },
        {
            Header: "Spesialisasi",
            accessor: "spesialisasi",
        },
        {
            Header: "Detail",
            accessor: "detail",
        },
        {
            Header: "Ajukan",
            accessor: "ajukan",
        },
        {
            Header: "Edit",
            accessor: "edit",
        },
        {
            Header: "Hapus",
            accessor: "hapus",
        },
        // {
        //     Header: "Aksi",
        //     accessor: "aksi",
        // },
    ];
    useEffect(() => {
        if(!localStorage.getItem("token")){
            router.push("/apps/LoginRegister");
        }
        getPengajuan();
    },[openDetail.open_modal, appStatus]);

    const handleEdit = (id) => {
        // const router = useRouter();
        // const { id } = router.query;
        router.push("/apps/EditDraftPengajuan?ref="+id);
    }

     const handleAjukan = async(id) => {
        const res = await AlertConfirm("Apakah anda yakin mengajukan pengajuan ini ?", "warning", "Ajukan", false);
        // setIdApproval(id);
        // console.log(idApproval);
        if(res.status){
            // console.log(res)
            // deleted(id);
            ajukan(id);
        }
    }
     const handleDelete = async(id) => {
        const res = await AlertConfirm("Hapus Pengajuan", "warning", "Hapus", false);
        // setIdApproval(id);
        // console.log(idApproval);
        if(res.status){
            // console.log(res)
            deleted(id);
        }
    }
    const getPengajuan = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const response = await axios.get(apiUrl+"/vms/draft-pengajuan-vendor", {
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token")
                }
            });
            const data = response.data.data;
            if(data){
                // console.log(data);
                const pengajuanArr = [];
                for await (const user of data){
                
                    pengajuanArr.push({
                            id_pengajuan: user.id_pengajuan,
                            nama_perusahaan: user.nama_perusahaan,
                            tanggal_pengajuan: new Date(user.tanggal_pengajuan).toLocaleString("id-ID"),
                            kualifikasi_usaha: user.kualifikasi_usaha.kualifikasi,
                            klasifikasi_usaha: user.klasifikasi_usaha,
                            kategori: user.kategori,
                            spesialisasi: user.spesialisasi,
                            detail: <button className="btn btn-info" onClick={() => setOpenDetail({...openDetail, open_modal: true, data_detail: user})}>Detail</button>,
                            ajukan: <button className="btn btn-secondary" onClick={() => {handleAjukan(user.id_vendor)}}>Ajukan</button>,
                            edit: <button className="btn btn-warning" onClick={() => {handleEdit(user.id_vendor)}}>Edit</button>,
                            hapus: <button className="btn btn-danger" onClick={() => {handleDelete(user.id_vendor)}}>Hapus</button>
                            // aksi:   <div className="d-flex flex-row gap-2">
                            //             <button className="btn btn-success">Approve</button>
                            //             <button className="btn btn-danger">Reject</button>
                            //         </div>
                    })
                }
                setDatatable(pengajuanArr)
                // setSelectedOptions(kualifikasiArr);
                // setTableData(userArr);
                setLoader(false);
            }
            
        } catch (error) {
            console.log(error);
            // setError(error.message);
            if(error.status == 401){
                localStorage.removeItem("token");
                localStorage.removeItem("menu");
                localStorage.removeItem("user");
                router.push("/apps/LoginRegister");
            }
            setLoader(false);
            swalAlert(error.message, error.status, "error");
        }
    }
    const deleted = async(id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const response = await axios.delete(apiUrl+"/vms/delete-pengajuan?id="+id,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token")
                }
            });
            const data = response.data;
            if(data.success){
                // console.log(data);
                setLoader(false);
                swalAlert("Delete Pengajuan", "Berhasil", "success");
                setAppStatus(true);
                // router.reload("/apps/DraftPengajuanVms");
            }
            
        } catch (error) {
            console.log(error);
            // setError(error.message);
            if(error.status == 401){
                localStorage.removeItem("token");
                localStorage.removeItem("menu");
                localStorage.removeItem("user");
                router.push("/apps/LoginRegister");
            }
            setLoader(false);
            swalAlert(error.message, error.status, "error");
        }
    }
    const ajukan = async(id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const response = await axios.get(apiUrl+"/vms/draft-pengajuan-ajukan?id="+id,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token")
                }
            });
            const data = response.data;
            if(data.success){
                // console.log(data);
                setLoader(false);
                swalAlert("Pengajuan Berhasil Di Ajukan", "Berhasil", "success");
                setAppStatus(true);
                // router.reload("/apps/DraftPengajuanVms");
            }
            
        } catch (error) {
            console.log(error);
            // setError(error.message);
            if(error.status == 401){
                localStorage.removeItem("token");
                localStorage.removeItem("menu");
                localStorage.removeItem("user");
                router.push("/apps/LoginRegister");
            }
            setLoader(false);
            swalAlert(error.message, error.status, "error");
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
    const AlertConfirm = async(message, icon, confirmButtonName, textarea = false, messageDeleted = "Your file has been deleted.") => {
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
            // input: 'textarea',
            // inputLabel: 'Catatan',
            // inputPlaceholder: 'Catatan...',
            // inputAttributes: {
            //     'aria-label': 'Catatan'
            // },
        };
        
        if(textarea){
            objSwall.input = 'textarea';
            objSwall.inputLabel = 'Catatan';
            objSwall.inputPlaceholder = 'Catatan....';
            // objSwall.inputAttributes["aria-label"] = 'Catatan';
        }
        // console.log(objSwall);
        const result = await swalWithBootstrapButtons.fire(objSwall);
        if (result.isConfirmed) {
                // await swalWithBootstrapButtons.fire(
                //     "Success",
                //     messageDeleted,
                //     "success"
                // );
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

    return (
        <Fragment>
            <Seo title={"List Draft VMS"} />
            <PageHeaderVms title='List Draft VMS' item='VMS List' active_item='List Draft VMS' />
            <LoadersSimUmira open={loader} />
            <DetailDraftPengajuanVms open={openDetail} setOpen={setOpenDetail} openLoader={loader} setOpenLoader={setLoader} />
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Data Draft VMS
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">
                                <BasicTableVendor column={COLUMNS} datatable={datatable}/>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Responsive Datatable
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <ResponsiveDataTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}
            

        </Fragment>
    );
};
DraftPengajuanVms.layout = "ContentlayoutVms";
export default DraftPengajuanVms;
