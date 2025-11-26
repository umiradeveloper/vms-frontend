import { Fragment, useState } from "react";
import { Col, Row, Card } from "react-bootstrap";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Seo from "../../../shared/layout-components/seo/seo";
import Link from "next/link";
import PageHeader from "../../../shared/layout-components/page-header/page-header";

const Gallery = () => {
	const [open, setOpen] = useState(false);
	return (
		<Fragment>
			<Seo title={"Gallery"} />
			<PageHeader title='Gallery' item='Pages' active_item='Gallery' />

			<Row className="row-sm">
				<Col lg={12} md={12}>
					<Card className=" custom-card">
						<Card.Body>
							<div>
								<h6 className="main-content-label mb-1">Light Gallery</h6>
								<p className="text-muted card-sub-title">A customizable, modular, responsive, lightbox gallery plugin for jQuery.</p>
							</div>
							<Row>
								<Col lg={3} md={3} sm={6} className="col-12">
									<Link href="#!" onClick={() => setOpen(true)} className="glightbox card" data-gallery="gallery1">
										<img src={"../../../assets/images/media/media-40.jpg"} alt="image" />
									</Link>
								</Col>
								<Col lg={3} md={3} sm={6} className="col-12">
									<Link href="#!" onClick={() => setOpen(true)} className="glightbox card" data-gallery="gallery1">
										<img src={"../../../assets/images/media/media-41.jpg"} alt="image" />
									</Link>
								</Col>
								<Col lg={3} md={3} sm={6} className="col-12">
									<Link href="#!" onClick={() => setOpen(true)} className="glightbox card" data-gallery="gallery1">
										<img src={"../../../assets/images/media/media-42.jpg"} alt="image" />
									</Link>
								</Col>
								<Col lg={3} md={3} sm={6} className="col-12">
									<Link href="#!" onClick={() => setOpen(true)} className="glightbox card border-0" data-gallery="gallery1">
										<img src={"../../../assets/images/media/media-43.jpg"} alt="image" />
									</Link>
								</Col>
								<Col lg={3} md={3} sm={6} className="col-12">
									<Link href="#!" onClick={() => setOpen(true)} className="glightbox card" data-gallery="gallery1">
										<img src={"../../../assets/images/media/media-44.jpg"} alt="image" />
									</Link>
								</Col>
								<Col lg={3} md={3} sm={6} className="col-12">
									<Link href="#!" onClick={() => setOpen(true)} className="glightbox card" data-gallery="gallery1">
										<img src={"../../../assets/images/media/media-45.jpg"} alt="image" />
									</Link>
								</Col>
								<Col lg={3} md={3} sm={6} className="col-12">
									<Link href="#!" onClick={() => setOpen(true)} className="glightbox card" data-gallery="gallery1">
										<img src={"../../../assets/images/media/media-46.jpg"} alt="image" />
									</Link>
								</Col>
								<Col lg={3} md={3} sm={6} className="col-12">
									<Link href="#!" onClick={() => setOpen(true)} className="glightbox card" data-gallery="gallery1">
										<img src={"../../../assets/images/media/media-60.jpg"} alt="image" />
									</Link>
								</Col>
								<Lightbox open={open} close={() => setOpen(false)} plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]} zoom={{
									maxZoomPixelRatio: 10,
									scrollToZoom: true
								}}
									slides={[{ src: "../../../assets/images/media/media-40.jpg" }, { src: "../../../assets/images/media/media-41.jpg" }, { src: "../../../assets/images/media/media-42.jpg" }, { src: "../../../assets/images/media/media-43.jpg" }, { src: "../../../assets/images/media/media-44.jpg" }, { src: "../../../assets/images/media/media-45.jpg" }, { src: "../../../assets/images/media/media-46.jpg" }, { src: "../../../assets/images/media/media-60.jpg " }]} />
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};
Gallery.layout = "Contentlayout";
export default Gallery;
