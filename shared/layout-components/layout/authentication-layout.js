import React, { Fragment, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Provider } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import store from "../../redux/store";
import Authenticationswitcher from "../switcher/authenticationswitcher";

const Authenticationlayout = ({ children }) => {
	
	return (
		
		<Fragment>
			<Provider store={store}>
				<HelmetProvider>
					<Helmet>
						<body className='error-1'></body>
					</Helmet>
					{children}
					<Authenticationswitcher />
				</HelmetProvider>
			</Provider>
		</Fragment>
		
	);
};

export default Authenticationlayout;
