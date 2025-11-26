import { TransactionData } from "../../../shared/data/crypto-currencies/transcations";
import PageHeader from "../../../shared/layout-components/page-header/page-header";
import { Fragment, useEffect, useState } from "react";
import { Card, Row, Col, Form, Table } from "react-bootstrap";
import Seo from "../../../shared/layout-components/seo/seo";

const Transcations = () => {

	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	const handleSearch = (e) => {
		const query = e.target.value;
		setSearchQuery(query);
		setFilteredData(TransactionData.filter((item) => Object.values(item).some((value) => value && typeof value === "string" && value.toLowerCase().includes(query.toLowerCase()))));
	};

	useEffect(() => {
		setFilteredData(TransactionData);
	}, []);

	return (

		<Fragment>
			<Seo title={"Transactions"} />
			<PageHeader title='Transactions' item='Crypto-Currencies' active_item='Transactions' />

			<Row className="row-sm">
				<Col md={12} lg={12} xl={12}>
					<Card className="custom-card transcation-crypto">
						<Card.Header className="border-bottom-0">
							<div>
								<div className="card-title">Transaction History</div>
								<p className="d-block fs-12 mb-0 mt-2 text-muted">Transaction History it shows you who sent the transaction, how much has been sent, its destination and the fees that were paid for it.</p>
							</div>
							<div className="ms-auto">
								<div className="contact-search3">
									<button type="button" className="btn border-0"><i className="fe fe-search fw-semibold text-muted" aria-hidden="true"></i></button>
									<Form.Control type="text" className="h-6 pe-5" id="typehead1" placeholder="Search here..." autoComplete="off" value={searchQuery} onChange={handleSearch} />
								</div>
							</div>
						</Card.Header>
						<Card.Body>
							<div className="table-responsive">

								<Table className="text-nowrap border">
									<thead>
										<tr>
											<th scope="col">S.NO</th>
											<th scope="col">TRANSACTION HASH</th>
											<th scope="col">Date</th>
											<th scope="col">From</th>
											<th scope="col">To</th>
											<th scope="col">Coin</th>
											<th scope="col">Amount</th>
											<th scope="col">Status</th>
										</tr>
									</thead>
									<tbody>
										{filteredData.map((idx) => (
											<tr key={idx.id}>
												<td>
													<span className="crypto-icon bg-primary-transparent me-3 my-auto">
														<i className={`fe ${idx.id == 2 | idx.id == 3 | idx.id == 5 | idx.id == 6 | idx.id == 9 | idx.id == 10 | idx.id == 11 | idx.id == 13 | idx.id == 15 ? "fe-arrow-down-left" : "fe-arrow-up-right"} text-primary`}></i>
													</span>
												</td>
												<td className="fw-semibold">{idx.TransID}</td>
												<td>{idx.date}</td>
												<td>{idx.from}</td>
												<td className="my-auto"><img src={idx.preview} className="avatar avatar-sm me-2" alt="" /><span className="my-auto">{idx.to}</span></td>
												<td className="fw-medium"><img src={idx.coinpreview} className="wd-30 hd-30 me-2" alt="" />{idx.cointitle}</td>
												<td className={`text-${idx.color} fw-semibold`}>{idx.amount}</td>
												<td><span className={`text-${idx.color} fw-medium`}>{idx.status}</span></td>
											</tr>
										))}
									</tbody>
								</Table>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

		</Fragment >
	);
};
Transcations.layout = "Contentlayout";
export default Transcations;
