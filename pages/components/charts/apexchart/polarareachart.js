import { FC, Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Basicpolararea, Monochromepolar } from "../../../../shared/data/charts/apexcharts/polarareadata";
import Seo from "../../../../shared/layout-components/seo/seo";
import PageHeader from "../../../../shared/layout-components/page-header/page-header";

const Polarareacharts = () => {
	return (
		<Fragment>
			<Seo title={"Polarareacharts"} />
			<PageHeader title='Apex Polar Area Charts' item='Apex Charts' active_item='Apex Polar Area Charts' />

			<Row>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<div className="card-title">Basic Polar Area Chart</div>
						</Card.Header>
						<Card.Body>
							<div id="polararea-basic">
								<Basicpolararea />
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<div className="card-title">Polar Area Monochrome Chart</div>
						</Card.Header>
						<Card.Body>
							<div id="polararea-monochrome">
								<Monochromepolar />
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

		</Fragment>
	);
};
Polarareacharts.layout = "Contentlayout";
export default Polarareacharts;
