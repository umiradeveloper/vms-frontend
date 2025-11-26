import store from "../../redux/store";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import * as switcherdata from "../../data/switcher/switcherdata";
import { ThemeChanger } from "../../redux/actions";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TabToTop from "../tab-to-top/tab-to-top";

const Landingpagelayout = ({ children }) => {
	const [lateLoad, setlateLoad] = useState(false);

	useEffect(() => {
		setlateLoad(true);
	});

	

	useEffect(() => {
		// Example of using switcherdata with local storage backup
		switcherdata.LocalStorageBackup(ThemeChanger);
	}, []);
	
	return (
		<div className="landing-page-wrapper" style={{ display: `${lateLoad ? "block" : "none"}` }}>
			<Provider store={store}>
				<HelmetProvider>
					<Helmet
						htmlAttributes={{
							"data-nav-layout": "horizontal",
							"data-nav-style": "menu-click",
							// "data-toggled": MyclassName,
						}}
					>
						{/*<body className="landing-body" />*/}
					</Helmet>
					{children}
					<TabToTop />
				</HelmetProvider>
			</Provider>
		</div>
	);
};

export default Landingpagelayout;
