import { Fragment, useEffect, useState } from "react";
import { Badge, Button, Card, Col, Form, Pagination, Row, InputGroup } from "react-bootstrap";
const Select = dynamic(() => import("react-select"), { ssr: false });
import dynamic from "next/dynamic";
import Link from "next/link";
import { BabyCare, Electonics, Mens, Productdetails, Stationary, Womens } from "../../../shared/data/ecommerce/products";
import PageHeader from "../../../shared/layout-components/page-header/page-header";
import Seo from "../../../shared/layout-components/seo/seo";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist, setSelectedItem } from "../../../shared/redux/actions";
const Products = () => {
	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart);
	const products = useSelector(state => state.products);
	const handleItemClick = (item) => {
		dispatch(setSelectedItem(item));
	};
	const handleAddToWishlist = (item) => {
		dispatch(addToWishlist(item));
	};

	const allIds = [...cart.map(item => item.id), ...products.map(item => item.id)];
	const nextId = allIds.length ? Math.max(...allIds) + 1 : 1;

	const handleAddToCart = (item) => {
		dispatch(addToCart({ ...item, id: nextId }));
	};

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState(products);
	// Function to handle search
	//   useEffect(() => {
	//     const filteredResults = products.filter(item =>
	// 		 item.itemname.toLowerCase().includes(searchTerm.toLowerCase())
	//     );
	//     setSearchResults(filteredResults);
	//   }, [searchTerm, products]);
	return (
		<Fragment>
			<Seo title={"Products"} />
			<PageHeader title="Products" item="ECommerce" active_item="Products" />
			<Row className="row-sm">
				<Col md={8} xl={9}>
					<Row className="row-sm">
						{searchResults.length === 0 ? (
							<tr>
								<td colSpan="6" className="text-center">No data</td>
							</tr>
						) : (
							searchResults.map((item, index) => (
								<Col md={6} lg={6} xl={4} sm={6} key={index} data-index={index}>
									<Card className="custom-card">
										<div className="p-0 ht-100p">
											<div className="product-grid">
												<div className="product-image">
													<Link href={"/components/ecommerce/productdeatils"} className="image" onClick={() => handleItemClick(item)}>
														<img className="pic-1" alt="product1" src={item.Product1} />
														<img className="pic-2" alt="product2" src={item.Product2} />
													</Link>
													<Link href={"/components/ecommerce/wishlist/"} className="product-like-icon" onClick={() => handleAddToWishlist(item)}><i className={`far fa-${item.Favorite}`}></i></Link>
													<span className={`product-${item.discountoffer}-label bg-${item.Productdiscounttext}`}>{item.Productdiscount}</span>
													<div className="product-link">
														<Link href={"/components/ecommerce/ecart"} onClick={() => handleAddToCart(item)}><i className="fa fa-shopping-cart"></i><span>{item.Addtocart}</span></Link>
														<Link href={"/components/ecommerce/productdeatils/"} onClick={() => handleItemClick(item)}><i className="fas fa-eye"></i><span>{item.Quickview}</span></Link>
													</div>
												</div>
												<div className="product-content">
													<h3 className="title"><Link href="#!">{item.ProductId}</Link></h3>
													<div className="price"><span className="old-price">{item.Productpriceold}</span>
														<span className="text-danger">{item.Productdiscountnew}</span>
													</div>
													<ul className="rating">
														<li className="fas fa-star me-1"></li>
														<li className="fas fa-star me-1"></li>
														<li className="fas fa-star me-1"></li>
														<li className="fas fa-star me-1"></li>
														<li className="far fa-star"></li>
													</ul>
												</div>
											</div>
										</div>
									</Card>
								</Col>
							))
						)}
					</Row>
					<nav>
						<Pagination className="pagination justify-content-end ">
							<Pagination.Item>Prev</Pagination.Item>
							<Pagination.Item className="page-item active">{1}</Pagination.Item>
							<Pagination.Item >{2}</Pagination.Item>
							<Pagination.Item >{3}</Pagination.Item>
							<Pagination.Item>{4}</Pagination.Item>
							<Pagination.Item>{5}</Pagination.Item>
							<Pagination.Item>Next</Pagination.Item>
						</Pagination>
					</nav>
				</Col>

				<Col md={4} xl={3}>
					<Card className="custom-card">
						<Card.Body>
							<Row className="row-sm">
								<Col sm={12}>
									<InputGroup >
										<Form.Control
											type="text"
											className="form-control"
											placeholder="Search ..."
											value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
										/>
										<Button
											variant="primary" className="btn ripple" type="button">
											Search
										</Button>
									</InputGroup>
								</Col>
							</Row>
						</Card.Body>
					</Card>
					<Row className="row-sm">
						<Col md={12} lg={12}>
							<Card className="custom-card">
								<Card.Header className="custom-card-header">
									<h6 className="main-content-label mb-3">Categories</h6>
								</Card.Header>
								<Card.Body>
									<Form.Group className="form-group">
										<Form.Label>Mens</Form.Label>
										<Select options={Mens} classNamePrefix="Select2" placeholder="Foot wear" />
									</Form.Group>
									<Form.Group className="form-group">
										<Form.Label>Women</Form.Label>
										<Select options={Womens} classNamePrefix="Select2" placeholder="Western wear" />
									</Form.Group>
									<Form.Group className="form-group">
										<Form.Label>Baby & Kids</Form.Label>
										<Select options={BabyCare} classNamePrefix="Select2" placeholder="Boy's Clothing" />
									</Form.Group>
									<Form.Group className="form-group">
										<Form.Label>Electronics</Form.Label>
										<Select options={Electonics} classNamePrefix="Select2" placeholder="Mobiles" />
									</Form.Group>
									<Form.Group className="form-group">
										<Form.Label>Sport,Books & ore </Form.Label>
										<Select options={Stationary} classNamePrefix="Select2" placeholder="Stationary" />
									</Form.Group>
									<Form.Group className="form-group">
										<Form.Label>Price</Form.Label>
										<Form.Check className="form-check-md" type="radio" name="example-radios" defaultValue="option1" label="Under $25" defaultChecked />
										<Form.Check className="form-check-md" type="radio" name="example-radios" defaultValue="option2" label="$25 to $50" />
										<Form.Check className="form-check-md" type="radio" name="example-radios" defaultValue="option2" label="$50to $100" />
										<Form.Check className="form-check-md" type="radio" name="example-radios" defaultValue="option2" label="Other (specify)" />
									</Form.Group>
									<Link className="btn ripple btn-primary w-100" href="#!">
										Apply Filter
									</Link>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
			{/* <!-- End Row --> */}
		</Fragment>
	);
};
Products.layout = "Contentlayout";
export default Products;
