import { Fragment, useState } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import { Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";

import ListApprovalDisposalAsset from "./DisposalAsset/ListApprovalDisposalAsset";


const ApprovalDisposalAsset = () => {
   
        const [loader, setLoader] = useState(false);
        const [reload, setReload] = useState(false);  
    return(
        <Fragment>
            <Seo title={"Daftar Asset Disposal"} />
            <PageHeaderVms title='Daftar Asset Disposal' item='Daftar Asset Disposal' active_item='Daftar Asset Disposal' />
            <LoadersSimUmira open={loader} />
            <Row className="d-flex gap-3">
                <Col xl={12}>
                    <ListApprovalDisposalAsset loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
                </Col>
            </Row>
        </Fragment>
    )
}
ApprovalDisposalAsset.layout = "ContentlayoutVms";
export default ApprovalDisposalAsset;