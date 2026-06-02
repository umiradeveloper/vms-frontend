import { Card, Col, Modal, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { useEffect, useState } from "react";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import DetailManajemenPengajuanPembayaran from "../modals/DetailManajemenPengajuanPembayaran";
// import DetailPengajuan from "../modals/DetailPengajuan";
// import DetailSuratPayment from "./DetailSuratPayment";
import { Button, Icon } from "@mui/material";
import EditManajemenPengajuanPembayaran from "../modals/EditManajemenPengajuanPembayaran";
import DetailManajemenPembayaran from "../modals/DetailManajemenPembayaran";


const ListManajemenPengajuanPembayaran = ({loader, setLoader, reload, setReload}) => {
     const [datatable, setDatatable] = useState([]);
    // const [reload, setReload] = useState(false);
    const [openDetailPengajuan, setOpenDetailPengajuan] = useState({
        open: false,
        data:{}
    });
    const [openEditPengajuan, setOpenEditPengajuan] = useState({
        open: false,
        data:{}
    });
    const [openModalSurat, setOpenModalSurat] = useState({
        open: false,
        data:{}
    });
    const [openModalDetailPembayaran, setOpenModalDetailPembayaran] = useState({
        open: false,
        data:{}
    });
    const COLUMNS = [
        {
            Header: "Kode Transaksi",
            accessor: "kode_trx",
        },
        {
            Header: "Nama",
            accessor: "nama",
        },
        {
            Header: "Tanggal Pengajuan",
            accessor: "tanggal_pengajuan",
        },
        {
            Header: "Proyek",
            accessor: "proyek",
        },
        {
            Header: "Jenis Transaksi",
            accessor: "jenis_transaksi",
        },
         {
            Header: "Kategori",
            accessor: "kategori",
        },
        {
            Header: "Nama Vendor",
            accessor: "nama_vendor",
        },
        {
            Header: "Nomor Invoice",
            accessor: "nomor_invoice",
        },
       
        
        {
            Header: "Keterangan",
            accessor: "keterangan",
        },
        {
            Header: "Nilai Invoice (NETTO)",
            accessor: "nilai_invoice_bersih",
        },
        {
            Header: "Nilai yang di bayar",
            accessor: "nilai_yang_terbayar",
        },
        {
            Header: "Sisa Yang Belum Terbayar",
            accessor: "sisa_yang_belum_terbayar",
        },
        {
            Header: "Status Pengajuan",
            accessor: "status_pengajuan",
        },
        //  {
        //     Header: "Dokumen Output",
        //     accessor: "dokumen_output",
        // },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
        {
            Header: "Edit",
            accessor: "edit",
        },
        {
            Header: "Detail Pembayaran",
            accessor: "detail_pembayaran",
        },
        {
            Header: "Hapus",
            accessor: "hapus_pengajuan",
        },
    ]
    const toCurrency = (amount) => {
        if (amount == null || amount === "") {
            return "Rp 0";
        }

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(amount);
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
    const getMonitoring = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/get-manajemen-transaksi", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result);
            if (result.status == 200) {
                const pengajuanArr = [];
                if (result.data.data?.length > 0) {
                    

                    for (const datas of result.data.data) {
                        let bayar = 0;
                        for(const detailPayment of datas.detailPayment){
                            bayar += detailPayment.nominal_bayar ?? 0;
                        }
                        pengajuanArr.push({
                            kode_trx: datas.kode_transaksi,
                            nama: datas.user_pengajuan?.nama,
                            proyek:datas.proyek,
                            nama_vendor: datas.nama_vendor ?? "-",
                            kategori: datas.kategori ?? "-",
                            nomor_invoice: datas.nomor_invoice ?? "-",
                            tanggal_pengajuan: datas.tanggal_pengajuan,
                            jenis_transaksi: datas.jenis_transaksi,
                            keterangan: datas.keterangan,
                            status_pengajuan: <h5><span className={`badge ${(datas.status_pengajuan == "Verified")?"bg-success-gradient":(datas.status_pengajuan == "Pengajuan")?"bg-info-gradient":(datas.status_pengajuan == "Payment")?"bg-primary-gradient":"bg-danger-gradient"}`}>{datas.status_pengajuan}</span></h5>,
                            nilai_invoice_bersih: toCurrency(datas.nilai_invoice_bersih) ?? "-",
                            nilai_yang_terbayar: toCurrency(bayar),
                            sisa_yang_belum_terbayar: toCurrency(datas.nilai_invoice_bersih - bayar),
                            // catatan_verified: datas.catatan_verified,
                            // catatan_payment: datas.catatan_payment,
                            // dokumen_output: (datas.status_pengajuan == "Payment")?
                            // <div className="d-flex flex-row gap-2">
                            //     <button className="btn btn-secondary" onClick={() => setOpenModalSurat({open: true, data: datas})} >Dokumen</button>
                            // </div>
                            // :
                            // "-",
                            aksi: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-info" onClick={() => setOpenDetailPengajuan({open: true, data: datas})} ><i className="ri-eye-line me-1"></i></button>
                            </div>,
                            edit: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-secondary" onClick={() => setOpenEditPengajuan({open: true, data: datas})} ><i className="ri-pencil-line me-1"></i></button>
                            </div>,
                            detail_pembayaran: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-primary" onClick={() => setOpenModalDetailPembayaran({open: true, data: datas})} ><i className="ri-pencil-line me-1"></i></button>
                            </div>,
                            hapus_pengajuan: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-danger" onClick={() => {deleteData(datas.id_transaksi)}} ><i className="ri-delete-bin-line me-1"></i></button>
                            </div>

                        })
                    }
                    // setEmployee(dataEmployeeArr);
                }
                setDatatable(pengajuanArr);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    const deleteData = async(id) => {
        const resultConfirm = await AlertConfirm("Apakah anda yakin ingin menghapus data pengajuan ini ? ", "warning", "Hapus", false, "Data berhasil Delete");
        if(resultConfirm.status){
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            setLoader(true);
            try {
                const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/delete-transaksi", {
                    params:{
                        id: id
                    },
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if(result.status == 200){
                    
                    swalAlert(result.data.message, result.statusText, "success");
                    setReload(prev => !prev);
                }
            }catch(err){
                console.log(err);
            }finally{
                setLoader(false);
            }
        }

         
    }
    useEffect(() => {
        getMonitoring();
    },[openDetailPengajuan.open, openModalSurat.open, openModalDetailPembayaran.open, reload])

    return(
         <Row>
            <DetailManajemenPengajuanPembayaran loader={loader} setLoader={setLoader} setOpenModal={setOpenDetailPengajuan} openModal={openDetailPengajuan} />
            <EditManajemenPengajuanPembayaran loader={loader} setLoader={setLoader} setOpenModal={setOpenEditPengajuan} openModal={openEditPengajuan} reload={reload} setReload={setReload} />
            <DetailManajemenPembayaran loader={loader} setLoader={setLoader} setOpenModal={setOpenModalDetailPembayaran} openModal={openModalDetailPembayaran} reload={reload} setReload={setReload} />
            <Col xl={12}>
                <Card className="custom-card">
                    <Card.Header>

                        <div className="card-title">
                            List Pengajuan Transaksi Pembayaran HO & Proyek
                        </div>
                    </Card.Header>
                    <Card.Body>

                        <div className="table-responsive">
                            <BasicTableCostControl column={COLUMNS} datatable={datatable} />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )

}

export default ListManajemenPengajuanPembayaran;