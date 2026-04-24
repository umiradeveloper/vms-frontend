import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Modal, Button, Col, Row, Tab, Nav } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond/dist/filepond.min.css";

const Select = dynamic(() => import("react-select"), { ssr: false });
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const jenisOptions = [
    { value: "BBM",            label: "Reimbursement BBM" },
    { value: "INVOICE_KOSONG", label: "Invoice Kosong" },
];

const jenisLabel = {
    BBM:            "Reimbursement BBM",
    INVOICE_KOSONG: "Invoice Kosong",
};

const bottomTabStyle = (active, key) => ({
    backgroundColor: active === key ? "#eeeeff" : "transparent",
    color: active === key ? "#6259ca" : "#888",
    border: "1px solid",
    borderColor: active === key ? "#6259ca" : "transparent",
    borderRadius: "8px",
    fontWeight: active === key ? "500" : "400",
});

const Reimbursement = ({ loader, setLoader }) => {
    const [activeTab, setActiveTab]   = useState("pengajuan");
    const [reload, setReload]         = useState(false);
    const [daftarUser, setDaftarUser] = useState([]);
    const [dokumenFiles, setDokumenFiles] = useState([]);
    const [formData, setFormData] = useState({
        jenis_reimbursement: "", tanggal_reimbursement: "",
        jumlah: "", keterangan: "", id_approver: "",
    });
    const [datatableMonitoring, setDatatableMonitoring] = useState([]);
    const [datatableApproval, setDatatableApproval]     = useState([]);
    const [showDetail, setShowDetail]     = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const authHeader = () => ({ "Authorization": "Bearer " + localStorage.getItem("token") });

    const toCurrency = (value) => {
        if (!value) return "Rp0";
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(value));
    };

    const changeFormatCurrency = (val) => {
        let clean = val.replace(/[^\d]/g, "");
        return clean ? new Intl.NumberFormat("id-ID").format(clean) : "";
    };

    const cleanCurrency = (val) => {
        if (!val) return 0;
        return Number(val.replace(/\./g, ""));
    };

    const COLUMNS_MONITORING = [
        { Header: "Nama Karyawan", accessor: "nama_user" },
        { Header: "Jenis",         accessor: "jenis_reimbursement", Cell: ({ value }) => jenisLabel[value] || value },
        { Header: "Tanggal",       accessor: "tanggal_reimbursement" },
        { Header: "Jumlah",        accessor: "jumlah" },
        { Header: "Keterangan",    accessor: "keterangan" },
        {
            Header: "Status",
            Cell: ({ row }) => {
                const s = row.original.status_reimbursement;
                const c = s === "APPROVED" ? "success" : s === "REJECTED" ? "danger" : s === "CANCELLED" ? "secondary" : "warning";
                return <span className={`badge bg-${c}`}>{s}</span>;
            }
        },
        {
            Header: "Aksi",
            Cell: ({ row }) => (
                <button className="btn btn-sm btn-primary"
                    onClick={() => { setSelectedData(row.original.rawData); setShowDetail(true); }}>
                    Detail
                </button>
            )
        },
    ];

    const COLUMNS_APPROVAL = [
        { Header: "Nama Karyawan", accessor: "nama_user" },
        { Header: "Jenis",         accessor: "jenis_reimbursement", Cell: ({ value }) => jenisLabel[value] || value },
        { Header: "Tanggal",       accessor: "tanggal_reimbursement" },
        { Header: "Jumlah",        accessor: "jumlah" },
        { Header: "Keterangan",    accessor: "keterangan" },
        {
            Header: "Dokumen",
            Cell: ({ row }) => row.original.rawData.dokumen_reimbursement ? (
                <button className="btn btn-sm btn-info" onClick={() => getFile(row.original.rawData.id_reimbursement)}>Lihat</button>
            ) : <span className="text-muted">-</span>
        },
        { Header: "Aksi", accessor: "aksi" },
    ];

    const getDaftarUser = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const res = await apiConfig.get(apiUrl + "/users/all/staff", { headers: authHeader() });
            if (res.status === 200) { setDaftarUser(res.data.data); return res.data.data; }
        } catch (e) { console.log(e); }
        return [];
    };

    const fetchAllReim = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const result = await apiConfig.get(apiUrl + "/Reimbursement/get-all-reimbursement", {
            headers: { "Content-Type": "application/json", ...authHeader() },
        });
        return result.data.data;
    };

    const getMonitoringReim = async () => {
        setLoader(true);
        try {
            const data = await fetchAllReim();
            setDatatableMonitoring(data.map(d => ({
                rawData:               d,
                nama_user:             d.employee_pengajuan?.nama || "-",
                jenis_reimbursement:   d.jenis_reimbursement   || "-",
                tanggal_reimbursement: d.tanggal_reimbursement || "-",
                jumlah:                toCurrency(d.jumlah),
                keterangan:            d.keterangan            || "-",
                status_reimbursement:  d.status_reimbursement  || "PENDING",
            })));
        } catch (e) { console.error(e); }
        setLoader(false);
    };

    const getApprovalReim = async () => {
        try {
            const data = await fetchAllReim();
            const arr = [];
            for (const d of data) {
                if (d.status_reimbursement !== "PENDING") continue;
                arr.push({
                    rawData:               d,
                    nama_user:             d.employee_pengajuan?.nama || "-",
                    jenis_reimbursement:   d.jenis_reimbursement   || "-",
                    tanggal_reimbursement: d.tanggal_reimbursement || "-",
                    jumlah:                toCurrency(d.jumlah),
                    keterangan:            d.keterangan            || "-",
                    aksi: (
                        <div className="d-flex flex-row gap-2">
                            <button type="button" className="btn btn-success btn-sm" onClick={() => handleApprove(d.id_reimbursement)}>
                                <i className="ri-check-line me-1" /> Approve
                            </button>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => handleReject(d.id_reimbursement)}>
                                <i className="ri-close-line me-1" /> Reject
                            </button>
                        </div>
                    )
                });
            }
            setDatatableApproval(arr);
        } catch (e) { console.error(e); }
    };

    const getFile = async (id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/Reimbursement/dokumen-file?id=" + id, { headers: authHeader(), responseType: "blob" });
            const url = window.URL.createObjectURL(new Blob([result.data], { type: "application/pdf" }));
            Swal.fire({ title: "Dokumen Reimbursement", html: `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`, width: "80%", showConfirmButton: false, showCloseButton: true });
        } catch (e) { Swal.fire("Error", "Gagal membuka dokumen", "error"); }
    };

    const validateForm = () => {
        if (!formData.jenis_reimbursement)   { Swal.fire("Validasi", "Jenis reimbursement wajib dipilih", "warning"); return false; }
        if (!formData.tanggal_reimbursement) { Swal.fire("Validasi", "Tanggal wajib diisi", "warning"); return false; }
        if (!formData.jumlah || formData.jumlah === "0") { Swal.fire("Validasi", "Jumlah wajib diisi", "warning"); return false; }
        if (!formData.keterangan || formData.keterangan.trim().length < 5) { Swal.fire("Validasi", "Keterangan wajib diisi (minimal 5 karakter)", "warning"); return false; }
        if (!formData.id_approver) { Swal.fire("Validasi", "Approver wajib dipilih", "warning"); return false; }
        return true;
    };

    const submit = async () => {
        if (!validateForm()) return;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const fd = new FormData();
        fd.append("jenis_reimbursement",   formData.jenis_reimbursement);
        fd.append("tanggal_reimbursement", formData.tanggal_reimbursement);
        fd.append("jumlah",                cleanCurrency(formData.jumlah));
        fd.append("keterangan",            formData.keterangan);
        fd.append("id_approver",           formData.id_approver);
        if (dokumenFiles.length > 0) fd.append("dokumen_reimbursement", dokumenFiles[0].file);
        try {
            const result = await apiConfig.post(apiUrl + "/Reimbursement/create-reimbursement", fd, {
                headers: { "Content-Type": "multipart/form-data", ...authHeader() },
            });
            if (result.status === 200) {
                setLoader(false);
                Swal.fire({ title: "Berhasil", html: result.data.message, icon: "success", timer: 3000, timerProgressBar: true, didOpen: () => Swal.showLoading() })
                    .then(() => { resetForm(); setReload(p => !p); });
            }
        } catch (error) {
            setLoader(false);
            Swal.fire("Error", error.response?.data?.message || "Gagal mengajukan reimbursement", "error");
        }
    };

    const resetForm = () => {
        setFormData({ jenis_reimbursement: "", tanggal_reimbursement: "", jumlah: "", keterangan: "", id_approver: "" });
        setDokumenFiles([]);
    };

    const handleApprove = async (id_reimbursement) => {
        const confirm = await Swal.fire({ title: "Approve Reimbursement", text: "Apakah Anda yakin?", icon: "question", showCancelButton: true, confirmButtonText: "Ya, Approve", cancelButtonText: "Batal" });
        if (!confirm.isConfirmed) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            await apiConfig.post(apiUrl + "/Reimbursement/approve-reimbursement", {}, { params: { id_reimbursement, status_reimbursement: "APPROVED" }, headers: authHeader() });
            Swal.fire("Berhasil", "Reimbursement berhasil di-approve", "success");
            setReload(p => !p);
        } catch (e) { Swal.fire("Gagal", e.response?.data?.message || "Gagal approve", "error"); }
    };

    const handleReject = async (id_reimbursement) => {
        const { value: alasan_penolakan } = await Swal.fire({ title: "Reject Reimbursement", input: "textarea", inputLabel: "Alasan Penolakan", inputPlaceholder: "Masukkan alasan penolakan...", showCancelButton: true, confirmButtonText: "Reject", cancelButtonText: "Batal", inputValidator: (v) => { if (!v) return "Alasan wajib diisi!"; } });
        if (!alasan_penolakan) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            await apiConfig.post(apiUrl + "/Reimbursement/approve-reimbursement", {}, { params: { id_reimbursement, status_reimbursement: "REJECTED", alasan_penolakan }, headers: authHeader() });
            Swal.fire("Berhasil", "Reimbursement berhasil direject", "success");
            setReload(p => !p);
        } catch (e) { Swal.fire("Gagal", e.response?.data?.message || "Gagal reject", "error"); }
    };

    useEffect(() => {
        const init = async () => {
            await getDaftarUser();
            await getMonitoringReim();
            await getApprovalReim();
        };
        init();
    }, [reload]);

    const userOptions = daftarUser.map(u => ({ value: u.id_user, label: u.username }));

    return (
        <>
            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav variant="pills" className="nav mb-3 gap-2">
                    <Nav.Item>
                        <Nav.Link eventKey="pengajuan" className="mt-0" style={bottomTabStyle(activeTab, "pengajuan")}>Pengajuan</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="monitoring" className="mt-0" style={bottomTabStyle(activeTab, "monitoring")}>Monitoring</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="approval" className="mt-0" style={bottomTabStyle(activeTab, "approval")}>Approval</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>

                    {/* Pengajuan */}
                    <Tab.Pane eventKey="pengajuan" className="border p-3 rounded">
                        <Row className="gy-3">
                            <Col xl={12}>
                                <label className="form-label">Jenis Reimbursement <span style={{ color: "red" }}>*</span></label>
                                <Select options={jenisOptions} placeholder="Select type..." classNamePrefix="Select2"
                                    onChange={(s) => setFormData({ ...formData, jenis_reimbursement: s?.value || "" })}
                                    value={jenisOptions.find(o => o.value === formData.jenis_reimbursement) || null} isClearable />
                            </Col>
                            <Col xl={12}>
                                <label className="form-label">Jumlah <span style={{ color: "red" }}>*</span></label>
                                <div className="input-group">
                                    <span className="input-group-text">Rp</span>
                                    <input type="text" className="form-control" placeholder="0" value={formData.jumlah}
                                        onChange={(e) => setFormData({ ...formData, jumlah: changeFormatCurrency(e.target.value) })} />
                                </div>
                            </Col>
                            <Col xl={12}>
                                <label className="form-label">Tanggal <span style={{ color: "red" }}>*</span></label>
                                <input type="date" className="form-control" value={formData.tanggal_reimbursement}
                                    onChange={(e) => setFormData({ ...formData, tanggal_reimbursement: e.target.value })} />
                            </Col>
                            <Col xl={12}>
                                <label className="form-label">Attachment <span className="text-muted ms-1" style={{ fontSize: "12px" }}>(opsional)</span></label>
                                <FilePond name="files" acceptedFileTypes={["application/pdf", "image/*"]} maxFileSize="5MB"
                                    labelIdle='Drag & Drop file atau <span class="filepond--label-action">Browse</span>'
                                    labelMaxFileSize="Maksimal ukuran file: 5MB"
                                    files={dokumenFiles} onupdatefiles={setDokumenFiles} />
                            </Col>
                            <Col xl={12}>
                                <label className="form-label">Keterangan <span style={{ color: "red" }}>*</span></label>
                                <textarea className="form-control" rows={3} placeholder="Provide details about this expense..."
                                    value={formData.keterangan}
                                    onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })} />
                            </Col>
                            <Col xl={12}>
                                <label className="form-label">Approver <span style={{ color: "red" }}>*</span></label>
                                <Select options={userOptions} isSearchable placeholder="Pilih atasan sebagai approver..." classNamePrefix="Select2"
                                    onChange={(s) => setFormData({ ...formData, id_approver: s?.value || "" })}
                                    value={userOptions.find(u => u.value === formData.id_approver) || null} isClearable />
                            </Col>
                            <Col xl={12}>
                                <div className="d-flex gap-2 justify-content-end">
                                    <Button variant="secondary" onClick={resetForm}>Reset</Button>
                                    <Button variant="primary" onClick={submit}>Submit</Button>
                                </div>
                            </Col>
                        </Row>
                    </Tab.Pane>

                    {/* Monitoring */}
                    <Tab.Pane eventKey="monitoring" className="border p-3 rounded">
                        <div className="table-responsive">
                            <BasicTableCostControl column={COLUMNS_MONITORING} datatable={datatableMonitoring} />
                        </div>
                    </Tab.Pane>

                    {/* Approval */}
                    <Tab.Pane eventKey="approval" className="border p-3 rounded">
                        <div className="table-responsive">
                            <BasicTableCostControl column={COLUMNS_APPROVAL} datatable={datatableApproval} />
                        </div>
                    </Tab.Pane>

                </Tab.Content>
            </Tab.Container>

            {/* Detail Modal */}
            <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg">
                <Modal.Header closeButton><Modal.Title>Detail Reimbursement</Modal.Title></Modal.Header>
                <Modal.Body>
                    {selectedData && (
                        <>
                            <p><b>Nama Karyawan:</b> {selectedData.employee_pengajuan?.nama || "-"}</p>
                            <p><b>Jenis:</b> {jenisLabel[selectedData.jenis_reimbursement] || selectedData.jenis_reimbursement}</p>
                            <p><b>Tanggal:</b> {selectedData.tanggal_reimbursement || "-"}</p>
                            <p><b>Jumlah:</b> {toCurrency(selectedData.jumlah)}</p>
                            <p><b>Keterangan:</b> {selectedData.keterangan || "-"}</p>
                            <hr />
                            <p><b>Status:</b>{" "}
                                <span className={`badge bg-${selectedData.status_reimbursement === "APPROVED" ? "success" : selectedData.status_reimbursement === "REJECTED" ? "danger" : selectedData.status_reimbursement === "CANCELLED" ? "secondary" : "warning"}`}>
                                    {selectedData.status_reimbursement || "PENDING"}
                                </span>
                            </p>
                            {selectedData.alasan_penolakan && <p><b>Alasan Penolakan:</b> {selectedData.alasan_penolakan}</p>}
                            {selectedData.dokumen_reimbursement && (
                                <button className="btn btn-sm btn-info mt-2" onClick={() => getFile(selectedData.id_reimbursement)}>Lihat Dokumen</button>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={() => setShowDetail(false)}>Tutup</Button></Modal.Footer>
            </Modal>
        </>
    );
};

export default Reimbursement;