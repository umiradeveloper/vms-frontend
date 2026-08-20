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

const jenisCutiOptions = [
    { value: "ANNUAL_LEAVE",        label: "Cuti Tahunan" },
    { value: "IZIN",                label: "Izin" },
    { value: "ROSTER_LEAVE",        label: "Cuti Roster" },
    { value: "SICK_LEAVE",          label: "Sakit" },
    { value: "MATERNITY_LEAVE",     label: "Cuti Melahirkan" },
    { value: "BAPTISM_LEAVE",       label: "Cuti Baptis Anak" },
    { value: "MARRIAGE_LEAVE",      label: "Cuti Menikah" },
    { value: "CHILD_WEDDING_LEAVE", label: "Cuti Menikahkan Anak" },
    { value: "BEREAVEMENT_LEAVE",   label: "Cuti Keluarga Meninggal" },
    { value: "BREAVEMENT1_LEAVE",   label: "Cuti Anggota Keluarga Dalam Satu Rumah Meninggal" },
    { value: "HAJJ_LEAVE",          label: "Cuti Haji" },
];

const jenisCutiLabel = {
    ANNUAL_LEAVE:        "Cuti Tahunan",
    IZIN:                "Izin",
    ROSTER_LEAVE:        "Cuti Roster",
    SICK_LEAVE:          "Sakit",
    MATERNITY_LEAVE:     "Cuti Melahirkan",
    BAPTISM_LEAVE:       "Cuti Baptis Anak",
    MARRIAGE_LEAVE:      "Cuti Menikah",
    CHILD_WEDDING_LEAVE: "Cuti Menikahkan Anak",
    BEREAVEMENT_LEAVE:   "Cuti Keluarga Meninggal",
    BREAVEMENT1_LEAVE:   "Cuti Anggota Keluarga Dalam Satu Rumah Meninggal",
    HAJJ_LEAVE:          "Cuti Haji",
};

const jenisReimbursementOptions = [
    { value: "BBM",            label: "Reimbursement BBM" },
    { value: "NOTA", label: "Nota" },
];

const jenisReimbursementLabel = {
    BBM:  "Reimbursement BBM",
    NOTA: "Nota",
};

const tabStyle = (active, key) => ({
    backgroundColor: active === key ? "#6259ca" : "transparent",
    color: active === key ? "#fff" : "",
});

