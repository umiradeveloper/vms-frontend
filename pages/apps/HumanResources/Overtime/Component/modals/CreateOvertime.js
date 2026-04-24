import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Button } from "@mui/material";

const Select = dynamic(() => import("react-select"), { ssr: false });

const CreateOvertime = ({openModal, setOpenModal, loader, setLoader}) => {
    const [employee, setEmployee] = useState([]);
    const [dataSubmit, setDataSubmit] = useState({
        id_employee:"",
        tanggal: "",
        jam_mulai:"",
        jam_selesai:"",
        alasan:""
    })
     const getEmployee = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/HR-Employee/get-employee", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                const dataEmployeeArr = [];
                if(result.data.data?.length > 0){
                    
                    for(const datas of result.data.data){
                        dataEmployeeArr.push({
                            value: datas.id_employee,
                            label: datas.nip+"|"+datas.nama+"|"+datas.jabatan
                        })
                    }
                    
                }
                setEmployee(dataEmployeeArr);
            }
        }catch (error) {
            // setLoader(false);
            console.log(error);
        }finally{
            setLoader(false);
        }
     }

     const createOvertime = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const beforeSubmit = {
            id_employee: dataSubmit.id_employee ?? "",
            jam_mulai: dataSubmit.jam_mulai ? dataSubmit.jam_mulai.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : null,
            jam_selesai: dataSubmit.jam_mulai ? dataSubmit.jam_selesai.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : null,
            tanggal: dataSubmit.tanggal ?? "",
            alasan: dataSubmit.alasan ?? ""
        }
        try {
            const result = await apiConfig.post(apiUrl + "/HR-Overtime/create-overtime", beforeSubmit,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                swalAlert(result.data.message, result.statusText, "success");
                // console.log(result)
                setOpenModal({open: false});
            }
        }catch (error) {
            // setLoader(false);
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
        getEmployee();
     },[openModal.open])
    return(
        <Modal size="md" show={openModal.open} onHide={() => {setOpenModal({...openModal, open: false})}}> 
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Tambah Overtime</h6>
            </Modal.Header>
            <Modal.Body>
                 <Row>
                   
                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">
                            
                            <Col xl={12}>
                                <div className="row gy-2 pb-3">
                                <label htmlFor="nama-proyek" className="form-label ">Employee<span style={{ color: "red" }}>*</span> :</label>
                                <Select name="state"  className="basic-multi-select " options={employee} isSearchable
                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Employee" onChange={(e) =>  setDataSubmit({...dataSubmit, id_employee: e.value})}
                                />
                                </div>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Tanggal<span style={{ color: "red" }}>*</span> :</label>
                                 <DatePicker selected={dataSubmit.tanggal} className={`form-control`} id="Tanggal" placeholder="Tanggal" onChange={(date) => setDataSubmit({...dataSubmit, tanggal: date})} />
                            </Col>
                             <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Jam Mulai<span style={{ color: "red" }}>*</span> :</label>
                                <DatePicker
                                    selected={dataSubmit.jam_mulai}
                                    onChange={(time) => {
                                        const formatted_time = time ? time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : null ;
                                        setDataSubmit({...dataSubmit, jam_mulai: time})
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
                                        const formatted_time = time ? time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : null ;
                                        setDataSubmit({...dataSubmit, jam_selesai: time})
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
                                <textarea type="text" value={dataSubmit.alasan} className={`form-control`} id="keterangan" placeholder="Keterangan" rows={3} onChange={(e) =>  setDataSubmit({...dataSubmit, alasan: e.target.value})}/>
                            </Col>
                           

                            
                        </div>
                    </Col>
                    
                </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex gap-2">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={createOvertime}>Tambah</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default CreateOvertime;