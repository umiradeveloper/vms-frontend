import Swal from "sweetalert2"; 
import Seo from "@/shared/layout-components/seo/seo";
import { Fragment, useEffect, useState } from "react";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import { Button, Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import { useRouter } from "next/router";


const MonitoringPengajuan = () => {
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);
    const [datatable, setDataTable] = useState([]);
    const COLUMNS = [
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
        {
            Header: "Status Pengajuan",
            accessor: "status_approver",
        },
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
                    const last_index = (jumlah_persetujuan > 0)?jumlah_persetujuan-1:0;
                    //console.log(data.pengajuan_persetujuan_bk[0]);
                    arr.push({
                        nama_vendor: data.nama_vendor,
                        item_pekerjaan: data.rapa?.item_pekerjaan || "-",
                        volume_bk: data.volume_bk,
                        harga_total: toCurrency(data.harga_total),
                        nama_penerima: data.nama_penerima,
                        tanggal_penerima: data.tanggal_penerima,
                        status_approver: (jumlah_persetujuan > 0)?data.pengajuan_persetujuan_bk[last_index].status_approver:"-"
                    });
                } setDataTable(arr);
            } setLoader(false);
        } catch (error) { 
            console.error("Error getMonitoringPengajuanBk:", error); 
            setLoader(false); }
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
        </Fragment>
    )

}

MonitoringPengajuan.layout = "ContentlayoutVms";
export default MonitoringPengajuan;