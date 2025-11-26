export const HeaderSearchData = [
	{ value: "Business Case", label: "Business Case" },
	{ value: "T-Projects...", label: "T-Projects..." },
	{ value: "Microsoft Project", label: "Microsoft Project" },
	{ value: "Risk Management", label: "Risk Management " },
	{ value: "Team Building", label: "Team Building" },
];
export const HeaderCart = [
	{ id: 1, preview: "/assets/images/ecommerce/jpg/1.jpg", itemName: "Smart Watch", price: "$1,299.00", ulElement: (<ul className="header-product-item d-flex mb-0"> <li>Qty: 1</li> <li>Status: <span className="text-success">In Stock</span></li> </ul>) },
	{ id: 2, preview:"/assets/images/ecommerce/jpg/3.jpg", itemName: "Flowers", price: "$179.29", ulElement: (<ul className="header-product-item d-flex mb-0"> <li>Qty: 2</li> <li><span className="badge bg-pink-transparent fs-10">Free shipping</span></li></ul>) },
	{ id: 3, preview: "/assets/images/ecommerce/jpg/5.jpg", itemName: "Running Shoes", price: "$29.00", ulElement: (<ul className="header-product-item d-flex mb-0"> <li>Qty: 4</li> <li>Status: <span className="text-danger">Out Stock</span></li> </ul>) },
	{ id: 4, preview: "/assets/images/ecommerce/jpg/4.jpg", itemName: "Furniture", price: "$4,999.00", ulElement: (<ul className="header-product-item d-flex mb-0"> <li>Gray</li> <li>50LB</li> </ul>) },
	{ id: 5, preview: "/assets/images/ecommerce/jpg/6.jpg", itemName: "Tourist Bag", price: "$129.00", ulElement: (<ul className="header-product-item d-flex mb-0"> <li>Qty: 1</li> <li>Status: <span className="text-success">In Stock</span></li> </ul>) },
];
export const cartData = [
	{ id: 1, status: "online", preview: "/assets/images/faces/1.jpg", spanElement: (<span className="text-muted fw-normal fs-12 header-notification-text">Oct 15 12:32pm</span>), element: (<span className="text-dark">Congratulate <strong>Olivia James</strong> for New template start</span>) },
	{ id: 2, status: "offline", preview: "/assets/images/faces/2.jpg", spanElement: (<span className="text-muted fw-normal fs-12 header-notification-text">Oct 13 02:56am</span>), element: (<span className="text-dark"><strong>Joshua Gray</strong> New Message Received</span>) },
	{ id: 3, status: "online", preview: "/assets/images/faces/3.jpg", spanElement: (<span className="text-muted fw-normal fs-12 header-notification-text">Oct 12 10:40pm</span>), element: (<span className="text-dark"><strong>Elizabeth Lewis</strong> added new schedule realease</span>) },
	{ id: 4, status: "online", preview: "/assets/images/faces/5.jpg", spanElement: (<span className="text-muted fw-normal fs-12 header-notification-text">Order <span className="text-warning">ID: #005428</span> had been placed</span>), element: (<span className="text-dark">Delivered Successful to <strong>Micky</strong> </span>) },
	{ id: 5, status: "offline", preview:"/assets/images/faces/1.jpg", spanElement: (<span className="text-muted fw-normal fs-12 header-notification-text">Today at 08:08pm</span>), element: (<span className="text-dark">You got 22 requests form <strong>Facebook</strong></span>) }
];
