import React, { Fragment, useState } from "react";
import PageHeaderVms from "./Component/PageHeaderVms";
import { Card, Col, Row, ProgressBar, Button, Form, Dropdown, Table, Pagination, Container } from "react-bootstrap";
import Link from "next/link";
import { BudgetTask, MobileAppDesign, ProjectBudget, TASKS, WebsiteAppDesign, WebsiteDesign } from "../../shared/data/dashboard/dashboarddata";
import Seo from "../../shared/layout-components/seo/seo";
import { Divider } from "@mui/material";
import CostControlSection from "./DashboardComponent/CostControlSection/CostControlSection";
import ChecklistPembayaranSection from "./DashboardComponent/ChecklistPembayaranSection/ChecklistPembayaranSection";
import VendorManagementSystemSection from "./DashboardComponent/VendorManagementSystemSection/VendorManagementSystemSection";
import LoadersSimUmira from "./Component/LoaderSimUmira";

const DashboardVms = () => {
    const [loader, setLoader] = useState(false);

    return (
        <Fragment>
            <Seo title="Dashboard" />
            <LoadersSimUmira open={loader} />
            {/* <PageHeaderVms title="Welcome To Sistem Informasi Manajemen (SIM) Umira" item="Home" active_item="Sistem Informasi Manajemen" /> */}
            {/* <!--Row--> */}
            <Row className="row-sm g-4 m-2">
                <Col xl={12}>
                    <Card
                        className="border-0 overflow-hidden shadow-lg position-relative"
                        style={{
                            borderRadius: "28px",
                            background:
                                "linear-gradient(135deg, #6259ca 0%, #4b6cb7 100%)",
                        }}
                    >
                        <Card.Body className="p-0">
                            <Row className="align-items-center">

                                {/* Left Content */}
                                <Col xl={7} lg={7} md={12}>
                                    <div className="p-5 position-relative z-1">

                                        <div
                                            className="mb-3 d-inline-flex align-items-center px-3 py-2"
                                            style={{
                                                background: "rgba(255,255,255,0.15)",
                                                borderRadius: "50px",
                                                backdropFilter: "blur(10px)",
                                            }}
                                        >
                                            <span className="text-white fw-semibold">
                                                Welcome Back 👋
                                            </span>
                                        </div>

                                        <h1
                                            className="fw-bold text-white mb-3"
                                            style={{
                                                fontSize: "42px",
                                                lineHeight: "1.2",
                                            }}
                                        >
                                            Welcome To <br />
                                            SIM Umira Dashboard
                                        </h1>

                                        <p
                                            className="text-white mb-4"
                                            style={{
                                                opacity: 0.85,
                                                fontSize: "16px",
                                                maxWidth: "600px",
                                                lineHeight: "1.8",
                                            }}
                                        >
                                            Monitor progress cost control, checklist pembayaran,
                                            vendor management system, and company performance in
                                            one integrated dashboard system.
                                        </p>


                                    </div>
                                </Col>

                                {/* Right Image */}
                                <Col
                                    xl={5}
                                    lg={5}
                                    md={12}
                                    className="text-center position-relative"
                                >
                                    <div className="p-4">

                                        <div
                                            className="position-absolute"
                                            style={{
                                                width: "320px",
                                                height: "320px",
                                                background:
                                                    "rgba(255,255,255,0.08)",
                                                borderRadius: "50%",
                                                top: "50%",
                                                left: "50%",
                                                transform:
                                                    "translate(-50%, -50%)",
                                                filter: "blur(0px)",
                                            }}
                                        />

                                        {/* <img
                                src="../../../assets/images/pngs/dashboard-people.png"
                                alt="dashboard"
                                className="img-fluid position-relative"
                                style={{
                                    maxHeight: "350px",
                                    objectFit: "contain",
                                    zIndex: 2,
                                }}
                            /> */}
                                    </div>
                                </Col>
                            </Row>

                            {/* Decorative Elements */}
                            <div
                                className="position-absolute"
                                style={{
                                    top: "-80px",
                                    right: "-80px",
                                    width: "220px",
                                    height: "220px",
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.08)",
                                }}
                            />

                            <div
                                className="position-absolute"
                                style={{
                                    bottom: "-100px",
                                    left: "-100px",
                                    width: "260px",
                                    height: "260px",
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.06)",
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={12}>
                    <Card
                        className="border-0 overflow-hidden shadow-lg position-relative"
                        style={{
                            borderRadius: "28px",
                            background:
                                "linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)",
                        }}
                    >

                        <Card.Body className="p-0">
                            <Row className="align-items-center">

                                {/* Left Content */}
                                <Col xl={12} lg={12} md={12}>
                                    <Row className="m-2">
                                        <Col xl={12} lg={12} md={12}>
                                            <h4
                                                className="fw-bold text-black m-3"

                                            >
                                                Section Vendor Management System

                                            </h4>
                                            <Divider />
                                        </Col>
                                        <Col xl={12} lg={12} md={12} className="mt-3">
                                           <VendorManagementSystemSection loader={loader} setLoader={setLoader} />
                                        </Col>



                                    </Row>

                                </Col>


                            </Row>

                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card
                        className="border-0 overflow-hidden shadow-lg position-relative"
                        style={{
                            borderRadius: "28px",
                            background:
                                "linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)",
                        }}
                    >
                        <Card.Body className="p-0">
                            <Row className="align-items-center">

                                {/* Left Content */}
                                <Col xl={12} lg={12} md={12}>
                                    <Row className="m-2">
                                        <Col xl={12} lg={12} md={12}>
                                            <h4
                                                className="fw-bold text-black m-3"

                                            >
                                                Section Checklist Pembayaran & LPJ

                                            </h4>
                                            <Divider />
                                        </Col>
                                        <Col xl={12} lg={12} md={12} className="mt-3">
                                           <ChecklistPembayaranSection loader={loader} setLoader={setLoader} />
                                        </Col>

                                    </Row>

                                </Col>


                            </Row>


                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={12}>
                    <Card
                        className="border-0 overflow-hidden shadow-lg position-relative"
                        style={{
                            borderRadius: "28px",
                            background:
                                "linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)",
                        }}
                    >
                        <Card.Body className="p-0">
                            <Row className="align-items-center">

                                {/* Left Content */}
                                <Col xl={12} lg={12} md={12}>
                                    <Row className="m-2">
                                        <Col xl={12} lg={12} md={12}>
                                            <h4
                                                className="fw-bold text-black m-3"

                                            >
                                                Section Cost Control
                                            </h4>
                                            <Divider />
                                        </Col>
                                        <Col xl={12} lg={12} md={12} className="mt-3">
                                            <Row>
                                                <Col sm={12} md={12} lg={12} xl={12}>
                                                    <CostControlSection loader={loader} setLoader={setLoader} />
                                                </Col>
                                                

                                            </Row>
                                        </Col>



                                    </Row>

                                </Col>


                            </Row>


                        </Card.Body>
                    </Card>
                </Col>

            </Row>
            {/* <!-- Row end --> */}
        </Fragment>
    );
};
DashboardVms.layout = "ContentlayoutVms";

export default DashboardVms;
