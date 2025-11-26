
import React, { Fragment, useEffect, useState } from "react";
import { Provider } from "react-redux";
// import TabToTop from "../../../../tab-to-top/tab-to-top";
import TabToTop from "@/shared/layout-components/tab-to-top/tab-to-top";
import store from "@/shared/redux/store";
import SideBarVms from "../Component/SideBarVms";
// import Header from "@/shared/layout-components/header/header";
import HeaderVms from "../Component/HeaderVms";
import Switcher from "@/shared/layout-components/switcher/switcher";
import FooterVms from "../Component/FooterVms";
import "rodal/lib/rodal.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const ContentlayoutVms = ({ children }) => {
	const [lateLoad, setlateLoad] = useState(false);
	const router = useRouter();
	useEffect(() => {
		setlateLoad(true);
		if(!localStorage.getItem("token")){
			router.push("/apps/LoginRegister");
		}
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
						<HeaderVms />
						<SideBarVms />
						<div className="main-content app-content" onClick={Bodyclickk}>
							<div className="container-fluid" onClick={() => remove()}>
								{children}
							</div>
						</div>
						<FooterVms />
					</div>
					<TabToTop />
				</div>
			</Provider>
		</Fragment>
	);
};

export default dynamic(() => Promise.resolve(ContentlayoutVms), { ssr: false });;

