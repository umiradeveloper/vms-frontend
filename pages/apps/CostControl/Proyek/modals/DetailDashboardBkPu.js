import { Divider } from "@mui/material";
import { Button, Col, Modal, Row } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import { useEffect, useState } from "react";
import BasicTableCostControl from "../../../DataTables/DataTablesCostControl";
import dynamic from "next/dynamic";


const DetailDashboardBkPu = ({openModal, setOpenModal, loader, setLoader}) => {
    const [BkPu, setBkPu] = useState([]); 
    const [dataTable, setDataTable] = useState([]);
    const COLUMNS = [
        {
            Header: "Week",
            accessor: "week",
        },
        {
            Header: "Start Date",
            accessor: "start_date",
        },
        {
            Header: "End Date",
            accessor: "end_date",
        },

        {
            Header: "Biaya Konstruksi",
            accessor: "biaya_konstruksi",
        },
        {
            Header: "Biaya Konstruksi Saat Ini",
            accessor: "biaya_konstruksi_saat_ini",
        },
        {
            Header: "Pendapatan Usaha",
            accessor: "pendapatan_usaha",
        },
        {
            Header: "Pendapatan Usaha Saat Ini",
            accessor: "pendapatan_usaha_saat_ini",
        },
        {
            Header: "Material On Site",
            accessor: "mos",
        },
        {
            Header: "BK/PU",
            accessor: "bk_pu",
        },
        {
            Header: "BK/PU Saat Ini",
            accessor: "bk_pu_saat_ini",
        }
    ];
    const toCurrency = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Number(val || 0));

    const calcPercentage = (part, total) => {
        const t = Number(total) || 0;
        if (t === 0) return 0;
        return ((Number(part) / t) * 100).toFixed(2);
    };


    const getWeekByProject = async() => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-bk-pu-by-week?id_project=" + openModal.data_proyek?.id_proyek, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status) {
                const arrBk = [];
                console.log(result);
                if(result.data.data.length > 0){
                    for(const res of result.data.data){
                        // let bkAfterMos = (res.bk)?Number(res.bk) - Number(res.mos):0
                        // console.log((res.bk - res.mos)/res.pu);
                        arrBk.push({
                            week: (res.week)?"Week "+res.week:"-",
                            start_date: res.startDate,
                            end_date: res.endDate,
                            biaya_konstruksi: (res.bk)?toCurrency(res.bk):toCurrency(0),
                            biaya_konstruksi_saat_ini: toCurrency(res.kumulativeBk),
                            pendapatan_usaha: (res.pu)?toCurrency(res.pu):toCurrency(0),
                            pendapatan_usaha_saat_ini: toCurrency(res.kumulativePu),
                            mos: (res.mos)?toCurrency(res.mos):toCurrency(0),
                            bk_pu: calcPercentage(res.bk - res.mos, res.pu) + " %",
                            bk_pu_saat_ini: calcPercentage(res.kumulativeBk - res.mos, res.kumulativePu) + " %",
                        })
                    }
                }
                setDataTable(arrBk);
                // setBkPu(result.data.data);

            }
            // setLoader(false)
            console.log(result)
        } catch (error) {
            // setLoader(false)
            
            console.log("e = " + error);
        }finally{
            setLoader(false)
        }
    }

    useEffect(() => {
        if(openModal.open){
            getWeekByProject();
        }
    },[openModal.open])

    return(
         <Modal size="xl" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false });}}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Detail BK/PU</h6>
            </Modal.Header>
            <Modal.Body>
                <h6>Kode Proyek : {openModal.data_proyek?.kode_proyek}</h6>
                <h6>Nama Proyek : {openModal.data_proyek?.nama_proyek}</h6>
                <h6>Tanggal Berakhir Kontrak : {openModal.data_proyek?.tanggal_kontrak}</h6>
                <h6>RAB (Rincian Anggaran Biaya) : {toCurrency(openModal.data_proyek?.biaya_rab)}</h6>
                <h6>RAP (Rincian Anggaran Proyek) : {toCurrency(openModal.data_proyek?.biaya_rap)}</h6>
                <Divider />
                 <div className="table-responsive mt-2">
                    <BasicTableCostControl column={COLUMNS} datatable={dataTable} />
                </div>
                {/* {BkPu && (
                    BkPu?.map((item, index) => (
                            <div key={index} className="mb-3 p-3 border rounded bg-light">
                                
                                <Row className="mb-2">
                                    <Col>
                                        <small className="text-muted">Week : </small>
                                        <div className="fw-bold">{item.week}</div>
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col>
                                        <small className="text-muted">Biaya BK : </small>
                                        <div>{toCurrency(item.bk)}</div>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <small className="text-muted">Pendapatan Usaha : </small>
                                        <div>{toCurrency(item.pu)}</div>
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col>
                                        <small className="text-muted">MOS : </small>
                                        <div>{toCurrency(item.pu)}</div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <small className="text-muted">BK/PU : </small>
                                        <div className="fw-semibold text-success">
                                        </div>
                                    </Col>
                                </Row>

                            </div>
                        ))
                )} */}

               
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant='contained' type="button" className="btn btn-primary" >Upload</Button> */}
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => { setOpenModal({ ...openModal, open: false }); }}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(DetailDashboardBkPu), { ssr: false });