import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";

const EditPu = ({ openModal, setOpenModal, loader, setLoader, setReload, reload }) => {
    const [formData, setFormData] = useState({
        id_pu: "",
        week_pu: "",
        nominal_pu: "",
        tanggal_awal: "",
        tanggal_akhir: "",
    });

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

            console.log(data);

            setFormData({
                id_pu: data.id_pu,
                week_pu: data.week_pu,
                nominal_pu: data.nominal_pu,
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
        try {
            setLoader(true);

            const payload = {
                id_pu: formData.id_pu,
                nominal_pu: formData.nominal_pu,
                week_pu: formData.week_pu,
                tanggal_awal: formData.tanggal_awal,
                tanggal_akhir: formData.tanggal_akhir
            };
            
            console.log(payload);

            const res = await apiConfig.post(
                apiUrl + "/CostControl/PendapatanUsaha/update-pu",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
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
                            type="number"
                            value={formData.nominal_pu}
                            onChange={(e) => setFormData({ ...formData, nominal_pu: e.target.value })}
                            placeholder="Masukkan nominal baru"
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
