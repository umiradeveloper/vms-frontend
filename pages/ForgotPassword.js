
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
import AxiosConfig from "@/utils/AxiosConfig";
const Select = dynamic(() => import("react-select"), { ssr: false });

const ForgotPassword = () => {
    
    const [showToast, setShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState(null);
    const [headerToast, setHeaderToast] = useState(null);
    const [colorToast, setColorToast] = useState(null);
	const [branch, setBranch] = useState();

	const [loader, setLoader] = useState(false);
	const router = useRouter();
	const [err, setError] = useState("");
    const [email, setEmail] = useState("");
	
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

    const reset = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        setLoader(true);
        try {
            const response = await AxiosConfig.get(apiUrl+"/auth/forgot-password?email="+email, {
                headers:{
                    "Content-Type":"application/json"
                }
            });
          
			if(response.status){
                // console.log(error);
                // setErrorRegister(response.data.message);
                // setLoader(false);
                swalAlert(response.data.message, response.status, "success");
            }
			
            
        } catch (error) {
            console.log(error);
            // setErrorRegister(error.response.data.message);
			// setLoader(false);
			// swalAlert(error.response.data.message, error.status, "error");
        }finally{
			setLoader(false)
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
	


    return(
        	<Fragment>

			<Seo title={"Forgot Password"} />
			<LoadersSimUmira open={loader} />
			<div className="page main-signin-wrapper">
                <ToastContainerVms show={showToast} setShow={setShowToast} color={colorToast} message={messageToast} header={headerToast}/>
				{/* {console.log("test",branch)} */}
				<Row className="signpages text-center">
					<Col md={12}>
						<Tab.Container id="left-tabs-example" defaultActiveKey="first">
							<Nav variant="pills" className='d-inline-flex bg-white p-2 rounded-2'>
								<Nav.Item><OverlayTrigger overlay={<Tooltip>Login</Tooltip>}><Nav.Link eventKey="first"><i className="si si-login"></i></Nav.Link></OverlayTrigger></Nav.Item>
							</Nav>
							<Tab.Content>
								<Tab.Pane eventKey="first">
									<Card className="mb-0">
										<Row className="row-sm">

											{/* <Col lg={6} xl={5} className="d-none d-lg-block text-center bg-primary details border-end" style={{ borderRight: "1px solid rgba(255,255,255,0.3)" }}>
												<div className="mt-5 pt-4 p-2 position-absolute">
													<Link href={"/apps/DashboardVms"}><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/logo-umira.png`} className="header-brand-img mb-4" alt="logo" /></Link>
													<div className="clearfix"></div>
													<h5 className="mt-4" style={{ color: "#000" }}>Information Management System</h5>
													<span className="fs-13 mb-5 mt-xl-0" style={{ color: "#000" }}>Login account, discover and connect with information management system umira</span>
												</div>
											</Col> */}
											<Col lg={12} xl={12} xs={12} sm={12} className="login_form ">
												<div className="main-container container-fluid">
													<Row className="row-sm">
														<Card.Body className="mt-2 mb-2">
															<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/logo-umira.png`} className="d-lg-none header-brand-img text-start float-start mb-4 error-logo-light" alt="logo" />
															<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/logo-umira.png`} className="d-lg-none header-brand-img text-start float-start mb-4 error-logo" alt="logo" />
															<div className="clearfix"></div>
															<form>
																<h5 className="text-start mb-2">Forgot Password</h5>
																<p className="mb-4 text-muted fs-13 ms-0 text-start"></p>
																{err && <Alert variant="danger">{err}</Alert>}
																<Form.Group className="text-start form-group">
																	<Form.Label>Email / No Handphone</Form.Label>
																	<Form.Control type="text" placeholder="Email / Nomor Handphone" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
																</Form.Group>
																
																
																<div className="d-grid">
																	{/* <Link href={"/apps/DashboardVms"} className="btn btn-dark" onClick={Login1}>Sign In</Link> */}
                                                                    <Button className="btn btn-dark" onClick={reset}>
                                                                        Reset
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
								
							</Tab.Content>
						</Tab.Container>
					</Col>
				</Row>
			</div>
		</Fragment>
    )
}

export default dynamic(() => Promise.resolve(ForgotPassword), { ssr: false });

