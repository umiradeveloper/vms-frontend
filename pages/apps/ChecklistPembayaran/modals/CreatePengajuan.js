import { Button, Divider } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
const Select = dynamic(() => import("react-select"), { ssr: false });
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";

const CreatePengajuan = ({ openModal, setOpenModal, loader, setLoader }) => {
    const [jenisTransaksi, setJenisTransaksi] = useState([]);
    const [proyek, setProyek] = useState([]);
    const [kodeTransaksi, setKodeTransaksi] = useState();
    const [dataSubmit, setDataSubmit] = useState({
        jenis_transaksi: "",
        catatan: "",
        proyek:"",
        tempo_pembayaran_after_verified:"",
    });
    const [formTransaksi, setFormTransaksi] = useState([]);
    const getJenisTransaksi = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/jenis-transaksi/get-jenis-transaksi", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result);
            if (result.status == 200) {
                const dataJenisTransaksi = [];
                if (result.data.data?.length > 0) {

                    for (const datas of result.data.data) {
                        dataJenisTransaksi.push({
                            value: datas,
                            label: datas
                        })
                    }

                }
                setJenisTransaksi(dataJenisTransaksi);
                // setEmployee(dataEmployeeArr);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    const getFormTransaksi = async (jenis) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/jenis-transaksi/get-nama-transaksi-by-jenis", {
                params: {
                    jenis_transaksi: jenis
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if (result.status == 200) {
                setKodeTransaksi(result.data?.data[0].kode_jenis);
                setFormTransaksi(result.data?.data);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    const HandleChangeSelectTransaksi = (e) => {
        setDataSubmit({ ...dataSubmit, jenis_transaksi: e.value })
        getFormTransaksi(e.value);
    }
    const handleFileChange = (index, file) => {
        const updated = [...formTransaksi];
        updated[index].file = file; // simpan file
        setFormTransaksi(updated);
    };
    const handleInputChange = (index, value) => {
        const updated = [...formTransaksi];
        updated[index].value = value; 
        setFormTransaksi(updated);
    };

    const createTransaksi = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const fm = new FormData();
        fm.append("jenis_transaksi", dataSubmit.jenis_transaksi);
        fm.append("kode_transaksi", kodeTransaksi);
        fm.append("catatan", dataSubmit.catatan);
        fm.append("proyek", dataSubmit.proyek);
        fm.append("tempo_pembayaran_after_verified", dataSubmit.tempo_pembayaran_after_verified);
        formTransaksi.forEach((item, index) => {
            if (item.file) {
                fm.append('files', item.file);
                fm.append('nama_transaksi', item.nama_transaksi); // optional
                fm.append('nilai',item.value)
            }
        });
        // console.log(formTransaksi)
        try {
            const result = await apiConfig.post(apiUrl + "/ChecklistTransaksi/transaksi/create-transaksi", fm,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result);
            if (result.status == 200) {
                 swalAlert(result.data.message, result.statusText, "success");
                 setOpenModal({...openModal, open: false});
                // setFormTransaksi(result.data?.data);
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
    const getDaftarProyek = async() => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek-dashboard", {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}

			});
            // console.log(result)
            if(result.status == 200){
                const ArrProyek = [];
                if(result.data.data.length > 0){
                    for(const datas of result.data.data){
                        ArrProyek.push({
                            value: datas.proyek?.nama_proyek,
                            label: datas.proyek?.nama_proyek+" ("+datas.proyek?.kode_proyek+") "
                            
                        })
                        // setProyek([...proyek, {label: datas.proyek?.nama_proyek+" ("+datas.proyek?.kode_proyek+") ", value: datas.proyek?.nama_proyek}])
                    }
                }
                setProyek(ArrProyek);
                
            }
            // console.log(result);
        } catch (error) {
            console.log("e = "+error);
        }finally{
            setLoader(false)
        }
    }
    useEffect(() => {
        getJenisTransaksi();
        getDaftarProyek();
    }, [openModal.open, formTransaksi])
    return (
        <Modal size="xl" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Pengajuan Jenis Transaksi</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">

                            <Col xl={12}>
                                <div className="row gy-2 pb-3">
                                    <label htmlFor="nama-proyek" className="form-label ">Jenis Transaksi<span style={{ color: "red" }}>*</span> :</label>
                                    <Select name="state" className="basic-multi-select " options={jenisTransaksi} isSearchable
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Jenis Transaksi" onChange={HandleChangeSelectTransaksi}
                                    />
                                </div>
                            </Col>
                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Kode Jenis Transaksi</Form.Label>
                                    <Form.Control type="text" placeholder="Kode Jenis Transaksi" value={kodeTransaksi} disabled/>  
                                </Form.Group>
                            </Col>
                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Proyek</Form.Label>
                                    {/* <Form.Control type="text" value={dataSubmit.proyek} onChange={(e) => setDataSubmit({ ...dataSubmit, proyek: e.target.value })}/> */}
                                        <Select name="state" className="basic-multi-select " options={proyek} isSearchable
                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Proyek" onChange={(e) => setDataSubmit({ ...dataSubmit, proyek: e.value })}
                                />
                                </Form.Group>
                            </Col>

                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>SLA Pembayaran (Tempo)</Form.Label>
                                    <Form.Control type="text" placeholder="Hari" value={dataSubmit.tempo_pembayaran_after_verified} onChange={(e) => setDataSubmit({ ...dataSubmit, tempo_pembayaran_after_verified: e.target.value })}/>  
                                </Form.Group>
                            </Col>
                            <Divider className="mt-3 mb-3" />
                            {formTransaksi && formTransaksi.map((item, index) => (
                                <Col xl={6} key={index}>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>{item.nama_transaksi}</Form.Label>
                                        <Form.Control type="file" onChange={(e) =>
                                            handleFileChange(index, e.target.files[0])
                                        } />
                                        <Form.Control
                                            type="number"
                                            placeholder="Masukan Nilai"
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            className="mb-2 mt-2"
                                        />
                                    </Form.Group>
                                </Col>
                            ))}

                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Catatan :</label>
                                <textarea type="text" value={dataSubmit.catatan} className={`form-control`} id="keterangan" placeholder="Catatan" rows={3} onChange={(e) => setDataSubmit({ ...dataSubmit, catatan: e.target.value })} />
                            </Col>


                        </div>
                    </Col>

                </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex gap-2">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={createTransaksi}>Submit</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default CreatePengajuan;