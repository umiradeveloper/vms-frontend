import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";

const DetailEmployee = ({ openModal, setOpenModal }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [dataUser, setDataUser] = useState(null);
    const [dataChecker, setDataChecker] = useState(null);
    const [dataSigner, setDataSigner] = useState(null);

    useEffect(() => {
        if (openModal?.open) {
            console.log(openModal);
            setDataUser(openModal?.datas || null);
            setDataChecker(openModal?.checker || null);
            setDataSigner(openModal?.signer || null);
        }
    }, [openModal]);

    const closeModal = () => {
        setOpenModal({
            ...openModal,
            open: false,
        });
    };

    const Info = ({ label, value }) => (
        <div className="d-flex justify-content-between align-items-start border-bottom py-3 gap-3">
            <span className="text-secondary" style={{ minWidth: "40%" }}>
                {label}
            </span>

            <span
                className="fw-semibold text-end"
                style={{
                    wordBreak: "break-word",
                }}
            >
                {value || "-"}
            </span>
        </div>
    );

    const formatDate = (date) => {
        if (!date) return "-";

        try {
            return new Date(date).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        } catch {
            return date;
        }
    };

    const bankInfo = [
        dataUser?.bank_name,
        dataUser?.bank_account,
    ]
        .filter(Boolean)
        .join(" - ");

    const klasifikasiWorks =
        dataUser?.klasifikasi_works?.nama_klasifikasi_works ||
        dataUser?.nama_klasifikasi_works ||
        dataUser?.klasifikasi_works;

    return (
        <Modal
            size="xl"
            show={openModal?.open}
            onHide={closeModal}
            centered
            scrollable
        >
            <Modal.Header closeButton>
                <h6 className="modal-title mb-0">
                    Detail Employee
                </h6>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col xl={12}>

                        {/* =========================
                            HEADER
                        ========================== */}
                        <div className="bg-light rounded-4 p-4 mb-4">
                            <div className="d-flex align-items-center">

                                <img
                                    src={
                                        dataUser?.user?.id_user
                                            ? `${apiUrl}/mobile/foto-profile?id=${dataUser.user.id_user}`
                                            : "/avatar.png"
                                    }
                                    alt="Profile"
                                    width={90}
                                    height={90}
                                    className="rounded-circle border border-3 border-white shadow"
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />

                                <div className="ms-4">
                                    <h3 className="fw-bold mb-1">
                                        {dataUser?.nama || "-"}
                                    </h3>

                                    <div className="text-secondary mb-2">
                                        {dataUser?.jabatan || "-"}
                                    </div>

                                    <span className="badge bg-success rounded-pill px-3 py-2">
                                        {dataUser?.status_karyawan || "Active Employee"}
                                    </span>
                                </div>

                            </div>
                        </div>


                        {/* =========================
                            PERSONAL INFORMATION
                        ========================== */}
                        <div className="border rounded-4 p-4 mb-4">

                            <h5 className="fw-bold mb-4">
                                👤 Personal Information
                            </h5>

                            <Row>

                                <Col lg={6}>
                                    <Info
                                        label="NIK"
                                        value={dataUser?.nik}
                                    />

                                    <Info
                                        label="Nama"
                                        value={dataUser?.nama}
                                    />

                                    <Info
                                        label="Email"
                                        value={dataUser?.email}
                                    />

                                    <Info
                                        label="Nomor Handphone"
                                        value={dataUser?.no_hp}
                                    />

                                    <Info
                                        label="Jenis Kelamin"
                                        value={dataUser?.jenis_kelamin}
                                    />

                                    <Info
                                        label="Status Pernikahan"
                                        value={dataUser?.marital_status}
                                    />

                                </Col>

                                <Col lg={6}>

                                    <Info
                                        label="Tanggal Lahir"
                                        value={formatDate(
                                            dataUser?.tanggal_lahir
                                        )}
                                    />

                                    <Info
                                        label="Tempat Lahir"
                                        value={dataUser?.tempat_lahir}
                                    />

                                    <Info
                                        label="Golongan Darah"
                                        value={dataUser?.blood_type}
                                    />

                                    <Info
                                        label="Agama"
                                        value={dataUser?.religion}
                                    />

                                    <Info
                                        label="Alamat"
                                        value={dataUser?.alamat}
                                    />

                                    <Info
                                        label="Kontak Darurat"
                                        value={dataUser?.emergency_call}
                                    />

                                </Col>

                            </Row>

                        </div>


                        {/* =========================
                            EMPLOYMENT
                        ========================== */}
                        <div className="border rounded-4 p-4 mb-4">

                            <h5 className="fw-bold mb-4">
                                💼 Employment
                            </h5>

                            <Row>

                                <Col lg={6}>

                                    <Info
                                        label="NIP"
                                        value={dataUser?.nip}
                                    />

                                    <Info
                                        label="Departemen"
                                        value={dataUser?.departemen}
                                    />

                                    <Info
                                        label="Posisi / Jabatan"
                                        value={dataUser?.jabatan}
                                    />

                                    <Info
                                        label="Klasifikasi Works"
                                        value={klasifikasiWorks}
                                    />

                                    <Info
                                        label="Grade"
                                        value={dataUser?.grade}
                                    />

                                    <Info
                                        label="Kelas"
                                        value={dataUser?.kelas}
                                    />

                                    <Info
                                        label="Status Karyawan"
                                        value={dataUser?.status_karyawan}
                                    />

                                </Col>

                                <Col lg={6}>

                                    <Info
                                        label="TMT"
                                        value={formatDate(
                                            dataUser?.tmt
                                        )}
                                    />

                                    <Info
                                        label="Tanggal Berakhir"
                                        value={formatDate(
                                            dataUser?.tmt_akhir
                                        )}
                                    />

                                    <Info
                                        label="PKWT Ke"
                                        value={dataUser?.pkwt_ke}
                                    />

                                    <Info
                                        label="Pendidikan Terakhir"
                                        value={dataUser?.pendidikan_terakhir}
                                    />

                                    <Info
                                        label="Project / Lokasi"
                                        value={
                                            dataUser?.project?.project_name ||
                                            dataUser?.project_name ||
                                            dataUser?.nama_project
                                        }
                                    />

                                </Col>

                            </Row>

                        </div>


                        {/* =========================
                            TAX & BPJS
                        ========================== */}
                        <div className="border rounded-4 p-4 mb-4">

                            <h5 className="fw-bold mb-4">
                                🏦 Tax & BPJS
                            </h5>

                            <Row>

                                <Col lg={6}>

                                    <Info
                                        label="NPWP"
                                        value={dataUser?.npwp}
                                    />

                                    <Info
                                        label="PTKP Status"
                                        value={dataUser?.ptkp_status}
                                    />

                                    <Info
                                        label="BPJS Kesehatan"
                                        value={dataUser?.bpjs_kesehatan}
                                    />

                                </Col>

                                <Col lg={6}>

                                    <Info
                                        label="BPJS Ketenagakerjaan"
                                        value={
                                            dataUser?.bpjs_ketenagakerjaan
                                        }
                                    />

                                </Col>

                            </Row>

                        </div>


                        {/* =========================
                            BANK INFORMATION
                        ========================== */}
                        <div className="border rounded-4 p-4 mb-4">

                            <h5 className="fw-bold mb-4">
                                💳 Bank Information
                            </h5>

                            <Row>

                                <Col lg={6}>

                                    <Info
                                        label="Nama Bank"
                                        value={dataUser?.bank_name}
                                    />

                                    <Info
                                        label="Nomor Rekening"
                                        value={dataUser?.bank_account}
                                    />

                                </Col>

                                <Col lg={6}>

                                    <Info
                                        label="Nama Pemilik Rekening"
                                        value={
                                            dataUser?.bank_account_holder
                                        }
                                    />

                                    <Info
                                        label="Bank"
                                        value={bankInfo}
                                    />

                                </Col>

                            </Row>

                        </div>


                        {/* =========================
                            APPROVAL
                        ========================== */}
                        <div className="border rounded-4 p-4">

                            <h5 className="fw-bold mb-4">
                                👥 Approval
                            </h5>

                            <Row>

                                <Col lg={6}>

                                    <Info
                                        label="Approval Line"
                                        value={
                                            dataChecker?.nip+"|"+dataChecker?.nama || ""
                                        }
                                    />

                                </Col>

                                <Col lg={6}>

                                    <Info
                                        label="Manager"
                                        value={
                                            dataSigner?.nip+"|"+dataSigner?.nama || ""
                                        }
                                    />

                                </Col>

                            </Row>

                        </div>

                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="contained"
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                >
                    Close
                </Button>

            </Modal.Footer>

        </Modal>
    );
};

export default dynamic(
    () => Promise.resolve(DetailEmployee),
    { ssr: false }
);

