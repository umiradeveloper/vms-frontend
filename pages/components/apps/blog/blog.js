import { Fragment } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Link from "next/link";
import PageHeader from "../../../../shared/layout-components/page-header/page-header";
import Seo from "../../../../shared/layout-components/seo/seo";

const Blog = () => (
	<Fragment>
		<Seo title={"Blog Page"} />
		<PageHeader title='Blog Page' item='Blog' active_item='Blog page' />
		<Row className="row-sm">
			<Col xxl={6} lg={12}>
				<Card className=" custom-card overflow-hidden">
					<div className="px-4 pt-4">
						<Link href={"/components/apps/blog/blogdetails/"}>
							<img src={"../../../../assets/images/media/jobs-landing/blog/7.jpg"} alt="blog7" className="rounded-3 w-100" />
						</Link>
					</div>
					<div className="p-4">
						<div className="item-card-desc d-md-flex mb-3">
							<Link href="#!" className="d-flex me-3 mb-2">
								<span className="fe fe-calendar text-muted me-2 fs-18"></span>
								<div className="mt-0 mt-0 text-dark">20-Mar-2021</div>
							</Link>
							<Link href="#!" className="d-flex mb-2">
								<span className="fe fe-user text-muted me-2 fs-18"></span>
								<div className="mt-0 mt-0 text-dark">Dennis Mark</div>
							</Link>
							<div className="ms-auto mb-2">
								<Link href="#!" className="me-0 d-flex">
									<span className="fe fe-message-square text-muted me-2 fs-18"></span>
									<div className="mt-0 mt-0 text-dark">6 Comments</div>
								</Link>
							</div>
						</div>
						<Link href="#!" className="mt-4">
							<h5 className="fw-semibold">
								Excepteur occaecat cupidatat
							</h5>
						</Link>
						<p className="text">
							I must explain to you how all this mistaken idea of denouncing
							pleasure and praising pain was born and I will give you Link
							complete account of the system, and expound the actual teachings
							of the great explorer of the truth, the master-builder of human
							happiness. No one rejects, dislikes, or avoids pleasure itself,
							because it is pleasure.
						</p>
					</div>
					<div className="border-top">
						<div className="p-4">
							<div className="avatar-list-stacked">
								<span className="avatar avatar-rounded avatar-md">
									<img src={"../../../../assets/images/faces/12.jpg"} alt="img" />
								</span>
								<span className="avatar avatar-rounded avatar-md">
									<img src={"../../../../assets/images/faces/7.jpg"} alt="img" />
								</span>
								<span className="avatar avatar-rounded avatar-md">
									<img src={"../../../../assets/images/faces/5.jpg"} alt="img" />
								</span>
								<span className="avatar avatar-rounded avatar-md">
									<img src={"../../../../assets/images/faces/6.jpg"} alt="img" />
								</span>
							</div>
						</div>
					</div>
				</Card>
			</Col>
			<Col xxl={6} lg={12} md={12}>
				<Card className="custom-card">
					<Card.Body className="p-3">
						<Row className="g-0 blog-list">
							<Col xl={5} lg={12} md={12}>
								<Card.Body className="p-0">
									<div className="item-card-img">
										<Link href={"/components/apps/blog/blogdetails/"} >
											<img className="card-img-left h-130 w-100 rounded-3" src={"../../../../assets/images/media/jobs-landing/blog/8.jpg"} alt="blog2" />
										</Link>
									</div>
								</Card.Body>
							</Col>
							<Col xl={7} lg={12} md={12}>
								<Card.Body className="p-2 px-4">
									<Link href={"/components/apps/blog/blogdetails/"}>
										<h5 className="fw-semibold mt-3">
											Circumstances Certain claims
										</h5>
									</Link>
									<p>
										I of human happiness. sint occaecat ccaecat cupidatat non
										proident, sunt in culpa qui officia cupidatat non proident,
										sunt in culpa qui officia deserunt No one rejects, dislikes,
										or avoids pleasure itself, because it is pleasure.
									</p>
									<div className="media py-2 mt-0 border-top"></div>
									<div className="item-card-desc d-sm-flex">
										<div className="avatar avatar-md online">
											<img
												alt="avatar"
												className="rounded-circle"
												src={"../../../../assets/images/faces/2.jpg"}
											/>
										</div>
										<div className="main-contact-body">
											<h6>Abigail Johnson</h6>
											<span className="phone">2 days ago</span>
										</div>
										<div className="ms-auto mb-2">
											<Link href="#!" className="me-0 d-flex">
												<span className="fe fe-message-square text-muted me-2 fs-18"></span>
												<div className="mt-0 mt-0 text-dark">6 Comments</div>
											</Link>
										</div>
									</div>
								</Card.Body>
							</Col>
						</Row>
					</Card.Body>
				</Card>
				<Card className=" custom-card">
					<Card.Body className="p-3">
						<Row className="g-0 blog-list">
							<Col xl={5} lg={12} md={12}>
								<Card.Body className="p-0">
									<div className="item-card-img">
										<Link
											href={"/components/apps/blog/blogdetails/"}
										>
											<img
												className="card-img-left h-130 w-100 op-8 rounded-3"
												src={"../../../../assets/images/media/jobs-landing/blog/10.jpg"}
												alt="user2"
											/>
										</Link>
									</div>
								</Card.Body>
							</Col>
							<Col xl={7} lg={12} md={12}>
								<Card.Body className="p-2 px-4">
									<Link href={"/components/apps/blog/blogdetails/"}>
										<h5 className="fw-semibold mt-3">
											Teri Dactyl Certain
										</h5>
									</Link>
									<p className="text">
										I of human happiness. sint occaecat ccaecat cupidatat non
										proident, sunt in culpa qui officia cupidatat non proident,
										sunt in culpa qui officia deserunt No one rejects, dislikes,
										or avoids pleasure itself, because it is pleasure.
									</p>
									<div className="media py-2 mt-0 border-top"></div>
									<div className="item-card-desc d-sm-flex">
										<div className="avatar avatar-md online">
											<img
												alt="avatar"
												className="rounded-circle"
												src={"../../../../assets/images/faces/4.jpg"}
											/>
										</div>
										<div className="main-contact-body">
											<h6>Christian Lerio</h6>
											<span className="phone">3 days ago</span>
										</div>
										<div className="ms-auto mb-2">
											<Link href="#!" className="me-0 d-flex">
												<span className="fe fe-message-square text-muted me-2 fs-18"></span>
												<div className="mt-0 mt-0 text-dark">5 Comments</div>
											</Link>
										</div>
									</div>
								</Card.Body>
							</Col>
						</Row>
					</Card.Body>
				</Card>
				<Card className=" custom-card">
					<Card.Body className="p-3">
						<Row className="g-0 blog-list">
							<Col xl={5} lg={12} md={12}>
								<Card.Body className="p-0">
									<div className="item-card-img">
										<Link
											href={"/components/apps/blog/blogdetails/"}
										>
											<img
												className="card-img-left h-130 w-100 op-9 rounded-3"
												src={"../../../../assets/images/media/jobs-landing/blog/9.jpg"}
												alt="blog3"
											/>
										</Link>
									</div>
								</Card.Body>
							</Col>
							<Col xl={7} lg={12} md={12}>
								<Card.Body className="p-2 px-4">
									<Link href={"/components/apps/blog/blogdetails/"}>
										<h5 className="fw-semibold mt-3">
											Circumstances Certain claims
										</h5>
									</Link>
									<p>
										I of human happiness. sint occaecat ccaecat cupidatat non
										proident, sunt in culpa qui officia cupidatat non proident,
										sunt in culpa qui officia deserunt No one rejects, dislikes,
										or avoids pleasure itself, because it is pleasure.
									</p>
									<div className="media py-2 mt-0 border-top"></div>
									<div className="item-card-desc d-sm-flex">
										<div className="avatar avatar-md online">
											<img
												alt="avatar"
												className="rounded-circle"
												src={"../../../../assets/images/faces/5.jpg"}
											/>
										</div>
										<div className="main-contact-body">
											<h6>Christian Lerio</h6>
											<span className="phone">3 days ago</span>
										</div>
										<div className="ms-auto mb-2">
											<Link href="#!" className="me-0 d-flex">
												<span className="fe fe-message-square text-muted me-2 fs-18"></span>
												<div className="mt-0 mt-0 text-dark">2 Comments</div>
											</Link>
										</div>
									</div>
								</Card.Body>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</Row>
		<Row className=" row-sm">
			<Col xxl={3} md={6}>
				<Card className=" custom-card">
					<Link href={"/components/apps/blog/blogdetails/"}>
						<img
							className="card-img-top w-100 blog-img rounded-3"
							src={"../../../../assets/images/media/jobs-landing/blog/14.jpg"}
							alt=""
						/>
					</Link>
					<Card.Body>
						<h6 className="main-content-label mb-3 fs-16">
							Excepteur occaecat cupidatat
						</h6>
						<p className="card-text">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem
							accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
						</p>
						<Link href="#!" className="btn btn-sm ripple btn-primary">
							Read More<i className="fe fe-arrow-right ms-1 align-middle fs-13"></i>
						</Link>
					</Card.Body>
				</Card>
			</Col>
			<Col md={6} xxl={3}>
				<Card className=" custom-card">
					<Link href={"/components/apps/blog/blogdetails/"}>
						<img
							className="card-img-top w-100 blog-img rounded-3"
							src={"../../../../assets/images/media/jobs-landing/blog/11.jpg"}
							alt="blog6"
						/>
					</Link>
					<Card.Body>
						<h6 className="main-content-label mb-3 fs-16">
							Teri Dactyl Certain
						</h6>
						<p className="card-text">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem
							accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
						</p>
						<Link href="#!" className="btn btn-sm ripple btn-primary">
							Read More<i className="fe fe-arrow-right ms-1 align-middle fs-13"></i>
						</Link>
					</Card.Body>
				</Card>
			</Col>
			<Col md={6} xxl={3}>
				<Card className=" custom-card">
					<Link href={"/components/apps/blog/blogdetails/"}>
						<img
							className="card-img-top w-100 blog-img op-9 rounded-3"
							src={"../../../../assets/images/media/jobs-landing/blog/12.jpg"}
							alt=""
						/>
					</Link>
					<Card.Body>
						<h6 className="main-content-label mb-3 fs-16">
							Circumstances Certain claims
						</h6>
						<p className="card-text">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem
							accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
						</p>
						<Link href="#!" className="btn btn-sm ripple btn-primary">
							Read More<i className="fe fe-arrow-right ms-1 align-middle fs-13"></i>
						</Link>
					</Card.Body>
				</Card>
			</Col>
			<Col md={6} xxl={3}>
				<Card className=" custom-card">
					<Link href={"/components/apps/blog/blogdetails/"}>
						<img className="card-img-top w-100 blog-img op-9 rounded-3" src={"../../../../assets/images/media/jobs-landing/blog/13.jpg"} alt="blog10" />
					</Link>
					<Card.Body>
						<h6 className="main-content-label mb-3 fs-16">
							The standard chunk of Lorem
						</h6>
						<p className="card-text">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem
							accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
						</p>
						<Link href="#!" className="btn btn-sm ripple btn-primary">
							Read More<i className="fe fe-arrow-right ms-1 align-middle fs-13"></i>
						</Link>
					</Card.Body>
				</Card>
			</Col>
		</Row>
		<Row className="row-sm">
			<Col lg={6}>
				<Card className="card-aside custom-card overflow-hidden">
					<Link href={"/components/apps/blog/blogdetails/"} className="card-aside-column  cover-image ">
						<img src={"../../../../assets/images/media/jobs-landing/blog/5.jpg"} alt="" className="rounded-start-11 h-100 w-100" />
					</Link>
					<Card.Body>
						<Link href={"/components/apps/blog/blogdetails/"}><span className="main-content-label fs-16">Blog Title</span></Link>
						<div className="mt-3">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
						<div className="d-flex align-items-center pt-3 mt-auto">
							<div className="main-img-user avatar avatar-sm me-3">
								<Link href={"/components/apps/blog/blogdetails/"}><img src={"../../../../assets/images/faces/1.jpg"} className="w-10 rounded-circle" alt="avatar-img" /></Link>
							</div>
							<div>
								<Link href={"/components/apps/blog/blogdetails/"} className="text-default">Alica Nestle</Link>
								<small className="d-block text-muted">15 mintues ago</small>
							</div>
							<div className="ms-auto text-muted">
								<Link href="#!" className="icon d-none d-md-inline-block ms-3"><i className="far fa-heart me-1"></i></Link>
								<Link href="#!" className="icon d-none d-md-inline-block ms-3"><i className="far fa-thumbs-up"></i></Link>
							</div>
						</div>
					</Card.Body>
				</Card>
			</Col>
			<Col lg={6}>
				<Card className="card-aside custom-card overflow-hidden">
					<Card.Body>
						<Link href={"/components/apps/blog/blogdetails/"}><span className="main-content-label fs-16">Blog Title</span></Link>
						<div className="mt-3">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
						<div className="d-flex align-items-center pt-3 mt-auto">
							<div className="main-img-user avatar avatar-sm me-3">
								<Link href={"/components/apps/blog/blogdetails/"}><img src={"../../../../assets/images/faces/2.jpg"} className="w-10 rounded-circle" alt="avatar-img" /></Link>
							</div>
							<div>
								<Link href={"/components/apps/blog/blogdetails/"} className="text-default">Alica Nestle</Link>
								<small className="d-block text-muted">15 mintues ago</small>
							</div>
							<div className="ms-auto text-muted">
								<Link href="#!" className="icon d-none d-md-inline-block ms-3"><i className="far fa-heart me-1"></i></Link>
								<Link href="#!" className="icon d-none d-md-inline-block ms-3"><i className="far fa-thumbs-up"></i></Link>
							</div>
						</div>
					</Card.Body>
					<Link href={"/components/apps/blog/blogdetails/"} className="card-aside-column  cover-image ">
						<img src={"../../../../assets/images/media/jobs-landing/blog/6.jpg"} alt="" className="rounded-end-11 h-100 w-100" />
					</Link>
				</Card>
			</Col>
		</Row>
		{/* <!-- End Row --> */}
	</Fragment>
);
Blog.layout = "Contentlayout";
export default Blog;
