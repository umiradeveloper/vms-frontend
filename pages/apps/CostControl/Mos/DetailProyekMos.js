import Seo from "@/shared/layout-components/seo/seo";
import { Fragment, useEffect, useState } from "react";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import CreateMos from "./modals/CreateMos";
import Datatables from "@/pages/components/apps/tables/datatable";
import Swal from "sweetalert2";
import EditMos from "./modals/EditMos";
import DetailMaterialMos from "./modals/DetailMaterialMos";



const DetailProyekMos = () => {
    const [dataTable, setDataTable] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);
    // const [idPu, setIdPu] = useState();
    const params = useSearchParams();
    const navigate = useRouter();
    const [dataProyek, setDataProyek] = useState({
        total_bk: "",
        total_pu: "",
        kode_proyek: "",
        nama_proyek: "",
        deskripsi_proyek: "",
        tanggal_kontrak: "",
        tanggal_awal_kontrak:"",
        biaya_rap: "",
        biaya_rab: "",
        bk_pu_awal: ""
    });

    const [PendapatanUsaha, setPendapatanUsaha] = useState({
        datail: []
    });
    const [openModalEdit, setOpenModalEdit] = useState({
        id_pu: "",
        open: false
    })
    const [openModalUpload, setOpenModalUpload] = useState({
        id_proyek: "",
        open_modal: false
    })
    const [openDetailMaterialMos, setOpenDetailMaterialMos] = useState({
        id_pu: "",
        open: false
    })
    const COLUMNS = [
        {
            Header: "Week",
            accessor: "week_pu",
        },
        {
            Header: "Rentang Tanggal",
            accessor: "tanggal",
        },
        {
            Header: "Jumlah Material On-Site",
            accessor: "nominal_pu",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];

    const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
    };
    const formatPercent = (value, digits = 2) => `${Number(value).toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
    const calcPercentage = (part, total) => {
        const t = Number(total) || 0;
        if (t === 0) return 0;
        const p = (Number(part) / t) * 100;
        return p;
    }

    const getDataById = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek-id-bk-pu?id=" + params.get("id"), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result);
            if (result.status) {
                setDataProyek({
                    total_bk: result.data.data.total_bk,
                    total_pu: result.data.data.total_pu,
                    nama_proyek: result.data.data.proyek.nama_proyek,
                    kode_proyek: result.data.data.proyek.kode_proyek,
                    deskripsi_proyek: result.data.data.proyek.deskripsi_proyek,
                    tanggal_kontrak: (result.data.data.proyek.tanggal_akhir_kontrak) ? result.data.data.proyek.tanggal_akhir_kontrak : "",
                    tanggal_awal_kontrak: (result.data.data.proyek.tanggal_awal_kontrak) ? result.data.data.proyek.tanggal_awal_kontrak : "",
                    biaya_rap: (result.data.data.proyek.biaya_rap) ? result.data.data.proyek.biaya_rap : "",
                    biaya_rab: (result.data.data.proyek.biaya_rab) ? result.data.data.proyek.biaya_rab : "",
                    bk_pu_awal: (result.data.data.proyek.bk_pu_awal) ? result.data.data.proyek.bk_pu_awal+" %" :""
                });

            }
            setLoader(false)
            console.log(result)
        } catch (error) {
            setLoader(false)
            console.log("e = " + error);
        }
    }
    const getPuByProyek = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const result = await apiConfig.get(
                apiUrl + "/CostControl/PendapatanUsaha/get-pu-by-proyek?id_proyek=" + params.get("id"),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            if (result.status === 200) {
                const arrpu = [];
                for (const a of result.data.data) {
                    arrpu.push({
                        id_pu: a.id_pu,
                        week_pu: a.week_pu,
                        tanggal: a.tanggal_awal + " s/d " + a.tanggal_akhir,
                        nominal_pu: toCurrency(a.nominal_pu),
                        aksi: <div className="d-flex gap-2">
                                <button 
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {handleDelete(a.id_pu)}}
                                >
                                    Delete
                                </button>
                                <button 
                                    className="btn btn-success" 
                                    onClick={() => setOpenModalEdit({id_pu:a.id_pu, open_modal: true})}>Edit</button>
                            </div>,
                    })
                }
                setDataTable(arrpu);
            }

            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.log("err =", error);
        }
    };

    const handleDelete = async (item) => {
        const confirmed = await Swal.fire({
            title: "Hapus Material On-Site",
            text: `Apakah Anda yakin ingin menghapus Material On-Site?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal"
        }).then((result) => result.isConfirmed);

        if (!confirmed) return; // user tekan batal → stop

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            const response = await apiConfig.delete(
                apiUrl + `/CostControl/PendapatanUsaha/delete-pu?id=${item}`,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            Swal.fire({
                title: "Berhasil!",
                text: response.data.message,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            setReload(prev => !prev) // ← Refresh tabel

        } catch (error) {
            console.log(error);

            Swal.fire({
                title: "Gagal!",
                text: error.message,
                icon: "error"
            });
        }
    };

    useEffect(() => {
        if (params.get("id")) {
            getDataById();
            getPuByProyek();
        
        }
    }, [params.get("id"), openModalUpload, reload])

    return (
        <Fragment>
            <Seo title={"Detail Material On-Site Proyek"} />

            <PageHeaderVms title='Material On-Site' item='Daftar Material On-Site' active_item='Detail Material On-Site' />
            <LoadersSimUmira open={loader} />
            <CreateMos openModal={openModalUpload} setOpenModal={setOpenModalUpload} />
            <EditMos openModal={openModalEdit} setOpenModal={setOpenModalEdit} loader={loading} setLoader={setLoading} reload={reload} setReload={setReload}/>
            <DetailMaterialMos openModal={openDetailMaterialMos} setOpenModal={setOpenDetailMaterialMos} loader={loading} setLoader={setLoading} />
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header className="d-flex align-items-center justify-content-between">
                            <button
                                type="button" className="btn btn-warning label-btn rounded-pill"
                                onClick={() => navigate.push("/apps/CostControl/Mos/DaftarProyekMos")}
                            >
                                <i className="ri-arrow-left-line label-btn-icon me-2 rounded-pill" />
                                kembali
                            </button>
                            <button
                                type="button" className="btn btn-primary label-btn rounded-pill"
                                onClick={() => setOpenModalUpload({ id_proyek: params.get("id"), open_modal: true })}
                            // onClick={() => console.log("test")}
                            // onClick={() => navigate.push("/apps/CostControl/Rapa/DaftarRapa")}
                            >
                                <i className="ri-add-circle-line label-btn-icon me-2 rounded-pill" />
                                Input Material On-Site
                            </button>

                        </Card.Header>
                        <Card.Body>
                            <h5>Kode Proyek : {dataProyek.kode_proyek}</h5>
                            <h5>Nama Proyek : {dataProyek.nama_proyek}</h5>
                            <h5>Tanggal Awal Kontrak : {dataProyek.tanggal_awal_kontrak}</h5>
                            <h5>Tanggal Berakhir Kontrak : {dataProyek.tanggal_kontrak}</h5>
                            <h5>RAB (Rincian Anggaran Biaya) : {toCurrency(dataProyek.biaya_rab)}</h5>
                            <h5>RAP (Rincian Anggaran Proyek) : {toCurrency(dataProyek.biaya_rap)}</h5>
                            <h5>Pendapatan Usaha : {toCurrency(dataProyek.total_pu)}</h5>
                            <h5>Posisi Biaya Konstruksi : {toCurrency(dataProyek.total_bk)}</h5>
                            <h5>Material On Site: </h5>
                            <h5>BK / PU Awal : {dataProyek.bk_pu_awal}</h5>
                            <h5>Persentase BK/PU : {formatPercent(calcPercentage(dataProyek.total_bk, dataProyek.total_pu))}</h5>
                        </Card.Body>
                    </Card>
                </Col>  
            </Row>
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Detail Material On-Site</div>
                        </Card.Header>

                        <Card.Body>
                            {(dataTable).length === 0 ? (
                                <p className="text-muted">Belum ada data Material On-Site</p>
                            ) : (
                                <div className="table-responsive">
                                    <BasicTableCostControl column={COLUMNS} datatable={dataTable} />
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )

}

DetailProyekMos.layout = "ContentlayoutVms";

export default DetailProyekMos;