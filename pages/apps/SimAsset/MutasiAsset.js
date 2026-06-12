import { Fragment, useState } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import { Col, Row } from "react-bootstrap";
import ListMutasiAsset from "./MutasiAsset/ListMutasiAsset";
import { Button } from "@mui/material";
import AjukanMutasiAsset from "./MutasiAsset/Modals/AjukanMutasiAsset";



const MutasiAsset = () => {
    const [openModalAjukan, setOpenModalAjukan] = useState({
        open: false
    })
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);    
    return(
        <Fragment>
            <Seo title={"Mutasi Asset"} />
            <PageHeaderVms title='Daftar Mutasi Asset' item='Daftar Mutasi Asset' active_item='Daftar Mutasi Asset' />
            <LoadersSimUmira open={loader} />
            <AjukanMutasiAsset openModal={openModalAjukan} setOpenModal={setOpenModalAjukan} loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
            <Row className="d-flex gap-3">
                <Col xl={12} className="d-flex justify-content-end">
                    <Button variant="contained" color="success" onClick={() => setOpenModalAjukan({ open: true })}>Ajukan Mutasi Asset</Button>
                </Col>
                <Col xl={12}>
                    <ListMutasiAsset loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
                </Col>
            </Row>
        </Fragment>
    )
}

MutasiAsset.layout = "ContentlayoutVms";
export default MutasiAsset;

