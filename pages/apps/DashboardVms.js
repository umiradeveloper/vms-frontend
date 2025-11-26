import React, { Fragment } from "react";
import PageHeaderVms from "./Component/PageHeaderVms";
import { Card, Col, Row, ProgressBar, Button, Form, Dropdown, Table, Pagination, Container } from "react-bootstrap";
import Link from "next/link";
import { BudgetTask, MobileAppDesign, ProjectBudget, TASKS, WebsiteAppDesign, WebsiteDesign } from "../../shared/data/dashboard/dashboarddata";
import Seo from "../../shared/layout-components/seo/seo";
const DashboardVms = () => {
    return (
        <Fragment>
            <Seo title="Dashboard" />
            <PageHeaderVms title="Welcome To Sistem Informasi Manajemen (SIM) Umira" item="Home" active_item="Sistem Informasi Manajemen" />
            {/* <!--Row--> */}
            <Row className="row-sm">
                
                
            </Row>
            {/* <!-- Row end --> */}
        </Fragment>
    );
};
DashboardVms.layout = "ContentlayoutVms";

export default DashboardVms;
