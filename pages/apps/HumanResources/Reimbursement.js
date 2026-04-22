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
    { value: "BBM", label: "Reimbursement BBM" },
    { value: "INVOICE_KOSONG", label: "Invoice Kosong" },
];

const jenisLabel = {
    BBM: "Reimbursement BBM",
    INVOICE_KOSONG: "Invoice Kosong",
};

const ReimbursementPage = () => {
    const [activeTab, setActiveTab] = useState("pengajuan");
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);
    const [daftarUser, setDaftarUser] = useState([]);

    const [dokumenFiles, setDokumenFiles] = useState([]);
    const [formData, setFormData] = useState({
        jenis_reimbursement: "",
        tanggal_reimbursement: "",
        jumlah: "",
        keterangan: "",
        id_approver: "",
    });

    const [datatableMonitoring, setDatatableMonitoring] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const [datatableApproval, setDatatableApproval] = useState([]);

    const COLUMNS_MONITORING = [
        { Header: "Dibuat Oleh", accessor: "nama_user" },
        {
            Header: "Jenis",
            accessor: "jenis_reimbursement",
            Cell: ({ value }) => jenisLabel[value] || value,
        },
        { Header: "Tanggal", accessor: "tanggal_reimbursement" },
        { Header: "Jumlah", accessor: "jumlah" },
        { Header: "Keterangan", accessor: "keterangan" },
        {
            Header: "Status",
            Cell: ({ row }) => {
                const status = row.original.status_reimbursement;
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
            Header: "Jenis",
            accessor: "jenis_reimbursement",
            Cell: ({ value }) => jenisLabel[value] || value,
        },
        { Header: "Tanggal", accessor: "tanggal_reimbursement" },
        { Header: "Jumlah", accessor: "jumlah" },
        { Header: "Keterangan", accessor: "keterangan" },
        {
            Header: "Dokumen",
            Cell: ({ row }) => (
                row.original.rawData.dokumen_reimbursement ? (
                    <button className="btn btn-sm btn-info"
                        onClick={() => getFile(row.original.rawData.id_reimbursement)}>
                        Lihat
                    </button>
                ) : <span className="text-muted">-</span>
            )
        },
        { Header: "Aksi", accessor: "aksi" },
    ];

    const toCurrency = (value) => {
        if (!value) return "Rp0";
        return new Intl.NumberFormat("id-ID", {
            style: "currency", currency: "IDR", minimumFractionDigits: 0
        }).format(Number(value));
    };

    const changeFormatCurrency = (val) => {
        let clean = val.replace(/[^\d]/g, "");
        return clean ? new Intl.NumberFormat("id-ID").format(clean) : "";
    };

    const cleanCurrency = (val) => {
        if (!val) return 0;
        return Number(val.replace(/\./g, ""));
    };

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

    const getEmployee = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/HR-Employee/get-employee", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });
            if (result.status === 200) {
                console.log(result.data.data);
            }
        } catch (error) {
            console.log("Error get employee:", error.response?.data);
        }
    };

    const getMonitoringReimbursement = async (userList = []) => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/Reimbursement/get-all-reimbursement", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });
            if (result.status === 200) {
                const arr = result.data.data.map((data) => ({
                    rawData: data,
                    nama_user: data.employee_pengajuan?.nama || "-",
                    // nama_user: userList.find((u) => u.id_user === data.created_by)?.username || "-",
                    jenis_reimbursement: data.jenis_reimbursement || "-",
                    tanggal_reimbursement: data.tanggal_reimbursement || "-",
                    jumlah: toCurrency(data.jumlah),
                    keterangan: data.keterangan || "-",
                    status_reimbursement: data.status_reimbursement || "PENDING",
                }));
                setDatatableMonitoring(arr);
            }
            setLoader(false);
            console.log(result);
        } catch (error) {
            console.error(error);
            setLoader(false);
        }
    };

    const getApprovalReimbursement = async (userList = []) => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/Reimbursement/get-all-reimbursement", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });
            if (result.status === 200) {
                const arr = [];
                for (const data of result.data.data) {
                    if (data.status_reimbursement !== "PENDING") continue;
                    arr.push({
                        rawData: data,
                        nama_user: data.employee_pengajuan?.nama || "-",
                        // nama_user: userList.find((u) => u.id_user === data.created_by)?.username || "-",
                        jenis_reimbursement: data.jenis_reimbursement || "-",
                        tanggal_reimbursement: data.tanggal_reimbursement || "-",
                        jumlah: toCurrency(data.jumlah),
                        keterangan: data.keterangan || "-",
                        aksi: (
                            <div className="d-flex flex-row gap-2">
                                <button type="button" className="btn btn-success btn-sm"
                                    onClick={() => handleApprove(data.id_reimbursement)}>
                                    <i className="ri-check-line me-1" /> Approve
                                </button>
                                <button type="button" className="btn btn-danger btn-sm"
                                    onClick={() => handleReject(data.id_reimbursement)}>
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
            const result = await apiConfig.get(apiUrl + "/Reimbursement/dokumen-file?id=" + id, {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([result.data], { type: "application/pdf" }));
            Swal.fire({
                title: "Dokumen Reimbursement",
                html: `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`,
                width: "80%",
                showConfirmButton: false,
                showCloseButton: true,
            });
        } catch (error) {
            Swal.fire("Error", "Gagal membuka dokumen", "error");
        }
    };

    const validateForm = () => {
        if (!formData.jenis_reimbursement) { Swal.fire("Validasi", "Jenis reimbursement wajib dipilih", "warning"); return false; }
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
        fd.append("jenis_reimbursement", formData.jenis_reimbursement);
        fd.append("tanggal_reimbursement", formData.tanggal_reimbursement);
        fd.append("jumlah", cleanCurrency(formData.jumlah));
        fd.append("keterangan", formData.keterangan);
        fd.append("id_approver", formData.id_approver);
        if (dokumenFiles.length > 0) fd.append("dokumen_reimbursement", dokumenFiles[0].file);

        try {
            const result = await apiConfig.post(apiUrl + "/Reimbursement/create-reimbursement", fd, {
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
                }).then(() => { resetForm(); setReload(prev => !prev); });
            }
        } catch (error) {
            setLoader(false);
            Swal.fire("Error", error.response?.data?.message || "Gagal mengajukan reimbursement", "error");
        }
    };

    const resetForm = () => {
        setFormData({
            jenis_reimbursement: "", tanggal_reimbursement: "",
            jumlah: "", keterangan: "", id_approver: "",
        });
        setDokumenFiles([]);
    };

    const handleApprove = async (id_reimbursement) => {
        const confirm = await Swal.fire({
            title: "Approve Reimbursement",
            text: "Apakah Anda yakin ingin menyetujui pengajuan ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Approve",
            cancelButtonText: "Batal",
        });
        if (!confirm.isConfirmed) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            await apiConfig.post(apiUrl + "/Reimbursement/approve-reimbursement", {}, {
                params: { id_reimbursement, status_reimbursement: "APPROVED" },
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            });
            Swal.fire("Berhasil", "Reimbursement berhasil di-approve", "success");
            setReload(prev => !prev);
        } catch (e) {
            Swal.fire("Gagal", e.response?.data?.message || "Gagal approve", "error");
        }
    };

    const handleReject = async (id_reimbursement) => {
        const { value: alasan_penolakan } = await Swal.fire({
            title: "Reject Reimbursement",
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
            await apiConfig.post(apiUrl + "/Reimbursement/approve-reimbursement", {}, {
                params: { id_reimbursement, status_reimbursement: "REJECTED", alasan_penolakan },
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            });
            Swal.fire("Berhasil", "Reimbursement berhasil direject", "success");
            setReload(prev => !prev);
        } catch (e) {
            Swal.fire("Gagal", e.response?.data?.message || "Gagal reject", "error");
        }
    };

    useEffect(() => {
        const init = async () => {
            const userList = await getDaftarUser();
            await getMonitoringReimbursement(userList);
            await getApprovalReimbursement(userList);
            await getEmployee();
        };
        init();
    }, [reload]);

    const userOptions = daftarUser.map(u => ({ value: u.id_user, label: u.username }));

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <Fragment>
            <Seo title={"Reimbursement"} />
            <PageHeaderVms title="Reimbursement" item="Reimbursement" active_item="Manajemen Reimbursement" />
            <LoadersSimUmira open={loader} />

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Body>
                            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                                <Nav variant="pills" className="nav panel-tabs main-nav-line mb-3">
                                    <Nav.Item>
                                        <Nav.Link eventKey="pengajuan" className="mt-1"
                                            style={{
                                                backgroundColor: activeTab === "pengajuan" ? "#6259ca" : "transparent",
                                                color: activeTab === "pengajuan" ? "#fff" : "",
                                            }}>
                                            Pengajuan
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="monitoring" className="mt-1"
                                            style={{
                                                backgroundColor: activeTab === "monitoring" ? "#6259ca" : "transparent",
                                                color: activeTab === "monitoring" ? "#fff" : "",
                                            }}>
                                            Monitoring
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="approval" className="mt-1"
                                            style={{
                                                backgroundColor: activeTab === "approval" ? "#6259ca" : "transparent",
                                                color: activeTab === "approval" ? "#fff" : "",
                                            }}>
                                            Approval
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Tab.Content>

                                    <Tab.Pane eventKey="pengajuan" className="border p-3 rounded">
                                        <Row className="gy-3">
                                            <Col xl={12}>
                                                <label className="form-label">Jenis Reimbursement <span style={{ color: "red" }}>*</span></label>
                                                <Select
                                                    options={jenisOptions}
                                                    placeholder="Select type..."
                                                    classNamePrefix="Select2"
                                                    onChange={(s) => setFormData({ ...formData, jenis_reimbursement: s?.value || "" })}
                                                    value={jenisOptions.find((o) => o.value === formData.jenis_reimbursement) || null}
                                                    isClearable
                                                />
                                            </Col>
                                            <Col xl={12}>
                                                <label className="form-label">Jumlah <span style={{ color: "red" }}>*</span></label>
                                                <div className="input-group">
                                                    <span className="input-group-text">Rp</span>
                                                    <input type="text" className="form-control" placeholder="0"
                                                        value={formData.jumlah}
                                                        onChange={(e) => setFormData({ ...formData, jumlah: changeFormatCurrency(e.target.value) })} />
                                                </div>
                                            </Col>
                                            <Col xl={12}>
                                                <label className="form-label">Tanggal <span style={{ color: "red" }}>*</span></label>
                                                <input type="date" className="form-control"
                                                    value={formData.tanggal_reimbursement}
                                                    onChange={(e) => setFormData({ ...formData, tanggal_reimbursement: e.target.value })} />
                                            </Col>
                                            <Col xl={12}>
                                                <label className="form-label">
                                                    Attachment <span className="text-muted ms-1" style={{ fontSize: "12px" }}>(opsional)</span>
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
                                                <label className="form-label">Keterangan <span style={{ color: "red" }}>*</span></label>
                                                <textarea className="form-control" rows={3}
                                                    placeholder="Provide details about this expense..."
                                                    value={formData.keterangan}
                                                    onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })} />
                                            </Col>
                                            <Col xl={12}>
                                                <label className="form-label">Approver <span style={{ color: "red" }}>*</span></label>
                                                <Select
                                                    options={userOptions}
                                                    isSearchable
                                                    placeholder="Pilih atasan sebagai approver..."
                                                    classNamePrefix="Select2"
                                                    onChange={(s) => setFormData({ ...formData, id_approver: s?.value || "" })}
                                                    value={userOptions.find((u) => u.value === formData.id_approver) || null}
                                                    isClearable
                                                />
                                            </Col>
                                            <Col xl={12}>
                                                <div className="d-flex gap-2 justify-content-end">
                                                    <Button variant="secondary" onClick={resetForm}>Reset</Button>
                                                    <Button variant="primary" onClick={submit}>Submit</Button>
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

            <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detail Reimbursement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedData && (
                        <>
                            <p><b>Nama Karyawan:</b> {daftarUser.find((u) => u.id_user === selectedData.created_by)?.username || "-"}</p>
                            <p><b>Jenis:</b> {jenisLabel[selectedData.jenis_reimbursement] || selectedData.jenis_reimbursement}</p>
                            <p><b>Tanggal:</b> {selectedData.tanggal_reimbursement || "-"}</p>
                            <p><b>Jumlah:</b> {toCurrency(selectedData.jumlah)}</p>
                            <p><b>Keterangan:</b> {selectedData.keterangan || "-"}</p>
                            <hr />
                            <p><b>Status:</b>{" "}
                                <span className={`badge bg-${selectedData.status_reimbursement === "APPROVED" ? "success" :
                                        selectedData.status_reimbursement === "REJECTED" ? "danger" :
                                            selectedData.status_reimbursement === "CANCELLED" ? "secondary" : "warning"
                                    }`}>{selectedData.status_reimbursement || "PENDING"}</span>
                            </p>
                            {selectedData.alasan_penolakan && (
                                <p><b>Alasan Penolakan:</b> {selectedData.alasan_penolakan}</p>
                            )}
                            {selectedData.dokumen_reimbursement && (
                                <div className="mt-2">
                                    <button className="btn btn-sm btn-info"
                                        onClick={() => getFile(selectedData.id_reimbursement)}>
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

ReimbursementPage.layout = "ContentlayoutVms";
export default ReimbursementPage;