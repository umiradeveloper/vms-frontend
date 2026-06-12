import { Fragment, useState } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import { Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import ListAsset from "./DaftarAsset/ListAsset";
import CreateAsset from "./DaftarAsset/Modals/CreateAsset";

const DaftarAsset = () => {
     const [openModalAdd, setOpenModalAdd] = useState({
        open: false
    })
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);    

    return(
         <Fragment>
            <Seo title={"Daftar Asset Dan Pengelolaan"} />
            <PageHeaderVms title='Daftar Asset' item='Daftar Asset' active_item='Daftar Asset' />
            <LoadersSimUmira open={loader} />
            <CreateAsset openModal={openModalAdd} setOpenModal={setOpenModalAdd} setReload={setReload} reload={reload} loader={loader} setLoader={setLoader} />
            <Row className="d-flex gap-3">
                <Col xl={12} className="d-flex justify-content-end">
                    <Button variant="contained" color="success" onClick={() => setOpenModalAdd({ open: true })}>Tambah Asset</Button>
                </Col>
                <Col xl={12}>
                    <ListAsset loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
                </Col>
            </Row>
        </Fragment>
    )
}

DaftarAsset.layout = "ContentlayoutVms";
export default DaftarAsset;