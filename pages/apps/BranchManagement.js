

import React, { Fragment, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "./Component/PageHeaderVms";
import BasicTableVendor  from "./DataTables/DataTablesVendor";
const BranchManagement= () => {
    const DATATABLE = [
        {
            kode_branch: "002",
            nama_branch: "Surabaya",
            
        },
    ];
    const COLUMNS = [
        {
            Header: "Kode Branch",
            accessor: "kode_branch",
        },
        {
            Header: "Nama Branch",
            accessor: "nama_branch",
        }
    ];
    return (
        <Fragment>
            <Seo title={"Branch Management"} />
            <PageHeaderVms title='Branch Management' item='Settings' active_item='Branch Management' />

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Branch Management
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
BranchManagement.layout = "ContentlayoutVms";
export default BranchManagement;
