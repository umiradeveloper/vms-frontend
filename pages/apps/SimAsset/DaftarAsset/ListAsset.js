import { Card, Col, Row } from "react-bootstrap";
import BasicTableSuperapps from "../../DataTables/BasicTableSuperApps";
import { useEffect, useState } from "react";
import api from "@/utils/AxiosConfig";
import DetailAsset from "./Modals/DetailAsset";
import UpdateAsset from "./Modals/UpdateAsset";


const ListAsset = ({ loader, setLoader, reload, setReload }) => {
    const [dataTable, setDataTable] = useState([]);
    const [openDetail, setOpenDetail] = useState({
        open: false,
        data: {}
    })
    const [openEdit, setOpenEdit] = useState({
        open: false,
        data: {}
    })
    const COLUMNS = [
        {
            Header: "Kode Asset",
            accessor: "kode_asset",
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
            Header: "Lokasi",
            accessor: "lokasi",
        },
        {
            Header: "PIC Asset",
            accessor: "pic_asset",
        },
        {
            Header: "Kondisi",
            accessor: "kondisi_asset",
        },
        {
            Header: "Status Asset",
            accessor: "status_asset",
        },
        {
            Header: "Detail Asset",
            accessor: "detail_asset",
        },
        {
            Header: "Edit Asset",
            accessor: "edit_asset",
        }
    ]

    const getAsset = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const result = await api.get(apiUrl + "/asset-manajemen/get-asset", {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            // console.log(result);
            if (result.status == 200) {
                const ls = [];
                if (result.data.data?.length > 0) {

                    for (const datas of result.data.data) {
                        ls.push({
                            kode_asset: datas.kode_asset ?? "",
                            nama_asset: datas.nama_asset ?? "",
                            kategori: datas.kategori ?? "",
                            lokasi: datas.lokasi ?? "",
                            pic_asset: datas.user_pemilik?.username ?? "",
                            kondisi_asset: datas.kondisi ?? "",
                            status_asset: datas.status_asset ?? "",
                            detail_asset: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-info" onClick={() => setOpenDetail({ open: true, data: datas })} ><i className="ri-eye-line me-1"></i></button>
                            </div>,
                            edit_asset: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-secondary" onClick={() => setOpenEdit({ open: true, data: datas })} ><i className="ri-pencil-line me-1"></i></button>
                            </div>
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
        getAsset();
    }, [reload])
    return (
        <Row>
            <DetailAsset openModal={openDetail} setOpenModal={setOpenDetail} />
            <UpdateAsset openModal={openEdit} setOpenModal={setOpenEdit} setReload={setReload} reload={reload} loader={loader} setLoader={setLoader} />
            <Col xl={12}>
                <Card className="custom-card">
                    <Card.Header>

                        <div className="card-title">
                            Daftar Asset
                        </div>
                    </Card.Header>
                    <Card.Body>

                        <div className="table-responsive">
                            <BasicTableSuperapps column={COLUMNS} datatable={dataTable} />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ListAsset;