import { Fragment, useState } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import ListManajemenPengajuanPembayaran from "./Component/ListManajemenPengajuanPembayaran";
import { Col, Row } from "react-bootstrap";

const ManajemenPengajuanPembayaran = () => {

    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);
    return(
        <Fragment>
            <Seo title={"Monitoring Dan Pengajuan transaksi"} />
            <PageHeaderVms title='Checklist Pembayaran' item='Pengajuan Pembayaran' active_item='Pengajuan Pembayaran' />
            <LoadersSimUmira open={loader} />
          
            <Row className="d-flex gap-3">
                
                <Col xl={12} md={12} lg={12} sm={12}>
                    <ListManajemenPengajuanPembayaran loader={loader} setLoader={setLoader} reload={reload} setReload={setReload}  />
                    {/* <DaftarPengajuanTransaksi loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} /> */}
                </Col>
            </Row>
        </Fragment>
    )
}

ManajemenPengajuanPembayaran.layout = "ContentlayoutVms";
export default ManajemenPengajuanPembayaran;