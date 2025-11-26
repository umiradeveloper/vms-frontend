import { Fragment } from "react";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import Link from "next/link";
import PageHeader from "../../../../shared/layout-components/page-header/page-header";
import Seo from "../../../../shared/layout-components/seo/seo";

const FileManagerlist = () => (
	<Fragment>
		<Seo title={"FileManagerlist"} />
		<PageHeader title='File-Manager-List' item='File-Manager' active_item='File-Manager-List' />
		{/* <!-- Row --> */}
		<Row>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className=" custom-card border shadow-none">
					<Card.Body className="text-center">
						<div className="file-manger-icon">
							<Link href={"/components/apps/file/filedetails/"} ><img src={"../../../../assets/images/files/png/4.png"} alt="img" className="br-7" /></Link>
						</div>
						<h6 className="mb-1 fw-semibold mt-0">videos</h6>
						<span className="text-muted">4.23gb</span>
					</Card.Body>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card border p-0 shadow-none">
					<Card.Body className="text-center">
						<div className="file-manger-icon">
							<Link href={"/components/apps/file/filedetails/"} ><img src={"../../../../assets/images/files/png/4.png"} alt="img" className="br-7" /></Link>
						</div>
						<h6 className="mb-1 fw-semibold mt-0">images</h6>
						<span className="text-muted">4.23gb</span>
					</Card.Body>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card border p-0 shadow-none">
					<Card.Body className="text-center">
						<div className="file-manger-icon">
							<Link href={"/components/apps/file/filedetails/"} ><img src={"../../../../assets/images/files/png/6.png"} alt="img" className="br-7" /></Link>
						</div>
						<h6 className="mb-1 fw-semibold mt-0">Documents</h6>
						<span className="text-muted">4.23gb</span>
					</Card.Body>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card border p-0 shadow-none">
					<Card.Body className="text-center">
						<div className="file-manger-icon">
							<Link href={"/components/apps/file/filedetails/"} ><img src={"../../../../assets/images/files/png/6.png"} alt="img" className="br-7" /></Link>
						</div>
						<h6 className="mb-1 fw-semibold mt-0">Documents</h6>
						<span className="text-muted">4.23gb</span>
					</Card.Body>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card border p-0 shadow-none">
					<Card.Body className="text-center">
						<div className="file-manger-icon">
							<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/png/6.png"} alt="img" className="br-7" /></Link>
						</div>
						<h6 className="mb-1 fw-semibold mt-0">Documents</h6>
						<span className="text-muted">4.23gb</span>
					</Card.Body>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card border p-0 shadow-none">
					<Card.Body className="text-center">
						<div className="file-manger-icon">
							<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/png/1.png"} alt="img" className="br-7" /></Link>
						</div>
						<h6 className="mb-1 fw-semibold mt-0">Documents</h6>
						<span className="text-muted">4.23gb</span>
					</Card.Body>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card border p-0 shadow-none">
					<Card.Body className="text-center">
						<div className="file-manger-icon">
							<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/png/1.png"} alt="img" className="br-7" /></Link>
						</div>
						<h6 className="mb-1 fw-semibold mt-0">Documents</h6>
						<span className="text-muted">4.23gb</span>
					</Card.Body>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card border p-0 shadow-none">
					<Card.Body className="text-center">
						<div className="file-manger-icon">
							<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/png/1.png"} alt="img" className="br-7" /></Link>
						</div>
						<h6 className="mb-1 fw-semibold mt-0">Documents</h6>
						<span className="text-muted">4.23gb</span>
					</Card.Body>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card border p-0 shadow-none">
					<Card.Body className="text-center">
						<div className="file-manger-icon">
							<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/png/2.png"} alt="img" className="br-7" /></Link>

						</div>
						<h6 className="mb-1 fw-semibold mt-0">Documents</h6>
						<span className="text-muted">4.23gb</span>
					</Card.Body>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card border p-0 shadow-none">
					<Card.Body className="text-center">
						<div className="file-manger-icon">
							<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/png/2.png"} alt="img" className="br-7" /></Link>
						</div>
						<h6 className="mb-1 fw-semibold mt-0">Documents</h6>
						<span className="text-muted">4.23gb</span>
					</Card.Body>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card border p-0 shadow-none">
					<Card.Body className="text-center">
						<div className="file-manger-icon">
							<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/png/3.png"} alt="img" className="br-7" /></Link>
						</div>
						<h6 className="mb-1 fw-semibold mt-0">Documents</h6>
						<span className="text-muted">4.23gb</span>
					</Card.Body>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card border p-0 shadow-none">
					<Card.Body className="text-center">
						<div className="file-manger-icon">
							<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/png/3.png"} alt="img" className="br-7" /></Link>
						</div>
						<h6 className="mb-1 fw-semibold mt-0">Documents</h6>
						<span className="text-muted">4.23gb</span>
					</Card.Body>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card overflow-hidden">
					<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/3.jpg"} alt="img" /></Link>
					<div className="card-footer bd-t-0 py-3">
						<div className="d-flex">
							<div>
								<h6 className="mb-0">221.jpg</h6>
							</div>
							<div className="ms-auto">
								<h6 className="text-muted mb-0">120 KB</h6>
							</div>
						</div>
					</div>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card overflow-hidden">
					<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/2.jpg"} alt="img" /></Link>
					<div className="card-footer bd-t-0 py-3">
						<div className="d-flex">
							<div>
								<h6 className="mb-0">567.jpg</h6>
							</div>
							<div className="ms-auto">
								<h6 className="text-muted mb-0">120 KB</h6>
							</div>
						</div>
					</div>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card overflow-hidden">
					<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/3.jpg"} alt="img" /></Link>
					<div className="card-footer bd-t-0 py-3">
						<div className="d-flex">
							<div>
								<h6 className="mb-0">367.jpg</h6>
							</div>
							<div className="ms-auto">
								<h6 className="text-muted mb-0">120 KB</h6>
							</div>
						</div>
					</div>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card overflow-hidden">
					<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/4.jpg"} alt="img" /></Link>
					<div className="card-footer bd-t-0 py-3">
						<div className="d-flex">
							<div>
								<h6 className="mb-0">211.jpg</h6>
							</div>
							<div className="ms-auto">
								<h6 className="text-muted mb-0">120 KB</h6>
							</div>
						</div>
					</div>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card overflow-hidden">
					<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/5.jpg"} alt="img" /></Link>
					<div className="card-footer bd-t-0 py-3">
						<div className="d-flex">
							<div>
								<h6 className="mb-0">541.jpg</h6>
							</div>
							<div className="ms-auto">
								<h6 className="text-muted mb-0">120 KB</h6>
							</div>
						</div>
					</div>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card overflow-hidden">
					<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/6.jpg"} alt="img" /></Link>
					<div className="card-footer bd-t-0 py-3">
						<div className="d-flex">
							<div>
								<h6 className="mb-0">345.jpg</h6>
							</div>
							<div className="ms-auto">
								<h6 className="text-muted mb-0">120 KB</h6>
							</div>
						</div>
					</div>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2}
			>
				<Card className="custom-card overflow-hidden">
					<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/7.jpg"} alt="img" /></Link>
					<div className="card-footer bd-t-0 py-3">
						<div className="d-flex">
							<div>
								<h6 className="mb-0">213.jpg</h6>
							</div>
							<div className="ms-auto">
								<h6 className="text-muted mb-0">120 KB</h6>
							</div>
						</div>
					</div>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2} >
				<Card className="custom-card overflow-hidden">
					<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/8.jpg"} alt="img" /></Link>
					<div className="card-footer bd-t-0 py-3">
						<div className="d-flex">
							<div>
								<h6 className="mb-0">1324.jpg</h6>
							</div>
							<div className="ms-auto">
								<h6 className="text-muted mb-0">120 KB</h6>
							</div>
						</div>
					</div>
				</Card>
			</Col>
			<Col xl={3} md={3} lg={6} xxl={2} >
				<Card className="custom-card overflow-hidden">
					<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/9.jpg"} alt="img" /></Link>
					<div className="card-footer bd-t-0 py-3">
						<div className="d-flex">
							<div>
								<h6 className="mb-0">123.jpg</h6>
							</div>
							<div className="ms-auto">
								<h6 className="text-muted mb-0">120 KB</h6>
							</div>
						</div>
					</div>
				</Card>
			</Col>
			<nav>

				<Pagination className="pagination justify-content-end">

					<Pagination.Item >Prev</Pagination.Item>
					<Pagination.Item active >{1}</Pagination.Item>
					<Pagination.Item >{2}</Pagination.Item>
					<Pagination.Item >{3}</Pagination.Item>
					<Pagination.Item >{4}</Pagination.Item>
					<Pagination.Item  >{5}</Pagination.Item>
					<Pagination.Item >Next</Pagination.Item>

				</Pagination>
			</nav>
		</Row>
		{/* <!-- End Row --> */}
	</Fragment>
);
FileManagerlist.layout = "Contentlayout";
export default FileManagerlist;
