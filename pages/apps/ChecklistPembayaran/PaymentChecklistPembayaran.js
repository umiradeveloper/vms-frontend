
import { Button } from "@mui/material";
import { Fragment, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import TablePaymentPembayaran from "./Component/TablePaymentChecklistPembayaran";


const PaymentChecklistPembayaran = () => {
     const [openModalAdd, setOpenModalAdd] = useState({
        open: false
    })
    const [loader, setLoader] = useState(false);
    return(
        <Fragment>
            <Seo title={"Payment Checklist"} />
            <PageHeaderVms title='Ready To Pay' item='Checklist Pembayaran' active_item='Payment' />
            <LoadersSimUmira open={loader} />
            {/* <CreatePengajuan openModal={openModalAdd} setOpenModal={setOpenModalAdd} loader={loader} setLoader={setLoader} /> */}
            <Row className="d-flex gap-3">
                {/* <Col xl={12} className="d-flex justify-content-end">
                    <Button variant="contained" color="success" onClick={() => setOpenModalAdd({ open: true })}>Pengajuan Jenis Transaksi</Button>
                </Col> */}
                <Col xl={12}>
                    <TablePaymentPembayaran loader={loader} setLoader={setLoader} />
                    {/* <MonitoringChecklistPembayaran loader={loader} setLoader={setLoader} /> */}
                </Col>
            </Row>
        </Fragment>
    )
}

PaymentChecklistPembayaran.layout = "ContentlayoutVms";
export default PaymentChecklistPembayaran;