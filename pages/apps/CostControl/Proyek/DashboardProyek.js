import Seo from "@/shared/layout-components/seo/seo";
import { Card, Col, Row } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";
import { Dashboard } from "@mui/icons-material";
import { Fragment, useEffect, useState } from "react";
import PageHeaderVms from "../../Component/PageHeaderVms";


const DashboardProyek = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const toCurrency = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(val || 0));

    const calcRabAkhir = (rab, kurang, tambah) => {
        return (Number(rab) || 0) - (Number(kurang) || 0) + (Number(tambah) || 0);
    };

    const calcBkAfterMos = (bk, mos) => {
        const totalBk = Number(bk) || 0;
        const totalMos = Number(mos) || 0;
        return totalBk - totalMos;
    };

    const formatPercent = (value, digits = 2) => `${Number(value).toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
    
    const calcPercentage = (part, total) => {
        const t = Number(total) || 0;
        if (t === 0) return 0;
        const p = (Number(part) / t) * 100;
        return p;
    }

    const getAllProyek = async () => {
        setLoading(true);
        try {
            const res = await apiConfig.get(
                process.env.NEXT_PUBLIC_API_URL + "/CostControl/Proyek/get-proyek",
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            console.log("DATA PROYEK:", res.data.data); // DEBUG
            setData(res.data.data || []);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        getAllProyek();
    }, []);

    return (
        <>
            <Fragment>
                <Seo title={"Detail Material On-Site Proyek"} />

                <PageHeaderVms title='Material On-Site' item='Daftar Material On-Site' active_item='Detail Material On-Site' />
                <LoadersSimUmira open={loader} />
                {data.length === 0 ? (
                    <p className="text-muted">Belum ada data proyek</p>
                ) : (
                    data.map((p) => (
                        <Row>
                            <Col xl={12}>
                                <Card className="custom-card">
                                    <Card.Body>
                                        <h5>Kode Proyek : {p.kode_proyek}</h5>
                                        <h5>Nama Proyek : {p.nama_proyek}</h5>
                                        <h5>Tanggal Awal Kontrak : {p.tanggal_awal_kontrak}</h5>
                                        <h5>Tanggal Berakhir Kontrak : {p.tanggal_kontrak}</h5>
                                        <h5>RAB (Rincian Anggaran Biaya) : {toCurrency(p.biaya_rab)}</h5>
                                        <h5 className="fw-bold">
                                            RAB Terkini :{" "}
                                            {toCurrency(
                                                calcRabAkhir(
                                                    p.biaya_rab,
                                                    p.kerja_kurang_total,
                                                    p.kerja_tambah_total
                                                )
                                            )}
                                        </h5>
                                        <h5>RAP (Rincian Anggaran Proyek) : {toCurrency(p.biaya_rap)}</h5>
                                        <h5>Pendapatan Usaha : {toCurrency(p.total_pu)}</h5>
                                        <h5>Material On Site : {toCurrency(p.nominal_mos)}</h5>
                                        <h5>
                                            Posisi Biaya Konstruksi :{" "}
                                            {toCurrency(calcBkAfterMos(p.total_bk, p.nominal_mos))}
                                        </h5>
                                        <h5>BK / PU Awal : {p.bk_pu_awal}</h5>
                                        <h5>Persentase BK/PU : {formatPercent(calcPercentage(p.total_bk, p.total_pu))}</h5>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )))}
            </Fragment>
        </>
    );
};

DashboardProyek.layout = "ContentLayoutVms";
export default DashboardProyek;
