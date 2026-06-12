import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Badge, Card, Col, Modal, Row } from "react-bootstrap";


const DetailDisposalAsset = ({ openModal, setOpenModal }) => {
    const [detail, setDetail] = useState();

   
    useEffect(() => {
        if(openModal.open){
            // console.log(openModal.datas)
            setDetail(openModal.datas);
        }
    },[openModal])

    return (
        <Modal size="xl" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
           
            <Modal.Body>
                <Row>
                    <Col xl={12}>
                        <Card className="custom-card">
                            <Card.Header>
                                <Card.Title>
                                    <i className="ti ti-trash me-2"></i>
                                    Detail Penghapusan Asset
                                </Card.Title>

                                <Badge bg="warning">
                                    {detail?.status_disposal}
                                </Badge>
                            </Card.Header>

                            <Card.Body>
                                <Row>

                                    {/* Asset */}
                                    <Col xl={6}>
                                        <Card className="custom-card border">
                                            <Card.Header>
                                                <Card.Title>
                                                    <i className="ti ti-package me-2"></i>
                                                    Informasi Asset
                                                </Card.Title>
                                            </Card.Header>

                                            <Card.Body>
                                                <ul className="list-group">
                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <span>Kode Asset</span>
                                                        <strong>
                                                            {detail?.asset?.kode_asset}
                                                        </strong>
                                                    </li>

                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <span>Nama Asset</span>
                                                        <strong>
                                                            {detail?.asset?.nama_asset}
                                                        </strong>
                                                    </li>

                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <span>Nilai Sisa</span>
                                                        <strong>
                                                            Rp{" "}
                                                            {Number(
                                                                detail?.nilai_sisa || 0
                                                            ).toLocaleString("id-ID")}
                                                        </strong>
                                                    </li>
                                                </ul>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* Disposal */}
                                    <Col xl={6}>
                                        <Card className="custom-card border">
                                            <Card.Header>
                                                <Card.Title>
                                                    <i className="ti ti-trash me-2"></i>
                                                    Detail Disposal
                                                </Card.Title>
                                            </Card.Header>

                                            <Card.Body>
                                                <ul className="list-group">
                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <span>Alasan</span>
                                                        <strong>{detail?.alasan}</strong>
                                                    </li>

                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <span>Metode</span>
                                                        <strong>
                                                            {detail?.metode_penghapusan}
                                                        </strong>
                                                    </li>

                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <span>Status</span>

                                                        <Badge bg="success">
                                                            {detail?.status_disposal}
                                                        </Badge>
                                                    </li>
                                                </ul>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* Timeline */}
                                    <Col xl={12} className="mt-4">
                                        <Card className="custom-card">
                                            <Card.Header>
                                                <Card.Title>
                                                    <i className="ti ti-history me-2"></i>
                                                    Riwayat Pengajuan
                                                </Card.Title>
                                            </Card.Header>

                                            <Card.Body>
                                                <div className="timeline">

                                                    <div className="timeline-item">
                                                        <div className="timeline-point bg-primary"></div>

                                                        <div className="timeline-content">
                                                            <h6>
                                                                Pengajuan Disposal
                                                            </h6>

                                                            <p className="text-muted mb-1">
                                                                {detail?.tanggal_pengajuan}
                                                            </p>

                                                            <small>
                                                                Oleh :
                                                                {" "}
                                                                {detail?.user_pengajuan?.nama}
                                                            </small>
                                                        </div>
                                                    </div>

                                                    {detail?.tanggal_approval && (
                                                        <div className="timeline-item">
                                                            <div className="timeline-point bg-success"></div>

                                                            <div className="timeline-content">
                                                                <h6>Approval</h6>

                                                                <p className="text-muted mb-1">
                                                                    {detail?.tanggal_approval}
                                                                </p>

                                                                <small>
                                                                    Oleh :
                                                                    {" "}
                                                                    {detail?.user_approval?.nama}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* Keterangan */}
                                    <Col xl={12} className="mt-4">
                                        <Card className="custom-card">
                                            <Card.Header>
                                                <Card.Title>
                                                    <i className="ti ti-note me-2"></i>
                                                    Keterangan
                                                </Card.Title>
                                            </Card.Header>

                                            <Card.Body>
                                                {detail?.keterangan || "-"}
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(DetailDisposalAsset), { ssr: false });