import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { Fragment, useEffect, useState } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import DetailApprovalChecklistPembayaranProyek from "./Component/Proyek/modals/DetailApprovalChecklistPembayaranProyek";
// import DetailApprovalPengajuan from "./modals/DetailApprovalPengajuan";


const ApprovalChecklistPembayaranProyek = () => {
    const [datatable, setDatatable] = useState([]);
    const [reload, setReload] = useState(false);
    const [loader, setLoader] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState({
        open: false,
        data: {}
    })
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
    ]
    const toCurrency = (amount) => {
        const hasil = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(amount);
        return hasil
    }
    const getMonitoring = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/Proyek/get-transaksi-approval", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if (result.status == 200) {
                const pengajuanArr = [];
                if (result.data.data?.length > 0) {

                    for (const datas of result.data.data) {
                        let bayar = 0;
                        for(const detailPayment of datas.detailPembayaran){
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
                            aksi: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-info" onClick={() => {setOpenModalDetail({open: true, data: datas})}} >Detail</button>
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
    

   
    useEffect(() => {
        getMonitoring();
    }, [openModalDetail.open]);

    return (
        <Fragment>
            <Seo title={"Approval Checklist Pembayaran Proyek"} />
            <PageHeaderVms title='Approval Checklist Pembayaran' item='Approval Checklist Pembayaran' active_item='Approval Checklist Pembayaran Proyek' />
            <LoadersSimUmira open={loader} />
            <Row>
                {/* <DetailApprovalPengajuan loader={loader} setLoader={setLoader} setOpenModal={setOpenModalDetail} openModal={openModalDetail} /> */}
                <DetailApprovalChecklistPembayaranProyek loader={loader} setLoader={setLoader} setOpenModal={setOpenModalDetail} openModal={openModalDetail} />
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>

                            <div className="card-title">
                                Daftar Approval Checklist Pembayaran Proyek
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
        </Fragment>
    )
}
ApprovalChecklistPembayaranProyek.layout = "ContentlayoutVms";
export default ApprovalChecklistPembayaranProyek;