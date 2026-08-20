import { useEffect, useState } from "react";
import { Col, Modal, Row, Button } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";

const toCurrency = (value) => {
    if (!value && value !== 0) return "Rp0";
    return new Intl.NumberFormat("id-ID", {
        style: "currency", currency: "IDR", minimumFractionDigits: 0,
    }).format(Number(value));
};

const PayrollMaster = ({ loader, setLoader, reload }) => {
    const [datatable, setDataTable]     = useState([]);
    const [showDetail, setShowDetail]   = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const authHeader = () => ({ "Authorization": "Bearer " + localStorage.getItem("token") });

    const COLUMNS = [
        { Header: "Nama Karyawan", accessor: "nama" },
        { Header: "Departemen",    accessor: "departemen" },
        { Header: "Jabatan",       accessor: "jabatan" },
        {
            Header: "Aksi",
            Cell: ({ row }) => (
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => { setSelectedData(row.original.rawData); setShowDetail(true); }}>
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
                    const m   = d.payroll_master || {};
                
                    const emp = m.employee       || {};
                    return {
                        rawData:    d,
                        nama:       emp.nama       || "-",
                        departemen: emp.departemen || "-",
                        jabatan:    emp.jabatan    || "-",
                    };
                }));
            }
        } catch (e) {
            console.error("Error getMasterList:", e);
        }
        setLoader(false);
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

    const m   = selectedData?.payroll_master || {};
    const ded = selectedData?.deduction      || {};
    const emp = m.employee                   || {};

    return (
        <>
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
                                    <tr><td>Tj. Transport</td><td className="text-end">{toCurrency(m.tunjangan_transport)}</td></tr>
                                    <tr><td>Tj. Makan</td><td className="text-end">{toCurrency(m.tunjangan_makan)}</td></tr>
                                    <tr><td>Tj. Lembur</td><td className="text-end">{toCurrency(m.tunjangan_lembur)}</td></tr>
                                    <tr><td>Tj. Lainnya</td><td className="text-end">{toCurrency(m.tunjangan_lainnya)}</td></tr>
                                    <tr><td>BPJS Kesehatan (Employer)</td><td className="text-end">{toCurrency(m.bpjs_kesehatan)}</td></tr>
                                    <tr><td>BPJS Naker (Employer)</td><td className="text-end">{toCurrency(m.bpjs_ketenagakerjaan)}</td></tr>
                                    {/* <tr style={{ borderTop: "1px solid #e2e8f0", fontWeight: 600 }}>
                                        <td className="pt-2">Total</td>
                                        <td className="text-end pt-2">{toCurrency(
                                            (m.gaji_pokok || 0) + (m.tunjangan_jabatan || 0) 
                                        )}</td>
                                    </tr> */}
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
                                    <tr><td>Kasbon</td><td className="text-end">{toCurrency(ded.kasbon)}</td></tr>
                                    <tr><td>Pinjaman</td><td className="text-end">{toCurrency(ded.pinjaman)}</td></tr>
                                    <tr><td>THR Paid</td><td className="text-end">{toCurrency(ded.thr_paid)}</td></tr>
                                    <tr><td>Jaminan Pensiun</td><td className="text-end">{toCurrency(ded.jaminan_pensiun)}</td></tr>
                                    <tr><td>BPJS Kesehatan (Employee)</td><td className="text-end">{toCurrency(ded.bpjs_kesehatan)}</td></tr>
                                    <tr><td>BPJS Kes. Family</td><td className="text-end">{toCurrency(ded.bpjs_kesehatan_family)}</td></tr>
                                    <tr><td>JHT Employee</td><td className="text-end">{toCurrency(ded.jht_employee)}</td></tr>
                                    <tr><td>PPh21</td><td className="text-end">{toCurrency(ded.pph21)}</td></tr>
                                    <tr style={{ borderTop: "1px solid #e2e8f0", fontWeight: 600 }}>
                                        <td className="pt-2">Total</td>
                                        <td className="text-end pt-2">{toCurrency(
                                            (ded.kasbon || 0) + (ded.pinjaman || 0) + (ded.thr_paid || 0) +
                                            (ded.jaminan_pensiun || 0) + (ded.bpjs_kesehatan || 0) +
                                            (ded.bpjs_kesehatan_family || 0) + (ded.jht_employee || 0) + (ded.pph21 || 0)
                                        )}</td>
                                    </tr>
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