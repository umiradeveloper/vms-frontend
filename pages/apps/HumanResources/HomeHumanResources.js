import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import { Fragment, useEffect, useState } from "react";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import Employee from "./Employee/Employee";
import Attendance from "./Attendance/Attendance";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import Cuti from "./Cuti/Cuti";
import Reimbursement from "./Reimbursement/Reimbursement";

const HomeHumanResources = () => {

    const [loader, setLoader] = useState(false);

    useEffect(() => { }, [loader])
    return (

        <Fragment>
            <Seo title={"Human Resources System"} />
            <PageHeaderVms title='Human Resources' item='Human Resources' active_item='HR System' />
            <LoadersSimUmira open={loader} />
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                HR System
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Tab.Container defaultActiveKey="first">
                                <Nav className="nav-tabs tab-style-1 d-sm-flex d-block" defaultActiveKey="first">
                                    <Nav.Item> <Nav.Link eventKey="first" href="#employee">Employee</Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link eventKey="second" href="#accepted">Absensi</Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link eventKey="third" href="#declined">Lembur</Nav.Link> </Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="fourth" href="#cuti">Cuti</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="fifth" href="#reimbursement">Reimbursement</Nav.Link></Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane id="employee" role="tabpanel" eventKey="first">
                                        <Employee loader={loader} setLoader={setLoader} />
                                    </Tab.Pane>
                                    <Tab.Pane id="accepted" role="tabpanel" eventKey="second">
                                        <Attendance loader={loader} setLoader={setLoader} />
                                    </Tab.Pane>
                                    <Tab.Pane id="declined" role="tabpanel" eventKey="third">
                                        <div className="text-muted">There are many variations of passages of Lorem
                                            Ipsum available, but the majority have suffered alteration in some form,
                                            <b>by injected humour</b>, or randomised words which don't look even
                                            slightly believable
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane id="cuti" role="tabpanel" eventKey="fourth">
                                        <Cuti loader={loader} setLoader={setLoader} />
                                    </Tab.Pane>
                                    <Tab.Pane id="reimbursement" role="tabpanel" eventKey="fifth">
                                        <Reimbursement loader={loader} setLoader={setLoader} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Card.Body>

                    </Card>
                </Col>



            </Row>
        </Fragment>
    )
}
HomeHumanResources.layout = "ContentlayoutVms";
export default HomeHumanResources;
