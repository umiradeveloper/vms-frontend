import Seo from "@/shared/layout-components/seo/seo";
import { Fragment, useEffect, useState } from "react";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import CreatePu from "./modals/CreatePu";
//import DetailBk from "./modals/DetailBk";



const DetailProyekPu = () => {
     const [dataTable, setDataTable] = useState([]);
     const [loader, setLoader] = useState(false);
     
     const params = useSearchParams();
     const navigate = useRouter();
     const [dataProyek, setDataProyek] = useState({
        kode_proyek:"",
        nama_proyek: "",
        deskripsi_proyek: "",
        tanggal_kontrak: "",
        biaya_rap: "",
        biaya_rab:""
    });

    const [PendapatanUsaha, setPendapatanUsaha] = useState({
        datail: []
    });
    const [openModalEdit, setOpenModalEdit] = useState({
        kode_proyek:"",
        open: false
    })
     const [openModalUpload, setOpenModalUpload] = useState({
        id_proyek:"",
        open_modal: false
    })
     const COLUMNS = [
        {
            Header: "Kode RAP",
            accessor: "kode_rap",
        },
        {
            Header: "Kategori",
            accessor: "kategori",
        },
        {
            Header: "Group",
            accessor: "group",
        },
        {
            Header: "Item Pekerjaan",
            accessor: "item_pekerjaan",
        },
       
        {
            Header: "Spesifikasi",
            accessor: "spesifikasi",
        },
        {
            Header: "satuan",
            accessor: "satuan",
        },
        {
            Header: "Volume",
            accessor: "volume",
        },
        {
            Header: "Harga Satuan",
            accessor: "harga_satuan",
        },
        {
            Header: "Harga Total",
            accessor: "harga_total",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];

    const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
    };
    const formatPercent = (value, digits = 2) => `${Number(value).toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
    const calcPercentage = (part, total) => {
        const t = Number(total) || 0;
        if (t === 0) return 0;
        const p = (Number(part) / t) * 100;
        return p;
    }

    const getDataById = async() =>{
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek-id?id="+params.get("id"), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if(result.status){
                setDataProyek({
                    nama_proyek: result.data.data.nama_proyek,
                    kode_proyek: result.data.data.kode_proyek,
                    deskripsi_proyek: result.data.data.deskripsi_proyek,
                    tanggal_kontrak: (result.data.data.tanggal_akhir_kontrak)?result.data.data.tanggal_akhir_kontrak:"",
                    biaya_rap: (result.data.data.biaya_rap)?result.data.data.biaya_rap:"",
                    biaya_rab: (result.data.data.biaya_rab)?result.data.data.biaya_rab:""
                });
                
            }
            setLoader(false)
            console.log(result) 
        }catch(error){
            setLoader(false)
            console.log("e = "+error);
        }
    }
    const getPuByProyek = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const result = await apiConfig.get(
                apiUrl + "/CostControl/PendapatanUsaha/get-pu-by-proyek?id_proyek=" + params.get("id"),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            if (result.status === 200) {
                const total = result.data.data.reduce((sum, d) => sum + Number(d.nominal), 0);
                setPendapatanUsaha({
                    total_pu: total,
                    detail: result.data.data
                });
            }

            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.log("err =", error);
        }
    };
    
    useEffect(() => {
        if(params.get("id")){
            getDataById();
            getPuByProyek();
        }
    },[params.get("id"),openModalUpload])

    return(
        <Fragment>
            <Seo title={"Detail Pendapatan Usaha Proyek"} />
            <PageHeaderVms title='Pendapatan Usaha' item='Daftar Proyek Pendapatan Usaha' active_item='Detail Pendapatan Usaha' />
            <LoadersSimUmira open={loader} />
            <CreatePu openModal={openModalUpload} setOpenModal={setOpenModalUpload} />
            {/* <CreateBk openModal={openModalUpload} setOpenModal={setOpenModalUpload} />
            <DetailBk  openModal={openModalEdit} setOpenModal={setOpenModalEdit}/>*/}
            {/* <UploadDataRapa openModal={openModalUpload} setOpenModal={setOpenModalUpload} />
            <EditDataRapa openModal={openModalEdit} setOpenModal={setOpenModalEdit}/> */}
             <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header className="d-flex align-items-center justify-content-between">
                             <button
                                type="button" className="btn btn-warning label-btn rounded-pill"
                                onClick={() => navigate.push("/apps/CostControl/PendapatanUsaha/DaftarProyekPu")}
                            >
                                <i className="ri-arrow-left-line label-btn-icon me-2 rounded-pill"/>
                                kembali
                            </button>
                            <button
                                type="button" className="btn btn-primary label-btn rounded-pill"
                                onClick={() => setOpenModalUpload({id_proyek: params.get("id"), open_modal: true})}
                                // onClick={() => console.log("test")}
                                // onClick={() => navigate.push("/apps/CostControl/Rapa/DaftarRapa")}
                            >
                                <i className="ri-add-circle-line label-btn-icon me-2 rounded-pill"/>
                                Input Pendapatan Usaha
                            </button>
                           
                        </Card.Header>
                        <Card.Body>
                            <h5>Kode Proyek : {dataProyek.kode_proyek}</h5>
                            <h5>Nama Proyek : {dataProyek.nama_proyek}</h5>
                            <h5>Tanggal Berakhir Kontrak : {dataProyek.tanggal_kontrak}</h5>
                            <h5>RAB (Rincian Anggaran Biaya) : {toCurrency(dataProyek.biaya_rab)}</h5>
                            <h5>RAP (Rincian Anggaran Proyek) : {toCurrency(dataProyek.biaya_rap)}</h5>
                            <h5>Pendapatan Usaha : {toCurrency(PendapatanUsaha.total_pu)}</h5>
                            <h5>Persentase BK/PU : {formatPercent(calcPercentage(PendapatanUsaha.total_pu, dataProyek.biaya_rap))}</h5>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
             <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">Detail Pendapatan Usaha</div>
                        </Card.Header>

                        <Card.Body>
                            {(PendapatanUsaha?.detail ??[]).length === 0 ? (
                                <p className="text-muted">Belum ada data PU</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Deskripsi</th>
                                                <th>Nominal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(PendapatanUsaha?.detail ??[]).map((d, i) => (
                                                <tr key={i}>
                                                    <td>{d.deskripsi || "-"}</td>
                                                    <td>{toCurrency(d.nominal_pu)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )

}

DetailProyekPu.layout = "ContentlayoutVms";

export default DetailProyekPu;