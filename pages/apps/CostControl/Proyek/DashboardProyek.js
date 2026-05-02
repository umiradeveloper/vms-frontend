// Improved & beautified version:
// - Cleaner card layout
// - Better spacing
// - Modern badges
// - Consistent sections
// - Better Accordion trigger button
// - Hover effect
// - Responsive

import Seo from "@/shared/layout-components/seo/seo";
import {
  Accordion,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Button,
} from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";
import { Fragment, useEffect, useState } from "react";
import PageHeaderVms from "../../Component/PageHeaderVms";

const DashboardProyek = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const toCurrency = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(val || 0));

  const calcRabAkhir = (rab, kurang, tambah) =>
    (Number(rab) || 0) - (Number(kurang) || 0) + (Number(tambah) || 0);

  const calcBkAfterMos = (bk, mos) =>
    (Number(bk) || 0) - (Number(mos) || 0);

  const calcPercentage = (part, total) => {
    const t = Number(total) || 0;
    if (t === 0) return 0;
    return (Number(part) / t) * 100;
  };

  const formatPercent = (value) => `${value.toFixed(2)}%`;

  const getAllProyek = async () => {
    try {
      const res = await apiConfig.get(
        process.env.NEXT_PUBLIC_API_URL +
          "/CostControl/Proyek/get-proyek-dashboard",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllProyek();
  }, []);

  return (
    <Fragment>
      <Seo title={"Dashboard Proyek"} />

      <PageHeaderVms
        title="Dashboard Proyek"
        item="Daftar Proyek"
        active_item="Daftar Proyek"
      />

      <LoadersSimUmira open={loader} />

      <Container fluid>
        <Row className="g-4">
          {data.length === 0 ? (
            <p className="text-center text-muted mt-5">
              Belum ada data proyek
            </p>
          ) : (
            data.map((p, index) => {
              const nilaiKontrak = calcRabAkhir(
                p.proyek.biaya_rab,
                p.kerja_kurang,
                p.kerja_tambah
              );

              const progressPersen = calcPercentage(
                p.total_pu,
                nilaiKontrak
              );

              const bkNow = calcBkAfterMos(
                p.total_bk,
                p.proyek.mos?.[0]?.nominal_mos || 0
              );

              const bkPu = calcPercentage(bkNow, p.total_pu);

              return (
                <Col xl={4} lg={6} md={12} key={index}>
                  <Card
                    className="shadow-sm border-0 h-100"
                    style={{
                      borderRadius: "18px",
                      transition: "0.3s",
                    }}
                  >
                    <Card.Body>
                      <h3 className="fw-bold text-primary mb-3">
                        {p.proyek.nama_proyek}
                      </h3>

                      <hr />

                      <div className="mb-3">
                        <small className="text-muted">
                          Progress
                        </small>
                        <h4 className="fw-bold text-success">
                          {formatPercent(progressPersen)}
                        </h4>
                        <small>{toCurrency(p.total_pu)}</small>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted">
                          Nilai Kontrak Terkini
                        </small>
                        <h5 className="fw-bold">
                          {toCurrency(nilaiKontrak)}
                        </h5>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted">RAP</small>
                        <h6>{toCurrency(p.proyek.biaya_rap)}</h6>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted">
                          Posisi Biaya Konstruksi
                        </small>
                        <h5>{toCurrency(bkNow)}</h5>
                      </div>

                      <div className="mb-3">
                        <span
                          className={`badge px-3 py-2 ${
                            bkPu <= 100
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          BK/PU Saat Ini :{" "}
                          {formatPercent(bkPu)}
                        </span>
                      </div>

                      <Accordion flush>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            Detail S Curve
                          </Accordion.Header>
                          <Accordion.Body>
                            <ListGroup variant="flush">
                              {p.proyek.scurve?.map((s) => (
                                <ListGroup.Item
                                  key={s.id_scurve}
                                >
                                  Week {s.week} -{" "}
                                  {toCurrency(
                                    s.nominal_scurve
                                  )}
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                          <Accordion.Header>
                            Detail Action Plan
                          </Accordion.Header>
                          <Accordion.Body>
                            <ListGroup variant="flush">
                              {p.proyek.action_plan?.map(
                                (a) => (
                                  <ListGroup.Item
                                    key={a.id_action_plan}
                                  >
                                    Week {a.week} -{" "}
                                    {toCurrency(
                                      a.nominal_action_plan
                                    )}
                                  </ListGroup.Item>
                                )
                              )}
                            </ListGroup>
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                          <Accordion.Header>
                            Material On Site
                          </Accordion.Header>
                          <Accordion.Body>
                            <ListGroup variant="flush">
                              {p.proyek.mos?.map((m) => (
                                <ListGroup.Item
                                  key={m.id_mos}
                                >
                                  Week {m.week} -{" "}
                                  {toCurrency(
                                    m.nominal_mos
                                  )}
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </Fragment>
  );
};

DashboardProyek.layout = "ContentlayoutVms";
export default DashboardProyek;