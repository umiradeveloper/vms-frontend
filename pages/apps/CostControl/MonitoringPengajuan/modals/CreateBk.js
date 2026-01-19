import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
const Select = dynamic(() => import("react-select"), { ssr: false });


const CreateBk = ({openModal, setOpenModal}) => {
    const [loader, setLoader] = useState(false);
    const [rapa, setRapa] = useState([]);
    const [dataBk , setDataBk] = useState({
        id_proyek:"",
        id_rapa:"",
        nama_vendor:"",
        volume_bk:"",
        harga_total:"",
        nama_penerima:"",
        tanggal_penerima: ""
    });

    const getRapa = async() => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Rapa/get-rapa-proyek?id_proyek="+openModal.id_proyek, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			});
            if(result.status == 200){
                if(result.data.data.length > 0){
                    const rapaArr = [];
                    for(const res of result.data.data){
                        rapaArr.push({
                            value: res.id_rapa,
                            label: res.kode_rap+" | "+res.kategori+" | "+res.item_pekerjaan
                        })
                    }
                    setRapa(rapaArr);
                }
                
                // console.log(result.data)
                setLoader(false);
            }
        }catch(e){
            setLoader(false);
            console.log("e = "+e);
        }
    }

    const submitDataBk = async() => {
        setLoader(true);
        // console.log(openModal)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const dataSubmit = {
            id_proyek: openModal.id_proyek,
            id_rapa: dataBk.id_rapa,
            nama_vendor: dataBk.nama_vendor,
            volume_bk: dataBk.volume_bk,
            harga_total: cleanCurrency(dataBk.harga_total),
            nama_penerima: dataBk.nama_penerima,
            tanggal_penerima: dataBk.tanggal_penerima
        }
        
        try {
            const result = await apiConfig.post(apiUrl + "/CostControl/BiayaKonstruksi/create-bk", dataSubmit,{
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			});
            if(result.status == 200){
               
                
                // console.log(result)
                swalAlert(result.data.message, result.statusText, "success");

                setLoader(false);
                setOpenModal({...openModal, open_modal: false});
            }
        }catch(e){
            setLoader(false);
            console.log("e = "+e);
        }
    }
    const cleanCurrency = (value) => {
        if (!value) return 0;

        return Number(
            value
                .replace(/[^0-9]/g, "") // hapus semua selain angka
        );
    };
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
    const changeFormatCurrency = (e) => {
		let val = e.replace(/[^\d]/g, ""); // hanya angka
		val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
		return val;
	};
    useEffect(() => {
        if(openModal.open_modal){
            getRapa();
        }
        
    },[openModal.open_modal])
    return(
        <Modal size="md" show={openModal.open_modal} onHide={() => setOpenModal({ ...openModal, open_modal: false })} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <LoadersSimUmira open={loader} />
            <Modal.Header closeButton>
                <h6 className="modal-title" id="exampleModalLabel">Tambah Biaya Kontruksi</h6>
            </Modal.Header>
            <Modal.Body className="">
                <Row>
                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">
                            
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">RAPA <span style={{ color: "red" }}>*</span> :</label>
                                {/* <input type="text" className={`form-control`} id="id_rapa" placeholder="Rapa" value={dataBk.id_rapa} onChange={(e) => setDataBk({ ...dataBk, id_rapa: e.target.value })} /> */}
                                <Select name="state" options={rapa} className="basic-multi-select " isSearchable
                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Rapa" onChange={(e) => setDataBk({...dataBk, id_rapa: e.value})}
                                />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Nama Vendor<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nama_vendor" placeholder="Nama Vendor" value={dataBk.nama_vendor} onChange={(e) => setDataBk({ ...dataBk, nama_vendor: e.target.value })} />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Tanggal Penerimaan <span style={{ color: "red" }}>*</span> :</label>
                                {/* <input type="text" className={`form-control`} id="tanggal_awal_kontrak" placeholder="Tanggal Awal Kontrak" /> */}
                                <Flatpickr
                                    className="form-control"
                                    value={dataBk.tanggal_penerima}
                                    options={{
                                        dateFormat: "Y-m-d\\TH:i:S",
                                        enableTime: true,
                                        time_24hr: true,
                                    }}
                                    onChange={(val, valStr) => setDataBk({ ...dataBk, tanggal_penerima: valStr })}
                                    // onChange={(val,valStr) => {
                                    // 	console.log(valStr)
                                    // }}
                                    placeholder="Tanggal Penerimaan"
                                />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Nama Penerima<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nama_penerima" placeholder="Nama Penerima" value={dataBk.nama_penerima} onChange={(e) => setDataBk({ ...dataBk, nama_penerima: e.target.value })} />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Volume<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="volume" placeholder="Nama Penerima" value={dataBk.volume_bk} onChange={(e) => setDataBk({ ...dataBk, volume_bk: e.target.value })} />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Harga Total<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="harga_total" placeholder="Harga Total" value={dataBk.harga_total} onChange={(e) => setDataBk({ ...dataBk, harga_total: changeFormatCurrency(e.target.value) })} />
                            </Col>

                            
                        </div>

                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={submitDataBk}>Tambah</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open_modal: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    );

}

export default CreateBk;