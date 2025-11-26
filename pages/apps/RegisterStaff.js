import Seo from "@/shared/layout-components/seo/seo";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, Nav, OverlayTrigger, Row, Tab, Tooltip } from "react-bootstrap";
import ToastContainerVms from "./Component/ToastContainerVms";
import { basePath } from "@/next.config";
import LoadersSimUmira from "./Component/LoaderSimUmira";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });

const LoginRegisterStaff = () => {
    const [passwordshowLogin, setpasswordshowLogin] = useState(false);
    const [passwordshowregister, setpasswordshowregister] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState(null);
    const [headerToast, setHeaderToast] = useState(null);
    const [colorToast, setColorToast] = useState(null);
    const [branch, setBranch] = useState();
    const [role, setRole] = useState();
    const router = useRouter();

    const [loader, setLoader] = useState(false);

    const [err, setError] = useState("");
    const [errRegister, setErrorRegister] = useState("");
    
    const [dataParams, setDataParams] = useState({
        email:"",
        password:""
    })
    const [dataRegister, setDataRegister] = useState({
        nama_perusahaan: "PT Umira Sinergi Global",
        no_hp: "",
        username: "",
        email:"",
        password:"",
        branch: "",
        kode_role:""
    })
    // const { email, password } = data;
    // const changeHandler = (e) => {
    // 	setData({ ...data, [e.target.name]: e.target.value });
    // 	setError("");
    // };
    const navigate = useRouter();
    // const routeChange = () => {
    // 	const path = "/apps/DashboardVms/";
    // 	navigate.push(path);
    // };

    useEffect(() => {
        getBranch();
        getRole();
    },[])

    const register = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const response = await axios.post(apiUrl+"/auth/register-staff", {nama_perusahaan: dataRegister.nama_perusahaan, email: dataRegister.email, password: dataRegister.password, kode_branch: dataRegister.branch, no_hp: dataRegister.no_hp, kode_role: dataRegister.kode_role, username: dataRegister.username}, {
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.data.success){
                setLoader(false);
                swalAlert("Registrasi berhasil tunggu approval", "Register", "success");
                router.reload();
                
            }
            
        } catch (error) {
            console.log(error);
            setErrorRegister(error.response.data.message);
            setLoader(false);
            swalAlert(error.response.data.message, error.status, "error");
        }
        //  setLoader(true);
    }
    

    const getBranch = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const response = await axios.get(apiUrl+"/master/get-branch", {
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const data = response.data.data;
            if(data){
                setLoader(false);
                const branchArr = [];
                for await (const b of data){
                    branchArr.push({
                        value:b.kode_branch,
                        label: b.nama_branch
                    })
                }
                setBranch(branchArr);
            }
            
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoader(false);
            swalAlert(error.message, error.status, "error");
        }
    }
    const getRole = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const response = await axios.get(apiUrl+"/master/get-role", {
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const data = response.data.data;
            if(data){
                setLoader(false);
                const branchArr = [];
                for await (const b of data){
                    branchArr.push({
                        value:b.kode_role,
                        label: b.nama_role
                    })
                }
                setRole(branchArr);
            }
            
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoader(false);
            swalAlert(error.message, error.status, "error");
        }
    }
     const handleSelectBranch = (select) => {
        setDataRegister({...dataRegister, branch: select.value})
           
    }
    const handleSelectRole = (select) => {
        setDataRegister({...dataRegister, kode_role: select.value})
           
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

            <Seo title={"Login And Register"} />
            <LoadersSimUmira open={loader} />
            <div className="page main-signin-wrapper">
                <ToastContainerVms show={showToast} setShow={setShowToast} color={colorToast} message={messageToast} header={headerToast}/>
                {/* {console.log("test",branch)} */}
                <Row className="signpages text-center">
                    <Col md={12}>
                        <Card className="mb-0">
                            <Row className="row-sm">

                                <Col lg={6} xl={5} className="d-none d-lg-block text-center bg-primary details">
                                    <div className="mt-5 pt-5 p-2 position-absolute">
                                        <Link href={"/apps/DashboardVms"}><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/logo-umira.png`} className="header-brand-img mb-4" alt="logo" /></Link>
                                        <div className="clearfix"></div>
                                        {/* <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/svgs/user.svg`} className="ht-100 mb-0" alt="user" /> */}
                                        <h5 className="mt-4">Register Your Account Staff</h5>
                                        <span className="text-white-6 fs-13 mb-5 mt-xl-0">Signup to create, discover and connect with the system information umira</span>
                                    </div>
                                </Col>
                                <Col lg={6} xl={7} xs={12} sm={12} className="login_form ">
                                    <div className="main-container container-fluid">
                                        <Row className="row-sm">
                                            <Card.Body className="mt-2 mb-2">
                                                <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/logo-umira.png`} className="d-lg-none header-brand-img text-start float-start mb-4 error-logo-light" alt="logo" />
                                                <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/logo-umira.png`} className=" d-lg-none header-brand-img text-start float-start mb-4 error-logo" alt="logo" />
                                                <div className="clearfix"></div>
                                                <h5 className="text-start mb-2">Register Account Staff</h5>
                                                <p className="mb-4 text-muted fs-13 ms-0 text-start">It's signup only takes a minute.</p>
                                                {errRegister && <Alert variant="danger">{errRegister}</Alert>}
                                                <form>
                                                    <Form.Group className="text-start form-group ">
                                                        <label className="form-label">Nama Perusahaan</label>
                                                        <input className="form-control" placeholder="Nama Perusahaan" type="text" value={dataRegister.nama_perusahaan} disabled/>
                                                    </Form.Group>
                                                     <Form.Group className="text-start form-group">
                                                        <label className="form-label">Nama</label>
                                                        <input className="form-control" placeholder="Nama" type="text" value={dataRegister.username} onChange={(e) => setDataRegister({...dataRegister, username: e.target.value})} />
                                                    </Form.Group>
                                                    <Form.Group className="text-start form-group">
                                                        <label className="form-label">Email</label>
                                                        <input className="form-control" placeholder="Email" type="text" value={dataRegister.email} onChange={(e) => setDataRegister({...dataRegister, email: e.target.value})} />
                                                    </Form.Group>
                                                    <Form.Group className="text-start form-group">
                                                        <label className="form-label">No Handphone</label>
                                                        <input className="form-control" placeholder="No Hp" type="text" value={dataRegister.no_hp} onChange={(e) => setDataRegister({...dataRegister, no_hp: e.target.value})} />
                                                    </Form.Group>
                                                    <Form.Group className="text-start form-group">
                                                        <label className="form-label">Password</label>
                                                        <div className="input-group">
                                                            <Form.Control className="form-control form-control-lg" id="register-password"
                                                                placeholder="Enter your password"
                                                                name="password"
                                                                type={(passwordshowregister) ? "text" : "password"}
                                                                value={dataRegister.password}
                                                                onChange={(e) => setDataRegister({...dataRegister, password: e.target.value})}
                                                                required />
                                                            <button className="btn btn-light bg-transparent" type="button"
                                                                onClick={() => setpasswordshowregister(!passwordshowregister)} id="button-addon2">
                                                                <i className={`${passwordshowregister ? "ri-eye-line" : "ri-eye-off-line"} align-middle`}></i></button>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="text-start form-group">
                                                        <Form.Label>Branch</Form.Label>
                                                        <Select name="state" placeholder="Pilih Branch" options={branch} className="basic-multi-select" isSearchable menuPlacement='auto' classNamePrefix="Select2" onChange={handleSelectBranch}/>
                                                    </Form.Group>
                                                    <Form.Group className="text-start form-group">
                                                        <Form.Label>Role</Form.Label>
                                                        <Select name="state" placeholder="Pilih Role" options={role} className="basic-multi-select" isSearchable menuPlacement='auto' classNamePrefix="Select2" onChange={handleSelectRole}/>
                                                    </Form.Group>
                                                    <div className="d-grid">
                                                        {/* <Link href={"/apps/DashboardVms"} className="btn btn-dark">Create Account</Link> */}
                                                        <Button className="btn btn-dark" onClick={register}>
                                                            Register Account
                                                        </Button>
                                                    </div>
                                                </form>
                                                {/* <div className="text-start mt-5 ms-0">
                                                    <p className="mb-0">Already have an account? <Link href={"/components/authentication/signin/"}>Sign In</Link></p>
                                                </div> */}
                                            </Card.Body>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Card>   
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default dynamic(() => Promise.resolve(LoginRegisterStaff), { ssr: false });