import { Fragment, useEffect, useState } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import { Card, Col, Row } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import { useSearchParams } from "next/navigation";
import CreateScurvePlan from "./modals/CreateScurvePlan";
import { useRouter } from "next/router";
import BasicTableCostControl from "../../DataTables/DataTablesCostControl";
import DetailDokumenScurvePlan from "./modals/DetailDokumenScurvePlan";
import Swal from "sweetalert2";
import CreateActionPlan from "./modals/CreateActionPlan";



const DetailActionPlan = () => {
    const [loader, setLoader] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const [reload, setReload] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState({
        id_proyek: "",
        open_modal: false
    })
    const [openDetailDokumen, setOpenDetailDokumen] = useState({
        open: false,
        file_url: ""
    });
    const navigate = useRouter();
    const params = useSearchParams();
    const [dataProyek, setDataProyek] = useState({
        total_bk: "",
        total_pu: "",
        kode_proyek: "",
        nama_proyek: "",
        deskripsi_proyek: "",
        tanggal_akhir_kontrak: "",
        tanggal_awal_kontrak: "",
        nominal_mos: "",
        biaya_rap: "",
        biaya_rab: "",
        bk_pu_awal: ""
    });
    const COLUMNS = [
        {
            Header: "Week",
            accessor: "week",
        },
        {
            Header: "Rentang Tanggal",
            accessor: "tanggal",
        },
        {
            Header: "Nominal Action Plan",
            accessor: "nominal_action_plan",
        },
        {
            Header: "Dokumen Pendukung",
            accessor: "dokumen_pendukung",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];

    const formatdate = (tanggal) =>
        new Date(tanggal).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
    );
    
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
                    nominal_mos: result.data.data.current_mos,
                    deskripsi_proyek: result.data.data.proyek.deskripsi_proyek,
                    tanggal_akhir_kontrak: (result.data.data.proyek.tanggal_akhir_kontrak) ? result.data.data.proyek.tanggal_akhir_kontrak : "",
                    tanggal_awal_kontrak: (result.data.data.proyek.tanggal_awal_kontrak) ? result.data.data.proyek.tanggal_awal_kontrak : "",
                    biaya_rap: (result.data.data.proyek.biaya_rap) ? result.data.data.proyek.biaya_rap : "",
                    biaya_rab: (result.data.data.proyek.biaya_rab) ? result.data.data.proyek.biaya_rab : "",
                    bk_pu_awal: (result.data.data.proyek.bk_pu_awal) ? result.data.data.proyek.bk_pu_awal + " %" : ""
                });

            }
            setLoader(false)
            console.log(result)
        } catch (error) {
            setLoader(false)
            console.log("e = " + error);
        }
    }
    const getFile = async (id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        // console.log(id);
        setLoader(true);
        try {
            const response = await apiConfig.get(apiUrl + "/CostControl/ActionPlan/dokumen-file", {
                responseType: "blob",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                params: {
                    id: id
                }
            });
            // const typeData = {};
            // typeData.type = "application/pdf";
            const data = response.data;

            if (data) {
                // console.log(data);
                const fileURL = window.URL.createObjectURL(
                    new Blob([data], { type: "application/pdf" })
                );
                //setFrameSrc(fileURL);
                setOpenDetailDokumen({
                    file_url: fileURL, open: true
                });
                // setSelectedOptions(kualifikasiArr);
                // setTableData(userArr);
                setLoader(false);
            }

        } catch (error) {
            console.log(error);
            // setError(error.message);
            setLoader(false);
        }
    }
    const getDataScurve = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/ActionPlan/get-action-plan-by-proyek?id_proyek=" + params.get("id"), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status == 200) {
                const arrScurve = [];
                for (const a of result.data.data) {
                    arrScurve.push({
                        id_scurve: a.id_scurve,
                        week: a.week,
                        tanggal: a.tanggal_awal + " s/d " + a.tanggal_akhir,
                        nominal_action_plan: toCurrency(a.nominal_action_plan),
                        dokumen_pendukung: (
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-sm btn-info"
                                    onClick={() => {
                                        getFile(
                                            a.id_action_plan
                                        );
                                        //setOpenDetailDokumen({...openDetailDokumen, open:true});
                                    }
                                    }
                                >
                                    Lihat Dokumen
                                </button>
                            </div>
                        ),
                        aksi: <div className="d-flex gap-2">
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => { deleteData(a.id_action_plan) }}
                            >
                                Delete
                            </button>
                        </div>,
                    })
                }
                setDataTable(arrScurve);
                setLoader(false);
            }
        } catch (error) {
            setLoader(false);
            console.log("e = " + error);
        }

    }
    const deleteData = async (id) => {
        const resultConfirm = await AlertConfirm("Apakah anda yakin ingin menghapus data ini ? ", "warning", "Hapus", false, "Data berhasil di hapus");
        if (resultConfirm.status) {
            setLoader(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            try {
                const result = await apiConfig.delete(apiUrl + "/CostControl/ActionPlan/delete-action-plan-by-id?id=" + id, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                if (result.status == 200) {
                    setLoader(false);
                    swalAlert(result.data.message, result.statusText, "success");
                }

            } catch (error) {
                // console.log(error);
                setLoader(false);
                swalAlert(error.message, error.code, "error");
            }


        }
        // console.log(id)
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
            setReload(prev => !prev);
            return {
                status: false,
                // value: result.value
            }; // ✅ user cancelled
        }

        return false;
    }
    useEffect(() => {
        if (params.get("id")) {
            getDataById();
            getDataScurve();
            // getPuByProyek();

        }
    }, [params.get("id"), reload, openModalCreate]);

    return (
        <Fragment>
            <Seo title={"Detail Action Plan"} />

            <PageHeaderVms title='Daftar Action Plan' item='Action Plan' active_item='Detail Action Plan' />
            <LoadersSimUmira open={loader} />
            <CreateActionPlan openModal={openModalCreate} setOpenModal={setOpenModalCreate} loader={loader} setLoader={setLoader} />
            <DetailDokumenScurvePlan openModal={openDetailDokumen} setOpenModal={setOpenDetailDokumen} />
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header className="d-flex align-items-center justify-content-between">
                            <button
                                type="button" className="btn btn-warning label-btn rounded-pill"
                                onClick={() => navigate.push("/apps/CostControl/CurvePlan/DaftarScurvePlan")}
                            >
                                <i className="ri-arrow-left-line label-btn-icon me-2 rounded-pill" />
                                kembali
                            </button>
                            <button
                                type="button" className="btn btn-primary label-btn rounded-pill"
                                // onClick={() => setOpenModalUpload({ id_proyek: params.get("id"), open_modal: true })}
                                onClick={() => setOpenModalCreate({ id_proyek: params.get("id"), open_modal: true })}
                            // onClick={() => console.log("test")}
                            // onClick={() => navigate.push("/apps/CostControl/Rapa/DaftarRapa")}
                            >
                                <i className="ri-add-circle-line label-btn-icon me-2 rounded-pill" />
                                Input Action Plan
                            </button>

                        </Card.Header>
                        <Card.Body>
                            <h5>Kode Proyek : {dataProyek.kode_proyek}</h5>
                            <h5>Nama Proyek : {dataProyek.nama_proyek}</h5>
                            <h5>Tanggal Awal Kontrak :  {formatdate(dataProyek.tanggal_awal_kontrak)}</h5>
                            <h5>Tanggal Berakhir Kontrak : {formatdate(dataProyek.tanggal_akhir_kontrak)}</h5>
                            <h5>RAB (Rincian Anggaran Biaya) : {toCurrency(dataProyek.biaya_rab)}</h5>
                            <h5>RAP (Rincian Anggaran Proyek) : {toCurrency(dataProyek.biaya_rap)}</h5>
                            <h5>Pendapatan Usaha : {toCurrency(dataProyek.total_pu)}</h5>
                            <h5>Posisi Biaya Konstruksi : {toCurrency(dataProyek.total_bk)}</h5>
                            <h5>Material On Site: {toCurrency(dataProyek.nominal_mos)}</h5>
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
                            <div className="card-title">Detail Action Plan</div>
                        </Card.Header>

                        <Card.Body>
                            {(dataTable).length === 0 ? (
                                <p className="text-muted">Belum ada data</p>
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
    );
}

DetailActionPlan.layout = "ContentlayoutVms";

export default DetailActionPlan;
