
import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";


registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const AddKontrakAdendum = ({openModal, setOpenModal, loading, setLoading}) => {
    const [dokumenFiles, setDokumenFiles] = useState();

    const [dataAdendum, setDataAdendum] = useState({
        nomor_adendum:"",
        kerja_tambah:"",
        kerja_kurang:""
    });

    const submit = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
         setLoading(true);
        try {
            const formData = new FormData();
            formData.append("nomor_adendum", dataAdendum.nomor_adendum);
            formData.append("id_proyek", openModal.id_proyek);
            formData.append("kerja_tambah", dataAdendum.kerja_tambah);
            formData.append("kerja_kurang", dataAdendum.kerja_kurang);
            if(dokumenFiles != undefined){
                formData.append("dokumen_upload", dokumenFiles[0].file);
            }
            
            const result = await apiConfig.post(apiUrl + "/CostControl/AdendumProyek/create-adendum", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			});
			if (result.status == 200) {
                console.log(result);
				setLoading(false);
				swalAlert(result.data.message, result.statusText, "success");
                setOpenModal({...openModal, open_modal: false});
				// resetData();
				// console.log(result)
			}
        } catch (error) {
            console.log("e = "+error);
            setLoading(false)
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

    return(
        <Modal size="md" show={openModal.open_modal} onHide={() => setOpenModal({ ...openModal, open_modal: false })} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            
            <Modal.Header closeButton>
                <h6 className="modal-title" id="exampleModalLabel">Add Adendum Kontrak</h6>
            </Modal.Header>
            <Modal.Body className="">
                <Row>
                    <Col xl={12}>
                        <Row>
                            <Col xl={12} className="rounded-3">
                                <div className="row gy-2 pb-3">
                                    
                                    <Col xl={12}>
                                        <label htmlFor="pendapatan-usaha" className="form-label ">Nomor Kontrak Adendum <span style={{ color: "red" }}>*</span> :</label>
                                        <input type="text" className={`form-control`} id="nomor_kontrak_adendum" placeholder="Nomor Kontrak Adendum" onChange={(e) => setDataAdendum({...dataAdendum, nomor_adendum: e.target.value})} />
                                    </Col>

                                    <Col xl={12}>
                                        <label htmlFor="pendapatan-usaha" className="form-label ">Kerja Tambah<span style={{ color: "red" }}>*</span> :</label>
                                        <input type="text" className={`form-control`} id="kerja_tambah" placeholder="Kerja Tambah" onChange={(e) => setDataAdendum({...dataAdendum, kerja_tambah: e.target.value})} />
                                    </Col>

                                    <Col xl={12}>
                                        <label htmlFor="pendapatan-usaha" className="form-label ">Kerja Kurang<span style={{ color: "red" }}>*</span> :</label>
                                        <input type="text" className={`form-control`} id="kerja_kurang" placeholder="Kerja kurang" onChange={(e) => setDataAdendum({...dataAdendum, kerja_kurang: e.target.value})} />
                                    </Col>

                                    <Col xl={12}>
                                        <label htmlFor="pendapatan-usaha" className="form-label ">Dokumen Adendum Kontrak<span style={{ color: "red" }}>*</span> :</label>
                                        <FilePond
                                            className="filepond-custom"
                                            name="files"
                                            acceptedFileTypes={['application/pdf']}
                                            maxFileSize="5MB"
                                            labelIdle='Drag & Drop file atau klik'
                                            labelMaxFileSizeExceeded="File terlalu besar"
                                            labelMaxFileSize="Maksimal ukuran file: 5MB"
                                            files={dokumenFiles}
                                            onupdatefiles={setDokumenFiles}
                                        />
                                    </Col>
                                    
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={submit}>Tambah</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open_modal: false })}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(AddKontrakAdendum), { ssr: false });