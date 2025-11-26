import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import PageHeader from "../../../shared/layout-components/page-header/page-header";
import { BasicTreeviewexample1, BasicTreeviewexample2, BasicTreeviewexample3, BasicTreeviewexample4 } from "../../../shared/data/advanceui/Treeviewdata";
import Seo from "../../../shared/layout-components/seo/seo";

const Treeview = () => {
	return (
		<Fragment>
			<Seo title={"Treeview"} />
			<PageHeader title='Treeview' item='Advanced Ui' active_item='Treeview' />
			<Row className="row-sm">
				<Col md={12}>
					<Card className="mg-b-20 custom-card">
						<Card.Header>
							<div className="card-title">Treeview</div>
						</Card.Header>
						<Card.Body className="card-body">
							<div className="card-content">
								<Row>
									{/* <!-- col --> */}
									<Col lg={12}>
										<div id="tree" className="font-semibold text-gray-600">

											<BasicTreeviewexample1 />
											<BasicTreeviewexample2 />
											<BasicTreeviewexample3 />
											<BasicTreeviewexample4 />
										</div>
									</Col>

								</Row>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};
Treeview.layout = "Contentlayout";
export default Treeview;
