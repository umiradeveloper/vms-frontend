import { Button } from "@mui/material";
import { Fragment, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import CreatePengajuan from "./modals/CreatePengajuan";
import MonitoringChecklistPembayaran from "./MonitoringChecklistPembayaran";


const PengajuanChecklistPembayaran = () => {
    const [openModalAdd, setOpenModalAdd] = useState({
        open: false
    })
    const [loader, setLoader] = useState(false);
    return (
        <Fragment>
            <Seo title={"Human Resources System"} />
            <PageHeaderVms title='Checklist Pembayaran' item='Pengajuan Pembayaran' active_item='Pengajuan Pembayaran' />
            <LoadersSimUmira open={loader} />
            <CreatePengajuan openModal={openModalAdd} setOpenModal={setOpenModalAdd} loader={loader} setLoader={setLoader} />
            <Row className="d-flex gap-3">
                <Col xl={12} className="d-flex justify-content-end">
                    <Button variant="contained" color="success" onClick={() => setOpenModalAdd({ open: true })}>Pengajuan Jenis Transaksi</Button>
                </Col>
                <Col xl={12}>
                    <MonitoringChecklistPembayaran loader={loader} setLoader={setLoader} />
                </Col>
            </Row>
        </Fragment>
    )
}


PengajuanChecklistPembayaran.layout = "ContentlayoutVms";
export default PengajuanChecklistPembayaran;