import React, { Fragment, useEffect, useState } from "react";
import { Provider } from "react-redux";
import TabToTop from "../tab-to-top/tab-to-top";
import store from "../../../shared/redux/store";
import Sidebar from "../sidebar/sidebar";
import Header from "../header/header";
import Switcher from "../switcher/switcher";
import Footer from "../footer/footer";
const Contentlayout = ({ children }) => {
	const [lateLoad, setlateLoad] = useState(false);

	useEffect(() => {
		setlateLoad(true);
	});
	const Add = () => {
		document.querySelector("body")?.classList.remove("error-1");
		document.querySelector("body")?.classList.remove("landing-body");
	  };
	  
	  useEffect(() => {
		Add();
		setlateLoad(true)
	  });
	const remove = () => {
		if (document.querySelector(".card.search-result") != null) {
			document.querySelector(".card.search-result")?.classList.add("d-none");
		}
		if (document.querySelector(".searchdrop") != null) {
			document.querySelector(".searchdrop")?.classList.add("d-none");
		}
	};
	const Bodyclickk = () => {
		document.querySelector(".search-result")?.classList.add("d-none");
		if (localStorage.getItem("spruhaverticalstyles") == "iconText") {
		  setMyClass("");
		}
		if (window.innerWidth > 992) {
		  let html = document.documentElement;
		  if (html.getAttribute('data-icon-overlay') === 'open') {
			html.setAttribute('data-icon-overlay', "");
		  }
		}
	  }
	return (
		<Fragment>
			<Provider store={store}>
				<div style={{ display: `${lateLoad ? "block" : "none"}` }}>
					<Switcher />
					<div className="page">
						<Header />
						<Sidebar />
						<div className="main-content app-content" onClick={Bodyclickk}>
							<div className="container-fluid" onClick={() => remove()}>
								{children}
							</div>
						</div>
						<Footer />
					</div>
					<TabToTop />
				</div>
			</Provider>
		</Fragment>
	);
};

export default Contentlayout;

