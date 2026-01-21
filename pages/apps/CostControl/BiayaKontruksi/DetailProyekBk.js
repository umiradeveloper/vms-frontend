import Seo from "@/shared/layout-components/seo/seo";
import { Fragment, useEffect, useState } from "react";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import CreateBk from "./modals/CreateBk";
import DetailBk from "./modals/DetailBk";



const DetailProyekBk = () => {
    const [dataTable, setDataTable] = useState([]);
    const [loader, setLoader] = useState(false);
    const params = useSearchParams();
    const navigate = useRouter();
    const [dataProyek, setDataProyek] = useState({
        kode_proyek: "",
        nama_proyek: "",
        deskripsi_proyek: "",
        tanggal_kontrak: "",
        tanggal_awal_kontrak: "",
        nominal_mos: "",
        biaya_rap: "",
        biaya_rab: "",
        total_bk: "",
        total_pu: "",
        bk_pu_awal: ""
    })
    
    const [BiayaBk, setBiayaBk] = useState({
        posisi_bk: 0,
        persentase_rap: ""
    });
    
    const [openModalEdit, setOpenModalEdit] = useState({
        id_rapa: "",
        kode_proyek: "",
        open: false
    })
    
    const [openModalUpload, setOpenModalUpload] = useState({
        id_proyek: "",
        open_modal: false
    })
    
    const COLUMNS = [
        {
            Header: "Cost Code",
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
            Header: "Realisasi Biaya Konstruksi",
            accessor: "total_bk_rapa",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];

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

    const formatPercent = (value, digits = 2) => `${Number(value).toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
    
    const calcPercentage = (part, total) => {
        const t = Number(total) || 0;
        if (t === 0) return 0;
        const p = (Number(part) / t) * 100;
        return p;
    }

    const getDataById = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek-id-bk-pu?id=" + params.get("id"), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status) {
                setDataProyek({
                    total_bk: result.data.data.total_bk,
                    total_pu: result.data.data.total_pu,
                    nama_proyek: result.data.data.proyek.nama_proyek,
                    kode_proyek: result.data.data.proyek.kode_proyek,
                    nominal_mos: result.data.data.current_mos,
                    deskripsi_proyek: result.data.data.proyek.deskripsi_proyek,
                    tanggal_akhir_kontrak: (result.data.data.proyek.tanggal_akhir_kontrak) ? result.data.data.proyek.tanggal_akhir_kontrak : "",
                    tanggal_awal_kontrak: (result.data.data.proyek.tanggal_awal_kontrak) ? result.data.data.proyek.tanggal_awal_kontrak : "",
                    biaya_rap: (result.data.data.proyek.biaya_rap) ? result.data.data.proyek.biaya_rap : "",
                    biaya_rab: (result.data.data.proyek.biaya_rab) ? result.data.data.proyek.biaya_rab : "",
                    bk_pu_awal: (result.data.data.proyek.bk_pu_awal) ? result.data.data.proyek.bk_pu_awal + " %" : ""
                });

            }
            setLoader(false)
            console.log(result)
        } catch (error) {
            setLoader(false)
            console.log("e = " + error);
        }
    }
    
    const getRapa = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/PendapatanUsaha/get-rapa-proyek?id_proyek=" + params.get("id"), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status) {
                const arrRapa = [];
                for (const data of result.data.data) {
                    arrRapa.push({
                        kode_rap: (data.kode_rap) ? data.kode_rap : "",
                        kategori: (data.kategori) ? data.kategori : "",
                        group: (data.group) ? data.group : "",
                        item_pekerjaan: (data.item_pekerjaan) ? data.item_pekerjaan : "",
                        spesifikasi: (data.spesifikasi) ? data.spesifikasi : "",
                        satuan: (data.satuan) ? data.satuan : "",
                        volume: (data.volume) ? data.volume : "",
                        harga_satuan: (data.harga_satuan) ? toCurrency(data.harga_satuan) : "",
                        harga_total: (data.harga_total) ? toCurrency(data.harga_total) : "",
                        total_bk_rapa: (data.total_bk_rapa) ? toCurrency(data.total_bk_rapa) : "",
                        aksi: <div className="d-flex flex-row gap-2">
                            <button className="btn btn-success" onClick={() => setOpenModalEdit({ id_rapa: data.id_rapa, open: true })}>Detail Biaya Konstruksi</button>
                        </div>
                    })
                }
                setDataTable(arrRapa);


            }
            setLoader(false)
            console.log(result)
        } catch (error) {
            setLoader(false)
            console.log("e = " + error);
        }
    }
    
    const getBkByProyek = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/BiayaKonstruksi/get-bk-by-proyek?id_proyek=" + params.get("id"), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status == 200) {
                // console.log("bk = "+result)
                const posisiBiayaKonstruksi = result.data.data.reduce((sum, d) => sum + d.harga_total, 0);
                // const persenOri = calcPercentage(posisiBiayaKonstruksi, dataProyek.biaya_rap);
                // const persen = formatPercent(persenOri);
                setBiayaBk({
                    posisi_bk: posisiBiayaKonstruksi
                });
                setLoader(false)
                // console.log(formatPercent(persenOri));
                // setDataProyek({...dataProyek, posisi_biaya_konstruksi: toCurrency(posisiBiayaKonstruksi)})
                // console.log(posisiBiayaKonstruksi);


            }

            // console.log(result) 
        } catch (error) {
            setLoader(false)
            console.log("e = " + error);
        }
    }

    useEffect(() => {
        if (params.get("id")) {
            getDataById();
            getRapa();
            getBkByProyek();
        }
    }, [params.get("id"), openModalUpload, openModalEdit])

    return (
        <Fragment>
            <Seo title={"Detail Biaya Konstruksi"} />
            <PageHeaderVms title='Biaya Kontruksi' item='Daftar Proyek Biaya Konstruksi' active_item='Detail Biaya Konstruksi' />
            <LoadersSimUmira open={loader} />
            <CreateBk openModal={openModalUpload} setOpenModal={setOpenModalUpload} />
            <DetailBk openModal={openModalEdit} setOpenModal={setOpenModalEdit} />
            {/* <UploadDataRapa openModal={openModalUpload} setOpenModal={setOpenModalUpload} />
            <EditDataRapa openModal={openModalEdit} setOpenModal={setOpenModalEdit}/> */}
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header className="d-flex align-items-center justify-content-between">
                            <button
                                type="button" className="btn btn-warning label-btn rounded-pill"
                                onClick={() => navigate.push("/apps/CostControl/BiayaKontruksi/DaftarProyekBk")}
                            >
                                <i className="ri-arrow-left-line label-btn-icon me-2 rounded-pill" />
                                kembali
                            </button>
                            <button
                                type="button" className="btn btn-primary label-btn rounded-pill"
                                onClick={() => setOpenModalUpload({ id_proyek: params.get("id"), open_modal: true })}
                            // onClick={() => console.log("test")}
                            // onClick={() => navigate.push("/apps/CostControl/Rapa/DaftarRapa")}
                            >
                                <i className="ri-add-circle-line label-btn-icon me-2 rounded-pill" />
                                Input Biaya Konstruksi
                            </button>

                        </Card.Header>
                        <Card.Body>
                            <h5>Kode Proyek : {dataProyek.kode_proyek}</h5>
                            <h5>Nama Proyek : {dataProyek.nama_proyek}</h5>
                            <h5>Tanggal Awal Kontrak :  {formatdate(dataProyek.tanggal_awal_kontrak)}</h5>
                            <h5>Tanggal Berakhir Kontrak : {formatdate(dataProyek.tanggal_akhir_kontrak)}</h5>
                            <h5>RAB (Rincian Anggaran Biaya) : {toCurrency(dataProyek.biaya_rab)}</h5>
                            <h5>RAP (Rincian Anggaran Proyek) : {toCurrency(dataProyek.biaya_rap)}</h5>
                            <h5>Pendapatan Usaha : {toCurrency(dataProyek.total_pu)}</h5>
                            <h5>Posisi Biaya Konstruksi : {toCurrency(dataProyek.total_bk)}</h5>
                            <h5>Material On Site: {toCurrency(dataProyek.nominal_mos)}</h5>
                            <h5>BK / PU Awal : {dataProyek.bk_pu_awal}</h5>
                            <h5>Persentase BK/PU : {formatPercent(calcPercentage(dataProyek.total_bk, dataProyek.total_pu))}</h5>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Data RAPA
                            </div>
                        </Card.Header>
                        <Card.Body>

                            <div className="table-responsive">
                                <BasicTableCostControl column={COLUMNS} datatable={dataTable} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )

}

DetailProyekBk.layout = "ContentlayoutVms";

export default DetailProyekBk;