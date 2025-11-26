

import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "./Component/PageHeaderVms";
import  BasicTableVendor from "./DataTables/DataTablesVendor";
import LoadersSimUmira from "./Component/LoaderSimUmira";
import axios from "axios";
import Swal from "sweetalert2";
import CreateUser from "./Component/ModalTambahUser";
import ModalUpdateUser from "./Component/ModalUpdateUser";
import { useRouter } from "next/router";
const UserManagementVendor = () => {
    const [loader, setLoader] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [userId, setUserId] = useState();
    const [openTambahUser, setOpenTambahUser] = useState({
        open_modal: false
    })
    const [openUpdateUser, setOpenUpdateUser] = useState({
        open_modal: false,
        user:{},
        user_id: ''
    })
    const router = useRouter();
    useEffect(() => {
        // console.log(localStorage.getItem("token"))
        getUser();
        if(!localStorage.getItem("token")){
			router.push("/apps/LoginRegister");
		}
    },[userId, openTambahUser.open_modal, openUpdateUser.open_modal])
    
    const COLUMNS = [
        {
            Header: "Nama Perusahaan",
            accessor: "nama_perusahaan",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Role",
            accessor: "role",
        },
        {
            Header: "Branch",
            accessor: "branch",
        },
        {
            Header: "Status",
            accessor: "statusApproval",
        },
        {
            Header: "Catatan",
            accessor: "catatan",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];

    const getUser = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const response = await axios.get(apiUrl+"/users/all/vendor", {
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token")
                }
            });
            const data = response.data.data;
            // console.log(response);
			if(data){
				// console.log(data);
                const userArr = [];
                for await (const user of data){
                    let approval ;
                    if(user.isApproval === 1){
                        approval = "Aktif";
                    }
                    if(user.isApproval === 2){
                        approval = "Reject";
                    }
                    // console.log(user.role);
                    if(user.isApproval === 0 || user.isApproval === null){
                        approval = <ActionApprove user_id={user.id_user} />;
                    }
                    userArr.push({
                        nama_perusahaan: user.nama,
                        email: user.email,
                        role: user.role?.nama_role,
                        branch: user.branch.nama_branch,
                        statusApproval: approval,
                        catatan: user.catatan,
                        aksi: <AksiUser user_id={user.id_user} user={user} />
                    })
                }
                setTableData(userArr);
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
    const ApproveUser = async (id_user) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const response = await axios.patch(apiUrl+"/users/update-approval", {
                isApproval: 1
            } ,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token")
                },
                params:{
                    id: id_user
                }
            });
            if(response.data.success){
                setLoader(false);
                setUserId(null);
                swalAlert(response.data.message, "Success", "success");
                
            }
        }catch(error){
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
    const RejectUser = async (id_user, message) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const response = await axios.patch(apiUrl+"/users/update-approval", {
                isApproval: 2,
                catatan: message
            } ,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token")
                },
                params:{
                    id: id_user
                }
            });
            if(response.data.success){
                setLoader(false);
                setUserId(null);
                swalAlert(response.data.message, "Success", "success");
                
            }
        }catch(error){
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
    const HapusUser = async (id_user) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const response = await axios.delete(apiUrl+"/users/deleted", {
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token")
                },
                params:{
                    id: id_user
                }
            });
            if(response.data.success){
                setLoader(false);
                setUserId(null);
                swalAlert(response.data.message, "Success", "success");
                
            }
        }catch(error){
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
    const handleApprove = async(user_id) => {
        // console.log(user_id);
        const res = await AlertConfirm("Approve Data User", "warning", "Approve", false);
        // setUserId(user_id);
        // console.log(res);
        if(res.status){
            // console.log(res)
            
            ApproveUser(user_id);
        }
    }
    const handleHapus = async(user_id) => {
        // console.log(user_id);
        const res = await AlertConfirm("Hapus Data User", "warning", "Hapus", false);
        // setUserId(user_id);
        // console.log(res);
        if(res.status){
            // console.log(res)
            
            HapusUser(user_id);
        }
    }
    const handleUpdate = async(user_id, user) => {
        setOpenUpdateUser({open_modal: true, user: user, user_id: user_id});
    }
    
    const handleReject = async(user_id) => {
        // console.log(user_id);
        const res = await AlertConfirm("Reject Data User", "warning", "Reject", true);
        // console.log(res);
        if(res.status){
            // console.log(res)
            RejectUser(user_id, res.value);
        }
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

    const ActionApprove = ({user_id}) => {
        return(
            <>
                <Button
					variant=""
					className="btn btn-primary me-1"
					type="button"
					onClick={() => handleApprove(user_id)}
				>
					Approval
				</Button>
				<Button
					variant=""
					className="btn btn-danger me-1"
					type="button"
                    onClick={() => handleReject(user_id)}
					// onClick={() => handleDeleteClick(contact.id)}
				>
					Reject
				</Button>
            </>
        )
    }
    const AksiUser = ({user_id, user = null}) => {
        return(
            <>
            <Button
                variant=""
                className="btn btn-info me-1"
                type="button"
                onClick={() => handleUpdate(user_id, user)}
            >
                Edit
            </Button>
            <Button
                variant=""
                className="btn btn-danger me-1"
                type="button"
                onClick={() => handleHapus(user_id)}
            >
                Hapus
            </Button>
            </>
            
        )
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

    return (
        <Fragment>
            <Seo title={"User Management"} />
            <PageHeaderVms title='User Management' item='Settings' active_item='User Management' />
            <LoadersSimUmira open={loader} />
            <CreateUser open={openTambahUser} setOpen={setOpenTambahUser} setOpenLoader={setLoader} />
            <ModalUpdateUser open={openUpdateUser} setOpen={setOpenUpdateUser} setOpenLoader={setLoader}/>
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Row>
                                <Col xl={12} md={12} sm={12}>
                                <div className="card-title">
                                    User Management
                                </div>
                                </Col>
                                <Col xl={12} md={12} sm={12}>
                                <div className="card-title pt-3">
                                    <Button onClick={() => setOpenTambahUser({...openTambahUser, open_modal: true})}>
                                        Tambah User
                                    </Button>
                                </div>
                                </Col>
                            </Row>
                            
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">
                                <BasicTableVendor column={COLUMNS} datatable={tableData} />
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
UserManagementVendor.layout = "ContentlayoutVms";
export default UserManagementVendor;
