
import "../styles/globals.scss";
import "../public/assets/css/icons.css";
import Contentlayout from "../shared/layout-components/layout/content-layout";
import ContentlayoutVms from "./apps/layout/ContentLayoutVms";
import Authenticationlayout from "../shared/layout-components/layout/authentication-layout";
import Landingpagelayout from "../shared/layout-components/layout/Landingpage-layout";
const layouts = {
	Contentlayout: Contentlayout,
	Landingpagelayout:Landingpagelayout,
	Authenticationlayout:Authenticationlayout,
	ContentlayoutVms: ContentlayoutVms,
};
function MyApp({ Component, pageProps }) {
	const Layout = layouts[Component.layout] || ((pageProps) => <Component>{pageProps}</Component>);
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;

