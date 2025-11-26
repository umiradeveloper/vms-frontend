import { Fragment, useState } from "react";
import { Tab, Nav, Dropdown, Form, Button, Col, Row, FormGroup, Card } from "react-bootstrap";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import PageHeader from "../../../shared/layout-components/page-header/page-header";
import Link from "next/link";
import { Languageoptions, TimeZoneData } from "../../../shared/data/pages/profiledata";
import Seo from "../../../shared/layout-components/seo/seo";

const Profile = () => {
	const [open, setOpen] = useState(false);
	return (
		<Fragment>
			<Seo title={"Profile"} />
			<PageHeader title='Profile' item='Pages' active_item='Profile' />
			<Tab.Container id="center-tabs-example" defaultActiveKey="first">
				<Row className="square">
					<Col lg={12} md={12}>
						<Card className="custom-card">
							<Card.Body>
								<div className="panel profile-cover">
									<div className="profile-cover__img">
										<img src={"../../../assets/images/faces/1.jpg"} alt="img" />
										<h3 className="h3">Sonia Taylor</h3>
									</div>
									<div className="btn-list btn-profile">
										<Button variant="danger" className="btn-rounded ">
											<i className="fa fa-plus me-2"></i>
											<span>Follow</span>
										</Button>
										<Button variant="success" className="btn-rounded">
											<i className="fa fa-comment me-2"></i>
											<span>Message</span>
										</Button>
									</div>
									<div className="profile-cover__action bg-img"></div>
									<div className="profile-cover__info">
										<ul className="nav">
											<li> <strong>26</strong>Projects </li>
											<li> <strong>33</strong>Followers </li>
											<li> <strong>136</strong>Following </li>
										</ul>
									</div>
									<div className="profile-tab tab-menu-heading">
										<Nav variant="pills" className="p-1 bg-primary-transparent rounded">
											<Nav.Item> <Nav.Link eventKey="first">About</Nav.Link> </Nav.Item>
											<Nav.Item> <Nav.Link eventKey="editprofile">Edit Profile </Nav.Link> </Nav.Item>
											<Nav.Item> <Nav.Link eventKey="timeline">Timeline</Nav.Link> </Nav.Item>
											<Nav.Item> <Nav.Link eventKey="gallery">Gallery</Nav.Link> </Nav.Item>
											<Nav.Item> <Nav.Link eventKey="friends">Friends </Nav.Link> </Nav.Item>
											<Nav.Item> <Nav.Link eventKey="accountsetting"> Account Settings </Nav.Link> </Nav.Item>
										</Nav>
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Row className="row-sm">
					<Col md={12} lg={12}>
						<Card className="custom-card main-content-body-profile">
							<Tab.Content>
								<Tab.Pane eventKey="first">
									<Col lg={12} md={12}>
										<Card className="custom-card main-content-body-profile">
											<div className="tab-content">
												<div className="main-content-body tab-pane p-sm-4 p-0 border-top-0 active">
													<div className=" p-0 border p-0 rounded-10">
														<div className="p-4">
															<h4 className="fs-15 text-uppercase mb-3">
																BIOdata
															</h4>
															<p className="m-b-5">
																Hi I'm Petey Cruiser,has been the industry's
																standard dummy text ever since the 1500s, when
																an unknown printer took Link galley of type.
																Donec pede justo, fringilla vel, aliquet nec,
																vulputate eget, arcu. In enim justo, rhoncus
																ut, imperdiet a, venenatis vitae, justo.
																Nullam dictum felis eu pede mollis pretium.
																Integer tincidunt.Cras dapibus. Vivamus
																elementum semper nisi. Aenean vulputate
																eleifend tellus. Aenean leo ligula, porttitor
																eu, consequat vitae, eleifend ac, enim.
															</p>
															<div className="m-t-30">
																<h4 className="fs-15 text-uppercase mt-3">
																	Experience
																</h4>
																<div className=" p-t-10">
																	<h5 className="text-primary m-b-5 fs-14">
																		Lead designer / Developer
																	</h5>
																	<p className="">websitename.com</p>
																	<p>
																		<b>2010-2015</b>
																	</p>
																	<p className="text-muted fs-13 mb-0">
																		Lorem Ipsum is simply dummy text of the
																		printing and typesetting industry. Lorem
																		Ipsum has been the industry's standard
																		dummy text ever since the 1500s, when an
																		unknown printer took a galley of type and
																		scrambled it to make a type specimen book.
																	</p>
																</div>

																<Card.Body className="px-0 pb-0">
																	<h5 className="text-primary m-b-5 fs-14">
																		Senior Graphic Designer
																	</h5>
																	<p className="">coderthemes.com</p>
																	<p>
																		<b>2007-2009</b>
																	</p>
																	<p className="text-muted fs-13 mb-0">
																		Lorem Ipsum is simply dummy text of the
																		printing and typesetting industry. Lorem
																		Ipsum has been the industry's standard
																		dummy text ever since the 1500s, when an
																		unknown printer took a galley of type and
																		scrambled it to make a type specimen book.
																	</p>
																</Card.Body>
															</div>
														</div>
														<div className="border-top"></div>
														<div className="p-4">
															<label className="main-content-label fs-13 mg-b-20">Contact</label>
															<div className="d-sm-flex">
																<div className="mb-3 mb-sm-0">
																	<div className="main-profile-contact-list">
																		<div className="media">
																			<div className="media-icon bg-primary-transparent text-primary"> <i className="bi bi-telephone-forward"></i> </div>
																			<div className="media-body"> <span>Mobile</span>
																				<div> +245 354 654 </div>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="ms-0 ms-sm-3 mb-3 mb-sm-0">
																	<div className="main-profile-contact-list">
																		<div className="media">
																			<div className="media-icon bg-success-transparent text-success"> <i className="bi bi-lightning-charge"></i> </div>
																			<div className="media-body"> <span>Slack</span>
																				<div> @spruko.w </div>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="ms-0 ms-sm-3 mb-3 mb-sm-0">
																	<div className="main-profile-contact-list">
																		<div className="media">
																			<div className="media-icon bg-info-transparent text-info"> <i className="bi bi-geo-alt"></i> </div>
																			<div className="media-body"> <span>Current Address</span>
																				<div> San Francisco, CA </div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="border-top"></div>
														<div className="p-3 p-sm-4">
															<label className="main-content-label fs-13 mg-b-20">Social</label>
															<div className="d-xl-flex">
																<div className="mb-3 mb-xl-0">
																	<div className="main-profile-social-list">
																		<div className="media">
																			<div className="media-icon bg-primary-transparent text-primary"> <i className="bi bi-github"></i> </div>
																			<div className="media-body"> <span>Github</span> <Link href="#!">github.com/spruko</Link> </div>
																		</div>
																	</div>
																</div>
																<div className="ms-0 ms-xl-3 mb-3 mb-xl-0">
																	<div className="main-profile-social-list">
																		<div className="media">
																			<div className="media-icon bg-success-transparent text-success"> <i className="ri-twitter-x-fill"></i> </div>
																			<div className="media-body"> <span>Twitter</span> <Link href="#!">twitter.com/spruko.me</Link> </div>
																		</div>
																	</div>
																</div>
																<div className="ms-0 ms-xl-3 mb-3 mb-xl-0">
																	<div className="main-profile-social-list">
																		<div className="media">
																			<div className="media-icon bg-info-transparent text-info"> <i className="bi bi-linkedin"></i> </div>
																			<div className="media-body"> <span>Linkedin</span> <Link href="#!">linkedin.com/in/spruko</Link> </div>
																		</div>
																	</div>
																</div>
																<div className="ms-0 ms-xl-3 mb-3 mb-xl-0">
																	<div className="main-profile-social-list">
																		<div className="media">
																			<div className="media-icon bg-danger-transparent text-danger"> <i className="bi bi-link-45deg"></i> </div>
																			<div className="media-body"> <span>My Portfolio</span> <Link href="#!">spruko.com/</Link> </div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</Card>
									</Col>
								</Tab.Pane>
								<Tab.Pane eventKey="editprofile">
									<div className="main-content-body tab-pane p-sm-4 p-0 border-top-0">
										<Card.Body className="border">
											<div className="mb-4 main-content-label">Personal Information</div>
											<Form className="form-horizontal">
												<div className="mb-4 main-content-label">Name</div>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>User Name</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control placeholder="User Name" type="text" defaultValue="Mack Adamia" />
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>First Name</Form.Label>
														</Col>
														<Col md={9}><Form.Control placeholder="First Name" type="text" defaultValue="Mack Adamia" />
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>last Name</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control placeholder="Last Name" type="text" defaultValue="Mack Adamia" />
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>Nick Name</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control placeholder="Nick Name" type="text" defaultValue="Spruha" />
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>Designation</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control placeholder="Designation" type="text" defaultValue="Web Designer" />
														</Col>
													</Row>
												</Form.Group>
												<div className="mb-4 main-content-label">Contact Info</div>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>Email<i>(required)</i></Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control placeholder="Email" type="text" defaultValue="info@Spruha.in" />
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>Website</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control placeholder="Website" type="text" defaultValue="@spruko.w" />
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>Phone</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control placeholder="phone number" type="text" defaultValue="+245 354 654" />
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>Address</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control as='textarea' name="example-textarea-input" rows={2} placeholder="Address" defaultValue='San Francisco, CA' />
														</Col>
													</Row>
												</Form.Group>
												<div className="mb-4 main-content-label">Social Info</div>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>Twitter</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control placeholder="twitter" type="text" defaultValue="twitter.com/spruko.me" />
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>Facebook</Form.Label>
														</Col><Col md={9}>
															<Form.Control placeholder="facebook" type="text" defaultValue="https://www.facebook.com/Spruha" />
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>Google+</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control placeholder="google" type="text" defaultValue="spruko.com" />
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>Linked in</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control placeholder="linkedin" type="text" defaultValue="linkedin.com/in/spruko" />
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>Github</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control placeholder="github" type="text" defaultValue="github.com/sprukos" />
														</Col>
													</Row>
												</Form.Group>
												<div className="mb-4 main-content-label">About Yourself</div>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>Biographical Info</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control as='textarea' name="example-textarea-input" rows={4} placeholder="pleasure rationally encounter but because pursue consequences that are extremely painful.occur in which toil and pain can procure him some great pleasure.." />
														</Col>
													</Row>
												</Form.Group>
												<div className="mb-4 main-content-label">Email Preferences</div>
												<Form.Group className="mb-0">
													<Row className="row-sm">
														<Col md={3}>
															<Form.Label>Verified User</Form.Label>
														</Col>
														<Col md={9}>
															<div className="form-check">
																<input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckDefault1" defaultChecked />
																<label className="form-check-label" htmlFor="flexCheckDefault1">
																	Accept to receive post or page notification emails
																</label>
															</div>
															<div className="form-check">
																<input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckDefault2" defaultChecked />
																<label className="form-check-label" htmlFor="flexCheckDefault2">
																	Accept to receive email sent to multiple recipients
																</label>
															</div>
														</Col>
													</Row>
												</Form.Group>
											</Form>
										</Card.Body>
									</div>
								</Tab.Pane>
								<Tab.Pane eventKey="timeline">
									<div className="main-content-body main-content-body-profile">
										<div className="main-profile-body p-0">
											<div className="row row-sm">
												<div className="col-12">
													<div className="card mg-b-20 border">
														<div className="card-header p-4 d-block">
															<div className="media">
																<div className="media-user me-2">
																	<div className="main-img-user avatar-md"><img alt="" className="rounded-circle" src={"../../../assets/images/faces/6.jpg"} /></div>
																</div>
																<div className="media-body">
																	<h6 className="mb-0 mg-t-2 ms-2">Mintrona Pechon Pechon</h6><span className="text-primary ms-2">just now</span> </div>
																<div className="ms-auto">
																	<Dropdown>
																		<Dropdown.Toggle as='a' className="new no-caret option-dots2" variant="" id="dropdown-basic"><i className="fas fa-ellipsis-v"></i></Dropdown.Toggle>
																		<Dropdown.Menu className="dropdown-menu-end shadow">
																			<Dropdown.Item>Edit Post</Dropdown.Item>
																			<Dropdown.Item>Delete Post</Dropdown.Item>
																			<Dropdown.Item>Personal Settings</Dropdown.Item>
																		</Dropdown.Menu>
																	</Dropdown>
																</div>
															</div>
														</div>
														<div className="card-body">
															<p className="mg-t-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
															<div className="row row-sm">
																<div className="col">
																	<img alt="img" className="wd-200 me-4 br-4" src={"../../../assets/images/media/media-4.jpg"} />
																	<img alt="img" className="wd-200 br-4 mt-2 mt-sm-0" src={"../../../assets/images/media/media-5.jpg"} />
																</div>
															</div>
															<div className="media mg-t-15 profile-footer">
																<div className="media-user me-2">
																	<div className="avatar-list-stacked">
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/1.jpg"} alt="img" />
																		</span>
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/3.jpg"} alt="img" />
																		</span>
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/2.jpg"} alt="img" />
																		</span>
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/10.jpg"} alt="img" />
																		</span>
																		<Link className="avatar avatar-sm bg-primary avatar-rounded text-fixed-white" href="#!">+8</Link>
																	</div>

																</div>
																<div className="media-body">
																	<h6 className="mb-0 mg-t-10">28 people like your photo</h6> </div>
																<div className="ms-auto mt-1 mt-sm-0">
																	<div className="dropdown show">
																		<Link className="new" href="#!"><i className="far fa-heart me-3"></i></Link>
																		<Link className="new" href="#!"><i className="far fa-comment me-3"></i></Link>
																		<Link className="new" href="#!"><i className="far fa-share-square"></i></Link>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="card mg-b-20 border">
														<div className="card-header p-4 d-block">
															<div className="media">
																<div className="media-user me-2">
																	<div className="main-img-user avatar-md"><img alt="" className="rounded-circle" src={"../../../assets/images/faces/6.jpg"} /></div>
																</div>
																<div className="media-body">
																	<h6 className="mb-0 ms-2 mg-t-3">Mintrona Pechon Pechon</h6><span className="text-muted ms-2">Sep 26 2019, 10:14am</span> </div>
																<div className="ms-auto">
																	<Dropdown>
																		<Dropdown.Toggle as='a' className="new no-caret option-dots2" variant="" id="dropdown-basic"><i className="fas fa-ellipsis-v"></i></Dropdown.Toggle>
																		<Dropdown.Menu className="dropdown-menu-end shadow">
																			<Dropdown.Item>Edit Post</Dropdown.Item>
																			<Dropdown.Item>Delete Post</Dropdown.Item>
																			<Dropdown.Item>Personal Settings</Dropdown.Item>
																		</Dropdown.Menu>
																	</Dropdown>
																</div>
															</div>
														</div>
														<div className="card-body h-100">
															<p className="mg-t-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
															<div className="row row-sm">
																<div className="col">
																	<img alt="img" className="wd-200 mt-2 mt-sm-0 me-4 br-4" src={"../../../assets/images/media/media-9.jpg"} />
																	<img alt="img" className="wd-200 mt-2 mt-sm-0 br-4" src={"../../../assets/images/media/media-12.jpg"} />
																</div>
															</div>
															<div className="media mg-t-15 profile-footer">
																<div className="media-user me-2">
																	<div className="avatar-list-stacked">
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/1.jpg"} alt="img" />
																		</span>
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/3.jpg"} alt="img" />
																		</span>
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/2.jpg"} alt="img" />
																		</span>
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/10.jpg"} alt="img" />
																		</span>
																		<Link className="avatar avatar-sm bg-primary avatar-rounded text-fixed-white" href="#!">
																			+8
																		</Link>
																	</div>

																</div>
																<div className="media-body">
																	<h6 className="mb-0 mg-t-10">28 people like your photo</h6> </div>
																<div className="ms-auto mt-1 mt-sm-0">
																	<div className="dropdown show"> <Link className="new" href="#!"><i className="far fa-heart me-3"></i></Link> <Link className="new" href="#!"><i className="far fa-comment me-3"></i></Link> <Link className="new" href="#!"><i className="far fa-share-square"></i></Link> </div>
																</div>
															</div>
														</div>
													</div>
													<div className="card mg-b-20 border">
														<div className="card-header p-4 d-block">
															<div className="media">
																<div className="media-user me-2">
																	<div className="main-img-user avatar-md"><img alt="" className="rounded-circle" src={"../../../assets/images/faces/6.jpg"} /></div>
																</div>
																<div className="media-body">
																	<h6 className="mb-0 ms-2 mg-t-3">Mintrona Pechon Pechon</h6><span className="text-muted ms-2">Sep 26 2019, 10:14am</span> </div>
																<div className="ms-auto">
																	<Dropdown>
																		<Dropdown.Toggle as='a' className="new no-caret option-dots2" variant="" id="dropdown-basic"><i className="fas fa-ellipsis-v"></i></Dropdown.Toggle>
																		<Dropdown.Menu className="dropdown-menu-end shadow">
																			<Dropdown.Item>Edit Post</Dropdown.Item>
																			<Dropdown.Item>Delete Post</Dropdown.Item>
																			<Dropdown.Item>Personal Settings</Dropdown.Item>
																		</Dropdown.Menu>
																	</Dropdown>
																</div>
															</div>
														</div>
														<div className="card-body h-100">
															<p className="mg-t-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
															<div className="media mg-t-15 profile-footer">
																<div className="media-user me-2">
																	<div className="avatar-list-stacked">
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/1.jpg"} alt="img" />
																		</span>
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/3.jpg"} alt="img" />
																		</span>
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/2.jpg"} alt="img" />
																		</span>
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/10.jpg"} alt="img" />
																		</span>
																		<Link className="avatar avatar-sm bg-primary avatar-rounded text-fixed-white" href="#!">
																			+8
																		</Link>
																	</div>

																</div>
																<div className="media-body">
																	<h6 className="mb-0 mg-t-10">28 people like your photo</h6> </div>
																<div className="ms-auto mt-1 mt-sm-0">
																	<div className="dropdown show">
																		<Link className="new" href="#!"><i className="far fa-heart me-3"></i></Link>
																		<Link className="new" href="#!"><i className="far fa-comment me-3"></i></Link>
																		<Link className="new" href="#!"><i className="far fa-share-square"></i></Link>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="card border">
														<div className="card-header p-4 d-block">
															<div className="media">
																<div className="media-user me-2">
																	<div className="main-img-user avatar-md"><img alt="" className="rounded-circle" src={"../../../assets/images/faces/2.jpg"} /></div>
																</div>
																<div className="media-body">
																	<h6 className="mb-0 ms-2 mg-t-3">Mintrona Pechon Pechon</h6><span className="text-muted ms-2">Sep 26 2019, 10:14am</span> </div>
																<div className="ms-auto">
																	<Dropdown>
																		<Dropdown.Toggle as='a' className="new no-caret option-dots2" variant="" id="dropdown-basic"><i className="fas fa-ellipsis-v"></i></Dropdown.Toggle>
																		<Dropdown.Menu className="dropdown-menu-end shadow">
																			<Dropdown.Item>Edit Post</Dropdown.Item>
																			<Dropdown.Item>Delete Post</Dropdown.Item>
																			<Dropdown.Item>Personal Settings</Dropdown.Item>
																		</Dropdown.Menu>
																	</Dropdown>
																</div>
															</div>
														</div>
														<div className="card-body h-100">
															<p className="mg-t-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
															<div className="row row-sm">
																<div className="col">
																	<img alt="img" className="wd-200 me-3 br-4 mt-2 mt-sm-0" src={"../../../assets/images/media/media-9.jpg"} />
																	<img alt="img" className="wd-200 br-4 mt-2 mt-sm-0" src={"../../../assets/images/media/media-17.jpg"} />
																</div>
															</div>
															<div className="media mg-t-15 profile-footer">
																<div className="media-user me-2">
																	<div className="avatar-list-stacked">
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/1.jpg"} alt="img" />
																		</span>
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/3.jpg"} alt="img" />
																		</span>
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/2.jpg"} alt="img" />
																		</span>
																		<span className="avatar avatar-sm avatar-rounded">
																			<img src={"../../../assets/images/faces/10.jpg"} alt="img" />
																		</span>
																		<Link className="avatar avatar-sm bg-primary avatar-rounded text-fixed-white" href="#!">
																			+8
																		</Link>
																	</div>
																</div>
																<div className="media-body">
																	<h6 className="mb-0 mg-t-10">28 people like your photo</h6> </div>
																<div className="ms-auto mt-1 mt-sm-0">
																	<div className="dropdown show">
																		<Link className="new" href="#!"><i className="far fa-heart me-3"></i></Link>
																		<Link className="new" href="#!"><i className="far fa-comment me-3"></i></Link>
																		<Link className="new" href="#!"><i className="far fa-share-square"></i></Link>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Tab.Pane>
								<Tab.Pane eventKey="gallery">
									<Card.Body className="border">
										<Row>
											<Col lg={3} md={3} sm={6} col={12}>
												<Link href="#!" className="glightbox card" onClick={() => setOpen(true)}><img src={"../../../assets/images/media/media-4.jpg"} alt="image" /></Link>
											</Col>
											<Col lg={3} md={3} sm={6} col={12}>
												<Link href="#!" className="glightbox card" onClick={() => setOpen(true)}><img src={"../../../assets/images/media/media-5.jpg"} alt="image" /></Link>
											</Col>
											<Col lg={3} md={3} sm={6} col={12}>
												<Link href="#!" className="glightbox card" onClick={() => setOpen(true)}> <img src={"../../../assets/images/media/media-8.jpg"} alt="image" /></Link>
											</Col>
											<Col lg={3} md={3} sm={6} col={12}>
												<Link href="#!" className="glightbox card" onClick={() => setOpen(true)}><img src={"../../../assets/images/media/media-9.jpg"} alt="image" /></Link>
											</Col>
											<Col lg={3} md={3} sm={6} col={12}>
												<Link href="#!" className="glightbox card" onClick={() => setOpen(true)}><img src={"../../../assets/images/media/media-12.jpg"} alt="image" /></Link>
											</Col>
											<Col lg={3} md={3} sm={6} col={12}>
												<Link href="#!" className="glightbox card" onClick={() => setOpen(true)}><img src={"../../../assets/images/media/media-17.jpg"} alt="image" /></Link>
											</Col>
											<Col lg={3} md={3} sm={6} col={12}>
												<Link href="#!" className="glightbox card" onClick={() => setOpen(true)}><img src={"../../../assets/images/media/media-17.jpg"} alt="image" /></Link>
											</Col>
											<Col lg={3} md={3} sm={6} col={12}>
												<Link href="#!" className="glightbox card" onClick={() => setOpen(true)}><img src={"../../../assets/images/media/media-5.jpg"} alt="image" /></Link>
											</Col>
											<Lightbox open={open} close={() => setOpen(false)} plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]} zoom={{ maxZoomPixelRatio: 10, scrollToZoom: true }}
												slides={[{ src: "../../../assets/images/media/media-4.jpg" }, { src: "../../../assets/images/media/media-5.jpg" }, { src: "../../../assets/images/media/media-8.jpg" }, { src: "../../../assets/images/media/media-9.jpg" }, { src: "../../../assets/images/media/media-12.jpg" }, { src: "../../../assets/images/media/media-17.jpg" }, { src: "../../../assets/images/media/media-17.jpg" }, { src: "../../../assets/images/media/media-5.jpg" }]} />
										</Row>
									</Card.Body>
								</Tab.Pane>
								<Tab.Pane eventKey="friends" className="main-content-body tab-pane border-top-0">
									<Card.Body className="pd-b-10">
										<Row className="row-sm">
											<Col sm={12} md={6} xl={3}>
												<Card className="custom-card border p-2">
													<div className=" text-center card-body">
														<div className="user-lock text-center">
															<Dropdown className="text-end">
																<Dropdown.Toggle as='a' variant="" className="no-caret"> <i className="fe fe-more-vertical"></i> </Dropdown.Toggle>
																<Dropdown.Menu className=" dropdown-menu-end" style={{ marginTop: "0px" }}>
																	<Dropdown.Item> <i className="fe fe-message-square me-2"></i> Message</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-edit-2 me-2"></i> Edit</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-eye me-2"></i> View </Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-trash-2 me-2"></i> Delete </Dropdown.Item>
																</Dropdown.Menu>
															</Dropdown>
															<Link href="#!"> <img alt="avatar" className="rounded-circle" src={"../../../assets/images/faces/4.jpg"} /> </Link>
														</div>
														<Link href="#!"> <h6 className=" mb-1 mt-3 main-content-label"> Socrates Itumay </h6> </Link>
														<p className="mb-2 mt-1"> Project Manager </p>
														<p className="text-muted text-center mt-1">
															Lorem Ipsum is not simply popular belief
															Contrary.
														</p>
													</div>
												</Card>
											</Col>
											<Col sm={12} md={6} lg={6} xl={3}>
												<Card className="custom-card border p-2">
													<div className=" text-center card-body">
														<div className="user-lock text-center">
															<Dropdown className="text-end">
																<Dropdown.Toggle as='a' className="no-caret" variant=""> <i className="fe fe-more-vertical"></i> </Dropdown.Toggle>
																<Dropdown.Menu className=" dropdown-menu-end" style={{ marginTop: "0px" }}>
																	<Dropdown.Item> <i className="fe fe-message-square me-2"></i> Message</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-edit-2 me-2"></i> Edit</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-eye me-2"></i> View </Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-trash-2 me-2"></i> Delete </Dropdown.Item>
																</Dropdown.Menu>
															</Dropdown>
															<Link href="#!"> <img alt="avatar" className="rounded-circle" src={"../../../assets/images/faces/3.jpg"} /> </Link>
														</div>
														<Link href="#!"> <h6 className="mb-1 mt-3  main-content-label"> Reynante Labares </h6> </Link>
														<p className="mb-2 mt-1">  Web Designer </p>
														<p className="text-muted text-center mt-1">
															Lorem Ipsum is not simply popular belief
															Contrary.
														</p>
													</div>
												</Card>
											</Col>
											<Col sm={12} md={6} lg={6} xl={3}>
												<Card className="custom-card border p-2">
													<div className=" text-center card-body">
														<div className="user-lock text-center">
															<Dropdown className="text-end">
																<Dropdown.Toggle as='a' className="no-caret" variant=""> <i className="fe fe-more-vertical"></i> </Dropdown.Toggle>
																<Dropdown.Menu className=" dropdown-menu-end" style={{ marginTop: "0px" }}>
																	<Dropdown.Item> <i className="fe fe-message-square me-2"></i> Message</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-edit-2 me-2"></i> Edit</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-eye me-2"></i> View </Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-trash-2 me-2"></i> Delete </Dropdown.Item>
																</Dropdown.Menu>
															</Dropdown>
															<Link href="#!"> <img alt="avatar" className="rounded-circle" src={"../../../assets/images/faces/4.jpg"} /> </Link>
														</div>
														<Link href="#!"> <h6 className="mb-1 mt-3 main-content-label"> Owen Bongcaras </h6> </Link>
														<p className="mb-2 mt-1"> App Developer </p>
														<p className="text-muted text-center mt-1">
															Lorem Ipsum is not simply popular belief
															Contrary.
														</p>
													</div>
												</Card>
											</Col>
											<Col sm={12} md={6} lg={6} xl={3}>
												<Card className="custom-card border p-2">
													<div className=" text-center card-body">
														<div className="text-center">
															<div className="user-lock text-center">
																<Dropdown className="text-end">
																	<Dropdown.Toggle as='a' className="no-caret" variant=""><i className="fe fe-more-vertical"></i> </Dropdown.Toggle>
																	<Dropdown.Menu className=" dropdown-menu-end" style={{ marginTop: "0px" }}>
																		<Dropdown.Item> <i className="fe fe-message-square me-2"></i> Message</Dropdown.Item>
																		<Dropdown.Item> <i className="fe fe-edit-2 me-2"></i> Edit</Dropdown.Item>
																		<Dropdown.Item> <i className="fe fe-eye me-2"></i> View </Dropdown.Item>
																		<Dropdown.Item> <i className="fe fe-trash-2 me-2"></i> Delete </Dropdown.Item>
																	</Dropdown.Menu>
																</Dropdown>
																<Link href="#!"> <img alt="avatar" className="rounded-circle" src={"../../../assets/images/faces/7.jpg"} /> </Link>
															</div>
															<Link href="#!"> <h6 className="mb-1 mt-3 main-content-label"> Stephen Metcalfe </h6> </Link>
															<p className="mb-2 mt-1"> Administrator </p>
															<p className="text-muted text-center mt-1">
																Lorem Ipsum is not simply popular belief
																Contrary.
															</p>
														</div>
													</div>
												</Card>
											</Col>
											<Col sm={12} md={6} lg={6} xl={3}>
												<Card className="custom-card border p-2">
													<div className=" text-center card-body">
														<div className="user-lock text-center">
															<Dropdown className="text-end">
																<Dropdown.Toggle as='a' className="no-caret" variant=""> <i className="fe fe-more-vertical"></i> </Dropdown.Toggle>
																<Dropdown.Menu className=" dropdown-menu-end" style={{ marginTop: "0px" }}>
																	<Dropdown.Item> <i className="fe fe-message-square me-2"></i> Message</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-edit-2 me-2"></i> Edit</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-eye me-2"></i> View </Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-trash-2 me-2"></i> Delete </Dropdown.Item>
																</Dropdown.Menu>
															</Dropdown>
															<Link href="#!"> <img alt="avatar" className="rounded-circle" src={"../../../assets/images/faces/2.jpg"} /> </Link>
														</div>
														<Link href="#!"> <h6 className=" mb-1 mt-3 main-content-label"> Socrates Itumay </h6> </Link>
														<p className="mb-2 mt-1"> Project Manager </p>
														<p className="text-muted text-center mt-1">
															Lorem Ipsum is not simply popular belief
															Contrary.
														</p>
													</div>
												</Card>
											</Col>
											<Col sm={12} md={6} lg={6} xl={3}>
												<Card className="custom-card border p-2">
													<div className=" text-center card-body">
														<div className="user-lock text-center">
															<Dropdown className="text-end">
																<Dropdown.Toggle as='a' className="no-caret" variant=""> <i className="fe fe-more-vertical"></i> </Dropdown.Toggle>
																<Dropdown.Menu className=" dropdown-menu-end" style={{ marginTop: "0px" }}>
																	<Dropdown.Item> <i className="fe fe-message-square me-2"></i> Message</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-edit-2 me-2"></i> Edit</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-eye me-2"></i> View </Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-trash-2 me-2"></i> Delete </Dropdown.Item>
																</Dropdown.Menu>
															</Dropdown>
															<Link href="#!"> <img className="rounded-circle" src={"../../../assets/images/faces/1.jpg"} alt="img" /> </Link>
														</div>
														<Link href="#!"> <h6 className="mb-1 mt-3  main-content-label"> Reynante Labares </h6> </Link>
														<p className="mb-2 mt-1"> Web Designer </p>
														<p className="text-muted text-center mt-1">
															Lorem Ipsum is not simply popular belief
															Contrary.
														</p>
													</div>
												</Card>
											</Col>
											<Col sm={12} md={6} lg={6} xl={3}>
												<Card className="custom-card border p-2">
													<div className=" text-center card-body">
														<div className="user-lock text-center">
															<Dropdown className="text-end">
																<Dropdown.Toggle as='a' className="no-caret" variant=""> <i className="fe fe-more-vertical"></i> </Dropdown.Toggle>
																<Dropdown.Menu className=" dropdown-menu-end" style={{ marginTop: "0px" }}>
																	<Dropdown.Item> <i className="fe fe-message-square me-2"></i> Message</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-edit-2 me-2"></i> Edit</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-eye me-2"></i> View </Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-trash-2 me-2"></i> Delete </Dropdown.Item>
																</Dropdown.Menu>
															</Dropdown>
															<Link href="#!"> <img alt="avatar" className="rounded-circle" src={"../../../assets/images/faces/4.jpg"} /> </Link>
														</div>

														<Link href="#!"> <h6 className="mb-1 mt-3 main-content-label"> Owen Bongcaras </h6> </Link>
														<p className="mb-2 mt-1"> App Developer </p>
														<p className="text-muted text-center mt-1">
															Lorem Ipsum is not simply popular belief
															Contrary.
														</p>
													</div>
												</Card>
											</Col>
											<Col sm={12} md={6} lg={6} xl={3}>
												<Card className="custom-card border p-2">
													<div className=" text-center card-body">
														<div className="user-lock text-center">
															<Dropdown className="text-end">
																<Dropdown.Toggle as='a' className="no-caret" variant=""> <i className="fe fe-more-vertical"></i> </Dropdown.Toggle>
																<Dropdown.Menu className=" dropdown-menu-end" style={{ marginTop: "0px" }}>
																	<Dropdown.Item> <i className="fe fe-message-square me-2"></i> Message</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-edit-2 me-2"></i> Edit</Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-eye me-2"></i> View </Dropdown.Item>
																	<Dropdown.Item> <i className="fe fe-trash-2 me-2"></i> Delete </Dropdown.Item>
																</Dropdown.Menu>
															</Dropdown>
															<Link href="#!"> <img alt="avatar" className="rounded-circle" src={"../../../assets/images/faces/9.jpg"} /> </Link>
														</div>
														<Link href="#!"> <h6 className="mb-1 mt-3 main-content-label"> Stephen Metcalfe </h6> </Link>
														<p className="mb-2 mt-1"> Administrator </p>
														<p className="text-muted text-center mt-1">
															Lorem Ipsum is not simply popular belief
															Contrary.
														</p>
													</div>
												</Card>
											</Col>
										</Row>
									</Card.Body>
									{/* </div> */}
								</Tab.Pane>
								<Tab.Pane eventKey="accountsetting">
									<div className="main-content-body tab-pane p-sm-4 p-0 border-top-0" >
										<Card.Body className="border" data-select2-id="12">
											<Form className="form-horizontal" data-select2-id="11">
												<div className="mb-4 main-content-label">Account</div>
												<Form.Group className='my-2'>
													<Row className=" row-sm">
														<Col md={3}>
															<Form.Label >User Name</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control type="text" placeholder="User Name" defaultValue="Sonia Taylor" />
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className=" row-sm">
														<Col md={3}>
															<Form.Label >Email</Form.Label>
														</Col>
														<Col md={9}>
															<Form.Control type="text" placeholder="Email" defaultValue="info@SoniaTaylor.in" />
														</Col>
													</Row>
												</Form.Group>
												<FormGroup className='my-2'>
													<Row>
														<Col md={3}>
															<Form.Label >Language</Form.Label>
														</Col>
														<Col md={9} data-select2-id="106">
															<Select options={Languageoptions} classNamePrefix="Select2" placeholder="US English" />
														</Col>
													</Row>
												</FormGroup>
												<FormGroup className='my-2'>
													<Row>
														<Col md={3}>
															<Form.Label >Timezone</Form.Label>
														</Col>
														<Col md={9} data-select2-id="8">
															<Select options={TimeZoneData} classNamePrefix="Select2" placeholder="(GMT-11:00) Midway Island, Samoa" />
														</Col>
													</Row>
												</FormGroup>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={3} className="col">
															<Form.Label>Verification </Form.Label>
														</Col>
														<Col md={9} className="col">
															<Form.Check className=" mg-b-10-f" type="checkbox" label="Email" />
															<Form.Check className=" mg-b-10-f" defaultChecked type="checkbox" label="SMS" />
															<Form.Check className=" mg-b-10-f" type="checkbox" label="PHONE" />
														</Col>
													</Row>
												</Form.Group>
												<div className="mb-4 main-content-label"> Security Settings </div>
												<Form.Group className='my-2'>
													<Row className="row-sm">
														<Col md={2}>
															<Form.Label> Login Verification </Form.Label>
														</Col>
														<Col md={10}>
															<Link href="#!" className=""> Set up Verification </Link>
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className=" row-sm">
														<Col md={2}>
															<Form.Label> Password Verification </Form.Label>
														</Col>
														<Col md={10}>
															<Form.Label className="mg-b-10-f">
																<Form.Check type="checkbox" label="Require Personal Details" />
															</Form.Label>
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className='my-2'>
													<Row className=" row-sm">
														<Col md={2} />
														<Col md={10} className="d-inline-flex">
															<Link href="#!" className="me-4"> Deactivate Account </Link>
															<Link href="#!" className="mx-2"> Change Password </Link>
														</Col>
													</Row>
												</Form.Group>
											</Form>
										</Card.Body>
									</div>
								</Tab.Pane>
							</Tab.Content>
						</Card>
					</Col>
				</Row >
			</Tab.Container >
		</Fragment >
	);
};
Profile.layout = "Contentlayout";
export default Profile;
