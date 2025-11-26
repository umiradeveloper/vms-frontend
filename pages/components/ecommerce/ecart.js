import { Fragment, useEffect, useState } from "react";
import { Card, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import { Shoppingcart } from "../../../shared/data/ecommerce/ecart";
import PageHeader from "../../../shared/layout-components/page-header/page-header";
import Link from "next/link";
import Seo from "../../../shared/layout-components/seo/seo";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartQuantity } from "@/shared/redux/actions";

const ECCart = () => {
  const dispatch = useDispatch();
  const reduxCart = useSelector(state => state.cart);
  const [localCart, setLocalCart] = useState(Shoppingcart.map(item => ({ ...item, quantity: 0, total: 0 })));
  const Datacard = [...localCart, ...reduxCart].map(item => ({
    ...item,
    quantity: item.quantity || 0,
    total: item.total || 0,
  }));;

  useEffect(() => {
    setLocalCart(localCart.filter(item => !reduxCart.some(reduxItem => reduxItem.id === item.id)));
  }, [reduxCart]);

  const handleDelete = (id) => {
    setLocalCart(localCart.filter(item => item.id !== id));
    dispatch(removeFromCart(id));
  };

  const isEmpty = Datacard.length === 0;

  const dec = (id) => {
    setLocalCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === id && item.quantity > 0) {
          const newQuantity = item.quantity - 1;
          const newTotal = newQuantity * (parseFloat(item.Price) || 0); // Ensure Price is a number
          return { ...item, quantity: newQuantity, total: newTotal };
        }
        return item;
      });
      return updatedCart;
    });

  };
  const inc = (id) => {
    setLocalCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === id && item.quantity < 10) {
          const newQuantity = item.quantity + 1;
          const newTotal = newQuantity * (parseFloat(item.Price) || 0); // Ensure Price is a number
          dispatch(updateCartQuantity(id, newQuantity));
          return { ...item, quantity: newQuantity, total: newTotal };
        }
        return item;
      });
      return updatedCart;
    });
  };

  const calculateTotalPrice = () => {
    return Datacard.reduce((total, item) => total + (item.total || 0), 0);
  };

  const calculateDiscount = () => {
    return 20; // Example discount calculation
  };

  const calculateFinalTotal = () => {
    const totalPrice = calculateTotalPrice();
    const discount = calculateDiscount();
    return totalPrice - discount;
  };
  useEffect(() => {
  }, [Datacard]);

  return (
    <Fragment>
      <Seo title={"Cart"} />
      <PageHeader title='Cart' item='ECommerce' active_item='Cart' />
      <Row className="row-sm">
        <Col lg={12} xl={9} md={12}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">Shopping cart</div>
            </Card.Header>
            <Card.Body className="pt-2">
              {isEmpty ? (
                <div className="text-center">
                  <img src="../../../assets/images/ecommerce/jpg/30.png" alt='' />
                  <h6>Your Shopping Cart is Empty</h6>
                  <p>Add Some items to make me happy 😃</p>
                  <Link className="btn btn-primary mt-2" href="/components/ecommerce/products/">
      <i className="ri ri-arrow-right-line "></i>continue shopping </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="border table-hover text-nowrap table-shopping-cart mb-0">
                    <thead className="text-muted">
                      <tr className="small text-uppercase">
                        <th scope="col">Product</th>
                        <th scope="col"></th>
                        <th scope="col" className="wd-120">Quantity</th>
                        <th scope="col" className="wd-120">Price</th>
                        <th scope="col" className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Datacard.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="media align-items-center">
                              <div className="card-aside-img">
                                <img src={item.Product1} alt="img" className="img-sm" />
                              </div>
                              <div className="media-body mt-2">
                                <div className="card-item-desc mt-0">
                                  <h6 className="fw-medium mt-0 text-uppercase">{item.ProductId}</h6>
                                  <dl className="card-item-desc-1 mb-0">
                                    <dt>Color:</dt>
                                    <dd>{item.Colorpicker}</dd>
                                  </dl>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className={`text-${item.Qtytext} small mb-0 mt-1 fs-12`}>{item.Qty}</p>
                          </td>
                          <td className="product-quantity-container">
                            <InputGroup className="br-3 border flex-nowrap align-items-center">
                              <Link href="#!" className="btn btn-icon btn-light border-0 rounded-start-0 input-group-text flex-fill product-quantity-minus" onClick={() => dec(item.id)}>
                                <i className="ri-subtract-line"></i>
                              </Link>
                              <span className="my-2 text-center w-100" aria-label="quantity">{item.quantity}</span>
                              <Link href="#!" className="btn btn-icon btn-light border-0 rounded-end-0 input-group-text flex-fill product-quantity-plus" onClick={() => inc(item.id)}>
                                <i className="ri-add-line"></i>
                              </Link>
                            </InputGroup>
                          </td>
                          <td>
                            <div className="price-wrap">
                              <span className="price fw-semibold fs-16">
                                ${item.total ? item.total.toFixed(2) : "0.00"}
                              </span>
                            </div>
                          </td>
                          <td className="text-center">
                            <Link href="#!" className="remove-list text-danger fs-20 remove-button" data-abc="true" onClick={() => handleDelete(item.id)}><i className="fa fa-trash"></i></Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={12} xl={3} md={12}>
          <Card className="custom-card">
            <Card.Body>
              <Form>
                <Form.Group className="mb-0">
                  <Form.Label className="form-label fw-medium">Have coupon?</Form.Label>
                  <div className="input-group">
                    <input type="text" className="form-control coupon" placeholder="Coupon code" />
                    <button className="btn btn-primary btn-apply coupon">Apply</button>
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <Card className="custom-card cart-details">
            <Card.Body>
              <h5 className="mb-3 fw-semibold fs-14">PRICE DETAIL</h5>
              <dl className="dlist-align mb-1">
                <dt>ITEMS</dt>
                <dd className="text-end ms-auto">${calculateTotalPrice().toFixed(2)}</dd>
              </dl>
              <dl className="dlist-align mb-1">
                <dt>Discount:</dt>
                <dd className="text-end text-danger ms-auto">- ${calculateDiscount().toFixed(2)}</dd>
              </dl>
              <dl className="dlist-align mb-1">
                <dt>Total price:</dt>
                <dd className="text-end ms-auto">{calculateTotalPrice() > 0 ? `$${calculateFinalTotal().toFixed(2)}` : "Add items to your cart"}</dd>
              </dl>
              <dl className="dlist-align mb-0">
                <dt>Delivery:</dt>
                <dd className="text-end text-success ms-auto">Free</dd>
              </dl>
              <hr />
              <dl className="dlist-align">
                <dt>Total:</dt>
                <dd className="text-end ms-auto"><strong>{calculateTotalPrice() > 0 ? `$${calculateFinalTotal().toFixed(2)}` : "Add items to your cart"}</strong></dd>
              </dl>
              <div className="d-grid">
                <Link className="btn btn-primary" href={"/components/ecommerce/products/"}>Continue Shopping</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

ECCart.layout = "Contentlayout";
export default ECCart;

