import Swal from "sweetalert2";
import Seo from "@/shared/layout-components/seo/seo";
import { Fragment, useEffect, useState } from "react";
import PageHeaderVms from "../Component/PageHeaderVms";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import { Modal, Button, Card, Col, Row, Tab, Nav } from "react-bootstrap";
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
    { value: "ANNUAL_LEAVE", label: "Cuti Tahunan" },
    { value: "IZIN", label: "Izin" },
    { value: "ROSTER_LEAVE", label: "Cuti Roster" },
    { value: "SICK_LEAVE", label: "Cuti Sakit" },
    { value: "MATERNITY_LEAVE", label: "Cuti Melahirkan" },
    { value: "BAPTISM_LEAVE", label: "Cuti Baptis Anak" },
    { value: "MARRIAGE_LEAVE", label: "Cuti Menikah" },
    { value: "CHILD_WEDDING_LEAVE", label: "Cuti Menikahkan Anak" },
    { value: "BEREAVEMENT_LEAVE", label: "Cuti Keluarga Meninggal" },
    { value: "BREAVEMENT1_LEAVE", label: "Cuti Anggota Keluarga Dalam Satu Rumah Meninggal" },
    { value: "HAJJ_LEAVE", label: "Cuti Haji" },
];

const jenisCutiLabel = {
    ANNUAL_LEAVE: "Cuti Tahunan",
    IZIN: "Izin",
    ROSTER_LEAVE: "Cuti Roster",
    SICK_LEAVE: "Cuti Sakit",
    MATERNITY_LEAVE: "Cuti Melahirkan",
    BAPTISM_LEAVE: "Cuti Baptis Anak",
    MARRIAGE_LEAVE: "Cuti Menikah",
    CHILD_WEDDING_LEAVE: "Cuti Menikahkan Anak",
    BEREAVEMENT_LEAVE: "Cuti Keluarga Meninggal",
    BREAVEMENT1_LEAVE: "Cuti Anggota Keluarga Dalam Satu Rumah Meninggal",
    HAJJ_LEAVE: "Cuti Haji",
};

