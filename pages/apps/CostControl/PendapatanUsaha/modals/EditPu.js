import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const EditPu = ({ openModal, setOpenModal, loader, setLoader, setReload, reload }) => {
    const [formData, setFormData] = useState({
        id_pu: "",
        week_pu: "",
        nominal_pu: "",
        tanggal_awal: "",
        tanggal_akhir: "",
    });
    const [dokumenFiles ,setDokumenFiles] = useState();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Ambil detail PU berdasarkan ID
    const getDetailPu = async (id_pu) => {
        try {
            setLoader(true);

            const res = await apiConfig.get(
                apiUrl + `/CostControl/PendapatanUsaha/get-pu-by-id?id=${id_pu}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            const data = res.data.data;

            // console.log(data);

            setFormData({
                id_pu: data.id_pu,
                week_pu: data.week_pu,
                nominal_pu: toCurrency(data.nominal_pu),
                tanggal_awal: data.tanggal_awal,
                tanggal_akhir: data.tanggal_akhir,
            });

        } catch (err) {
            console.log(err);
        } finally {
            setLoader(false);
        }
    };
    const handleChangePu = (e) => {
        let val = e.target.value.replace(/[^\d]/g, ""); // hanya angka
        val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
        setFormData({ ...formData, nominal_pu: val })
        // setValueRab(val);
    };

    // Submit Update Nominal
    const handleSave = async () => {
        try {
            setLoader(true);
            const valueNominalPuClean = (formData.nominal_pu) ? formData.nominal_pu.replace(/\D/g, "") : "";
            const form = new FormData();
            form.append("id_pu", formData.id_pu);
            form.append("nominal_pu", valueNominalPuClean);
            form.append("week_pu", formData.week_pu);
            form.append("tanggal_awal", formData.tanggal_awal);
            form.append("tanggal_akhir", formData.tanggal_akhir);
            if(dokumenFiles != undefined){
                form.append("dokumen_upload", dokumenFiles[0].file);
            }
            
            // formData.append("dokumen_upload", dokumenFiles[0].file);

            // const payload = {
            //     id_pu: formData.id_pu,
            //     nominal_pu: formData.nominal_pu,
            //     week_pu: formData.week_pu,
            //     tanggal_awal: formData.tanggal_awal,
            //     tanggal_akhir: formData.tanggal_akhir
            // };
            
            // console.log(payload);

            const res = await apiConfig.post(
                apiUrl + "/CostControl/PendapatanUsaha/update-pu",
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
    const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
    };

    useEffect(() => {
        if (openModal.open_modal && openModal.id_pu) {
            getDetailPu(openModal.id_pu);
        }
    }, [openModal.open_modal]);

    return (
        <Modal
            show={openModal.open_modal}
            onHide={() => setOpenModal({ id_pu: "", open_modal: false })}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Pendapatan Usaha</Modal.Title>
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
                        <Form.Label>Nominal Pendapatan Usaha</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.nominal_pu}
                            onChange={handleChangePu}
                            placeholder="Masukkan nominal baru"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dokumen Upload</Form.Label>
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
                    onClick={() => setOpenModal({ id_pu: "", open_modal: false })}
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

export default EditPu;
