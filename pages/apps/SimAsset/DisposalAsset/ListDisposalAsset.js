import { Card, Col, Row } from "react-bootstrap";
import BasicTableSuperApps from "../../DataTables/BasicTableSuperApps";
import { useEffect, useState } from "react";
import api from "@/utils/AxiosConfig";
import DetailDisposalAsset from "./Modals/DetailDisposalAsset";


const ListDisposalAsset = ({loader, setLoader, reload, setReload}) => {
    const [dataTable, setDataTable] = useState([]);
    const [detailDisposal, setDetailDisposal] = useState({
        open: false,
        datas:{}
    })
    const COLUMNS = [
        {
            Header: "Kode Asset",
            accessor: "kode_asset",
        },
         {
            Header: "Tanggal Pengajuan",
            accessor: "tanggal_pengajuan",
        },
        {
            Header: "Nama Asset",
            accessor: "nama_asset",
        },
        {
            Header: "Kategori",
            accessor: "kategori",
        },
        {
            Header: "Alasan",
            accessor: "alasan",
        },
        {
            Header: "Metode Penghapusan",
            accessor: "metode_penghapusan",
        },

        {
            Header: "Tanggal Approval",
            accessor: "tanggal_approval",
        },
        {
            Header: "Status",
            accessor: "status_disposal",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ]
    const getDataDisposal = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            setLoader(true);
    
            try {
                const result = await api.get(apiUrl + "/asset-manajemen/get-disposal-asset", {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                console.log(result);
                if (result.status == 200) {
                    // setReload(prev => !prev);
                    const ls = [];
                    if (result.data.data?.length > 0) {
    
                        for (const datas of result.data.data) {
                           ls.push({
                                kode_asset: datas.asset?.kode_asset,
                                nama_asset: datas.asset?.nama_asset,
                                kategori: datas.asset?.kategori,
                                tanggal_pengajuan: datas.tanggal_pengajuan,
                                alasan : datas.alasan,
                                metode_penghapusan: datas.metode_penghapusan,
                                tanggal_approval: datas.tanggal_approval,
                                status_disposal: datas.status_disposal,
                                aksi: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-info" onClick={() => setDetailDisposal({open: true, datas: datas})}><i className="ri-eye-line me-1"></i></button>
                            </div>,
                            })
                        }
    
                    }
                    setDataTable(ls);
                    
                }
            } catch (error) {
                // setLoader(false);
                console.log(error);
            } finally {
                setLoader(false);
            }
        }
    useEffect(() => {
        getDataDisposal();
    },[reload])
    return(
         <Row>
            <DetailDisposalAsset openModal={detailDisposal} setOpenModal={setDetailDisposal} />
            <Col xl={12}>
                <Card className="custom-card">
                    <Card.Header>

                        <div className="card-title">
                            Daftar Disposal Asset
                        </div>
                    </Card.Header>
                    <Card.Body>

                        <div className="table-responsive">
                            <BasicTableSuperApps column={COLUMNS} datatable={dataTable} />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ListDisposalAsset;