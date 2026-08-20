import { Button } from "@mui/material";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import CreatePayrollMaster from "./Component/Modals/CreatePayrollMaster";
import PayrollMaster from "./Component/MonitoringPayroll";
import MonthlyPayroll from "./Component/MonthlyPayroll";
import { useState } from "react";


const Payroll = ({ loader, setLoader }) => {
    const [openModalAdd, setOpenModalAdd] = useState({
        open: false
    });
    const [reload, setReload] = useState(false);
    
    return (
        <Row>
            <CreatePayrollMaster loader={loader} setLoader={setLoader} openModal={openModalAdd} setOpenModal={setOpenModalAdd} reload={reload} setReload={setReload} />
            <Col xl={12}>
                <Card className="custom-card">

                    <Card.Body>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Nav className="nav-tabs mb-3 nav-justified nav-style-1 d-sm-flex d-block" role="tablist" defaultActiveKey="first">
                                <Nav.Item> <Nav.Link href="#master_payroll" eventKey="first" >Master Payroll</Nav.Link> </Nav.Item>
                                <Nav.Item> <Nav.Link href="#payroll" eventKey="second" >Monthly Payroll</Nav.Link> </Nav.Item>
                            </Nav>
                            <Tab.Content id="myTabContent">
                                <Tab.Pane role="tabpanel" className="tab-pane text-muted" id="master_payroll" eventKey="first">
                                    <Col xl={12} className="d-flex justify-content-end mb-2">
                                        <Button variant="contained" color="success" onClick={() => setOpenModalAdd({ open: true })}>Tambah Master Payroll</Button>
                                    </Col>
                                    <Col xl={12}>
                                        <PayrollMaster loader={loader} setLoader={setLoader} reload={reload} />
                                    </Col>
                                </Tab.Pane>
                                <Tab.Pane role="tabpanel" className="tab-pane text-muted" id="payroll" eventKey="second">
                                    <Col xl={12}>
                                        <MonthlyPayroll loader={loader} setLoader={setLoader} />
                                    </Col>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}


export default Payroll;