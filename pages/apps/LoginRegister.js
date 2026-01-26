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
import { redirect } from "next/navigation";
const Select = dynamic(() => import("react-select"), { ssr: false });

const LoginRegister = () => {
	const [passwordshowLogin, setpasswordshowLogin] = useState(false);
    const [passwordshowregister, setpasswordshowregister] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState(null);
    const [headerToast, setHeaderToast] = useState(null);
    const [colorToast, setColorToast] = useState(null);
	const [branch, setBranch] = useState();

	const [loader, setLoader] = useState(false);
	const router = useRouter();
	const [err, setError] = useState("");
	const [errRegister, setErrorRegister] = useState("");
	
    const [dataParams, setDataParams] = useState({
        email:"",
        password:""
    })
	const [dataRegister, setDataRegister] = useState({
		nama_perusahaan: "",
		no_hp: "",
		email:"",
		password:"",
		branch: ""
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
	},[])

    const register = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const response = await axios.post(apiUrl+"/auth/register-vendor", {nama_perusahaan: dataRegister.nama_perusahaan, email: dataRegister.email, password: dataRegister.password, kode_branch: dataRegister.branch, no_hp: dataRegister.no_hp}, {
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
    const login = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const response = await axios.post(apiUrl+"/auth/login", {email: dataParams.email, password: dataParams.password}, {
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const token = response.data.data.token;
			if(token){
				setLoader(false);
			}
			const dataSession = {
				email: response.data.data.user.email,
				role: response.data.data.user.role.nama_role,
				user_id: response.data.data.user.id_user,
				branch_id: response.data.data.user.branch.id_branch,
				role_id: response.data.data.user.role.id_role
			}
			if(response.data.data.user.role.kode_role == "01"){
				Swal.fire({
					title: "Forbidden",
					html: "Aplikasi ini hanya bisa di akses oleh internal umira",
					icon: "error",
					timer: 5000,
					timerProgressBar: true,
					didOpen: () => {
						Swal.showLoading();
					},
					willClose: () => {
						clearInterval(timerInterval);
						redirect("https://vms.simumira.com");
					},
				}).then((result) => {
					/* Read more about handling dismissals below */
					if (result.dismiss === Swal.DismissReason.timer) {
						console.log("I was closed by the timer");
						redirect("https://vms.simumira.com");
					}
				});
				
			}
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(dataSession));
            localStorage.setItem("menu", JSON.stringify(response.data.data.menu));
            navigate.push("/apps/DashboardVms");
        } catch (error) {
            console.log(error);
            setErrorRegister(error.response.data.message);
			setLoader(false);
			swalAlert(error.response.data.message, error.status, "error");
        }
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
	 const handleSelectBranch = (select) => {
		setDataRegister({...dataRegister, branch: select.value})
           
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
						<Tab.Container id="left-tabs-example" defaultActiveKey="first">
							<Nav variant="pills" className='d-inline-flex bg-white p-2 rounded-2'>
								<Nav.Item><OverlayTrigger overlay={<Tooltip>Login</Tooltip>}><Nav.Link eventKey="first"><i className="si si-login"></i></Nav.Link></OverlayTrigger></Nav.Item>
								<Nav.Item><OverlayTrigger overlay={<Tooltip>Register</Tooltip>}><Nav.Link eventKey="second"><i className="si si-user-follow"></i></Nav.Link></OverlayTrigger></Nav.Item>
							</Nav>
							<Tab.Content>
								<Tab.Pane eventKey="first">
									<Card className="mb-0">
										<Row className="row-sm">

											<Col lg={6} xl={5} className="d-none d-lg-block text-center bg-primary details">
												<div className="mt-5 pt-4 p-2 position-absolute">
													<Link href={"/apps/DashboardVms"}><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/logo-umira.png`} className="header-brand-img mb-4" alt="logo" /></Link>
													<div className="clearfix"></div>
													{/* <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/svgs/user.svg`} className="ht-100 mb-0" alt="user" /> */}
													<h5 className="mt-4">Information Management System</h5>
													<span className="text-white-6 fs-13 mb-5 mt-xl-0">Login account, discover and connect with information management system umira</span>
												</div>
											</Col>
											<Col lg={6} xl={7} xs={12} sm={12} className="login_form ">
												<div className="main-container container-fluid">
													<Row className="row-sm">
														<Card.Body className="mt-2 mb-2">
															<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/logo-umira.png`} className="d-lg-none header-brand-img text-start float-start mb-4 error-logo-light" alt="logo" />
															<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/logo-umira.png`} className="d-lg-none header-brand-img text-start float-start mb-4 error-logo" alt="logo" />
															<div className="clearfix"></div>
															<form>
																<h5 className="text-start mb-2">Signin to Your Account</h5>
																<p className="mb-4 text-muted fs-13 ms-0 text-start"></p>
																{err && <Alert variant="danger">{err}</Alert>}
																<Form.Group className="text-start form-group">
																	<Form.Label>Email / No Handphone</Form.Label>
																	<Form.Control type="text" placeholder="Email / Nomor Handphone" name='email' value={dataParams.email} onChange={(e) => setDataParams({...dataParams, email: e.target.value})} />
																</Form.Group>
																<div className="text-start form-group">
																	<Form.Label>Password</Form.Label>
																	<div className="input-group">
																		<Form.Control className="form-control form-control-lg" id="signin-password"
																			placeholder="Enter your password"
																			name="password"
																			type={(passwordshowLogin) ? "text" : "password"}
																			value={dataParams.password}
																			onChange={(e) => setDataParams({...dataParams, password: e.target.value})}
																			required />
																		<button className="btn btn-light bg-transparent" type="button"
																			onClick={() => setpasswordshowLogin(!passwordshowLogin)} id="button-addon2">
																			<i className={`${passwordshowLogin ? "ri-eye-line" : "ri-eye-off-line"} align-middle`}></i></button>
																	</div>
																</div>
																
															
																
																<div className="d-grid">
																	{/* <Link href={"/apps/DashboardVms"} className="btn btn-dark" onClick={Login1}>Sign In</Link> */}
                                                                    <Button className="btn btn-dark" onClick={login}>
                                                                        Login Account
                                                                    </Button>
																</div>
															</form>
															<div className="text-start mt-5 ms-0">
																{/* <div className="mb-1"><Link href={"/components/authentication/resetpassword/"}>Forgot password?</Link></div> */}
																{/* <div>Don't have an account? <Link href={"/components/authentication/signup/"}>Register Here</Link></div> */}
															</div>
														</Card.Body>
													</Row>
												</div>
											</Col>
										</Row>
									</Card>
								</Tab.Pane>
								<Tab.Pane eventKey="second">
									<Card className="mb-0">
										<Row className="row-sm">

											<Col lg={6} xl={5} className="d-none d-lg-block text-center bg-primary details">
												<div className="mt-5 pt-5 p-2 position-absolute">
													<Link href={"/apps/DashboardVms"}><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/logo-umira.png`} className="header-brand-img mb-4" alt="logo" /></Link>
													<div className="clearfix"></div>
													{/* <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/svgs/user.svg`} className="ht-100 mb-0" alt="user" /> */}
													<h5 className="mt-4">Register Your Account</h5>
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
															<h5 className="text-start mb-2">Register Account</h5>
															<p className="mb-4 text-muted fs-13 ms-0 text-start">It's signup only takes a minute.</p>
															{errRegister && <Alert variant="danger">{errRegister}</Alert>}
															<form>
																<Form.Group className="text-start form-group ">
																	<label className="form-label">Nama Perusahaan</label>
																	<input className="form-control" placeholder="Nama Perusahaan" type="text" value={dataRegister.nama_perusahaan} onChange={(e) => setDataRegister({...dataRegister, nama_perusahaan: e.target.value})} />
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
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
					</Col>
				</Row>
			</div>
		</Fragment>
	);
};

export default dynamic(() => Promise.resolve(LoginRegister), { ssr: false });