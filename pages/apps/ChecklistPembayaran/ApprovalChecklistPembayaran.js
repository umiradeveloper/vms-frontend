import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { Fragment, useEffect, useState } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import DetailApprovalPengajuan from "./modals/DetailApprovalPengajuan";


const ApprovalChecklistPembayaran = () => {
    const [datatable, setDatatable] = useState([]);
    const [reload, setReload] = useState(false);
    const [loader, setLoader] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState({
        open: false,
        data: {}
    })
    const COLUMNS = [
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
            Header: "Keterangan",
            accessor: "keterangan",
        },
        {
            Header: "Status Pengajuan",
            accessor: "status_pengajuan",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        }
    ]
    const getMonitoring = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/get-transaksi", {
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
                        pengajuanArr.push({
                            nama: datas.user_pengajuan?.nama,
                            proyek: datas.proyek,
                            tanggal_pengajuan: datas.tanggal_pengajuan,
                            jenis_transaksi: datas.jenis_transaksi,
                            keterangan: datas.keterangan,
                            status_pengajuan: datas.status_pengajuan,
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
            <Seo title={"Human Resources System"} />
            <PageHeaderVms title='Checklist Pembayaran' item='Pengajuan Pembayaran' active_item='Approval Pembayaran' />
            <LoadersSimUmira open={loader} />
            <Row>
                <DetailApprovalPengajuan loader={loader} setLoader={setLoader} setOpenModal={setOpenModalDetail} openModal={openModalDetail} />
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>

                            <div className="card-title">
                                Daftar Approval Checklist Pembayaran
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
ApprovalChecklistPembayaran.layout = "ContentlayoutVms";
export default ApprovalChecklistPembayaran;