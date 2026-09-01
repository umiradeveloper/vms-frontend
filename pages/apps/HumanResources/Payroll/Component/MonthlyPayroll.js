import { useEffect, useState } from "react";
import { Col, Modal, Row, Button, Card } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";


const MonthlyPayroll = ({ loader, setLoader }) => {
    const now = new Date();
    const [loaderLocal, setLoaderLocal] = useState(false);

    const MONTHS = [
        { value: "1", label: "Januari" },
        { value: "2", label: "Februari" },
        { value: "3", label: "Maret" },
        { value: "4", label: "April" },
        { value: "5", label: "Mei" },
        { value: "6", label: "Juni" },
        { value: "7", label: "Juli" },
        { value: "8", label: "Agustus" },
        { value: "9", label: "September" },
        { value: "10", label: "Oktober" },
        { value: "11", label: "November" },
        { value: "12", label: "Desember" },
    ];

    const toCurrency = (value) => {
        if (!value && value !== 0) return "Rp0";
        return new Intl.NumberFormat("id-ID", {
            style: "currency", currency: "IDR", minimumFractionDigits: 0,
        }).format(Number(value));
    };

    const [reload, setReload] = useState(false);
    const [bulan, setBulan] = useState(String(now.getMonth() + 1));
    const [tahun, setTahun] = useState(String(now.getFullYear()));
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
                        onClick={() => { setSelectedData(row.original.rawData); setShowDetail(true); }}>
                        <i className="ri-eye-line" />
                    </button>
                </div>
            )
        },
    ];

    // const getPayroll = async () => {
    //     setLoader(true);
    //     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    //     try {
    //         const res = await apiConfig.get(
    //             `${apiUrl}/HR-Payroll/get-payroll?bulan=${bulan}&tahun=${tahun}`,
    //             { headers: authHeader() }
    //         );
    //         console.log("payroll response:", res.data); // <-- check this
    //         console.log("payroll data:", res.data.data); // <-- and this
    //         if (res.status === 200) {
    //             const data = res.data.data || [];
    //             console.log("data length:", data.length); // <-- how many records
    //             console.log("first record:", data[0]); // <-- check field names
    //             setDataTable(data.map(d => {
    //                 const p   = d.payroll   || {};
    //                 const emp = p.employee  || {};
    //                 return {
    //                     rawData:    d,
    //                     nama:       emp.nama       || "-",
    //                     departemen: emp.departemen || "-",
    //                     jabatan:    emp.jabatan    || "-",
    //                 };
    //             }));
    //         }
    //     } catch (e) {
    //         console.error("Error getPayroll:", e);
    //     }
    //     setLoader(false);
    // };

    const getPayroll = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const res = await apiConfig.get(
                `${apiUrl}/HR-Payroll/get-payroll?bulan=${bulan}&tahun=${tahun}`,
                { headers: authHeader() }
            );
            console.log("payroll response:", res.data);
            console.log("first record:", res.data.data?.[0]);

            if (res.status === 200) {
                const data = res.data.data || [];
                console.log("data length:", data.length);

                setDataTable(data.map(d => {
                    const payroll = d.payroll || {};
                    const master = d.master || {};
                    const ded = d.deduction || {};

                    // employee can be in payroll.employee OR master.employee
                    const emp = payroll.employee || master.employee || {};

                    return {
                        rawData: d,
                        nama: emp.nama || "-",
                        departemen: emp.departemen || "-",
                        jabatan: emp.jabatan || "-",
                    };
                }));
            }
        } catch (e) {
            console.error("Error getPayroll:", e.response?.data || e.message);
        }
        setLoader(false);
    };

    const handleGenerate = async () => {
        // const confirm = await Swal.fire({
        //     title: "Generate Payroll",
        //     html: `Generate payroll untuk <b>${MONTHS.find(m => m.value === bulan)?.label} ${tahun}</b>?<br/>
        //            <small class="text-muted">Karyawan yang sudah ada payroll bulan ini akan dilewati.</small>`,
        //     icon: "question",
        //     showCancelButton: true,
        //     confirmButtonText: "Ya, Generate",
        //     cancelButtonText: "Batal",
        // });
        // if (!confirm.isConfirmed) return;

        setLoaderLocal(true);
        // await new Promise(resolve => setTimeout(resolve, 100));
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.post(
                `${apiUrl}/HR-Payroll/generate-payroll?bulan=${bulan}&tahun=${tahun}`,
                {},
                { headers: authHeader() }
            );
            if (result.status === 200) {
                Swal.fire("Berhasil", result.data.message, "success");
                setReload(p => !p);
            }
        } catch (e) {
            Swal.fire("Gagal", e.response?.data?.message || "Gagal generate", "error");
        }finally{
            setLoaderLocal(false);
        }
        
    };

    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: "Hapus Payroll",
            text: `Hapus semua payroll ${MONTHS.find(m => m.value === bulan)?.label} ${tahun}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#d33",
        });
        if (!confirm.isConfirmed) return;

        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            await apiConfig.delete(
                `${apiUrl}/HR-Payroll/delete-payroll?bulan=${bulan}&tahun=${tahun}`,
                { headers: authHeader() }
            );
            Swal.fire("Berhasil", "Payroll berhasil dihapus", "success");
            setReload(p => !p);
        } catch (e) {
            Swal.fire("Gagal", e.response?.data?.message || "Gagal hapus", "error");
        }finally{
            setLoader(false);
        }
        
    };

    useEffect(() => {
        getPayroll();
    }, [reload, bulan, tahun]);

    const bulanLabel = MONTHS.find(m => m.value === bulan)?.label;

    // ── Selected data destructure ─────────────────────────────────────────────
    const p = selectedData?.payroll || {};
    const m = selectedData?.master || {};
    const ded = selectedData?.deduction || {};
    const emp = p.employee || {};

    const totalTunjangan = (p.tunjangan_transport || 0) + (p.tunjangan_makan || 0) +
        (p.tunjangan_lembur || 0) + (p.tunjangan_lainnya || 0)+ (p.tunjangan_jabatan || 0);
    const totalPotongan = (ded.potongan_kehadiran || 0) + (ded.pinjaman || 0) + (p.bpjs_kesehatan || 0) +
        (p.bpjs_ketenagakerjaan || 0);
    const pendapatanBruto = (p.gaji_pokok || 0) + totalTunjangan + (p.bpjs_kesehatan || 0)+ (p.bpjs_ketenagakerjaan || 0);
    const takeHomePay = pendapatanBruto - totalPotongan;

    return (
        <>
            <LoadersSimUmira open={loaderLocal} />
            {/* ── Filter & Actions ── */}
            
            <div className="d-flex flex-wrap align-items-end gap-3 mb-3">
                <div>
                    <label className="form-label mb-1" style={{ fontSize: "12px" }}>Bulan</label>
                    <select className="form-select form-select-sm" value={bulan}
                        onChange={(e) => setBulan(e.target.value)}>
                        {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className="form-label mb-1" style={{ fontSize: "12px" }}>Tahun</label>
                    <input type="number" className="form-control form-control-sm" value={tahun}
                        onChange={(e) => setTahun(e.target.value)} style={{ width: "90px" }} />
                </div>
                <div className="d-flex gap-2 ms-auto">
                    <button className="btn btn-sm btn-success" onClick={handleGenerate}>
                        <i className="ri-calculator-line me-1" /> Generate
                    </button>
                    {datatable.length > 0 && (
                        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
                            <i className="ri-delete-bin-line me-1" /> Hapus
                        </button>
                    )}
                </div>
            </div>

            {/* ── Table ── */}
            
            <Row>
                <Col xl={12}>
                    {datatable.length > 0 ? (
                        <div className="table-responsive">
                            <BasicTableCostControl column={COLUMNS} datatable={datatable} />
                        </div>
                    ) : (
                        <div className="text-center py-5 text-muted">
                            <i className="ri-file-list-3-line" style={{ fontSize: "40px", opacity: 0.3 }} />
                            <p className="mt-2 mb-3">Belum ada data payroll untuk {bulanLabel} {tahun}</p>
                            <button className="btn btn-sm btn-primary" onClick={handleGenerate}>
                                <i className="ri-calculator-line me-1" /> Generate Payroll Sekarang
                            </button>
                        </div>
                    )}
                </Col>
            </Row>

            {/* ── Detail Modal ── */}
            <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Detail Payroll — {emp.nama} ({bulanLabel} {tahun})
                    </Modal.Title>
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

                    {/* Absensi summary */}
                    <Row className="g-2 mb-3">
                        {[
                            { label: "Hari Kerja", value: p.hari_kerja || 0, color: "#22c55e" },
                            { label: "Izin", value: p.hari_izin || 0, color: "#6366f1" },
                            { label: "Sakit", value: p.hari_sakit || 0, color: "#f59e0b" },
                            { label: "Alpha", value: p.hari_alpha || 0, color: "#ef4444" },
                        ].map((s, i) => (
                            <Col key={i}>
                                <div className="text-center p-2 rounded border">
                                    <p className="mb-0 fw-bold" style={{ fontSize: "20px", color: s.color }}>{s.value}</p>
                                    <p className="mb-0 text-muted" style={{ fontSize: "11px" }}>{s.label}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    <Row>
                        {/* Pendapatan */}
                        <Col md={6}>
                            <p className="fw-bold mb-2" style={{ fontSize: "13px", color: "#22c55e" }}>
                                <i className="ri-add-circle-line me-1" /> Pendapatan
                            </p>
                            <table style={{ fontSize: "13px", width: "100%" }}>
                                <tbody>
                                    <tr><td>Gaji Pokok</td><td className="text-end">{toCurrency(p.gaji_pokok)}</td></tr>
                                    <tr><td>Tj. Jabatan</td><td className="text-end">{toCurrency(p.tunjangan_jabatan)}</td></tr>
                                    <tr><td>Tj. Transport</td><td className="text-end">{toCurrency(p.tunjangan_transport)}</td></tr>
                                    <tr><td>Tj. Makan</td><td className="text-end">{toCurrency(p.tunjangan_makan)}</td></tr>
                                    <tr><td>Tj. Lembur</td><td className="text-end">{toCurrency(p.tunjangan_lembur)}</td></tr>
                                    <tr><td>Tj. Lainnya</td><td className="text-end">{toCurrency(p.tunjangan_lainnya)}</td></tr>
                                    <tr><td>Bpjs Kesehatan</td><td className="text-end">{toCurrency(p.bpjs_kesehatan)}</td></tr>
                                    <tr><td>Bpjs Ketenagakerjaan</td><td className="text-end">{toCurrency(p.bpjs_ketenagakerjaan)}</td></tr>
                                    <tr style={{ borderTop: "1px solid #e2e8f0", fontWeight: 600 }}>
                                        <td className="pt-2">Total Pendapatan</td>
                                        <td className="text-end pt-2">{toCurrency(pendapatanBruto)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>

                        {/* Potongan */}
                        <Col md={6}>
                            <p className="fw-bold mb-2" style={{ fontSize: "13px", color: "#ef4444" }}>
                                <i className="ri-subtract-line me-1" /> Potongan
                            </p>
                            <table style={{ fontSize: "13px", width: "100%" }}>
                                <tbody>
                                    <tr><td>Potongan Kehadiran</td><td className="text-end">{toCurrency(ded.potongan_kehadiran)}</td></tr>
                                    <tr><td>Pinjaman</td><td className="text-end">{toCurrency(ded.pinjaman)}</td></tr>
                                    <tr><td>BPJS Kesehatan</td><td className="text-end">{toCurrency(p.bpjs_kesehatan)}</td></tr>
                                    <tr><td>BPJS Ketenagakerjaan</td><td className="text-end">{toCurrency(p.bpjs_ketenagakerjaan)}</td></tr>
                                    <tr><td>PPh21</td><td className="text-end">{toCurrency(ded.pph21)}</td></tr>
                                    <tr style={{ borderTop: "1px solid #e2e8f0", fontWeight: 600 }}>
                                        <td className="pt-2">Total Potongan</td>
                                        <td className="text-end pt-2">{toCurrency(totalPotongan)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>

                    {/* Take Home Pay */}
                    <div className="mt-3 p-3 rounded text-center" style={{ background: "#6259ca", color: "#fff" }}>
                        <p className="mb-0" style={{ fontSize: "12px", opacity: 0.8 }}>TAKE HOME PAY</p>
                        <h4 className="mb-0 fw-bold">{toCurrency(takeHomePay)}</h4>
                    </div>

                    <p className="text-muted text-center mt-3 mb-0" style={{ fontSize: "11px" }}>
                        Slip gaji ini digenerate secara otomatis oleh sistem.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    {/* PERLU DIGANTI */}
                    <Button variant="secondary" onClick={() => setShowDetail(false)}>Tutup</Button>
                    <Button variant="primary" onClick={() => window.print()}>
                        <i className="ri-printer-line me-1" /> Print
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MonthlyPayroll;