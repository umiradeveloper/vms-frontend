import { Card, Col, Modal, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { useEffect, useState } from "react";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import DetailPengajuan from "../modals/DetailPengajuan";
import DetailSuratPayment from "./DetailSuratPayment";
import { Button } from "@mui/material";


const MonitoringChecklistPembayaran = ({loader, setLoader, reload, setReload}) => {
     const [datatable, setDatatable] = useState([]);
    // const [reload, setReload] = useState(false);
    const [openDetailPengajuan, setOpenDetailPengajuan] = useState({
        open: false,
        data:{}
    });
    const [openModalSurat, setOpenModalSurat] = useState({
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
            Header: "Keterangan",
            accessor: "keterangan",
        },
         {
            Header: "Catatan Verified",
            accessor: "catatan_verified",
        },
        {
            Header: "Catatan Payment",
            accessor: "catatan_payment",
        },
        {
            Header: "Status Pengajuan",
            accessor: "status_pengajuan",
        },
         {
            Header: "Dokumen Output",
            accessor: "dokumen_output",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ]
      const Surat = () => {
            return(
                <Modal size="lg" show={openModalSurat.open} onHide={() => setOpenModalSurat({...openModalSurat, open: false})} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <Modal.Body className="">
                      <DetailSuratPayment data={openModalSurat.data}/>
                    </Modal.Body>
                    <Modal.Footer className="">
                        <Button variant='contained' type="button" className="btn btn-secondary" onClick={() => setOpenModalSurat({...openModalSurat, open: false})}
                            data-bs-dismiss="modal">Close</Button>
                    </Modal.Footer>
                </Modal>
            )
        }
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
                            kode_trx: datas.kode_transaksi,
                            nama: datas.user_pengajuan?.nama,
                            proyek:datas.proyek,
                            tanggal_pengajuan: datas.tanggal_pengajuan,
                            jenis_transaksi: datas.jenis_transaksi,
                            keterangan: datas.keterangan,
                            status_pengajuan: <h5><span className={`badge ${(datas.status_pengajuan == "Verified")?"bg-success-gradient":(datas.status_pengajuan == "Pengajuan")?"bg-info-gradient":(datas.status_pengajuan == "Payment")?"bg-primary-gradient":"bg-danger-gradient"}`}>{datas.status_pengajuan}</span></h5>,
                            catatan_verified: datas.catatan_verified,
                            catatan_payment: datas.catatan_payment,
                            dokumen_output: (datas.status_pengajuan == "Payment")?
                            <div className="d-flex flex-row gap-2">
                                <button className="btn btn-secondary" onClick={() => setOpenModalSurat({open: true, data: datas})} >Dokumen</button>
                            </div>
                            :
                            "-",
                            aksi: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-info" onClick={() => setOpenDetailPengajuan({open: true, data: datas})} >Detail</button>
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
    },[openDetailPengajuan.open, openModalSurat.open, reload])

    return(
         <Row>
            <DetailPengajuan openModal={openDetailPengajuan} setOpenModal={setOpenDetailPengajuan} loader={loader} setLoader={setLoader} />
            <Surat />
            <Col xl={12}>
                <Card className="custom-card">
                    <Card.Header>

                        <div className="card-title">
                            Daftar Monitoring Checklist Pembayaran
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

export default MonitoringChecklistPembayaran;