const HRPage = () => {
    const [topTab, setTopTab]   = useState("cuti");

    const [cutiTab, setCutiTab]   = useState("pengajuan");
    const [reimTab, setReimTab]   = useState("pengajuan");

    const [loader, setLoader]     = useState(false);
    const [reload, setReload]     = useState(false);
    const [daftarUser, setDaftarUser] = useState([]);

    const [balance, setBalance]   = useState({ sisa_cuti: 12, used_cuti: 0 });
    const [cutiDokumenFiles, setCutiDokumenFiles] = useState([]);
    const [cutiForm, setCutiForm] = useState({
        jenis_cuti: "", tanggal_mulai: "", tanggal_selesai: "",
        alasan_cuti: "", id_delegasi: "", id_approver: "",
    });
    const [cutiMonitoring, setCutiMonitoring]   = useState([]);
    const [cutiApproval, setCutiApproval]       = useState([]);
    const [showCutiDetail, setShowCutiDetail]   = useState(false);
    const [selectedCuti, setSelectedCuti]       = useState(null);

    const [reimDokumenFiles, setReimDokumenFiles] = useState([]);
    const [reimForm, setReimForm] = useState({
        jenis_reimbursement: "", tanggal_reimbursement: "",
        jumlah: "", keterangan: "", id_approver: "",
    });
    const [reimMonitoring, setReimMonitoring]   = useState([]);
    const [reimApproval, setReimApproval]       = useState([]);
    const [showReimDetail, setShowReimDetail]   = useState(false);
    const [selectedReim, setSelectedReim]       = useState(null);

    const CUTI_MON_COLS = [
        { Header: "Nama Karyawan",   accessor: "nama_user" },
        { Header: "Jenis Cuti",      accessor: "jenis_cuti", Cell: ({ value }) => jenisCutiLabel[value] || value },
        { Header: "Tanggal Mulai",   accessor: "tanggal_mulai" },
        { Header: "Tanggal Selesai", accessor: "tanggal_selesai" },
        { Header: "Alasan",          accessor: "alasan_cuti" },
        { Header: "Delegasi",        accessor: "id_delegasi" },
        {
            Header: "Status",
            Cell: ({ row }) => {
                const s = row.original.status_cuti;
                const c = s === "APPROVED" ? "success" : s === "REJECTED" ? "danger" : s === "CANCELLED" ? "secondary" : "warning";
                return <span className={`badge bg-${c}`}>{s}</span>;
            }
        },
        {
            Header: "Aksi",
            Cell: ({ row }) => (
                <button className="btn btn-sm btn-primary"
                    onClick={() => { setSelectedCuti(row.original.rawData); setShowCutiDetail(true); }}>
                    Detail
                </button>
            )
        },
    ];

    const CUTI_APP_COLS = [
        { Header: "Nama Karyawan",   accessor: "nama_user" },
        { Header: "Jenis Cuti",      accessor: "jenis_cuti", Cell: ({ value }) => jenisCutiLabel[value] || value },
        { Header: "Tanggal Mulai",   accessor: "tanggal_mulai" },
        { Header: "Tanggal Selesai", accessor: "tanggal_selesai" },
        { Header: "Alasan",          accessor: "alasan_cuti" },
        { Header: "Delegasi",        accessor: "id_delegasi" },
        {
            Header: "Dokumen",
            Cell: ({ row }) => row.original.rawData.dokumen_cuti ? (
                <button className="btn btn-sm btn-info" onClick={() => getCutiFile(row.original.rawData.id_cuti)}>Lihat</button>
            ) : <span className="text-muted">-</span>
        },
        { Header: "Aksi", accessor: "aksi" },
    ];

    const REIM_MON_COLS = [
        { Header: "Nama Karyawan", accessor: "nama_user" },
        { Header: "Jenis",         accessor: "jenis_reimbursement", Cell: ({ value }) => jenisReimbursementLabel[value] || value },
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
                    onClick={() => { setSelectedReim(row.original.rawData); setShowReimDetail(true); }}>
                    Detail
                </button>
            )
        },
    ];

    const REIM_APP_COLS = [
        { Header: "Nama Karyawan", accessor: "nama_user" },
        { Header: "Jenis",         accessor: "jenis_reimbursement", Cell: ({ value }) => jenisReimbursementLabel[value] || value },
        { Header: "Tanggal",       accessor: "tanggal_reimbursement" },
        { Header: "Jumlah",        accessor: "jumlah" },
        { Header: "Keterangan",    accessor: "keterangan" },
        {
            Header: "Dokumen",
            Cell: ({ row }) => row.original.rawData.dokumen_reimbursement ? (
                <button className="btn btn-sm btn-info" onClick={() => getReimFile(row.original.rawData.id_reimbursement)}>Lihat</button>
            ) : <span className="text-muted">-</span>
        },
        { Header: "Aksi", accessor: "aksi" },
    ];

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

    const authHeader = () => ({ "Authorization": "Bearer " + localStorage.getItem("token") });

    const getDaftarUser = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const res = await apiConfig.get(apiUrl + "/users/all/staff", { headers: authHeader() });
            if (res.status === 200) { setDaftarUser(res.data.data); return res.data.data; }
        } catch (e) { console.log(e); }
        return [];
    };

    const getCutiBalance = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/Cuti/get-cuti-balance", { headers: authHeader() });
            if (result.status === 200) setBalance(result.data.data);
        } catch (e) { console.log(e); }
    };

    const fetchAllCuti = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const result = await apiConfig.get(apiUrl + "/Cuti/get-all-cuti", {
            headers: { "Content-Type": "application/json", ...authHeader() },
        });
        return result.data.data;
    };

    const getMonitoringCuti = async (userList = []) => {
        setLoader(true);
        try {
            const data = await fetchAllCuti();
            setCutiMonitoring(data.map(d => ({
                rawData:         d,
                nama_user:       d.employee_pengajuan?.nama || "-",
                jenis_cuti:      d.jenis_cuti      || "-",
                tanggal_mulai:   d.tanggal_mulai   || "-",
                tanggal_selesai: d.tanggal_selesai || "-",
                alasan_cuti:     d.alasan_cuti     || "-",
                id_delegasi:     userList.find(u => u.id_user === d.id_delegasi)?.username || "-",
                status_cuti:     d.status_cuti     || "PENDING",
            })));
        } catch (e) { console.error(e); }
        setLoader(false);
    };

    const getApprovalCuti = async (userList = []) => {
        try {
            const data = await fetchAllCuti();
            const arr = [];
            for (const d of data) {
                if (d.status_cuti !== "PENDING") continue;
                arr.push({
                    rawData:         d,
                    nama_user:       d.employee_pengajuan?.nama || "-",
                    jenis_cuti:      d.jenis_cuti      || "-",
                    tanggal_mulai:   d.tanggal_mulai   || "-",
                    tanggal_selesai: d.tanggal_selesai || "-",
                    alasan_cuti:     d.alasan_cuti     || "-",
                    id_delegasi:     userList.find(u => u.id_user === d.id_delegasi)?.username || "-",
                    aksi: (
                        <div className="d-flex flex-row gap-2">
                            <button type="button" className="btn btn-success btn-sm" onClick={() => handleCutiApprove(d.id_cuti)}>
                                <i className="ri-check-line me-1" /> Approve
                            </button>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => handleCutiReject(d.id_cuti)}>
                                <i className="ri-close-line me-1" /> Reject
                            </button>
                        </div>
                    )
                });
            }
            setCutiApproval(arr);
        } catch (e) { console.error(e); }
    };

    const getCutiFile = async (id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/Cuti/dokumen-file?id=" + id, { headers: authHeader(), responseType: "blob" });
            const url = window.URL.createObjectURL(new Blob([result.data], { type: "application/pdf" }));
            Swal.fire({ title: "Dokumen Cuti", html: `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`, width: "80%", showConfirmButton: false, showCloseButton: true });
        } catch (e) { Swal.fire("Error", "Gagal membuka dokumen", "error"); }
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
            setReimMonitoring(data.map(d => ({
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
                            <button type="button" className="btn btn-success btn-sm" onClick={() => handleReimApprove(d.id_reimbursement)}>
                                <i className="ri-check-line me-1" /> Approve
                            </button>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => handleReimReject(d.id_reimbursement)}>
                                <i className="ri-close-line me-1" /> Reject
                            </button>
                        </div>
                    )
                });
            }
            setReimApproval(arr);
        } catch (e) { console.error(e); }
    };

    const getReimFile = async (id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/Reimbursement/dokumen-file?id=" + id, { headers: authHeader(), responseType: "blob" });
            const url = window.URL.createObjectURL(new Blob([result.data], { type: "application/pdf" }));
            Swal.fire({ title: "Dokumen Reimbursement", html: `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`, width: "80%", showConfirmButton: false, showCloseButton: true });
        } catch (e) { Swal.fire("Error", "Gagal membuka dokumen", "error"); }
    };

    const validateCutiForm = () => {
        if (!cutiForm.jenis_cuti)    { Swal.fire("Validasi", "Jenis cuti wajib dipilih", "warning"); return false; }
        if (!cutiForm.tanggal_mulai) { Swal.fire("Validasi", "Tanggal mulai wajib diisi", "warning"); return false; }
        if (!cutiForm.tanggal_selesai) { Swal.fire("Validasi", "Tanggal selesai wajib diisi", "warning"); return false; }
        if (cutiForm.tanggal_selesai < cutiForm.tanggal_mulai) { Swal.fire("Validasi", "Tanggal selesai tidak boleh sebelum tanggal mulai", "warning"); return false; }
        if (!cutiForm.alasan_cuti || cutiForm.alasan_cuti.trim().length < 10) { Swal.fire("Validasi", "Alasan cuti wajib diisi (minimal 10 karakter)", "warning"); return false; }
        if (!cutiForm.id_approver)   { Swal.fire("Validasi", "Approver wajib dipilih", "warning"); return false; }
        return true;
    };

    const submitCuti = async () => {
        if (!validateCutiForm()) return;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const fd = new FormData();
        fd.append("jenis_cuti",      cutiForm.jenis_cuti);
        fd.append("tanggal_mulai",   cutiForm.tanggal_mulai);
        fd.append("tanggal_selesai", cutiForm.tanggal_selesai);
        fd.append("alasan_cuti",     cutiForm.alasan_cuti);
        fd.append("id_approver",     cutiForm.id_approver);
        if (cutiForm.id_delegasi) fd.append("id_delegasi", cutiForm.id_delegasi);
        if (cutiDokumenFiles.length > 0) fd.append("dokumen_upload", cutiDokumenFiles[0].file);
        try {
            const result = await apiConfig.post(apiUrl + "/Cuti/create-cuti", fd, {
                headers: { "Content-Type": "multipart/form-data", ...authHeader() },
            });
            if (result.status === 200) {
                setLoader(false);
                Swal.fire({ title: "Berhasil", html: result.data.message, icon: "success", timer: 3000, timerProgressBar: true, didOpen: () => Swal.showLoading() })
                    .then(() => { resetCutiForm(); getCutiBalance(); setReload(p => !p); });
            }
        } catch (error) {
            setLoader(false);
            Swal.fire("Error", error.response?.data?.message || "Gagal mengajukan cuti", "error");
        }
    };

    const resetCutiForm = () => {
        setCutiForm({ jenis_cuti: "", tanggal_mulai: "", tanggal_selesai: "", alasan_cuti: "", id_delegasi: "", id_approver: "" });
        setCutiDokumenFiles([]);
    };

    const validateReimForm = () => {
        if (!reimForm.jenis_reimbursement)   { Swal.fire("Validasi", "Jenis reimbursement wajib dipilih", "warning"); return false; }
        if (!reimForm.tanggal_reimbursement) { Swal.fire("Validasi", "Tanggal wajib diisi", "warning"); return false; }
        if (!reimForm.jumlah || reimForm.jumlah === "0") { Swal.fire("Validasi", "Jumlah wajib diisi", "warning"); return false; }
        if (!reimForm.keterangan || reimForm.keterangan.trim().length < 5) { Swal.fire("Validasi", "Keterangan wajib diisi (minimal 5 karakter)", "warning"); return false; }
        if (!reimForm.id_approver) { Swal.fire("Validasi", "Approver wajib dipilih", "warning"); return false; }
        return true;
    };

    const submitReim = async () => {
        if (!validateReimForm()) return;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const fd = new FormData();
        fd.append("jenis_reimbursement",   reimForm.jenis_reimbursement);
        fd.append("tanggal_reimbursement", reimForm.tanggal_reimbursement);
        fd.append("jumlah",                cleanCurrency(reimForm.jumlah));
        fd.append("keterangan",            reimForm.keterangan);
        fd.append("id_approver",           reimForm.id_approver);
        if (reimDokumenFiles.length > 0) fd.append("dokumen_reimbursement", reimDokumenFiles[0].file);
        try {
            const result = await apiConfig.post(apiUrl + "/Reimbursement/create-reimbursement", fd, {
                headers: { "Content-Type": "multipart/form-data", ...authHeader() },
            });
            if (result.status === 200) {
                setLoader(false);
                Swal.fire({ title: "Berhasil", html: result.data.message, icon: "success", timer: 3000, timerProgressBar: true, didOpen: () => Swal.showLoading() })
                    .then(() => { resetReimForm(); setReload(p => !p); });
            }
        } catch (error) {
            setLoader(false);
            Swal.fire("Error", error.response?.data?.message || "Gagal mengajukan reimbursement", "error");
        }
    };

    const resetReimForm = () => {
        setReimForm({ jenis_reimbursement: "", tanggal_reimbursement: "", jumlah: "", keterangan: "", id_approver: "" });
        setReimDokumenFiles([]);
    };

    const handleCutiApprove = async (id_cuti) => {
        const confirm = await Swal.fire({ title: "Approve Cuti", text: "Apakah Anda yakin?", icon: "question", showCancelButton: true, confirmButtonText: "Ya, Approve", cancelButtonText: "Batal" });
        if (!confirm.isConfirmed) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            await apiConfig.post(apiUrl + "/Cuti/approve-cuti", {}, { params: { id_cuti, status_cuti: "APPROVED" }, headers: authHeader() });
            Swal.fire("Berhasil", "Cuti berhasil di-approve", "success");
            setReload(p => !p);
        } catch (e) { Swal.fire("Gagal", e.response?.data?.message || "Gagal approve", "error"); }
    };

    const handleCutiReject = async (id_cuti) => {
        const { value: alasan_penolakan } = await Swal.fire({ title: "Reject Cuti", input: "textarea", inputLabel: "Alasan Penolakan", inputPlaceholder: "Masukkan alasan penolakan...", showCancelButton: true, confirmButtonText: "Reject", cancelButtonText: "Batal", inputValidator: (v) => { if (!v) return "Alasan wajib diisi!"; } });
        if (!alasan_penolakan) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            await apiConfig.post(apiUrl + "/Cuti/approve-cuti", {}, { params: { id_cuti, status_cuti: "REJECTED", alasan_penolakan }, headers: authHeader() });
            Swal.fire("Berhasil", "Cuti berhasil direject", "success");
            setReload(p => !p);
        } catch (e) { Swal.fire("Gagal", e.response?.data?.message || "Gagal reject", "error"); }
    };

    const handleReimApprove = async (id_reimbursement) => {
        const confirm = await Swal.fire({ title: "Approve Reimbursement", text: "Apakah Anda yakin?", icon: "question", showCancelButton: true, confirmButtonText: "Ya, Approve", cancelButtonText: "Batal" });
        if (!confirm.isConfirmed) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            await apiConfig.post(apiUrl + "/Reimbursement/approve-reimbursement", {}, { params: { id_reimbursement, status_reimbursement: "APPROVED" }, headers: authHeader() });
            Swal.fire("Berhasil", "Reimbursement berhasil di-approve", "success");
            setReload(p => !p);
        } catch (e) { Swal.fire("Gagal", e.response?.data?.message || "Gagal approve", "error"); }
    };

    const handleReimReject = async (id_reimbursement) => {
        const { value: alasan_penolakan } = await Swal.fire({ title: "Reject Reimbursement", input: "textarea", inputLabel: "Alasan Penolakan", inputPlaceholder: "Masukkan alasan penolakan...", showCancelButton: true, confirmButtonText: "Reject", cancelButtonText: "Batal", inputValidator: (v) => { if (!v) return "Alasan wajib diisi!"; } });
        if (!alasan_penolakan) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            await apiConfig.post(apiUrl + "/Reimbursement/approve-reimbursement", {}, { params: { id_reimbursement, status_reimbursement: "REJECTED", alasan_penolakan }, headers: authHeader() });
            Swal.fire("Berhasil", "Reimbursement berhasil direject", "success");
            setReload(p => !p);
        } catch (e) { Swal.fire("Gagal", e.response?.data?.message || "Gagal reject", "error"); }
    };

    // ── Init ──────────────────────────────────────────────────────────────────
    useEffect(() => {
        const init = async () => {
            const userList = await getDaftarUser();
            await getMonitoringCuti(userList);
            await getApprovalCuti(userList);
            await getCutiBalance();
            await getMonitoringReim();
            await getApprovalReim();
        };
        init();
    }, [reload]);

    const userOptions = daftarUser.map(u => ({ value: u.id_user, label: u.username }));

    return (
        <Fragment>
            <Seo title={"HR - Cuti & Reimbursement"} />
            <PageHeaderVms title="HR" item="HR" active_item="Cuti & Reimbursement" />
            <LoadersSimUmira open={loader} />

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Body>

                            <Tab.Container activeKey={topTab} onSelect={(k) => setTopTab(k)}>
                                <Nav variant="pills" className="nav panel-tabs main-nav-line mb-3">
                                    <Nav.Item>
                                        <Nav.Link eventKey="cuti" className="mt-1" style={tabStyle(topTab, "cuti")}>
                                            Cuti
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="reimbursement" className="mt-1" style={tabStyle(topTab, "reimbursement")}>
                                            Reimbursement
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Tab.Content>

                                    <Tab.Pane eventKey="cuti">
                                        <Tab.Container activeKey={cutiTab} onSelect={(k) => setCutiTab(k)}>
                                            <Nav variant="pills" className="nav panel-tabs main-nav-line mb-3">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="pengajuan" className="mt-1" style={tabStyle(cutiTab, "pengajuan")}>Pengajuan</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="monitoring" className="mt-1" style={tabStyle(cutiTab, "monitoring")}>Monitoring</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="approval" className="mt-1" style={tabStyle(cutiTab, "approval")}>Approval</Nav.Link>
                                                </Nav.Item>
                                            </Nav>

                                            <Tab.Content>

                                                <Tab.Pane eventKey="pengajuan" className="border p-3 rounded">
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
                                                            <Select options={jenisCutiOptions} placeholder="Pilih jenis cuti..." classNamePrefix="Select2"
                                                                onChange={(s) => setCutiForm({ ...cutiForm, jenis_cuti: s?.value || "" })}
                                                                value={jenisCutiOptions.find(o => o.value === cutiForm.jenis_cuti) || null} isClearable />
                                                        </Col>
                                                        <Col xl={6}>
                                                            <label className="form-label">Tanggal Mulai <span style={{ color: "red" }}>*</span></label>
                                                            <input type="date" className="form-control" value={cutiForm.tanggal_mulai}
                                                                onChange={(e) => setCutiForm({ ...cutiForm, tanggal_mulai: e.target.value })} />
                                                        </Col>
                                                        <Col xl={6}>
                                                            <label className="form-label">Tanggal Selesai <span style={{ color: "red" }}>*</span></label>
                                                            <input type="date" className="form-control" value={cutiForm.tanggal_selesai}
                                                                min={cutiForm.tanggal_mulai}
                                                                onChange={(e) => setCutiForm({ ...cutiForm, tanggal_selesai: e.target.value })} />
                                                        </Col>
                                                        <Col xl={12}>
                                                            <label className="form-label">Alasan Cuti <span style={{ color: "red" }}>*</span></label>
                                                            <textarea className="form-control" rows={3} placeholder="Tuliskan alasan pengajuan cuti..."
                                                                value={cutiForm.alasan_cuti}
                                                                onChange={(e) => setCutiForm({ ...cutiForm, alasan_cuti: e.target.value })} />
                                                        </Col>
                                                        <Col xl={12}>
                                                            <label className="form-label">Delegasi Kepada <span className="text-muted ms-1" style={{ fontSize: "12px" }}>(opsional)</span></label>
                                                            <Select options={userOptions} placeholder="Pilih pengganti saat cuti..." classNamePrefix="Select2"
                                                                onChange={(s) => setCutiForm({ ...cutiForm, id_delegasi: s?.value || "" })}
                                                                value={userOptions.find(u => u.value === cutiForm.id_delegasi) || null} isClearable />
                                                        </Col>
                                                        <Col xl={12}>
                                                            <label className="form-label">Approver <span style={{ color: "red" }}>*</span></label>
                                                            <Select options={userOptions} placeholder="Pilih atasan sebagai approver..." classNamePrefix="Select2"
                                                                onChange={(s) => setCutiForm({ ...cutiForm, id_approver: s?.value || "" })}
                                                                value={userOptions.find(u => u.value === cutiForm.id_approver) || null} isClearable />
                                                        </Col>
                                                        <Col xl={12}>
                                                            <label className="form-label">Upload Dokumen <span className="text-muted ms-1" style={{ fontSize: "12px" }}>(opsional)</span></label>
                                                            <FilePond name="files" acceptedFileTypes={["application/pdf", "image/*"]} maxFileSize="5MB"
                                                                labelIdle='Drag & Drop file atau <span class="filepond--label-action">Browse</span>'
                                                                labelMaxFileSize="Maksimal ukuran file: 5MB"
                                                                files={cutiDokumenFiles} onupdatefiles={setCutiDokumenFiles} />
                                                        </Col>
                                                        <Col xl={12}>
                                                            <div className="d-flex gap-2 justify-content-end">
                                                                <Button variant="secondary" onClick={resetCutiForm}>Reset</Button>
                                                                <Button variant="primary" onClick={submitCuti}>Ajukan Cuti</Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Tab.Pane>

                                                <Tab.Pane eventKey="monitoring" className="border p-3 rounded">
                                                    <div className="table-responsive">
                                                        <BasicTableCostControl column={CUTI_MON_COLS} datatable={cutiMonitoring} />
                                                    </div>
                                                </Tab.Pane>

                                                <Tab.Pane eventKey="approval" className="border p-3 rounded">
                                                    <div className="table-responsive">
                                                        <BasicTableCostControl column={CUTI_APP_COLS} datatable={cutiApproval} />
                                                    </div>
                                                </Tab.Pane>

                                            </Tab.Content>
                                        </Tab.Container>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="reimbursement">
                                        <Tab.Container activeKey={reimTab} onSelect={(k) => setReimTab(k)}>
                                            <Nav variant="pills" className="nav panel-tabs main-nav-line mb-3">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="pengajuan" className="mt-1" style={tabStyle(reimTab, "pengajuan")}>Pengajuan</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="monitoring" className="mt-1" style={tabStyle(reimTab, "monitoring")}>Monitoring</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="approval" className="mt-1" style={tabStyle(reimTab, "approval")}>Approval</Nav.Link>
                                                </Nav.Item>
                                            </Nav>

                                            <Tab.Content>

                                                <Tab.Pane eventKey="pengajuan" className="border p-3 rounded">
                                                    <Row className="gy-3">
                                                        <Col xl={12}>
                                                            <label className="form-label">Jenis Reimbursement <span style={{ color: "red" }}>*</span></label>
                                                            <Select options={jenisReimbursementOptions} placeholder="Select type..." classNamePrefix="Select2"
                                                                onChange={(s) => setReimForm({ ...reimForm, jenis_reimbursement: s?.value || "" })}
                                                                value={jenisReimbursementOptions.find(o => o.value === reimForm.jenis_reimbursement) || null} isClearable />
                                                        </Col>
                                                        <Col xl={12}>
                                                            <label className="form-label">Jumlah <span style={{ color: "red" }}>*</span></label>
                                                            <div className="input-group">
                                                                <span className="input-group-text">Rp</span>
                                                                <input type="text" className="form-control" placeholder="0" value={reimForm.jumlah}
                                                                    onChange={(e) => setReimForm({ ...reimForm, jumlah: changeFormatCurrency(e.target.value) })} />
                                                            </div>
                                                        </Col>
                                                        <Col xl={12}>
                                                            <label className="form-label">Tanggal <span style={{ color: "red" }}>*</span></label>
                                                            <input type="date" className="form-control" value={reimForm.tanggal_reimbursement}
                                                                onChange={(e) => setReimForm({ ...reimForm, tanggal_reimbursement: e.target.value })} />
                                                        </Col>
                                                        <Col xl={12}>
                                                            <label className="form-label">Attachment <span className="text-muted ms-1" style={{ fontSize: "12px" }}>(opsional)</span></label>
                                                            <FilePond name="files" acceptedFileTypes={["application/pdf", "image/*"]} maxFileSize="5MB"
                                                                labelIdle='Drag & Drop file atau <span class="filepond--label-action">Browse</span>'
                                                                labelMaxFileSize="Maksimal ukuran file: 5MB"
                                                                files={reimDokumenFiles} onupdatefiles={setReimDokumenFiles} />
                                                        </Col>
                                                        <Col xl={12}>
                                                            <label className="form-label">Keterangan <span style={{ color: "red" }}>*</span></label>
                                                            <textarea className="form-control" rows={3} placeholder="Provide details about this expense..."
                                                                value={reimForm.keterangan}
                                                                onChange={(e) => setReimForm({ ...reimForm, keterangan: e.target.value })} />
                                                        </Col>
                                                        <Col xl={12}>
                                                            <label className="form-label">Approver <span style={{ color: "red" }}>*</span></label>
                                                            <Select options={userOptions} isSearchable placeholder="Pilih atasan sebagai approver..." classNamePrefix="Select2"
                                                                onChange={(s) => setReimForm({ ...reimForm, id_approver: s?.value || "" })}
                                                                value={userOptions.find(u => u.value === reimForm.id_approver) || null} isClearable />
                                                        </Col>
                                                        <Col xl={12}>
                                                            <div className="d-flex gap-2 justify-content-end">
                                                                <Button variant="secondary" onClick={resetReimForm}>Reset</Button>
                                                                <Button variant="primary" onClick={submitReim}>Submit</Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Tab.Pane>

                                                <Tab.Pane eventKey="monitoring" className="border p-3 rounded">
                                                    <div className="table-responsive">
                                                        <BasicTableCostControl column={REIM_MON_COLS} datatable={reimMonitoring} />
                                                    </div>
                                                </Tab.Pane>

                                                <Tab.Pane eventKey="approval" className="border p-3 rounded">
                                                    <div className="table-responsive">
                                                        <BasicTableCostControl column={REIM_APP_COLS} datatable={reimApproval} />
                                                    </div>
                                                </Tab.Pane>

                                            </Tab.Content>
                                        </Tab.Container>
                                    </Tab.Pane>

                                </Tab.Content>
                            </Tab.Container>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showCutiDetail} onHide={() => setShowCutiDetail(false)} size="lg">
                <Modal.Header closeButton><Modal.Title>Detail Pengajuan Cuti</Modal.Title></Modal.Header>
                <Modal.Body>
                    {selectedCuti && (
                        <>
                            <p><b>Nama Karyawan:</b> {selectedCuti.employee_pengajuan?.nama || "-"}</p>
                            <p><b>Jenis Cuti:</b> {jenisCutiLabel[selectedCuti.jenis_cuti] || selectedCuti.jenis_cuti}</p>
                            <p><b>Tanggal Mulai:</b> {selectedCuti.tanggal_mulai || "-"}</p>
                            <p><b>Tanggal Selesai:</b> {selectedCuti.tanggal_selesai || "-"}</p>
                            <p><b>Alasan:</b> {selectedCuti.alasan_cuti || "-"}</p>
                            <p><b>Delegasi:</b> {daftarUser.find(u => u.id_user === selectedCuti.id_delegasi)?.username || "-"}</p>
                            <hr />
                            <p><b>Status:</b>{" "}
                                <span className={`badge bg-${selectedCuti.status_cuti === "APPROVED" ? "success" : selectedCuti.status_cuti === "REJECTED" ? "danger" : selectedCuti.status_cuti === "CANCELLED" ? "secondary" : "warning"}`}>
                                    {selectedCuti.status_cuti || "PENDING"}
                                </span>
                            </p>
                            {selectedCuti.alasan_penolakan && <p><b>Alasan Penolakan:</b> {selectedCuti.alasan_penolakan}</p>}
                            {selectedCuti.dokumen_cuti && (
                                <button className="btn btn-sm btn-info mt-2" onClick={() => getCutiFile(selectedCuti.id_cuti)}>Lihat Dokumen</button>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={() => setShowCutiDetail(false)}>Tutup</Button></Modal.Footer>
            </Modal>

            <Modal show={showReimDetail} onHide={() => setShowReimDetail(false)} size="lg">
                <Modal.Header closeButton><Modal.Title>Detail Reimbursement</Modal.Title></Modal.Header>
                <Modal.Body>
                    {selectedReim && (
                        <>
                            <p><b>Nama Karyawan:</b> {selectedReim.employee_pengajuan?.nama || "-"}</p>
                            <p><b>Jenis:</b> {jenisReimbursementLabel[selectedReim.jenis_reimbursement] || selectedReim.jenis_reimbursement}</p>
                            <p><b>Tanggal:</b> {selectedReim.tanggal_reimbursement || "-"}</p>
                            <p><b>Jumlah:</b> {toCurrency(selectedReim.jumlah)}</p>
                            <p><b>Keterangan:</b> {selectedReim.keterangan || "-"}</p>
                            <hr />
                            <p><b>Status:</b>{" "}
                                <span className={`badge bg-${selectedReim.status_reimbursement === "APPROVED" ? "success" : selectedReim.status_reimbursement === "REJECTED" ? "danger" : selectedReim.status_reimbursement === "CANCELLED" ? "secondary" : "warning"}`}>
                                    {selectedReim.status_reimbursement || "PENDING"}
                                </span>
                            </p>
                            {selectedReim.alasan_penolakan && <p><b>Alasan Penolakan:</b> {selectedReim.alasan_penolakan}</p>}
                            {selectedReim.dokumen_reimbursement && (
                                <button className="btn btn-sm btn-info mt-2" onClick={() => getReimFile(selectedReim.id_reimbursement)}>Lihat Dokumen</button>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={() => setShowReimDetail(false)}>Tutup</Button></Modal.Footer>
            </Modal>

        </Fragment>
    );
};

HRPage.layout = "ContentlayoutVms";
export default HRPage;