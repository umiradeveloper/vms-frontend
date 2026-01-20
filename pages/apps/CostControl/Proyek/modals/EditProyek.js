
import { Button, Col, Modal, Row } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useEffect, useState } from "react";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";
import dynamic from "next/dynamic";


const EditProyek = ({openModal, setOpenModal, loader, setLoader}) => {
    const [valueRab, setValueRab] = useState("");
    const [valueRap, setValueRap] = useState("");
    const [data, setData] = useState({
        nama_proyek: "",
        kode_proyek: "",
        deskripsi_proyek: "",
        tanggal_awal_kontrak: "",
        tanggal_akhir_kontrak: "",
        kerja_tambah:"",
        kerja_kurang:""
    })
    const handleChangeRab = (e) => {
		let val = e.target.value.replace(/[^\d]/g, ""); // hanya angka
		val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
		setValueRab(val);
	};
	const handleChangeRap = (e) => {
		let val = e.target.value.replace(/[^\d]/g, ""); // hanya angka
		val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
		setValueRap(val);
	};
    const submit = async() => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const dataSubmit = {
                nama_proyek: data.nama_proyek,
                kode_proyek: data.kode_proyek,
                deskripsi_proyek: data.deskripsi_proyek,
                tanggal_awal_kontrak: data.tanggal_awal_kontrak,
                tanggal_akhir_kontrak: data.tanggal_akhir_kontrak,
                biaya_rap: parseInt(cleanCurrency(valueRap)),
                biaya_rab: parseInt(cleanCurrency(valueRab))
            };
            const result = await apiConfig.patch(apiUrl + "/CostControl/Proyek/update-proyek?id="+openModal.id_proyek, dataSubmit,{
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			});
            // console.log(result);
            if(result.status == 200){
                setLoader(false);
                setOpenModal({...openModal, open_modal: false});
			    swalAlert(result.data.message, result.statusText, "success");
            }
           
				// resetData();
        }catch(error){
            console.log("e = "+error)
            setLoader(false);
			swalAlert(error.message, error.code, "error");
        }
    }

    const getDataById = async() =>{
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek-id?id="+openModal.id_proyek, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			});
            if(result.status){
                setData({
                    nama_proyek: result.data.data.nama_proyek,
                    kode_proyek: result.data.data.kode_proyek,
                    deskripsi_proyek: result.data.data.deskripsi_proyek,
                    tanggal_awal_kontrak: (result.data.data.tanggal_awal_kontrak)?result.data.data.tanggal_awal_kontrak:"",
                    tanggal_akhir_kontrak: (result.data.data.tanggal_akhir_kontrak)?result.data.data.tanggal_akhir_kontrak:""
                });
                setValueRap((result.data.data.biaya_rap)?toCurrency(result.data.data.biaya_rap):"");
                setValueRab((result.data.data.biaya_rab)?toCurrency(result.data.data.biaya_rab):"");
                setLoader(false);
            }
            // console.log(result) 
        }catch(error){
            setLoader(false)
            console.log("e = "+error);
        }
    }
    const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
    };
    const cleanCurrency = (value) => {
        if (!value) return 0;

        return Number(
            value
            .replace(/[^0-9]/g, "") // hapus semua selain angka
        );
    };

    const handleChangeKerjaTambah = (e) => {
		let val = e.target.value.replace(/[^\d]/g, ""); // hanya angka
		val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
		setData({...data, kerja_tambah: val});
	};
	const handleChangeKerjaKurang = (e) => {
		let val = e.target.value.replace(/[^\d]/g, ""); // hanya angka
		val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
		setData({...data, kerja_kurang: val});
	};

    useEffect(() => {
        // console.log(openModal.id_proyek)
        if(openModal.open_modal){
            getDataById();
        }
        

    },[openModal.open_modal]);
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

    return(
        <Modal size="md" show={openModal.open_modal} onHide={() => setOpenModal({...openModal, open_modal: false})} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <LoadersSimUmira open={loader} />
            <Modal.Header closeButton>
                <h6 className="modal-title" id="exampleModalLabel">Edit Proyek</h6>
            </Modal.Header>
            <Modal.Body className="">
                 <Row>
                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">
                            <Col xl={12}>
                                <label htmlFor="kode-proyek" className="form-label ">Kode Proyek <span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="kode_proyek" placeholder="Kode Proyek" value={data.kode_proyek} onChange={(val) => setData({ ...data, kode_proyek: val.target.value })} />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Nama Proyek <span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nama_proyek" placeholder="Nama Proyek" value={data.nama_proyek} onChange={(val) => setData({ ...data, nama_proyek: val.target.value })} />
                            </Col>

                            <Col xl={12}>
                                <label htmlFor="desc-proyek" className="form-label ">Deskripsi Proyek <span style={{ color: "red" }}>*</span> :</label>
                                <textarea rows={4} type="text" className={`form-control`} id="desc_proyek" placeholder="Deskripsi Proyek" value={data.deskripsi_proyek} onChange={(val) => setData({ ...data, deskripsi_proyek: val.target.value })} />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Tanggal Awal Kontrak <span style={{ color: "red" }}>*</span> :</label>
                                {/* <input type="text" className={`form-control`} id="tanggal_awal_kontrak" placeholder="Tanggal Awal Kontrak" /> */}
                                <Flatpickr
                                    className="form-control"
                                    value={data.tanggal_awal_kontrak}
                                    options={{
                                        dateFormat: "Y-m-d",
                                    }}
                                    onChange={(val, valStr) => setData({ ...data, tanggal_awal_kontrak: valStr })}
                                    // onChange={(val,valStr) => {
                                    // 	console.log(valStr)
                                    // }}
                                    placeholder="Tanggal Awal Kontrak"
                                />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Tanggal Akhir Kontrak <span style={{ color: "red" }}>*</span> :</label>
                                {/* <input type="text" className={`form-control`} id="tanggal_akhir_kontrak" placeholder="Tanggal Akhir Kontrak" /> */}
                                <Flatpickr
                                    className="form-control"
                                    value={data.tanggal_akhir_kontrak}
                                    options={{
                                        dateFormat: "Y-m-d",
                                    }}
                                    onChange={(val, valStr) => setData({ ...data, tanggal_akhir_kontrak: valStr })}
                                    placeholder="Tanggal Akhir Kontrak"
                                />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Total RAB (Rincian Anggaran Biaya) <span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="rab" placeholder="Rincian Anggaran Biaya" onChange={handleChangeRab} value={valueRab ? `${valueRab}` : ""} />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Total RAP (Rincian Anggaran Proyek) <span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="rap" placeholder="Rincian Anggaran Proyek" onChange={handleChangeRap} value={valueRap ? `${valueRap}` : ""} />
                            </Col>
                           
                        </div>
                       
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={submit}>Update</Button>
                <Button variant='contained' type="button" className="btn btn-secondary" 
                    data-bs-dismiss="modal" onClick={() => setOpenModal({...openModal, open_modal: false})}>Close</Button>
           
            </Modal.Footer>
        </Modal>
    )


}

export default dynamic(() => Promise.resolve(EditProyek), { ssr: false });