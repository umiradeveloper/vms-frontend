import { useEffect, useState } from "react"
import { Card, Col, Modal, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import dynamic from "next/dynamic";


const DetailLoan = ({ openModal, setOpenModal }) => {
    const COLUMNS = [
        {
            Header: "Bulan",
            accessor: "bulan",
        },
        {
            Header: "Tahun",
            accessor: "tahun",
        },
        {
            Header: "Cicilan Ke",
            accessor: "cicilan_ke",
        },
        {
            Header: "Nominal Cicilan",
            accessor: "nominal_cicilan",
        },
        {
            Header: "Status Cicilan",
            accessor: "status_paid",
        }
    ]
    const [dataTable, setDataTable] = useState([]);
    const [loanInfo, setLoanInfo] = useState({
        nip:"",
        nama:"",
        jabatan:"",
        total_pinjaman:""
    })
    useEffect(() => {
        if (openModal.open) {
            // console.log(openModal.datas);
            const DataArr = [];
            if (openModal.datas.length > 0) {

                for (const datas of openModal.datas) {
                    DataArr.push({
                        bulan: datas.bulan,
                        tahun: datas.tahun,
                        cicilan_ke: datas.cicilan_ke,
                        nominal_cicilan: formatCurrency(datas.nominal_cicilan),
                        status_paid: datas.status
                    })
                }

            }
            if(openModal.loanInfo){
                setLoanInfo(openModal.loanInfo);
            }
            setDataTable(DataArr);

        }
    }, [openModal.open]);
    const formatCurrency = (value) => {
        if (value === null || value === undefined || value === "") {
            return "Rp 0";
        }

        const cleanValue = String(value).replace(/\D/g, "");
        const number = parseInt(cleanValue, 10);

        if (isNaN(number)) {
            return "Rp 0";
        }

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    };
    return (
        <Modal size="xl" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Detail Pinjaman</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xl={12}>
                        <Card className="custom-card">

                            <Card.Header>
                                <Col xl={12}> 

                                <Row className="mb-4">

                                    <Col md={6}>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">
                                                NIP
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={loanInfo.nip}
                                                disabled
                                            />
                                        </div>
                                    </Col>

                                    <Col md={6}>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">
                                                Nama Employee
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={loanInfo.nama}
                                                disabled
                                            />
                                        </div>
                                    </Col>

                                    <Col md={6}>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">
                                                Jabatan
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={loanInfo.jabatan}
                                                disabled
                                            />
                                        </div>
                                    </Col>

                                    <Col md={6}>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">
                                                Total Pinjaman
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={loanInfo.total_pinjaman}
                                                disabled
                                            />
                                        </div>
                                    </Col>

                                </Row>
                                </Col>

                            </Card.Header>
                            <Card.Body>

                                <div className="table-responsive">
                                    <BasicTableCostControl column={COLUMNS} datatable={dataTable} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(DetailLoan), { ssr: false });