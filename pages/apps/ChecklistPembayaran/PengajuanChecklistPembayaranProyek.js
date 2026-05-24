import { Button } from "@mui/material";
import { Fragment, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import CreatePengajuan from "./Component/Proyek/modals/CreatePengajuanProyek";
import MonitoringChecklistPembayaran from "./Component/MonitoringChecklistPembayaran";
import DaftarPengajuanTransaksi from "./Component/Proyek/DaftarPengajuanTransaksi";


const PengajuanChecklistPembayaranProyek = () => {
    const [openModalAdd, setOpenModalAdd] = useState({
        open: false
    })
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);
    return (
        <Fragment>
            <Seo title={"Monitoring Dan Pengajuan transaksi"} />
            <PageHeaderVms title='Checklist Pembayaran' item='Pengajuan Pembayaran' active_item='Pengajuan Pembayaran' />
            <LoadersSimUmira open={loader} />
            <CreatePengajuan openModal={openModalAdd} setOpenModal={setOpenModalAdd} loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
            <Row className="d-flex gap-3">
                <Col xl={12} className="d-flex justify-content-end">
                    <Button variant="contained" color="success" onClick={() => setOpenModalAdd({ open: true })}>Pengajuan Jenis Transaksi</Button>
                </Col>
                <Col xl={12}>
                    <DaftarPengajuanTransaksi loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
                </Col>
            </Row>
        </Fragment>
    )
}


PengajuanChecklistPembayaranProyek.layout = "ContentlayoutVms";
export default PengajuanChecklistPembayaranProyek;