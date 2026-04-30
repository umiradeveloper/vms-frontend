import { Card, Col, Modal, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { useEffect, useState } from "react";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import DetailPaymentChecklist from "../modals/DetailPaymentChecklist";
import DetailSuratPayment from "./DetailSuratPayment";


const TablePaymentPembayaran = ({loader, setLoader}) => {
    const [datatable, setDatatable] = useState([]);
    const [openModal, setOpenModal] = useState({
        open: false,
        data: {}
    })
    const [openModalSurat, setOpenModalSurat] = useState({
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
            Header: "Keterangan",
            accessor: "keterangan",
        },
        {
            Header: "Status Pengajuan",
            accessor: "status_pengajuan",
        },
        {
            Header: "Tanggal Verified",
            accessor: "tanggal_verified",
        },
        {
            Header: "SLA Pembayaran (Tempo)",
            accessor: "sla_pembayaran",
        },
        {
            Header: "Tanggal Jatuh Tempo",
            accessor: "tanggal_jatuh_tempo",
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
            const result = await apiConfig.get(apiUrl + "/ChecklistTransaksi/transaksi/get-transaksi-by-status?status=verified", {
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
                            kode_trx: datas.kode_transaksi,
                            nama: datas.user_pengajuan?.nama,
                            proyek: datas.proyek,
                            tanggal_pengajuan: datas.tanggal_pengajuan,
                            jenis_transaksi: datas.jenis_transaksi,
                            keterangan: datas.keterangan,
                            tanggal_verified: (datas.approved_at)?datas.approved_at.replace("T", " "):"",
                            sla_pembayaran: datas.tempo_pembayaran_after_verified + " Hari",
                            tanggal_jatuh_tempo: datas.tanggal_jatuh_tempo_after_verified,
                            status_pengajuan: <h5><span className={`badge ${(datas.status_pengajuan == "Verified")?"bg-success-gradient":(datas.status_pengajuan == "Pengajuan")?"bg-info-gradient":"bg-danger-gradient"}`}>{datas.status_pengajuan}</span></h5>,
                            aksi: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-info" onClick={() => {setOpenModal({open: true, data: datas})}} >Detail</button>
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
        },[openModal.open])

    return(
        <Row>
            <DetailPaymentChecklist openModal={openModal} setOpenModal={setOpenModal} loader={loader} setLoader={setLoader} />
           
            <Col xl={12}>
                <Card className="custom-card">
                    <Card.Header>

                        <div className="card-title">
                            Ready To Pay
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

export default TablePaymentPembayaran;