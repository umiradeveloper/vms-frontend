import { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "../../DataTables/DataTablesCostControl";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import apiConfig from "@/utils/AxiosConfig";



const DaftarProyek = () => {
    const [loader, setLoader] = useState(false);
    const [datatable, setDataTable] = useState([]);
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
                        rap: data.biaya_rap,
                        rab: data.biaya_rab
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
    useEffect(() => {
        getDaftarProyek();
    },[])
    return (
        <Fragment>
            <Seo title={"Daftar Proyek"} />
            <PageHeaderVms title='Daftar Proyek' item='Daftar Proyek' active_item='Daftar Proyek' />
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

DaftarProyek.layout = "ContentlayoutVms";
export default DaftarProyek;