const CutiPage = () => {
    const [activeTab, setActiveTab] = useState("pengajuan");
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);
    const [daftarUser, setDaftarUser] = useState([]);
    const [balance, setBalance] = useState({ sisa_cuti: 12, used_cuti: 0 });

    // ── Create form state ────────────────────────────────────────────────────
    const [dokumenFiles, setDokumenFiles] = useState([]);
    const [formData, setFormData] = useState({
        jenis_cuti: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
        alasan_cuti: "",
        id_delegasi: "",
        id_approver: "",
    });

    // ── Monitoring state ─────────────────────────────────────────────────────
    const [datatableMonitoring, setDatatableMonitoring] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    // ── Approval state ───────────────────────────────────────────────────────
    const [datatableApproval, setDatatableApproval] = useState([]);

    // ── Columns ──────────────────────────────────────────────────────────────
    const COLUMNS_MONITORING = [
        { Header: "Dibuat Oleh", accessor: "nama_user" },
        {
            Header: "Jenis Cuti",
            accessor: "jenis_cuti",
            Cell: ({ value }) => jenisCutiLabel[value] || value,
        },
        { Header: "Tanggal Mulai", accessor: "tanggal_mulai" },
        { Header: "Tanggal Selesai", accessor: "tanggal_selesai" },
        { Header: "Alasan", accessor: "alasan_cuti" },
        { Header: "Delegasi", accessor: "id_delegasi" },
        {
            Header: "Status",
            Cell: ({ row }) => {
                const status = row.original.status_cuti;
                const color =
                    status === "APPROVED" ? "success" :
                        status === "REJECTED" ? "danger" :
                            status === "CANCELLED" ? "secondary" : "warning";
                return <span className={`badge bg-${color}`}>{status}</span>;
            }
        },
        {
            Header: "Aksi",
            Cell: ({ row }) => (
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => { setSelectedData(row.original.rawData); setShowDetail(true); }}
                >
                    Detail
                </button>
            )
        },
    ];

    const COLUMNS_APPROVAL = [
        { Header: "Nama Karyawan", accessor: "nama_user" },
        {
            Header: "Jenis Cuti",
            accessor: "jenis_cuti",
            Cell: ({ value }) => jenisCutiLabel[value] || value,
        },
        { Header: "Tanggal Mulai", accessor: "tanggal_mulai" },
        { Header: "Tanggal Selesai", accessor: "tanggal_selesai" },
        { Header: "Alasan", accessor: "alasan_cuti" },
        { Header: "Delegasi", accessor: "id_delegasi" },
        {
            Header: "Dokumen",
            Cell: ({ row }) => (
                row.original.rawData.dokumen_cuti ? (
                    <button className="btn btn-sm btn-info" onClick={() => getFile(row.original.rawData.id_cuti)}>
                        Lihat
                    </button>
                ) : <span className="text-muted">-</span>
            )
        },
        { Header: "Aksi", accessor: "aksi" },
    ];

    // ── Fetch helpers ────────────────────────────────────────────────────────
    const getDaftarUser = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const res = await apiConfig.get(apiUrl + "/users/all/staff", {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            });
            if (res.status === 200) {
                setDaftarUser(res.data.data);
                return res.data.data;
            }
        } catch (e) { console.log(e); }
        return [];
    };

    const getCutiBalance = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/Cuti/get-cuti-balance", {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            });
            if (result.status === 200) setBalance(result.data.data);
        } catch (e) { console.log(e); }
    };

    const getMonitoringCuti = async (userList = []) => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/Cuti/get-all-cuti", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });
            if (result.status === 200) {
                const arr = result.data.data.map((data) => ({
                    rawData: data,
                    nama_user: userList.find((u) => u.id_user === data.created_by)?.username || "-",
                    jenis_cuti: data.jenis_cuti || "-",
                    tanggal_mulai: data.tanggal_mulai || "-",
                    tanggal_selesai: data.tanggal_selesai || "-",
                    alasan_cuti: data.alasan_cuti || "-",
                    id_delegasi: userList.find((u) => u.id_user === data.id_delegasi)?.username || "-",
                    status_cuti: data.status_cuti || "PENDING",
                }));
                setDatatableMonitoring(arr);
            }
            setLoader(false);
        } catch (error) {
            console.error(error);
            setLoader(false);
        }
    };

    const getApprovalCuti = async (userList = []) => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/Cuti/get-all-cuti", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });
            if (result.status === 200) {
                const arr = [];
                for (const data of result.data.data) {
                    if (data.status_cuti !== "PENDING") continue;
                    arr.push({
                        rawData: data,
                        nama_user: userList.find((u) => u.id_user === data.created_by)?.username || "-",
                        jenis_cuti: data.jenis_cuti || "-",
                        tanggal_mulai: data.tanggal_mulai || "-",
                        tanggal_selesai: data.tanggal_selesai || "-",
                        alasan_cuti: data.alasan_cuti || "-",
                        id_delegasi: userList.find((u) => u.id_user === data.id_delegasi)?.username || "-",
                        aksi: (
                            <div className="d-flex flex-row gap-2">
                                <button type="button" className="btn btn-success btn-sm"
                                    onClick={() => handleApprove(data.id_cuti)}>
                                    <i className="ri-check-line me-1" /> Approve
                                </button>
                                <button type="button" className="btn btn-danger btn-sm"
                                    onClick={() => handleReject(data.id_cuti)}>
                                    <i className="ri-close-line me-1" /> Reject
                                </button>
                            </div>
                        )
                    });
                }
                setDatatableApproval(arr);
            }
            setLoader(false);
        } catch (error) {
            console.error(error);
            setLoader(false);
        }
    };

    const getFile = async (id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/Cuti/dokumen-file?id=" + id, {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([result.data], { type: "application/pdf" }));
            Swal.fire({
                title: "Dokumen Cuti",
                html: `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`,
                width: "80%",
                showConfirmButton: false,
                showCloseButton: true,
            });
        } catch (error) {
            Swal.fire("Error", "Gagal membuka dokumen", "error");
        }
    };

    // ── Create submit ────────────────────────────────────────────────────────
    const validateForm = () => {
        if (!formData.jenis_cuti) { Swal.fire("Validasi", "Jenis cuti wajib dipilih", "warning"); return false; }
        if (!formData.tanggal_mulai) { Swal.fire("Validasi", "Tanggal mulai wajib diisi", "warning"); return false; }
        if (!formData.tanggal_selesai) { Swal.fire("Validasi", "Tanggal selesai wajib diisi", "warning"); return false; }
        if (formData.tanggal_selesai < formData.tanggal_mulai) { Swal.fire("Validasi", "Tanggal selesai tidak boleh sebelum tanggal mulai", "warning"); return false; }
        if (!formData.alasan_cuti || formData.alasan_cuti.trim().length < 10) { Swal.fire("Validasi", "Alasan cuti wajib diisi (minimal 10 karakter)", "warning"); return false; }
        if (!formData.id_approver) { Swal.fire("Validasi", "Approver wajib dipilih", "warning"); return false; }
        return true;
    };

    const submit = async () => {
        if (!validateForm()) return;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const fd = new FormData();
        fd.append("jenis_cuti", formData.jenis_cuti);
        fd.append("tanggal_mulai", formData.tanggal_mulai);
        fd.append("tanggal_selesai", formData.tanggal_selesai);
        fd.append("alasan_cuti", formData.alasan_cuti);
        fd.append("id_approver", formData.id_approver);
        if (formData.id_delegasi) fd.append("id_delegasi", formData.id_delegasi);
        if (dokumenFiles.length > 0) fd.append("dokumen_upload", dokumenFiles[0].file);

        try {
            const result = await apiConfig.post(apiUrl + "/Cuti/create-cuti", fd, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });
            if (result.status === 200) {
                setLoader(false);
                Swal.fire({
                    title: "Berhasil", html: result.data.message, icon: "success",
                    timer: 3000, timerProgressBar: true, didOpen: () => Swal.showLoading(),
                }).then(() => { resetForm(); getCutiBalance(); setReload(prev => !prev); });
            }
        } catch (error) {
            setLoader(false);
            Swal.fire("Error", error.response?.data?.message || "Gagal mengajukan cuti", "error");
        }
    };

    const resetForm = () => {
        setFormData({ jenis_cuti: "", tanggal_mulai: "", tanggal_selesai: "", alasan_cuti: "", id_delegasi: "", id_approver: "" });
        setDokumenFiles([]);
    };

    // ── Approval actions ─────────────────────────────────────────────────────
    const handleApprove = async (id_cuti) => {
        const confirm = await Swal.fire({
            title: "Approve Cuti",
            text: "Apakah Anda yakin ingin menyetujui pengajuan cuti ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Approve",
            cancelButtonText: "Batal",
        });
        if (!confirm.isConfirmed) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            await apiConfig.post(apiUrl + "/Cuti/approve-cuti", {}, {
                params: { id_cuti, status_cuti: "APPROVED" },
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            });
            Swal.fire("Berhasil", "Pengajuan cuti berhasil di-approve", "success");
            setReload(prev => !prev);
        } catch (e) {
            Swal.fire("Gagal", e.response?.data?.message || "Gagal approve", "error");
        }
    };

    const handleReject = async (id_cuti) => {
        const { value: alasan_penolakan } = await Swal.fire({
            title: "Reject Cuti",
            input: "textarea",
            inputLabel: "Alasan Penolakan",
            inputPlaceholder: "Masukkan alasan penolakan...",
            showCancelButton: true,
            confirmButtonText: "Reject",
            cancelButtonText: "Batal",
            inputValidator: (value) => { if (!value) return "Alasan penolakan wajib diisi!"; }
        });
        if (!alasan_penolakan) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            await apiConfig.post(apiUrl + "/Cuti/approve-cuti", {}, {
                params: { id_cuti, status_cuti: "REJECTED", alasan_penolakan },
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            });
            Swal.fire("Berhasil", "Pengajuan cuti berhasil direject", "success");
            setReload(prev => !prev);
        } catch (e) {
            Swal.fire("Gagal", e.response?.data?.message || "Gagal reject", "error");
        }
    };

    // ── Init ─────────────────────────────────────────────────────────────────
    useEffect(() => {
        const init = async () => {
            const userList = await getDaftarUser();
            await getMonitoringCuti(userList);
            await getApprovalCuti(userList);
            await getCutiBalance();
        };
        init();
    }, [reload]);

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <Fragment>
            <Seo title={"Cuti"} />
            <PageHeaderVms title="Cuti" item="Cuti" active_item="Manajemen Cuti" />
            <LoadersSimUmira open={loader} />

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Body>
                            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                                <Nav variant="pills" className="nav panel-tabs main-nav-line mb-3">
                                    <Nav.Item>
                                        <Nav.Link
                                            eventKey="pengajuan"
                                            className="mt-1"
                                            style={{
                                                backgroundColor: activeTab === "pengajuan" ? "#6259ca" : "transparent",
                                                color: activeTab === "pengajuan" ? "#fff" : "",
                                            }}
                                        >
                                            Pengajuan Cuti
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link
                                            eventKey="monitoring"
                                            className="mt-1"
                                            style={{
                                                backgroundColor: activeTab === "monitoring" ? "#6259ca" : "transparent",
                                                color: activeTab === "monitoring" ? "#fff" : "",
                                            }}
                                        >
                                            Monitoring
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link
                                            eventKey="approval"
                                            className="mt-1"
                                            style={{
                                                backgroundColor: activeTab === "approval" ? "#6259ca" : "transparent",
                                                color: activeTab === "approval" ? "#fff" : "",
                                            }}
                                        >
                                            Approval
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Tab.Content>

                                    {/* ── Tab 1: Pengajuan ── */}
                                    <Tab.Pane eventKey="pengajuan" className="border p-3 rounded">
                                        {/* Balance info */}
                                        <Row className="mb-3">
                                            <Col xl={3} md={6}>
                                                <div className="p-3 rounded border">
                                                    <p className="text-muted mb-0" style={{ fontSize: "12px" }}>Sisa Cuti Tahunan</p>
                                                    <h5 className="mb-0">{balance.sisa_cuti} <span className="text-muted fs-6">/ 12 hari</span></h5>
                                                </div>
                                            </Col>
                                            <Col xl={3} md={6}>
                                                <div className="p-3 rounded border">
                                                    <p className="text-muted mb-0" style={{ fontSize: "12px" }}>Cuti Terpakai</p>
                                                    <h5 className="mb-0">{balance.used_cuti} <span className="text-muted fs-6">hari</span></h5>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="gy-3">
                                            <Col xl={12}>
                                                <label className="form-label">Jenis Cuti <span style={{ color: "red" }}>*</span></label>
                                                <Select
                                                    options={jenisOptions}
                                                    placeholder="Pilih jenis cuti..."
                                                    classNamePrefix="Select2"
                                                    onChange={(s) => setFormData({ ...formData, jenis_cuti: s?.value || "" })}
                                                    value={jenisOptions.find((o) => o.value === formData.jenis_cuti) || null}
                                                    isClearable
                                                />
                                            </Col>
                                            <Col xl={6}>
                                                <label className="form-label">Tanggal Mulai <span style={{ color: "red" }}>*</span></label>
                                                <input type="date" className="form-control"
                                                    value={formData.tanggal_mulai}
                                                    onChange={(e) => setFormData({ ...formData, tanggal_mulai: e.target.value })} />
                                            </Col>
                                            <Col xl={6}>
                                                <label className="form-label">Tanggal Selesai <span style={{ color: "red" }}>*</span></label>
                                                <input type="date" className="form-control"
                                                    value={formData.tanggal_selesai}
                                                    min={formData.tanggal_mulai}
                                                    onChange={(e) => setFormData({ ...formData, tanggal_selesai: e.target.value })} />
                                            </Col>
                                            <Col xl={12}>
                                                <label className="form-label">Alasan Cuti <span style={{ color: "red" }}>*</span></label>
                                                <textarea className="form-control" rows={3}
                                                    placeholder="Tuliskan alasan pengajuan cuti..."
                                                    value={formData.alasan_cuti}
                                                    onChange={(e) => setFormData({ ...formData, alasan_cuti: e.target.value })} />
                                            </Col>
                                            <Col xl={12}>
                                                <label className="form-label">
                                                    Delegasi Kepada <span className="text-muted ms-1" style={{ fontSize: "12px" }}>(opsional)</span>
                                                </label>
                                                <Select
                                                    options={daftarUser.map(u => ({ value: u.id_user, label: u.username }))}
                                                    placeholder="Pilih pengganti saat cuti..."
                                                    classNamePrefix="Select2"
                                                    onChange={(s) => setFormData({ ...formData, id_delegasi: s?.value || "" })}
                                                    value={daftarUser.map(u => ({ value: u.id_user, label: u.username })).find((u) => u.value === formData.id_delegasi) || null}
                                                    isClearable
                                                />
                                            </Col>
                                            <Col xl={12}>
                                                <label className="form-label">Approver <span style={{ color: "red" }}>*</span></label>
                                                <Select
                                                    options={daftarUser.map(u => ({ value: u.id_user, label: u.username }))}
                                                    placeholder="Pilih atasan sebagai approver..."
                                                    classNamePrefix="Select2"
                                                    onChange={(s) => setFormData({ ...formData, id_approver: s?.value || "" })}
                                                    value={daftarUser.map(u => ({ value: u.id_user, label: u.username })).find((u) => u.value === formData.id_approver) || null}
                                                    isClearable
                                                />
                                            </Col>
                                            <Col xl={12}>
                                                <label className="form-label">
                                                    Upload Dokumen <span className="text-muted ms-1" style={{ fontSize: "12px" }}>(opsional)</span>
                                                </label>
                                                <FilePond name="files"
                                                    acceptedFileTypes={["application/pdf", "image/*"]}
                                                    maxFileSize="5MB"
                                                    labelIdle='Drag & Drop file atau <span class="filepond--label-action">Browse</span>'
                                                    labelMaxFileSize="Maksimal ukuran file: 5MB"
                                                    files={dokumenFiles}
                                                    onupdatefiles={setDokumenFiles} />
                                            </Col>
                                            <Col xl={12}>
                                                <div className="d-flex gap-2 justify-content-end">
                                                    <Button variant="secondary" onClick={resetForm}>Reset</Button>
                                                    <Button variant="primary" onClick={submit}>Ajukan Cuti</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>

                                    {/* ── Tab 2: Monitoring ── */}
                                    <Tab.Pane eventKey="monitoring" className="border p-3 rounded">
                                        <div className="table-responsive">
                                            <BasicTableCostControl column={COLUMNS_MONITORING} datatable={datatableMonitoring} />
                                        </div>
                                    </Tab.Pane>

                                    {/* ── Tab 3: Approval ── */}
                                    <Tab.Pane eventKey="approval" className="border p-3 rounded">
                                        <div className="table-responsive">
                                            <BasicTableCostControl column={COLUMNS_APPROVAL} datatable={datatableApproval} />
                                        </div>
                                    </Tab.Pane>

                                </Tab.Content>
                            </Tab.Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Detail Modal */}
            <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detail Pengajuan Cuti</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedData && (
                        <>
                            <p><b>Nama Karyawan:</b> {daftarUser.find((u) => u.id_user === selectedData.created_by)?.username || "-"}</p>
                            <p><b>Jenis Cuti:</b> {jenisCutiLabel[selectedData.jenis_cuti] || selectedData.jenis_cuti}</p>
                            <p><b>Tanggal Mulai:</b> {selectedData.tanggal_mulai || "-"}</p>
                            <p><b>Tanggal Selesai:</b> {selectedData.tanggal_selesai || "-"}</p>
                            <p><b>Alasan:</b> {selectedData.alasan_cuti || "-"}</p>
                            <p><b>Delegasi:</b> {daftarUser.find((u) => u.id_user === selectedData.id_delegasi)?.username || "-"}</p>
                            <hr />
                            <p><b>Status:</b>{" "}
                                <span className={`badge bg-${selectedData.status_cuti === "APPROVED" ? "success" :
                                        selectedData.status_cuti === "REJECTED" ? "danger" :
                                            selectedData.status_cuti === "CANCELLED" ? "secondary" : "warning"
                                    }`}>{selectedData.status_cuti || "PENDING"}</span>
                            </p>
                            {selectedData.alasan_penolakan && (
                                <p><b>Alasan Penolakan:</b> {selectedData.alasan_penolakan}</p>
                            )}
                            {selectedData.dokumen_cuti && (
                                <div className="mt-2">
                                    <button className="btn btn-sm btn-info" onClick={() => getFile(selectedData.id_cuti)}>
                                        Lihat Dokumen
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetail(false)}>Tutup</Button>
                </Modal.Footer>
            </Modal>

        </Fragment>
    );
};

CutiPage.layout = "ContentlayoutVms";
export default CutiPage;