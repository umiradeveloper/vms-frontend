import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import api from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";


const CreateAsset = ({openModal, setOpenModal, reload, setReload, loader, setLoader}) => {
    const [dataAsset, setDataAsset] = useState({
        kode_asset:"",
        id_user: "",
        nama_asset: "",
        kategori: "",
        lokasi: "",
        nilai_perolehan: 0,
        tanggal_perolehan: "",
        kondisi:"",
        status_asset:"",
        deskripsi_asset:"",
        foto: null,
        nilai_saat_ini:0,
        umur_ekonomis: 0,
        kode_kategori: ""
    });
    const [user, setUser] = useState([]);
    const [kondisi, setKondisi] = useState([]);
    const [kategori, setKategori] = useState([]);
    const [statusAsset, setStatusAsset] = useState([]);
    const getUser = async() => {
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
    const getKondisi = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const result = await api.get(apiUrl + "/asset-manajemen/get-kondisi", {
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
                setKondisi(ls)
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
    const getKategori = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const result = await api.get(apiUrl + "/asset-manajemen/get-kategori", {
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
                            value: datas.nama_kategori,
                            label: datas.nama_kategori,
                            kode: datas.kode_kategori
                        })
                    }

                }
                setKategori(ls)
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
    const getStatusAsset = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const result = await api.get(apiUrl + "/asset-manajemen/get-status", {
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
                setStatusAsset(ls)
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
        fm.append("id_user", dataAsset.id_user);
        fm.append("kode_asset", dataAsset.kode_asset);
        fm.append("nama_asset", dataAsset.nama_asset);
        fm.append("kategori", dataAsset.kategori);
        fm.append("lokasi", dataAsset.lokasi);
        fm.append("nilai_perolehan", dataAsset.nilai_perolehan);
        fm.append("tanggal_perolehan", dataAsset.tanggal_perolehan);
        fm.append("kondisi", dataAsset.kondisi);
        fm.append("status_asset", dataAsset.status_asset);
        fm.append("deskripsi_asset", dataAsset.deskripsi_asset);
        fm.append("foto", dataAsset.foto);
        fm.append("nilai_saat_ini", dataAsset.nilai_saat_ini);
        fm.append("umur_ekonomis", dataAsset.umur_ekonomis);
         try {
            const result = await api.post(apiUrl + "/asset-manajemen/create-asset", fm, {
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
        if(openModal.open){
            getUser();
            getKondisi();
            getKategori();
            getStatusAsset();
        }
    },[openModal])

    return(
        <Modal size="lg" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Tambah Asset</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">
                             <Col xl={6}>
                              <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Kategori <span style={{ color: "red" }}>*</span> </Form.Label>
                                    <Select name="state" className="basic-multi-select " options={kategori} isSearchable
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Kategori" onChange={(e) => setDataAsset({...dataAsset, kategori: e.value, kode_asset: e.kode})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Kode Asset<span style={{ color: "red" }}>*</span> </Form.Label>
                                    <Form.Control type="text" placeholder="Kode Asset" value={dataAsset.kode_asset} disabled/>
                                </Form.Group>
                            </Col>
                           
                            {/* <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Pemilik</Form.Label>
                                    <Form.Control type="text" placeholder="Kode Asset" value={dataAsset.id_user} onChange={(e) => setDataAsset({...dataAsset, id_user: e.target.value})} />
                                </Form.Group>
                            </Col> */}
                             <Col xl={6}>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Penanggung Jawab <span style={{ color: "red" }}>*</span> </Form.Label>
                                    <Select name="state" className="basic-multi-select " options={user} isSearchable
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Penanggung Jawab" onChange={(e) => setDataAsset({...dataAsset, id_user: e.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Nama Asset <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Nama Asset" value={dataAsset.nama_asset} onChange={(e) => setDataAsset({...dataAsset, nama_asset: e.target.value})} />
                                </Form.Group>
                            </Col>
                            {/* <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Kategori <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Kategori" onChange={(e) => setDataAsset({...dataAsset, kategori: e.target.value})} />
                                </Form.Group>
                            </Col> */}
                            {/* <Col xl={6}>
                                <div className="row gy-2 pb-3">
                                    <label htmlFor="nama-proyek" className="form-label ">Kategori<span style={{ color: "red" }}>*</span> :</label>
                                    <Select name="state" className="basic-multi-select " options={kategori} isSearchable
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Kategori" onChange={(e) => setDataAsset({...dataAsset, kategori: e.value})}
                                    />
                                </div>
                            </Col> */}

                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Lokasi <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Lokasi" value={dataAsset.lokasi} onChange={(e) => setDataAsset({...dataAsset, lokasi: e.target.value})} />
                                </Form.Group>
                            </Col>

                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Nilai Perolehan <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Nilai Perolehan" value={dataAsset.nilai_perolehan} onChange={(e) => setDataAsset({...dataAsset, nilai_perolehan: e.target.value})} />
                                </Form.Group>
                            </Col>
                            {/* <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Tanggal Perolehan</Form.Label>
                                    <Form.Control type="text" placeholder="Tanggal Perolehan" value={dataAsset.tanggal_perolehan} onChange={(e) => setDataAsset({...dataAsset, tanggal_perolehan: e.target.value})} />
                                </Form.Group>
                            </Col> */}
                            <Col xl={6}>
                                <label htmlFor="nama-proyek" className="form-label ">Tanggal Perolehan <span style={{ color: "red" }}>*</span> :</label>
                                {/* <input type="text" className={`form-control`} id="tanggal_awal_kontrak" placeholder="Tanggal Awal Kontrak" /> */}
                                <Flatpickr
                                    className="form-control"
                                    value={dataAsset.tanggal_perolehan ?? ""}
                                    options={{
                                        dateFormat: "Y-m-d",
                                        enableTime: false,
                                        time_24hr: false,
                                    }}
                                    onChange={(val, valStr) =>  setDataAsset({ ...dataAsset, tanggal_perolehan: valStr })}
                                    // onChange={(val,valStr) => {
                                    // 	console.log(valStr)
                                    // }}
                                    placeholder="Tanggal Perolehan"
                                />
                            </Col>
                            {/* <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Kondisi <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="kondisi" value={dataAsset.kondisi} onChange={(e) => setDataAsset({...dataAsset, kondisi: e.target.value})} />
                                </Form.Group>
                            </Col> */}
                            <Col xl={6}>
                               <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Kondisi <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Select name="state" className="basic-multi-select " options={kondisi} isSearchable
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Kondisi" onChange={(e) => setDataAsset({...dataAsset, kondisi: e.value})}
                                    />
                                </Form.Group>
                            </Col>
                             {/* <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Status Asset <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Status Asset" value={dataAsset.status_asset} onChange={(e) => setDataAsset({...dataAsset, status_asset: e.target.value})} />
                                </Form.Group>
                            </Col> */}
                            <Col xl={6}>
                              <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Status Asset <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Select name="state" className="basic-multi-select " options={statusAsset} isSearchable
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Status Asset" onChange={(e) => setDataAsset({...dataAsset, status_asset: e.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Nilai Perolehan Saat Ini <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Nilai Perolehan Saat Ini" value={dataAsset.nilai_saat_ini} onChange={(e) => setDataAsset({...dataAsset, nilai_saat_ini: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Deskripsi Asset <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Deskripsi Asset" value={dataAsset.deskripsi_asset} onChange={(e) => setDataAsset({...dataAsset, deskripsi_asset: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Foto Asset <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="file" placeholder="Foto Asset" onChange={(e) => setDataAsset({...dataAsset, foto: e.target.files[0]})} />
                                </Form.Group>
                            </Col>
                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Umur Ekonomis <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Umur Ekonomis" value={dataAsset.umur_ekonomis} onChange={(e) => setDataAsset({...dataAsset, umur_ekonomis: e.target.value})} />
                                </Form.Group>
                            </Col>
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

export default CreateAsset;