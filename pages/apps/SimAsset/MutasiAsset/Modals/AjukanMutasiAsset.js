import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import api from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
const Select = dynamic(() => import("react-select"), { ssr: false });

const AjukanMutasiAsset = ({ openModal, setOpenModal, reload, setReload, loader, setLoader }) => {
    const [user, setUser] = useState([]);
    const [dataAsset, setDataAsset] = useState([]);
    const [dataMutasi, setDataMutasi] = useState({
        id_asset: "",
        alasan_mutasi: "",
        lokasi_asal: "",
        lokasi_tujuan: "",
        pic_tujuan: "",
        dokumen_referensi: null
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

    const handleChangeSelect = (e) => {
        const lokasi = dataAsset.find(x => x.value === e.value);

        setDataMutasi({...dataMutasi, id_asset: e.value, lokasi_asal: lokasi.lokasi});
        
    }
    const submit = async() => {
         const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                setLoader(true);
                var fm = new FormData();
                fm.append("id_asset", dataMutasi.id_asset);
                fm.append("alasan_mutasi", dataMutasi.alasan_mutasi);
                fm.append("lokasi_asal", dataMutasi.lokasi_asal);
                fm.append("lokasi_tujuan", dataMutasi.lokasi_tujuan);
                fm.append("pic_tujuan", dataMutasi.pic_tujuan);
                if(dataMutasi.dokumen_referensi){
                    fm.append("dokumen_referensi", dataMutasi.dokumen_referensi);
                }
                 try {
                    const result = await api.post(apiUrl + "/asset-manajemen/create-mutasi-asset", fm, {
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
    }, [])
    return (
        <Modal size="lg" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Ajukan Mutasi</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xl={6}>
                        <div className="row gy-2 pb-3">
                            <label htmlFor="nama-proyek" className="form-label ">Asset<span style={{ color: "red" }}>*</span> :</label>
                            <Select name="state" className="basic-multi-select " options={dataAsset} isSearchable
                                menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Penanggung Jawab" onChange={handleChangeSelect}
                            />
                        </div>
                    </Col>
                    <Col xl={6}>
                        <div className="row gy-2 pb-3">
                            <label htmlFor="nama-proyek" className="form-label ">PIC Tujuan<span style={{ color: "red" }}>*</span> :</label>
                            <Select name="state" className="basic-multi-select " options={user} isSearchable
                                menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Penanggung Jawab" onChange={(e) => setDataMutasi({ ...dataMutasi, pic_tujuan: e.value })}
                            />
                        </div>
                    </Col>
                    <Col xl={6} >
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Lokasi Asal<span style={{ color: "red" }}>*</span> </Form.Label>
                            <Form.Control type="text" placeholder="Lokasi Asal" value={dataMutasi.lokasi_asal} onChange={(e) => setDataMutasi({ ...dataMutasi, lokasi_asal: e.target.value })} />
                        </Form.Group>
                    </Col>
                    <Col xl={6} >
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Lokasi Tujuan<span style={{ color: "red" }}>*</span> </Form.Label>
                            <Form.Control type="text" placeholder="Lokasi Tujuan" value={dataMutasi.lokasi_tujuan} onChange={(e) => setDataMutasi({ ...dataMutasi, lokasi_tujuan: e.target.value })} />
                        </Form.Group>
                    </Col>
                    <Col xl={12} >
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Alasan Mutasi<span style={{ color: "red" }}>*</span> </Form.Label>
                            <textarea className="form-control" id="contact-address-address" rows={2} onChange={(e) => setDataMutasi({ ...dataMutasi, alasan_mutasi: e.target.value })} />
                        </Form.Group>
                    </Col>

                    <Col xl={12} >
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Dokumen Referensi </Form.Label>
                            <Form.Control type="file" placeholder="Lokasi Tujuan" onChange={(e) => setDataMutasi({ ...dataMutasi, dokumen_referensi: e.target.files[0] })} />
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

export default dynamic(() => Promise.resolve(AjukanMutasiAsset), { ssr: false });