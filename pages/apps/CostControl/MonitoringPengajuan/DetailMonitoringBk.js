
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import dynamic from "next/dynamic";

const DetailMonitoringBk = ({ openModal, setOpenModal, loader, setLoader, reload, setReload }) => {
    const [dataTable, setDataTable] = useState([]);
    const [dataProyek, setDataProyek] = useState({});
    const COLUMNS = [
        {
            Header: "Cost Code",
            accessor: "cost_code",
        },
        {
            Header: "Tanggal",
            accessor: "tanggal",
        },
        {
            Header: "Kategori",
            accessor: "kategori",
        },

        {
            Header: "Nama",
            accessor: "nama",
        },

        // {
        //     Header: "Spesifikasi",
        //     accessor: "spesifikasi",
        // },
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
            Header: "Invoice Nota",
            accessor: "invoice_nota",
        },
        {
            Header: "NO PO",
            accessor: "no_po",
        },
    ]
    const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
    };

    const formatdate = (tanggal) =>
        new Date(tanggal).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
        );
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
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            Swal.fire("Berhasil", "Pengajuan berhasil di-approve", "success");
            setReload(prev => !prev);
            setOpenModal({ ...openModal, open: false });


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
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            Swal.fire("Berhasil", "Pengajuan berhasil direject", "success");
            setReload(prev => !prev);
            setOpenModal({ ...openModal, open: false });


        } catch (e) {
            console.error(e);
            Swal.fire(
                "Gagal",
                e.response?.data?.message || "Gagal reject",
                "error"
            );
        }
    };
    const getDataById = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek-id-bk-pu?id=" + openModal.id_proyek, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
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
                    // biaya_rab: (result.data.data.proyek.biaya_rab) ? result.data.data.proyek.biaya_rab : "",
                    biaya_rab: calcRabAkhir(result.data.data.proyek.biaya_rab, result.data.data.kerja_kurang, result.data.data.kerja_tambah),
                    // bk_pu_awal: (result.data.data.proyek.bk_pu_awal) ? result.data.data.proyek.bk_pu_awal + " %" : ""
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
    const setTable = () => {
        console.log(openModal.datas);
        const arrData = [];
        if (openModal.datas?.pengajuan_bk_detail?.length > 0) {
            for (const data of openModal.datas.pengajuan_bk_detail) {
                arrData.push({
                    cost_code: data.rapa?.costCodeRapa?.cost_code ?? "-",
                    tanggal: formatdate(data.tanggal_penerima) ?? "-",
                    kategori: data.rapa?.costCodeRapa?.kategori?.nama_kategori ?? "-",
                    nama: data.rapa?.costCodeRapa?.nama ?? "-",
                    satuan: data.rapa?.costCodeRapa?.satuan ?? "-",
                    volume: data.volume_bk ?? "-",
                    harga_satuan: toCurrency(data.harga_total / data.volume_bk) ?? "-",
                    harga_total: toCurrency(data.harga_total),
                    invoice_nota: data.invoice_nota,
                    no_po: data.no_po
                })
            }
        }
        setDataTable(arrData)
    }

    useEffect(() => {
        if (openModal.open) {
            getDataById();
            setTable()
        }
    }, [openModal.open])

    return (
        <Modal size="xl" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }); setDataTable([]) }}>

            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Detail Approval BK</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xl={12} className="m2">
                        <Card className="custom-card">

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
                                <h5>BK/PU Awal : {dataProyek.bk_pu_awal}</h5>
                                <h5>BK/PU Terkini : {formatPercent(calcPercentage(dataProyek.total_bk, dataProyek.total_pu))}</h5>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Divider />
                    <Col xl={12} className="m-2">
                        <div className="table-responsive mt-2">
                            <BasicTableCostControl column={COLUMNS} datatable={dataTable} />
                        </div>
                    </Col>
                    <Divider className="my-3" />

                    <Col xl={12}>
                        <div
                            className="p-4"
                            style={{
                                background:
                                    "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
                                borderRadius: "18px",
                                border: "1px solid #e5e7eb",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                            }}
                        >
                            <div className="d-flex align-items-center mb-3 gap-2">
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "36px",
                                        height: "36px",
                                        borderRadius: "12px",
                                        background:
                                            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                    }}
                                >
                                    <i
                                        className="ti ti-notes text-white"
                                        style={{ fontSize: "18px" }}
                                    />
                                </div>

                                <label
                                    className="fw-bold mb-0"
                                    style={{
                                        color: "#111827",
                                        fontSize: "15px",
                                    }}
                                >
                                    Catatan
                                </label>
                            </div>

                            <div
                                style={{
                                    color: "#4b5563",
                                    lineHeight: "1.9",
                                    fontSize: "14px",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                }}
                            >
                                {openModal.datas?.catatan ?? (
                                    <span className="text-muted fst-italic">
                                        Tidak ada catatan
                                    </span>
                                )}
                            </div>
                        </div>
                    </Col>

                    <Divider className="my-3" />
                    <Col xl={12} className="mt-3">

                        <div className="d-flex align-items-center gap-2 mb-4">
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "14px",
                                    background:
                                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                }}
                            >
                                <i
                                    className="ti ti-git-pull-request text-white"
                                    style={{ fontSize: "20px" }}
                                />
                            </div>

                            <div>
                                <h6 className="fw-bold mb-0">
                                    Disposisi Persetujuan
                                </h6>

                                <span className="text-muted fs-12">
                                    Riwayat approval pengajuan biaya konstruksi
                                </span>
                            </div>
                        </div>

                        {openModal.datas?.pengajuan_persetujuan_bk?.length > 0 ? (
                            <div className="position-relative">

                                {openModal.datas.pengajuan_persetujuan_bk.map((p, i) => (
                                    <div
                                        key={i}
                                        className="position-relative ps-5 pb-4"
                                    >

                                        {/* Timeline Line */}
                                        {i !== openModal.datas.pengajuan_persetujuan_bk.length - 1 && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    left: "18px",
                                                    top: "42px",
                                                    width: "2px",
                                                    height: "100%",
                                                    background: "#e5e7eb",
                                                }}
                                            />
                                        )}

                                        {/* Circle */}
                                        <div
                                            className="position-absolute d-flex align-items-center justify-content-center"
                                            style={{
                                                left: "0",
                                                top: "0",
                                                width: "38px",
                                                height: "38px",
                                                borderRadius: "50%",
                                                background:
                                                    p.status_approver === "Approved"
                                                        ? "#22c55e"
                                                        : p.status_approver === "Rejected"
                                                            ? "#ef4444"
                                                            : "#6366f1",
                                                color: "white",
                                                fontWeight: "bold",
                                                boxShadow:
                                                    "0 4px 10px rgba(0,0,0,0.1)",
                                            }}
                                        >
                                            <i className="ti ti-user-check" />
                                        </div>

                                        {/* Card */}
                                        <div
                                            className="p-4"
                                            style={{
                                                background: "white",
                                                borderRadius: "18px",
                                                border: "1px solid #f1f5f9",
                                                boxShadow:
                                                    "0 6px 18px rgba(15,23,42,0.06)",
                                            }}
                                        >

                                            <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
                                                <div>
                                                    <h6 className="fw-bold mb-1">
                                                        {p.nama_persetujuan || "-"}
                                                    </h6>

                                                    <span className="text-muted fs-13">
                                                        {p.jabatan_persetujuan || "-"}
                                                    </span>
                                                </div>

                                                <span
                                                    className="px-3 py-2"
                                                    style={{
                                                        borderRadius: "999px",
                                                        fontSize: "12px",
                                                        fontWeight: "600",
                                                        background:
                                                            p.status_approver === "Approved"
                                                                ? "rgba(34,197,94,0.12)"
                                                                : p.status_approver === "Rejected"
                                                                    ? "rgba(239,68,68,0.12)"
                                                                    : "rgba(99,102,241,0.12)",
                                                        color:
                                                            p.status_approver === "Approved"
                                                                ? "#16a34a"
                                                                : p.status_approver === "Rejected"
                                                                    ? "#dc2626"
                                                                    : "#4f46e5",
                                                    }}
                                                >
                                                    {p.status_approver}
                                                </span>
                                            </div>

                                            <div
                                                className="p-3"
                                                style={{
                                                    background: "#f8fafc",
                                                    borderRadius: "14px",
                                                }}
                                            >
                                                <span className="text-muted fs-12 d-block mb-1">
                                                    Catatan Persetujuan
                                                </span>

                                                <span
                                                    style={{
                                                        color: "#374151",
                                                        lineHeight: "1.8",
                                                        whiteSpace: "pre-wrap",
                                                    }}
                                                >
                                                    {p.catatan_persetujuan || "-"}
                                                </span>
                                            </div>

                                            <div className="mt-3 text-end">
                                                <span className="text-muted fs-12">
                                                    {p.tanggal_persetujuan || "-"}
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="text-center py-5"
                                style={{
                                    background: "#f8fafc",
                                    borderRadius: "20px",
                                    border: "1px dashed #d1d5db",
                                }}
                            >
                                <i
                                    className="ti ti-file-x text-muted"
                                    style={{
                                        fontSize: "42px",
                                    }}
                                />

                                <h6 className="mt-3 text-muted">
                                    Belum Ada Persetujuan
                                </h6>

                                <span className="text-muted fs-13">
                                    Data disposisi approval belum tersedia
                                </span>
                            </div>
                        )}
                    </Col>

                </Row>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">

                <div className="d-flex flex-wrap gap-3 w-100 justify-content-end">

                    

                    {/* Close */}
                    <button
                        type="button"
                        data-bs-dismiss="modal"
                        onClick={() => {
                            setOpenModal({
                                ...openModal,
                                open: false
                            });
                            setDataTable([]);
                        }}
                        className="btn d-flex align-items-center gap-2 px-4 py-2"
                        style={{
                            background: "#f3f4f6",
                            border: "1px solid #e5e7eb",
                            borderRadius: "14px",
                            color: "#374151",
                            fontWeight: "600",
                        }}
                    >
                        <i className="ri-close-circle-line fs-5" />
                        <span>Close</span>
                    </button>

                </div>

            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(DetailMonitoringBk), { ssr: false });