
import Link from "next/link";
import { Fragment, useEffect, useState, useRef } from "react";
import { Badge, Button, Card, Dropdown, DropdownDivider, Form, InputGroup, ListGroup, Nav, NavLink, Offcanvas, OverlayTrigger, ProgressBar, Tab, Tooltip } from "react-bootstrap";
import { removeFromCart, ThemeChanger } from "../../redux/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import { MENUITEMS } from "../sidebar/nav";
const Select = dynamic(() => import("react-select"), { ssr: false });
import store from "../../redux/store";
import { basePath } from "../../../next.config";
import { cartData, HeaderCart, HeaderSearchData, } from "../../data/header/headerdata";
import dynamic from "next/dynamic";
function Header({ local_varaiable, ThemeChanger }) {
	//Dark mode

	const ToggleDark = () => {
		const theme = store.getState();
		const isDarkMode = theme.dataThemeMode === "dark";

		const updatedTheme = {
			...theme,
			"dataThemeMode": isDarkMode ? "light" : "dark",
			"dataHeaderStyles": isDarkMode ? "light" : "dark",
			"dataMenuStyles": theme.dataNavLayout === "horizontal" && !isDarkMode ? "dark" : (isDarkMode ? "dark" : "dark"),
			"bodyBg1": "",
			"bodyBg": "",
			"darkBg": "",
			"Light": "",
			"inputBorder": "",
			"sidemenuActiveBgcolor":"",
			
		};

		ThemeChanger(updatedTheme);

		if (theme.dataThemeMode === "light") {
			localStorage.setItem("spruhadarktheme", "dark");
			localStorage.removeItem("spruhalighttheme");
			
		} else {
			localStorage.setItem("spruhalighttheme", "light");
			localStorage.removeItem("spruhadarktheme");
			localStorage.removeItem("darkBgRGB1");
			localStorage.removeItem("darkBgRGB2");
			localStorage.removeItem("darkBgRGB3");
			localStorage.removeItem("darkBgRGB4");
			localStorage.removeItem("spruhaHeader");
			localStorage.removeItem("spruhaMenu");

		}
	};
	// FullScreen
	const [fullScreen, setFullScreen] = useState(false);

	const toggleFullScreen = () => {
		const elem = document.documentElement;

		if (!document.fullscreenElement) {
			elem.requestFullscreen().then(() => setFullScreen(true));
		} else {
			document.exitFullscreen().then(() => setFullScreen(false));
		}
	};

	const handleFullscreenChange = () => {
		setFullScreen(!!document.fullscreenElement);
	};

	useEffect(() => {
		document.addEventListener("fullscreenchange", handleFullscreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);

	//Search functionality

	const myfunction = (inputValue) => {
		const matchingElements = [];

		const findMatchingElements = (menuItems) => {
			menuItems.forEach((menuItem) => {
				if (menuItem.title) {
					if (menuItem.children) {
						findMatchingElements(menuItem.children);
					}

					if (
						menuItem.title.toLowerCase().includes(inputValue.toLowerCase()) &&
						menuItem.title.toLowerCase().startsWith(inputValue.toLowerCase())
					) {
						matchingElements.push(menuItem);
					}
				}
			});
		};

		findMatchingElements(MENUITEMS);

		if (!matchingElements.length || inputValue === "") {
			if (inputValue === "") {
				// Handle case when inputValue is empty
				setShow1(false);
				setShow2(false);
				setsearchval("Type something");
				setsearchcolor("text-dark");
			} else {
				// Handle case when no matching elements are found
				setShow1(true);
				setShow2(false);
				setsearchcolor("text-danger");
				setsearchval("There is no component with this name");
			}
		} else {
			setShow1(true);
			setShow2(true);
			setsearchcolor("text-dark");
			setsearchval("");
		}

		setNavData(matchingElements);
	};
	function menuClose() {
		const theme = store.getState();
		ThemeChanger({ ...theme, "toggled": "close" });
	}
	const swichermainright = () => {
		document.querySelector(".offcanvas-end")?.classList.toggle("show");
		if (document.querySelector(".switcher-backdrop")?.classList.contains("d-none")) {
			document.querySelector(".switcher-backdrop")?.classList.add("d-block");
			document.querySelector(".switcher-backdrop")?.classList.remove("d-none");
		}
	};
	const toggleSidebar = () => {
		const theme = store.getState();
		let sidemenuType = theme.dataNavLayout;
		if (window.innerWidth >= 992) {
			if (sidemenuType === "vertical") {
				let verticalStyle = theme.dataVerticalStyle;
				const navStyle = theme.dataNavStyle;
				switch (verticalStyle) {
					// closed
					case "closed":
						ThemeChanger({ ...theme, "dataNavStyle": "" });
						if (theme.toggled === "close-menu-close") {
							ThemeChanger({ ...theme, "toggled": "" });
						} else {
							ThemeChanger({ ...theme, "toggled": "close-menu-close" });
						}
						break;
					// icon-overlay
					case "overlay":
						ThemeChanger({ ...theme, "datanavstyle": "" });
						if (theme.toggled === "icon-overlay-close") {
							ThemeChanger({ ...theme, "toggled": "", "iconOverlay": "", "dataVerticalStyle": "default" });
						} else {
							if (window.innerWidth >= 992) {
								ThemeChanger({ ...theme, "toggled": "icon-overlay-close", "iconOverlay": "" });
							}
						}
						break;
					// icon-text
					case "icontext":
						ThemeChanger({ ...theme, "dataNavStyle": "" });
						if (theme.toggled === "icon-text-close") {
						  ThemeChanger({ ...theme, "toggled": "" });
						} else {
						  ThemeChanger({ ...theme, "toggled": "icon-text-close" });
						}
						break;

						
					// doublemenu
					case "doublemenu":
						ThemeChanger({ ...theme, "dataNavStyle": "" });
						if (theme.toggled === "double-menu-open") {
							ThemeChanger({ ...theme, "toggled": "double-menu-close" });
						} else {
							const sidemenu = document.querySelector(".side-menu__item.active");
							if (sidemenu) {
								if (sidemenu.nextElementSibling) {
									sidemenu.nextElementSibling.classList.add("double-menu-active");
									ThemeChanger({ ...theme, "toggled": "double-menu-open" });
								} else {

									ThemeChanger({ ...theme, "toggled": "double-menu-close" });
								}
							}
						}

						break;
					// detached
					case "detached":
						if (theme.toggled === "detached-close") {
							ThemeChanger({ ...theme, "toggled": "", "iconOverlay": "" });
						} else {
							ThemeChanger({ ...theme, "toggled": "detached-close", "iconOverlay": "" });
						}

						break;

					// default
					case "default":
						ThemeChanger({ ...theme, "toggled": "icon-overlay-close", "dataVerticalStyle": "overlay" });
				}
				switch (navStyle) {
					case "menu-click":
						if (theme.toggled === "menu-click-closed") {
							ThemeChanger({ ...theme, "toggled": "" });
						}
						else {
							ThemeChanger({ ...theme, "toggled": "menu-click-closed" });
						}
						break;
					// menu-hover
					case "menu-hover":
						if (theme.toggled === "menu-hover-closed") {
							ThemeChanger({ ...theme, "toggled": "" });
						} else {
							ThemeChanger({ ...theme, "toggled": "menu-hover-closed" });

						}
						break;
					case "icon-click":
						if (theme.toggled === "icon-click-closed") {
							ThemeChanger({ ...theme, "toggled": "" });
						} else {
							ThemeChanger({ ...theme, "toggled": "icon-click-closed" });

						}
						break;
					case "icon-hover":
						if (theme.toggled === "icon-hover-closed") {
							ThemeChanger({ ...theme, "toggled": "" });
						} else {
							ThemeChanger({ ...theme, "toggled": "icon-hover-closed" });

						}
						break;

				}
			}
		}
		else {
			if (theme.toggled === "close") {
				ThemeChanger({ ...theme, "toggled": "open" });

				setTimeout(() => {
					if (theme.toggled == "open") {
						const overlay = document.querySelector("#responsive-overlay");

						if (overlay) {
							overlay.classList.add("active");
							overlay.addEventListener("click", () => {
								const overlay = document.querySelector("#responsive-overlay");

								if (overlay) {
									overlay.classList.remove("active");
									menuClose();
								}
							});
						}
					}

					window.addEventListener("resize", () => {
						if (window.screen.width >= 992) {
							const overlay = document.querySelector("#responsive-overlay");

							if (overlay) {
								overlay.classList.remove("active");
							}
						}
					});
				}, 100);
			} else {
				ThemeChanger({ ...theme, "toggled": "close" });
			}
		}

	};

	//Cart function

	const maxDisplayItems = 5;

	const dispatch = useDispatch();
	const reduxCart = useSelector(state => state.cart);
	const [localCart, setLocalCart] = useState(HeaderCart);
	const [remainingCount2, setRemainingCount2] = useState(0);

	// Combine local and redux carts whenever they change
	const combinedCart = [...localCart, ...reduxCart];

	useEffect(() => {
		setRemainingCount2(combinedCart.length);
	}, [combinedCart]);

	const handleDelete = (id) => {
		// Remove item from local cart
		setLocalCart(localCart.filter(item => item.id !== id));
		// Remove item from redux cart
		dispatch(removeFromCart(id));
	};

	//notification remove function

	const [data, setData] = useState([]);
	const [remainingCount, setRemainingCount] = useState(cartData.length);

	const Remove = (id) => {
		if (!data.includes(id)) {
			setData((i) => [...i, id]);
			setRemainingCount((prevCount) => prevCount - 1);
		}
	};
	//rightsidebar

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	//search visibility function
	const [isSearchDropVisible, setSearchDropVisible] = useState(false);
	const [InputValue, setInputValue] = useState("");
	const [show1, setShow1] = useState(false);
	const [show2, setShow2] = useState(false);
	const [customshow, _setCustomshow] = useState(true);
	const [NavData, setNavData] = useState([]);
	const [searchcolor, setsearchcolor] = useState("text-dark");
	const [searchval, setsearchval] = useState("Type something");
	const searchRef = useRef(null);

	const linkData = [
		{ path: "/components/advanceui/calendar/", icon: "bx-calendar", text: "Calendar" },
		{ path: "/components/apps/mail/mailinbox/", icon: "bx-envelope", text: "Mail" },
		{ path: "/components/elements/buttons/", icon: "bx-dice-1", text: "Buttons" },
	];
	const toggleSearchDropdown = (e) => {
		e.stopPropagation();
		setSearchDropVisible(!isSearchDropVisible);
	};
	return (
		<Fragment>
			<header className="app-header">

				<div className="main-header-container container-fluid">
					<div className="header-content-left align-items-center">

						{/* logo */}
						<div className="header-element">
							<div className="horizontal-logo">
								<Link className="header-logo " href={"/components/dashboard/dashboard"}>
									<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-logo.png`} alt="logo" className="desktop-logo" />
									<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-logo.png`} alt="logo" className="toggle-logo" />
									<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-dark.png`} alt="logo" className="desktop-dark" />
									<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-dark.png`} alt="logo" className="toggle-dark" />
									<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-white.png`} alt="logo" className="desktop-white" />
									<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-white.png`} alt="logo" className="toggle-white" />
								</Link>
							</div>
						</div>

						{/* Toggle icon sidebar */}
						<div className="header-element">
							<Link aria-label="Hide Sidebar" onClick={() => toggleSidebar()} className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle" data-bs-toggle="sidebar" href="#!"><span></span></Link>
						</div>
						<div className="main-header-center  d-none d-lg-block  header-link">
							<InputGroup className="search-results">
								<Select options={HeaderSearchData} placeholder="Choose one" classNamePrefix="Select2" className='input-group-btn search-panel' />
								<Form.Control defaultValue={InputValue}
									onChange={(ele) => {
										myfunction(ele.target.value);
										setInputValue(ele.target.value);
										setSearchDropVisible(true);
									}} placeholder="Search for results..." aria-label="Username" aria-describedby="basic-addon1" onClick={toggleSearchDropdown} />
								<Button variant="primary" id="basic-addon1"><i className="fe fe-search" aria-hidden="true"></i></Button>
								<div className={`header-search ${isSearchDropVisible ? "searchdrop" : ""}`} ref={searchRef}>
									<div className="p-3">
										<div>
											{show1 ? <> <ListGroup className='my-2 border-0'> {show2 ? NavData.map((e) => <ListGroup.Item key={Math.random()} className=""> <Link href={`${e.path}/`} onClick={() => { setShow1(false), setInputValue(""); setSearchDropVisible(false); }}><i className="fe fe-chevron-right me-2"></i>{e.title}</Link></ListGroup.Item>) : <b className={`${searchcolor} `}>{searchval}</b>} </ListGroup> </> : ""}

											<p className="fw-semibold text-muted mb-2 fs-13">Recent Searches</p>
											<div className="ps-2">
												<Link href="#!" className="search-tags  me-3"><i className="fe fe-search me-2"></i>People<span></span></Link>
												<Link href="#!" className="search-tags  me-3"><i className="fe fe-search me-2"></i>Pages<span></span></Link>
												<Link href="#!" className="search-tags"><i className="fe fe-search me-2"></i>Articles<span></span></Link>
											</div>
										</div>
										{customshow && !show2 && (
											<div className="mt-3">
												<p className="fw-semibold text-muted mb-2 fs-13">Apps and pages</p>
												<ul className="ps-2">
													{linkData.map((link) => (
														<li key={link.path} className="p-1 d-flex align-items-center text-muted mb-2 search-app">
															<Link href={link.path} onClick={() => { setSearchDropVisible(false); }}>
																<span><i className={`bx ${link.icon} me-2 fs-14 bg-primary-transparent p-2 rounded-circle`}></i>{link.text}</span>
															</Link>
														</li>
													))}
												</ul>
											</div>
										)}
										{customshow && !show2 && (
											<div className="mt-3">
												<p className="fw-semibold text-muted mb-2 fs-13">Links</p>
												<ul className="ps-2">
													<li className="p-1 align-items-center text-muted mb-1 search-app">
														<Link href="#!" className="text-primary"><u>http://spruko/html/spruko.com</u></Link>
													</li>
													<li className="p-1 align-items-center text-muted mb-1 search-app">
														<Link href="#!" className="text-primary"><u>http://spruko/demo/spruko.com</u></Link>
													</li>
												</ul>
											</div>
										)}
									</div>
									<div className="py-3 border-top px-0">
										<div className="text-center">
											<Link href="#!" className="text-primary text-decoration-underline fs-15">View all</Link>
										</div>
									</div>
								</div>
							</InputGroup>

						</div>
					</div>
					<div className="header-content-right">
						{/* Toggle dark icon */}
						<div className="header-element header-theme-mode">
							<Link href="#!" className="header-link layout-setting" onClick={() => ToggleDark()}>
								<span className="light-layout"> <i className="fe fe-moon header-link-icon lh-2"></i> </span>
								<span className="dark-layout"> <i className="fe fe-sun header-link-icon lh-2"></i> </span>
							</Link>

						</div>
						{/* country flag */}
						<Dropdown className="header-element country-selector">
							<Dropdown.Toggle as='a' variant="" className="header-link country-Flag" id="dropdown-basic">
								<span>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
										<circle cx="256" cy="256" r="256" fill="#f0f0f0" />
										<g fill="#0052b4">
											<path d="M52.92 100.142c-20.109 26.163-35.272 56.318-44.101 89.077h133.178L52.92 100.142zM503.181 189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075 89.076h133.176zM8.819 322.784c8.83 32.758 23.993 62.913 44.101 89.075l89.074-89.075H8.819zM411.858 52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177l89.076-89.075zM100.142 459.079c26.163 20.109 56.318 35.272 89.076 44.102V370.005l-89.076 89.074zM189.217 8.819c-32.758 8.83-62.913 23.993-89.075 44.101l89.075 89.075V8.819zM322.783 503.181c32.758-8.83 62.913-23.993 89.075-44.101l-89.075-89.075v133.176zM370.005 322.784l89.075 89.076c20.108-26.162 35.272-56.318 44.101-89.076H370.005z" />
										</g>
										<g fill="#d80027">
											<path d="M509.833 222.609H289.392V2.167A258.556 258.556 0 00256 0c-11.319 0-22.461.744-33.391 2.167v220.441H2.167A258.556 258.556 0 000 256c0 11.319.744 22.461 2.167 33.391h220.441v220.442a258.35 258.35 0 0066.783 0V289.392h220.442A258.533 258.533 0 00512 256c0-11.317-.744-22.461-2.167-33.391z" />
											<path d="M322.783 322.784L437.019 437.02a256.636 256.636 0 0015.048-16.435l-97.802-97.802h-31.482v.001zM189.217 322.784h-.002L74.98 437.019a256.636 256.636 0 0016.435 15.048l97.802-97.804v-31.479zM189.217 189.219v-.002L74.981 74.98a256.636 256.636 0 00-15.048 16.435l97.803 97.803h31.481zM322.783 189.219L437.02 74.981a256.328 256.328 0 00-16.435-15.047l-97.802 97.803v31.482z" />
										</g>
									</svg>
								</span>
							</Dropdown.Toggle>

							<Dropdown.Menu className="main-header-dropdown" align="end">
								<li><Dropdown.Item className="d-flex align-items-center"> <span className="avatar avatar-xs lh-1 me-2"><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/6.jpg`} alt="img" /></span>English</Dropdown.Item></li>
								<li><Dropdown.Item className="d-flex align-items-center"> <span className="avatar avatar-xs lh-1 me-2"><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/5.jpg`} alt="img" /></span>Spanish</Dropdown.Item></li>
								<li><Dropdown.Item className="d-flex align-items-center"> <span className="avatar avatar-xs lh-1 me-2"><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/1.jpg`} alt="img" /></span>French</Dropdown.Item></li>
								<li><Dropdown.Item className="d-flex align-items-center"> <span className="avatar avatar-xs lh-1 me-2"><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/2.jpg`} alt="img" /></span>German</Dropdown.Item></li>
								<li><Dropdown.Item className="d-flex align-items-center"> <span className="avatar avatar-xs lh-1 me-2"><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/3.jpg`} alt="img" /></span>Italian</Dropdown.Item></li>
								<li><Dropdown.Item className="d-flex align-items-center"> <span className="avatar avatar-xs lh-1 me-2"><img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/4.jpg`} alt="img" /></span>Russian</Dropdown.Item></li>
							</Dropdown.Menu>
						</Dropdown>
						{/* Fullscreen icon */}
						<div className="header-element header-fullscreen   d-xl-flex d-none">

							<Link onClick={toggleFullScreen} href="#!" className="header-link">
								{fullScreen ? (
									<i className="bx bx-exit-fullscreen full-screen-close header-link-icon"></i>
								) : (
									<i className="bx bx-fullscreen full-screen-open header-link-icon"></i>
								)}
							</Link>

						</div>
						{/* Shopping cart */}
						<Dropdown className="header-element cart-dropdown" autoClose="outside">
							<Dropdown.Toggle as='a' className="header-link" variant="" id="dropdown-basic">
								<i className="fe fe-shopping-cart header-link-icon d-xl-block d-none"></i>
								<Badge bg="primary" className="rounded-pill header-icon-badge d-xl-block d-none" id="cart-icon-badge">{remainingCount2}</Badge>
							</Dropdown.Toggle>
							<Dropdown.Menu className="main-header-dropdown" align='end'>
								<div className="p-3">
									<div className="d-flex align-items-center justify-content-between">
										<p className="mb-0 fs-17 fw-semibold">Cart Items</p>
										<Badge bg='primary' className="rounded-pill" id="cart-data">{remainingCount2} {remainingCount2 !== 1 ? "" : ""}Items</Badge>
									</div>
								</div>
								<div><DropdownDivider /></div>
								{remainingCount2 === 0 && (
									<div className="p-5 empty-item">
										<div className="text-center">
											<span className="avatar avatar-xl avatar-rounded bg-warning-transparent">
												<i className="ri-shopping-cart-2-line fs-2"></i>
											</span>
											<h6 className="fw-bold mb-1 mt-3">Your Cart is Empty</h6>
											<span className="mb-3 fw-normal fs-13 d-block">Add some items to make me happy :)</span>
											<Link href={"/components/ecommerce/products"} className="btn btn-primary btn-wave btn-sm m-1 waves-effect waves-light" data-abc="true">continue shopping <i className="bi bi-arrow-right ms-1"></i></Link>
										</div>
									</div>
								)}

								{combinedCart.slice(0, maxDisplayItems).map((idx, index) => (
									<Fragment key={index}>
										{!combinedCart.includes(idx.id) && (
											<Link href={"/components/ecommerce/ecart"} className="dropdown-item d-flex align-items-center cart-dropdown-item" >
												<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}${idx.preview}`} alt="img" className="avatar avatar-sm br-5 me-3" />
												<div className="flex-grow-1">
													<div className="d-flex align-items-start justify-content-between mb-0">
														<div className="mb-0 fs-13 text-dark fw-medium">
															<span className="text-dark">{idx.itemName}</span>
														</div>
														<div>
															<span className="text-black mb-1 fw-medium">{idx.price}</span>
														</div>
													</div>
													<div className="min-w-fit-content d-flex align-items-start justify-content-between">
														{idx.ulElement}
														<div className="ms-auto">
															<span href="#!" onClick={() => handleDelete(idx.id)}
																className="header-cart-remove float-end dropdown-item-close border-0 custom_cruser">
																<i className="ri-delete-bin-2-line"></i></span>
														</div>
													</div>
												</div>
											</Link>
										)}
									</Fragment>
								))}
								{remainingCount2 > 0 && (
									<div className="p-3 empty-header-item">
										<div className="d-grid">
											<Link href={"/components/ecommerce/checkout"} className="btn btn-primary">Proceed to checkout</Link>
										</div>
									</div>
								)}
								<div className="p-5 empty-item d-none">
									<div className="text-center">
										<span className="avatar avatar-xl avatar-rounded bg-warning-transparent">
											<i className="ri-shopping-cart-2-line fs-2"></i>
										</span>
										<h6 className="fw-bold mb-1 mt-3">Your Cart is Empty</h6>
										<span className="mb-3 fw-normal fs-13 d-block">Add some items to make me happy :)</span>
										<Link href={"/components/ecommerce/products"} className="btn btn-primary btn-wave btn-sm m-1" data-abc="true">continue shopping <i className="bi bi-arrow-right ms-1"></i></Link>
									</div>
								</div>
							</Dropdown.Menu>
						</Dropdown>
						{/* notifiation */}
						<Dropdown className="header-element notifications-dropdown" align='start' autoClose="outside">
							<Dropdown.Toggle as='a' className="header-link" variant="" id="dropdown-basic">
								<i className="fe fe-bell header-link-icon"></i>
								<Badge bg='secondary' className="rounded-pill header-icon-badge pulse pulse-secondary" id="notification-icon-badge">{remainingCount}</Badge>
							</Dropdown.Toggle>
							<Dropdown.Menu className="main-header-dropdown" align="end">
								<div className="p-3">
									<div className="d-flex align-items-center justify-content-between">
										<p className="mb-0 fs-17 fw-semibold">Notifications</p>
										<Badge bg='secondary' className="rounded-pill" id="notifiation-data">{remainingCount} Unread </Badge>
									</div>
								</div>
								<DropdownDivider />
								{remainingCount === 0 && (
									<div className="p-5 empty-item1">
										<div className="text-center">
											<span className="avatar avatar-xl avatar-rounded bg-secondary-transparent">
												<i className="ri-notification-off-line fs-2"></i>
											</span>
											<h6 className="fw-semibold mt-3">No New Notifications</h6>
										</div>
									</div>
								)}
								{cartData.map((idx) => (
									<Fragment key={idx.id}>
										{!data.includes(idx.id) && (
											<Link href={"/components/advanceui/notifications"} className="dropdown-item d-flex align-items-start" key={idx.id}>
												<div className="pe-2">
													<span className={`avatar avatar-md ${idx.status} br-5`}>
														<img alt="avatar" src={`${process.env.NODE_ENV === "production" ? basePath : ""}${idx.preview}`} />
													</span>
												</div>
												<div className="flex-grow-1 d-flex align-items-center justify-content-between">
													<div className='flex-grow-1'>
														<p className="mb-0">{idx.element}</p>
														{idx.spanElement}
													</div>
													<div>
														<span onClick={() => Remove(idx.id)} className="min-w-fit-content text-muted me-1 dropdown-item-close1 border-0 custom_cruser" >
															<i className="ti ti-x fs-16"></i>
														</span>
													</div>
												</div>
											</Link>
										)}
									</Fragment>
								))}
								{remainingCount > 0 && (
									<div className="p-3 empty-header-item1">
										<div className="d-grid">
											<Link href={"/components/advanceui/notifications"} className="btn btn-primary">View All</Link>
										</div>
									</div>
								)}
								<div className="p-5 empty-item1 d-none">
									<div className="text-center">
										<span className="avatar avatar-xl avatar-rounded bg-secondary-transparent">
											<i className="ri-notification-off-line fs-2"></i>
										</span>
										<h6 className="fw-semibold mt-3">No New Notifications</h6>
									</div>
								</div>
							</Dropdown.Menu>
						</Dropdown>
						{/* related apps */}
						<Dropdown className="header-element header-shortcuts-dropdown  d-xl-flex d-none">
							<Dropdown.Toggle as='a' className="header-link" variant="" id="dropdown-basic"><i className="fe fe-grid header-link-icon d-xl-block d-none"></i></Dropdown.Toggle>
							<Dropdown.Menu className="main-header-dropdown header-shortcuts-dropdown pb-0 dropdown-menu-end">
								<div className="p-3">
									<div className="d-flex align-items-center justify-content-between">
										<p className="mb-0 fs-17 fw-semibold">Related Apps</p>
									</div>
								</div>
								<DropdownDivider />

								<div className="main-header-shortcuts p-2" id="header-shortcut-scroll">
									<div className="row g-2">
										<div className="col-4">
											<Link href="#!" className="text-dark">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/figma.png`} alt="" />
													</span>
													<span className="d-block fs-12">Figma</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!" className="text-dark">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/microsoft-powerpoint.png`} alt="" />
													</span>
													<span className="d-block fs-12">Power Point</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!" className="text-dark">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/calender.png`} alt="" />
													</span>
													<span className="d-block fs-12">MS Word</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!" className="text-dark">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/calender.png`} alt="" />
													</span>
													<span className="d-block fs-12">Calendar</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!" className="text-dark">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/sketch.png`} alt="" />
													</span>
													<span className="d-block fs-12">Sketch</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!" className="text-dark">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/google-docs.png`} alt="" />
													</span>
													<span className="d-block fs-12">Docs</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!" className="text-dark">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/google.png`} alt="" />
													</span>
													<span className="d-block fs-12">Google</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!" className="text-dark">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/translate.png`} alt="" />
													</span>
													<span className="d-block fs-12">Translate</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!" className="text-dark">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm rounded-2 p-1 bg-primary-transparent">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/google-sheets.png`} alt="" />
													</span>
													<span className="d-block fs-12">Sheets</span>
												</div>
											</Link>
										</div>
									</div>
								</div>
								<div className="p-3 border-top">
									<div className="d-grid">
										<Link href="#!" className="btn btn-primary">View All</Link>
									</div>
								</div>
							</Dropdown.Menu>
						</Dropdown>

						{/* Profile */}
						<Dropdown className="header-element header-profile">
							<Dropdown.Toggle as='a' className="header-link" variant="" id="dropdown-basic">
								<div className="d-flex align-items-center">
									<div className="header-link-icon">
										<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/faces/1.jpg`} alt="img" width="32" height="32" className="rounded-circle" />
									</div>
									<div className="d-none">
										<p className="fw-semibold mb-0">Angelica</p>
										<span className="op-7 fw-normal d-block fs-11">Web Designer</span>
									</div>
								</div>
							</Dropdown.Toggle>

							<Dropdown.Menu className="main-header-dropdown pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end">
								<div className="header-navheading border-bottom">
									<h6 className="main-notification-title">Sonia Taylor</h6>
									<p className="main-notification-text mb-0">Web Designer</p>
								</div>
								<Dropdown.Item as={Link} href={"/components/pages/profile"} className="d-flex"><i className="fe fe-user fs-16 align-middle me-2"></i>Profile</Dropdown.Item>
								<Dropdown.Item as={Link} href={"/components/apps/mail/mailinbox"} className="d-flex"><i className="fe fe-inbox fs-16 align-middle me-2"></i>Inbox <span className="badge bg-success ms-auto">25</span></Dropdown.Item>
								<Dropdown.Item as={Link} href={"/components/advanceui/notifications"} className=" d-flex border-block-end"><i className="fe fe-compass fs-16 align-middle me-2"></i>Activity</Dropdown.Item>
								<Dropdown.Item as={Link} href={"/components/pages/settings"} className="d-flex"><i className="fe fe-settings fs-16 align-middle me-2"></i>Settings</Dropdown.Item>
								<Dropdown.Item as={Link} href={"/components/advanceui/chat"} className="d-flex"><i className="fe fe-headphones fs-16 align-middle me-2"></i>Support</Dropdown.Item>
								<Dropdown.Item as={Link} href={"/components/authentication/signin/"} className="d-flex"><i className="fe fe-power fs-16 align-middle me-2"></i>Log Out</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						{/* Right sidebar */}
						<div className="sidebar sidebar-right sidebar-animate  d-xl-flex d-none">
							<Offcanvas placement="end" show={show} onHide={handleClose} id="right-sidebar-canvas">
								<Offcanvas.Header closeButton>
									<Offcanvas.Title>Todo</Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Body className="p-0">

									<div className="d-flex p-3">
										<div>
											<Form.Check defaultChecked type="checkbox" label="Hangout With friends" />
										</div>
										<span className="ms-auto">
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Edit</Tooltip>}><i className="fe fe-edit-2 text-primary me-2"></i></OverlayTrigger>
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}><i className="fe fe-trash-2 text-danger me-2"></i></OverlayTrigger>
										</span>
									</div>
									<div className="d-flex p-3 border-top">
										<div>
											<Form.Check type="checkbox" label="Prepare for presentation" />
										</div>
										<span className="ms-auto">
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Edit</Tooltip>}><i className="fe fe-edit-2 text-primary me-2"></i></OverlayTrigger>
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}><i className="fe fe-trash-2 text-danger me-2"></i></OverlayTrigger>
										</span>
									</div>
									<div className="d-flex p-3 border-top">
										<div>
											<Form.Check type="checkbox" label="Prepare for presentation" />
										</div>
										<span className="ms-auto">
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Edit</Tooltip>}><i className="fe fe-edit-2 text-primary me-2"></i></OverlayTrigger>
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}><i className="fe fe-trash-2 text-danger me-2"></i></OverlayTrigger>
										</span>
									</div>
									<div className="d-flex p-3 border-top">
										<div>
											<Form.Check defaultChecked type="checkbox" label="System Updated" />
										</div>
										<span className="ms-auto">
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Edit</Tooltip>}><i className="fe fe-edit-2 text-primary me-2"></i></OverlayTrigger>
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}><i className="fe fe-trash-2 text-danger me-2"></i></OverlayTrigger>
										</span>
									</div>
									<div className="d-flex p-3 border-top">
										<div>
											<Form.Check type="checkbox" label="Do something more" />
										</div>
										<span className="ms-auto">
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Edit</Tooltip>}><i className="fe fe-edit-2 text-primary me-2"></i></OverlayTrigger>
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}><i className="fe fe-trash-2 text-danger me-2"></i></OverlayTrigger>
										</span>
									</div>
									<div className="d-flex p-3 border-top">
										<div>
											<Form.Check type="checkbox" label="System Updated" />
										</div>
										<span className="ms-auto">
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Edit</Tooltip>}><i className="fe fe-edit-2 text-primary me-2"></i></OverlayTrigger>
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}><i className="fe fe-trash-2 text-danger me-2"></i></OverlayTrigger>
										</span>
									</div>
									<div className="d-flex p-3 border-top">
										<div>
											<Form.Check type="checkbox" label="Find an Idea" defaultChecked />
										</div>
										<span className="ms-auto">
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Edit</Tooltip>}><i className="fe fe-edit-2 text-primary me-2"></i></OverlayTrigger>
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}><i className="fe fe-trash-2 text-danger me-2"></i></OverlayTrigger>
										</span>
									</div>
									<div className="d-flex p-3 border-top mb-0">
										<div>
											<Form.Check type="checkbox" label="Project review" defaultChecked />
										</div>
										<span className="ms-auto">
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Edit</Tooltip>}><i className="fe fe-edit-2 text-primary me-2"></i></OverlayTrigger>
											<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}><i className="fe fe-trash-2 text-danger me-2"></i></OverlayTrigger>
										</span>
									</div>
									<h5 className="px-4 Overviews">Overview</h5>
									<div className="p-4">
										<div className="main-traffic-detail-item">
											<div>
												<span>Founder &amp; CEO</span> <span>24</span>
											</div>

											<ProgressBar variant="" className="mb-3 progress-sm progress-animate" max={100} min={0} now={30} />

										</div>
										<div className="main-traffic-detail-item">
											<div>
												<span>UX Designer</span> <span>1</span>
											</div>

											<ProgressBar variant="secondary" className="mb-3 progress-sm progress-animate" max={100} min={0} now={15} />
										</div>
										<div className="main-traffic-detail-item">
											<div>
												<span>Recruitment</span> <span>87</span>
											</div>

											<ProgressBar variant="success" className="mb-3 progress-sm progress-animate" max={100} min={0} now={45} />
											{/* <!-- progress --> */}
										</div>
										<div className="main-traffic-detail-item">
											<div>
												<span>Software Engineer</span> <span>32</span>
											</div>

											<ProgressBar variant="info" className="mb-3 progress-sm progress-animate" max={100} min={0} now={25} />
											{/* <!-- progress --> */}
										</div>
										<div className="main-traffic-detail-item">
											<div>
												<span>Project Manager</span> <span>32</span>
											</div>

											<ProgressBar variant="danger" className="mb-3 progress-sm progress-animate" max={100} min={0} now={25} />
											{/* <!-- progress --> */}
										</div>
									</div>

								</Offcanvas.Body>
							</Offcanvas>
						</div>

						<div className="header-element right-sidebar d-xl-flex d-none">
							<Link href="#!" className="header-link right-sidebar" onClick={handleShow}>
								<i className="fe fe-align-right header-icons header-link-icon"></i>
							</Link>
						</div>
						{/* Switcher */}
						<div className="header-element">
							<Link onClick={() => swichermainright()} href="#!" className="header-link switcher-icon" data-bs-toggle="offcanvas" data-bs-target="#switcher-canvas">
								<i className="fe fe-settings header-link-icon"></i>							</Link>
						</div>
					</div>
				</div>
			</header>

		</Fragment>
	);
}

const mapStateToProps = (state) => ({
	local_varaiable: state
});

export default connect(mapStateToProps, { ThemeChanger })(Header);

