import { Fragment, useState } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import { Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import ListDisposalAsset from "./DisposalAsset/ListDisposalAsset";
import CreateDisposalAsset from "./DisposalAsset/Modals/CreateDisposalAsset";


const DisposalAsset = () => {
    const [openModalHapus, setOpenModalHapus] = useState({
            open: false
        })
        const [loader, setLoader] = useState(false);
        const [reload, setReload] = useState(false);  
    return(
        <Fragment>
            <Seo title={"Daftar Asset Disposal"} />
            <PageHeaderVms title='Daftar Asset Disposal' item='Daftar Asset Disposal' active_item='Daftar Asset Disposal' />
            <LoadersSimUmira open={loader} />
            <CreateDisposalAsset openModal={openModalHapus} setOpenModal={setOpenModalHapus} loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
            <Row className="d-flex gap-3">
                <Col xl={12} className="d-flex justify-content-end">
                    <Button variant="contained" color="success" onClick={() => setOpenModalHapus({ open: true })}> Usulkan Penghapusan</Button>
                </Col>
                <Col xl={12}>
                    <ListDisposalAsset loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
                    {/* <ListMaintenanceAsset loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} /> */}
                </Col>
            </Row>
        </Fragment>
    )
}
DisposalAsset.layout = "ContentlayoutVms";
export default DisposalAsset;