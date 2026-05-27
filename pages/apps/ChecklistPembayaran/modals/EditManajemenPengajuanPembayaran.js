

import { Button, Divider } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
const Select = dynamic(() => import("react-select"), { ssr: false });
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";

const EditManajemenPengajuanPembayaran = ({ openModal, setOpenModal, loader, setLoader, reload, setReload }) => {
    const [jenisTransaksi, setJenisTransaksi] = useState([]);
    const [proyek, setProyek] = useState([]);
    const [kodeTransaksi, setKodeTransaksi] = useState();
    const [kategori, setKategori] = useState([]);
    const [vendor, setVendor] = useState([]);
    const [statusPengajuan, setStatusPengajuan] = useState([])
    const [dataSubmit, setDataSubmit] = useState({
        jenis_transaksi: "",
        kategori: "",
        nomor_invoice: "",
        vendor: "",
        catatan: "",
        proyek: "",
        tempo_pembayaran_after_verified: "",
        status_pengajuan:"",
        id_user_approver: []
    });
    const [dataKalkulate, setDataKalkulate] = useState({
        nilai_invoice: 0,
        pph: 0,
        ppn: 0,
        retensi: 0,
        kasbon: 0,
        invoice_yang_ditagih: 0,
        biaya_lainnya: 0
    })
    const [userApprover, setUserApprover] = useState([]);

    const [formTransaksi, setFormTransaksi] = useState([]);
    const getJenisTransaksi = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/jenis-transaksi/get-jenis-transaksi", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if (result.status == 200) {
                const dataJenisTransaksi = [];
                if (result.data.data?.length > 0) {

                    for (const datas of result.data.data) {
                        dataJenisTransaksi.push({
                            value: datas,
                            label: datas
                        })
                    }

                }
                setJenisTransaksi(dataJenisTransaksi);
                // setEmployee(dataEmployeeArr);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    const getFileTransaksi = async (id, nama) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/dokumen-file?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }, responseType: "blob"
            });
            const url = window.URL.createObjectURL(new Blob([result.data], { type: "application/pdf" }));
            Swal.fire({ title: "Dokumen Transaksi " + nama, html: `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`, width: "80%", showConfirmButton: false, showCloseButton: true });
        } catch (e) { Swal.fire("Error", "Gagal membuka dokumen", "error"); }
    };
    const getFormTransaksi = async (jenis) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/jenis-transaksi/get-nama-transaksi-by-jenis", {
                params: {
                    jenis_transaksi: jenis
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if (result.status == 200) {
                setKodeTransaksi(result.data?.data[0].kode_jenis);
                setFormTransaksi(result.data?.data);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    const HandleChangeSelectTransaksi = (e) => {
        setDataSubmit({ ...dataSubmit, jenis_transaksi: e.value })
        getFormTransaksi(e.value);
    }
    const handleFileChange = (index, file) => {
        const updated = [...formTransaksi];
        updated[index].file = file; // simpan file
        setFormTransaksi(updated);
    };
    const handleInputChange = (index, value) => {
        const updated = [...formTransaksi];
        updated[index].value = value;
        setFormTransaksi(updated);
    };
    const getUserApprover = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const res = await apiConfig.get(apiUrl + "/users/all/staff", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(res);
            if (res.status === 200) {
                const userArr = res.data.data.map(u => ({
                    value: u.id_user,
                    label: u.username
                }));
                setUserApprover(userArr);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getStatusPengajuan = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const res = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/get-master-status-pengajuan", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(res);
            if (res.status === 200) {
                const statusArr = res.data.data.map(u => ({
                    value: u,
                    label: u
                }));
                setStatusPengajuan(statusArr);
            }
        } catch (e) {
            console.log(e);
        }
    };
    const getKategori = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const res = await apiConfig.get(apiUrl + "/master/kategori", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(res);
            if (res.status === 200) {
                const kategoriArr = res.data.data.map(u => ({
                    value: u.nama_kategori,
                    label: u.nama_kategori
                }));
                setKategori(kategoriArr);
            }
        } catch (e) {
            console.log(e);
        }
    };
    const getVendor = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const res = await apiConfig.get(apiUrl + "/master/all-vendor", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(res);
            if (res.status === 200) {
                const vendorArr = res.data.data.map(u => ({
                    value: u.nama_perusahaan,
                    label: u.nama_perusahaan
                }));
                setVendor(vendorArr);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const updateTransaksi = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const fm = new FormData();
        fm.append("id_transaksi", dataSubmit.id_transaksi);
        fm.append("jenis_transaksi", dataSubmit.jenis_transaksi);
        fm.append("kode_transaksi", dataSubmit.kode_transaksi);
        fm.append("catatan", dataSubmit.catatan);
        fm.append("proyek", dataSubmit.proyek);
        fm.append("nilai_invoice", clearCurrency(dataKalkulate.nilai_invoice));
        fm.append("pph", clearCurrency(dataKalkulate.pph));
        fm.append("ppn", clearCurrency(dataKalkulate.ppn));
        fm.append("retensi", clearCurrency(dataKalkulate.retensi));
        fm.append("kasbon", clearCurrency(dataKalkulate.kasbon));
        fm.append("nilai_invoice_bersih", clearCurrency(dataKalkulate.invoice_yang_ditagih));
        fm.append("biaya_potongan_lainnya", clearCurrency(dataKalkulate.biaya_lainnya));
        fm.append("tempo_pembayaran_after_verified", dataSubmit.tempo_pembayaran_after_verified);
        fm.append("nomor_invoice", dataSubmit.nomor_invoice);
        fm.append("kategori", dataSubmit.kategori);
        fm.append("nama_vendor", dataSubmit.vendor);
        fm.append("tanggal_invoice", dataSubmit.tanggal_invoice);
        fm.append("no_po_kontrak", dataSubmit.no_po_kontrak ?? "-");
        fm.append("status_pengajuan", dataSubmit.status_pengajuan ?? "-");
        if(formTransaksi.length > 0){
            formTransaksi.forEach((item, index) => {
                if (item.file) {
                    fm.append('files', item.file);
                    fm.append('nama_transaksi', item.nama_transaksi); // optional
                    // fm.append('nilai', item.value)
                }
            });
        }
        
        // dataSubmit.id_user_approver.forEach((item, index) => {
        //     fm.append("approval", item.id_user);
        //     fm.append("urutan", item.urutan);
        // })
        // console.log(formTransaksi)
        try {
            const result = await apiConfig.post(apiUrl + "/ChecklistTransaksi/transaksi/update-transaksi", fm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if (result.status == 200) {
                setReload(prev => !prev);
                swalAlert(result.data.message, result.statusText, "success");

                setOpenModal({ ...openModal, open: false });
                // setFormTransaksi(result.data?.data);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
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
    const toCurrency = (amount) => {
        const number = Number(amount || 0);

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }
    const clearCurrency = (value = "") => {
        if (!value) return 0;

        return Number(
            value
                .toString()
                .replace(/[^0-9,-]+/g, "")
                .replace(/\./g, "")
                .replace(",", ".")
        ) || 0;
    };
    const getDaftarProyek = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek-dashboard", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }

            });
            // console.log(result)
            if (result.status == 200) {
                const ArrProyek = [];
                if (result.data.data.length > 0) {
                    for (const datas of result.data.data) {
                        ArrProyek.push({
                            value: datas.proyek?.nama_proyek,
                            label: datas.proyek?.nama_proyek + " (" + datas.proyek?.kode_proyek + ") "

                        })
                        // setProyek([...proyek, {label: datas.proyek?.nama_proyek+" ("+datas.proyek?.kode_proyek+") ", value: datas.proyek?.nama_proyek}])
                    }
                }
                setProyek(ArrProyek);

            }
            // console.log(result);
        } catch (error) {
            console.log("e = " + error);
        } finally {
            setLoader(false)
        }
    }

    const handleKalkulate = (field, value) => {

        const newData = {
            ...dataKalkulate,
            [field]: value
        };

        const invoiceYangDitagih =
            (Number(newData.nilai_invoice || 0) +
                Number(newData.ppn || 0)) -
            Number(newData.pph || 0) -
            Number(newData.retensi || 0) -
            Number(newData.kasbon || 0) -
            Number(newData.biaya_lainnya || 0);

        setDataKalkulate({
            ...newData,
            invoice_yang_ditagih: invoiceYangDitagih
        });
    };
    useEffect(() => {
        if (openModal.open) {
            getJenisTransaksi();
            getDaftarProyek();
            getUserApprover();
            getKategori();
            getStatusPengajuan();
            getVendor();
            // console.log(openModal)

            const data = openModal.data;

            setDataSubmit({
                id_transaksi: data.id_transaksi,
                jenis_transaksi: data.jenis_transaksi ?? "",
                kategori: data.kategori ?? "",
                nomor_invoice: data.nomor_invoice ?? "",
                kode_transaksi: data.kode_transaksi ?? "",
                vendor: data.nama_vendor ?? "",
                catatan: data.keterangan ?? "",
                proyek: data.proyek ?? "",
                tempo_pembayaran_after_verified:
                    data.tempo_pembayaran_after_verified ?? "",
                tanggal_invoice: data.tanggal_invoice ?? "",
                no_po_kontrak: data.no_po_kontrak ?? "",
                id_user_approver: data.id_user_approver ?? [],
                detail_transaksi: data.detailTransaksi,
                status_pengajuan: data.status_pengajuan
            });

            setDataKalkulate({
                nilai_invoice: data.nilai_invoice ?? 0,
                pph: data.pph ?? 0,
                ppn: data.ppn ?? 0,
                retensi: data.retensi ?? 0,
                kasbon: data.kasbon ?? 0,
                invoice_yang_ditagih:
                    data.nilai_invoice_bersih ?? 0,
                biaya_lainnya:
                    data.biaya_potongan_lainnya ?? 0
            });

            getFormTransaksi(data.jenis_transaksi);
        }

        // kalkulate();
    }, [openModal.open])
    return (
        <Modal size="xl" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Pengajuan Jenis Transaksi</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">

                            <Col xl={12}>
                                <div className="row gy-2 pb-3">
                                    <label htmlFor="nama-proyek" className="form-label ">Jenis Transaksi<span style={{ color: "red" }}>*</span> :</label>
                                    <Select name="state" className="basic-multi-select " options={jenisTransaksi} isSearchable value={jenisTransaksi.find(
                                        x => x.value === dataSubmit.jenis_transaksi
                                    )}
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Jenis Transaksi" onChange={HandleChangeSelectTransaksi}
                                    />
                                </div>
                            </Col>
                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Kode Jenis Transaksi</Form.Label>
                                    <Form.Control type="text" placeholder="Kode Jenis Transaksi" value={dataSubmit.kode_transaksi} disabled />
                                </Form.Group>
                            </Col>
                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Kategori <span style={{ color: "red" }}>*</span></Form.Label>
                                    {/* <Form.Control type="text" value={dataSubmit.proyek} onChange={(e) => setDataSubmit({ ...dataSubmit, proyek: e.target.value })}/> */}
                                    <Select name="state" className="basic-multi-select " options={kategori} isSearchable value={kategori.find(
                                        x => x.value === dataSubmit.kategori
                                    )}
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Kategori" onChange={(e) => setDataSubmit({ ...dataSubmit, kategori: e.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Nama Vendor <span style={{ color: "red" }}>*</span></Form.Label>
                                    {/* <Form.Control type="text" value={dataSubmit.proyek} onChange={(e) => setDataSubmit({ ...dataSubmit, proyek: e.target.value })}/> */}
                                    <Select name="state" className="basic-multi-select " options={vendor} isSearchable value={vendor.find(
                                        x => x.value === dataSubmit.vendor
                                    )}
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Vendor" onChange={(e) => setDataSubmit({ ...dataSubmit, vendor: e.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Proyek <span style={{ color: "red" }}>*</span></Form.Label>
                                    {/* <Form.Control type="text" value={dataSubmit.proyek} onChange={(e) => setDataSubmit({ ...dataSubmit, proyek: e.target.value })}/> */}
                                    <Select name="state" className="basic-multi-select " options={proyek} isSearchable value={proyek.find(
                                        x => x.value === dataSubmit.proyek
                                    )}
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Proyek" onChange={(e) => setDataSubmit({ ...dataSubmit, proyek: e.value })}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>No PO / Kontrak</Form.Label>
                                    <Form.Control type="text" placeholder="No PO / Kontrak" value={dataSubmit.no_po_kontrak} onChange={(e) => setDataSubmit({ ...dataSubmit, no_po_kontrak: e.target.value })} />
                                </Form.Group>
                            </Col>

                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>SLA Pembayaran (Tempo) <span style={{ color: "red" }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Hari" value={dataSubmit.tempo_pembayaran_after_verified} onChange={(e) => setDataSubmit({ ...dataSubmit, tempo_pembayaran_after_verified: e.target.value })} />
                                </Form.Group>
                            </Col>

                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Tanggal Invoice <span style={{ color: "red" }}>*</span> :</label>
                                {/* <input type="text" className={`form-control`} id="tanggal_awal_kontrak" placeholder="Tanggal Awal Kontrak" /> */}
                                <Flatpickr
                                    className="form-control"
                                    value={dataSubmit.tanggal_invoice ?? ""}
                                    options={{
                                        dateFormat: "Y-m-d",
                                        enableTime: true,
                                        time_24hr: true,
                                    }}
                                    onChange={(val, valStr) => setDataSubmit({ ...dataSubmit, tanggal_invoice: valStr })}
                                    // onChange={(val,valStr) => {
                                    // 	console.log(valStr)
                                    // }}
                                    placeholder="Tanggal Penerimaan"
                                />
                            </Col>

                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Nomor Invoice <span style={{ color: "red" }}>*</span> : </Form.Label>
                                    <Form.Control type="text" placeholder="Nomor Invoice" value={dataSubmit.nomor_invoice} onChange={(e) => setDataSubmit({ ...dataSubmit, nomor_invoice: e.target.value })} />
                                </Form.Group>
                            </Col>

                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Nilai Invoice <span style={{ color: "red" }}>*</span> : </Form.Label>
                                    <Form.Control type="text" placeholder="Nilai Invoice " value={toCurrency(dataKalkulate.nilai_invoice)} onChange={(e) => handleKalkulate("nilai_invoice", clearCurrency(e.target.value))} />
                                </Form.Group>

                            </Col>
                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>PPN : </Form.Label>
                                    <Form.Control type="text" placeholder="Nilai PPN" value={toCurrency(dataKalkulate.ppn)} onChange={(e) => handleKalkulate("ppn", clearCurrency(e.target.value))} />
                                </Form.Group>
                            </Col>

                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>PPH : </Form.Label>
                                    <Form.Control type="text" placeholder="Nilai PPH" value={toCurrency(dataKalkulate.pph)} onChange={(e) => handleKalkulate("pph", clearCurrency(e.target.value))} />
                                </Form.Group>
                            </Col>

                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Retensi : </Form.Label>
                                    <Form.Control type="text" placeholder="Retensi" value={toCurrency(dataKalkulate.retensi)} onChange={(e) => handleKalkulate("retensi", clearCurrency(e.target.value))} />
                                </Form.Group>
                            </Col>

                            <Col xl={6} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Kasbon : </Form.Label>
                                    <Form.Control type="text" placeholder="Kasbon" value={toCurrency(dataKalkulate.kasbon)} onChange={(e) => handleKalkulate("kasbon", clearCurrency(e.target.value))} />
                                </Form.Group>
                            </Col>

                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Biaya Potongan Lainnya : </Form.Label>
                                    <Form.Control type="text" placeholder="Kasbon" value={toCurrency(dataKalkulate.biaya_lainnya)} onChange={(e) => handleKalkulate("biaya_lainnya", clearCurrency(e.target.value))} />
                                </Form.Group>
                            </Col>

                            <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Nilai Yang Di Bayarkan : </Form.Label>
                                    <Form.Control type="text" placeholder="Nilai yang di tagihkan" value={toCurrency(dataKalkulate.invoice_yang_ditagih)} disabled />
                                </Form.Group>
                                <div className="mt-4 p-3 rounded-3 bg-danger-subtle border-start border-4 border-danger">
                                    <small className="text-danger fw-semibold d-block mb-1">
                                        Catatan
                                    </small>

                                    <span
                                        className="text-danger fst-italic"
                                        style={{ overflowWrap: "break-word" }}
                                    >
                                        Nilai NETTO
                                    </span>
                                </div>
                            </Col>
                            <Divider className="mt-3 mb-3" />
                            {dataSubmit.detail_transaksi &&
                                dataSubmit.detail_transaksi.map((item, index) => (
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
                            {formTransaksi && formTransaksi.map((item, index) => (
                                <Col xl={6} key={index}>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>{item.nama_transaksi} <span style={{ color: "red" }}>*</span></Form.Label>
                                        <Form.Control type="file" onChange={(e) =>
                                            handleFileChange(index, e.target.files[0])
                                        } />
                                        {/* <Form.Control
                                            type="number"
                                            placeholder="Masukan Nilai"
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            className="mb-2 mt-2"
                                        /> */}
                                    </Form.Group>
                                </Col>
                            ))}


                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Catatan :</label>
                                <textarea type="text" value={dataSubmit.catatan} className={`form-control`} id="keterangan" placeholder="Catatan" rows={3} onChange={(e) => setDataSubmit({ ...dataSubmit, catatan: e.target.value })} />
                            </Col>
                             <Col xl={12} >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Status Pengajuan <span style={{ color: "red" }}>*</span></Form.Label>
                                    {/* <Form.Control type="text" value={dataSubmit.proyek} onChange={(e) => setDataSubmit({ ...dataSubmit, proyek: e.target.value })}/> */}
                                    <Select name="state" className="basic-multi-select " options={statusPengajuan} isSearchable value={statusPengajuan.find(
                                        x => x.value === dataSubmit.status_pengajuan
                                    )}
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Status Pengajuan" onChange={(e) => setDataSubmit({ ...dataSubmit, status_pengajuan: e.value })}
                                    />
                                </Form.Group>
                            </Col>



                        </div>
                    </Col>



                </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex gap-2">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={updateTransaksi}>Edit</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(EditManajemenPengajuanPembayaran), { ssr: false });