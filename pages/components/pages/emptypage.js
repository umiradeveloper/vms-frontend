import { Fragment } from "react";
import PageHeader from "../../../shared/layout-components/page-header/page-header";
import Seo from "../../../shared/layout-components/seo/seo";

const EmptyPage = () => {
	return (

		<Fragment>
			<Seo title={"Empty Page"} />
			<PageHeader title='Empty' item='Pages' active_item='Empty' />
		</Fragment>
	);
};
EmptyPage.layout = "Contentlayout";
export default EmptyPage;
