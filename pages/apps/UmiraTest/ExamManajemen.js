import { Button } from "@mui/material";
import { Fragment, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import LoadersSimUmira from "../Component/LoaderSimUmira";
import ListExam from "./component/ListExam";
import CreateExam from "./component/modals/CreateExam";


const ExamManajemen = () => {
    const [openModalAdd, setOpenModalAdd] = useState({
        open: false
    })
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);
    return(
         <Fragment>
            <Seo title={"Exam Manajemen"} />
            <PageHeaderVms title='Exam Manajemen' item='Exam' active_item='Exam Manajemen' />
            <LoadersSimUmira open={loader} />
            <CreateExam openModal={openModalAdd} setOpenModal={setOpenModalAdd} loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
            <Row className="d-flex gap-3">
                <Col xl={12} className="d-flex justify-content-end">
                    <Button variant="contained" color="success" onClick={() => setOpenModalAdd({open: true})}>Tambah Exam</Button>
                </Col>
                <Col xl={12}>
                    <ListExam loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
                </Col>
            </Row>
        </Fragment>
    )
}


ExamManajemen.layout = "ContentlayoutVms";
export default ExamManajemen;
