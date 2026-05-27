import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Col, Modal } from "react-bootstrap";
import BasicTableCostControl from "../../DataTables/DataTablesCostControl";
import dynamic from "next/dynamic";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";



const DetailManajemenPembayaran = ({ loader, setLoader, openModal, setOpenModal, reload, setReload }) => {
    const [dataTable, setDataTable] = useState([]);
    const COLUMNS = [
        {
            Header: "Bukti Pembayaran",
            accessor: "dokumen_upload",
        },
        {
            Header: "Biaya",
            accessor: "biaya",
        },
        {
            Header: "Update",
            accessor: "update",
        },
        {
            Header: "Delete",
            accessor: "delete",
        },
    ]
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

    const TambahPayment = async (id) => {
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
                const resultApi = await apiConfig.post(apiUrl + "/ChecklistTransaksi/transaksi/update-status-pengajuan?id=" + id + "&catatan_payment=" + result.value.catatan, fm, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": "Bearer " + localStorage.getItem("token")
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
    const HandlePayment = async (id, datas) => {
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
                                value="${toCurrency(datas.nominal_bayar) ?? ""}"
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
                                value="${datas.catatan ?? ""}"
                            ></textarea>
                        </div>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Update',
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
                const nilai_yang_di_bayar = clearCurrency(
                    document.getElementById('nilai_yang_di_bayar')
                        .value);

                // if (!upload) {
                //     Swal.showValidationMessage('Upload Bukti Bayar');
                //     return false;
                // }
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
            // fm.append("id_checklist_bukti_bayar", id);
            fm.append("nilai_bayar", result.value.nilai_yang_di_bayar);
            if (result.value.upload) {
                fm.append("upload_dokumen_bukti_bayar", result.value.upload);
            }

            fm.append("nilai_bayar", result.value.nilai_yang_di_bayar);
            try {
                const resultApi = await apiConfig.post(apiUrl + "/ChecklistTransaksi/transaksi/update-bukti-bayar?id=" + id, fm, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": "Bearer " + localStorage.getItem("token")
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
    const getFileDokumenBuktiBayar = async (id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/dokumen-bukti-bayar?id=" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }, responseType: "blob"
            });
            const url = window.URL.createObjectURL(new Blob([result.data], { type: "application/pdf" }));
            Swal.fire({ title: "Dokumen Bukti Bayar", html: `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`, width: "80%", showConfirmButton: false, showCloseButton: true });
        } catch (e) { Swal.fire("Error", "Gagal membuka dokumen", "error"); }
    };

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

    const handleDelete = async (id) => {
        const resultConfirm = await AlertConfirm("Apakah anda yakin ingin menghapus data ini ? ", "warning", "Hapus", false, "Data berhasil Hapus");
        if (resultConfirm.status) {
            setLoader(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            try {
                const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/delete-bukti-bayar?id=" + id, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                if (result.status == 200) {
                    setReload(prev => !prev);
                    swalAlert(result.data.message, result.statusText, "success");
                    setOpenModal({ ...openModal, open: false })

                }


            } catch (e) {
                console.log(e)
            } finally {
                setLoader(false);
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

    useEffect(() => {
        if (openModal.open) {
            // console.log(openModal);
            if (openModal.data?.detailPayment?.length > 0) {
                const dataPay = [];
                for (const pay of openModal.data?.detailPayment) {
                    dataPay.push({
                        datas: pay,
                        dokumen_upload: <Button
                            variant="contained"
                            className="btn btn-primary rounded-3"
                            onClick={() =>
                                getFileDokumenBuktiBayar(
                                    pay.id_checklist_bukti_bayar
                                )
                            }
                        >
                            <i className="ri-eye-line me-2"></i>
                            Lihat Dokumen
                        </Button>,
                        biaya: toCurrency(pay.nominal_bayar) ?? "",
                        update: <Button
                            variant="contained"
                            className="btn btn-warning rounded-3"
                            onClick={() => {
                                HandlePayment(pay.id_checklist_bukti_bayar, pay)
                            }}
                        >
                            <i className="ri-pencil-line me-2"></i>
                        </Button>,
                        delete: <Button
                            variant="contained"
                            className="btn btn-danger rounded-3"
                            onClick={() => {
                                handleDelete(pay.id_checklist_bukti_bayar)
                            }}
                        >
                            <i className="ri-delete-bin-line me-2"></i>
                        </Button>,
                    });

                }
                setDataTable(dataPay)
            }
        }
    }, [openModal.open, reload]);

    return (
        <Modal size="lg" show={openModal.open} enforceFocus={false} onHide={() => { setOpenModal({ ...openModal, open: false }); setDataTable([]) }}>

            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Detail Pembayaran</h6>
            </Modal.Header>
            <Modal.Body>
                <Col xl={12} className="d-flex justify-content-end">
                    {/* <Button variant="contained" color="success" onClick={() => {TambahPayment(openModal.data?.id_transaksi)}}>Tambah Pembayaran</Button> */}
                    <div className="d-flex flex-row gap-2">
                        <button className="btn btn-success" onClick={() => {TambahPayment(openModal.data?.id_transaksi)}} ><i className="ri-add-line me-1"></i> Tambah Pembayaran</button>
                    </div>
                </Col>

                <Divider className="mt-2 mb-2" />
                <div className="table-responsive mt-2">
                    <BasicTableCostControl column={COLUMNS} datatable={dataTable} />
                </div>
                <Col xl={12} className="mb-2 d-flex gap-2">
                    {/* <Button variant="contained" onClick={submit}>Submit</Button> */}
                    <Button variant="contained" color="warning" onClick={() => setOpenModal({ open: false })}>Cancel</Button>
                </Col>
            </Modal.Body>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(DetailManajemenPembayaran), { ssr: false });