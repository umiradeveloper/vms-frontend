import { Fragment } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import Link from "next/link";
import Seo from "../../../shared/layout-components/seo/seo";
import { basePath } from "@/next.config";

const Signin = () => {
	return (
		<Fragment>
			<Seo title={"Signin"} />
			<div className="page main-signin-wrapper">
				<Row className="signpages text-center">
					<Col md={12}>
						<Card className="mb-0">
							<Row className="row-sm">
								<Col lg={6} xl={5} className="d-none d-lg-block text-center bg-primary details">
									<div className="mt-5 pt-4 p-2 position-absolute">
										<Link href={"/components/dashboard/dashboard/"}><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-white.png`} className="header-brand-img mb-4" alt="logo" /></Link>
										<div className="clearfix"></div>
										<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/svgs/user.svg`} className="ht-100 mb-0" alt="user" />
										<h5 className="mt-4">Selamat Datang Di Aplikasi VMS</h5>
										<span className="text-white-6 fs-13 mb-5 mt-xl-0">Signup to create, discover and connect with the global community</span>
									</div>
								</Col>
								<Col lg={6} xl={7} xs={12} sm={12} className="login_form ">
									<div className="main-container container-fluid">
										<Row className="row-sm">
											<Card.Body className="mt-2 mb-2">
												<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-white.png`} className="d-lg-none header-brand-img text-start float-start mb-4 error-logo-light" alt="logo" />
												<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-logo.png`} className="d-lg-none header-brand-img text-start float-start mb-4 error-logo" alt="logo" />
												<div className="clearfix"></div>
												<form>
													<h5 className="text-start mb-2">Signin to Your Account</h5>
													<p className="mb-4 text-muted fs-13 ms-0 text-start">Signin to create, discover and connect with the global community</p>
													<Form.Group className="text-start form-group">
														<Form.Label>Email</Form.Label>
														<Form.Control placeholder="Enter your email" type="text" />
													</Form.Group>
													<div className="text-start form-group">
														<Form.Label>Password</Form.Label>
														<Form.Control placeholder="Enter your password" type="password" />
													</div>
													<div className="d-grid">
														<Link href={"/components/dashboard/dashboard/"} className="btn btn-primary">Sign In</Link>
													</div>
												</form>
												<div className="text-start mt-5 ms-0">
													<div className="mb-1"><Link href={"/components/authentication/resetpassword/"}>Forgot password?</Link></div>
													<div>Don't have an account? <Link href={"/components/authentication/signup/"}>Register Here</Link></div>
												</div>
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
Signin.layout = "Authenticationlayout";
export default Signin;
