import { Fragment, useState } from "react"
import ListApprovalMutasiAsset from "./ApprovalMutasiAsset/ListApprovalMutasiAsset";
import { Col, Row } from "react-bootstrap";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import PageHeaderVms from "../Component/PageHeaderVms";
import Seo from "@/shared/layout-components/seo/seo";

const ApprovalMutasiAsset = () => {
    const [openModalAjukan, setOpenModalAjukan] = useState({
        open: false
    })
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);
    return (
        <Fragment>
            <Seo title={"Approval Mutasi Asset"} />
            <PageHeaderVms title='Daftar Approval Mutasi Asset' item='Daftar Approval Mutasi Asset' active_item='Daftar Approval Mutasi Asset' />
            <LoadersSimUmira open={loader} />
            <Row className="d-flex gap-3">
                
                <Col xl={12}>
                    <ListApprovalMutasiAsset loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
                </Col>
            </Row>
        </Fragment>
    )
}


ApprovalMutasiAsset.layout = "ContentlayoutVms";
export default ApprovalMutasiAsset;