import { Fragment, useCallback, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	Autoplay, Pagination, Navigation,
} from "swiper/modules";

import ImageViewer from "react-simple-image-viewer";
import PageHeader from "../../../../shared/layout-components/page-header/page-header";
import Seo from "../../../../shared/layout-components/seo/seo";
import Link from "next/link";
import { images } from "../../../../shared/data/apps/filedetailsdata";
const Filedetails = () => {

	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);

	const openImageViewer = useCallback((index) => {
		setCurrentImage(index);
		setIsViewerOpen(true);
	}, []);

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
	};
	const [isRTL, _setIsRTL] = useState(false);
	return (
		<Fragment>
			<Seo title="File-Details" />
			<PageHeader title='File-Details' item='File-Manager' active_item='File-Details' />
			{/* <!-- Row --> */}
			<Row className=" row-sm">
				<Col xl={8} lg={12} md={12}>
					<Card className=" custom-card overflow-hidden">
						<Card.Body className=" px-4 pt-4">
							<Link href="#!">
								<img src={"../../../../assets/images/media/jobs-landing/blog/15.jpg"} alt="img" className="rounded-3 w-100" />
							</Link>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={4} lg={12} md={12}>
					<Card className=" custom-card">
						<Card.Body className=" card-body ">
							<h5 className="mb-3">File details :</h5>
							<div className="table">
								<Row>
									<Col xl={12}>
										<div className="table-responsive">
											<Table className="table mb-0 border-top table-bordered text-nowrap">
												<tbody>
													<tr>
														<th scope="row">File-name</th>
														<td>image.jpg</td>
													</tr>
													<tr>
														<th scope="row">File-size</th>
														<td>12.45mb</td>
													</tr>
													<tr>
														<th scope="row">uploaded-date</th>
														<td>01-12-2020</td>
													</tr>
													<tr>
														<th scope="row">uploaded-by</th>
														<td>prityy abodh</td>
													</tr>
													<tr>
														<th scope="row">image-width</th>
														<td>1000</td>
													</tr>
													<tr>
														<th scope="row">image-height</th>
														<td>600</td>
													</tr>
													<tr>
														<th scope="row">File-formate</th>
														<td>jpg</td>
													</tr>
													<tr>
														<th scope="row">File-location</th>
														<td>storage/photos/image.jpg</td>
													</tr>
												</tbody>
											</Table>
										</div>
									</Col>
								</Row>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={8} lg={12} md={12}>
					<div className="multiside filedetails-slide mb-2">
						<Swiper navigation={true} dir={isRTL ? "rtl" : "ltr"} modules={[Autoplay, Navigation]} autoplay={{ delay: 2500, disableOnInteraction: false, }} breakpoints={{
							320: { slidesPerView: 1, spaceBetween: 10 },
							480: { slidesPerView: 2, spaceBetween: 10 },
							640: { slidesPerView: 3, spaceBetween: 10 },
							768: { slidesPerView: 3, spaceBetween: 10 },
							1024: { slidesPerView: 4, spaceBetween: 10 },
						}} >
							<SwiperSlide>
								<Card className="custom-card overflow-hidden mb-0 ">
									<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/6.jpg"} alt="img" /></Link>
									<Card.Footer className="bd-t-0 py-3">
										<div className="d-flex justify-content-between">
											<div>
												<h6 className="mb-0">221.jpg</h6>
											</div>
											<div>
												<h6 className="text-muted mb-0">120 KB</h6>
											</div>
										</div>
									</Card.Footer>
								</Card>
							</SwiperSlide>
							<SwiperSlide>
								<Card className="custom-card overflow-hidden mb-0 ">
									<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/5.jpg"} alt="img" /></Link>
									<Card.Footer className="bd-t-0 py-3">
										<div className="d-flex justify-content-between">
											<div>
												<h6 className="mb-0">221.jpg</h6>
											</div>
											<div>
												<h6 className="text-muted mb-0">120 KB</h6>
											</div>
										</div>
									</Card.Footer>
								</Card>
							</SwiperSlide>
							<SwiperSlide>
								<Card className="custom-card overflow-hidden mb-0 ">
									<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/4.jpg"} alt="img" /></Link>
									<Card.Footer className="bd-t-0 py-3">
										<div className="d-flex justify-content-between">
											<div>
												<h6 className="mb-0">221.jpg</h6>
											</div>
											<div>
												<h6 className="text-muted mb-0">120 KB</h6>
											</div>
										</div>
									</Card.Footer>
								</Card>
							</SwiperSlide>
							<SwiperSlide>
								<Card className="custom-card overflow-hidden mb-0 ">
									<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/2.jpg"} alt="img" /></Link>
									<Card.Footer className="bd-t-0 py-3">
										<div className="d-flex justify-content-between">
											<div>
												<h6 className="mb-0">221.jpg</h6>
											</div>
											<div>
												<h6 className="text-muted mb-0">120 KB</h6>
											</div>
										</div>
									</Card.Footer>
								</Card>
							</SwiperSlide>
							<SwiperSlide>
								<Card className="custom-card overflow-hidden mb-0 ">
									<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/1.jpg"} alt="img" /></Link>
									<Card.Footer className="bd-t-0 py-3">
										<div className="d-flex justify-content-between">
											<div>
												<h6 className="mb-0">221.jpg</h6>
											</div>
											<div>
												<h6 className="text-muted mb-0">120 KB</h6>
											</div>
										</div>
									</Card.Footer>
								</Card>
							</SwiperSlide>
							<SwiperSlide>
								<Card className="custom-card overflow-hidden mb-0 ">
									<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/3.jpg"} alt="img" /></Link>
									<Card.Footer className="bd-t-0 py-3">
										<div className="d-flex justify-content-between">
											<div>
												<h6 className="mb-0">221.jpg</h6>
											</div>
											<div>
												<h6 className="text-muted mb-0">120 KB</h6>
											</div>
										</div>
									</Card.Footer>
								</Card>
							</SwiperSlide>
							<SwiperSlide>
								<Card className="custom-card overflow-hidden mb-0 ">
									<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/9.jpg"} alt="img" /></Link>
									<Card.Footer className="bd-t-0 py-3">
										<div className="d-flex justify-content-between">
											<div>
												<h6 className="mb-0">221.jpg</h6>
											</div>
											<div>
												<h6 className="text-muted mb-0">120 KB</h6>
											</div>
										</div>
									</Card.Footer>
								</Card>
							</SwiperSlide>
							<SwiperSlide>
								<Card className="custom-card overflow-hidden mb-0 ">
									<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/8.jpg"} alt="img" /></Link>
									<Card.Footer className="bd-t-0 py-3">
										<div className="d-flex justify-content-between">
											<div>
												<h6 className="mb-0">221.jpg</h6>
											</div>
											<div>
												<h6 className="text-muted mb-0">120 KB</h6>
											</div>
										</div>
									</Card.Footer>
								</Card>
							</SwiperSlide>
							<SwiperSlide>
								<Card className="custom-card overflow-hidden mb-0 ">
									<Link href={"/components/apps/file/filedetails/"}><img src={"../../../../assets/images/files/jpg/7.jpg"} alt="img" /></Link>
									<Card.Footer className="bd-t-0 py-3">
										<div className="d-flex justify-content-between">
											<div>
												<h6 className="mb-0">221.jpg</h6>
											</div>
											<div>
												<h6 className="text-muted mb-0">120 KB</h6>
											</div>
										</div>
									</Card.Footer>
								</Card>
							</SwiperSlide>
						</Swiper>
					</div>
				</Col>
				<Col md={12} xl={4} lg={12} >

					<Card className=" custom-card">
						<Card.Body >
							<h5 className="mb-3">Recent Files</h5>
							<div id="" className="row">
								{images.map((image, index) => (
									<div
										className="col-lg-3 col-md-3 col-sm-6 col-12"

										key={index}
									>
										<img onClick={() => openImageViewer(index)} src={image} data-gallery="gallery1" className="glightbox card" alt="" />
									</div>
								))}
								{isViewerOpen && (
									<ImageViewer
										src={images}
										currentIndex={currentImage}
										onClose={closeImageViewer}
										disableScroll={false}
										backgroundStyle={{
											backgroundColor: "rgba(0,0,0,0.9)"
										}}
										closeOnClickOutside={true}
									/>
								)}
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			{/* <!-- End Row --> */}
		</Fragment>
	);
};
Filedetails.layout = "Contentlayout";
export default Filedetails;
