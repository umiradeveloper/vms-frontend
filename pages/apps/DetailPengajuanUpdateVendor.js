import { Select } from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Modal, Button, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { useRouter } from "next/router";


const DetailPengajuanUpdateVendor = ({open, setOpen, openLoader, setOpenLoader}) => {
   const [modalDokumen, setModalDokumen] = useState({
        openDokumen: false,
        id_dok: ""
   });
   const router = useRouter();
   const [frameSrc, setFrameSrc] = useState();
   const getFile = async(id) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setOpenLoader(true);
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
                // setSelectedOptions(kualifikasiArr);
                // setTableData(userArr);
                setOpenLoader(false);
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
            setOpenLoader(false);
            swalAlert(error.message, error.status, "error");
        }
   }
   const handleOpen = (id) => {
        getFile(id);
        setModalDokumen({...modalDokumen, openDokumen: true});
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
                <Button variant='contained' type="button" className="btn btn-secondary" onClick={() => {setFrameSrc();setModalDokumen({...modalDokumen, openDokumen: false})}}
                    data-bs-dismiss="modal">Close</Button>
           
            </Modal.Footer>
        </Modal>
    )
   }

    return(
        <Modal show={open.open_modal} onHide={() => setOpen({...open, open_modal: false})} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <LihatDokumen />
            <Modal.Header closeButton>
                <h6 className="modal-title" id="exampleModalLabel">Detail Pengajuan Update Vendor</h6>
            </Modal.Header>
            <Modal.Body className="">
                <div className="row gy-2 pb-3">
                    <Col xl={12}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nama Perusahaan :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama Perusahaan" value={open.data_detail.nama_perusahaan} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Kualifikasi Usaha:</label>
                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Kualifikasi Usaha" value={open.data_detail.kualifikasi_usaha?.kualifikasi} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Klasifikasi Usaha:</label>
                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Klasifikasi Usaha" /> */}
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama Perusahaan" value={open.data_detail.klasifikasi_usaha} disabled/>
                    </Col>
                    <Col xl={12}>
                        <label htmlFor="contact-address-lastname" className="form-label ">Alamat Perusahaan :</label>
                        <textarea type="text" className="form-control" id="contact-address-lastname" placeholder="Alamat Perusahaan" value={open.data_detail.alamat_perusahaan} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Kategori :</label>
                        {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Kategori" /> */}
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Kategori Perusahaan" value={open.data_detail.kategori} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Spesialisasi :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Spesialisasi" value={open.data_detail.spesialisasi} disabled/>
                    </Col>
                    
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nama PIC :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama PIC" value={open.data_detail.nama_pic} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nama Direktur :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nama Direktur" value={open.data_detail.nama_direktur} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Email PIC :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Email PIC" value={open.data_detail.email_pic} disabled/>
                    </Col>
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Email Direktur :</label>
                        <input type="email" className="form-control" id="contact-address-firstname" placeholder="Email Direktur" value={open.data_detail.email_direktur} disabled/>
                    </Col>
                    
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nomor Handphone PIC :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="No Handphone PIC" value={open.data_detail.no_hp_pic} disabled/>
                    </Col>
                    
                    <Col xl={6}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Nomor Handphone Direktur :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Nomor Handphone Direktur" value={open.data_detail.no_hp_direktur} disabled/>
                    </Col>
                    <Col xl={12}>
                        <label htmlFor="contact-address-firstname" className="form-label ">Website :</label>
                        <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" value={open.data_detail.website} disabled/>
                    </Col>
                    <hr />
                    <Col xl={12}>
                        <label htmlFor="contact-address-lastname" className="form-label ">Alasan Update :</label>
                        <textarea type="text" className="form-control" id="contact-address-lastname" placeholder="Alasan Update" value={open.data_detail.alasan_update} disabled/>
                    </Col>
                   
                </div>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-secondary" onClick={() => setOpen({...open, open_modal: false})}
                    data-bs-dismiss="modal">Close</Button>
           
            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(DetailPengajuanUpdateVendor), { ssr: false });