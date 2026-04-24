import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import { useState } from "react";
import DashboardAttendance from "@/pages/apps/HumanResources/Attendance/Component/DashboardAttendance";
import { Button } from "@mui/material";
import CreateAbsensi from "../Attendance/Component/modals/CreateAbsensi";
import PengajuanAttendance from "../Attendance/Component/PengajuanAttendance";
import CreatePengajuanAbsensi from "@/pages/apps/HumanResources/Attendance/Component/modals/CreatePengajuanAbsensi";
import ApprovalAttendance from "@/pages/apps/HumanResources/Attendance/Component/ApprovalAttendance";
import DetailAbsensi from "@/pages/apps/HumanResources/Attendance/Component/modals/DetailAbsensi";

const Attendance = ({ loader, setLoader }) => {
    const COLUMNS = [
        {
            Header: "NIP",
            accessor: "nip",
        },
        {
            Header: "Nama",
            accessor: "nama",
        },
        {
            Header: "Jabatan",
            accessor: "jabatan",
        },
        {
            Header: "Jenis Kelamin",
            accessor: "jenis_kelamin",
        },
        {
            Header: "Status Karyawan",
            accessor: "status_karyawan",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Grade",
            accessor: "grade",
        },
        //  
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];

    const [datatable, setDatatable] = useState([]);
    const [openModalAdd, setOpenModalAdd] = useState({
        open: false
    })
    const [openModalAddPengajuan, setOpenModalAddPengajuan] = useState({
        open: false
    })

    const [detailAbsensi, setDetailAbsensi] = useState({
        open: false,
        data:{}
    })

    return (
        <Row>
            <CreateAbsensi openModal={openModalAdd} setOpenModal={setOpenModalAdd} loader={loader} setLoader={setLoader} />
            <CreatePengajuanAbsensi openModal={openModalAddPengajuan} setOpenModal={setOpenModalAddPengajuan} loader={loader} setLoader={setLoader} />
            <DetailAbsensi openModal={detailAbsensi} setOpenModal={setDetailAbsensi} loader={loader} setLoader={setLoader}/>
            <Col xl={12}>
                <Card className="custom-card">

                    <Card.Body>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Nav className="nav-tabs mb-3 nav-justified nav-style-1 d-sm-flex d-block" role="tablist" defaultActiveKey="first">
                                <Nav.Item> <Nav.Link href="#dashboard" eventKey="first" >Pengajuan Absensi</Nav.Link> </Nav.Item>
                                <Nav.Item> <Nav.Link href="#absensi" eventKey="second" >Absensi</Nav.Link> </Nav.Item>
                                <Nav.Item> <Nav.Link href="#approval" eventKey="third">Approval</Nav.Link> </Nav.Item>
                            </Nav>
                            <Tab.Content id="myTabContent">
                                <Tab.Pane role="tabpanel" className="tab-pane text-muted" id="dashboard" eventKey="first">
                                    <Col xl={12} className="d-flex justify-content-end">
                                            <Button variant="contained" color="success" onClick={() => setOpenModalAddPengajuan({open: true})}>Tambah Pengajuan Absensi</Button>
                                        </Col>
                                        <Col xl={12}>
                                            <PengajuanAttendance loader={loader} setLoader={setLoader} detailAbsensi={detailAbsensi} setDetailAbsensi={setDetailAbsensi}/>
                                        </Col>
                                        
                                </Tab.Pane>
                                <Tab.Pane role="tabpanel" className="tab-pane text-muted" id="absensi" eventKey="second">
                                    <Row className="d-flex gap-3">
                                        <Col xl={12} className="d-flex justify-content-end">
                                            <Button variant="contained" color="success" onClick={() => setOpenModalAdd({open: true})}>Tambah Absensi</Button>
                                        </Col>
                                        <Col xl={12}>
                                            <DashboardAttendance loader={loader} setLoader={setLoader}/>
                                        </Col>
                                    </Row>
                                   
                                </Tab.Pane>
                                <Tab.Pane role="tabpanel" className="tab-pane text-muted" id="approval" eventKey="third">
                                    <Col xl={12}>
                                        <ApprovalAttendance loader={loader} setLoader={setLoader}/>
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

export default Attendance;