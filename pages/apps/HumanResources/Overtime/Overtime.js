import { Button } from "@mui/material";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import CreateOvertime from "./Component/modals/CreateOvertime";
import DashboardOvertime from "./Component/DashboardOvertime";
import PengajuanOvertime from "./Component/PengajuanOvertime";
import CreatePengajuanOvertime from "./Component/modals/CreatePengajuanOvertime";
import ApprovalOvertime from "./Component/ApprovalOvertime";
import DetailOvertime from "./Component/modals/DetailOvertime";
import { useState } from "react";

const Overtime = ({loader, setLoader}) => {
    const [openModalPengajuan, setOpenModalPengajuan] = useState({
        open: false
    })

    const [openModalAdd, setOpenModalAdd] = useState({
        open: false
    })
     const [detailOvertime, setDetailOvertime] = useState({
        open: false,
        data:{}
    })

    return(
        <Row>
            <CreateOvertime loader={loader} setLoader={setLoader} openModal={openModalAdd} setOpenModal={setOpenModalAdd} />
            <CreatePengajuanOvertime loader={loader} setLoader={setLoader} openModal={openModalPengajuan} setOpenModal={setOpenModalPengajuan} />
            <DetailOvertime loader={loader} setLoader={setLoader} openModal={detailOvertime} setOpenModal={setDetailOvertime}/>
            <Col xl={12}>
                <Card className="custom-card">

                    <Card.Body>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Nav className="nav-tabs mb-3 nav-justified nav-style-1 d-sm-flex d-block" role="tablist" defaultActiveKey="first">
                                <Nav.Item> <Nav.Link href="#pengajuan_overtime" eventKey="first" >Pengajuan Lembur</Nav.Link> </Nav.Item>
                                <Nav.Item> <Nav.Link href="#overtime" eventKey="second" >Lembur</Nav.Link> </Nav.Item>
                                <Nav.Item> <Nav.Link href="#approval_overtime" eventKey="third">Approval</Nav.Link> </Nav.Item>
                            </Nav>
                            <Tab.Content id="myTabContent">
                                <Tab.Pane role="tabpanel" className="tab-pane text-muted" id="pengajuan_overtime" eventKey="first">
                                    <Col xl={12} className="d-flex justify-content-end">
                                            <Button variant="contained" color="success" onClick={() => setOpenModalPengajuan({open: true})}>Tambah Pengajuan Lembur</Button>
                                        </Col>
                                        <Col xl={12}>
                                            <PengajuanOvertime loader={loader} setLoader={setLoader} detailOvertime={detailOvertime} setDetailOvertime={setDetailOvertime} />
                                        </Col>
                                        
                                </Tab.Pane>
                                <Tab.Pane role="tabpanel" className="tab-pane text-muted" id="overtime" eventKey="second">
                                    <Row className="d-flex gap-3">
                                        <Col xl={12} className="d-flex justify-content-end">
                                            <Button variant="contained" color="success" onClick={() => setOpenModalAdd({open: true})}>Tambah Lembur</Button>
                                        </Col>
                                        <Col xl={12}>
                                            <DashboardOvertime loader={loader} setLoader={setLoader}/>
                                        </Col>
                                    </Row>
                                   
                                </Tab.Pane>
                                <Tab.Pane role="tabpanel" className="tab-pane text-muted" id="approval_overtime" eventKey="third">
                                    <Col xl={12}>
                                        <ApprovalOvertime loader={loader} setLoader={setLoader} />
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


export default Overtime;