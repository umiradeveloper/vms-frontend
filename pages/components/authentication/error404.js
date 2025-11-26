import Link from "next/link";
import { Fragment } from "react";
import { Col, Container } from "react-bootstrap";
import Seo from "../../../shared/layout-components/seo/seo";

const Error404 = () => {
	return (
		<Fragment>
			<Seo title={"Error404"} />
			<div className="page main-signin-wrapper bg-primary construction">

				{/* <!-- Start::container --> */}
				<Container>
					<div className="construction1 text-center details text-fixed-white">
						<div className="">
							<Col lg={12}>
								<h1 className="fs-140 mb-0">404</h1>
							</Col>
							<Col lg={12}>
								<h1>Oops.The Page you are looking  for doesn't  exit..</h1>
								<h6 className="fs-15 mt-3 mb-4 text-white-50">You may have mistyped the address or the page may have moved. Try searching below.</h6>
								<Link className="btn ripple btn-secondary text-center mb-2" href={"/components/dashboard/dashboard/"}>Back to Home</Link>
							</Col>
						</div>
					</div>
				</Container>
				{/* <!-- End::container --> */}

			</div>
		</Fragment>
	);
};
Error404.layout = "Authenticationlayout";
export default Error404;
