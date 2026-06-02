import { Fragment, useEffect, useState } from "react";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import Seo from "@/shared/layout-components/seo/seo";
import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "../../DataTables/DataTablesCostControl";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import apiConfig from "../../../../utils/AxiosConfig";
import UploadDataRapa from "./modals/UploadDataRapa";
import EditDataRapa from "./modals/EditDataRapa";
import AddDataRapa from "./modals/AddDataRapa";
import Swal from "sweetalert2";

const DetailRapa = () => {
    const [loader, setLoader] = useState(false);
    const params = useSearchParams();
    const [reload, setReload] = useState(false);
    const [statusDelete, setStatusDelete] = useState(false);
    const [openModalUpload, setOpenModalUpload] = useState({
        id_proyek: "",
        open: false
    })

    const [dataProyek, setDataProyek] = useState({
        kode_proyek: "",
        nama_proyek: "",
        deskripsi_proyek: "",
        tanggal_kontrak: "",
        biaya_rap: "",
        biaya_rab: ""
    })
    const [openModalEdit, setOpenModalEdit] = useState({
        id_rapa: "",
        kode_proyek: "",
        open_modal: false
    })
    const [openModalAdd, setOpenModalAdd] = useState({
        kode_proyek: "",
        nama_proyek: "",
        deskripsi_proyek: "",
        tanggal_kontrak: "",
        biaya_rap: "",
        biaya_rab: "",
        bk_pu_awal:"",
        open: false
    })
    const navigate = useRouter();
    const [datatable, setDataTable] = useState([]);
    const COLUMNS = [
        {
            Header: "Cost Code",
            accessor: "kode_rap",
        },
        {
            Header: "Kategori",
            accessor: "kategori",
        },
        // {
        //     Header: "Group",
        //     accessor: "group",
        // },
        {
            Header: "Item",
            accessor: "item_pekerjaan",
        },

        {
            Header: "Spesifikasi",
            accessor: "spesifikasi",
        },
        {
            Header: "satuan",
            accessor: "satuan",
        },
        {
            Header: "Volume",
            accessor: "volume",
        },
        {
            Header: "Harga Satuan",
            accessor: "harga_satuan",
        },
        {
            Header: "Harga Total",
            accessor: "harga_total",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];
    const getDataById = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek-id-bk-pu?id=" + params.get("id"), {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (result.status) {
                setDataProyek({
                    nama_proyek: result.data.data.proyek.nama_proyek,
                    kode_proyek: result.data.data.proyek.kode_proyek,
                    deskripsi_proyek: result.data.data.proyek.deskripsi_proyek,
                    tanggal_kontrak: (result.data.data.proyek.tanggal_akhir_kontrak) ? result.data.data.proyek.tanggal_akhir_kontrak : "",
                    biaya_rap: (result.data.data.proyek.biaya_rap) ? toCurrency(result.data.data.proyek.biaya_rap) : "",
                    //biaya_rab: (result.data.data.biaya_rab) ? toCurrency(result.data.data.biaya_rab) : "",
                    biaya_rab: toCurrency(calcRabAkhir(result.data.data.proyek.biaya_rab, result.data.data.kerja_kurang, result.data.data.kerja_tambah)),
                    //bk_pu_awal: (result.data.data.bk_pu_awal) ? formatPercent(result.data.data.bk_pu_awal) : "",
                    bk_pu_awal: formatPercent(calcPercentage(result.data.data.proyek.biaya_rap, calcRabAkhir(result.data.data.proyek.biaya_rab, result.data.data.kerja_kurang, result.data.data.kerja_tambah))),
                });

            }
            setLoader(false)
            console.log(result)
        } catch (error) {
            setLoader(false)
            console.log("e = " + error);
        }
    }

    const formatPercent = (value, digits = 2) => `${Number(value).toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;

    const calcPercentage = (part, total) => {
        const t = Number(total) || 0;
        if (t === 0) return 0;
        const p = (Number(part) / t) * 100;
        return p;
    };

    const calcRabAkhir = (rab, kerjaKurang, kerjaTambah) => {
        const r = Number(rab) || 0;
        const kk = Number(kerjaKurang) || 0;
        const kt = Number(kerjaTambah) || 0;
        return r - kk + kt;
    };

    const getRapa = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Rapa/get-rapa-proyek?id_proyek=" + params.get("id"), {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (result.status) {
                const arrRapa = [];
                for (const data of result.data.data) {
                    arrRapa.push({
                        kode_rap: (data.kode_rap) ? data.kode_rap : "",
                        kategori: (data.kategori) ? data.kategori : "",
                        group: (data.group) ? data.group : "",
                        item_pekerjaan: (data.item_pekerjaan) ? data.item_pekerjaan : "",
                        spesifikasi: (data.spesifikasi) ? data.spesifikasi : "",
                        satuan: (data.satuan) ? data.satuan : "",
                        volume: (data.volume) ? data.volume : "",
                        harga_satuan: (data.harga_satuan) ? toCurrency(data.harga_satuan) : "",
                        harga_total: (data.harga_total) ? toCurrency(data.harga_total) : "",
                        aksi: <div className="d-flex flex-row gap-2">
                            <button className="btn btn-success" onClick={() => setOpenModalEdit({ id_rapa: data.id_rapa, open_modal: true })}>Edit</button>
                            <button className="btn btn-danger" onClick={() => { deleteData(data.id_rapa) }}>Delete</button>
                        </div>
                    })
                }
                setDataTable(arrRapa);


            }
            setLoader(false)
            console.log(result)
        } catch (error) {
            setLoader(false)
            console.log("e = " + error);
        }
    }
    const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
    };
    const deleteData = async (id) => {
        const resultConfirm = await AlertConfirm("Apakah anda yakin ingin menghapus data ini ? ", "warning", "Hapus", false, "Data berhasil di hapus");
        if (resultConfirm.status) {
            setLoader(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            try {
                const result = await apiConfig.delete(apiUrl + "/CostControl/Rapa/delete-rapa?id=" + id, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (result.status == 200) {

                    setLoader(false);
                    swalAlert(result.data.message, result.statusText, "success");
                }

            } catch (error) {
                console.log(error);
                setLoader(false);
                swalAlert(error.message, error.code, "error");
            }


        }
        // console.log(id)
    }

    const AlertConfirm = async (message, icon, confirmButtonName, textarea = false, messageDeleted = "Your file has been deleted.") => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger me-2"
            },
            buttonsStyling: false
        });
        let objSwall = {
            title: "Apakah Yakin?",
            text: message,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonName,
            cancelButtonText: "Kembali",
            reverseButtons: true,

        };

        if (textarea) {
            objSwall.input = 'textarea';
            objSwall.inputLabel = 'Catatan';
            objSwall.inputPlaceholder = 'Catatan....';

        }
        const result = await swalWithBootstrapButtons.fire(objSwall);
        if (result.isConfirmed) {
            setReload(prev => !prev);
            return {
                status: true,
                value: result.value
            };
            // ✅ user confirmed
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // await swalWithBootstrapButtons.fire(
            //     "Cancelled",
            //     // "Your imaginary file is safe :)",
            //     "error"
            // );
            return {
                status: false,
                // value: result.value
            }; // ✅ user cancelled
        }

        return false;
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
                setReload(prev => !prev);
                clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {

                console.log("I was closed by the timer");
            }
        });
    }

    useEffect(() => {
        // console.log(params.get("id"))
        if (params.get("id")) {
            getDataById()
            getRapa();
        }

    }, [params.get("id"), openModalEdit.open_modal, reload, openModalAdd.open])
    return (
        <Fragment>
            <Seo title={"Detail Rapa"} />
            <PageHeaderVms title='Daftar Rapa' item='Daftar Rapa' active_item='Detail Rapa' />
            <LoadersSimUmira open={loader} />
            <UploadDataRapa openModal={openModalUpload} setOpenModal={setOpenModalUpload} reload={reload} setReload={setReload} />
            <EditDataRapa openModal={openModalEdit} setOpenModal={setOpenModalEdit} />
            <AddDataRapa openModal={openModalAdd} setOpenModal={setOpenModalAdd} loader={loader} setLoader={setLoader} />
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header className="d-flex align-items-center justify-content-between">
                            <button
                                type="button" className="btn btn-warning label-btn rounded-pill"
                                onClick={() => navigate.push("/apps/CostControl/Rapa/DaftarRapa")}
                            >
                                <i className="ri-arrow-left-line label-btn-icon me-2 rounded-pill" />
                                kembali
                            </button>
                            <a
                                href="/template/template-RAPA.xlsx"
                                download
                                className="btn btn-success label-btn rounded-pill"
                            >
                                <i className="ri-download-2-line label-btn-icon me-2 rounded-pill" />
                                Download Template RAPA
                            </a>
                            <button
                                type="button" className="btn btn-primary label-btn rounded-pill"
                                onClick={() => setOpenModalUpload({ id_proyek: params.get("id"), open: true })}
                            // onClick={() => navigate.push("/apps/CostControl/Rapa/DaftarRapa")}
                            >
                                <i className="ri-add-circle-line label-btn-icon me-2 rounded-pill" />
                                Upload
                            </button>
                            <button
                                type="button" className="btn btn-secondary label-btn rounded-pill"
                                onClick={() => setOpenModalAdd({ kode_proyek: dataProyek.kode_proyek, nama_proyek: dataProyek.nama_proyek, tanggal_kontrak: dataProyek.tanggal_kontrak, biaya_rab: dataProyek.biaya_rab, biaya_rap: dataProyek.biaya_rap, bk_pu_awal: dataProyek.bk_pu_awal, open: true })}
                            // onClick={() => navigate.push("/apps/CostControl/Rapa/DaftarRapa")}
                            >
                                <i className="ri-add-circle-line label-btn-icon me-2 rounded-pill" />
                                Tambah Rapa
                            </button>

                        </Card.Header>
                        <Card.Body>
                            <h5>Kode Proyek : {dataProyek.kode_proyek}</h5>
                            <h5>Nama Proyek : {dataProyek.nama_proyek}</h5>
                            <h5>Tanggal Berakhir Kontrak : {dataProyek.tanggal_kontrak}</h5>
                            <h5>RAB (Rincian Anggaran Biaya) : {dataProyek.biaya_rab}</h5>
                            <h5>RAP (Rincian Anggaran Proyek) : {dataProyek.biaya_rap}</h5>
                            <h5>BK/PU Awal: {dataProyek.bk_pu_awal}</h5>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Data Rapa
                            </div>
                        </Card.Header>
                        <Card.Body>

                            <div className="table-responsive">
                                <BasicTableCostControl column={COLUMNS} datatable={datatable} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}
DetailRapa.layout = "ContentlayoutVms";


export default DetailRapa;