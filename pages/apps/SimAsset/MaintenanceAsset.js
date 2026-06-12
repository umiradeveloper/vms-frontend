import { Fragment, useState } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import { Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import ListMaintenanceAsset from "./MaintenanceAsset/ListMaintenanceAsset";
import CreateMaintenanceAsset from "./MaintenanceAsset/Modals/CreateMaintenanceAsset";

const MaintenanceAsset = () => {
     const [openModalJadwal, setOpenModalJadwal] = useState({
        open: false
    })
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);    
    return(
        <Fragment>
            <Seo title={"Daftar Maintenance Asset Dan Pengelolaan"} />
            <PageHeaderVms title='Daftar Asset' item='Daftar Asset' active_item='Daftar Asset' />
            <LoadersSimUmira open={loader} />
            <CreateMaintenanceAsset openModal={openModalJadwal} setOpenModal={setOpenModalJadwal} loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
            <Row className="d-flex gap-3">
                <Col xl={12} className="d-flex justify-content-end">
                    <Button variant="contained" color="success" onClick={() => setOpenModalJadwal({ open: true })}> Jadwalkan Maintenance</Button>
                </Col>
                <Col xl={12}>
                    <ListMaintenanceAsset loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
                </Col>
            </Row>
        </Fragment>
    )
}

MaintenanceAsset.layout = "ContentlayoutVms";
export default MaintenanceAsset;
