import { useEffect, useState } from "react";
import { Col, Modal, Row, Button } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const toCurrency = (value) => {
    if (!value && value !== 0) return "Rp0";
    return new Intl.NumberFormat("id-ID", {
        style: "currency", currency: "IDR", minimumFractionDigits: 0,
    }).format(Number(value));
};

const PayrollMaster = ({ loader, setLoader, reload }) => {
    const [datatable, setDataTable] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const authHeader = () => ({ "Authorization": "Bearer " + localStorage.getItem("token") });

    const COLUMNS = [
        { Header: "Nama Karyawan", accessor: "nama" },
        { Header: "Departemen", accessor: "departemen" },
        { Header: "Jabatan", accessor: "jabatan" },
        {
            Header: "Aksi",
            Cell: ({ row }) => (
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => { setSelectedData(row.original.rawData); setShowDetail(true); console.log(row.original.rawData); }}>
                        <i className="ri-eye-line" />
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(row.original.rawData.payroll_master?.id_payroll_master)}>
                        <i className="ri-delete-bin-line" />
                    </button>
                </div>
            )
        },
    ];

    const getMasterList = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const res = await apiConfig.get(
                apiUrl + "/HR-Payroll/get-all-payroll-master",
                { headers: authHeader() }
            );
            if (res.status === 200) {
                setDataTable(res.data.data.map(d => {
                    const m = d.payroll_master || {};

                    const emp = m.employee || {};
                    return {
                        rawData: d,
                        nama: emp.nama || "-",
                        departemen: emp.departemen || "-",
                        jabatan: emp.jabatan || "-",
                    };
                }));
            }
        } catch (e) {
            console.error("Error getMasterList:", e);
        }
        setLoader(false);
    };

    const exportExcel = () => {
        if (!datatable.length) {
            Swal.fire("Info", "Tidak ada data payroll untuk diexport", "info");
            return;
        }

        const exportData = datatable.map((item, index) => {
            const d = item.rawData || {};
            const m = d.payroll_master || {};
            const ded = d.deduction || {};
            const emp = m.employee || {};

            return {
                No: index + 1,
                "Nama Karyawan": emp.nama || "-",
                Departemen: emp.departemen || "-",
                Jabatan: emp.jabatan || "-",

                "Gaji Pokok": Number(m.gaji_pokok || 0),
                "Tunjangan Jabatan": Number(m.tunjangan_jabatan || 0),
                "Tunjangan Operasional": Number(m.tunjangan_operasional || 0),
                "Tunjangan Transport": Number(m.tunjangan_transport || 0),
                "Tunjangan Makan": Number(m.tunjangan_makan || 0),
                "Tunjangan Lembur": Number(m.tunjangan_lembur || 0),
                "Tunjangan Pulsa": Number(m.tunjangan_pulsa || 0),
                "Tunjangan Lainnya": Number(m.tunjangan_lainnya || 0),

                "BPJS Kesehatan": Number(m.bpjs_kesehatan || 0),
                "BPJS Ketenagakerjaan": Number(m.bpjs_ketenagakerjaan || 0),

                "Tarif BPJS Kesehatan": m.tarif_bpjs_kesehatan || 0,
                "Tarif BPJS Ketenagakerjaan": m.tarif_bpjs_ketenagakerjaan || 0,

                "Tarif BPJS TK": ded.tarif_bpjstk || 0,
                "Tarif BPJS Kesehatan Potongan": ded.tarif_bpjskes || 0,
                PPH21: Number(ded.pph21 || 0),
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);

        // Lebar kolom
        worksheet["!cols"] = [
            { wch: 5 },
            { wch: 25 },
            { wch: 20 },
            { wch: 20 },
            { wch: 18 },
            { wch: 20 },
            { wch: 23 },
            { wch: 22 },
            { wch: 18 },
            { wch: 18 },
            { wch: 18 },
            { wch: 18 },
            { wch: 18 },
            { wch: 20 },
            { wch: 25 },
            { wch: 25 },
            { wch: 20 },
            { wch: 20 },
            { wch: 15 },
        ];

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Payroll Master"
        );

        XLSX.writeFile(
            workbook,
            `Payroll_Master_${new Date().toISOString().slice(0, 10)}.xlsx`
        );
    };

    const exportPDF = () => {
        if (!datatable.length) {
            Swal.fire("Info", "Tidak ada data payroll untuk diexport", "info");
            return;
        }

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });

        doc.setFontSize(16);
        doc.text("LAPORAN MASTER PAYROLL", 14, 15);

        doc.setFontSize(9);
        doc.text(
            `Tanggal Export: ${new Date().toLocaleDateString("id-ID")}`,
            14,
            22
        );

        const rows = datatable.map((item, index) => {
            const d = item.rawData || {};
            const m = d.payroll_master || {};
            const ded = d.deduction || {};
            const emp = m.employee || {};

            return [
                index + 1,
                emp.nama || "-",
                emp.departemen || "-",
                emp.jabatan || "-",
                toCurrency(m.gaji_pokok),
                toCurrency(m.tunjangan_jabatan),
                toCurrency(m.tunjangan_operasional),
                toCurrency(m.tunjangan_transport),
                toCurrency(m.tunjangan_makan),
                toCurrency(m.tunjangan_lembur),
                toCurrency(m.tunjangan_pulsa),
                toCurrency(m.tunjangan_lainnya),
                toCurrency(m.bpjs_kesehatan),
                toCurrency(m.bpjs_ketenagakerjaan),
                ded.tarif_bpjstk || "-",
                ded.tarif_bpjskes || "-",
                toCurrency(ded.pph21),
            ];
        });

        autoTable(doc, {
            startY: 28,
            head: [[
                "No",
                "Nama",
                "Departemen",
                "Jabatan",
                "Gaji Pokok",
                "Tj. Jabatan",
                "Tj. Operasional",
                "Tj. Transport",
                "Tj. Makan",
                "Tj. Lembur",
                "Tj. Pulsa",
                "Tj. Lainnya",
                "BPJS Kes",
                "BPJS TK",
                "Tarif TK",
                "Tarif Kes",
                "PPH21",
            ]],
            body: rows,
            styles: {
                fontSize: 6,
                cellPadding: 2,
            },
            headStyles: {
                fontSize: 6,
                fontStyle: "bold",
            },
            theme: "grid",
        });

        doc.save(
            `Payroll_Master_${new Date().toISOString().slice(0, 10)}.pdf`
        );
    };

    const handleDelete = async (id) => {
        if (!id) return;
        const confirm = await Swal.fire({
            title: "Hapus Master Payroll?",
            text: "Data yang dihapus tidak dapat dikembalikan",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#d33",
        });
        if (!confirm.isConfirmed) return;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            await apiConfig.delete(
                `${apiUrl}/HR-Payroll/delete-payroll-master?id_payroll_master=${id}`,
                { headers: authHeader() }
            );
            Swal.fire("Berhasil", "Master payroll berhasil dihapus", "success");
            getMasterList();
        } catch (e) {
            Swal.fire("Gagal", e.response?.data?.message || "Gagal hapus", "error");
        }
    };

    useEffect(() => {
        getMasterList();
    }, [reload]);

    const m = selectedData?.payroll_master || {};
    const ded = selectedData?.deduction || {};
    const emp = m.employee || {};

    return (
        <>
            <div className="d-flex justify-content-end gap-2 mb-3">
                <Button
                    variant="success"
                    onClick={exportExcel}
                >
                    <i className="ri-file-excel-2-line me-1" />
                    Export Excel
                </Button>

                <Button
                    variant="danger"
                    onClick={exportPDF}
                >
                    <i className="ri-file-pdf-2-line me-1" />
                    Export PDF
                </Button>
            </div>
            <Row>
                <Col xl={12}>
                    <div className="table-responsive">
                        <BasicTableCostControl column={COLUMNS} datatable={datatable} />
                    </div>
                </Col>
            </Row>

            {/* ── Detail Modal ── */}
            <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detail Master Payroll — {emp.nama}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Employee info */}
                    <div className="border rounded p-3 mb-3" style={{ background: "#f8fafc" }}>
                        <Row>
                            <Col md={4}>
                                <p className="text-muted mb-0" style={{ fontSize: "12px" }}>Nama</p>
                                <p className="fw-bold mb-0">{emp.nama || "-"}</p>
                            </Col>
                            <Col md={4}>
                                <p className="text-muted mb-0" style={{ fontSize: "12px" }}>Jabatan</p>
                                <p className="fw-bold mb-0">{emp.jabatan || "-"}</p>
                            </Col>
                            <Col md={4}>
                                <p className="text-muted mb-0" style={{ fontSize: "12px" }}>Departemen</p>
                                <p className="fw-bold mb-0">{emp.departemen || "-"}</p>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        {/* Pendapatan */}
                        <Col md={6}>
                            <p className="fw-bold mb-2" style={{ fontSize: "13px", color: "#22c55e" }}>
                                <i className="ri-add-circle-line me-1" /> Pendapatan
                            </p>
                            <table style={{ fontSize: "13px", width: "100%" }}>
                                <tbody>
                                    <tr><td>Gaji Pokok</td><td className="text-end">{toCurrency(m.gaji_pokok)}</td></tr>
                                    <tr><td>Tj. Jabatan</td><td className="text-end">{toCurrency(m.tunjangan_jabatan)}</td></tr>
                                    <tr><td>Tj. Operasional</td><td className="text-end">{toCurrency(m.tunjangan_operasional)}</td></tr>

                                    <tr><td>Tj. Transport</td><td className="text-end">{toCurrency(m.tunjangan_transport)}</td></tr>
                                    <tr><td>Tj. Makan</td><td className="text-end">{toCurrency(m.tunjangan_makan)}</td></tr>
                                    <tr><td>Tj. Lembur</td><td className="text-end">{toCurrency(m.tunjangan_lembur)}</td></tr>
                                    <tr><td>Tj. Pulsa</td><td className="text-end">{toCurrency(m.tunjangan_pulsa)}</td></tr>
                                    <tr><td>Tj. Lainnya</td><td className="text-end">{toCurrency(m.tunjangan_lainnya)}</td></tr>

                                    <tr><td>BPJS Kesehatan</td><td className="text-end">{toCurrency(m.bpjs_kesehatan)}</td></tr>
                                    <tr><td>BPJS Ketenagakerjaan</td><td className="text-end">{toCurrency(m.bpjs_ketenagakerjaan)}</td></tr>
                                    <tr><td>Tarif BPJS Kesehatan</td><td className="text-end">{m.tarif_bpjs_kesehatan}</td></tr>
                                    <tr><td>Tarif BPJS Ketenagakerjaan</td><td className="text-end">{m.tarif_bpjs_ketenagakerjaan}</td></tr>

                                </tbody>
                            </table>
                        </Col>

                        {/* Potongan */}
                        <Col md={6}>
                            <p className="fw-bold mb-2" style={{ fontSize: "13px", color: "#ef4444" }}>
                                <i className="ri-subtract-line me-1" /> Tarif
                            </p>
                            <table style={{ fontSize: "13px", width: "100%" }}>
                                <tbody>

                                    <tr><td>BPJS Ketenagakerjaan</td><td className="text-end">{ded.tarif_bpjstk}</td></tr>
                                    <tr><td>BPJS Kesehatan</td><td className="text-end">{ded.tarif_bpjskes}</td></tr>
                                    <tr><td>PPH21</td><td className="text-end">{toCurrency(ded.pph21)}</td></tr>


                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetail(false)}>Tutup</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PayrollMaster;