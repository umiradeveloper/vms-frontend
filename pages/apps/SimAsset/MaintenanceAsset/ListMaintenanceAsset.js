import { Card, Col, Row } from "react-bootstrap";
import BasicTableSuperApps from "../../DataTables/BasicTableSuperApps";
import { useEffect, useState } from "react";
import api from "@/utils/AxiosConfig";
import UpdateMaintenanceAsset from "./Modals/UpdateMaintenanceAsset";

const ListMaintenanceAsset = ({ loader, setLoader, reload, setReload }) => {
    const [openUpdate, setOpenUpdate] = useState({
        open:false,
        datas: {}
    })
    const [dataTable, setDataTable] = useState([]);
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
            Header: "Tipe Maintenance",
            accessor: "tipe_maintenance",
        },
        {
            Header: "Biaya",
            accessor: "biaya",
        },
        {
            Header: "Tanggal maintenance",
            accessor: "tanggal_maintenance",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ]
    const getDataMaintenance = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const result = await api.get(apiUrl + "/asset-manajemen/get-maintenance-asset", {
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
                            tipe_maintenance: datas.tipe_maintenance,
                            biaya: datas.biaya,
                            tanggal_maintenance: datas.tanggal_maintenance,
                            aksi: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-info" onClick={() => setOpenUpdate({ open: true, datas: datas })} ><i className="ri-eye-line me-1"></i></button>
                            </div>
                        })
                        // ls.push({
                        //     value: datas,
                        //     label: datas
                        // })
                    }

                }
                setDataTable(ls);
                // setTipeMaintenance(ls)
                // swalAlert(result.data.message, result.statusText, "success");

                // setOpenModal({open: false });
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        getDataMaintenance();
    }, [reload])
    return (
        <Row>
            <UpdateMaintenanceAsset openModal={openUpdate} setOpenModal={setOpenUpdate} loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
            <Col xl={12}>
                <Card className="custom-card">
                    <Card.Header>

                        <div className="card-title">
                            Daftar Maintenance Asset
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
    );
}

export default ListMaintenanceAsset;