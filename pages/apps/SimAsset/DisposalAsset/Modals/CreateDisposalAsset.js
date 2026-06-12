import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import api from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
const Select = dynamic(() => import("react-select"), { ssr: false });

const CreateDisposalAsset = ({ openModal, setOpenModal, reload, setReload, loader, setLoader }) => {
    const [user, setUser] = useState([]);
    const [dataAsset, setDataAsset] = useState([]);
    const [alasan, setAlasan] = useState([]);
    const [metode, setMetode] = useState([]);
    const [dataHapus, setDataHapus] = useState({
        id_asset: "",
        alasan: "",
        metode_penghapusan: "",
        keterangan:"",
        nilai_sisa: 0,
        id_user_approval: "",
    });

    const getUser = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const result = await api.get(apiUrl + "/users/all/staff", {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            // console.log(result);
            if (result.status == 200) {
                // setReload(prev => !prev);
                const userPj = [];
                if (result.data.data?.length > 0) {

                    for (const datas of result.data.data) {
                        userPj.push({
                            value: datas.id_user,
                            label: datas.username + "|" + datas.role?.nama_role
                        })
                    }

                }
                setUser(userPj);
                // swalAlert(result.data.message, result.statusText, "success");

                // setOpenModal({open: false });
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    const getDataAsset = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const result = await api.get(apiUrl + "/asset-manajemen/get-my-asset", {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            // console.log(result);
            if (result.status == 200) {
                // setReload(prev => !prev);
                const ls = [];
                if (result.data.data?.length > 0) {

                    for (const datas of result.data.data) {
                       ls.push({
                            value: datas.id_asset,
                            label: datas.kode_asset + "|" + datas.nama_asset,
                            lokasi: datas.lokasi
                        })
                    }

                }
                setDataAsset(ls);
                // swalAlert(result.data.message, result.statusText, "success");

                // setOpenModal({open: false });
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    const getAlasan = async() => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            setLoader(true);
    
            try {
                const result = await api.get(apiUrl + "/asset-manajemen/get-disposal-alasan", {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                // console.log(result);
                if (result.status == 200) {
                    // setReload(prev => !prev);
                        const ls = [];
                    if (result.data.data?.length > 0) {
    
                        for (const datas of result.data.data) {
                            ls.push({
                                value: datas,
                                label: datas
                            })
                        }
    
                    }
                    setAlasan(ls)
                    // swalAlert(result.data.message, result.statusText, "success");
    
                    // setOpenModal({open: false });
                }
            } catch (error) {
                // setLoader(false);
                console.log(error);
            } finally {
                setLoader(false);
            }
        }

    const getMetode = async() => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            setLoader(true);
    
            try {
                const result = await api.get(apiUrl + "/asset-manajemen/get-disposal-metode", {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                // console.log(result);
                if (result.status == 200) {
                    // setReload(prev => !prev);
                        const ls = [];
                    if (result.data.data?.length > 0) {
    
                        for (const datas of result.data.data) {
                            ls.push({
                                value: datas,
                                label: datas
                            })
                        }
    
                    }
                    setMetode(ls)
                    // swalAlert(result.data.message, result.statusText, "success");
    
                    // setOpenModal({open: false });
                }
            } catch (error) {
                // setLoader(false);
                console.log(error);
            } finally {
                setLoader(false);
            }
        }
   
    const submit = async() => {
         const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                setLoader(true);
                var fm = new FormData();
                fm.append("id_asset", dataHapus.id_asset);
                fm.append("alasan", dataHapus.alasan);
                fm.append("id_user_approval", dataHapus.id_user_approval);
                fm.append("keterangan", dataHapus.keterangan);
                fm.append("metode_penghapusan", dataHapus.metode_penghapusan);
                fm.append("nilai_sisa", dataHapus.nilai_sisa);
                fm.append("status_disposal" , "Pengajuan");
               
                 try {
                    const result = await api.post(apiUrl + "/asset-manajemen/create-disposal-asset", fm, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    });
                    // console.log(result);
                    if (result.status == 200) {
                        setReload(prev => !prev);
                        swalAlert(result.data.message, result.statusText, "success");
        
                        setOpenModal({open: false });
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
        getDataAsset();
        getUser();
        getAlasan();
        getMetode();
    }, [])
    return (
        <Modal size="lg" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Di Usulkan Hapus</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xl={6}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Asset<span style={{ color: "red" }}>*</span> </Form.Label>
                            <Select name="state" className="basic-multi-select " options={dataAsset} isSearchable
                                menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Asset" onChange={(e) => setDataHapus({...dataHapus, id_asset: e.value})}
                            />
                        </Form.Group>
                    </Col>

                    <Col xl={6}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Alasan<span style={{ color: "red" }}>*</span> </Form.Label>
                            <Select name="state" className="basic-multi-select " options={alasan} isSearchable
                                menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Alasan" onChange={(e) => setDataHapus({...dataHapus, alasan: e.value})}
                            />
                        </Form.Group>
                    </Col>

                    <Col xl={6}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Metode Penghapusan <span style={{ color: "red" }}>*</span> </Form.Label>
                            <Select name="state" className="basic-multi-select " options={metode} isSearchable
                                menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Metode Penghapusan" onChange={(e) => setDataHapus({...dataHapus, metode_penghapusan: e.value})}
                            />
                        </Form.Group>
                    </Col>
                    
                    <Col xl={6} >
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Nilai Sisa<span style={{ color: "red" }}>*</span> </Form.Label>
                            <Form.Control type="text" placeholder="Lokasi Asal" value={dataHapus.nilai_sisa} onChange={(e) => setDataHapus({ ...dataHapus, nilai_sisa: e.target.value })} />
                        </Form.Group>
                    </Col>
                   
                    <Col xl={12} >
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Keterangan<span style={{ color: "red" }}>*</span> </Form.Label>
                            <textarea className="form-control" id="contact-address-address" rows={2} onChange={(e) => setDataHapus({ ...dataHapus, keterangan: e.target.value })} />
                        </Form.Group>
                    </Col>

                    {/* <Col xl={12} >
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Dokumen Referensi </Form.Label>
                            <Form.Control type="file" placeholder="Lokasi Tujuan" onChange={(e) => setDataHapus({ ...dataMutasi, dokumen_referensi: e.target.files[0] })} />
                        </Form.Group>
                    </Col> */}

                    <Col xl={12}>
                            
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Approval <span style={{ color: "red" }}>*</span></Form.Label>
                                 <Select name="state" className="basic-multi-select " options={user} isSearchable
                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Apporval" onChange={(e) => setDataHapus({ ...dataHapus, id_user_approval: e.value })}
                                />
                            </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex gap-2">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={submit}>Submit</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default CreateDisposalAsset;