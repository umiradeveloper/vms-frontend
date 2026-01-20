import Swal from "sweetalert2";
import Seo from "@/shared/layout-components/seo/seo";
import { Fragment, useEffect, useState } from "react";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import { Modal, Button, Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import { useRouter } from "next/router";



const MonitoringPengajuan = () => {
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);
    const [datatable, setDataTable] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const COLUMNS = [
        {
            Header: "Proyek",
            accessor: "nama_proyek"
        },
        {
            Header: "Item Pekerjaan",
            accessor: "item_pekerjaan"
        },
        {
            Header: "Volume Biaya Konstruksi",
            accessor: "volume_bk",
        },
        {
            Header: "Harga Total",
            accessor: "harga_total",
        },
        {
            Header: "Nama Vendor",
            accessor: "nama_vendor",
        },
        {
            Header: "Nama Penerima",
            accessor: "nama_penerima",
        },
        {
            Header: "Tanggal Penerimaan",
            accessor: "tanggal_penerima",
        },
        // {
        //     Header: "Catatan",
        //     accessor: "catatan",
        // },
        {
            Header: "Catatan",
            Cell: ({ row }) => (
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                        setSelectedData(row.original.rawData);
                        setShowDetail(true);
                    }}
                >
                    Detail
                </button>
            )
        },
        {
            Header: "Status Pengajuan",
            accessor: "status_approver",
        }
    ];

    const getMonitoringPengajuanBk = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(
                apiUrl + "/CostControl/pengajuan/get-monitoring-pengajuan-bk",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            );
            console.log(result.data.data);
            if (result.status === 200) {
                const arr = [];
                for (const data of result.data.data) {
                    const jumlah_persetujuan = data.pengajuan_persetujuan_bk.length;
                    const last_index = (jumlah_persetujuan > 0) ? jumlah_persetujuan - 1 : 0;
                    //console.log(data.pengajuan_persetujuan_bk[0]);
                    arr.push({
                        nama_proyek: data.proyek?.nama_proyek || "-",
                        nama_vendor: data.nama_vendor,
                        item_pekerjaan: data.rapa?.item_pekerjaan || "-",
                        volume_bk: data.volume_bk,
                        rawData: data,
                        //catatan: (jumlah_persetujuan > 0) ? data.pengajuan_persetujuan_bk[1].catatan_persetujuan : "-",
                        harga_total: toCurrency(data.harga_total),
                        nama_penerima: data.nama_penerima,
                        tanggal_penerima: data.tanggal_penerima,
                        status_approver: (jumlah_persetujuan > 0) ? data.pengajuan_persetujuan_bk[last_index].status_approver : "-"
                    });
                } setDataTable(arr);
            } setLoader(false);
        } catch (error) {
            console.error("Error getMonitoringPengajuanBk:", error);
            setLoader(false);
        }
    };


    const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
    };

    useEffect(() => {
        getMonitoringPengajuanBk();
    }, [reload]);

    return (
        <Fragment>
            <Seo title={"Monitoring Pengajuan Biaya Kontruksi"} />
            <PageHeaderVms title='Monitoring Pengajuan Biaya Kontruksi' item='Monitoring' active_item='Daftar Pengajuan Biaya Konstruksi' />
            <LoadersSimUmira open={loader} />
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Daftar Pengajuan Biaya Konstruksi
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
            <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detail Pengajuan BK</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedData && (
                        <>
                            <p><b>Nama Vendor:</b> {selectedData.nama_vendor}</p>
                            <p><b>Nama Penerima:</b> {selectedData.nama_penerima}</p>
                            <p><b>Item Pekerjaan:</b> {selectedData.rapa?.item_pekerjaan}</p>
                            <p><b>Volume BK:</b> {selectedData.volume_bk}</p>
                            <p><b>Harga Total:</b> {toCurrency(selectedData.harga_total)}</p>
                            <p><b>Tanggal Penerima:</b> {selectedData.tanggal_penerima}</p>

                            <hr />

                            <h6>Riwayat Persetujuan</h6>
                            {selectedData.pengajuan_persetujuan_bk.length > 0 ? (
                                selectedData.pengajuan_persetujuan_bk.map((p, i) => (
                                    <div key={i} className="border rounded p-2 mb-2">
                                        <p><b>Approver:</b> {p.nama_persetujuan || "-"}</p>
                                        <p><b>Jabatan:</b> {p.jabatan_persetujuan}</p>
                                        <p><b>Status:</b> {p.status_approver}</p>
                                        <p><b>Catatan:</b> {p.catatan_persetujuan || "-"}</p>
                                        <p><b>Tanggal:</b> {p.tanggal_persetujuan}</p>
                                    </div>
                                ))
                            ) : (
                                <p>- Belum ada persetujuan -</p>
                            )}
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetail(false)}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>

        </Fragment>
    )

}

MonitoringPengajuan.layout = "ContentlayoutVms";
export default MonitoringPengajuan;