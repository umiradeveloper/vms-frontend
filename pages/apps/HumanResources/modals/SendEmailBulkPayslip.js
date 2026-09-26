import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Select = dynamic(() => import("react-select"), { ssr: false });


const SendEmailBulkPayslip = ({ openModal, setOpenModal, loader, setLoader, reload, setReload }) => {
    const [employee, setEmployee] = useState([]);
    const [statusAbsensi, setStatusAbsensi] = useState([]);
    const now = new Date();

    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const [dataSubmit, setDataSubmit] = useState({
        id_employee: [],
        tahun:"",
        bulan:"",
        status:""
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
    


    const SendEmailBulk = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const id_ = [];
        
        for(const emp of dataSubmit.id_employee){
            id_.push(emp.value ?? "");
        }
        const nowDate = new Date();
        // console.log(beforeSubmit);
        try {
            const result = await apiConfig.get(apiUrl + "/HR-Payroll/send-payslip-bulk", {
                params:{
                    id_employee: id_,
                    tahun: dataSubmit.tahun ?? nowDate.getFullYear,
                    bulan: dataSubmit.bulan ?? nowDate.getMonth + 1,
                    status: dataSubmit.status ?? ""
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
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

        if(openModal.open){
            setDataSubmit({...dataSubmit, tahun: openModal.tahun ?? "2026", bulan: openModal.bulan ?? ""})
        }
        // getStatusAbsensi()
    }, [openModal.open])
    return (
        <Modal size="md" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Send email payslip</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">

                            <Col xl={12} className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Status
                                </Form.Label>

                                <Form.Select
                                    value={dataSubmit.status}
                                    onChange={(e) => {
                                        setDataSubmit({
                                            ...dataSubmit,
                                            status: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="ALL">ALL</option>
                                    <option value="SELECTED">SELECTED</option>
                                   
                                </Form.Select>
                            </Col>

                            <Col xl={12}>
                                <div className="row gy-2 pb-3">
                                    <label htmlFor="nama-proyek" className="form-label ">Employee<span style={{ color: "red" }}>*</span> :</label>
                                    <Select isMulti name="employee" options={employee} className="default basic-multi-select custom-multi "
                                        menuPlacement='auto' classNamePrefix="Select2" value={dataSubmit.id_employee} onChange={(selected) => setDataSubmit({...dataSubmit, id_employee: selected})}
                                    />
                                </div>
                            </Col>
                           



                        </div>
                    </Col>

                </Row>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={SendEmailBulk}>Send Email Bulk</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    );
}

export default dynamic(() => Promise.resolve(SendEmailBulkPayslip), { ssr: false });