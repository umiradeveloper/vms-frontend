import { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Bubble3D, Simplebubble } from "../../../../shared/data/charts/apexcharts/bubbledata";
import Seo from "../../../../shared/layout-components/seo/seo";
import PageHeader from "../../../../shared/layout-components/page-header/page-header";

const Bubblecharts = () => {
	return (
		<Fragment>
			<Seo title={"Bubblecharts"} />
			<PageHeader title='Apex Bubble Charts' item='Apex Charts' active_item='Apex Bubble Charts' />
			<Row>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<div className="card-title">Simple Bubble Chart</div>
						</Card.Header>
						<Card.Body>
							<div id="bubble-simple">
								<Simplebubble />
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<div className="card-title">3D Bubble Chart</div>
						</Card.Header>
						<Card.Body>
							<div id="bubble-3d">
								<Bubble3D />
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

		</Fragment>
	);
};
Bubblecharts.layout = "Contentlayout";
export default Bubblecharts;
