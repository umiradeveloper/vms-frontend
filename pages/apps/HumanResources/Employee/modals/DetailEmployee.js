import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";

const DetailEmployee = ({ openModal, setOpenModal }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // const [dataUser]
    const [dataUser, setDataUser] = useState();
    const Info = ({ label, value }) => (
        <div key={value} className="d-flex justify-content-between border-bottom py-3">
            <span className="text-secondary">{label}</span>
            <span className="fw-semibold">{value || "-"}</span>
        </div>
    );
    useEffect(() => {
        // console.log(openModal)
        setDataUser(openModal.datas);
    }, [openModal.open])
    return (
        <Modal size="xl" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Detail Employee</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xl={12}>
                        {/* Header */}
                        <div className="bg-light rounded-4 p-4 mb-4">
                            <div className="d-flex align-items-center">

                                <img
                                    src={
                                        dataUser?.user?.id_user
                                            ? `${apiUrl}/mobile/foto-profile?id=${dataUser.user.id_user}`
                                            : "/avatar.png"
                                    }
                                    alt=""
                                    width={90}
                                    height={90}
                                    className="rounded-circle border border-3 border-white shadow"
                                />

                                <div className="ms-4">
                                    <h3 className="fw-bold mb-1">
                                        {dataUser?.nama ?? "-"}
                                    </h3>

                                    <div className="text-secondary mb-2">
                                        {dataUser?.jabatan ?? "-"}
                                    </div>

                                    <span className="badge bg-success rounded-pill px-3 py-2">
                                        Active Employee
                                    </span>
                                </div>

                            </div>
                        </div>

                        <Row>

                            {/* Personal Information */}
                            <Col lg={12}>
                                <div className="border rounded-4 p-4 h-100">

                                    <h5 className="fw-bold mb-4">
                                        👤 Personal Information
                                    </h5>

                                    <Info label="NIK" value={dataUser?.nik ?? "-"} />
                                    <Info label="Email" value={dataUser?.email ?? "-"} />
                                    <Info label="Nomor Handphone" value={dataUser?.no_hp ?? "-"} />
                                    <Info label="Jenis Kelamin" value={dataUser?.jenis_kelamin ?? "-"} />
                                    <Info label="Tanggal Lahir" value={dataUser?.tanggal_lahir ?? "-"} />
                                    <Info label="Tempat Lahit" value={dataUser?.tempat_lahir ?? "-"} />
                                    <Info label="Alamat" value={dataUser?.alamat ?? "-"} />
                                    <Info label="Status" value={dataUser?.marital_status ?? "-"} />
                                    <Info label="Golongan Darah" value={dataUser?.blood_type ?? "-"} />

                                </div>
                            </Col>

                            {/* Employment */}
                            <Col lg={12}>
                                <div className="border rounded-4 p-4 h-100">

                                    <h5 className="fw-bold mb-4">
                                        💼 Employment
                                    </h5>
                                    <Info label="NIP" value={dataUser?.nip ?? "-"} />
                                    <Info label="Departemen" value={dataUser?.departemen ?? "-"} />
                                    <Info label="Posisi / Jabatan" value={dataUser?.jabatan ?? "-"} />
                                    <Info label="Klasifikasi Works" value={dataUser?.klasifikasi_works?.nama_klasifikasi_works} />
                                    <Info label="Tmt (Terhitung masuk Tanggal)" value={dataUser?.tmt ?? "-"} />
                                    <Info label="Status Karyawan" value={dataUser?.status_karyawan ?? "-"} />
                                    <Info label="NPWP" value={dataUser?.npwp ?? "-"} />
                                    <Info label="PTKP Status" value={dataUser?.ptkp_status ?? "-"} />
                                    <Info label="Bank" value={(dataUser?.bank_name+" - "+dataUser?.bank_account) ?? "-"} />
                                    <Info label="BPJS Kesehatan" value={dataUser?.bpjs_kesehatan ?? "-"} />
                                    <Info label="BPJS Ketenagakerjaan" value={dataUser?.bpjs_ketenagakerjaan ?? "-"} />
                                    <Info label="Grade" value={dataUser?.grade ?? "-"} />
                                    <Info label="Kelas" value={dataUser?.kelas ?? "-"} />

                                </div>
                            </Col>

                        </Row>

                        {/* Statistics */}
                        {/* <Row className="mt-4">

                            <Col md={4}>
                                <div className="bg-primary text-white rounded-4 p-4 text-center">
                                    <h2 className="fw-bold">
                                        98%
                                    </h2>
                                    <div>Attendance</div>
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="bg-success text-white rounded-4 p-4 text-center">
                                    <h2 className="fw-bold">
                                        12
                                    </h2>
                                    <div>Leave Balance</div>
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="bg-warning text-dark rounded-4 p-4 text-center">
                                    <h2 className="fw-bold">
                                        4
                                    </h2>
                                    <div>Overtime</div>
                                </div>
                            </Col>

                        </Row> */}
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

export default dynamic(() => Promise.resolve(DetailEmployee), { ssr: false });