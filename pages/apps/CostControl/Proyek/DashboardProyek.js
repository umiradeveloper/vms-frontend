import Seo from "@/shared/layout-components/seo/seo";
import { Accordion, Card, Col, Container, ListGroup, Row, useAccordionButton } from "react-bootstrap";
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
                process.env.NEXT_PUBLIC_API_URL + "/CostControl/Proyek/get-proyek-dashboard",
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
    function TextScurve({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!'),
        );

        return (
            <p
                onClick={decoratedOnClick}
            >
                {children}
            </p>
        );
    }

    return (
        <>
            <Fragment>
                <Seo title={"Detail Material On-Site Proyek"} />

                <PageHeaderVms title='Material On-Site' item='Daftar Material On-Site' active_item='Detail Material On-Site' />
                <LoadersSimUmira open={loader} />
                <Container>
                    <Row>
                        {data.length === 0 ? (
                            <p className="text-muted">Belum ada data proyek</p>
                        ) : (
                            data.map((p) => (
                                <Col xl={4}>
                                    <Card className="custom-card">
                                        <Card.Body>
                                            <h2>{p.proyek.nama_proyek}</h2>
                                            <hr />
                                            <h5>Plan (S Curve) : {(p.proyek.scurve.length > 0)?
                                            <Accordion>
                                                <TextScurve eventKey={0+p.proyek.id_proyek}> week {p.proyek.scurve[0].week} - {toCurrency(p.proyek.scurve[0].nominal_scurve)}</TextScurve>
                                                <Accordion.Collapse eventKey={0+p.proyek.id_proyek}>
                                                    <Card.Body>
                                                        <ListGroup>
                                                            {p.proyek.scurve.length > 0 && (
                                                                p.proyek.scurve.map((s) => (
                                                                    <ListGroup.Item key={s.id_scurve}>week {s.week} - {s.tanggal_awal} sd {s.tanggal_akhir} - {toCurrency(s.nominal_scurve)}</ListGroup.Item>
                                                                ))
                                                            )}
                                                        </ListGroup>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Accordion>
                                            :""}</h5>
                                            {/* <h5>Plan (S Curve) : {(p.scurve.length > 0) ?
                                                <Accordion>
                                                    week {p.scurve[0].week} - {toCurrency(p.scurve[0].nominal_scurve)}

                                                    <Accordion.Collapse eventKey="0">
                                                        <Card.Body>Hello! I'm the body</Card.Body>
                                                    </Accordion.Collapse>
                                                </Accordion>
                                                : ""}
                                            </h5> */}
                                            <hr />

                                            <h5>Plan (Action Plan) : {(p.proyek.action_plan.length > 0) ?
                                                 <Accordion>
                                                        <TextScurve eventKey={1+p.proyek.id_proyek}> week {p.proyek.action_plan[0].week} - {toCurrency(p.proyek.action_plan[0].nominal_scurve)}</TextScurve>
                                                        <Accordion.Collapse eventKey={1+p.proyek.id_proyek}>
                                                            <Card.Body>
                                                                <ListGroup>
                                                                    {p.proyek.action_plan.length > 0 && (
                                                                        p.proyek.action_plan.map((a) => (
                                                                            <ListGroup.Item key={a.id_action_plan}>week {a.week} - {a.tanggal_awal} sd {a.tanggal_akhir} - {toCurrency(a.nominal_action_plan)}</ListGroup.Item>
                                                                        ))
                                                                    )}
                                                                </ListGroup>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                </Accordion>
                                                : ""}</h5>
                                            <hr />
                                            <h5>RAB (Rincian Anggaran Biaya) : {toCurrency(p.proyek.biaya_rab)}</h5>
                                            <h5 className="fw-bold">
                                                RAB Terkini :{" "}
                                                {toCurrency(
                                                    calcRabAkhir(
                                                        p.proyek.biaya_rab,
                                                        p.kerja_kurang_total,
                                                        p.kerja_tambah_total
                                                    )
                                                )}
                                            </h5>
                                            <h5>RAP (Rincian Anggaran Proyek) : {toCurrency(p.proyek.biaya_rap)}</h5>
                                            <h5>Material On Site : {(p.proyek.mos.length > 0)?
                                                <Accordion>
                                                        <TextScurve eventKey={2+p.proyek.id_proyek}> week {p.proyek.mos[0].week} - {toCurrency(p.proyek.mos[0].nominal_mos)}</TextScurve>
                                                        <Accordion.Collapse eventKey={2+p.proyek.id_proyek}>
                                                            <Card.Body>
                                                                <ListGroup>
                                                                    {p.proyek.mos.length > 0 && (
                                                                        p.proyek.mos.map((m) => (
                                                                            <ListGroup.Item key={m.id_mos}>week {m.week} - {m.tanggal_awal} sd {m.tanggal_akhir} - {toCurrency(m.nominal_mos)}</ListGroup.Item>
                                                                        ))
                                                                    )}
                                                                </ListGroup>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                </Accordion>
                                            
                                            :""}</h5>
                                            <h5>
                                                Posisi Biaya Konstruksi :{" "}
                                                {toCurrency(calcBkAfterMos(p.total_bk, (p.proyek.mos.length>0)?p.proyek.mos[0].nominal_mos:0))}
                                            </h5>
                                            <h5>Pendapatan Usaha : {toCurrency(p.total_pu)}</h5>
                                            <h5>BK / PU Awal : {p.proyek.bk_pu_awal}</h5>
                                            <h5>Persentase BK/PU : {formatPercent(calcPercentage(p.total_bk, p.total_pu))}</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )))}
                    </Row>
                </Container>
            </Fragment>
        </>
    );
};

DashboardProyek.layout = "ContentlayoutVms";
export default DashboardProyek;
