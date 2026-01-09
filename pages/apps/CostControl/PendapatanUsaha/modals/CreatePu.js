import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

const Select = dynamic(() => import("react-select"), { ssr: false });

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);


const CreatePu = ({ openModal, setOpenModal }) => {
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [daftarWeek, setDaftarWeek] = useState([]);
    const [daftarProyek, setDaftarProyek] = useState([]);
    const [dokumenFiles, setDokumenFiles] = useState();
    const [data, setData] = useState({
        nominal_pu: "",
        id_proyek: "",
        week: ""
    })
    const [rapa, setRapa] = useState([]);
    const [items, setItems] = useState([
        { id: Date.now(), rapa: '', volume: 0 },
    ]);

    const addItem = () => {
        setItems([
            ...items,
            { id: Date.now() + Math.random(), rapa: '', volume: 0 },
        ]);
    };

    const removeItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const updateItem = (id, field, value) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };
    const getRapa = async () => {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Rapa/get-rapa-proyek?id_proyek=" + openModal.id_proyek, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status == 200) {
                if (result.data.data.length > 0) {
                    const rapaArr = [];
                    for (const res of result.data.data) {
                        rapaArr.push({
                            value: res.id_rapa,
                            label: res.kode_rap + " | " + res.kategori + " | " + res.item_pekerjaan
                        })
                    }
                    setRapa(rapaArr);
                }

                // console.log(result.data)
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            console.log("e = " + e);
        }
    }
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

    const handleChangePu = (e) => {
        let val = e.target.value.replace(/[^\d]/g, ""); // hanya angka
        val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
        setData({ ...data, nominal_pu: val })
        // setValueRab(val);
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
        const splitweek = data.week.split("|");
        const valueNominalPuClean = (data.nominal_pu) ? data.nominal_pu.replace(/\./g, "") : "";
        const formData = new FormData();
        formData.append("nominal_pu", valueNominalPuClean);
        formData.append("id_proyek", openModal.id_proyek);
        formData.append("week_pu", splitweek[0]);
        formData.append("tanggal_awal", splitweek[1]);
        formData.append("tanggal_akhir", splitweek[2]);
        formData.append("dokumen_upload", dokumenFiles[0].file);
        // const dataSubmit = {
        //     nominal_pu: valueNominalPuClean,
        //     id_proyek: openModal.id_proyek,
        //     week_pu: splitweek[0],
        //     tanggal_awal: splitweek[1],
        //     tanggal_akhir: splitweek[2]
        // };
        // console.log(dokumenFiles[0].file)
        try {
            const result = await apiConfig.post(apiUrl + "/CostControl/PendapatanUsaha/create-pu", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status == 200) {
                setLoader(false);
                // await submitMos(result.data.data.id_pu);
                swalAlert(result.data.message, result.statusText, "success");
                setOpenModal({ ...openModal, open_modal: false });
                // console.log(result)
            }
        } catch (error) {
            setLoader(false);
            console.log("e submit pu = " + error);
        }

        // console.log(dataSubmit);
    }

    const submitMos = async (id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const dataSubmit = {
            id_rapa: items.map(i => i.rapa),
            volume: items.map(i => i.volume),
            id_proyek: openModal.id_proyek,
            id_pu: id
        }
        try {
            const result = await apiConfig.post(apiUrl + "/CostControl/Mos/create-mos-bulk", dataSubmit, {
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
            console.log("e submit mos = " + error);
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

    const [files, setFiles] = useState([]);

    const resetData = () => {
        setData({
            nominal_pu: "",
            id_proyek: "",
            week_pu: ""
        })
    }
    //useEffect(() => {},[data])
    useEffect(() => {
        if (openModal.open_modal) {
            getDaftarProyek();
            getDaftarWeek();
            getRapa();
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
                                    <Col x1={12}>
                                        <label className="form-label mt-3">
                                            Pilih Week <span style={{ color: "red" }}>*</span> :
                                        </label>

                                        <select
                                            className="form-select"
                                            value={data.week}
                                            onChange={(e) => setData({ ...data, week: e.target.value })}
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
                                        <label htmlFor="pendapatan-usaha" className="form-label ">Nominal Pendapatan Usaha <span style={{ color: "red" }}>*</span> :</label>
                                        <input type="text" className={`form-control`} id="nominal_pu" placeholder="Pendapatan Usaha" onChange={handleChangePu} value={data.nominal_pu ? `${data.nominal_pu}` : ""} />
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
CreatePu.layout = "ContentlayoutVms";
export default CreatePu;