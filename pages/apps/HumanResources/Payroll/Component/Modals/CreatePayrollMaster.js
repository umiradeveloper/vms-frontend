import { Col, Form, Modal, Row } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Select = dynamic(() => import("react-select"), { ssr: false });

const CreatePayrollMaster = ({loader, setLoader, openModal, setOpenModal}) => {
    const [employee, setEmployee] = useState([]);
    const [submitEmployee, setSubmitEmployee] = useState({
        id_employee: "",
        gaji_pokok:"",
        tunjangan_transport:"",
        tunjangan_makan:"",
        tunjangan_lembur:"",
        tunjangan_lainnya:"",
        bpjs_kesehatan:"",
        bpjs_ketenagakerjaan:"",
        kasbon:"",
        pinjaman:"",
        thr_paid:"",
        jaminan_pensiun:"",
        bpjs_kesehatan_deduction:"",
        bpjs_kesehatan_family:"",
        jht_employee:"",
        pph21:""
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

     useEffect(() => {
        getEmployee();
     },[])
    return(
        <Modal size="xl" show={openModal.open} onHide={() => {setOpenModal({...openModal, open: false})}}> 
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Tambah Payroll</h6>
            </Modal.Header>
            <Modal.Body>
                 <Row>
                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">
                            
                            <Col xl={12}>
                                <div className="row gy-2 pb-3">
                                    <label htmlFor="nama-proyek" className="form-label ">Employee<span style={{ color: "red" }}>*</span> :</label>
                                    <Select name="state"  className="basic-multi-select " options={employee} isSearchable
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Employee" onChange={(e) =>  setSubmitEmployee({...submitEmployee, id_employee: e.value})}
                                    />
                                </div>
                            </Col>

                            <Col xl={6}>
								<Form.Label htmlFor="input-label">Gaji Pokok <span style={{ color: "red" }}>*</span>:</Form.Label>
								<Form.Control type="number" id="gaji_pokok" onChange={(e) => setSubmitEmployee({...submitEmployee, gaji_pokok: e.target.value})} />
                            </Col>

                            <Col xl={6}>
								<Form.Label htmlFor="input-label">Tunjangan Transport <span style={{ color: "red" }}>*</span>:</Form.Label>
								<Form.Control type="number" id="tunjangan_transport" onChange={(e) => setSubmitEmployee({...submitEmployee, tunjangan_transport: e.target.value})}  />
                            </Col>
                            <Col xl={6}>
								<Form.Label htmlFor="input-label">Tunjangan Makan <span style={{ color: "red" }}>*</span>:</Form.Label>
								<Form.Control type="number" id="tunjangan_makan" onChange={(e) => setSubmitEmployee({...submitEmployee, tunjangan_makan: e.target.value})}  />
                            </Col>

                            <Col xl={6}>
								<Form.Label htmlFor="input-label">Tunjangan Lembur <span style={{ color: "red" }}>*</span>:</Form.Label>
								<Form.Control type="number" id="tunjangan_lembur" onChange={(e) => setSubmitEmployee({...submitEmployee, tunjangan_lembur: e.target.value})}  />
                            </Col>

                            <Col xl={6}>
								<Form.Label htmlFor="input-label">Tunjangan Lainnya <span style={{ color: "red" }}>*</span>:</Form.Label>
								<Form.Control type="number" id="tunjangan_lainnya" onChange={(e) => setSubmitEmployee({...submitEmployee, tunjangan_lainnya: e.target.value})}  />
                            </Col>
                            <Col xl={6}>
								<Form.Label htmlFor="input-label">BPJS Kesehatan <span style={{ color: "red" }}>*</span>:</Form.Label>
								<Form.Control type="number" id="bpjs_kesehatan" onChange={(e) => setSubmitEmployee({...submitEmployee, bpjs_kesehatan: e.target.value})}  />
                            </Col>
                        </div>
                    </Col>
                 </Row>
            </Modal.Body>
        </Modal>
    )
}

export default CreatePayrollMaster;