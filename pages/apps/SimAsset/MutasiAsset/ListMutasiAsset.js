import { Card, Col, Row } from "react-bootstrap";
import BasicTableSuperApps from "../../DataTables/BasicTableSuperApps";
import { useEffect, useState } from "react";
import api from "@/utils/AxiosConfig";


const ListMutasiAsset = ({loader, setLoader, reload, setReload}) => {
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
            Header: "Lokasi Asal",
            accessor: "lokasi_asal",
        },
        {
            Header: "Lokasi Tujuan",
            accessor: "lokasi_tujuan",
        },
        {
            Header: "Tanggal Mutasi",
            accessor: "tanggal_mutasi",
        },

        {
            Header: "Tanggal Penerimaan",
            accessor: "tanggal_penerimaan",
        },
        {
            Header: "PIC Sebelumnya",
            accessor: "pic_sebelumnya",
        },
         {
            Header: "PIC tujuan",
            accessor: "pic_tujuan",
        },
         {
            Header: "Alasan Mutasi",
            accessor: "alasan_mutasi",
        },
        {
            Header: "Status Mutasi",
            accessor: "status_mutasi",
        },
    ]
    const getDataAsset = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            setLoader(true);
    
            try {
                const result = await api.get(apiUrl + "/asset-manajemen/get-mutasi-asset", {
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
                                lokasi_asal: datas.lokasi_asal,
                                lokasi_tujuan: datas.lokasi_tujuan,
                                pic_sebelumnya: datas.pic_sebelum?.username,
                                pic_tujuan: datas.pic_tujuan?.username,
                                tanggal_mutasi: datas.tanggal_mutasi,
                                tanggal_penerimaan: datas.tanggal_penerimaan,
                                alasan_mutasi: datas.alasan_mutasi,
                                status_mutasi: datas.status_mutasi
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
        getDataAsset();
    },[reload])
    return(
         <Row>

            <Col xl={12}>
                <Card className="custom-card">
                    <Card.Header>

                        <div className="card-title">
                            Daftar Mutasi Asset
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

export default ListMutasiAsset;