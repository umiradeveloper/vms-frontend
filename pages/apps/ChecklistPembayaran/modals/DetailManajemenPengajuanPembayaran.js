
import { Button, Divider } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
const Select = dynamic(() => import("react-select"), { ssr: false });
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";



const DetailManajemenPengajuanPembayaran = ({ openModal, setOpenModal, loader, setLoader }) => {
    const [idTransaksi, setIdTransaksi] = useState("");
    const [reload, setReload] = useState(false);
    const [showData, setShowData] = useState({
        jenis_transaksi: "",
        proyek: "",
        status_approval: "",
        layak_bayar: "",
        bukti_bayar: "",
        detail_transaksi: []
    })
    const [updatePengajuanApproval, setUpdatePengajuanApproval] = useState({
        status_approval: "",
        layak_bayar: "",
        upload_bukti_bayar: null,
        nilai_bayar: 0
    })
    const [dataApproval, setDataApproval] = useState([]);
    const [layakBayar, setLayakBayar] = useState([]);
    const HandleVerified = async (id) => {
        const resultConfirm = await AlertConfirm("Apakah anda yakin ingin memverifikasi data ini ? ", "warning", "Verified", false, "Data berhasil di confirm");

        if (resultConfirm.status) {
            // console.log("Isi textarea:", result.value);
            setLoader(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            try {
                const resultApi = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/update-detail-transaksi?id=" + id + "&status_verified=verified", {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (resultApi.status == 200) {
                    setReload(prev => !prev);
                    swalAlert(result.data.message, result.statusText, "success");
                }
            } catch (error) {
                console.log(error);
            } finally { setLoader(false) }
        }
    }
    const getFileTransaksi = async (id, nama) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/dokumen-file?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                }, responseType: "blob"
            });
            const url = window.URL.createObjectURL(new Blob([result.data], { type: "application/pdf" }));
            Swal.fire({ title: "Dokumen Transaksi " + nama, html: `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`, width: "80%", showConfirmButton: false, showCloseButton: true });
        } catch (e) { Swal.fire("Error", "Gagal membuka dokumen", "error"); }
    };
    const getDokumenTransaksiMerge = async (id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/dokumen-transaksi-merge", {
                params: {
                    id: id
                },
                headers: {
                    "Content-Type": "application/json",
                }, responseType: "blob"
            });
            const url = window.URL.createObjectURL(new Blob([result.data], { type: "application/pdf" }));
            // window.open(url);
            Swal.fire({ title: "Dokumen Transaksi Merge ", html: `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`, width: "80%", showConfirmButton: false, showCloseButton: true });
           
        } catch (e) { Swal.fire("Error", "Gagal membuka dokumen", "error"); }
    };
    const getDokumenBuktiBayar = async (dataDokumen = []) => {

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {

            let htmlDokumen = "";

            for (const item of dataDokumen) {

                const result = await apiConfig.get(
                    apiUrl +
                    "/ChecklistTransaksi/transaksi/dokumen-bukti-bayar?id=" +
                    item.id_checklist_bukti_bayar,
                    {
                        headers: {
                            "Content-Type": "application/json",
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
    const HandleNotVerified = async (id) => {
        const resultConfirm = await AlertConfirm("Apakah anda yakin ingin tidak memverifikasi data ini ? ", "warning", "Not Verified", true, "Data berhasil Confirm");

        if (resultConfirm.status) {
            // console.log("Isi textarea:", result.value);
            setLoader(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            try {
                const resultApi = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/update-detail-transaksi?id=" + id + "&catatan=" + resultConfirm.value + "&status_verified=not_verified", {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                // console.log("trx: " + resultApi)
                if (resultApi.status == 200) {
                    setReload(prev => !prev);
                    swalAlert(result.data.message, result.statusText, "success");
                    
                }
            } catch (error) {
                console.log(error);
            } finally { setLoader(false) }
        }
    }
    const getTransaksiById = async (id) => {

        setLoader(true);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {

            const resultApi = await apiConfig.get(
                apiUrl +
                "/ChecklistTransaksi/transaksi/get-transaksi-by-id?id=" +
                id,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            // console.log(resultApi)
            if (resultApi.status === 200) {

                const datas = resultApi.data.data;

                /* =========================
                   TOTAL PEMBAYARAN
                ========================= */
                let bayar = 0;

                for (const dataBayar of datas.detailPayment) {
                    bayar += Number(dataBayar.nominal_bayar ?? 0);
                }

                /* =========================
                   APPROVAL + DIGITAL SIGN
                ========================= */
                let approvalProyek = [];

                if (datas.detailPersetujuanProyek?.length > 0) {

                    approvalProyek = await Promise.all(

                        datas.detailPersetujuanProyek.map(
                            async (approval) => {

                                const imgQr =
                                    await digitalSign(
                                        approval.id_persetujuan
                                    );

                                return {
                                    id_persetujuan:
                                        approval.id_persetujuan ?? "-",

                                    nama_persetujuan:
                                        approval.nama_persetujuan ?? "-",

                                    jabatan_persetujuan:
                                        approval.jabatan_persetujuan ?? "-",

                                    tanggal_persetujuan:
                                        approval.tanggal_persetujuan ?? "-",

                                    status_approver:
                                        approval.status_approver ?? "-",

                                    catatan_persetujuan:
                                        approval.catatan_persetujuan ?? "-",

                                    qrCode:
                                        imgQr.status
                                            ? imgQr.image
                                            : null,
                                };
                            }
                        )
                    );
                }

                /* =========================
                   SET SHOW DATA
                ========================= */
                setShowData({
                    id_transaksi: 
                        datas.id_transaksi,
                    jenis_transaksi:
                        datas.jenis_transaksi,

                    proyek:
                        datas.proyek,

                    bukti_bayar:
                        datas.upload_bukti_pembayaran,

                    layak_bayar:
                        datas.layak_bayar,

                    status_approval:
                        datas.status_pengajuan,

                    nama_vendor:
                        datas.nama_vendor ?? "-",

                    kategori:
                        datas.kategori ?? "-",

                    nomor_invoice:
                        datas.nomor_invoice ?? "-",

                    nilai_invoice:
                        datas.nilai_invoice,

                    pph:
                        datas.pph,

                    ppn:
                        datas.ppn,

                    retensi:
                        datas.retensi,

                    catatan_verified:
                        datas.catatan_verified,

                    approvedBy:
                        datas.approvedBy,

                    kasbon:
                        datas.kasbon,

                    nilai_invoice_bersih:
                        datas.nilai_invoice_bersih,

                    biaya_potongan_lainnya:
                        datas.biaya_potongan_lainnya,

                    nilai_yang_terbayar:
                        bayar,

                    nilai_sisa:
                        (datas.nilai_invoice_bersih ?? 0) - bayar,

                    detail_transaksi:
                        datas.detailTransaksi,

                    pengajuanTransaksi:
                        approvalProyek,

                    detailPayment:
                        datas.detailPayment,

                    transaksi_via:
                        datas.transaksi_via,
                    
                    tanggal_invoice: 
                        datas.tanggal_invoice,
                    
                    no_po_kontrak: 
                        datas.no_po_kontrak
                });

                setUpdatePengajuanApproval({
                    layak_bayar:
                        datas.layak_bayar,

                    status_approval:
                        datas.status_pengajuan,
                });
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoader(false);
        }
    };


    /* =========================================
       DIGITAL SIGN QR CODE
    ========================================= */
    const digitalSign = async (text) => {

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {

            const resultApi = await apiConfig.get(
                apiUrl +
                "/ChecklistTransaksi/transaksi/Proyek/digital-sign",
                {
                    params: {
                        text: text
                    },

                    responseType: "blob",

                   
                }
            );

            /* CONVERT BLOB TO IMAGE URL */
            const imageUrl =
                window.URL.createObjectURL(
                    new Blob([resultApi.data], {
                        type: "image/png"
                    })
                );

            return {
                status: true,
                image: imageUrl,
                message: null
            };

        } catch (error) {

            return {
                status: false,
                image: null,
                message: error
            };
        }
    };
    const HandlePayment = async () => {
        const result = await Swal.fire({
            title: 'Payment',
            target: document.body,
            html: `
                
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3 text-start">
                            <label for="upload_bukti_bayar" class="form-label">
                                Upload Bukti Bayar
                            </label>
                            <input 
                                type="file" 
                                id="upload_bukti_bayar"
                                class="form-control"
                            >
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3 text-start">
                            <label for="nilai_yang_dibayar" class="form-label">
                                Nilai Yang Di Bayar
                            </label>
                            <input 
                                type="text" 
                                id="nilai_yang_di_bayar"
                                class="form-control"
                            >
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3 text-start">
                            <label for="upload_bukti_bayar" class="form-label">
                                Catatan Payment
                            </label>
                            <textarea 
                                row="3"
                                id="catatan_payment"
                                class="form-control"
                                placeholder="Catatan Payment"
                            ></textarea>
                        </div>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Pay',
            cancelButtonText: 'Close',
            didOpen: () => {
                const input = document.getElementById("nilai_yang_di_bayar");

                input.addEventListener("input", function (e) {

                    // ambil angka saja
                    let value = e.target.value.replace(/\D/g, "");

                    // format rupiah
                    value = new Intl.NumberFormat("id-ID").format(value);

                    e.target.value = value;
                });
            },
            preConfirm: () => {
                const upload = document.getElementById('upload_bukti_bayar').files[0];
                const catatan = document.getElementById('catatan_payment').value;
                const nilai_yang_di_bayar =
                    document.getElementById('nilai_yang_di_bayar')
                        .value
                        .replace(/\./g, "");

                if (!upload) {
                    Swal.showValidationMessage('Upload Bukti Bayar');
                    return false;
                }
                if (!nilai_yang_di_bayar) {
                    Swal.showValidationMessage('Nilai yang di bayar');
                    return false;
                }

                return { upload, catatan, nilai_yang_di_bayar };
            }
        });

        if (result.isConfirmed) {
            setLoader(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const fm = new FormData();
            fm.append("status_approval", "Payment");
            fm.append("layak_bayar", "Layak Bayar");
            fm.append("upload_bukti_bayar", result.value.upload);
            fm.append("nilai_bayar", result.value.nilai_yang_di_bayar);
            try {
                const resultApi = await apiConfig.post(apiUrl + "/ChecklistTransaksi/transaksi/update-status-pengajuan?id=" + idTransaksi + "&catatan_payment=" + result.value.catatan, fm, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                // console.log(resultApi);
                if (resultApi.status == 200) {
                    setReload(prev => !prev);
                    swalAlert(resultApi.data.message, resultApi.statusText, "success");
                    setOpenModal({ ...openModal, open: false });

                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false)
            }
        }
    }
    const AlertConfirm = async (message, icon, confirmButtonName, textarea = false, messageDeleted = "Your file has been deleted.") => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger me-2"
            },
            buttonsStyling: false,

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
            objSwall.inputValidator = (value) => {
                if (!value) {
                    return "Catatan wajib diisi!";
                }
            };
            objSwall.didOpen = () => {
                Swal.getInput().focus();
            };
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
    const SubmitReject = async () => {
        const resultConfirm = await AlertConfirm("Apakah anda yakin ingin reject data ini ? ", "warning", "Reject", true, "Data berhasil Confirm");
        if (resultConfirm.status) {
            setLoader(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const fm = new FormData();
            fm.append("status_approval", "Reject");
            // fm.append("layak_bayar", updatePengajuanApproval.layak_bayar);
            // fm.append("upload_bukti_bayar", updatePengajuanApproval.upload_bukti_bayar);
            try {
                const resultApi = await apiConfig.post(apiUrl + "/ChecklistTransaksi/transaksi/update-status-pengajuan?id=" + idTransaksi + "&catatan_verified=" + resultConfirm.value, fm, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                // console.log(resultApi);
                if (resultApi.status == 200) {
                    setReload(prev => !prev);
                    swalAlert(resultApi.data.message, resultApi.statusText, "success");
                    setOpenModal({ ...openModal, open: false });

                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false)
            }
        }

    }

    const toCurrency = (amount) => {
        const hasil = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(amount);
        return hasil
    }
    useEffect(() => {
        if (openModal.open) {
            // console.log(openModal);
            const datas = openModal.data;
            setIdTransaksi(datas.id_transaksi);
            getTransaksiById(datas.id_transaksi);

        }
    }, [openModal.open, reload])
    return (
        <Modal size="xl" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }} enforceFocus={false}>
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
                            {showData.detail_transaksi &&
                                showData.detail_transaksi.map((item, index) => (
                                    <Col xl={12} key={index} className="mb-4">
                                        <div
                                            className="card border-0 rounded-4 overflow-hidden"
                                            style={{
                                                background: "linear-gradient(145deg, #ffffff, #f8fbff)",
                                                boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
                                            }}
                                        >
                                            {/* Top Accent */}
                                            <div
                                                style={{
                                                    height: "6px",
                                                    background:
                                                        item.checklist == 1
                                                            ? "linear-gradient(90deg,#16a34a,#22c55e)"
                                                            : item.checklist == 2
                                                                ? "linear-gradient(90deg,#dc2626,#ef4444)"
                                                                : "linear-gradient(90deg,#2563eb,#3b82f6)"
                                                }}
                                            />

                                            <div className="card-body p-4">

                                                {/* HEADER */}
                                                <Row className="align-items-center gy-3">

                                                    {/* LEFT */}
                                                    <Col xl={7}>
                                                        <div className="d-flex align-items-start gap-3">

                                                            <div
                                                                className="rounded-circle d-flex align-items-center justify-content-center"
                                                                style={{
                                                                    width: "55px",
                                                                    height: "55px",
                                                                    background:
                                                                        item.checklist == 1
                                                                            ? "rgba(34,197,94,0.12)"
                                                                            : item.checklist == 2
                                                                                ? "rgba(239,68,68,0.12)"
                                                                                : "rgba(59,130,246,0.12)"
                                                                }}
                                                            >
                                                                <i
                                                                    className={`fs-3 ${item.checklist == 1
                                                                        ? "ri-checkbox-circle-fill text-success"
                                                                        : item.checklist == 2
                                                                            ? "ri-close-circle-fill text-danger"
                                                                            : "ri-time-line text-primary"
                                                                        }`}
                                                                />
                                                            </div>

                                                            <div>
                                                                <h5 className="fw-bold mb-1 text-dark">
                                                                    {item.pertanyaan}
                                                                </h5>

                                                                <div className="d-flex align-items-center gap-2 flex-wrap">

                                                                    <span className="text-muted small">
                                                                        Dokumen Transaksi
                                                                    </span>

                                                                    <span className="text-secondary">
                                                                        •
                                                                    </span>

                                                                    <span
                                                                        className={`badge rounded-pill px-3 py-2 ${item.checklist == 1
                                                                            ? "bg-success-subtle text-success"
                                                                            : item.checklist == 2
                                                                                ? "bg-danger-subtle text-danger"
                                                                                : "bg-primary-subtle text-primary"
                                                                            }`}
                                                                    >
                                                                        {item.checklist == 1
                                                                            ? "Verified"
                                                                            : item.checklist == 2
                                                                                ? "Not Verified"
                                                                                : "On Review"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    {/* RIGHT ACTION */}
                                                    <Col xl={5}>
                                                        <div className="d-flex justify-content-xl-end gap-2 flex-wrap">

                                                            <Button
                                                                variant="contained"
                                                                className="btn btn-primary px-4 rounded-3"
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

                                                            {!item.checklist && (
                                                                <>
                                                                    <Button
                                                                        variant="contained"
                                                                        className="btn btn-success rounded-3"
                                                                        onClick={() =>
                                                                            HandleVerified(
                                                                                item.id_detail_transaksi
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="ri-check-line me-1"></i>
                                                                        Verify
                                                                    </Button>

                                                                    <Button
                                                                        variant="contained"
                                                                        className="btn btn-danger rounded-3"
                                                                        onClick={() =>
                                                                            HandleNotVerified(
                                                                                item.id_detail_transaksi
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="ri-close-line me-1"></i>
                                                                        Reject
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </Col>
                                                </Row>

                                                {/* NILAI */}


                                                {/* CATATAN */}
                                                {item.catatan && (
                                                    <div
                                                        className="mt-4 p-4 rounded-4"
                                                        style={{
                                                            background: "rgba(239,68,68,0.08)",
                                                            border: "1px solid rgba(239,68,68,0.2)"
                                                        }}
                                                    >
                                                        <div className="d-flex align-items-start gap-3">

                                                            <div>
                                                                <i className="ri-error-warning-fill text-danger fs-4"></i>
                                                            </div>

                                                            <div>
                                                                <h6 className="text-danger fw-bold mb-1">
                                                                    Catatan Reviewer
                                                                </h6>

                                                                <span
                                                                    className="text-danger"
                                                                    style={{
                                                                        overflowWrap: "break-word",
                                                                        lineHeight: "1.7"
                                                                    }}
                                                                >
                                                                    {item.catatan}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            <Divider className="mt-3 mb-3" />
                            <div className="card border-0 shadow-sm rounded-4 mt-4">
                                <div className="card-body p-4">


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
                                                            className="ri-checkbox-circle-line"
                                                        ></i>
                                                    </div>

                                                    <div className="position-relative">

                                                        {/* HEADER */}
                                                        <div className="d-flex align-items-start justify-content-between">

                                                            <div>
                                                                <small className="text-white opacity-75 d-block mb-2">
                                                                    Dokumen Transaksi Merge
                                                                </small>

                                                               
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
                                                                            onClick={() => getDokumenTransaksiMerge(showData.id_transaksi)}
                                                                        >
                                                                            <i className="ri-file-list-3-line me-2"></i>
                                                                            Detail Dokumen Merge
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
                                                                    className={`fs-1 text-white ri-checkbox-circle-fill`}
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

                                    {/* HEADER */}
                                    <div
                                        className="text-white p-4"
                                        style={{
                                            background:
                                                "linear-gradient(135deg,#0f172a 0%,#334155 100%)",
                                        }}
                                    >
                                        <div className="d-flex align-items-center justify-content-between">

                                            <div>
                                                <h5 className="mb-1 fw-bold">
                                                    Disposisi Approval Head Office
                                                </h5>

                                                <small className="opacity-75">
                                                    Persetujuan Finance
                                                </small>
                                            </div>

                                            <div>
                                                <i className="ri-team-line fs-1"></i>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BODY */}
                                    <div className="card-body p-4">

                                        <div
                                            className="rounded-4 p-4"
                                            style={{
                                                background:
                                                    "linear-gradient(145deg,#ffffff 0%,#f8fafc 100%)",
                                                border: "1px solid #e2e8f0",
                                            }}
                                        >

                                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                                                {/* LEFT */}
                                                <div>

                                                    <div className="d-flex align-items-center gap-3">

                                                        <div
                                                            className="rounded-circle d-flex align-items-center justify-content-center"
                                                            style={{
                                                                width: "65px",
                                                                height: "65px",
                                                                background:
                                                                    "linear-gradient(135deg,#0ea5e9 0%,#2563eb 100%)",
                                                                color: "#fff",
                                                            }}
                                                        >
                                                            <i className="ri-file-check-line fs-2"></i>
                                                        </div>

                                                        <div>
                                                            <h5 className="fw-bold mb-1">
                                                                {showData.approvedBy?.nama && (
                                                                    <span>{showData.approvedBy.nama}</span>
                                                                )}
                                                            </h5>

                                                            <small className="text-muted">
                                                                Approval Verifikasi Dokumen
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* RIGHT */}
                                                <div className="text-end">

                                                    <span className="badge bg-success rounded-pill px-4 py-3 fs-6">
                                                        <i className="ri-checkbox-circle-fill me-2"></i>
                                                        Approve
                                                    </span>

                                                    <div className="mt-2 text-muted small">
                                                        22 Mei 2026 • 10:30 WIB
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CATATAN */}
                                            <div
                                                className="mt-4 rounded-4 p-3"
                                                style={{
                                                    background: "#fff",
                                                    border: "1px solid #e2e8f0",
                                                    borderLeft: "4px solid #0ea5e9",
                                                }}
                                            >
                                                <small className="text-muted d-block mb-2">
                                                    Catatan Verified
                                                </small>

                                                <div className="text-dark">
                                                    {showData.catatan_verified ?? "-"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Col>


                            <Col xl={12} className="mt-4">
                                <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                                    {/* Header */}
                                    <div className="bg-primary text-white p-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <h5 className="mb-1 fw-bold">
                                                    Disposisi Approval Proyek
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
                                        {showData.transaksi_via == "Proyek" && (
                                            showData.pengajuanTransaksi?.length > 0 ? (
                                                showData.pengajuanTransaksi.map((item, index) => (

                                                    <div
                                                        key={index}
                                                        className="position-relative ps-5 pb-4"
                                                    >

                                                        {/* TIMELINE LINE */}
                                                        {index !== showData.pengajuanTransaksi.length - 1 && (
                                                            <div
                                                                style={{
                                                                    position: "absolute",
                                                                    left: "34px",
                                                                    top: "90px",
                                                                    width: "3px",
                                                                    height: "100%",
                                                                    background:
                                                                        "linear-gradient(to bottom, #cbd5e1 0%, #e2e8f0 100%)",
                                                                    borderRadius: "999px",
                                                                }}
                                                            />
                                                        )}

                                                        {/* QR IMAGE */}
                                                        <div
                                                            className="position-absolute"
                                                            style={{
                                                                left: "0",
                                                                top: "0",
                                                                zIndex: 2,
                                                            }}
                                                        >
                                                            <div
                                                                className="rounded-4 overflow-hidden shadow-sm border border-3"
                                                                style={{
                                                                    width: "70px",
                                                                    height: "70px",
                                                                    background: "#fff",
                                                                    borderColor:
                                                                        item.status_approver === "Approve" || item.status_approver === "Pengajuan"
                                                                            ? "#10b981"
                                                                            : item.status_approver === "Reject"
                                                                                ? "#ef4444"
                                                                                : "#f59e0b",
                                                                }}
                                                            >

                                                                {/* QR IMAGE */}
                                                                <img
                                                                    src={
                                                                        item.qrCode ||
                                                                        "/assets/images/qrcode-default.png"
                                                                    }
                                                                    alt="QR Approval"
                                                                    className="w-100 h-100"
                                                                    style={{
                                                                        objectFit: "cover",
                                                                        padding: "4px",
                                                                        background: "#fff",
                                                                    }}
                                                                />
                                                            </div>

                                                            {/* STATUS BADGE */}
                                                            <div
                                                                className={`position-absolute rounded-circle d-flex align-items-center justify-content-center
            ${item.status_approver === "Approve" || item.status_approver === "Pengajuan"
                                                                        ? "bg-success"
                                                                        : item.status_approver === "Reject"
                                                                            ? "bg-danger"
                                                                            : "bg-warning"
                                                                    }`}
                                                                style={{
                                                                    width: "24px",
                                                                    height: "24px",
                                                                    right: "-8px",
                                                                    bottom: "-8px",
                                                                    color: "#fff",
                                                                    border: "2px solid #fff",
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                <i
                                                                    className={
                                                                        item.status_approver === "Approve" || item.status_approver === "Pengajuan"
                                                                            ? "ri-check-line"
                                                                            : item.status_approver === "Reject"
                                                                                ? "ri-close-line"
                                                                                : "ri-time-line"
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* CONTENT */}
                                                        <div
                                                            className="rounded-4 p-4 ms-5"
                                                            style={{
                                                                background:
                                                                    "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                                                                border: "1px solid #e2e8f0",
                                                                boxShadow: "0 6px 20px rgba(15,23,42,0.05)",
                                                            }}
                                                        >

                                                            {/* HEADER */}
                                                            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

                                                                <div>
                                                                    <h5 className="fw-bold mb-1 text-dark">
                                                                        {item.nama_persetujuan}
                                                                    </h5>

                                                                    <div className="d-flex align-items-center gap-2">

                                                                        <span
                                                                            className="rounded-pill px-3 py-1"
                                                                            style={{
                                                                                background: "#eef2ff",
                                                                                color: "#4338ca",
                                                                                fontSize: "12px",
                                                                                fontWeight: "600",
                                                                            }}
                                                                        >
                                                                            <i className="ri-briefcase-4-line me-1"></i>
                                                                            {item.jabatan_persetujuan}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* STATUS */}
                                                                <span
                                                                    className={`badge rounded-pill px-4 py-2 fs-6
                ${item.status_approver === "Approve" || item.status_approver === "Pengajuan"
                                                                            ? "bg-success"
                                                                            : item.status_approver === "Reject"
                                                                                ? "bg-danger"
                                                                                : "bg-warning text-dark"
                                                                        }`}
                                                                >
                                                                    <i
                                                                        className={`me-1
                    ${item.status_approver === "Approve" || item.status_approver === "Pengajuan"
                                                                                ? "ri-checkbox-circle-fill"
                                                                                : item.status_approver === "Reject"
                                                                                    ? "ri-close-circle-fill"
                                                                                    : "ri-loader-4-line"
                                                                            }`}
                                                                    ></i>

                                                                    {item.status_approver}
                                                                </span>
                                                            </div>

                                                            {/* CATATAN */}
                                                            {item.catatan_persetujuan && (
                                                                <div
                                                                    className="mt-4 rounded-4 p-3"
                                                                    style={{
                                                                        background: "#fff",
                                                                        border: "1px solid #e2e8f0",
                                                                        borderLeft: "4px solid #6366f1",
                                                                    }}
                                                                >

                                                                    <small className="text-muted d-block mb-2">
                                                                        Catatan Approval
                                                                    </small>

                                                                    <div
                                                                        className="text-dark"
                                                                        style={{
                                                                            lineHeight: "1.7",
                                                                        }}
                                                                    >
                                                                        {item.catatan_persetujuan}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* FOOTER */}
                                                            <div className="mt-4 d-flex justify-content-between align-items-center flex-wrap gap-3">

                                                                {/* DATE */}
                                                                <div className="d-flex align-items-center text-muted">
                                                                    <i className="ri-calendar-2-line me-2"></i>

                                                                    <small>
                                                                        {item.tanggal_persetujuan || "-"}
                                                                    </small>
                                                                </div>

                                                                {/* QR ACTION */}
                                                                <Button
                                                                    variant="contained"
                                                                    className="btn rounded-pill px-4 py-2 border-0"
                                                                    style={{
                                                                        background:
                                                                            "linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)",
                                                                        color: "#fff",
                                                                        boxShadow: "0 6px 18px rgba(79,70,229,0.25)",
                                                                    }}
                                                                    onClick={() =>
                                                                        window.open(item.qrCode, "_blank")
                                                                    }
                                                                >
                                                                    <i className="ri-qr-code-line me-2"></i>
                                                                    Lihat QR Approval
                                                                </Button>
                                                            </div>
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
                                            )
                                        )}

                                    </div>
                                </div>
                            </Col>


                        </div>
                    </Col>

                </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between align-items-center">
                

                <Button
                    variant="contained"
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setOpenModal({ ...openModal, open: false })}
                >
                    Close
                </Button>


            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(DetailManajemenPengajuanPembayaran), { ssr: false });