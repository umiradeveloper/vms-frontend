import { Fragment, useEffect, useState } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import { useRouter } from "next/router";



const DaftarScurvePlan = () => {
    const [datatable, setDatatable] = useState([]);
    const [loader, setLoader] = useState();
    const navigate = useRouter();
    const COLUMNS = [
        {
            Header: "Kode Proyek",
            accessor: "kode_proyek",
        },
        {
            Header: "Nama Proyek",
            accessor: "nama_proyek",
        },
        {
            Header: "Deskripsi Proyek",
            accessor: "deskripsi_proyek",
        },
        {
            Header: "Tanggal Akhir Kontrak",
            accessor: "tanggal_akhir_kontrak",
        },
        {
            Header: "RAB",
            accessor: "rab",
        },
        {
            Header: "RAP",
            accessor: "rap",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ]
    const getDaftarProyek = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek-dashboard", {
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status == 200) {
                const daftarArr = [];
                for await (const data of result.data.data) {
                    daftarArr.push({
                        kode_proyek: data.proyek.kode_proyek,
                        nama_proyek: data.proyek.nama_proyek,
                        deskripsi_proyek: data.proyek.deskripsi_proyek,
                        tanggal_akhir_kontrak: formatdate(data.proyek.tanggal_akhir_kontrak),
                        rap: toCurrency(data.proyek.biaya_rap),
                        rab: toCurrency(calcRabAkhir(data.proyek.biaya_rab, data.kerja_kurang, data.kerja_tambah)),
                        aksi: <div className="d-flex flex-row gap-2">
                            {/* <Button type="button" size="sm" className="btn btn-info" onClick={() => navigate.push(
                                        {
                                            pathname: "/apps/CostControl/Rapa/DetailRapa",
                                            query: { id: data.id_proyek }
                                        }
                                     )}>Detail Rapa</Button> */}
                            <button
                                type="button" className="btn btn-sm btn-info label-btn label-end rounded-pill"
                                onClick={() => navigate.push(
                                    {
                                        pathname: "/apps/CostControl/CurvePlan/DetailScurvePlan",
                                        query: { id: data.proyek.id_proyek }
                                    }
                                )}
                            >
                                <i className="ri-arrow-right-line label-btn-icon me-2 rounded-pill" />
                                S Curve
                            </button>
                            <button
                                type="button" className="btn btn-sm btn-info label-btn label-end rounded-pill"
                                onClick={() => navigate.push(
                                    {
                                        pathname: "/apps/CostControl/CurvePlan/DetailActionPlan",
                                        query: { id: data.proyek.id_proyek }
                                    }
                                )}
                            >
                                <i className="ri-arrow-right-line label-btn-icon me-2 rounded-pill" />
                                Action Plan
                            </button>

                        </div>
                    })
                }
                setDatatable(daftarArr);
                setLoader(false)
            }
            // console.log(result);
        } catch (error) {
            console.log("e = " + error);
        }
    }

    const calcRabAkhir = (rab, kurang, tambah) => {
        return (Number(rab) || 0) - (Number(kurang) || 0) + (Number(tambah) || 0);
    };

    const formatdate = (tanggal) =>
        new Date(tanggal).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
        );

    const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
    };
    useEffect(() => {
        getDaftarProyek();
    }, [])
    return (
        <Fragment>
            <Seo title={"Daftar Proyek S Curve & Action Plan"} />
            <PageHeaderVms title='Daftar Proyek S Curve & Action Plan' item='S Curve' active_item='S Curve dan Action Plan' />
            <LoadersSimUmira open={loader} />
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Data Proyek
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

DaftarScurvePlan.layout = "ContentlayoutVms";

export default DaftarScurvePlan;
