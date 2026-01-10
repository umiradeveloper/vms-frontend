import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const EditMos = ({ openModal, setOpenModal, loader, setLoader, setReload, reload }) => {
    const [formData, setFormData] = useState({
        id_mos: "",
        week_pu: "",
        nominal_pu: "",
        tanggal_awal: "",
        tanggal_akhir: "",
    });

    const [dokumenFiles, setDokumenFiles] = useState();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Ambil detail PU berdasarkan ID
    const getDetailMos = async (id_mos) => {
        try {
            setLoader(true);

            const res = await apiConfig.get(
                apiUrl + `/CostControl/MaterialOnSite/get-mos-by-id?id=${id_mos}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            const data = res.data.data;

            console.log(data);

            setFormData({
                id_mos: data.id_mos,
                week_pu: data.week,
                nominal_mos: data.nominal_mos,
                tanggal_awal: data.tanggal_awal,
                tanggal_akhir: data.tanggal_akhir,
            });

        } catch (err) {
            console.log(err);
        } finally {
            setLoader(false);
        }
    };
    

    // Submit Update Nominal
    const handleSave = async () => {
        //console.log(formData.tanggal_awal);
        try {
            setLoader(true);
            const form = new FormData();
            form.append("id_proyek", openModal.id_proyek);
            form.append("id_mos", formData.id_mos);
            form.append("nominal_mos", formData.nominal_mos);
            form.append("week", formData.week_pu);
            form.append("tanggal_awal", formData.tanggal_awal);
            form.append("tanggal_akhir", formData.tanggal_akhir);
            if (dokumenFiles != undefined) {
                form.append("dokumen_upload", dokumenFiles[0].file);
            }

            // const payload = {
            //     id_mos: formData.id_mos,
            //     nominal_mos: formData.nominal_mos,
            //     week_pu: formData.week,
            //     tanggal_awal: formData.tanggal_awal,
            //     tanggal_akhir: formData.tanggal_akhir,

            // };

            // console.log(payload);

            const res = await apiConfig.patch(
                apiUrl + "/CostControl/MaterialOnSite/update-mos",
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: res.data.message,
                timer: 1500,
                showConfirmButton: false
            });

            setOpenModal({ id_pu: "", open_modal: false });
            setReload(prev => !prev);

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Terjadi kesalahan saat menyimpan data"
            });
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (openModal.open_modal && openModal.id_mos) {
            //console.log(openModal.id_proyek);
            getDetailMos(openModal.id_mos);
        }
    }, [openModal.open_modal]);

    return (
        <Modal
            show={openModal.open_modal}
            onHide={() => setOpenModal({ id_mos: "", open_modal: false })}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Material On-Site</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Week</Form.Label>
                        <Form.Control
                            type="text"
                            value={`Week ${formData.week_pu}`}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nominal Material On-Site</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.nominal_mos}
                            onChange={(e) => setFormData({ ...formData, nominal_mos: e.target.value })}
                            placeholder="Masukkan nominal baru"
                        />
                    </Form.Group>
                    <Form.Group>
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
                    </Form.Group>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary"
                    onClick={() => setOpenModal({ id_mos: "", open_modal: false })}
                >
                    Batal
                </Button>

                <Button variant="primary" onClick={handleSave} disabled={loader}>
                    {loader ? "Menyimpan..." : "Simpan"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditMos;
