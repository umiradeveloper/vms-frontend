import { useEffect, useState } from "react";
import { Button, Col, InputGroup, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });


const EditEmployee = ({openModal, setOpenModal, loader, setLoader}) => {
    const [user, setUser] = useState([]);
    const [optionGradeKelas, setOptionGradeKelas] = useState([]);
    const [optionJenisKelamin, setOptionJenisKelamin] = useState([]);
    const [optionMaritalStatus, setOptionMaritalStatus] = useState([]);
    const [optionPtkp, setOptionPtkp] = useState([]);
    const [optionStatusKaryawan, setOptionStatusKaryawan] = useState([]);
    const [dataEmployee, setDataEmployee] = useState({
        id_employee:"",
        id_user: "",
        nip: "",
        nik: "",
        nama: "",
        departemen: "",
        jabatan:"",
        blood_type:"",
        grade:"",
        email:"",
        no_hp:"",
        tmt:"",
        bank_name:"",
        bpjs_ketenagakerjaan:"",
        status_karyawan:"",
        jenis_kelamin:"",
        marital_status:"",
        kelas:"",
        tanggal_lahir: new Date(),
        alamat:"",
        tempat_lahir:"",
        npwp:"",
        ptkp_status:"",
        bank_account:"",
        bpjs_kesehatan:""
    })

    const getUser = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        // console.log(dataSubmit)
        try {
            const result = await apiConfig.get(apiUrl + "/users/all/staff", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                 if(result.data.data.length > 0){
                    const userArr = [];
                    for(const res of result.data.data){
                        userArr.push({
                            value: res.id_user,
                            label: res.username+" | "+res.role?.nama_role
                        })
                    }
                    setUser(userArr);
                    setLoader(false);
                }
                // setLoader(false);

                // swalAlert(result.data.message, result.statusText, "success");
                // setOpenModal({...openModal, open: false})
            }
        }catch (error) {
            setLoader(false);
            console.log(error);
        }
    }
    const getGradeKelas = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        // console.log(dataSubmit)
        try {
            const result = await apiConfig.get(apiUrl + "/Master-employee/get-master-grade-class", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                const gradeArr = [];
                 if(result.data.data.length > 0){
                    
                    for(const res of result.data.data){
                        gradeArr.push({
                            value: res.grade+"|"+res.kelas,
                            label: res.grade+" | "+res.kelas
                        })
                    }
                    
                }
                setOptionGradeKelas(gradeArr);
                // setLoader(false);
                // setLoader(false);

                // swalAlert(result.data.message, result.statusText, "success");
                // setOpenModal({...openModal, open: false})
            }
        }catch (error) {
            // setLoader(false);
            console.log(error);
        }finally{
            setLoader(false);
        }
    }
    const getJenisKelamin = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        // console.log(dataSubmit)
        try {
            const result = await apiConfig.get(apiUrl + "/Master-employee/get-master-jenis-kelamin", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                const jenisKelaminArr = [];
                 if(result.data.data.length > 0){
                    
                    for(const res of result.data.data){
                        jenisKelaminArr.push({
                            value: res.jenis_kelamin,
                            label: res.jenis_kelamin
                        })
                    }
                    
                }
                setOptionJenisKelamin(jenisKelaminArr);
                // setLoader(false);
                // setLoader(false);

                // swalAlert(result.data.message, result.statusText, "success");
                // setOpenModal({...openModal, open: false})
            }
        }catch (error) {
            // setLoader(false);
            console.log(error);
        }finally{
            setLoader(false);
        }
    }
    const getMaritalStatus = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        // console.log(dataSubmit)
        try {
            const result = await apiConfig.get(apiUrl + "/Master-employee/get-master-marital-status", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                const maritalStatusArr = [];
                 if(result.data.data.length > 0){
                    
                    for(const res of result.data.data){
                        maritalStatusArr.push({
                            value: res.marital_status,
                            label: res.marital_status
                        })
                    }
                    
                }
                setOptionMaritalStatus(maritalStatusArr);
                // setLoader(false);
                // setLoader(false);

                // swalAlert(result.data.message, result.statusText, "success");
                // setOpenModal({...openModal, open: false})
            }
        }catch (error) {
            // setLoader(false);
            console.log(error);
        }finally{
            setLoader(false);
        }
    }
    const getPtkp = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        // console.log(dataSubmit)
        try {
            const result = await apiConfig.get(apiUrl + "/Master-employee/get-master-ptkp", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                const ptkpArr = [];
                 if(result.data.data.length > 0){
                    
                    for(const res of result.data.data){
                        ptkpArr.push({
                            value: res.kode_ptkp,
                            label: res.nama_ptkp
                        })
                    }
                    
                }
                setOptionPtkp(ptkpArr);
                // setLoader(false);
                // setLoader(false);

                // swalAlert(result.data.message, result.statusText, "success");
                // setOpenModal({...openModal, open: false})
            }
        }catch (error) {
            // setLoader(false);
            console.log(error);
        }finally{
            setLoader(false);
        }
    }
     const getStatusKaryawan = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        // console.log(dataSubmit)
        try {
            const result = await apiConfig.get(apiUrl + "/Master-employee/get-master-status-karyawan", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                const statusKaryawanArr = [];
                 if(result.data.data.length > 0){
                    
                    for(const res of result.data.data){
                        statusKaryawanArr.push({
                            value: res.status_karyawan,
                            label: res.status_karyawan
                        })
                    }
                    
                }
                setOptionStatusKaryawan(statusKaryawanArr);
                // setLoader(false);
                // setLoader(false);

                // swalAlert(result.data.message, result.statusText, "success");
                // setOpenModal({...openModal, open: false})
            }
        }catch (error) {
            // setLoader(false);
            console.log(error);
        }finally{
            setLoader(false);
        }
    }
    const submitData = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        console.log(dataEmployee)
        try {
            const result = await apiConfig.post(apiUrl + "/HR-Employee/update-employee", dataEmployee,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                // setLoader(false);
                swalAlert(result.data.message, result.statusText, "success");
                setOpenModal({...openModal, open: false})
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
        getUser();
        // console.log(openModal.data_edit)
        if(openModal.open){
            const datas = openModal.data_edit;
            setDataEmployee({
                id_employee:datas?.id_employee,
                id_user: datas?.user?.id_user,
                nip: datas?.nip,
                nik: datas?.nik,
                nama: datas?.nama,
                departemen: datas?.departemen,
                jabatan:datas?.jabatan,
                blood_type:datas?.blood_type,
                grade:datas?.grade,
                email: datas?.email,
                no_hp:datas?.no_hp,
                tmt:datas?.tmt,
                bank_name:datas?.bank_name,
                bpjs_ketenagakerjaan:datas?.bpjs_ketenagakerjaan,
                status_karyawan:datas?.status_karyawan,
                jenis_kelamin:datas?.jenis_kelamin,
                marital_status:datas?.marital_status,
                kelas:datas?.kelas,
                tanggal_lahir: datas?.tanggal_lahir,
                alamat:datas?.alamat,
                tempat_lahir:datas?.tempat_lahir,
                npwp:datas?.npwp,
                ptkp_status:datas?.ptkp_status,
                bank_account:datas?.bank_account,
                bpjs_kesehatan:datas?.bpjs_kesehatan
            })
        }
        getGradeKelas();
        getJenisKelamin();
        getMaritalStatus();
        getPtkp();
        getStatusKaryawan();
    },[openModal.open])

    return(
        <Modal size="xl" show={openModal.open} onHide={() => {setOpenModal({...openModal, open: false})}}>
            
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Edit Employee</h6>
            </Modal.Header>
            <Modal.Body>
                 <Row>
                    <Col xl={12}>
                        <div className="row gy-2 pb-3">
                        <label htmlFor="nama-proyek" className="form-label ">User<span style={{ color: "red" }}>*</span> :</label>
                        <Select name="state"  className="basic-multi-select " options={user} isSearchable value={user.find(u => u.value === dataEmployee.id_user) || null}
                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih User" onChange={(e) =>  setDataEmployee({...dataEmployee, id_user: e.value})}
                        />
                        </div>
                    </Col>
                   <Col xl={6} className="rounded-3">
                        <div className="row gy-2 pb-3">
                            
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">NIP (Nomor Induk Pegawai)<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.nip} className={`form-control`} id="nip" placeholder="Nomor Induk Pegawai" onChange={(e) => setDataEmployee({...dataEmployee, nip: e.target.value})} />
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">NIK (Nomor Induk KTP)<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.nik} className={`form-control`} id="nik" placeholder="Nomor Induk KTP" onChange={(e) => setDataEmployee({...dataEmployee, nik: e.target.value})}/>
                            </Col>
                             <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Nama<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.nama} className={`form-control`} id="nama" placeholder="Nama" onChange={(e) => setDataEmployee({...dataEmployee, nama: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Departemen<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.departemen} className={`form-control`} id="departemen" placeholder="Departemen" onChange={(e) => setDataEmployee({...dataEmployee, departemen: e.target.value})} />
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Jabatan<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.jabatan} className={`form-control`} id="jabatan" placeholder="Jabatan" onChange={(e) => setDataEmployee({...dataEmployee, jabatan: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Golongan Darah<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.blood_type} className={`form-control`} id="golongan_darah" placeholder="Golongan Darah" onChange={(e) => setDataEmployee({...dataEmployee, blood_type: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Grade<span style={{ color: "red" }}>*</span> :</label>
                                {/* <input type="text" value={dataEmployee.grade} className={`form-control`} id="grade" placeholder="Grade" onChange={(e) => setDataEmployee({...dataEmployee, grade: e.target.value})}/> */}
                                    <Select name="state"  className="basic-multi-select " options={optionGradeKelas} isSearchable value={optionGradeKelas.find(u => u.value === dataEmployee.grade+"|"+dataEmployee.kelas) || null}
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Grade" onChange={(e) =>  {
                                            const splitData = e.value.split("|");
                                            setDataEmployee({...dataEmployee, grade: splitData[0], kelas: splitData[1]})
                                        }}
                                    />
                                
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">email<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.email} className={`form-control`} id="email" placeholder="email" onChange={(e) => setDataEmployee({...dataEmployee, email: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Nomor Handphone<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.no_hp} className={`form-control`} id="email" placeholder="Nomor Handphone" onChange={(e) => setDataEmployee({...dataEmployee, no_hp: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">TMT (terhitung Mulai Tanggal)<span style={{ color: "red" }}>*</span> :</label>
                                <DatePicker selected={dataEmployee.tmt} className={`form-control`} id="tmt" placeholder="TMT (Terhitung Mulai Tanggal)" onChange={(date) => setDataEmployee({...dataEmployee, tmt: (date)?date:new Date()})} />
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Nama Bank<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.bank_name} className={`form-control`} id="nama_bank" placeholder="Nama Bank" onChange={(e) => setDataEmployee({...dataEmployee, bank_name: e.target.value})}/>
                            </Col>
                             <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Bpjs Ketenagakerjaan<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.bpjs_ketenagakerjaan} className={`form-control`} id="bpjs_ketenagakerjaan" placeholder="Bpjs Ketenagakerjaan" onChange={(e) => setDataEmployee({...dataEmployee, bpjs_ketenagakerjaan: e.target.value})}/>
                            </Col>

                            
                        </div>
                    </Col>
                    <Col xl={6} className="rounded-3">
                        <div className="row gy-2 pb-3">
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Status Karyawan<span style={{ color: "red" }}>*</span> :</label>
                                {/* <input type="text" value={dataEmployee.status_karyawan} className={`form-control`} id="status_karyawan" placeholder="Status Karyawan" onChange={(e) => setDataEmployee({...dataEmployee, status_karyawan: e.target.value})}/> */}
                                <Select name="state"  className="basic-multi-select " options={optionStatusKaryawan} isSearchable value={optionStatusKaryawan.find(u => u.value === dataEmployee.status_karyawan) || null}
                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Status Karyawan" onChange={(e) =>  setDataEmployee({...dataEmployee, status_karyawan: e.value})}
                        />
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Jenis Kelamin<span style={{ color: "red" }}>*</span> :</label>
                                {/* <input type="text" value={dataEmployee.jenis_kelamin} className={`form-control`} id="jenis_kelamin" placeholder="Jenis Kelamin" onChange={(e) => setDataEmployee({...dataEmployee, jenis_kelamin: e.target.value})}/>
                                 */}
                                 <Select name="state"  className="basic-multi-select " options={optionJenisKelamin} isSearchable value={optionStatusKaryawan.find(u => u.value === dataEmployee.jenis_kelamin) || null}
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Jenis Kelamin" onChange={(e) =>  setDataEmployee({...dataEmployee, jenis_kelamin: e.value})}
                                    />
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Status Pernikahan<span style={{ color: "red" }}>*</span> :</label>
                                {/* <input type="text" value={dataEmployee.marital_status} className={`form-control`} id="status_pernikahan" placeholder="Status Pernikahan" onChange={(e) => setDataEmployee({...dataEmployee, marital_status: e.target.value})}/> */}
                                <Select name="state"  className="basic-multi-select " options={optionMaritalStatus} isSearchable value={optionMaritalStatus.find(u => u.value === dataEmployee.marital_status) || null}
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Status Pernikahan" onChange={(e) =>  setDataEmployee({...dataEmployee, marital_status: e.value})}
                                    />
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Class<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.kelas} className={`form-control`} id="kelas" placeholder="Class" disabled/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Tanggal Lahir<span style={{ color: "red" }}>*</span> :</label>
                                {/* <input type="text" className={`form-control`} id="tanggal_lahir" placeholder="Tanggal Lahir"/> */}
                                <DatePicker selected={dataEmployee.tanggal_lahir} className={`form-control`} id="tanggal_lahir" placeholder="Tanggal Lahir" onChange={(date) => setDataEmployee({...dataEmployee, tanggal_lahir: (date)?date:new Date()})} />
                                  
                            </Col>

                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Tempat Lahir<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.tempat_lahir} className={`form-control`} id="tempat_lahir" placeholder="Tempat Lahir" onChange={(e) => setDataEmployee({...dataEmployee, tempat_lahir: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Alamat<span style={{ color: "red" }}>*</span> :</label>
                                <textarea type="text" value={dataEmployee.alamat} className={`form-control`} id="alamat" placeholder="Alamat" rows={4} onChange={(e) => setDataEmployee({...dataEmployee, alamat: e.target.value})} />
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">NPWP<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.npwp} className={`form-control`} id="npwp" placeholder="NPWP" onChange={(e) => setDataEmployee({...dataEmployee, npwp: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">PTKP status<span style={{ color: "red" }}>*</span> :</label>
                                {/* <input type="text" value={dataEmployee.ptkp_status} className={`form-control`} id="ptkp_status" placeholder="PTKP Status" onChange={(e) => setDataEmployee({...dataEmployee, ptkp_status: e.target.value})}/> */}
                                <Select name="state"  className="basic-multi-select " options={optionPtkp} isSearchable value={optionPtkp.find(u => u.value === dataEmployee.ptkp_status) || null}
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih PTKP" onChange={(e) =>  setDataEmployee({...dataEmployee, ptkp_status: e.value})}
                                    />
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Nomor Rekening<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.bank_account} className={`form-control`} id="bank_account" placeholder="Nomor Rekening" onChange={(e) => setDataEmployee({...dataEmployee, bank_account: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Bpjs Kesehatan<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" value={dataEmployee.bpjs_kesehatan} className={`form-control`} id="bpjs_kesehatan" placeholder="Bpjs Kesehatan" onChange={(e) => setDataEmployee({...dataEmployee, bpjs_kesehatan: e.target.value})}/>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={submitData} >Update</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default EditEmployee;