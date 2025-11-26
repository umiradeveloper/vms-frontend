import { Fragment, useState } from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import { WishlistData } from "../../../shared/data/ecommerce/wishlistdata";
import Link from "next/link";
import PageHeader from "../../../shared/layout-components/page-header/page-header";
import Seo from "../../../shared/layout-components/seo/seo";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromWishlist } from "@/shared/redux/actions";

const Wishlist = () => {

  const reduxWishlist = useSelector(state => state.wishlist);
  const [localWishlist, setLocalWishlist] = useState(WishlistData);
  const combinedWishlist = [...localWishlist, ...reduxWishlist];

  const cart = useSelector(state => state.cart);
  const products = useSelector(state => state.products);


  const dispatch = useDispatch();

  const handleDelete = (id) => {
    setLocalWishlist(localWishlist.filter(item => item.id !== id));
    dispatch(removeFromWishlist(id));
  };

  const allIds = [...cart.map(item => item.id), ...products.map(item => item.id)];
  const nextId = allIds.length ? Math.max(...allIds) + 1 : 1;

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, id: nextId }));
  };

  const isEmpty = combinedWishlist.length === 0;

  return (
    <Fragment>
      <Seo title={"Wishlist"} />
      <PageHeader title='Wishlist' item='ECommerce' active_item='Wishlist' />

      <Row className="row-sm" id="wishlist">
        <Col md={12} lg={12} xl={12}>
        {isEmpty &&
            <div className="card custom-card">
              <div className="card-body text-center">

              <img src="../../../assets/images/ecommerce/jpg/30.png" alt='' />
                  <h6>Your Shopping Cart is Empty</h6>
                  <p>Add Some items to make me happy 😃</p>
                  <Link className="btn btn-primary mt-2" href="/components/ecommerce/products/">
      <i className="ri ri-arrow-right-line "></i>continue shopping </Link>
              </div>
            </div>
}

<div className={` ${combinedWishlist.length === 0 ? "d-none" : ""}`}>
            <Row>
              {combinedWishlist.map((item) => (
                <Col key={item.id} md={6} lg={6} sm={6} xl={4} xxl={3} className="alert mb-0">
                  <div className="card custom-card">
                    <div className="p-0">
                      <div className="product-grid">
                        <div className="product-image">
                          <Link href={"/components/ecommerce/productdeatils/"} className="image">
                            <img className="pic-1" alt="product1" src={item.Product1} />
                          </Link>
                          <Link href="#!" className="wishlist-icon" onClick={() => handleDelete(item.id)}>
                            <i className='fe fe-trash'></i>
                          </Link>
                        </div>
                        <div className="product-content">
                          <div className="d-flex">
                            <div>
                              <h3 className="title">
                                <Link href="#!">{item.ProductId}</Link>
                              </h3>
                            </div>
                            <div className="price text-end ms-auto">
                              <span className="old-price">{item.Productpriceold}</span>
                              <span className="fs-18">{item.Productdiscountnew}</span>
                            </div>
                          </div>
                          <div>
                            <Link href="#!"><i className="fa fa-star text-warning me-1"></i></Link>
                            <Link href="#!"><i className="fa fa-star text-warning me-1"></i></Link>
                            <Link href="#!"><i className="fa fa-star text-warning me-1"></i></Link>
                            <Link href="#!"><i className="far fa-star text-warning me-1"></i></Link>
                            <Link href="#!"><i className="far fa-star text-warning me-1"></i></Link>
                            <Link href="#!" className="me-4 text-muted">{item.ratingvalue}</Link>
                          </div>
                          <div className="mt-3 d-grid">
                            <Link href={"/components/ecommerce/ecart/"} className="btn btn-block btn-primary" onClick={() => handleAddToCart(item)}>
                              <i className="fe fe-shopping-cart me-2"></i><span>{item.Addtocart}</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <Pagination className="justify-content-end">
            <Pagination.Item disabled> Prev </Pagination.Item>
            <Pagination.Item active> 1 </Pagination.Item>
            <Pagination.Item className="page-item"> 2 </Pagination.Item>
            <Pagination.Item className="page-item"> 3 </Pagination.Item>
            <Pagination.Item className="page-item"> 4 </Pagination.Item>
            <Pagination.Item className="page-item"> 5 </Pagination.Item>
            <Pagination.Item className="page-item"> Next </Pagination.Item>
          </Pagination>
        </div>


          
        </Col>
      </Row>
    </Fragment>
  );
};
Wishlist.layout = "Contentlayout";
export default Wishlist;
