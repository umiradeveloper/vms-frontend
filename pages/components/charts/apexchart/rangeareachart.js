import { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Basicrangearea, Comborangearea } from "../../../../shared/data/charts/apexcharts/rangeareadata";
import Seo from "../../../../shared/layout-components/seo/seo";
import PageHeader from "../../../../shared/layout-components/page-header/page-header";

const Rangeareacharts = () => {
	return (
		<Fragment>
			<Seo title={"Rangeareacharts"} />
			<PageHeader title="Apex Range Area Charts" item="Apex Charts" active_item="Apex Range Area Charts" />

			<Row>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<div className="card-title">
								Basic Range Area Chart
							</div>
						</Card.Header>
						<Card.Body>
							<div id="rangearea-basic">
								<Basicrangearea />
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<div className="card-title">
								Combo Range Area Chart
							</div>
						</Card.Header>
						<Card.Body>
							<div id="rangearea-combo">
								<Comborangearea />
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

		</Fragment>
	);
};
Rangeareacharts.layout = "Contentlayout";
export default Rangeareacharts;
