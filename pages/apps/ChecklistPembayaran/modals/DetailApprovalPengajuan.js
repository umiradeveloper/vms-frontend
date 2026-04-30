import { Button, Divider } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
const Select = dynamic(() => import("react-select"), { ssr: false });
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";

const DetailApprovalPengajuan = ({ openModal, setOpenModal, loader, setLoader }) => {
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
        upload_bukti_bayar: null
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
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                if (resultApi.status == 200) {
                    swalAlert(result.data.message, result.statusText, "success");
                    setReload(prev => !prev);
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
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/dokumen-bukti-bayar?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }, responseType: "blob"
            });
            const url = window.URL.createObjectURL(new Blob([result.data], { type: "application/pdf" }));
            Swal.fire({ title: "Dokumen Transaksi " + nama, html: `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`, width: "80%", showConfirmButton: false, showCloseButton: true });
        } catch (e) { Swal.fire("Error", "Gagal membuka dokumen", "error"); }
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
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                // console.log("trx: " + resultApi)
                if (resultApi.status == 200) {
                    swalAlert(result.data.message, result.statusText, "success");
                    setReload(prev => !prev);
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
            const resultApi = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/get-transaksi-by-id?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(resultApi);
            if (resultApi.status == 200) {
                const datas = resultApi.data.data;
                setShowData({
                    jenis_transaksi: datas.jenis_transaksi,
                    proyek: datas.proyek,
                    bukti_bayar: datas.upload_bukti_pembayaran,
                    layak_bayar: datas.layak_bayar,
                    status_approval: datas.status_pengajuan,
                    detail_transaksi: datas.detailTransaksi
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

    const SubmitVerified = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const fm = new FormData();
        fm.append("status_approval", "Verified");
        // fm.append("layak_bayar", updatePengajuanApproval.layak_bayar);
        // fm.append("upload_bukti_bayar", updatePengajuanApproval.upload_bukti_bayar);
        try {
            const resultApi = await apiConfig.post(apiUrl + "/ChecklistTransaksi/transaksi/update-status-pengajuan?id=" + idTransaksi, fm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(resultApi);
            if (resultApi.status == 200) {
                swalAlert(resultApi.data.message, resultApi.statusText, "success");
                setOpenModal({ ...openModal, open: false });
                setReload(prev => !prev);

            }
        } catch (error) {
            console.log(error);
        } finally { setLoader(false) }
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
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                // console.log(resultApi);
                if (resultApi.status == 200) {
                    swalAlert(resultApi.data.message, resultApi.statusText, "success");
                    setOpenModal({ ...openModal, open: false });
                    setReload(prev => !prev);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false)
            }
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
        <Modal size="xl" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }} enforceFocus={false}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Detail Transaksi</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">

                            <Col xl={12}>
                                <div className="row gy-2 pb-3">
                                    <label htmlFor="nama-proyek" className="form-label">Jenis Transaksi<span style={{ color: "red" }}>*</span> :</label>
                                    <span>{showData.jenis_transaksi}</span>
                                </div>
                            </Col>
                            <Col xl={12} >
                                <div className="row gy-2 pb-3">
                                    <label htmlFor="nama-proyek" className="form-label ">Proyek<span style={{ color: "red" }}>*</span> :</label>
                                    <span>{showData.proyek}</span>
                                </div>
                            </Col>
                            <Divider className="mt-3 mb-3" />
                            {/* {showData.detail_transaksi && showData.detail_transaksi.map((item, index) => (
                                <Col xl={6} key={index}>
                                    <div className="row gy-2 pb-3">
                                        <Row>
                                            <Col xl={4}>
                                                <label htmlFor="nama-proyek" className="form-label ">{item.pertanyaan}<span style={{ color: "red" }}>*</span> :</label>
                                            </Col>
                                            <Col xl={4}>
                                                <Button variant='contained' type="button" className="btn btn-primary" onClick={() => { getFileTransaksi(item.id_detail_transaksi, item.pertanyaan) }}>Lihat Dokumen</Button>
                                            </Col>
                                            {item.checklist ? (
                                                <Col xl={2}>
                                                    <h2><span className={`badge ${item.checklist == 1 ? "bg-success" : "bg-danger"}`}>{item.checklist == 1 ? "Verified" : "Not Verified"}</span></h2>
                                                </Col>
                                            ) : (
                                                <Col xl={2}>
                                                    <div className="d-flex gap-2">
                                                        <Button variant="contained" className="btn btn-success btn-icon  btn-wave waves-effect waves-light" onClick={() => { HandleVerified(item.id_detail_transaksi) }}>
                                                            <i className="ri-check-double-fill" ></i>
                                                        </Button>
                                                        <Button variant="contained" className="btn btn-danger btn-icon  btn-wave waves-effect waves-light" onClick={() => HandleNotVerified(item.id_detail_transaksi)}>
                                                            <i className="bi-x-square-fill"></i>
                                                        </Button>
                                                    </div>

                                                </Col>
                                            )}
                                            <Col xl={12}>
                                                <Row>
                                                    <Col xl={2}>
                                                        <label htmlFor="nama-proyek" className="form-label ">Nilai<span style={{ color: "red" }}>*</span> :</label>
                                                    </Col>
                                                    <Col xl={10}>
                                                        <span>{toCurrency(item.nilai)}</span> 
                                                    </Col>
                                                </Row>
                                                
                                                
                                            </Col>

                                        </Row>
                                    </div>
                                </Col>
                            ))} */}
                            {showData.detail_transaksi &&
                                showData.detail_transaksi.map((item, index) => (
                                    <Col xl={12} key={index} className="mb-3">
                                        <div className="card shadow-sm border-0 rounded-4">
                                            <div className="card-body">

                                                {/* Header */}
                                                <Row className="align-items-center mb-3">
                                                    <Col xl={8}>
                                                        <h6 className="fw-semibold mb-0 text-primary">
                                                            {item.pertanyaan}
                                                        </h6>
                                                    </Col>

                                                    <Col xl={4} className="text-xl-end mt-2 mt-xl-0">
                                                        <Button
                                                            variant="contained"
                                                            className="btn btn-primary px-3"
                                                            onClick={() =>
                                                                getFileTransaksi(
                                                                    item.id_detail_transaksi,
                                                                    item.pertanyaan
                                                                )
                                                            }
                                                        >
                                                            <i className="ri-file-list-3-line me-1"></i>
                                                            Lihat Dokumen
                                                        </Button>
                                                    </Col>
                                                </Row>

                                                {/* Status */}
                                                <Row className="mb-3">
                                                    <Col xl={12}>
                                                        {item.checklist ? (
                                                            <span
                                                                className={`badge px-3 py-2 fs-6 ${item.checklist == 1
                                                                        ? "bg-success"
                                                                        : "bg-danger"
                                                                    }`}
                                                            >
                                                                {item.checklist == 1
                                                                    ? "Verified"
                                                                    : "Not Verified"}
                                                            </span>
                                                        ) : (
                                                            <div className="d-flex gap-2">
                                                                <Button
                                                                    variant="contained"
                                                                    className="btn btn-success"
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
                                                                    className="btn btn-danger"
                                                                    onClick={() =>
                                                                        HandleNotVerified(
                                                                            item.id_detail_transaksi
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="ri-close-line me-1"></i>
                                                                    Reject
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </Col>
                                                </Row>

                                                {/* Value */}
                                                <Row className="border-top pt-3">
                                                    <Col xl={3}>
                                                        <small className="text-muted fw-semibold">
                                                            Nilai Transaksi
                                                        </small>
                                                    </Col>

                                                    <Col xl={9}>
                                                        <h5 className="mb-0 text-success fw-bold">
                                                            {toCurrency(item.nilai)}
                                                        </h5>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            <Divider className="mt-3 mb-3" />

                            {/* {showData.status_approval == "Approved" || showData.status_approval == "Reject" ? (
                                <Col xl={12}>
                                    <div className="row gy-2 pb-3">
                                        <Row>
                                            <Col xl={2}>
                                                <label htmlFor="nama-proyek" className="form-label ">Approval<span style={{ color: "red" }}>*</span> :</label>
                                            </Col>
                                            <Col xl={8}>
                                                <h2> <span className={`badge ${showData.status_approval == "Approved" ? "bg-success" : "bg-danger"} col-xl-2`}>{showData.status_approval}</span></h2>
                                            </Col>
                                        </Row>



                                    </div>
                                </Col>
                            ) : (
                                <Col xl={12}>
                                    <div className="row gy-2 pb-3">
                                        <label htmlFor="nama-proyek" className="form-label ">Approval<span style={{ color: "red" }}>*</span> :</label>
                                        <Select name="state" className="basic-multi-select " options={dataApproval} isSearchable
                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Approval" onChange={(e) => setUpdatePengajuanApproval({ ...updatePengajuanApproval, status_approval: e.value })}
                                        />
                                    </div>
                                </Col>
                            )} */}

                            {/* {showData.layak_bayar == "Layak Bayar" || showData.layak_bayar == "Tidak Layak Bayar" ? (
                                <Col xl={12}>
                                    <div className="row gy-2 pb-3">
                                        <Row>
                                            <Col xl={2}>
                                                <label htmlFor="nama-proyek" className="form-label ">Layak Bayar<span style={{ color: "red" }}>*</span> :</label>
                                            </Col>
                                            <Col xl={8}>

                                                <h2><span className={`badge ${showData.layak_bayar == "Layak Bayar" ? "bg-success" : "bg-danger"}`}>{showData.layak_bayar}</span></h2>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            ) : (
                                <Col xl={12}>
                                    <div className="row gy-2 pb-3">
                                        <label htmlFor="nama-proyek" className="form-label ">Layak Bayar<span style={{ color: "red" }}>*</span> :</label>
                                        <Select name="state" className="basic-multi-select " options={layakBayar} isSearchable
                                            menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Status Layak Bayar" onChange={(e) => setUpdatePengajuanApproval({ ...updatePengajuanApproval, layak_bayar: e.value })}
                                        />
                                    </div>
                                </Col>
                            )} */}


                            {/* {showData.bukti_bayar ? (
                                <Col xl={12}>
                                    <div className="row gy-2 pb-3">
                                        <Row>
                                            <Col xl={2}>
                                                <label htmlFor="nama-proyek" className="form-label ">Dokumen Bukti Bayar<span style={{ color: "red" }}>*</span> :</label>
                                            </Col>
                                            <Col xl={8}>
                                                <Button variant='contained' type="button" className="btn btn-primary" onClick={() => { getFileDokumenBuktiBayar(idTransaksi, "Bukti Pembayaran") }}>Lihat Dokumen</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            ) : (
                                <Col xl={12}>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Upload Bukti Bayar</Form.Label>
                                        <Form.Control type="file" onChange={(e) => setUpdatePengajuanApproval({ ...updatePengajuanApproval, upload_bukti_bayar: e.target.files[0] })} />
                                    </Form.Group>
                                </Col>

                            )} */}


                            {/* <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Catatan :</label>
                                <textarea type="text" value={dataSubmit.catatan} className={`form-control`} id="keterangan" placeholder="Catatan" rows={3} onChange={(e) => setDataSubmit({ ...dataSubmit, catatan: e.target.value })} />
                            </Col> */}


                        </div>
                    </Col>

                </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2">
                    <Button
                        variant="contained"
                        type="button"
                        className="btn btn-success"
                        onClick={SubmitVerified}
                    >
                        Verified
                    </Button>

                    <Button
                        variant="contained"
                        type="button"
                        className="btn btn-danger"
                        onClick={SubmitReject}
                    >
                        Reject
                    </Button>
                </div>

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

export default dynamic(() => Promise.resolve(DetailApprovalPengajuan), { ssr: false });