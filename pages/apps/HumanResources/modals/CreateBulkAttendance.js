import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Select = dynamic(() => import("react-select"), { ssr: false });


const CreateBulkAttendance = ({ openModal, setOpenModal, loader, setLoader, reload, setReload }) => {
    const [employee, setEmployee] = useState([]);
    const [statusAbsensi, setStatusAbsensi] = useState([]);
    const now = new Date();

    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const [dataSubmit, setDataSubmit] = useState({
        id_employee: [],
        // tanggal:"",
        month: month.toString(),
        year: year.toString(),
        jam_masuk: "",
        jam_keluar: "",
        status: "",
        keterangan: ""
    })

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
    const getStatusAbsensi = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/Master-employee/get-master-status-absensi", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result);
            if (result.status == 200) {
                if (result.data.data?.length > 0) {
                    const dataAbsensiArr = [];
                    for (const datas of result.data.data) {
                        dataAbsensiArr.push({
                            value: datas,
                            label: datas
                        })
                    }
                    setStatusAbsensi(dataAbsensiArr);
                }
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }


    const CreateAbsensiData = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const id_ = [];
        
        for(const emp of dataSubmit.id_employee){
            id_.push(emp.value ?? "");
        }
        const beforeSubmit = {
            id_employee: id_,
            month: dataSubmit.month,
            year: dataSubmit.year,
            jam_masuk: dataSubmit.jam_masuk ? dataSubmit.jam_masuk.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : null,
            jam_keluar: dataSubmit.jam_keluar ? dataSubmit.jam_keluar.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : null,
            status: dataSubmit.status,
            keterangan: dataSubmit.keterangan
        }
        // console.log(beforeSubmit);
        try {
            const result = await apiConfig.post(apiUrl + "/HR-Attendance/generate-attendance-by-employee", beforeSubmit, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result);
            if (result.status == 200) {
                swalAlert(result.data.message, result.statusText, "success");
                setOpenModal({open: false })
                setReload(prev => !prev);
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
        getEmployee()
        getStatusAbsensi()
    }, [openModal.open])
    return (
        <Modal size="md" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Tambah Absensi</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">

                            <Col xl={12}>
                                <div className="row gy-2 pb-3">
                                    <label htmlFor="nama-proyek" className="form-label ">Employee<span style={{ color: "red" }}>*</span> :</label>
                                    <Select isMulti name="employee" options={employee} className="default basic-multi-select custom-multi "
                                        menuPlacement='auto' classNamePrefix="Select2" value={dataSubmit.id_employee} onChange={(selected) => setDataSubmit({...dataSubmit, id_employee: selected})}
                                    />
                                </div>
                            </Col>
                            <Col xl={12} className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Bulan
                                </Form.Label>

                                <Form.Select
                                    value={dataSubmit.month}
                                    onChange={(e) => {
                                        setDataSubmit({
                                            ...dataSubmit,
                                            month: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="1">Januari</option>
                                    <option value="2">Februari</option>
                                    <option value="3">Maret</option>
                                    <option value="4">April</option>
                                    <option value="5">Mei</option>
                                    <option value="6">Juni</option>
                                    <option value="7">Juli</option>
                                    <option value="8">Agustus</option>
                                    <option value="9">September</option>
                                    <option value="10">Oktober</option>
                                    <option value="11">November</option>
                                    <option value="12">Desember</option>
                                </Form.Select>
                            </Col>

                            {/* Filter Tahun */}
                            <Col xl={12}>
                                <Form.Label className="fw-semibold">
                                    Tahun
                                </Form.Label>

                                <Form.Select
                                    value={dataSubmit.year}
                                    onChange={(e) => {
                                        setDataSubmit({
                                            ...dataSubmit,
                                            year: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                </Form.Select>
                            </Col>
                           
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Jam Masuk<span style={{ color: "red" }}>*</span> :</label>
                                <DatePicker
                                    selected={dataSubmit.jam_masuk}
                                    onChange={(time) => {
                                        const formatted_time = time ? time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : null;
                                        setDataSubmit({ ...dataSubmit, jam_masuk: time })
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
                                <label htmlFor="nama-proyek" className="form-label ">Jam Keluar<span style={{ color: "red" }}>*</span> :</label>
                                <DatePicker
                                    selected={dataSubmit.jam_keluar}
                                    onChange={(time) => {
                                        const formatted_time = time ? time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : null;
                                        setDataSubmit({ ...dataSubmit, jam_keluar: time })
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
                                <div className="row gy-2 pb-3">
                                    <label htmlFor="nama-proyek" className="form-label ">Status Absensi<span style={{ color: "red" }}>*</span> :</label>
                                    <Select name="state" className="basic-multi-select " options={statusAbsensi} isSearchable
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Status Absensi" onChange={(e) => setDataSubmit({ ...dataSubmit, status: e.value })}
                                    />
                                </div>
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Keterangan :</label>
                                <textarea type="text" value={dataSubmit.keterangan} className={`form-control`} id="keterangan" placeholder="Keterangan" rows={3} onChange={(e) => setDataSubmit({ ...dataSubmit, keterangan: e.target.value })} />
                            </Col>



                        </div>
                    </Col>

                </Row>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={CreateAbsensiData}>Tambah</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    );
}

export default dynamic(() => Promise.resolve(CreateBulkAttendance), { ssr: false });