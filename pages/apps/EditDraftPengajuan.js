
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row, Modal } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import { layout1, layout10, layout11, layout12, layout2, layout3, layout4, layout5, layout6, layout7, layout8, layout9 } from "@/shared/data/prismdata/formsdata";
import ShowCode from "@/shared/showcode/showcode";
import PageHeaderVms from "./Component/PageHeaderVms";
import dynamic from "next/dynamic";
import { Selectoption1 } from "@/shared/data/forms/select2data";
import FormIndividu from "./FormComponent/FormIndividu";
import FormMenengah from "./FormComponent/FormMenengah";
import FormBesar from "./FormComponent/FormBesar";
import LoadersSimUmira from "./Component/LoaderSimUmira";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
const Select = dynamic(() => import("react-select"), { ssr: false });
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const FormEditDraftVms = () => {
        // const [id, setId] = useState();
        const [selectedOptions, setSelectedOptions] = useState([{ value: "kecil", label: "Kecil/Non BU" },{ value: "menengah", label: "Menengah/BU" }, { value: "besar", label: "Besar/BU" }]);
        const [selectedOptionsKategori, setSelectedOptionsKategori] = useState([{ value: "Pondasi", label: "Pondasi" },{ value: "Pekerjaan tanah", label: "Pekerjaan tanah" },{ value: "Struktur", label: "Struktur" }, { value: "Arsitektur", label: "Arsitektur" }, { value: "Mep", label: "Mep" }, { value: "Interior", label: "Interior" }, { value: "Facaad", label: "Facaad" }, { value: "Landscape", label: "Landscape" }, { value: "Pekerjaan tanah", label: "Infrastruktur" }, { value: "Lain Lainnya", label: "Lain Lainnya" }]);
        const [selectedOptionsKlasifikasi, setSelectedOptionsKlasifikasi] = useState([{ value: "Pabrik", label: "Pabrik" },{ value: "Distributor", label: "Distributor" }, { value: "Agent", label: "Agent" }, { value: "Toko / Retail", label: "Toko / Retail" }, { value: "Mandor / Pemborong", label: "Mandor / Pemborong" }, { value: "Sub Kontraktor", label: "Sub Kontraktor" }, { value: "Main Kontraktor", label: "Main Kontraktor" }, { value: "Workshop", label: "Workshop" }, { value: "Rental", label: "Rental" }, { value: "Lain Lain", label: "Lain Lain" }]);
        const [selectKualifikasiUsaha, setSelectKualifikasiUsaha] = useState(null);
        const [loader, setLoader] = useState();
        const router = useRouter();
        const [form, setForm] = useState([]);
        const [appStatus, setAppStatus] = useState(true);
         const [files, setFiles] = useState([]);
         const [filesBefore, setFileBefore] = useState([]);
         const [frameSrc, setFrameSrc] = useState();
         const [idDetailDok, setIdDetailDok] = useState();
         const [vendorData, setVendorData] = useState({
            nama_perusahaan:'',
            id_kualifikasi_usaha:'',
            nama_kualifikasi_usaha:'',
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
            website:'',
            catatan:''
         })
         const [modalDokumen, setModalDokumen] = useState({
                openDokumen: false,
                id_dok: ""
        });
        // const handleSelectChange = (selected) => {
        //     // Define your maximum selection limit (e.g., 2 in this example)
        //     const maxSelections = 3;
    
        //     if (selected && selected.length <= maxSelections) {
        //         setSelectedOptions(selected);
        //     }
        // };
        
        const handleSelectKualifikasiUsaha = async(select) => {
            // console.log(select.value);
            // setSelectKualifikasiUsaha(select.value);
            setVendorData({...vendorData, id_kualifikasi_usaha: select.value});
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            setLoader(true);
            try {
                const response = await axios.get(apiUrl+"/access-document/all-id-kualifikasi", {
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": "Bearer "+localStorage.getItem("token")
                    },
                    params:{
                        id: select.value
                    }
                });
                const data = response.data.data;
                if(data){
                    console.log(data);
                    
                    setForm(data);
                    // setTableData(userArr);
                    setLoader(false);
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
                swalAlert(error.message, error.status, "error");
            }

        }

        const getKualifikasiUsaha = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            setLoader(true);
            try {
                const response = await axios.get(apiUrl+"/mst-kualifikasi/all", {
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": "Bearer "+localStorage.getItem("token")
                    }
                });
                const data = response.data.data;
                if(data){
                    // console.log(data);
                    const kualifikasiArr = [];
                    for await (const user of data){
                    
                        kualifikasiArr.push({
                            value: user.id_mst_kualifikasi,
                            label: user.kualifikasi,
                            
                        })
                    }
                    setSelectedOptions(kualifikasiArr);
                    // setTableData(userArr);
                    setLoader(false);
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
                swalAlert(error.message, error.status, "error");
            }
        }

        const getVendorById = async (id) => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            setLoader(true);
            try {
                const response = await axios.get(apiUrl+"/vms/draft-pengajuan-vendor-id", {
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": "Bearer "+localStorage.getItem("token")
                    },
                    params:{
                        id: id
                    }
                });
                const data = response.data.data;
                if(data){
                    // console.log(data);
                    setVendorData({...vendorData,
                        nama_perusahaan: data.nama_perusahaan,
                        id_kualifikasi_usaha: data.kualifikasi_usaha.id_mst_kualifikasi,
                        nama_kualifikasi_usaha: data.kualifikasi_usaha.kualifikasi,
                        klasifikasi_usaha: data.klasifikasi_usaha,
                        alamat_perusahaan: data.alamat_perusahaan,
                        kategori: data.kategori,
                        spesialis: data.spesialisasi,
                        nama_pic: data.nama_pic,
                        email_pic: data.email_pic,
                        no_hp_pic: data.no_hp_pic,
                        nama_direktur: data.nama_direktur,
                        email_direktur: data.email_direktur,
                        no_hp_direktur: data.no_hp_direktur,
                        website: data.website,
                        catatan: data.catatan
                    })
                    // const kualifikasiArr = [];
                    // for await (const user of data){
                    
                    //     kualifikasiArr.push({
                    //         value: user.id_mst_kualifikasi,
                    //         label: user.kualifikasi,
                            
                    //     })
                    // }
                    // setSelectedOptions(kualifikasiArr);
                    // setTableData(userArr);
                    // console.log(data.vendorDetail);
                    if (data.vendorDetail) {
                        setFileBefore(data.vendorDetail);
                    }
                    setLoader(false);
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
                swalAlert(error.message, error.status, "error");
            }
        }


        const handleUploadUpdate = (id_dokumen, items) => {
            setFiles(prev => {
                const exists = prev.find(f => f.id_dokumen === id_dokumen);

                if (exists) {
                    // update the items for that document
                    return prev.map(f =>
                        f.id_dokumen === id_dokumen ? { ...f, items } : f
                    );
                } else {
                    // add new entry
                    return [...prev, { id_dokumen, items }];
                }
            });
        }

        const handleSubmit = async() => {
            for (const item of form) {
				if(item.dokumen.required){
					const uploaded = files.find(f => f.id_dokumen === item.dokumen.id_mst_dokumen);

					if (!uploaded || uploaded.items.length === 0) {
						swalAlert(
							`${item.dokumen.nama_dokumen} wajib diupload`,
							"Upload Required",
							"error"
						);
					return; // stop submission
					}
				}
				
			}
            // console.log(vendorData);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            setLoader(true);
            const formData = new FormData();
		
            formData.append("nama_perusahaan", vendorData.nama_perusahaan);
            formData.append("id_kualifikasi_usaha", vendorData.id_kualifikasi_usaha);
            formData.append("klasifikasi_usaha", vendorData.klasifikasi_usaha);
            formData.append("alamat_perusahaan", vendorData.alamat_perusahaan);
            formData.append("kategori", vendorData.kategori);
            formData.append("spesialis", vendorData.spesialis);
            formData.append("nama_pic", vendorData.nama_pic);
            formData.append("email_pic", vendorData.email_pic);
            formData.append("no_hp_pic", vendorData.no_hp_pic);
            formData.append("nama_direktur", vendorData.nama_direktur);
            formData.append("email_direktur", vendorData.email_direktur);
            formData.append("no_hp_direktur", vendorData.no_hp_direktur);
            formData.append("website", vendorData.website);
            files.map(async (item, index) => {
                

                item.items.forEach(fileObj => {
                    
                    formData.append(`id_dokumen`, item.id_dokumen);
                    formData.append(`files`, fileObj.file || fileObj);
                });
                
            });
            try {
                const response = await axios.post(apiUrl+"/vms//update-vendor/update-bulk?id="+router.query.ref, formData,{
                    headers:{
                        "Content-Type": "multipart/form-data",
                        "Authorization": "Bearer "+localStorage.getItem("token")
                    }
                });
                const data = response.data;
                // console.log(formData.getAll)
                if(data.success){
                    // console.log(data);
                    
                    // setSelectedOptions(kualifikasiArr);
                    // setTableData(userArr);
                    // swalAlert("Pengajuan Vendor Terkirim", "Register Vendor", "success");
                    // const upload = await uploadDaftarVendorNew(router.query.ref);
                    // if(upload){
                        setLoader(false);
                        swalAlert("Edit data berhasil", "Register Vendor", "success");
                        setAppStatus(true);
                        router.push("/apps/DraftPengajuanVms");
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
                if(error.status == 400){
					for(const a of error.response.data.violations){
						swalAlert(a.message, error.status, "error");
					}
				}
                setLoader(false);
                swalAlert(error.message, error.status, "error");
            }
        }
        const uploadDaftarVendor = async(idVendor) => {
            // console.log(files);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            // setLoader(true);
            try {
                await files.map(async(item) => {
                    // console.log(item.items);
                    const formData = new FormData();
                    formData.append("id_vendor", idVendor);
                    formData.append("id_dokumen", item.id_dokumen);
                    // formData.append("files[]", item.items);
                    item.items.forEach(fileObj => {
                        // if item.items comes from FilePond → fileObj.file
                        formData.append("files", fileObj.file || fileObj);
                    });
                    const response = await axios.post(apiUrl+"/vms/update-vendor/upload", formData,{
                        headers:{
                            "Content-Type": "multipart/form-data",
                            "Authorization": "Bearer "+localStorage.getItem("token")
                        }
                    });
                    // console.log(response.data)
                    if(!response.data.success){
                        return false;
                    }
                });
                
                return true;
                
            } catch (error) {
                console.log(error);
                // setError(error.message);
                // setLoader(false);
                // swalAlert(error.message, error.status, "error");
            }
        }
        const uploadDaftarVendorNew = async (idVendor) => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            try {
                
                const formData = new FormData();
                formData.append("id_vendor", idVendor);
                files.map(async (item, index) => {
                    

                    item.items.forEach(fileObj => {
                        
                        formData.append(`id_dokumen`, item.id_dokumen);
                        formData.append(`files`, fileObj.file || fileObj);
                    });
                    
                });

                


                const response = await axios.post(apiUrl + "/vms/update-vendor/upload-bulk", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                // console.log(response.data)
                if (!response.data.success) {
                    return false;
                }

                return true;

            } catch (error) {
                console.log(error);
                // setError(error.message);
                // setLoader(false);
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
        const getFile = async(id) => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            setLoader(true);
            try {
                const response = await axios.get(apiUrl+"/vms/dokumen-file", {
                    responseType: "blob",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": "Bearer "+localStorage.getItem("token")
                    },
                    params:{
                        id: id
                    }
                });
                // const typeData = {};
                // typeData.type = "application/pdf";
                const data = response.data;
                if(data){
                    // console.log(data);
                    const fileURL = window.URL.createObjectURL(
                        new Blob([data], {type: "application/pdf"})
                    );
                    setFrameSrc(fileURL)
                    setIdDetailDok(id);
                    // setSelectedOptions(kualifikasiArr);
                    // setTableData(userArr);
                    setLoader(false);
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
                swalAlert(error.message, error.status, "error");
            }
        }
        const handleDownload = () => {
                donwloadFile();
        }
        const donwloadFile = async() => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            setLoader(true);
            try {
                const response = await axios.get(apiUrl+"/vms/dokumen-file", {
                    responseType: "blob",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": "Bearer "+localStorage.getItem("token")
                    },
                    params:{
                        id: idDetailDok
                    }
                });
                // const typeData = {};
                // typeData.type = "application/pdf";
                const data = response.data;
                if(data){
                    // console.log(data);
                    const fileURL = window.URL.createObjectURL(
                        new Blob([data], {type: "application/pdf"})
                    );
                    const a = document.createElement("a");
                    a.href = fileURL;
                    a.download = idDetailDok+"-dokumen.pdf"; // custom filename
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(fileURL);
                    // setFrameSrc(fileURL)
                    // // setSelectedOptions(kualifikasiArr);
                    // // setTableData(userArr);
                    setLoader(false);
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
                swalAlert(error.message, error.status, "error");
            }
        }
        const handleOpen = (id) => {
                // getFile(id);
                // setModalDokumen(true);
                 getFile(id);
                 setModalDokumen({...modalDokumen, openDokumen: true});
        }
         const LihatDokumen = () =>{
            return(
                <Modal size="lg" show={modalDokumen.openDokumen} onHide={() => setModalDokumen({...modalDokumen, openDokumen: false})} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <Modal.Header closeButton>
                        <h6 className="modal-title" id="exampleModalLabel">Dokumen Upload</h6>
                    </Modal.Header>
                    <Modal.Body className="">
                        <iframe
                            src={`${frameSrc}#toolbar=0&navpanes=0`}
                            title="Upload Dokumen"
                            style={{ border: "1px solid #ccc",
                                    width: "100%",
                                    height: "80vh",
                            }}
                        />
                    </Modal.Body>
                    <Modal.Footer className="">
                        <Button variant='contained' type="button" className="btn btn-primary" onClick={handleDownload}
                            data-bs-dismiss="modal">Download</Button>
                        <Button variant='contained' type="button" className="btn btn-secondary" onClick={() => setModalDokumen({...modalDokumen, openDokumen: false})}
                            data-bs-dismiss="modal">Close</Button>
                
                    </Modal.Footer>
                </Modal>
            )
        }
        useEffect(() => {
            if(!localStorage.getItem("token")){
				router.push("/apps/LoginRegister");
			}
            getKualifikasiUsaha();
            
            getVendorById(router.query.ref);
            // console.log(router.query.ref); 
        },[selectKualifikasiUsaha, router, appStatus])
    return (
        <>
            <Seo title={"Form Edit Pengajuan"} />
            <PageHeaderVms title="Form Edit Pengajuan" item="VMS List" active_item="Form Edit Pengajuan" />
            <LoadersSimUmira open={loader} />
            <LihatDokumen />
            <Row>
                <Col xl={12}>
                    <ShowCode title="Form Pendaftaran Vendor" customCardClass="custom-card" customCardBodyClass="" >
                        <Row>
                            <Col xl={12} className="rounded-3">
                                <div className="row gy-2 pb-3">
                                    <Col xl={12}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Nama Perusahaan :</label>
                                        <input type="text" className="form-control" id="contact-address-firstname" value={vendorData.nama_perusahaan} placeholder="Nama Perusahaan" onChange={(e) => setVendorData({...vendorData, nama_perusahaan: e.target.value})}/>
                                    </Col>
                                    <Col xl={6}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Kualifikasi Usaha:</label>
                                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                                        <Select name="state" options={selectedOptions} className="basic-multi-select " value={selectedOptions.find(opt => opt.value === vendorData.id_kualifikasi_usaha)} isSearchable menuPlacement='auto' classNamePrefix="Select2" onChange={handleSelectKualifikasiUsaha}/>
                                    </Col>
                                    <Col xl={6}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Klasifikasi Usaha:</label>
                                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Klasifikasi Usaha" /> */}
                                        <Select name="state" options={selectedOptionsKlasifikasi} className="basic-multi-select " value={selectedOptionsKlasifikasi.find(opt => opt.value === vendorData.klasifikasi_usaha)} isSearchable menuPlacement='auto' classNamePrefix="Select2" onChange={(e) => setVendorData({...vendorData, klasifikasi_usaha: e.value})}/>
                                    </Col>
                                    <Col xl={12}>
                                        <label htmlFor="contact-address-lastname" className="form-label ">Alamat Perusahaan :</label>
                                        <textarea type="text" className="form-control" id="contact-address-lastname" value={vendorData.alamat_perusahaan} placeholder="Alamat Perusahaan" onChange={(e) => setVendorData({...vendorData, alamat_perusahaan: e.target.value})} />
                                    </Col>
                                    <Col xl={6}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Kategori :</label>
                                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Kategori" /> */}
                                        <Select name="state" options={selectedOptionsKategori} className="basic-multi-select" value={selectedOptionsKategori.find(opt => opt.value === vendorData.kategori)} isSearchable menuPlacement='auto' classNamePrefix="Select2" onChange={(e) => setVendorData({...vendorData, kategori: e.value})}/>
                                    </Col>
                                    <Col xl={6}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Spesialisasi :</label>
                                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Spesialisasi" value={vendorData.spesialis} onChange={(e) => setVendorData({...vendorData, spesialis: e.target.value})} />
                                    </Col>
                                    
                                    <Col xl={6}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Nama PIC :</label>
                                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama PIC" value={vendorData.nama_pic} onChange={(e) => setVendorData({...vendorData, nama_pic: e.target.value})} />
                                    </Col>
                                    <Col xl={6}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Nama Direktur :</label>
                                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama Direktur" value={vendorData.nama_direktur} onChange={(e) => setVendorData({...vendorData, nama_direktur: e.target.value})} />
                                    </Col>
                                    <Col xl={6}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Email PIC :</label>
                                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Email PIC" value={vendorData.email_pic} onChange={(e) => setVendorData({...vendorData, email_pic: e.target.value})} />
                                    </Col>
                                    <Col xl={6}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Email Direktur :</label>
                                        <input type="email" className="form-control" id="contact-address-firstname" placeholder="Email Direktur" value={vendorData.email_direktur} onChange={(e) => setVendorData({...vendorData, email_direktur: e.target.value})} />
                                    </Col>
                                    
                                    <Col xl={6}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Nomor Handphone PIC :</label>
                                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="No Handphone PIC" value={vendorData.no_hp_pic} onChange={(e) => setVendorData({...vendorData, no_hp_pic: e.target.value})} />
                                    </Col>
                                    
                                    <Col xl={6}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Nomor Handphone Direktur :</label>
                                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nomor Handphone Direktur" value={vendorData.no_hp_direktur} onChange={(e) => setVendorData({...vendorData, no_hp_direktur: e.target.value})} />
                                    </Col>
                                    <Col xl={12}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Website :</label>
                                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" value={vendorData.website} onChange={(e) => setVendorData({...vendorData, website: e.target.value})} />
                                    </Col>

                                    <Col xl={12}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Approval :</label>
                                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" value={(vendorData.isApproval == 0) ? "Di Tolak" : "-"} disabled />
                                    </Col>

                                    <Col xl={12}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">Catatan :</label>
                                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" value={vendorData.catatan} onChange={(e) => setVendorData({...vendorData, website: e.target.value})} /> */}
                                        <textarea type="text" className="form-control" id="contact-address-lastname" value={vendorData.catatan} placeholder="Catatan" disabled/>
                                    </Col>
                                   
                                </div>
                                <hr />
                                <Col xl={12}>
                                    <label htmlFor="contact-address-firstname" className="form-label ">Dokumen Upload Sebelumnya : </label>
                                </Col>
                                <hr/>
                                <div className="row gy-2 pt-3 pb-3">
                                {filesBefore.map((item, index) => (
                                    <Col key={index} xl={6}>
                                        <label htmlFor="contact-address-firstname" className="form-label ">{item.nama_dokumen}</label>
                                        <Button variant="contained" className="btn btn-primary" onClick={() => {handleOpen(item.id_vendor_detail)}}>Lihat Dokumen</Button>
                                    </Col>
                                ))}
                                </div>
                                <hr />
                                {form.length > 0 && (
                                    <>
                                    
                                    <div className="row gy-2 pt-3 pb-3">
                                        
                                            <Col xl={12}>
                                                <label htmlFor="contact-address-firstname" className="form-label ">Dokumen Upload : </label>
                                            </Col>
                                        <hr/>
                                        {form.map((item, index) => (
                                            <Col key={index} xl={6}>
                                                <h6 className="mb-3">{item.dokumen.nama_dokumen} {item.dokumen.required && <span style={{ color: "red" }}>*</span>} :</h6>
                                                <Row>
                                                    <Col xl={12}>
                                                        <Card className="custom-card">
                                                            <Card.Header>
                                                                <div className="card-title">
                                                                    Upload {item.dokumen.nama_dokumen}
                                                                </div>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <FilePond className="multiple-filepond"
                                                                    files={files.find(f => f.id_dokumen === item.dokumen.id_mst_dokumen)?.items || []}
                                                                    onupdatefiles={(items) => handleUploadUpdate(item.dokumen.id_mst_dokumen, items)}
                                                                    allowMultiple={true}
                                                                    maxFiles={3}
                                                                    // server="/api"
                                                                    name="files" /* sets the file input name, it's filepond by default */
                                                                    labelIdle='Drag & Drop your file here or click'
                                                                    acceptedFileTypes={['application/pdf']}
                                                                    // fileValidateTypeLabelExpectedTypes="Hanya file PDF diperbolehkan"
                                                                    maxFileSize="5MB"
                                                                    labelMaxFileSizeExceeded="File terlalu besar"
                                                                    labelMaxFileSize="Maksimal ukuran file: 5MB"
                                                                />
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </Col> 
                                        ))}
                                    </div>
                                    </>
                                )}
                                
                                <Col lg={12}>
                                    <div className="d-flex justify-content-between text-center ">
                                        <button className="btn btn-secondary btn-wave" onClick={() => router.push("/apps/DraftPengajuanVms")}>Kembali</button>
                                        <button className="btn btn-primary btn-wave" onClick={handleSubmit}>Submit</button>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                    </ShowCode>
                </Col>
            </Row>

        </>
    );
};
FormEditDraftVms.layout = "ContentlayoutVms";

export default FormEditDraftVms;