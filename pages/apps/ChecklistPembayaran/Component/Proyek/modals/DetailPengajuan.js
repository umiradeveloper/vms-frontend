
import { Button, Divider } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
const Select = dynamic(() => import("react-select"), { ssr: false });
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";

const DetailPengajuan = ({ openModal, setOpenModal, loader, setLoader }) => {
    const [idTransaksi, setIdTransaksi] = useState("");
    const [fileTransaksi, setFileTransaksi] = useState([]);
    const [nilaiTransaksi, setNilaiTransaksi] = useState([]);
    const [reload, setReload] = useState(false);
    const [modalUploadTransaksi, setModalUploadTransaksi] = useState({
        open: false,
        id_detail_transaksi: "",
        nama_transaksi: ""
        // dokumen_files: null
    })
    const [showData, setShowData] = useState({
        jenis_transaksi: "",
        proyek: "",
        status_approval: "",
        layak_bayar: "",
        bukti_bayar: "",
        detail_transaksi: [],
        pengajuanTransaksi: [],
        detailPembayaran: []
    })
    const [updatePengajuanApproval, setUpdatePengajuanApproval] = useState({
        status_approval: "",
        layak_bayar: "",
        upload_bukti_bayar: null
    })
    const [dataApproval, setDataApproval] = useState([]);
    const [layakBayar, setLayakBayar] = useState([]);

    const handleFileChange = (index, file) => {
        const updated = [...fileTransaksi];
        updated[index] = file; // simpan file
        setFileTransaksi(updated);
    };
    const handleInputChange = (index, value) => {
        const updated = [...nilaiTransaksi];
        updated[index] = value; // simpan file
        setNilaiTransaksi(updated);
    };


    const getFileTransaksi = async (id, nama) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/Proyek/dokumen-file?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }, responseType: "blob"
            });
            const url = window.URL.createObjectURL(new Blob([result.data], { type: "application/pdf" }));
            Swal.fire({ title: "Dokumen Transaksi " + nama, html: `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`, width: "80%", showConfirmButton: false, showCloseButton: true });
        } catch (e) { Swal.fire("Error", "Gagal membuka dokumen", "error"); }
    };

    const getFileDokumenBuktiBayar = async (id, nama) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/Proyek/dokumen-bukti-bayar?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }, responseType: "blob"
            });
            const url = window.URL.createObjectURL(new Blob([result.data], { type: "application/pdf" }));
            Swal.fire({ title: "Dokumen Transaksi " + nama, html: `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`, width: "80%", showConfirmButton: false, showCloseButton: true });
        } catch (e) { Swal.fire("Error", "Gagal membuka dokumen", "error"); }
    };
    const getDokumenBuktiBayar = async (dataDokumen = []) => {

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {

            let htmlDokumen = "";

            for (const item of dataDokumen) {

                const result = await apiConfig.get(
                    apiUrl +
                    "/ChecklistTransaksi/transaksi/Proyek/dokumen-bukti-bayar?id=" +
                    item.id_checklist_bukti_bayar,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization":
                                "Bearer " + localStorage.getItem("token"),
                        },
                        responseType: "blob",
                    }
                );

                const url = window.URL.createObjectURL(
                    new Blob([result.data], {
                        type: "application/pdf",
                    })
                );

                htmlDokumen += `
                <div style="
                    position:relative;
                    margin-bottom:35px;
                    border-radius:24px;
                    overflow:hidden;
                    background:linear-gradient(145deg,#ffffff 0%,#f8fafc 100%);
                    border:1px solid rgba(255,255,255,0.2);
                    box-shadow:
                        0 10px 30px rgba(0,0,0,0.08),
                        0 2px 10px rgba(0,0,0,0.04);
                ">

                    <!-- GLOW -->
                    <div style="
                        position:absolute;
                        width:220px;
                        height:220px;
                        border-radius:50%;
                        background:rgba(139,92,246,0.08);
                        top:-100px;
                        right:-80px;
                    "></div>

                    <!-- HEADER -->
                    <div style="
                        position:relative;
                        padding:22px 24px;
                        background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);
                        color:white;
                    ">

                        <div style="
                            display:flex;
                            align-items:center;
                            justify-content:space-between;
                            gap:20px;
                            flex-wrap:wrap;
                        ">

                            <div>
                                <div style="
                                    font-size:18px;
                                    font-weight:700;
                                    margin-bottom:6px;
                                ">
                                    📄 Dokumen bukti pembayaran transaksi proyek
                                </div>

                                <div style="
                                    opacity:0.8;
                                    font-size:13px;
                                ">
                                    ${toCurrency(item.nominal_bayar)}
                                </div>
                            </div>

                            <div style="
                                width:60px;
                                height:60px;
                                border-radius:50%;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                background:rgba(255,255,255,0.15);
                                backdrop-filter:blur(10px);
                                border:1px solid rgba(255,255,255,0.2);
                                font-size:28px;
                            ">
                                💳
                            </div>
                        </div>
                    </div>

                    <!-- CONTENT -->
                    <div style="
                        padding:18px;
                        background:#f8fafc;
                    ">

                        <!-- INFO -->
                        <div style="
                            margin-bottom:16px;
                            padding:14px 18px;
                            border-radius:18px;
                            background:white;
                            border:1px solid #e2e8f0;
                            display:flex;
                            align-items:center;
                            justify-content:space-between;
                            flex-wrap:wrap;
                            gap:15px;
                        ">

                            <div>
                                <div style="
                                    font-size:12px;
                                    color:#64748b;
                                    margin-bottom:4px;
                                ">
                                    Status Dokumen
                                </div>

                                <div style="
                                    font-size:15px;
                                    font-weight:600;
                                    color:#0f172a;
                                ">
                                    Dokumen Pembayaran Tersedia
                                </div>
                            </div>

                            <div style="
                                padding:10px 18px;
                                border-radius:999px;
                                background:rgba(16,185,129,0.12);
                                color:#059669;
                                font-weight:600;
                                font-size:13px;
                            ">
                                ✔ Verified
                            </div>
                        </div>

                        <!-- PDF VIEW -->
                        <div style="
                            border-radius:20px;
                            overflow:hidden;
                            border:1px solid #e2e8f0;
                            background:white;
                            box-shadow:0 4px 15px rgba(0,0,0,0.04);
                        ">

                            <iframe 
                                src="${url}" 
                                width="100%" 
                                height="600px" 
                                style="
                                    border:none;
                                    background:white;
                                "
                            ></iframe>
                        </div>

                    </div>
                </div>
            `;
            }

            Swal.fire({
                html: `
                <div style="
                    position:relative;
                    padding:10px;
                    text-align:left;
                ">

                    <!-- HEADER -->
                    <div style="
                        position:sticky;
                        top:0;
                        z-index:10;
                        margin-bottom:25px;
                        padding:24px;
                        border-radius:24px;
                        background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);
                        color:white;
                        overflow:hidden;
                        box-shadow:0 10px 30px rgba(79,70,229,0.25);
                    ">

                        <div style="
                            position:absolute;
                            width:260px;
                            height:260px;
                            border-radius:50%;
                            background:rgba(255,255,255,0.08);
                            top:-120px;
                            right:-100px;
                        "></div>

                        <div style="
                            position:relative;
                            display:flex;
                            align-items:center;
                            justify-content:space-between;
                            flex-wrap:wrap;
                            gap:20px;
                        ">

                            <div>
                                <div style="
                                    font-size:28px;
                                    font-weight:800;
                                    margin-bottom:6px;
                                ">
                                    Detail Pembayaran
                                </div>

                                <div style="
                                    font-size:14px;
                                    opacity:0.8;
                                ">
                                    Dokumen bukti pembayaran transaksi proyek
                                </div>
                            </div>

                            <div style="
                                width:80px;
                                height:80px;
                                border-radius:50%;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                background:rgba(255,255,255,0.15);
                                backdrop-filter:blur(10px);
                                border:1px solid rgba(255,255,255,0.2);
                                font-size:38px;
                            ">
                                💰
                            </div>
                        </div>
                    </div>

                    <!-- CONTENT -->
                    <div style="
                        max-height:75vh;
                        overflow-y:auto;
                        padding-right:8px;
                    ">
                        ${htmlDokumen}
                    </div>

                </div>
            `,
                width: "90%",
                background: "#f1f5f9",
                showConfirmButton: false,
                showCloseButton: true,
                customClass: {
                    popup: "rounded-5",
                    closeButton: "swal2-close-custom",
                },
            });

        } catch (e) {

            Swal.fire(
                "Error",
                "Gagal membuka dokumen pembayaran",
                "error"
            );
        }
    };


    const getTransaksiById = async (id) => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const resultApi = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/Proyek/get-transaksi-by-id?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(resultApi);
            if (resultApi.status == 200) {
                const datas = resultApi.data.data;
                let bayar = 0;
                for (const dataBayar of datas.detailPembayaran) {
                    bayar += dataBayar.nominal_bayar ?? 0
                }
                setShowData({
                    jenis_transaksi: datas.jenis_transaksi,
                    proyek: datas.proyek,
                    bukti_bayar: datas.upload_bukti_pembayaran,
                    layak_bayar: datas.layak_bayar,
                    status_approval: datas.status_pengajuan,
                    nama_vendor: datas.nama_vendor ?? "-",
                    kategori: datas.kategori ?? "-",
                    nomor_invoice: datas.nomor_invoice ?? "-",
                    nilai_invoice: datas.nilai_invoice,
                    pph: datas.pph,
                    ppn: datas.ppn,
                    retensi: datas.retensi,
                    kasbon: datas.kasbon,
                    tanggal_invoice: datas.tanggal_invoice,
                    no_po_kontrak: datas.no_po_kontrak,
                    nilai_invoice_bersih: datas.nilai_invoice_bersih,
                    biaya_potongan_lainnya: datas.biaya_potongan_lainnya,
                    nilai_yang_terbayar: bayar,
                    nilai_sisa: datas.nilai_invoice_bersih - bayar,
                    detail_transaksi: datas.detailTransaksi,
                    pengajuanTransaksi: datas.pengajuanTransaksi,
                    detailPembayaran: datas.detailPembayaran
                })
                setUpdatePengajuanApproval({
                    layak_bayar: datas.layak_bayar,
                    status_approval: datas.status_pengajuan,
                    // upload_bukti_bayar: datas.bukti_bayar
                })
            }
        } catch (error) {
            console.log(error);
        } finally { setLoader(false) }
    }

    const getStatusPengajuan = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const resultApi = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/get-master-status-approval", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(resultApi);
            if (resultApi.status == 200) {
                const dataMasterApproval = [];
                if (resultApi.data.data?.length > 0) {

                    for (const datas of resultApi.data.data) {
                        dataMasterApproval.push({
                            value: datas,
                            label: datas
                        })
                    }

                }
                setDataApproval(dataMasterApproval);

            }
        } catch (error) {
            console.log(error);
        } finally { setLoader(false) }
    }

    const getStatusLayakBayar = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const resultApi = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/get-master-status-layak-bayar", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(resultApi);
            if (resultApi.status == 200) {
                const dataMasterLayakBayar = [];
                if (resultApi.data.data?.length > 0) {

                    for (const datas of resultApi.data.data) {
                        dataMasterLayakBayar.push({
                            value: datas,
                            label: datas
                        })
                    }

                }
                setLayakBayar(dataMasterLayakBayar);

            }
        } catch (error) {
            console.log(error);
        } finally { setLoader(false) }
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

            return {
                status: true,
                value: result.value
            };
            // ✅ user confirmed
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // setReload(prev => !prev);
            // await swalWithBootstrapButtons.fire(
            //     "Cancelled",
            //     // "Your imaginary file is safe :)",
            //     "error"
            // );
            return {
                status: false,
                // value: result.value
            }; // ✅ user cancelled
        }

        return false;
    }
    const updateDokumenDetailTransaksi = async (index, item) => {
        const selectedFile = fileTransaksi[index];
        // const inputNilai = nilaiTransaksi[index];
        // console.log(selectedFile)
        if (!selectedFile) {

            alert("File tidak boleh kosong");
            return;
        }

        const formData = new FormData();
        formData.append("upload_dokumen_transaksi", selectedFile);
        // formData.append("nilai_transaksi", inputNilai);
        // formData.append("id_detail_transaksi", item.id_detail_transaksi);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const result = await apiConfig.post(apiUrl + "/ChecklistTransaksi/transaksi/Proyek/update-detail-transaksi-pengajuan?id=" + item.id_detail_transaksi, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if (result.status == 200) {
                setReload(prev => !prev);
                swalAlert(result.data.message, result.statusText, "success");

                // setOpenModal({ ...openModal, open: false });
                // setFormTransaksi(result.data?.data);
            }

            // alert("Upload berhasil");
        } catch (error) {
            console.error(error);
            // alert("Upload gagal");
        } finally {
            setLoader(false);
        }
    }

    const toCurrency = (amount) => {
        const hasil = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(amount);
        return hasil
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
                clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
    }


    useEffect(() => {
        if (openModal.open) {
            // console.log(openModal);
            const datas = openModal.data;
            setIdTransaksi(datas.id_transaksi);
            getTransaksiById(datas.id_transaksi);
            getStatusPengajuan();
            getStatusLayakBayar();
            // setShowData({
            //     jenis_transaksi: datas.jenis_transaksi,
            //     proyek: datas.proyek,
            //     detail_transaksi: datas.detailTransaksi
            // })
        }
    }, [openModal.open, reload])
    return (
        <>
            <Modal size="xl" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>

                <Modal.Header>
                    <h6 className="modal-title" id="exampleModalLabel">Detail Transaksi</h6>
                </Modal.Header>
                <Modal.Body>
                    <Row>

                        <Col xl={12} className="rounded-3">
                            <div className="row gy-2 pb-3">
                                <Col xl={12} className="mb-4">

                                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                                        {/* Header */}
                                        <div className="bg-primary bg-gradient p-4 text-white">

                                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                                                <div>
                                                    <h4 className="fw-bold mb-1">
                                                        Detail Pengajuan Transaksi
                                                    </h4>

                                                    <span className="opacity-75">
                                                        Informasi transaksi dan invoice proyek
                                                    </span>
                                                </div>

                                                <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "70px",
                                                        height: "70px"
                                                    }}
                                                >
                                                    <i className="ri-file-list-3-line fs-1"></i>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="card-body p-4">

                                            <Row className="gy-4">

                                                {/* Jenis Transaksi */}
                                                <Col xl={6}>
                                                    <div className="bg-light rounded-4 p-4 h-100 border">

                                                        <small className="text-muted d-block mb-2">
                                                            Jenis Transaksi
                                                        </small>

                                                        <h5 className="fw-bold text-dark mb-0">
                                                            {showData.jenis_transaksi || "-"}
                                                        </h5>
                                                    </div>
                                                </Col>

                                                {/* Proyek */}
                                                <Col xl={6}>
                                                    <div className="bg-light rounded-4 p-4 h-100 border">

                                                        <small className="text-muted d-block mb-2">
                                                            Proyek
                                                        </small>

                                                        <h5 className="fw-bold text-dark mb-0">
                                                            {showData.proyek || "-"}
                                                        </h5>
                                                    </div>
                                                </Col>
                                                {/* Vendor */}
                                                <Col xl={6}>
                                                    <div className="bg-light rounded-4 p-4 h-100 border">

                                                        <small className="text-muted d-block mb-2">
                                                            Nama Vendor
                                                        </small>

                                                        <div className="d-flex align-items-center">
                                                            <div
                                                                className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                                                style={{
                                                                    width: "50px",
                                                                    height: "50px"
                                                                }}
                                                            >
                                                                <i className="ri-store-2-line text-primary fs-4"></i>
                                                            </div>

                                                            <div>
                                                                <h5 className="fw-bold text-dark mb-0">
                                                                    {showData.nama_vendor || "-"}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>

                                                {/* Kategori Material */}
                                                <Col xl={6}>
                                                    <div className="bg-light rounded-4 p-4 h-100 border">

                                                        <small className="text-muted d-block mb-2">
                                                            Kategori
                                                        </small>

                                                        <div className="d-flex align-items-center">
                                                            <div
                                                                className="rounded-circle bg-warning bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                                                style={{
                                                                    width: "50px",
                                                                    height: "50px"
                                                                }}
                                                            >
                                                                <i className="ri-stack-line text-warning fs-4"></i>
                                                            </div>

                                                            <div>
                                                                <h5 className="fw-bold text-dark mb-0">
                                                                    {showData.kategori || "-"}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>

                                                

                                                {/* Nilai Invoice */}
                                                <Col xl={6}>
                                                    <div className="rounded-4 p-4 text-white position-relative overflow-hidden"
                                                        style={{
                                                            background:
                                                                "linear-gradient(135deg, #0d6efd 0%, #084298 100%)"
                                                        }}
                                                    >

                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                right: "-20px",
                                                                top: "-20px",
                                                                opacity: 0.15,
                                                                fontSize: "120px"
                                                            }}
                                                        >
                                                            <i className="ri-calendar-line"></i>
                                                        </div>

                                                        <small className="d-block mb-2 opacity-75">
                                                            NO PO / Kontrak
                                                        </small>

                                                        <h2 className="fw-bold mb-0">
                                                            {showData.no_po_kontrak || "-"}
                                                        </h2>
                                                    </div>
                                                </Col>

                                                {/* Nilai Invoice */}
                                                <Col xl={6}>
                                                    <div className="rounded-4 p-4 text-white position-relative overflow-hidden"
                                                        style={{
                                                            background:
                                                                "linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)"
                                                        }}
                                                    >

                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                right: "-20px",
                                                                top: "-20px",
                                                                opacity: 0.15,
                                                                fontSize: "120px"
                                                            }}
                                                        >
                                                            <i className="ri-money-dollar-circle-line"></i>
                                                        </div>

                                                        <small className="d-block mb-2 opacity-75">
                                                            Nilai Invoice
                                                        </small>

                                                        <h2 className="fw-bold mb-0">
                                                            {toCurrency(showData.nilai_invoice) || "-"}
                                                        </h2>
                                                    </div>
                                                </Col>
                                                <Col xl={6}>
                                                    <div className="rounded-4 p-4 text-white position-relative overflow-hidden"
                                                        style={{
                                                            background:
                                                                "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)"
                                                        }}
                                                    >

                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                right: "-20px",
                                                                top: "-20px",
                                                                opacity: 0.15,
                                                                fontSize: "120px"
                                                            }}
                                                        >
                                                            <i className="ri-bill-line"></i>
                                                        </div>

                                                        <small className="d-block mb-2 opacity-75">
                                                            Nomor Invoice
                                                        </small>

                                                        <h2 className="fw-bold mb-0">
                                                            {showData.nomor_invoice || "-"}
                                                        </h2>
                                                    </div>
                                                </Col>

                                                {/* Nilai Invoice */}
                                                <Col xl={6}>
                                                    <div className="rounded-4 p-4 text-white position-relative overflow-hidden"
                                                        style={{
                                                            background:
                                                                "linear-gradient(135deg, #fbbf24 0%, #ea580c 100%)"
                                                        }}
                                                    >

                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                right: "-20px",
                                                                top: "-20px",
                                                                opacity: 0.15,
                                                                fontSize: "120px"
                                                            }}
                                                        >
                                                            <i className="ri-clipboard-line"></i>
                                                        </div>

                                                        <small className="d-block mb-2 opacity-75">
                                                            Tanggal Invoice
                                                        </small>

                                                        <h2 className="fw-bold mb-0">
                                                            {showData.tanggal_invoice || "-"}
                                                        </h2>
                                                    </div>
                                                </Col>

                                                {/* PPN */}
                                                <Col xl={3} md={6}>
                                                    <div className="card border-0 shadow-sm rounded-4 h-100">

                                                        <div className="card-body text-center p-4">

                                                            <div className="mb-3">
                                                                <div
                                                                    className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                                                                    style={{
                                                                        width: "60px",
                                                                        height: "60px"
                                                                    }}
                                                                >
                                                                    <i className="ri-percent-line text-success fs-3"></i>
                                                                </div>
                                                            </div>

                                                            <small className="text-muted d-block mb-2">
                                                                PPN
                                                            </small>

                                                            <h5 className="fw-bold mb-0">
                                                                {toCurrency(showData.ppn) || "-"}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </Col>

                                                {/* PPH */}
                                                <Col xl={3} md={6}>
                                                    <div className="card border-0 shadow-sm rounded-4 h-100">

                                                        <div className="card-body text-center p-4">

                                                            <div className="mb-3">
                                                                <div
                                                                    className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                                                                    style={{
                                                                        width: "60px",
                                                                        height: "60px"
                                                                    }}
                                                                >
                                                                    <i className="ri-bank-card-line text-danger fs-3"></i>
                                                                </div>
                                                            </div>

                                                            <small className="text-muted d-block mb-2">
                                                                PPH
                                                            </small>

                                                            <h5 className="fw-bold mb-0">
                                                                {toCurrency(showData.pph) || "-"}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </Col>

                                                {/* Retensi */}
                                                <Col xl={3} md={6}>
                                                    <div className="card border-0 shadow-sm rounded-4 h-100">

                                                        <div className="card-body text-center p-4">

                                                            <div className="mb-3">
                                                                <div
                                                                    className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                                                                    style={{
                                                                        width: "60px",
                                                                        height: "60px"
                                                                    }}
                                                                >
                                                                    <i className="ri-secure-payment-line text-warning fs-3"></i>
                                                                </div>
                                                            </div>

                                                            <small className="text-muted d-block mb-2">
                                                                Retensi
                                                            </small>

                                                            <h5 className="fw-bold mb-0">
                                                                {toCurrency(showData.retensi) || "-"}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </Col>

                                                {/* Kasbon */}
                                                <Col xl={3} md={6}>
                                                    <div className="card border-0 shadow-sm rounded-4 h-100">

                                                        <div className="card-body text-center p-4">

                                                            <div className="mb-3">
                                                                <div
                                                                    className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                                                                    style={{
                                                                        width: "60px",
                                                                        height: "60px"
                                                                    }}
                                                                >
                                                                    <i className="ri-wallet-3-line text-info fs-3"></i>
                                                                </div>
                                                            </div>

                                                            <small className="text-muted d-block mb-2">
                                                                Kasbon
                                                            </small>

                                                            <h5 className="fw-bold mb-0">
                                                                {toCurrency(showData.kasbon) || "-"}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </Col>

                                                {/* Kasbon */}
                                                <Col xl={12} md={12}>
                                                    <div className="card border-0 shadow-sm rounded-4 h-100">

                                                        <div className="card-body text-center p-4">

                                                            <div className="mb-3">
                                                                <div
                                                                    className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                                                                    style={{
                                                                        width: "60px",
                                                                        height: "60px"
                                                                    }}
                                                                >
                                                                    <i className="ri-coupon-3-line text-info fs-3"></i>
                                                                </div>
                                                            </div>

                                                            <small className="text-muted d-block mb-2">
                                                                Biaya Potongan Lainnya
                                                            </small>

                                                            <h5 className="fw-bold mb-0">
                                                                {toCurrency(showData.biaya_potongan_lainnya ?? 0) || "-"}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </Col>

                                                {/* Nilai Bersih */}
                                                <Col xl={12}>
                                                    <div className="border rounded-4 p-4 bg-light">

                                                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                                                            <div>
                                                                <small className="text-muted d-block mb-2">
                                                                    Nilai Invoice Yang Dibayarkan
                                                                </small>

                                                                <h2 className="fw-bold text-success mb-0">
                                                                    {toCurrency(showData.nilai_invoice_bersih) || "-"}
                                                                </h2>
                                                            </div>

                                                            <div
                                                                className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                                                                style={{
                                                                    width: "80px",
                                                                    height: "80px"
                                                                }}
                                                            >
                                                                <i className="ri-money-dollar-box-line text-success fs-1"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Row className="gy-4">

                                                    {/* ===================== NILAI TERBAYAR ===================== */}
                                                    <Col xl={6}>
                                                        <div
                                                            className="position-relative overflow-hidden rounded-4 p-4 h-100 border-0"
                                                            style={{
                                                                background:
                                                                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                                                boxShadow: "0 10px 30px rgba(16,185,129,0.25)",
                                                            }}
                                                        >

                                                            {/* Glow */}
                                                            <div
                                                                style={{
                                                                    position: "absolute",
                                                                    width: "220px",
                                                                    height: "220px",
                                                                    borderRadius: "50%",
                                                                    background: "rgba(255,255,255,0.08)",
                                                                    top: "-100px",
                                                                    right: "-70px",
                                                                }}
                                                            />

                                                            {/* Background Icon */}
                                                            <div
                                                                style={{
                                                                    position: "absolute",
                                                                    right: "-10px",
                                                                    bottom: "-20px",
                                                                    fontSize: "120px",
                                                                    opacity: 0.12,
                                                                    color: "#fff",
                                                                }}
                                                            >
                                                                <i className="ri-money-dollar-circle-line"></i>
                                                            </div>

                                                            <div className="position-relative">

                                                                <div className="d-flex align-items-start justify-content-between">

                                                                    <div>
                                                                        <small className="text-white opacity-75 d-block mb-2">
                                                                            Nilai Yang Terbayar
                                                                        </small>

                                                                        <h2 className="fw-bold text-white mb-1">
                                                                            {toCurrency(showData.nilai_yang_terbayar)}
                                                                        </h2>

                                                                        <small className="text-white opacity-75">
                                                                            Total pembayaran yang telah diterima
                                                                        </small>
                                                                    </div>

                                                                    {/* ICON */}
                                                                    <div
                                                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                                                        style={{
                                                                            width: "75px",
                                                                            height: "75px",
                                                                            background: "rgba(255,255,255,0.15)",
                                                                            backdropFilter: "blur(10px)",
                                                                            border: "1px solid rgba(255,255,255,0.2)",
                                                                        }}
                                                                    >
                                                                        <i className="ri-bank-card-fill text-white fs-1"></i>
                                                                    </div>
                                                                </div>

                                                                {/* FOOTER */}
                                                                <div
                                                                    className="mt-4 rounded-4 p-3"
                                                                    style={{
                                                                        background: "rgba(255,255,255,0.12)",
                                                                        backdropFilter: "blur(12px)",
                                                                        border: "1px solid rgba(255,255,255,0.15)",
                                                                    }}
                                                                >
                                                                    <div className="d-flex align-items-center justify-content-between">

                                                                        <div>
                                                                            <small className="text-white opacity-75 d-block mb-1">
                                                                                Status Pembayaran
                                                                            </small>

                                                                            <h6 className="fw-bold text-white mb-0">
                                                                                Pembayaran Berjalan
                                                                            </h6>
                                                                        </div>
                                                                        <div className="d-flex align-items-center gap-2">

                                                                            {/* DETAIL BUTTON */}
                                                                            <Button
                                                                                variant="contained"
                                                                                className="btn rounded-pill px-4 py-2 fw-semibold text-white border-0"
                                                                                style={{
                                                                                    background: "rgba(255,255,255,0.18)",
                                                                                    backdropFilter: "blur(10px)",
                                                                                    border: "1px solid rgba(255,255,255,0.2)",
                                                                                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
                                                                                }}
                                                                                onClick={() => getDokumenBuktiBayar(showData.detailPembayaran)}
                                                                            >
                                                                                <i className="ri-file-list-3-line me-2"></i>
                                                                                Detail Pembayaran
                                                                            </Button>

                                                                            {/* ICON */}
                                                                            <div
                                                                                className="rounded-circle d-flex align-items-center justify-content-center"
                                                                                style={{
                                                                                    width: "55px",
                                                                                    height: "55px",
                                                                                    background: "rgba(255,255,255,0.15)",
                                                                                }}
                                                                            >
                                                                                <i className="ri-arrow-up-circle-fill text-white fs-3"></i>
                                                                            </div>
                                                                        </div>

                                                                        <div
                                                                            className="rounded-circle d-flex align-items-center justify-content-center"
                                                                            style={{
                                                                                width: "55px",
                                                                                height: "55px",
                                                                                background: "rgba(255,255,255,0.15)",
                                                                            }}
                                                                        >
                                                                            <i className="ri-arrow-up-circle-fill text-white fs-3"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    {/* ===================== NILAI SISA ===================== */}
                                                    <Col xl={6}>
                                                        <div
                                                            className="position-relative overflow-hidden rounded-4 p-4 h-100 border-0"
                                                            style={{
                                                                background:
                                                                    "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
                                                                boxShadow: "0 10px 30px rgba(245,158,11,0.25)",
                                                            }}
                                                        >

                                                            {/* Glow */}
                                                            <div
                                                                style={{
                                                                    position: "absolute",
                                                                    width: "220px",
                                                                    height: "220px",
                                                                    borderRadius: "50%",
                                                                    background: "rgba(255,255,255,0.08)",
                                                                    top: "-100px",
                                                                    right: "-70px",
                                                                }}
                                                            />

                                                            {/* Background Icon */}
                                                            <div
                                                                style={{
                                                                    position: "absolute",
                                                                    right: "-10px",
                                                                    bottom: "-20px",
                                                                    fontSize: "120px",
                                                                    opacity: 0.12,
                                                                    color: "#fff",
                                                                }}
                                                            >
                                                                <i className="ri-wallet-3-line"></i>
                                                            </div>

                                                            <div className="position-relative">

                                                                <div className="d-flex align-items-start justify-content-between">

                                                                    <div>
                                                                        <small className="text-white opacity-75 d-block mb-2">
                                                                            Nilai Sisa Invoice
                                                                        </small>

                                                                        <h2 className="fw-bold text-white mb-1">
                                                                            {toCurrency(showData.nilai_sisa)}
                                                                        </h2>

                                                                        <small className="text-white opacity-75">
                                                                            Sisa tagihan yang belum dibayarkan
                                                                        </small>
                                                                    </div>

                                                                    {/* ICON */}
                                                                    <div
                                                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                                                        style={{
                                                                            width: "75px",
                                                                            height: "75px",
                                                                            background: "rgba(255,255,255,0.15)",
                                                                            backdropFilter: "blur(10px)",
                                                                            border: "1px solid rgba(255,255,255,0.2)",
                                                                        }}
                                                                    >
                                                                        <i className="ri-funds-fill text-white fs-1"></i>
                                                                    </div>
                                                                </div>

                                                                {/* FOOTER */}
                                                                <div
                                                                    className="mt-4 rounded-4 p-3"
                                                                    style={{
                                                                        background: "rgba(255,255,255,0.12)",
                                                                        backdropFilter: "blur(12px)",
                                                                        border: "1px solid rgba(255,255,255,0.15)",
                                                                    }}
                                                                >
                                                                    <div className="d-flex align-items-center justify-content-between">

                                                                        <div>
                                                                            <small className="text-white opacity-75 d-block mb-1">
                                                                                Status Invoice
                                                                            </small>

                                                                            <h6 className="fw-bold text-white mb-0">
                                                                                Menunggu Pelunasan
                                                                            </h6>
                                                                        </div>

                                                                        <div
                                                                            className="rounded-circle d-flex align-items-center justify-content-center"
                                                                            style={{
                                                                                width: "55px",
                                                                                height: "55px",
                                                                                background: "rgba(255,255,255,0.15)",
                                                                            }}
                                                                        >
                                                                            <i className="ri-time-fill text-white fs-3"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>

                                                </Row>

                                            </Row>
                                        </div>
                                    </div>
                                </Col>



                                {/* ===================== DETAIL DOKUMEN ===================== */}
                                <div className="mt-4">
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div>
                                            <h5 className="fw-bold mb-1 text-dark">
                                                Detail Dokumen Transaksi
                                            </h5>
                                            <small className="text-muted">
                                                Informasi dokumen dan status verifikasi
                                            </small>
                                        </div>

                                        <div>
                                            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
                                                {showData.detail_transaksi?.length || 0} Dokumen
                                            </span>
                                        </div>
                                    </div>

                                    {showData.detail_transaksi &&
                                        showData.detail_transaksi.map((item, index) => (
                                            <div
                                                key={index}
                                                className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden"
                                                style={{
                                                    background:
                                                        "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                                                }}
                                            >
                                                {/* TOP BAR */}
                                                <div
                                                    className={`px-4 py-2 ${item.checklist == 1
                                                        ? "bg-success"
                                                        : item.checklist == 2
                                                            ? "bg-danger"
                                                            : "bg-info"
                                                        }`}
                                                >
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="text-white fw-semibold">
                                                            <i className="ri-file-list-3-line me-2"></i>
                                                            Dokumen Transaksi
                                                        </div>

                                                        <span className="badge bg-white text-dark px-3 py-2 rounded-pill">
                                                            {item.checklist == 1
                                                                ? "Verified"
                                                                : item.checklist == 2
                                                                    ? "Not Verified"
                                                                    : "On Review"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="card-body p-4">

                                                    {/* TITLE */}
                                                    <div className="mb-4">
                                                        <h5 className="fw-bold text-dark mb-1">
                                                            {item.pertanyaan}
                                                        </h5>

                                                        <small className="text-muted">
                                                            Dokumen pendukung transaksi proyek
                                                        </small>
                                                    </div>

                                                    {/* ACTION CARD */}
                                                    <div className="row g-3">

                                                        {/* VIEW FILE */}
                                                        <div className="col-xl-6">
                                                            <div className="border rounded-4 p-3 h-100 bg-light-subtle">
                                                                <div className="d-flex flex-column h-100 justify-content-between">
                                                                    <div>
                                                                        <small className="text-muted d-block mb-2">
                                                                            Dokumen
                                                                        </small>

                                                                        <h6 className="fw-semibold">
                                                                            File Transaksi
                                                                        </h6>
                                                                    </div>

                                                                    <Button
                                                                        variant="contained"
                                                                        className="btn btn-primary mt-3"
                                                                        onClick={() =>
                                                                            getFileTransaksi(
                                                                                item.id_detail_transaksi,
                                                                                item.pertanyaan
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="ri-eye-line me-2"></i>
                                                                        Lihat Dokumen
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* STATUS */}
                                                        <div className="col-xl-6">
                                                            <div className="border rounded-4 p-3 h-100 bg-light-subtle">
                                                                <small className="text-muted d-block mb-2">
                                                                    Status Verifikasi
                                                                </small>

                                                                <div className="mt-2">
                                                                    {item.checklist == 1 && (
                                                                        <div className="d-flex align-items-center text-success">
                                                                            <i className="ri-checkbox-circle-fill fs-4 me-2"></i>
                                                                            <div>
                                                                                <h6 className="mb-0 fw-bold">
                                                                                    Verified
                                                                                </h6>
                                                                                <small>
                                                                                    Dokumen telah diverifikasi
                                                                                </small>
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {item.checklist == 2 && (
                                                                        <div className="d-flex align-items-center text-danger">
                                                                            <i className="ri-close-circle-fill fs-4 me-2"></i>
                                                                            <div>
                                                                                <h6 className="mb-0 fw-bold">
                                                                                    Not Verified
                                                                                </h6>
                                                                                <small>
                                                                                    Dokumen perlu revisi
                                                                                </small>
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {!item.checklist && (
                                                                        <div className="d-flex align-items-center text-info">
                                                                            <i className="ri-time-fill fs-4 me-2"></i>
                                                                            <div>
                                                                                <h6 className="mb-0 fw-bold">
                                                                                    On Review
                                                                                </h6>
                                                                                <small>
                                                                                    Menunggu proses verifikasi
                                                                                </small>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>

                                                    {/* CATATAN */}
                                                    {item.catatan && (
                                                        <div
                                                            className="mt-4 p-4 rounded-4"
                                                            style={{
                                                                background:
                                                                    "linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)",
                                                                borderLeft: "5px solid #dc3545",
                                                            }}
                                                        >
                                                            <div className="d-flex align-items-start">
                                                                <div className="me-3">
                                                                    <i className="ri-error-warning-fill text-danger fs-3"></i>
                                                                </div>

                                                                <div>
                                                                    <h6 className="fw-bold text-danger mb-2">
                                                                        Catatan Reviewer
                                                                    </h6>

                                                                    <div
                                                                        className="text-dark"
                                                                        style={{
                                                                            lineHeight: "1.7",
                                                                            overflowWrap: "break-word",
                                                                        }}
                                                                    >
                                                                        {item.catatan}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* REUPLOAD */}
                                                    {item.checklist == 2 && (
                                                        <div className="mt-4">
                                                            <div
                                                                className="rounded-4 p-4"
                                                                style={{
                                                                    background:
                                                                        "linear-gradient(135deg, #fff8e1 0%, #fff3cd 100%)",
                                                                    border: "1px solid #ffe69c",
                                                                }}
                                                            >
                                                                <div className="d-flex align-items-center mb-3">
                                                                    <i className="ri-upload-cloud-2-line text-warning fs-3 me-2"></i>

                                                                    <div>
                                                                        <h5 className="fw-bold mb-0 text-dark">
                                                                            Upload Revisi Dokumen
                                                                        </h5>

                                                                        <small className="text-muted">
                                                                            Upload ulang dokumen yang telah direvisi
                                                                        </small>
                                                                    </div>
                                                                </div>

                                                                <Row className="gy-3">
                                                                    <Col xl={12}>
                                                                        <Form.Group>
                                                                            <Form.Label className="fw-semibold">
                                                                                Upload Dokumen Baru
                                                                            </Form.Label>

                                                                            <Form.Control
                                                                                type="file"
                                                                                className="rounded-3"
                                                                                onChange={(e) =>
                                                                                    handleFileChange(
                                                                                        index,
                                                                                        e.target.files[0]
                                                                                    )
                                                                                }
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>

                                                                    {/* <Col xl={6}>
                                                                        <Form.Group>
                                                                            <Form.Label className="fw-semibold">
                                                                                Nilai Dokumen
                                                                            </Form.Label>

                                                                            <Form.Control
                                                                                type="number"
                                                                                placeholder="Masukan nilai transaksi"
                                                                                className="rounded-3"
                                                                                onChange={(e) =>
                                                                                    handleInputChange(
                                                                                        index,
                                                                                        e.target.value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </Form.Group>
                                                                    </Col> */}
                                                                </Row>

                                                                <div className="mt-4 text-end">
                                                                    <Button
                                                                        variant="contained"
                                                                        className="btn btn-warning px-4 py-2"
                                                                        onClick={() =>
                                                                            updateDokumenDetailTransaksi(
                                                                                index,
                                                                                item
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="ri-upload-2-line me-2"></i>
                                                                        Submit Revisi
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                {/* ===================== STATUS SECTION ===================== */}
                                <div className="card border-0 shadow-sm rounded-4 mt-4">
                                    <div className="card-body p-4">

                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div>
                                                <h5 className="fw-bold mb-1">
                                                    Status Transaksi
                                                </h5>

                                                <small className="text-muted">
                                                    Status approval dan pembayaran transaksi
                                                </small>
                                            </div>

                                            <div>
                                                <i className="ri-shield-check-line fs-2 text-primary"></i>
                                            </div>
                                        </div>

                                        <Row className="gy-4">



                                            {/* ===================== STATUS SECTION ===================== */}

                                            <Row className="gy-4">

                                                {/* ===================== STATUS LAYAK BAYAR ===================== */}
                                                <Col xl={12}>
                                                    <div
                                                        className="position-relative overflow-hidden rounded-4 p-4 h-100 border-0"
                                                        style={{
                                                            background:
                                                                showData.layak_bayar == "Layak Bayar"
                                                                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                                                                    : showData.layak_bayar == "Tidak Layak Bayar"
                                                                        ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                                                                        : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                                            boxShadow:
                                                                "0 10px 30px rgba(0,0,0,0.12)",
                                                        }}
                                                    >

                                                        {/* Glow */}
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                width: "250px",
                                                                height: "250px",
                                                                borderRadius: "50%",
                                                                background: "rgba(255,255,255,0.08)",
                                                                top: "-120px",
                                                                right: "-80px",
                                                            }}
                                                        />

                                                        {/* Background Icon */}
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                right: "-10px",
                                                                bottom: "-20px",
                                                                fontSize: "120px",
                                                                opacity: 0.12,
                                                                color: "#fff",
                                                            }}
                                                        >
                                                            <i
                                                                className={
                                                                    showData.layak_bayar == "Layak Bayar"
                                                                        ? "ri-checkbox-circle-line"
                                                                        : showData.layak_bayar == "Tidak Layak Bayar"
                                                                            ? "ri-close-circle-line"
                                                                            : "ri-loader-4-line"
                                                                }
                                                            ></i>
                                                        </div>

                                                        <div className="position-relative">

                                                            {/* HEADER */}
                                                            <div className="d-flex align-items-start justify-content-between">

                                                                <div>
                                                                    <small className="text-white opacity-75 d-block mb-2">
                                                                        Status Layak Bayar
                                                                    </small>

                                                                    <h2 className="fw-bold text-white mb-2">
                                                                        {showData.layak_bayar ||
                                                                            (showData.status_approval == "Reject"
                                                                                ? "Tidak Layak Bayar"
                                                                                : "On Review")}
                                                                    </h2>

                                                                    <div
                                                                        className="rounded-pill px-3 py-2 d-inline-flex align-items-center"
                                                                        style={{
                                                                            background: "rgba(255,255,255,0.18)",
                                                                            backdropFilter: "blur(10px)",
                                                                            border: "1px solid rgba(255,255,255,0.2)",
                                                                        }}
                                                                    >
                                                                        <i className="ri-shield-check-line me-2 text-white"></i>

                                                                        <span className="text-white small fw-semibold">
                                                                            {showData.layak_bayar == "Layak Bayar"
                                                                                ? "Transaksi Siap Dibayar"
                                                                                : showData.layak_bayar == "Tidak Layak Bayar"
                                                                                    ? "Perlu Perbaikan"
                                                                                    : "Sedang Direview"}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* ICON */}
                                                                <div
                                                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                                                    style={{
                                                                        width: "75px",
                                                                        height: "75px",
                                                                        background: "rgba(255,255,255,0.15)",
                                                                        backdropFilter: "blur(12px)",
                                                                        border: "1px solid rgba(255,255,255,0.2)",
                                                                    }}
                                                                >
                                                                    <i
                                                                        className={`fs-1 text-white ${showData.layak_bayar == "Layak Bayar"
                                                                            ? "ri-checkbox-circle-fill"
                                                                            : showData.layak_bayar == "Tidak Layak Bayar"
                                                                                ? "ri-close-circle-fill"
                                                                                : "ri-loader-4-line"
                                                                            }`}
                                                                    ></i>
                                                                </div>
                                                            </div>

                                                            {/* FOOTER INFO */}
                                                            <div
                                                                className="mt-4 rounded-4 p-3"
                                                                style={{
                                                                    background: "rgba(255,255,255,0.12)",
                                                                    backdropFilter: "blur(12px)",
                                                                    border: "1px solid rgba(255,255,255,0.15)",
                                                                }}
                                                            >
                                                                <div className="d-flex align-items-center justify-content-between">

                                                                    <div>
                                                                        <small className="text-white opacity-75 d-block mb-1">
                                                                            Approval Status
                                                                        </small>

                                                                        <h5 className="fw-bold text-white mb-0">
                                                                            {showData.status_approval || "Waiting"}
                                                                        </h5>
                                                                    </div>

                                                                    <div
                                                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                                                        style={{
                                                                            width: "55px",
                                                                            height: "55px",
                                                                            background: "rgba(255,255,255,0.15)",
                                                                        }}
                                                                    >
                                                                        <i className="ri-git-pull-request-line text-white fs-3"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>


                                            </Row>
                                        </Row>
                                    </div>
                                </div>

                                <Col xl={12} className="mt-4">
                                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                                        {/* Header */}
                                        <div className="bg-primary text-white p-4">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <h5 className="mb-1 fw-bold">
                                                        Disposisi Approval
                                                    </h5>
                                                    <small className="opacity-75">
                                                        Status Persetujuan Transaksi
                                                    </small>
                                                </div>

                                                <div>
                                                    <i className="ri-git-merge-line fs-1"></i>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Timeline */}
                                        <div className="card-body p-4">

                                            {showData.pengajuanTransaksi?.length > 0 ? (
                                                showData.pengajuanTransaksi.map((item, index) => (

                                                    <div
                                                        key={index}
                                                        className="position-relative ps-5 pb-4"
                                                    >

                                                        {/* line */}
                                                        {index !==
                                                            showData.pengajuanTransaksi.length - 1 && (
                                                                <div
                                                                    style={{
                                                                        position: "absolute",
                                                                        left: "18px",
                                                                        top: "40px",
                                                                        width: "2px",
                                                                        height: "100%",
                                                                        background: "#dee2e6"
                                                                    }}
                                                                />
                                                            )}

                                                        {/* circle */}
                                                        <div
                                                            className={`position-absolute rounded-circle d-flex align-items-center justify-content-center
                            ${item.status_approver === "Approved"
                                                                    ? "bg-success"
                                                                    : item.status === "Reject"
                                                                        ? "bg-danger"
                                                                        : "bg-warning"
                                                                }`}
                                                            style={{
                                                                width: "38px",
                                                                height: "38px",
                                                                left: "0",
                                                                top: "0",
                                                                color: "white"
                                                            }}
                                                        >
                                                            <i
                                                                className={
                                                                    item.status_approver === "Approved"
                                                                        ? "ri-check-line"
                                                                        : item.status_approver === "Reject"
                                                                            ? "ri-close-line"
                                                                            : "ri-time-line"
                                                                }
                                                            />
                                                        </div>

                                                        {/* content */}
                                                        <div className="bg-light rounded-4 p-3">

                                                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                                                                <div>
                                                                    <h6 className="mb-1 fw-bold">
                                                                        {item.nama_persetujuan}
                                                                    </h6>

                                                                    <small className="text-muted">
                                                                        {item.jabatan_persetujuan}
                                                                    </small>
                                                                </div>

                                                                <span
                                                                    className={`badge px-3 py-2
                                    ${item.status_approver === "Approved"
                                                                            ? "bg-success"
                                                                            : item.status === "Reject"
                                                                                ? "bg-danger"
                                                                                : "bg-warning text-dark"
                                                                        }`}
                                                                >
                                                                    {item.status_approver}
                                                                </span>
                                                            </div>

                                                            {item.catatan_persetujuan && (
                                                                <div className="mt-3 p-3 rounded-3 bg-white border-start border-4 border-primary">
                                                                    <small className="text-muted d-block mb-1">
                                                                        Catatan
                                                                    </small>

                                                                    <span className="fst-italic">
                                                                        {item.catatan_persetujuan}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {item.tanggal_persetujuan && (
                                                                <div className="mt-2 text-end">
                                                                    <small className="text-muted">
                                                                        {item.tanggal_persetujuan}
                                                                    </small>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-5">
                                                    <i className="ri-file-list-3-line fs-1 text-muted"></i>

                                                    <h6 className="mt-3 text-muted">
                                                        Belum Ada Disposisi
                                                    </h6>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Col>


                                {/* <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Catatan :</label>
                                <textarea type="text" value={dataSubmit.catatan} className={`form-control`} id="keterangan" placeholder="Catatan" rows={3} onChange={(e) => setDataSubmit({ ...dataSubmit, catatan: e.target.value })} />
                            </Col> */}


                            </div>
                        </Col>

                    </Row>
                </Modal.Body>
                <Modal.Footer className="d-flex gap-2">


                    <Button variant='contained' type="button" className="btn btn-secondary"
                        data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default dynamic(() => Promise.resolve(DetailPengajuan), { ssr: false });
