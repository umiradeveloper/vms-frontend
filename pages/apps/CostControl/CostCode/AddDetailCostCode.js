


import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const Select = dynamic(() => import("react-select"), { ssr: false });

const AddDetailCostCode = ({openModal, setOpenModal, loader, setLoader}) => {
    const [kategori, setKategori] = useState([]);
    const [satuan, setSatuan] = useState([]);
    const [dataSubmit, setDataSubmit] = useState({
            kode: "",
            kategori: "",
            kode_kategori: "",
            klasifikasi: "",
            kode_jenis: "",
            spesifikasi: "",
            jenis: "",
            nama: "",
            satuan: "",

    });
    const getKategori = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Kategori/get-kategori", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result)
            if(result.status == 200){
                 if(result.data.data.length > 0){
                    const kategoriArr = [];
                    for(const res of result.data.data){
                        kategoriArr.push({
                            value: res.id_kategori,
                            label: res.kode_kategori+" | "+res.nama_kategori
                        })
                    }
                    setKategori(kategoriArr);
                    setLoader(false);
                }
            }
            // console.log(result)
        } catch (error) {
            console.log(error);
        }
    }
    const getSatuan = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Satuan/get-satuan", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result)
            if(result.status == 200){
                 if(result.data.data.length > 0){
                    const satuanArr = [];
                    for(const res of result.data.data){
                        satuanArr.push({
                            value: res.id_satuan,
                            label: res.kode_satuan+" | "+res.nama_satuan
                        })
                    }
                    setSatuan(satuanArr);
                    setLoader(false);
                }
            }
            // console.log(result)
        } catch (error) {
            console.log(error);
        }
    }

    const submitData = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        console.log(dataSubmit)
        try {
            const result = await apiConfig.post(apiUrl + "/CostControl/Cost-Code/create-single-cost-code", dataSubmit,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                setLoader(false);
                swalAlert(result.data.message, result.statusText, "success");
                setOpenModal({...openModal, open: false})
            }
        }catch (error) {
            setLoader(false);
            console.log(error);
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
        getKategori();
        getSatuan()
    },[openModal.open])

    return(
        <Modal size="md" show={openModal.open} onHide={() => {setOpenModal({...openModal, open: false})}}>
            
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Tambah Cost Code</h6>
            </Modal.Header>
            <Modal.Body>
                 <Row>
                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">
                            
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Cost Code / Kode<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="cost_code" placeholder="Cost Code / Kode" onChange={(e) => setDataSubmit({...dataSubmit, kode: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Kategori<span style={{ color: "red" }}>*</span> :</label>
                                <Select name="state"  className="basic-multi-select " options={kategori} isSearchable
                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Kategori" onChange={(e) => {
                                        const splitE = e.label.split("|");
                                        setDataSubmit({...dataSubmit,
                                            kategori: splitE[1],
                                            kode_kategori: splitE[0]
                                        });
                                    }}
                                />
                            </Col>
                             <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Klasifikasi<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="klasifikasi" placeholder="Klasifikasi" onChange={(e) => setDataSubmit({...dataSubmit, klasifikasi: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Kode Jenis<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="kode_jenis" placeholder="Kode Jenis" onChange={(e) => setDataSubmit({...dataSubmit, kode_jenis: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Spesifikasi<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="spesifikasi" placeholder="Spesifikasi" onChange={(e) => setDataSubmit({...dataSubmit, spesifikasi: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Jenis<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="jenis" placeholder="Jenis" onChange={(e) => setDataSubmit({...dataSubmit, jenis: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Nama<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nama" placeholder="Nama" onChange={(e) => setDataSubmit({...dataSubmit, nama: e.target.value})}/>
                            </Col>
                            <Col xl={12}>
                                 <label htmlFor="nama-proyek" className="form-label ">Satuan<span style={{ color: "red" }}>*</span> :</label>
                                    <Select name="state"  className="basic-multi-select " options={satuan} isSearchable
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Satuan" onChange={(e) => {
                                            const splitE = e.label.split("|");
                                            setDataSubmit({...dataSubmit,
                                                satuan: splitE[1]
                                            });
                                        }}
                                    />
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={submitData}>Tambah</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(AddDetailCostCode), { ssr: false });