import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Alert, Card, Col, Form, Nav, OverlayTrigger, Row, Tab, Tooltip } from "react-bootstrap";
import Seo from "../shared/layout-components/seo/seo";
import { auth } from "../shared/firebase/firebase";
import { redirect } from "next/navigation";
const Home = () => {
	// redirect("/apps/DashboardVms");
	const router = useRouter();

  useEffect(() => {
    router.push("/apps/LoginRegister");
  }, [router]);

  return null;
	// const [passwordshow1, setpasswordshow1] = useState(false);
	// const [err, setError] = useState("");
	// const [data, setData] = useState({
	// 	"email": "adminnextjs@gmail.com",
	// 	"password": "1234567890",
	// });
	// const { email, password } = data;
	// const changeHandler = (e) => {
	// 	setData({ ...data, [e.target.name]: e.target.value });
	// 	setError("");
	// };
	// const navigate = useRouter();
	// const routeChange = () => {
	// 	const path = "/apps/DashboardVms/";
	// 	navigate.push(path);
	// };

	// const Login = (e) => {
	// 	e.preventDefault();
	// 	auth.signInWithEmailAndPassword(email, password)
	// 		.then(user => {
	// 			console.log(user);
	// 			routeChange();
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 			setError(err.message);
	// 		});
	// };
	// const Login1 = () => {
	// 	if (data.email == "adminnextjs@gmail.com" && data.password == "1234567890") {
	// 		routeChange();
	// 	}
	// 	else {
	// 		setError("The Auction details did not Match");
	// 		setData({
	// 			"email": "adminnextjs@gmail.com",
	// 			"password": "1234567890",
	// 		});
	// 	}
	// };

	// return (
	// 	<Fragment>
	// 		<Seo title={"Login"} />
	// 		<div className="page main-signin-wrapper">

	// 			<Row className="signpages text-center">
	// 				<Col md={12}>
	// 					<Tab.Container id="left-tabs-example" defaultActiveKey="first">
	// 						<Nav variant="pills" className='d-inline-flex bg-white p-2 rounded-2'>
	// 							<Nav.Item><OverlayTrigger overlay={<Tooltip>Login</Tooltip>}><Nav.Link eventKey="first"><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/nextjslogo.png`} /></Nav.Link></OverlayTrigger></Nav.Item>
	// 							<Nav.Item><OverlayTrigger overlay={<Tooltip>Register</Tooltip>}><Nav.Link eventKey="second"><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/firbase.png`} /></Nav.Link></OverlayTrigger></Nav.Item>
	// 						</Nav>
	// 						<Tab.Content>
	// 							<Tab.Pane eventKey="first">
	// 								<Card className="mb-0">
	// 									<Row className="row-sm">

	// 										<Col lg={6} xl={5} className="d-none d-lg-block text-center bg-primary details">
	// 											<div className="mt-5 pt-4 p-2 position-absolute">
	// 												<Link href={"/apps/DashboardVms"}><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/logo-umira.png`} className="header-brand-img mb-4" alt="logo" /></Link>
	// 												<div className="clearfix"></div>
	// 												{/* <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/svgs/user.svg`} className="ht-100 mb-0" alt="user" /> */}
	// 												<h5 className="mt-4">Information Management System</h5>
	// 												<span className="text-white-6 fs-13 mb-5 mt-xl-0">Login account, discover and connect with information management system umira</span>
	// 											</div>
	// 										</Col>
	// 										<Col lg={6} xl={7} xs={12} sm={12} className="login_form ">
	// 											<div className="main-container container-fluid">
	// 												<Row className="row-sm">
	// 													<Card.Body className="mt-2 mb-2">
	// 														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-white.png`} className="d-lg-none header-brand-img text-start float-start mb-4 error-logo-light" alt="logo" />
	// 														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-logo.png`} className="d-lg-none header-brand-img text-start float-start mb-4 error-logo" alt="logo" />
	// 														<div className="clearfix"></div>
	// 														<form>
	// 															<h5 className="text-start mb-2">Signin to Your Account</h5>
	// 															<p className="mb-4 text-muted fs-13 ms-0 text-start"></p>
	// 															{err && <Alert variant="danger">{err}</Alert>}
	// 															<Form.Group className="text-start form-group">
	// 																<Form.Label>Email</Form.Label>
	// 																<Form.Control type="email" placeholder="Email" name='email' defaultValue={email} onChange={changeHandler} />
	// 															</Form.Group>
	// 															<div className="text-start form-group">
	// 																<Form.Label>Password</Form.Label>
	// 																<div className="input-group">
	// 																	<Form.Control className="form-control form-control-lg" id="signin-password"
	// 																		placeholder="Enter your password"
	// 																		name="password"
	// 																		type={(passwordshow1) ? "text" : "password"}
	// 																		value={password}
	// 																		onChange={changeHandler}
	// 																		required />
	// 																	<button className="btn btn-light bg-transparent" type="button"
	// 																		onClick={() => setpasswordshow1(!passwordshow1)} id="button-addon2">
	// 																		<i className={`${passwordshow1 ? "ri-eye-line" : "ri-eye-off-line"} align-middle`}></i></button>
	// 																</div>
	// 															</div>
	// 															<div className="d-grid">
	// 																<Link href={"/components/dashboard/dashboard/"} className="btn btn-primary" onClick={Login1}>Sign In</Link>
	// 															</div>
	// 														</form>
	// 														<div className="text-start mt-5 ms-0">
	// 															<div className="mb-1"><Link href={"/components/authentication/resetpassword/"}>Forgot password?</Link></div>
	// 															{/* <div>Don't have an account? <Link href={"/components/authentication/signup/"}>Register Here</Link></div> */}
	// 														</div>
	// 													</Card.Body>
	// 												</Row>
	// 											</div>
	// 										</Col>
	// 									</Row>
	// 								</Card>
	// 							</Tab.Pane>
	// 							<Tab.Pane eventKey="second">
	// 								<Card className="mb-0">
	// 									<Row className="row-sm">

	// 										<Col lg={6} xl={5} className="d-none d-lg-block text-center bg-primary details">
	// 											<div className="mt-5 pt-5 p-2 position-absolute">
	// 												<Link href={"/components/dashboard/dashboard/"}><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-white.png`} className="header-brand-img mb-4" alt="logo" /></Link>
	// 												<div className="clearfix"></div>
	// 												<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/svgs/user.svg`} className="ht-100 mb-0" alt="user" />
	// 												<h5 className="mt-4">Create Your Account</h5>
	// 												<span className="text-white-6 fs-13 mb-5 mt-xl-0">Signup to create, discover and connect with the system information umira</span>
	// 											</div>
	// 										</Col>
	// 										<Col lg={6} xl={7} xs={12} sm={12} className="login_form ">
	// 											<div className="main-container container-fluid">
	// 												<Row className="row-sm">
	// 													<Card.Body className="mt-2 mb-2">
	// 														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-white.png`} className="d-lg-none header-brand-img text-start float-start mb-4 error-logo-light" alt="logo" />
	// 														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-logo.png`} className=" d-lg-none header-brand-img text-start float-start mb-4 error-logo" alt="logo" />
	// 														<div className="clearfix"></div>
	// 														<h5 className="text-start mb-2">Register Account</h5>
	// 														<p className="mb-4 text-muted fs-13 ms-0 text-start">It's signup only takes a minute.</p>
	// 														<form>
	// 															<Form.Group className="text-start form-group ">
	// 																<label className="form-label">Nama Perusahaan</label>
	// 																<input className="form-control" placeholder="Nama Perusahaan" type="text" />
	// 															</Form.Group>
	// 															<Form.Group className="text-start form-group">
	// 																<label className="form-label">Email</label>
	// 																<input className="form-control" placeholder="Email" type="text" />
	// 															</Form.Group>
	// 															<Form.Group className="text-start form-group">
	// 																<label className="form-label">Password</label>
	// 																<input className="form-control" placeholder="Password" type="password" />
	// 															</Form.Group>
	// 															<div className="d-grid">
	// 																<Link href={"/components/dashboard/dashboard/"} className="btn btn-primary">Create Account</Link>
	// 															</div>
	// 														</form>
	// 														<div className="text-start mt-5 ms-0">
	// 															<p className="mb-0">Already have an account? <Link href={"/components/authentication/signin/"}>Sign In</Link></p>
	// 														</div>
	// 													</Card.Body>
	// 												</Row>
	// 											</div>
	// 										</Col>

	// 									</Row>
	// 								</Card>
	// 							</Tab.Pane>
	// 						</Tab.Content>
	// 					</Tab.Container>
	// 				</Col>
	// 			</Row>
	// 		</div>
	// 	</Fragment>
	// );
};

export default Home;

