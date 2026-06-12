import { Button, Col, Form, Modal, Row } from "react-bootstrap"

import api from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Select = dynamic(() => import("react-select"), { ssr: false });
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";


const CreateMaintenanceAsset = ({ openModal, setOpenModal, loader, setLoader, reload, setReload }) => {
    const [tipeMaintenance, setTipeMaintenance] = useState([]);
    const [kondisiSetelah, setKondisiSetelah] = useState([]);
    const [statusMaintenance, setStatusMaintenance] = useState([]);
    const [asset, setAsset] = useState([]);
    const [dataMaintenance, setDataMaintenance] = useState({
        id_asset:"",
        tipe_maintenance:"",
        tanggal_maintenance:"",
        biaya: 0,
        deskripsi_maintenance:""
    })
     const getTipeMaintenance = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const result = await api.get(apiUrl + "/asset-manajemen/get-maintenance-tipe", {
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
                setTipeMaintenance(ls)
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

     const getAsset = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const result = await api.get(apiUrl + "/asset-manajemen/get-asset", {
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
                            label: datas.kode_asset+"|"+datas.nama_asset
                        })
                    }

                }
                setAsset(ls)
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
     const create = async() => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            setLoader(true);
            var fm = new FormData();
            fm.append("id_asset", dataMaintenance.id_asset);
            fm.append("tipe_maintenance", dataMaintenance.tipe_maintenance);
            fm.append("tanggal_maintenance", dataMaintenance.tanggal_maintenance);
            fm.append("deskripsi", dataMaintenance.deskripsi_maintenance);
            fm.append("biaya", dataMaintenance.biaya);
            fm.append("status_maintenance", "Dijadwalkan");
            
             try {
                const result = await api.post(apiUrl + "/asset-manajemen/create-maintenance-asset", fm, {
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
        
        getTipeMaintenance();
        getAsset();
        
    },[])

    return (
        <Modal size="lg" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Jadwalkan Maintenance</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">

                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Asset <span style={{ color: "red" }}>*</span> </Form.Label>
                                    <Select name="state" className="basic-multi-select" options={asset} isSearchable
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Asset" onChange={(e) => setDataMaintenance({...dataMaintenance, id_asset: e.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Tipe Maintenance <span style={{ color: "red" }}>*</span> </Form.Label>
                                    <Select name="state" className="basic-multi-select" options={tipeMaintenance} isSearchable 
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Tipe Maintenance" onChange={(e) => setDataMaintenance({...dataMaintenance, tipe_maintenance: e.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xl={6}>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Tanggal Maintenance <span style={{ color: "red" }}>*</span> </Form.Label>
                                        <Flatpickr
                                            className="form-control"
                                            value={dataMaintenance.tanggal_maintenance ?? ""}
                                            options={{
                                                dateFormat: "Y-m-d",
                                                enableTime: false,
                                                time_24hr: false,
                                            }}
                                            onChange={(val, valStr) =>  setDataMaintenance({ ...dataMaintenance, tanggal_maintenance: valStr })}
                                            // onChange={(val,valStr) => {
                                            // 	console.log(valStr)
                                            // }}
                                            placeholder="Tanggal Maintenance"
                                        />
                                </Form.Group>
                            </Col>
                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Biaya <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Biaya" onChange={(e) => setDataMaintenance({...dataMaintenance, biaya: e.target.value})} />
                                </Form.Group>
                            </Col>

                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Deskripsi</Form.Label>
                                    <Form.Control as="textarea" id="text-area" rows={2} onChange={(e) => setDataMaintenance({...dataMaintenance, deskripsi_maintenance: e.target.value})} />
                                </Form.Group>
                            </Col>
                            
                          


                           

                            {/* <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Nilai Perolehan Saat Ini <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Nilai Perolehan Saat Ini" value={dataAsset.nilai_saat_ini} onChange={(e) => setDataAsset({ ...dataAsset, nilai_saat_ini: e.target.value })} />
                                </Form.Group>
                            </Col>
                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Deskripsi Asset <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Deskripsi Asset" value={dataAsset.deskripsi_asset} onChange={(e) => setDataAsset({ ...dataAsset, deskripsi_asset: e.target.value })} />
                                </Form.Group>
                            </Col>
                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Foto Asset <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="file" placeholder="Foto Asset" onChange={(e) => setDataAsset({ ...dataAsset, foto: e.target.files[0] })} />
                                </Form.Group>
                            </Col>
                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Umur Ekonomis <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Umur Ekonomis" value={dataAsset.umur_ekonomis} onChange={(e) => setDataAsset({ ...dataAsset, umur_ekonomis: e.target.value })} />
                                </Form.Group>
                            </Col> */}
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex gap-2">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={create}>Submit</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(CreateMaintenanceAsset), { ssr: false });