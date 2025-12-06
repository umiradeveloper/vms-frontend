import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";


const EditDataRapa = ({ openModal, setOpenModal }) => {
    const [loader, setLoader] = useState(false);

    const [dataRapa, setDataRapa] = useState({
        kode_rap: "",
        kategori: "",
        group: "",
        item_pekerjaan: "",
        spesifikasi: "",
        satuan: "",
        volume: "",
        harga_satuan: "",
        harga_total: ""
    });
    const getRapa = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Rapa/get-rapa-id?id_rapa=" + openModal.id_rapa, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status) {
                setDataRapa({
                    kode_rap: result.data.data.kode_rap,
                    kategori: result.data.data.kategori,
                    group: result.data.data.group,
                    item_pekerjaan: result.data.data.item_pekerjaan,
                    spesifikasi: result.data.data.spesifikasi,
                    satuan: result.data.data.satuan,
                    volume: result.data.data.volume,
                    harga_satuan: result.data.data.harga_satuan,
                    harga_total: result.data.data.harga_total
                });

            }
            setLoader(false)
            console.log(result)
        } catch (error) {
            console.log("e = " + error);
        }
    }

    const updateRapa = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const dataSubmit = {
                id_rapa: openModal.id_rapa,
                kode_rap: dataRapa.kode_rap,
                kategori: dataRapa.kategori,
                group: dataRapa.group,
                item_pekerjaan: dataRapa.item_pekerjaan,
                spesifikasi: dataRapa.spesifikasi,
                satuan: dataRapa.satuan,
                volume: dataRapa.volume,
                harga_satuan: dataRapa.harga_satuan,
                harga_total: dataRapa.harga_total
            }
            const result = await apiConfig.patch(apiUrl + "/CostControl/Rapa/update-rapa", dataSubmit, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status) {

                setLoader(false);
                swalAlert(result.data.message, result.statusText, "success");
                setOpenModal({ ...openModal, open_modal: false });
            }

        } catch (error) {
            console.log("e = " + error)
            setLoader(false);
            swalAlert(error.message, error.code, "error");
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

    const toCurrency = (value) => {
        let val = value.replace(/[^\d]/g, ""); // hanya angka
        val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
        return val;
        // setValueRap(val);
    };
    const cleanCurrency = (value) => {
        if (!value) return 0;

        return Number(
            value
                .replace(/[^0-9]/g, "") // hapus semua selain angka
        );
    };

    useEffect(() => {
        if (openModal.open_modal) {
            getRapa()
            console.log(openModal)
        }

    }, [openModal.open_modal]);
    return (
        <Modal size="md" show={openModal.open_modal} onHide={() => setOpenModal({ ...openModal, open_modal: false })} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <LoadersSimUmira open={loader} />
            <Modal.Header closeButton>
                <h6 className="modal-title" id="exampleModalLabel">Edit Rapa</h6>
            </Modal.Header>
            <Modal.Body className="">
                <Row>
                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">
                            <Col xl={12}>
                                <label htmlFor="kode-proyek" className="form-label ">Kode RAP <span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="kode_rap" placeholder="Kode RAP" value={dataRapa.kode_rap} onChange={(e) => setDataRapa({ ...dataRapa, kode_rap: e.target.value })} />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Kategori <span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="kategori" placeholder="Kategori" value={dataRapa.kategori} onChange={(e) => setDataRapa({ ...dataRapa, kategori: e.target.value })} />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Group<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="group" placeholder="Group" value={dataRapa.group} onChange={(e) => setDataRapa({ ...dataRapa, group: e.target.value })} />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Item Pekerjaan<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="item_pekerjaan" placeholder="Item Pekerjaan" value={dataRapa.item_pekerjaan} onChange={(e) => setDataRapa({ ...dataRapa, item_pekerjaan: e.target.value })} />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Spesifikasi<span style={{ color: "red" }}>*</span> :</label>
                                <textarea rows={4} className={`form-control`} id="spesifikasi" placeholder="Spesifikasi" value={dataRapa.spesifikasi} onChange={(e) => setDataRapa({ ...dataRapa, spesifikasi: e.target.value })} />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Satuan<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="satuan" placeholder="Satuan" value={dataRapa.satuan} onChange={(e) => setDataRapa({ ...dataRapa, satuan: e.target.value })} />
                            </Col>

                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Volume<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="volume" placeholder="Volume" value={dataRapa.volume} onChange={(e) => setDataRapa({ ...dataRapa, volume: e.target.value })} />
                            </Col>

                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Harga Satuan<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="harga_satuan" placeholder="Harga Satuan" value={dataRapa.harga_satuan} onChange={(e) => setDataRapa({ ...dataRapa, harga_satuan: toCurrency(e.target.value) })} />
                            </Col>

                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Harga Total<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="harga_total" placeholder="Harga Total" value={dataRapa.harga_total} onChange={(e) => setDataRapa({ ...dataRapa, harga_total: e.target.value })} />
                            </Col>
                        </div>

                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={updateRapa}>Update</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open_modal: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    )
}
export default EditDataRapa;