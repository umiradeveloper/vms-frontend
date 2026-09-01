import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Button, Divider } from "@mui/material";
import { format } from "date-fns";

const Select = dynamic(() => import("react-select"), { ssr: false });


const CreatePengajuanOvertime = ({ loader, setLoader, openModal, setOpenModal }) => {
    const [dataSubmit, setDataSubmit] = useState({
        tanggal: "",
        jam_mulai: "",
        jam_selesai: "",
        alasan: ""
    })
    const [employee, setEmployee] = useState([]);
    const [levelApproval, setLevelApproval] = useState([]);
    const [rows, setRows] = useState([
        { id_employee_approval: "", level_approval: "" }
    ]);

    const addRow = () => {
        setRows([...rows, { id_employee_approval: "", level_approval: "" }]);
    };
    const removeRow = (index) => {
        const updated = rows.filter((_, i) => i !== index);
        setRows(updated);
    };

    const getLevelApproval = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/Master-employee/get-master-level-approval", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result);
            if (result.status == 200) {
                const levelApprovalArr = [];
                if (result.data.data?.length > 0) {

                    for (const datas of result.data.data) {
                        levelApprovalArr.push({
                            value: datas,
                            label: datas
                        })
                    }

                }
                setLevelApproval(levelApprovalArr);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    const getEmployee = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/HR-Employee/get-employee", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result);
            if (result.status == 200) {
                if (result.data.data?.length > 0) {
                    const dataEmployeeArr = [];
                    for (const datas of result.data.data) {
                        dataEmployeeArr.push({
                            value: datas.id_employee,
                            label: datas.nip + "|" + datas.nama + "|" + datas.jabatan
                        })
                    }
                    setEmployee(dataEmployeeArr);
                }
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    const handleChangeSelect = (index, selectedOption, name) => {
        const updated = [...rows];

        updated[index][name] = selectedOption?.value; // or full object

        setRows(updated);
    };

    const submitPengajuan = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const id_employee_approval = [];
        const level_approval = [];
        const urutan = [];
        for (const datasApproval of rows) {
            id_employee_approval.push(datasApproval.id_employee_approval);
            const splitLevelApproval = datasApproval.level_approval.split("|");
            level_approval.push(splitLevelApproval[1]);
            urutan.push(splitLevelApproval[0]);
        }
        const beforeSubmit = {
            tanggal: dataSubmit.tanggal,
            jam_mulai: dataSubmit.jam_mulai ? dataSubmit.jam_mulai.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : null,
            jam_selesai: dataSubmit.jam_selesai ? dataSubmit.jam_selesai.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : null,
            alasan: dataSubmit.alasan,
            id_employee_approval,
            level_approval,
            urutan
        }
        try {
            const result = await apiConfig.post(apiUrl + "/HR-Overtime/create-pengajuan-overtime", beforeSubmit, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result);
            if (result.status == 200) {
                swalAlert(result.data.message, result.statusText, "success");
                setOpenModal({ ...openModal, open: false })
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
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
        getLevelApproval();
        getEmployee();
    }, [openModal.open])

    return (
        <Modal size="md" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Tambah Pengajuan Overtime</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">

                            {/* <Col xl={12}>
                                <div className="row gy-2 pb-3">
                                <label htmlFor="nama-proyek" className="form-label ">Employee<span style={{ color: "red" }}>*</span> :</label>
                                <Select name="state"  className="basic-multi-select " options={employee} isSearchable
                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Employee" onChange={(e) =>  setDataSubmit({...dataSubmit, id_employee: e.value})}
                                />
                                </div>
                            </Col> */}
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Tanggal<span style={{ color: "red" }}>*</span> :</label>
                                <DatePicker selected={dataSubmit.tanggal} className={`form-control`} id="Tanggal" placeholder="Tanggal" onChange={(date) =>
                                    setDataSubmit({
                                        ...dataSubmit,
                                        tanggal: date ? format(date, "yyyy-MM-dd") : null
                                    })
                                } />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Jam Mulai<span style={{ color: "red" }}>*</span> :</label>
                                <DatePicker
                                    selected={dataSubmit.jam_mulai}
                                    onChange={(time) => {
                                        // const formatted_time = time ? time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : null ;
                                        setDataSubmit({ ...dataSubmit, jam_mulai: time })
                                    }}
                                    className="form-control"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption={"Time"}
                                    dateFormat={"HH:mm"}
                                    placeholderText={"Select a time"}
                                />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Jam Selesai<span style={{ color: "red" }}>*</span> :</label>
                                <DatePicker
                                    selected={dataSubmit.jam_selesai}
                                    onChange={(time) => {
                                        // const formatted_time = time ? time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : null ;
                                        setDataSubmit({ ...dataSubmit, jam_selesai: time })
                                    }}
                                    className="form-control"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption={"Time"}
                                    dateFormat={"HH:mm"}
                                    placeholderText={"Select a time"}
                                />
                            </Col>
                            {/* <Col xl={12}>
                                <div className="row gy-2 pb-3">
                                <label htmlFor="nama-proyek" className="form-label ">Status Absensi<span style={{ color: "red" }}>*</span> :</label>
                                <Select name="state"  className="basic-multi-select " options={statusAbsensi} isSearchable
                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Status Absensi" onChange={(e) =>  setDataSubmit({...dataSubmit, status: e.value})}
                                />
                                </div>
                            </Col> */}
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Alasan :</label>
                                <textarea type="text" value={dataSubmit.alasan} className={`form-control`} id="keterangan" placeholder="Keterangan" rows={3} onChange={(e) => setDataSubmit({ ...dataSubmit, alasan: e.target.value })} />
                            </Col>

                            <Divider className="mb-3 mt-3" />
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Approval: </label>
                                {rows.map((row, i) => (
                                    <div
                                        key={i}
                                        className="d-flex gap-2 align-items-center mb-2"
                                    >
                                        {/* Select */}
                                        {/* <select
                                    className="form-select"
                                    name="category"
                                    value={row.category}
                                    onChange={(e) => handleChange(i, e)}
                                    style={{ maxWidth: "200px" }}
                                >
                                    <option value="">-- Select --</option>
                                    <option value="A">Category A</option>
                                    <option value="B">Category B</option>
                                </select> */}

                                        <Col xl={5}>
                                            {/* <label htmlFor="nama-proyek" className="form-label ">RAPA <span style={{ color: "red" }}>*</span> :</label> */}
                                            {/* <input type="text" className={`form-control`} id="id_rapa" placeholder="Rapa" value={dataBk.id_rapa} onChange={(e) => setDataBk({ ...dataBk, id_rapa: e.target.value })} /> */}
                                            <Select name="id_cost_code" options={employee} className="basic-multi-select " isSearchable
                                                menuPlacement='auto' classNamePrefix="Select2" placeholder="Nama Approval" onChange={(option) => handleChangeSelect(i, option, "id_employee_approval")}
                                            />
                                        </Col>

                                        {/* Input */}
                                        <Col xl={5}>
                                            <Select name="id_cost_code" options={levelApproval} className="basic-multi-select " isSearchable
                                                menuPlacement='auto' classNamePrefix="Select2" placeholder="Level Approval" onChange={(option) => handleChangeSelect(i, option, "level_approval")}
                                            />
                                        </Col>




                                        {/* Remove Button */}
                                        <Col xl={2}>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => removeRow(i)}
                                                disabled={rows.length === 1}
                                            >
                                                ✕
                                            </button>
                                        </Col>
                                    </div>
                                ))}
                            </Col>
                            <div className=" d-flex gap-2">
                                <button className="btn btn-primary" onClick={addRow}>
                                    Tambah Approval
                                </button>
                                {/* <button className="btn btn-danger" onClick={() => setOpenModal({...openModal, open: false})}>
                                    Close
                                </button> */}
                            </div>

                        </div>
                    </Col>

                </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex gap-2">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={submitPengajuan} >Tambah</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(CreatePengajuanOvertime), { ssr: false });