

import React, { Fragment, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "./Component/PageHeaderVms";
import  BasicTableVendor  from "./DataTables/DataTablesVendor";
const RolesManagement= () => {
    const DATATABLE = [
        {
            kode_role: "00",
            nama_role: "Administrator",
        },
        {
            kode_role: "99",
            nama_role: "Vendor",
        },
    ];
    const COLUMNS = [
        {
            Header: "Kode Role",
            accessor: "kode_role",
        },
        {
            Header: "Nama Role",
            accessor: "nama_role",
        },
    ];
    return (
        <Fragment>
            <Seo title={"Roles Management"} />
            <PageHeaderVms title='Roles Management' item='Settings' active_item='Roles Management' />

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Roles Management
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">
                                <BasicTableVendor column={COLUMNS} datatable={DATATABLE} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Responsive Datatable
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <ResponsiveDataTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}
            

        </Fragment>
    );
};
RolesManagement.layout = "ContentlayoutVms";
export default RolesManagement;
