
import Seo from "@/shared/layout-components/seo/seo";
import { Fragment, useEffect, useState } from "react";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import { Button, Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import { useRouter } from "next/router";


const DaftarPengajuanBk = () => {
    const [loader, setLoader] = useState(false);
    const [datatable, setDataTable] = useState([]);
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
            Header: "Tanggal Kontrak",
            accessor: "tanggal_kontrak",
        },
        {
            Header: "RAP (Rincian Anggaran Proyek)",
            accessor: "rap",
        },
        {
            Header: "RAB (Rincian Anggaran Biaya)",
            accessor: "rab",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];

    const getDaftarProyek = async() => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek", {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			});
            if(result.status == 200){
                const daftarArr = [];
                for await (const data of result.data.data) {
                    daftarArr.push({
                        kode_proyek: data.kode_proyek,
                        nama_proyek: data.nama_proyek,
                        deskripsi_proyek: data.deskripsi_proyek,
                        tanggal_kontrak: data.tanggal_akhir_kontrak,
                        rap: toCurrency(data.biaya_rap),
                        rab: toCurrency(data.biaya_rab),
                        aksi:   <div className="d-flex flex-row gap-2">
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
                                            pathname: "/apps/CostControl/PengajuanBk/DetailPengajuanBk",
                                            query: { id: data.id_proyek }
                                        }
                                     )}
                                    >
                                        <i className="ri-arrow-right-line label-btn-icon me-2 rounded-pill"/>
                                        Pengajuan Biaya Kontruksi
                                    </button>
                                </div>
                    })
                }
                setDataTable(daftarArr);
                setLoader(false)
            }
            // console.log(result); 
        } catch (error) {
            console.log("e = "+error);
        }
    }
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
    },[])

    return(
        <Fragment>
            <Seo title={"Daftar Proyek Biaya Kontruksi"} />
            <PageHeaderVms title='Pengajuan Biaya Kontruksi' item='Pengajuan Biaya Kontruksi' active_item='Daftar Proyek' />
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

DaftarPengajuanBk.layout = "ContentlayoutVms";
export default DaftarPengajuanBk;