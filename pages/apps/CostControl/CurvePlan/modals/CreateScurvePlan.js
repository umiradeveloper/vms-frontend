import { Button, Col, Modal, Row } from "react-bootstrap";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import apiConfig from "@/utils/AxiosConfig";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);


const CreateScurvePlan = ({openModal, setOpenModal, loader, setLoader}) => {
    const [daftarWeek, setDaftarWeek] = useState([]);
    const [dokumenFiles, setDokumenFiles] = useState();
    const [dataCreate, setDataCreate] = useState({
        week_scurve:"",
        nominal_scurve:""
    })
    const getDaftarWeek = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const result = await apiConfig.get(
                `${apiUrl}/master/get-week-by-project?id_project=${openModal.id_proyek}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            );
            console.log(result);
            if (result.status === 200) {
                setDaftarWeek(result.data.data); // <- simpan array wee
            }
        } catch (error) {
            console.log("Error fetching weeks:", error);
        }
    };

    const submit = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const splitweek = dataCreate.week.split("|");
        const valueNominalPuClean = (dataCreate.nominal_scurve) ? dataCreate.nominal_scurve.replace(/\./g, "") : "";
        const formData = new FormData();
        formData.append("nominal_scurve", valueNominalPuClean);
        formData.append("id_proyek", openModal.id_proyek);
        formData.append("week", splitweek[0]);
        formData.append("tanggal_awal", splitweek[1]);
        formData.append("tanggal_akhir", splitweek[2]);
        formData.append("file_dokumen", dokumenFiles[0].file);
        try {
            const result = await apiConfig.post(apiUrl + "/CostControl/Scurve/create-scurve", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status == 200) {
                setLoader(false);
                swalAlert(result.data.message, result.statusText, "success");
                setOpenModal({ ...openModal, open_modal: false });
                // console.log(result)
            }
        } catch (error) {
            
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
    const handleNominalScurve = (e) => {
        let val = e.target.value.replace(/[^\d]/g, ""); // hanya angka
        val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
        setDataCreate({ ...dataCreate, nominal_scurve: val })
        // setValueRab(val);
    };
    useEffect(() => {
        if(openModal.open_modal){
            getDaftarWeek()
        }
        
    },[openModal.open_modal])
    return(
        <Modal size="md" show={openModal.open_modal} onHide={() => setOpenModal({ ...openModal, open_modal: false })} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <Modal.Header closeButton>
                <h6 className="modal-title" id="exampleModalLabel">Tambah S Curve</h6>
            </Modal.Header>
            <Modal.Body className="">
                <Row>
                    <Col xl={12}>
                        <Row>
                            <Col xl={12} className="rounded-3">
                                <div className="row gy-2 pb-3">
                                    <Col x1={12}>
                                        <label className="form-label mt-3">
                                            Pilih Week <span style={{ color: "red" }}>*</span> :
                                        </label>

                                        <select
                                            className="form-select"
                                            value={dataCreate.week}
                                            onChange={(e) => setDataCreate({ ...dataCreate, week: e.target.value })}
                                        >
                                            <option value="">-- Pilih Week --</option>

                                            {daftarWeek.map((item, index) => (
                                                <option key={index} value={item.week + "|" + item.startDate + "|" + item.endDate}>
                                                    Week {item.week} ({item.startDate} s/d {item.endDate})
                                                </option>
                                            ))}
                                        </select>
                                    </Col>
                                    <Col xl={12}>
                                        <label htmlFor="pendapatan-usaha" className="form-label ">Nominal S Curve <span style={{ color: "red" }}>*</span> :</label>
                                        <input type="text" className={`form-control`} id="nominal_pu" placeholder="Nominal S Curve" onChange={handleNominalScurve} value={dataCreate.nominal_scurve} />
                                    </Col>
                                    <Col xl={12}>
                                        <label className="form-label mt-3">
                                            Upload Dokumen Pendukung <span style={{ color: "red" }}>*</span> :
                                        </label>

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
export default CreateScurvePlan;