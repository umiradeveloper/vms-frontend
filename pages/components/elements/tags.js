import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Link from "next/link";
import Seo from "../../../shared/layout-components/seo/seo";
import PageHeader from "../../../shared/layout-components/page-header/page-header";
import ShowCode from "../../../shared/showcode/showcode";
import { tag1, tag2, tag3, tag4 } from "../../../shared/data/prismdata/uielementsprim";
function tags() {
	return (
		<div>
			<Seo title={"Tags"} />
			<PageHeader title='Tags' item='Elements' active_item='Tags' />

			{/* <!-- row --> */}
			<Row>
				<Col xl={6} lg={12}>
					<ShowCode title="  Default Tags <p class='subtitle text-muted fs-12 fw-normal mb-0'> Below is the pill tags example </p>" code={tag1} customCardBodyClass="py-4"  >
						<span className="tag tag-default mt-1 mb-1 me-1">Default</span>
						<span className="tag tag-dark mt-1 mb-1 me-1">Dark</span>
						<span className="tag tag-primary mt-1 mb-1 me-1">Primary</span>
						<span className="tag tag-success mt-1 mb-1 me-1">Success</span>
						<span className="tag tag-info mt-1 mb-1 me-1">Info</span>
						<span className="tag tag-warning mt-1 mb-1 me-1">Warning</span>
						<span className="tag tag-danger mt-1 mb-1 me-1">Danger</span>
					</ShowCode>
				</Col>
				<Col xl={6} lg={12}>
					<ShowCode title=" Pill Tags <p class='subtitle text-muted fs-12 fw-normal mb-0'>Below is the pill tags example </p>" code={tag2} customCardBodyClass="py-4"  >
						<span className="tag tag-default tag-pill mt-1 mb-1 me-1">Default</span>
						<span className="tag tag-dark tag-pill mt-1 mb-1 me-1">Dark</span>
						<span className="tag tag-primary tag-pill mt-1 mb-1 me-1">Primary</span>
						<span className="tag tag-success tag-pill mt-1 mb-1 me-1">Success</span>
						<span className="tag tag-info tag-pill mt-1 mb-1 me-1">Info</span>
						<span className="tag tag-warning tag-pill mt-1 mb-1 me-1">Warning</span>
						<span className="tag tag-danger tag-pill mt-1 mb-1 me-1">Danger</span>
					</ShowCode>
				</Col>
				{/* <!--/div--> */}
				{/* <!--div--> */}
				<Col xl={6} lg={12}>
					<ShowCode title=" Default Tags Addon <p class='subtitle text-muted fs-12 fw-normal mb-0'>Below is the pill tags example </p>" code={tag3} customCardBodyClass="py-4"  >
						<div className="tags">
							<span className="tag tag-default">
								One
								<Link href="#!" className="tag-addon"><i className="fe fe-x"></i></Link>
							</span>
							<span className="tag tag-default">
								Two
								<Link href="#!" className="tag-addon"><i className="fe fe-x"></i></Link>
							</span>
							<span className="tag tag-default">
								Three
								<Link href="#!" className="tag-addon"><i className="fe fe-x"></i></Link>
							</span>
							<span className="tag tag-default">
								Four
								<Link href="#!" className="tag-addon"><i className="fe fe-x"></i></Link>
							</span>
						</div>
					</ShowCode>
				</Col>
				<Col xl={6} lg={12}>
					<ShowCode title="Colored tags <p class='subtitle text-muted fs-12 fw-normal mb-0'>It is Very Easy to Customize and it uses in your website aplication. </p>" code={tag4} customCardBodyClass="py-4"  >
						<div className="tags">
							<span className="tag tag-primary br-5">primary tag<Link href="#!" className="tag-addon bg-primary"><i className="fe fe-x"></i></Link> </span>
							<span className="tag tag-secondary br-5">secondary tag<Link href="#!" className="tag-addon bg-secondary"><i className="fe fe-x"></i></Link> </span>
							<span className="tag tag-success br-5">success tag<Link href="#!" className="tag-addon bg-success"><i className="fe fe-x"></i></Link> </span>
							<span className="tag tag-warning br-5">warning tag<Link href="#!" className="tag-addon bg-warning"><i className="fe fe-x"></i></Link> </span>
							<span className="tag tag-teal br-5">teal tag<Link href="#!" className="tag-addon bg-teal"><i className="fe fe-x"></i></Link> </span>
							<span className="tag tag-danger br-5">danger tag<Link href="#!" className="tag-addon bg-danger"><i className="fe fe-x"></i></Link> </span>
						</div>
					</ShowCode>
				</Col>
			</Row>
			{/* <!-- row closed --> */}

		</div>
	);
}
tags.layout = "Contentlayout";
export default tags;
