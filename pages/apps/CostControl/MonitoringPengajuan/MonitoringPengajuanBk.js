
import Swal from "sweetalert2";
import Seo from "@/shared/layout-components/seo/seo";
import { Fragment, useEffect, useState } from "react";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import { Button, Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import { useRouter } from "next/router";
import DetailMonitoringBk from "./DetailMonitoringBk";


const MonitoringPengajuanBk = () => {
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);
    const [datatable, setDataTable] = useState([]);
    const COLUMNS = [
        {
            Header: "Proyek",
            accessor: "proyek"
        },
        {
            Header: "RAP",
            accessor: "rap",
        },
        {
            Header: "Biaya Di Ajukan",
            accessor: "biaya_diajukan",
        },
        // {
        //     Header: "Biaya BK Terkini",
        //     accessor: "biaya_bk_terkini",
        // },
        {
            Header: "Catatan",
            accessor: "catatan",
        },

        {
            Header: "aksi",
            accessor: "aksi",
        },
    ];
    const [openDetail, setOpenDetail] = useState({
        id_pengajuan_bk:"",
        id_proyek: "",
        open: false,
        datas: {}
    })

    const getApprovePengajuanBk = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(
                apiUrl + "/CostControl/pengajuan/get-monitoring-pengajuan-bk",
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log(result.data.data);
            if (result.status === 200) {
                const arr = [];
                for (const data of result.data.data) {
                    const biaya_ajuan = data.pengajuan_bk_detail.reduce(
                        (total, item) => total + Number(item.harga_total || 0),
                        0
                    );
                    const biaya_bk_terkini = data.proyek.bk.reduce(
                        (total, item) => total + Number(item.harga_total || 0),
                        0
                    );
                    arr.push({
                        proyek: data.proyek?.nama_proyek ?? "-",
                        rap: toCurrency(data.proyek?.biaya_rap) ?? "-",
                        biaya_diajukan: toCurrency(biaya_ajuan) ?? "-",
                        biaya_bk_terkini: toCurrency(biaya_bk_terkini),
                        catatan: data.catatan,
                        aksi: (
                            <div className="d-flex flex-row gap-2">
                                <button type="button"
                                    className="btn btn-success"
                                    onClick={() => setOpenDetail({id_pengajuan_bk: data.id_pengajuan_bk, id_proyek: data.proyek?.id_proyek, open:true, datas: data})} >
                                    <i className="ri-check-line label-btn-icon me-2" /> Detail
                                </button>
                                {/* <button type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleReject(data.id_pengajuan_bk)} >
                                    <i className="ri-close-line label-btn-icon me-2" /> Reject
                                </button> */}
                            </div>)
                    });
                } setDataTable(arr);
            } setLoader(false);
        } catch (error) {
            console.error("Error getApprovePengajuanBk:", error);
            setLoader(false);
        }
    };


    const handleApprove = async (id_pengajuan_bk) => {
        const confirm = await Swal.fire({
            title: "Approve Pengajuan",
            text: "Apakah Anda yakin ingin menyetujui pengajuan ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Approve",
            cancelButtonText: "Batal"
        });

        if (!confirm.isConfirmed) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            await apiConfig.post(
                apiUrl +
                `/CostControl/pengajuan/approve-pengajuan-bk`, {},
                {
                    params: {
                        id_pengajuan_bk: id_pengajuan_bk,
                        status_approver: "Approve",
                        catatan: ""
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            Swal.fire("Berhasil", "Pengajuan berhasil di-approve", "success");
            setReload(prev => !prev);

        } catch (e) {
            console.error(e);
            Swal.fire(
                "Gagal",
                e.response?.data?.message || "Gagal approve",
                "error"
            );
        }
    };

    const handleReject = async (id_pengajuan_bk) => {
        const { value: catatan } = await Swal.fire({
            title: "Reject Pengajuan",
            input: "textarea",
            inputLabel: "Alasan Penolakan",
            inputPlaceholder: "Masukkan alasan reject...",
            inputAttributes: {
                "aria-label": "Alasan reject"
            },
            showCancelButton: true,
            confirmButtonText: "Reject",
            cancelButtonText: "Batal",
            inputValidator: (value) => {
                if (!value) {
                    return "Alasan reject wajib diisi!";
                }
            }
        });

        if (!catatan) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            await apiConfig.post(
                apiUrl + `/CostControl/pengajuan/approve-pengajuan-bk`,
                {},
                {
                    params: {
                        id_pengajuan_bk: id_pengajuan_bk,
                        status_approver: "Reject",
                        catatan: catatan
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            Swal.fire("Berhasil", "Pengajuan berhasil direject", "success");
            setReload(prev => !prev);

        } catch (e) {
            console.error(e);
            Swal.fire(
                "Gagal",
                e.response?.data?.message || "Gagal reject",
                "error"
            );
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
        getApprovePengajuanBk();
    }, [reload]);

    return (
        <Fragment>
            <Seo title={"Monitoring Pengajuan Biaya Kontruksi"} />
            <PageHeaderVms title='Monitoring Biaya Kontruksi' item='Monitoring' active_item='Daftar Monitoring Pengajuan Biaya Konstruksi' />
            <LoadersSimUmira open={loader} />
            <DetailMonitoringBk openModal={openDetail} setOpenModal={setOpenDetail} loader={loader} setLoader={setLoader}  reload={reload} setReload={setReload}/>
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Daftar Pengajuan Biaya Konstruksi
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
    )

}

MonitoringPengajuanBk.layout = "ContentlayoutVms";
export default MonitoringPengajuanBk;