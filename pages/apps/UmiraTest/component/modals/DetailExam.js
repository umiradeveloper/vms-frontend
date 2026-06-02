import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";

const DetailExam = ({ openModal, setOpenModal }) => {
    const [exam, setExam] = useState({});

    // const exam = {
    //     id_exam: "7e8daa7d-57d7-4bba-96c2-4fb3e6f61870",
    //     kode_exam: "Test",
    //     type_exam: "Pre-Test",
    //     title_exam: "Test",
    //     desc_exam: "test",
    //     date_exam: "2026-05-21T13:27:00",
    //     duration_exam: 90,
    //     status_exam: 1,
    //     limit_score_exam: 100,
    //     examQuestion: [
    //         {
    //             id_question_exam: "f1aa4c0f-00e2-428e-aa92-6f7589b98be0",
    //             question: "Pertanyaan a",
    //             question_type: "multiple_choice",
    //             score: null,
    //             correct_answer: "A",
    //             question_option:
    //                 '[{"label":"A","value":"a"},{"label":"B","value":"b"},{"label":"C","value":"c"},{"label":"D","value":"d"}]',
    //         },
    //     ],
    // };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("id-ID", {
            dateStyle: "full",
            timeStyle: "short",
        });
    };

    const getStatusBadge = (status) => {
        return status === 1 ? (
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                Active
            </span>
        ) : (
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-700 border border-red-200">
                Inactive
            </span>
        );
    };

    useEffect(() => {
        if (openModal.open) {
            // console.log(openModal)
            setExam(openModal.datas);
        }
    }, [openModal.open])

    return (
        <Modal size="xl" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }} enforceFocus={false}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Detail Transaksi</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xl={12}>
                        <div className="bg-white rounded-4 shadow-sm border border-slate-200 overflow-hidden">



                            {/* CONTENT */}
                            <div className="p-4 p-md-5">
                                <div className="row gy-4">

                                    {/* KODE TEST */}
                                    <Col xl={6}>
                                        <div className="bg-light rounded-4 p-4 border h-100">
                                            <div className="d-flex align-items-center gap-3 mb-3">
                                                <div
                                                    className="d-flex align-items-center justify-content-center rounded-4 bg-primary bg-opacity-10 text-primary"
                                                    style={{
                                                        width: "56px",
                                                        height: "56px",
                                                        fontSize: "24px",
                                                    }}
                                                >
                                                    <i className="ri-barcode-box-line"></i>
                                                </div>

                                                <div>
                                                    <p className="text-muted small mb-1">
                                                        Kode Test
                                                    </p>

                                                    <h5 className="fw-bold mb-0">
                                                        {exam.kode_exam}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    {/* TIPE TEST */}
                                    <Col xl={6}>
                                        <div className="bg-light rounded-4 p-4 border h-100">
                                            <div className="d-flex align-items-center gap-3 mb-3">
                                                <div
                                                    className="d-flex align-items-center justify-content-center rounded-4 bg-info bg-opacity-10 text-info"
                                                    style={{
                                                        width: "56px",
                                                        height: "56px",
                                                        fontSize: "24px",
                                                    }}
                                                >
                                                    <i className="ri-bookmark-line"></i>
                                                </div>

                                                <div>
                                                    <p className="text-muted small mb-1">
                                                        Tipe Test
                                                    </p>

                                                    <h5 className="fw-bold mb-0">
                                                        {exam.type_exam}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    {/* DURASI */}
                                    <Col xl={6}>
                                        <div className="bg-light rounded-4 p-4 border h-100">
                                            <div className="d-flex align-items-center gap-3 mb-3">
                                                <div
                                                    className="d-flex align-items-center justify-content-center rounded-4 bg-warning bg-opacity-10 text-warning"
                                                    style={{
                                                        width: "56px",
                                                        height: "56px",
                                                        fontSize: "24px",
                                                    }}
                                                >
                                                    <i className="ri-time-line"></i>
                                                </div>

                                                <div>
                                                    <p className="text-muted small mb-1">
                                                        Durasi Test
                                                    </p>

                                                    <h5 className="fw-bold mb-0">
                                                        {exam.duration_exam} Menit
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    {/* LIMIT SCORE */}
                                    <Col xl={6}>
                                        <div className="bg-light rounded-4 p-4 border h-100">
                                            <div className="d-flex align-items-center gap-3 mb-3">
                                                <div
                                                    className="d-flex align-items-center justify-content-center rounded-4 bg-success bg-opacity-10 text-success"
                                                    style={{
                                                        width: "56px",
                                                        height: "56px",
                                                        fontSize: "24px",
                                                    }}
                                                >
                                                    <i className="ri-award-line"></i>
                                                </div>

                                                <div>
                                                    <p className="text-muted small mb-1">
                                                        Limit Score
                                                    </p>

                                                    <h5 className="fw-bold mb-0">
                                                        {exam.limit_score_exam}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    {/* JUDUL */}
                                    <Col xl={12}>
                                        <div className="bg-light rounded-4 p-4 border">
                                            <div className="d-flex align-items-start gap-3">

                                                <div
                                                    className="d-flex align-items-center justify-content-center rounded-4 bg-primary bg-opacity-10 text-primary"
                                                    style={{
                                                        width: "56px",
                                                        height: "56px",
                                                        fontSize: "24px",
                                                    }}
                                                >
                                                    <i className="ri-edit-box-line"></i>
                                                </div>

                                                <div>
                                                    <p className="text-muted small mb-2">
                                                        Judul Test
                                                    </p>

                                                    <h4 className="fw-bold mb-0">
                                                        {exam.title_exam}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    {/* DESKRIPSI */}
                                    <Col xl={12}>
                                        <div className="bg-light rounded-4 p-4 border">
                                            <div className="d-flex align-items-start gap-3">

                                                <div
                                                    className="d-flex align-items-center justify-content-center rounded-4 bg-secondary bg-opacity-10 text-secondary"
                                                    style={{
                                                        width: "56px",
                                                        height: "56px",
                                                        fontSize: "24px",
                                                    }}
                                                >
                                                    <i className="ri-align-left"></i>
                                                </div>

                                                <div>
                                                    <p className="text-muted small mb-2">
                                                        Deskripsi Test
                                                    </p>

                                                    <p className="mb-0 text-dark fs-6">
                                                        {exam.desc_exam}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    {/* STATUS */}
                                    <Col xl={6}>
                                        <div className="bg-light rounded-4 p-4 border h-100">
                                            <div className="d-flex align-items-center gap-3">

                                                <div
                                                    className={`d-flex align-items-center justify-content-center rounded-4 ${exam.status_exam === 1
                                                        ? "bg-success bg-opacity-10 text-success"
                                                        : "bg-danger bg-opacity-10 text-danger"
                                                        }`}
                                                    style={{
                                                        width: "56px",
                                                        height: "56px",
                                                        fontSize: "24px",
                                                    }}
                                                >
                                                    <i className="ri-shield-check-line"></i>
                                                </div>

                                                <div>
                                                    <p className="text-muted small mb-1">
                                                        Status Exam
                                                    </p>

                                                    <h5 className="fw-bold mb-0">
                                                        {exam.status_exam === 1
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    {/* TANGGAL */}
                                    <Col xl={6}>
                                        <div className="bg-light rounded-4 p-4 border h-100">
                                            <div className="d-flex align-items-center gap-3">

                                                <div
                                                    className="d-flex align-items-center justify-content-center rounded-4 bg-danger bg-opacity-10 text-danger"
                                                    style={{
                                                        width: "56px",
                                                        height: "56px",
                                                        fontSize: "24px",
                                                    }}
                                                >
                                                    <i className="ri-calendar-event-line"></i>
                                                </div>

                                                <div>
                                                    <p className="text-muted small mb-1">
                                                        Tanggal Test
                                                    </p>

                                                    <h6 className="fw-bold mb-0">
                                                        {formatDate(exam.date_exam)}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                            {/* ROLE ACCESS */}
                            <div className="bg-light rounded-4 p-4 border p-md-5">

                                    {/* HEADER */}
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                                        <div className="d-flex align-items-center gap-3">

                                            <div
                                                className="d-flex align-items-center justify-content-center rounded-4 bg-indigo bg-opacity-10 text-primary"
                                                style={{
                                                    width: "56px",
                                                    height: "56px",
                                                    fontSize: "24px",
                                                    background: "rgba(99,102,241,0.12)",
                                                    color: "#4f46e5",
                                                }}
                                            >
                                                <i className="ri-shield-user-line"></i>
                                            </div>

                                            <div>
                                                <p className="text-muted small mb-1">
                                                    Role Access
                                                </p>

                                                <h5 className="fw-bold mb-0">
                                                    Allowed Roles
                                                </h5>
                                            </div>
                                        </div>

                                        <div
                                            className="px-3 py-2 rounded-pill"
                                            style={{
                                                background: "rgba(79,70,229,0.08)",
                                                color: "#4f46e5",
                                                fontWeight: 600,
                                                fontSize: "13px",
                                            }}
                                        >
                                            {exam.examAccess?.length || 0} Role Access
                                        </div>
                                    </div>

                                    {/* ROLE LIST */}
                                    <div className="row g-3">
                                        {exam.examAccess?.map((item, index) => (
                                            <div className="col-md-6 col-xl-4" key={index}>
                                                <div
                                                    className="rounded-4 border p-4 h-100 position-relative overflow-hidden"
                                                    style={{
                                                        background:
                                                            "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                                                        transition: "0.3s",
                                                    }}
                                                >
                                                    {/* GLOW */}
                                                    <div
                                                        className="position-absolute top-0 end-0"
                                                        style={{
                                                            width: "120px",
                                                            height: "120px",
                                                            background:
                                                                "radial-gradient(circle, rgba(79,70,229,0.12) 0%, rgba(79,70,229,0) 70%)",
                                                        }}
                                                    ></div>

                                                    <div className="position-relative">
                                                        <div className="d-flex align-items-center gap-3 mb-3">

                                                            <div
                                                                className="d-flex align-items-center justify-content-center rounded-4"
                                                                style={{
                                                                    width: "52px",
                                                                    height: "52px",
                                                                    background:
                                                                        "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
                                                                    color: "white",
                                                                    fontSize: "22px",
                                                                }}
                                                            >
                                                                <i className="ri-user-star-line"></i>
                                                            </div>

                                                            <div>
                                                                <div
                                                                    className="text-muted"
                                                                    style={{
                                                                        fontSize: "12px",
                                                                        fontWeight: 600,
                                                                        letterSpacing: "0.5px",
                                                                    }}
                                                                >
                                                                    ROLE
                                                                </div>

                                                                <div className="fw-bold text-dark fs-5">
                                                                    {item.role?.nama_role}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex align-items-center justify-content-between mt-3">

                                                            <div>
                                                                <div
                                                                    className="text-muted"
                                                                    style={{
                                                                        fontSize: "11px",
                                                                    }}
                                                                >
                                                                    KODE ROLE
                                                                </div>

                                                                <div
                                                                    className="fw-semibold"
                                                                    style={{
                                                                        color: "#4f46e5",
                                                                    }}
                                                                >
                                                                    {item.role?.kode_role}
                                                                </div>
                                                            </div>

                                                            <span
                                                                className="badge rounded-pill"
                                                                style={{
                                                                    background:
                                                                        "rgba(34,197,94,0.12)",
                                                                    color: "#16a34a",
                                                                    padding: "8px 14px",
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                Active
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* EMPTY */}
                                    {(!exam.examAccess ||
                                        exam.examAccess.length === 0) && (
                                            <div
                                                className="text-center py-5 rounded-4 border border-dashed"
                                                style={{
                                                    background: "#fff",
                                                }}
                                            >
                                                <div
                                                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                                                    style={{
                                                        width: "72px",
                                                        height: "72px",
                                                        background: "rgba(148,163,184,0.12)",
                                                        color: "#94a3b8",
                                                        fontSize: "32px",
                                                    }}
                                                >
                                                    <i className="ri-user-unfollow-line"></i>
                                                </div>

                                                <h6 className="fw-bold text-muted">
                                                    No Role Access
                                                </h6>

                                                <p className="text-muted small mb-0">
                                                    This exam has no assigned role access
                                                </p>
                                            </div>
                                        )}
                            </div>

                            <div className="mt-4">
                                {exam.examQuestion?.map((item, index) => {
                                    const options = JSON.parse(
                                        item.question_option || "[]"
                                    );

                                    return (
                                        <div
                                            key={item.id_question_exam}
                                            className="border-0 rounded-4 shadow-sm p-4 mb-4 bg-white"
                                            style={{
                                                borderLeft: "6px solid #0d6efd",
                                            }}
                                        >
                                            {/* HEADER */}
                                            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4">
                                                <div>
                                                    <div
                                                        className="badge rounded-pill mb-2"
                                                        style={{
                                                            background:
                                                                item.question_type ===
                                                                    "multiple_choice"
                                                                    ? "rgba(13,110,253,0.1)"
                                                                    : "rgba(25,135,84,0.1)",
                                                            color:
                                                                item.question_type ===
                                                                    "multiple_choice"
                                                                    ? "#0d6efd"
                                                                    : "#198754",
                                                            padding:
                                                                "8px 14px",
                                                            fontSize: "12px",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {item.question_type ===
                                                            "multiple_choice"
                                                            ? "Multiple Choice"
                                                            : "Input Text"}
                                                    </div>

                                                    <h5 className="fw-bold mb-0 text-dark">
                                                        Soal #{index + 1}
                                                    </h5>
                                                </div>

                                                <div
                                                    className="px-3 py-2 rounded-3"
                                                    style={{
                                                        background:
                                                            "linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)",
                                                        color: "white",
                                                        minWidth: "90px",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            fontSize: "12px",
                                                            opacity: 0.8,
                                                        }}
                                                    >
                                                        Score
                                                    </div>

                                                    <div className="fw-bold fs-5">
                                                        {item.score || 0}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* QUESTION */}
                                            <div
                                                className="p-4 rounded-4 mb-4"
                                                style={{
                                                    background:
                                                        "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
                                                }}
                                            >
                                                <div className="d-flex align-items-start gap-3">
                                                    <div
                                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                                        style={{
                                                            width: "42px",
                                                            height: "42px",
                                                            background:
                                                                "linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)",
                                                            color: "white",
                                                            fontWeight: 700,
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        ?
                                                    </div>

                                                    <div>
                                                        <div
                                                            className="text-muted mb-1"
                                                            style={{
                                                                fontSize: "13px",
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            PERTANYAAN
                                                        </div>

                                                        <div
                                                            className="fw-semibold text-dark"
                                                            style={{
                                                                fontSize: "17px",
                                                                lineHeight: 1.7,
                                                            }}
                                                        >
                                                            {item.question}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* OPTIONS */}
                                            {item.question_type ===
                                                "multiple_choice" && (
                                                    <div className="row g-3">
                                                        {options.map(
                                                            (option, optionIndex) => {
                                                                const isCorrect =
                                                                    item.correct_answer ===
                                                                    option.label;

                                                                return (
                                                                    <div
                                                                        className="col-md-6"
                                                                        key={optionIndex}
                                                                    >
                                                                        <div
                                                                            className={`p-3 rounded-4 border position-relative h-100 ${isCorrect
                                                                                ? "border-success"
                                                                                : "border-light"
                                                                                }`}
                                                                            style={{
                                                                                background:
                                                                                    isCorrect
                                                                                        ? "rgba(25,135,84,0.08)"
                                                                                        : "#f8fafc",
                                                                                transition:
                                                                                    "0.3s",
                                                                            }}
                                                                        >
                                                                            {isCorrect && (
                                                                                <div
                                                                                    className="position-absolute top-0 end-0 translate-middle"
                                                                                >
                                                                                    <div
                                                                                        className="rounded-circle d-flex align-items-center justify-content-center shadow"
                                                                                        style={{
                                                                                            width: "30px",
                                                                                            height: "30px",
                                                                                            background:
                                                                                                "#198754",
                                                                                            color: "white",
                                                                                        }}
                                                                                    >
                                                                                        <i className="ri-check-line"></i>
                                                                                    </div>
                                                                                </div>
                                                                            )}

                                                                            <div className="d-flex align-items-start gap-3">
                                                                                <div
                                                                                    className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                                                                    style={{
                                                                                        width: "42px",
                                                                                        height: "42px",
                                                                                        background:
                                                                                            isCorrect
                                                                                                ? "#198754"
                                                                                                : "#e9ecef",
                                                                                        color:
                                                                                            isCorrect
                                                                                                ? "white"
                                                                                                : "#495057",
                                                                                        flexShrink: 0,
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        option.label
                                                                                    }
                                                                                </div>

                                                                                <div className="pt-1">
                                                                                    <div
                                                                                        className="fw-semibold"
                                                                                        style={{
                                                                                            color:
                                                                                                "#212529",
                                                                                            lineHeight:
                                                                                                1.6,
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            option.value
                                                                                        }
                                                                                    </div>

                                                                                    {isCorrect && (
                                                                                        <div className="mt-2">
                                                                                            <span className="badge bg-success-subtle text-success border border-success-subtle">
                                                                                                Jawaban
                                                                                                Benar
                                                                                            </span>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                )}

                                            {/* INPUT ANSWER */}
                                            {item.question_type ===
                                                "input" && (
                                                    <div
                                                        className="p-4 rounded-4 border border-success-subtle"
                                                        style={{
                                                            background:
                                                                "rgba(25,135,84,0.08)",
                                                        }}
                                                    >
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div
                                                                className="rounded-circle d-flex align-items-center justify-content-center"
                                                                style={{
                                                                    width: "48px",
                                                                    height: "48px",
                                                                    background:
                                                                        "#198754",
                                                                    color: "white",
                                                                }}
                                                            >
                                                                <i className="ri-check-line fs-5"></i>
                                                            </div>

                                                            <div>
                                                                <div className="text-success fw-semibold mb-1">
                                                                    Jawaban Benar
                                                                </div>

                                                                <div className="fw-bold text-dark">
                                                                    {
                                                                        item.correct_answer
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer className="d-flex gap-2">

                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>

    );
}

export default dynamic(() => Promise.resolve(DetailExam), { ssr: false });

