import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
const Select = dynamic(() => import("react-select"), { ssr: false });

const CreatePu = ({ openModal, setOpenModal }) => {
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [daftarWeek, setDaftarWeek] = useState([]);
    const [daftarProyek, setDaftarProyek] = useState([]);
    const [data, setData] = useState({
        nominal_pu: "",
        id_proyek: "",
        id_week: ""
    })

    const getDaftarWeek = async (id_proyek) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const result = await apiConfig.get(
                `${apiUrl}/master/get-week-by-project?id_project=${id_proyek}`,
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

    const getDaftarProyek = async () => {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if (result.status == 200) {

                setDaftarProyek(result.data.data);

                const daftarArr = [];
                for await (const data of result.data.data) {
                    daftarArr.push({
                        kode_proyek: data.kode_proyek,
                        nama_proyek: data.nama_proyek,
                        deskripsi_proyek: data.deskripsi_proyek,
                        tanggal_kontrak: data.tanggal_akhir_kontrak,
                        rap: toCurrency(data.biaya_rap),
                        rab: toCurrency(data.biaya_rab),
                        aksi: (
                            <div className="d-flex flex-row gap-2">
                                <button className="btn btn-success" onClick={() => setOpenModalEdit({ id_proyek: data.id_proyek, open_modal: true })}>Edit</button>
                                <button className="btn btn-danger" onClick={() => deleteData(data.id_proyek)}>Delete</button>
                            </div>
                        )
                    });
                }
            }

            setLoading(false);
        } catch (error) {
            console.log("e = " + error);
        }
    }


    const submit = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const dataSubmit = {
            nominal_pu: data.nominal_pu,
            id_proyek: openModal.id_proyek,
            id_week: data.id_week
        };
        try {
            const result = await apiConfig.post(apiUrl + "/CostControl/PendapatanUsaha/create-pu", dataSubmit, {
                headers: {
                    "Content-Type": "application/json",
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
            setLoader(false);
            console.log("e = " + error);
        }

        // console.log(dataSubmit);
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

    const resetData = () => {
        setData({
            nominal_pu: "",
            id_proyek: "",
            id_week: ""
        })
    }
    //useEffect(() => {},[data])
    useEffect(() => {
        if (openModal.open_modal) {
            getDaftarProyek();
        }

    }, [openModal.open_modal])

    return (
        <Modal size="md" show={openModal.open_modal} onHide={() => setOpenModal({ ...openModal, open_modal: false })} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <LoadersSimUmira open={loader} />
            <Modal.Header closeButton>
                <h6 className="modal-title" id="exampleModalLabel">Tambah Pendapatan Usaha</h6>
            </Modal.Header>
            <Modal.Body className="">
                <Row>
                   <Col xl={12}>
                            <Row>
                                <Col xl={12} className="rounded-3">
                                    <div className="row gy-2 pb-3">
                                        <Col xl={12}>
                                            <label className="form-label mt-3">
                                                Pilih Proyek <span style={{ color: "red" }}>*</span> :
                                            </label>

                                            <select
                                                className="form-select"
                                                value={data.id_proyek}
                                                onChange={(e) => {
                                                    setData({ ...data, id_proyek: e.target.value });
                                                    getDaftarWeek(e.target.value);
                                                }}
                                            >
                                                <option value="">-- Pilih Proyek --</option>

                                                {daftarProyek.map((item) => (
                                                    <option key={item.id_proyek} value={item.id_proyek}>
                                                        {item.nama_proyek}
                                                    </option>
                                                ))}
                                            </select>
                                        </Col>
                                        <Col x1={12}>
                                            <label className="form-label mt-3">
                                                Pilih Week <span style={{ color: "red" }}>*</span> :
                                            </label>

                                            <select
                                                className="form-select"
                                                value={data.id_week}
                                                onChange={(e) => setData({ ...data, id_week: e.target.value })}
                                            >
                                                <option value="">-- Pilih Week --</option>

                                                {daftarWeek.map((item, index) => (
                                                    <option key={index} value={item.week}>
                                                        Week {item.week} ({item.startDate} s/d {item.endDate})
                                                    </option>
                                                ))}
                                            </select>
                                        </Col>
                                        <Col xl={12}>
                                            <label htmlFor="pendapatan-usaha" className="form-label ">Nominal Pendapatan Usaha <span style={{ color: "red" }}>*</span> :</label>
                                            <input type="text" className={`form-control`} id="nominal_pu" placeholder="Pendapatan Usaha" onChange={(val) => setData({ ...data, nominal_pu: val.target.value })} />
                                        </Col>
                                    </div>
                                    <div className="text-center mt-4">
                                        <button className="btn btn-primary btn-wave" onClick={submit}>Submit</button>
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
CreatePu.layout = "ContentlayoutVms";
export default CreatePu;