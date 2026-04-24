
import { Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";


const DetailOvertime = ({ openModal, setOpenModal, loader, setLoader }) => {

    const [datasets, setDatasets] = useState({
        tanggal: "",
        jam_mulai: "",
        jam_selesai: "",
        alasan: "",
        durasi: "",
        approval: []
    })
    useEffect(() => {
        if (openModal.open) {
            console.log(openModal);
            setDatasets({
                tanggal: openModal.data?.tanggal,
                jam_mulai: openModal.data?.jam_mulai,
                jam_selesai: openModal.data?.jam_selesai,
                alasan: openModal.data?.alasan,
                durasi: openModal.data?.durasi + " Menit",
                approval: openModal.data?.approval
            })
        }

    }, [openModal.open])

    return(
         <Modal size="md" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Detail Pengajuan Overtime</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">

                            <Col xl={12}>
                                <Col xl={12}>
                                    <label htmlFor="nama-proyek" className="form-label ">Tanggal :</label>
                                    <span className="form-control">{datasets.tanggal}</span>
                                </Col>
                                <Col xl={12}>
                                    <label htmlFor="nama-proyek" className="form-label ">Jam Mulai :</label>
                                    <span className="form-control">{datasets.jam_mulai}</span>
                                </Col>
                                <Col xl={12}>
                                    <label htmlFor="nama-proyek" className="form-label ">Jam Selesai :</label>
                                    <span className="form-control">{datasets.jam_selesai}</span>
                                </Col>
                                <Col xl={12}>
                                    <label htmlFor="nama-proyek" className="form-label ">Durasi :</label>
                                    <span className="form-control">{datasets.durasi}</span>
                                </Col>
                                <Col xl={12}>
                                    <label htmlFor="nama-proyek" className="form-label ">Keterangan :</label>
                                    <span className="form-control">{datasets.alasan}</span>
                                </Col>


                                {datasets.approval.map((e, i) => {

                                    return (
                                        <>
                                            <Divider className="mt-3 mb-3" key={i} />
                                            <Col xl={12} key={i}>
                                                <label htmlFor="nama-proyek" className="form-label ">Approval {e.level_approval}</label>
                                                <Row>
                                                    <dl className="row mb-0">
                                                        <dt className="col-xl-6">Nama : </dt>
                                                        <dd className="col-xl-6">{e.employee?.user?.username}</dd>
                                                    </dl>
                                                    <dl className="row mb-0">
                                                        <dt className="col-xl-6">Bagian : </dt>
                                                        <dd className="col-xl-6">{e.employee?.kelas}</dd>
                                                    </dl>
                                                    <dl className="row mb-0">
                                                        <dt className="col-xl-6">Status Approval : </dt>
                                                        <dd className={`col-xl-6 ${e.status_approval == "Reject" ? "text-danger" :""}`}>{e.status_approval}</dd>
                                                    </dl>
                                                    <dl className="row mb-0">
                                                        <dt className="col-xl-6">Keterangan : </dt>
                                                        <dd className="col-xl-6"><p style={{
                                                            wordBreak: "break-word",
                                                            whiteSpace: "pre-line"
                                                        }}>{e.keterangan}</p></dd>
                                                    </dl>
                                                </Row>

                                            </Col>
                                        </>
                                    )
                                })}
                                {/* <Col xl={12}>
                                    <label htmlFor="nama-proyek" className="form-label ">Status Absensi<span style={{ color: "red" }}>*</span> :</label>
                                    <span className="form-control">Test</span>
                                </Col> */}
                            </Col>





                        </div>
                    </Col>

                </Row>
            </Modal.Body>
            <Modal.Footer className="">

                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default DetailOvertime;