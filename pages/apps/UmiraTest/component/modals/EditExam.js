import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import { Col, Form, Modal, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });


const EditExam = ({ openModal, setOpenModal, loader, setLoader, reload, setReload }) => {
    const [role, setRole] = useState([]);
    const [exam, setExam] = useState({
        id_exam: "",
        kode_exam: "",
        type_exam: "",
        duration_exam: 0,
        title_exam: "",
        desc_exam: "",
        date_exam: "",
        limit_score_exam: 0,
        status_exam: "",
        role_access: []
    })
    const [questions, setQuestions] = useState([
        {
            type: "multiple_choice",
            question: "",
            options: [
                { label: "A", value: "" },
                { label: "B", value: "" },
                { label: "C", value: "" },
                { label: "D", value: "" }
            ],
            answer: "",
            score: ""
        }
    ]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                type: "multiple_choice",
                question: "",
                options: [
                    { label: "A", value: "" },
                    { label: "B", value: "" },
                    { label: "C", value: "" },
                    { label: "D", value: "" }
                ],
                answer: "",
                score: ""
            }
        ]);
    };


    const handleTypeChange = (
        questionIndex,
        value
    ) => {
        const updated = [...questions];

        updated[questionIndex].type = value;

        if (value === "input") {
            updated[questionIndex].options = [];
        } else {
            updated[questionIndex].options = [
                { label: "A", value: "" },
                { label: "B", value: "" },
                { label: "C", value: "" },
                { label: "D", value: "" }
            ];
        }

        updated[questionIndex].answer = "";

        setQuestions(updated);
    };
    const removeQuestion = (index) => {
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
    };

    const handleQuestionChange = (
        index,
        value
    ) => {
        const updated = [...questions];
        updated[index].question = value;
        setQuestions(updated);
    };

    const handleOptionChange = (
        questionIndex,
        optionIndex,
        value
    ) => {
        const updated = [...questions];

        updated[questionIndex].options[
            optionIndex
        ].value = value;

        setQuestions(updated);
    };

    const handleAnswerChange = (
        questionIndex,
        value
    ) => {
        const updated = [...questions];

        updated[questionIndex].answer = value;

        setQuestions(updated);
    };

    const handleScoreChange = (
        questionIndex,
        value
    ) => {
        const updated = [...questions];

        updated[questionIndex].score = value;

        setQuestions(updated);
    };

    const HandleSubmit = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const question = [];
        const question_type = [];
        const score = [];
        const correct_answer = [];
        const question_option = [];
        for (const quest of questions) {
            question.push(quest.question);
            question_type.push(quest.type);
            score.push(quest.score);
            correct_answer.push(quest.answer);
            question_option.push(JSON.stringify(quest.options));
        }
        const fm = {
            ...exam,
            question,
            question_type,
            score,
            correct_answer,
            question_option
        }
        // console.log(fm)
        try {
            const result = await apiConfig.post(apiUrl + "/UmiraTest/edit-exam", fm, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            // console.log(result);
            if (result.status == 200) {
                setReload(prev => !prev);
                swalAlert(result.data.message, result.statusText, "success");

                setOpenModal({ open: false });
                //     // setFormTransaksi(result.data?.data);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }

    }
     const getRoleAsync = async () => {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                setLoader(true);
                try {
                    const result = await apiConfig.get(apiUrl + "/master/get-role", {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    if(result.status == 200){
                        const arrRole = [];
                        if(result.data.data.length > 0){
                            for(const res of result.data.data){
                                arrRole.push({
                                    value: res.id_role,
                                    label: res.nama_role
                                })
                            }
                        }
                        setRole(arrRole);
                    }
                }catch(error){
                    console.log(error);
                }finally{
                    setLoader(false);
                }
        }
        

    const swalAlert = (message, title, icon) => {
        let timerInterval;

        Swal.fire({
            title: title,
            html: message,
            icon: icon,
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
    }


    useEffect(() => {
        getRoleAsync();
        if (openModal.open && openModal.data) {

            const data = openModal.data;
            console.log(data)

            // EXAM
            setExam({
                id_exam: data.id_exam || "",
                kode_exam: data.kode_exam || "",
                type_exam: data.type_exam || "",
                title_exam: data.title_exam || "",
                desc_exam: data.desc_exam || "",
                date_exam: data.date_exam
                    ? data.date_exam.replace("T", " ")
                    : "",
                duration_exam: data.duration_exam || 0,
                status_exam: String(data.status_exam || ""),
                limit_score_exam:
                    data.limit_score_exam || 0,
                role_access: data.examAccess
        ?.map(v => v.role?.id_role)
        ?.filter(Boolean) || []
            });

            // QUESTIONS
            if (
                data.examQuestion &&
                data.examQuestion.length > 0
            ) {

                const mappedQuestions =
                    data.examQuestion.map((q) => ({
                        id_question_exam:
                            q.id_question_exam || "",

                        type:
                            q.question_type ||
                            "multiple_choice",

                        question:
                            q.question || "",

                        options:
                            q.question_option
                                ? JSON.parse(
                                    q.question_option
                                )
                                : [],

                        answer:
                            q.correct_answer || "",

                        score: q.score || 0,
                    }));

                setQuestions(mappedQuestions);

            } else {

                setQuestions([
                    {
                        type: "multiple_choice",
                        question: "",
                        options: [
                            {
                                label: "A",
                                value: "",
                            },
                            {
                                label: "B",
                                value: "",
                            },
                            {
                                label: "C",
                                value: "",
                            },
                            {
                                label: "D",
                                value: "",
                            },
                        ],
                        answer: "",
                        score: "",
                    },
                ]);
            }
        }
    }, [
        openModal.open
    ])
    return (
        <Modal size="xl" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Exam</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xl={12} className="rounded-3">

                        <div className="row gy-3 pb-3">

                            <Col xl={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Kode Test
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        placeholder="Masukkan kode test"
                                        value={exam.kode_exam}
                                        onChange={(e) => setExam({ ...exam, kode_exam: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Tipe Test
                                    </Form.Label>

                                    <Form.Select
                                        value={exam.type_exam}
                                        onChange={(e) =>
                                            setExam({ ...exam, type_exam: e.target.value })
                                        }
                                    >
                                        <option value="Post-Test">
                                            Post-Test
                                        </option>

                                        <option value="Pre-Test">
                                            Pre-Test
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col xl={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Durasi Test
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        placeholder="90 Menit"
                                        value={exam.duration_exam}
                                        onChange={(e) => setExam({ ...exam, duration_exam: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Judul Test
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        placeholder="Judul Test"
                                        value={exam.title_exam}
                                        onChange={(e) => setExam({ ...exam, title_exam: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Deskripsi Test
                                    </Form.Label>

                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Deskripsi Test"
                                        value={exam.desc_exam}
                                        onChange={(e) => setExam({ ...exam, desc_exam: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xl={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Limit Score
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        placeholder="Limit Score"
                                        value={exam.limit_score_exam}
                                        onChange={(e) => setExam({ ...exam, limit_score_exam: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xl={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Status Exam
                                    </Form.Label>

                                    <Form.Select
                                        value={exam.status_exam}
                                        onChange={(e) =>
                                            setExam({ ...exam, status_exam: e.target.value })
                                        }
                                    >
                                        <option value="">
                                            Pilih Status Exam
                                        </option>
                                        <option value="1">
                                            Active
                                        </option>

                                        <option value="0">
                                            Non Active
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col xl={12}>
                                <label className="form-label">
                                    Tanggal Test
                                </label>

                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        dateFormat:
                                            "Y-m-d H:i:S",
                                        enableTime: true,
                                        time_24hr: true,
                                    }}
                                    value={exam.date_exam}
                                    placeholder="Tanggal Test"
                                    onChange={(val, valStr) => setExam({ ...exam, date_exam: valStr })}
                                />
                            </Col>
                            <Col xl={12}>
                                <label className="form-label">
                                    Pilih Distribusi Role <span style={{ color: "red" }}>*</span> :
                                </label>

                                <Select
                                    options={role}
                                    isMulti
                                    isSearchable
                                    placeholder="Pilih Role"
                                    classNamePrefix="Select2"
                                    value={role.filter((item) =>
                                        exam.role_access?.includes(item.value)
                                    )}
                                    onChange={(selected) => {
                                        const roleDistribusiArr = selected
                                            ? selected.map(item => item.value)
                                            : [];
                                        setExam({
                                            ...exam,
                                            role_access: roleDistribusiArr
                                        });
                                    }}
                                />

                            </Col>

                            {/* QUESTIONS */}
                            <Col xl={12} className="mt-4">

                                <div className="d-flex justify-content-between align-items-center mb-3">

                                    <h5 className="fw-bold mb-0">
                                        Daftar Soal
                                    </h5>

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={addQuestion}
                                    >
                                        + Tambah Soal
                                    </button>
                                </div>

                                {questions.map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className="border rounded-4 p-4 mb-4 shadow-sm bg-light"
                                        >
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h6 className="fw-bold mb-0">
                                                    Soal #{index + 1}
                                                </h6>

                                                {questions.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            removeQuestion(index)
                                                        }
                                                    >
                                                        Hapus
                                                    </button>
                                                )}
                                            </div>

                                            {/* TYPE */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Tipe Soal
                                                </Form.Label>

                                                <Form.Select
                                                    value={item.type}
                                                    onChange={(e) =>
                                                        handleTypeChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="multiple_choice">
                                                        Multiple Choice
                                                    </option>

                                                    <option value="input">
                                                        Input Text
                                                    </option>
                                                </Form.Select>
                                            </Form.Group>

                                            {/* QUESTION */}
                                            <Form.Group className="mb-4">
                                                <Form.Label>
                                                    Pertanyaan
                                                </Form.Label>

                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Masukkan pertanyaan"
                                                    value={item.question}
                                                    onChange={(e) =>
                                                        handleQuestionChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>

                                            {/* MULTIPLE CHOICE */}
                                            {item.type ===
                                                "multiple_choice" && (
                                                    <>
                                                        <Row>
                                                            {item.options.map(
                                                                (option, optionIndex) => (
                                                                    <Col
                                                                        xl={6}
                                                                        key={optionIndex}
                                                                    >
                                                                        <Form.Group className="mb-3">
                                                                            <Form.Label>
                                                                                Pilihan {option.label}
                                                                            </Form.Label>

                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder={`Pilihan ${option.label}`}
                                                                                value={option.value}
                                                                                onChange={(e) =>
                                                                                    handleOptionChange(
                                                                                        index,
                                                                                        optionIndex,
                                                                                        e.target.value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                )
                                                            )}
                                                        </Row>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label>
                                                                Jawaban
                                                            </Form.Label>

                                                            <Form.Select
                                                                value={item.answer}
                                                                onChange={(e) =>
                                                                    handleAnswerChange(
                                                                        index,
                                                                        e.target.value
                                                                    )
                                                                }
                                                            >
                                                                <option value="">
                                                                    Pilih Jawaban
                                                                </option>

                                                                {item.options.map(
                                                                    (option, optionIndex) => (
                                                                        <option
                                                                            key={optionIndex}
                                                                            value={option.label}
                                                                        >
                                                                            {option.label} - {option.value}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </Form.Select>
                                                        </Form.Group>


                                                    </>
                                                )}

                                            {/* INPUT QUESTION */}
                                            {item.type === "input" && (
                                                <Form.Group className="mt-2">
                                                    <Form.Label>
                                                        Jawaban Benar
                                                    </Form.Label>

                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Masukkan jawaban benar"
                                                        value={item.answer}
                                                        onChange={(e) =>
                                                            handleAnswerChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </Form.Group>
                                            )}

                                            {/* SCORE */}
                                            <Form.Group className="mt-4">
                                                <Form.Label>
                                                    Score
                                                </Form.Label>

                                                <Form.Control
                                                    type="number"
                                                    placeholder="Score Per Soal"
                                                    value={item.score}
                                                    onChange={(e) =>
                                                        handleScoreChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                        </div>
                                    )
                                )}
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex gap-2">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={HandleSubmit} >Submit</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(EditExam), { ssr: false });