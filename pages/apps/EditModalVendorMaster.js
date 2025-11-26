import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button, Col, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import LoadersSimUmira from "./Component/LoaderSimUmira";
const Select = dynamic(() => import("react-select"), { ssr: false });

const EditModalVendorMaster = ({open, setOpen, loader, setLoader}) => {
    const [selectedOptionsKategori, setSelectedOptionsKategori] = useState([{ value: "Pondasi", label: "Pondasi" },{ value: "Pekerjaan tanah", label: "Pekerjaan tanah" },{ value: "Struktur", label: "Struktur" }, { value: "Arsitektur", label: "Arsitektur" }, { value: "Mep", label: "Mep" }, { value: "Interior", label: "Interior" }, { value: "Facade", label: "Facade" }, { value: "Landscape", label: "Landscape" }, { value: "Pekerjaan tanah", label: "Infrastruktur" }, { value: "Lain Lainnya", label: "Lain Lainnya" }]);
	const [selectedOptionsKlasifikasi, setSelectedOptionsKlasifikasi] = useState([{ value: "Pabrik", label: "Pabrik" },{ value: "Distributor", label: "Distributor" }, { value: "Agent", label: "Agent" }, { value: "Toko / Retail", label: "Toko / Retail" }, { value: "Mandor / Pemborong", label: "Mandor / Pemborong" }, { value: "Sub Kontraktor", label: "Sub Kontraktor" }, { value: "Main Kontraktor", label: "Main Kontraktor" }, { value: "General Kontraktor", label: "General Kontraktor" },{ value: "Workshop", label: "Workshop" }, { value: "Rental", label: "Rental" }, { value: "Lain Lain", label: "Lain Lain" }]);
    const router = useRouter();
    const [appStatus, setAppStatus] = useState(true);
    const [dataVendor, setDataVendor] = useState({
        id_vendor:'',
        nama_perusahaan:'',
        id_kualifikasi_usaha:'',
        klasifikasi_usaha:'',
        alamat_perusahaan:'',
        kategori:'',
        spesialis:'',
        nama_pic:'',
        email_pic:'',
        no_hp_pic:'',
        nama_direktur:'',
        email_direktur:'',
        no_hp_direktur:'',
        website:''
                // id_vendor: open.data_detail?.id_vendor,
                // nama_perusahaan: open.data_detail?.nama_perusahaan,
                // id_kualifikasi_usaha: open.data_detail.kualifikasi_usaha?.kualifikasi,
                // klasifikasi_usaha: open.data_detail?.klasifikasi_usaha,
                // alamat_perusahaan: open.data_detail?.alamat_perusahaan,
                // kategori: open.data_detail?.kategori,
                // spesialis: open.data_detail?.spesialisasi,
                // nama_pic: open.data_detail?.nama_pic,
                // email_pic: open.data_detail?.email_pic,
                // no_hp_pic: open.data_detail?.no_hp_pic,
                // nama_direktur: open.data_detail?.nama_direktur,
                // email_direktur: open.data_detail?.email_direktur,
                // no_hp_direktur: open.data_detail?.no_hp_direktur,
                // website: open.data_detail?.website
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;

        // update data
        setDataVendor((prev) => ({ ...prev, [id]: value }));

        // validate
        const errorMsg = validateField(id, value);
        setErrors((prev) => ({ ...prev, [id]: errorMsg }));
    }
    
    const validateField = (name, value) => {
        let error = "";

        if (name === "alamat_perusahaan") {
            if (!value.trim()) {
            error = "Alamat Perusahaan wajib diisi";
            } else if (value.length < 3) {
            error = "Minimal 3 karakter";
            }
        }
        if (name === "spesialis") {
            if (!value.trim()) {
            error = "Spesialisasi wajib diisi";
            } else if (value.length < 3) {
            error = "Minimal 3 karakter";
            }
        }
        if (name === "nama_pic") {
            if (!value.trim()) {
            error = "Nama PIC wajib diisi";
            } else if (value.length < 3) {
            error = "Minimal 3 karakter";
            }
        }
        if (name === "nama_direktur") {
            if (!value.trim()) {
            error = "Nama Direktur wajib diisi";
            } else if (value.length < 3) {
            error = "Minimal 3 karakter";
            }
        }
        if (name === "email_pic") {
            if (!value.trim()) {
            error = "Email PIC wajib diisi";
            } else if (value.length < 3) {
            error = "Minimal 3 karakter";
            }
        }
        if (name === "email_direktur") {
            if (!value.trim()) {
            error = "Email Direktur wajib diisi";
            } else if (value.length < 3) {
            error = "Minimal 3 karakter";
            }
        }
        if (name === "no_hp_pic") {
            if (!value.trim()) {
            error = "No Handphone PIC wajib diisi";
            } else if (value.length < 3) {
            error = "Minimal 3 karakter";
            }
        }
        if (name === "no_hp_direktur") {
            if (!value.trim()) {
            error = "No Handphone Direktur wajib diisi";
            } else if (value.length < 3) {
            error = "Minimal 3 karakter";
            }
        }

        if (name === "website") {
            if (!value.trim()) {
            error = "Website wajib diisi";
            } else if (value.length < 3) {
            error = "Minimal 3 karakter";
            }
        }

        return error;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        let newErrors = {};
        Object.keys(dataVendor).forEach((field) => {
            const errorMsg = validateField(field, dataVendor[field]);
            if (errorMsg) newErrors[field] = errorMsg;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            // stop submit
            return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			setLoader(true);
			try {
				const response = await axios.post(apiUrl+"/vms/create-vendor-update?id="+dataVendor.id_vendor, dataVendor,{
					headers:{
						"Content-Type":"application/json",
						"Authorization": "Bearer "+localStorage.getItem("token")
					}
				});
				const data = response.data.data;
				if(data){
					// console.log(data);
					
					// setSelectedOptions(kualifikasiArr);
					// setTableData(userArr);
					// swalAlert("Pengajuan Vendor Terkirim", "Register Vendor", "success");
					// const upload = await uploadDaftarVendor(data.id_vendor);
					// if(upload){
						setLoader(false);
						swalAlert("Pengajuan Edit Vendor Terkirim", "Register Vendor", "success");
                        setOpen({...open, open_modal: false});
                        setAppStatus(true);
						// router.reload("/apps/ListVendorMaster");
					// }
					
				}
				
			} catch (error) {
				console.log(error);
				// setError(error.message);
				if(error.status == 401){
					localStorage.removeItem("token");
					localStorage.removeItem("menu");
					localStorage.removeItem("user");
					router.push("/apps/LoginRegister");
				}
				setLoader(false);
				if(error.status == 400){
					for(const a of error.response.data.violations){
						swalAlert(a.message, error.status, "error");
					}
				}
				// swalAlert(error.message, error.status, "error");
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
        // console.log("open ")
        // setLoader(true);
        // if(open.data_detail){
             setDataVendor({
                id_vendor: open.data_detail?.id_vendor,
                nama_perusahaan: open.data_detail?.nama_perusahaan,
                id_kualifikasi_usaha: open.data_detail.kualifikasi_usaha?.kualifikasi,
                klasifikasi_usaha: open.data_detail?.klasifikasi_usaha,
                alamat_perusahaan: open.data_detail?.alamat_perusahaan,
                kategori: open.data_detail?.kategori,
                spesialis: open.data_detail?.spesialisasi,
                nama_pic: open.data_detail?.nama_pic,
                email_pic: open.data_detail?.email_pic,
                no_hp_pic: open.data_detail?.no_hp_pic,
                nama_direktur: open.data_detail?.nama_direktur,
                email_direktur: open.data_detail?.email_direktur,
                no_hp_direktur: open.data_detail?.no_hp_direktur,
                website: open.data_detail?.website
            })
        //     setLoader(false);
        // }
       
    },[appStatus, open.open_modal])
    return(
        <Modal show={open.open_modal} onHide={() => setOpen({...open, open_modal: false})} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            
            <Modal.Header closeButton>
                <h6 className="modal-title" id="exampleModalLabel">Detail Vendor</h6>
            </Modal.Header>
            <Modal.Body className="">
                <div className="row gy-2 pb-3">
                    <Col xl={12}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nama Perusahaan :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama Perusahaan" value={dataVendor.nama_perusahaan} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Kualifikasi Usaha:</label>
                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Kualifikasi Usaha" value={dataVendor.id_kualifikasi_usaha} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Klasifikasi Usaha:</label>
                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Klasifikasi Usaha" /> */}
                        <Select name="state" options={selectedOptionsKlasifikasi} className="basic-multi-select " isSearchable menuPlacement='auto' classNamePrefix="Select2" value={selectedOptionsKlasifikasi.find((opt) => opt.value === dataVendor.klasifikasi_usaha)}/>
                    </Col>
                    <Col xl={12}>
                        <label htmlFor="contact-address-lastname" className="form-label ">Alamat Perusahaan :</label>
                        <textarea type="text" className={`form-control ${errors.alamat_perusahaan ? "is-invalid" : ""}`} id="alamat_perusahaan" placeholder="Alamat Perusahaan" onChange={handleChange} value={dataVendor.alamat_perusahaan}/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Kategori :</label>
                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Kategori" /> */}
                        <Select name="state" options={selectedOptionsKategori} className="basic-multi-select " isSearchable menuPlacement='auto' classNamePrefix="Select2" value={selectedOptionsKategori.find((opt) => opt.value === dataVendor.kategori)} />
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Spesialisasi :</label>
                        <input type="text" className={`form-control ${errors.spesialis ? "is-invalid" : ""}`} id="spesialis" onChange={handleChange} placeholder="Spesialisasi" value={dataVendor.spesialis} />
                    </Col>
                    
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nama PIC :</label>
                        <input type="text" className={`form-control ${errors.nama_pic ? "is-invalid" : ""}`} id="nama_pic" onChange={handleChange} placeholder="Nama PIC" value={dataVendor.nama_pic}/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nama Direktur :</label>
                        <input type="text" className={`form-control ${errors.nama_direktur ? "is-invalid" : ""}`} id="nama_direktur" onChange={handleChange} placeholder="Nama Direktur" value={dataVendor.nama_direktur}/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Email PIC :</label>
                        <input type="text" className={`form-control ${errors.email_pic ? "is-invalid" : ""}`} id="email_pic" onChange={handleChange} placeholder="Email PIC" value={dataVendor.email_pic}/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Email Direktur :</label>
                        <input type="email" className={`form-control ${errors.email_direktur ? "is-invalid" : ""}`} id="email_direktur" onChange={handleChange} placeholder="Email Direktur" value={dataVendor.email_direktur}/>
                    </Col>
                    
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nomor Handphone PIC :</label>
                        <input type="text" className={`form-control ${errors.no_hp_pic ? "is-invalid" : ""}`} id="no_hp_pic" onChange={handleChange} placeholder="No Handphone PIC" value={dataVendor.no_hp_pic}/>
                    </Col>
                    
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nomor Handphone Direktur :</label>
                        <input type="text" className={`form-control ${errors.no_hp_direktur ? "is-invalid" : ""}`} id="no_hp_direktur" onChange={handleChange} placeholder="Nomor Handphone Direktur" value={dataVendor.no_hp_direktur}/>
                    </Col>
                    <Col xl={12}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Website :</label>
                        <input type="text" className={`form-control ${errors.website ? "is-invalid" : ""}`} id="website" onChange={handleChange} placeholder="Website" value={dataVendor.website}/>
                    </Col>
                    <hr  className="mt-3"/>
                     <Col xl={12}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Catatan :</label>
                        <textarea type="text" className={`form-control ${errors.catatan ? "is-invalid" : ""}`} id="catatan" onChange={handleChange} placeholder="Alasan update vendor"/>
                    </Col>
                   
                    
                    
                </div>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-primary" onClick={handleSubmit}>Update</Button>
                <Button variant='contained' type="button" className="btn btn-secondary" onClick={() => setOpen({...open, open_modal: false})} data-bs-dismiss="modal">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}


export default dynamic(() => Promise.resolve(EditModalVendorMaster), { ssr: false });