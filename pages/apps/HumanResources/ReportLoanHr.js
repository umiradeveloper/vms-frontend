import { Card, Col, Form, Row } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import LoadersSimUmira from "../Component/LoaderSimUmira";

const ReportLoan = () => {
    // return();
    const COLUMNS = [
        {
            Header: "NIP",
            accessor: "nip",
        },
        {
            Header: "Nama",
            accessor: "nama_karyawan",
        },
        {
            Header: "Jabatan",
            accessor: "jabatan",
        },
        {
            Header: "Departemen",
            accessor: "departemen",
        },
        {
            Header: "Total Pinjaman",
            accessor: "total_pinjaman",
        },
        {
            Header: "januari",
            accessor: "januari",
        },
        {
            Header: "Februari",
            accessor: "februari",
        },
        {
            Header: "Maret",
            accessor: "maret",
        },
        {
            Header: "April",
            accessor: "april",
        },
        {
            Header: "Mei",
            accessor: "mei",
        },
        {
            Header: "Juni",
            accessor: "juni",
        },
        {
            Header: "Juli",
            accessor: "juli",
        },
        {
            Header: "Agustus",
            accessor: "agustus",
        },
        {
            Header: "September",
            accessor: "september",
        },
        {
            Header: "Oktober",
            accessor: "oktober",
        },

        {
            Header: "November",
            accessor: "november",
        },
        {
            Header: "Desember",
            accessor: "desember",
        }

    ];

    const [datatable, setDatatable] = useState([]);
        const [reload, setReload] = useState(false);
        const [loader, setLoader] = useState(false);
        // const [columns, setColumns] = useState([]);
        const [dataFilter, setDataFilter] = useState({
            // month: "",
            year: ""
        });
    
    
        const toCurrency = (value) => {
            if (!value && value !== 0) return "Rp0";
            return new Intl.NumberFormat("id-ID", {
                style: "currency", currency: "IDR", minimumFractionDigits: 0,
            }).format(Number(value));
        };
    
        const getLoan = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const now = new Date();
    
         
            const year = now.getFullYear();
            setLoader(true);
            try {
                const result = await apiConfig.get(apiUrl + "/Loan/report-loan", {
                    params: {
                        // bulan: (dataFilter.month != "") ? dataFilter.month : month,
                        tahun: (dataFilter.year != "") ? dataFilter.year : year
                    },
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                // console.log("payroll", result);
    
                if (result.status == 200) {
                    const tableData = [];
                    if (result.data.data.length > 0) {
                        for (const datas of result.data.data) {
                            tableData.push({
                                nip: datas.nip ?? "",
                                nama_karyawan: datas.nama ?? "",
                                jabatan: datas.jabatan ?? "",
                                departemen: datas.departemen ?? "",
                                total_pinjaman: toCurrency(datas.total_pinjaman) ?? "",
                                januari: toCurrency(datas.januari) ?? "",
                                februari: toCurrency(datas.februari) ?? "",
                                maret: toCurrency(datas.maret) ?? "",
                                april: toCurrency(datas.april) ?? "",
                                mei: toCurrency(datas.mei) ?? "",
                                juni: toCurrency(datas.juni) ?? "",
                                juli: toCurrency(datas.juli) ?? "",
                                agustus: toCurrency(datas.agustus) ?? "",
                                september: toCurrency(datas.september) ?? "",
                                oktober: toCurrency(datas.oktober) ?? "",
                                november: toCurrency(datas.november) ?? "",
                                desember: toCurrency(datas.desember) ?? "",
                            })
                            
                        }
                    }
                    setDatatable(tableData);
    
                }
            } catch (error) {
                // setLoader(false);
                console.log(error);
            } finally {
                setLoader(false);
            }
        }
    
        const AlertConfirm = async (message, icon, confirmButtonName, textarea = false, messageDeleted = "Your file has been deleted.") => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger me-2"
                },
                buttonsStyling: false
            });
            let objSwall = {
                title: "Apakah Yakin?",
                text: message,
                icon: icon,
                showCancelButton: true,
                confirmButtonText: confirmButtonName,
                cancelButtonText: "Kembali",
                reverseButtons: true,
    
            };
    
            if (textarea) {
                objSwall.input = 'textarea';
                objSwall.inputLabel = 'Catatan';
                objSwall.inputPlaceholder = 'Catatan....';
    
            }
            const result = await swalWithBootstrapButtons.fire(objSwall);
            if (result.isConfirmed) {
    
                return {
                    status: true,
                    value: result.value
                };
                // ✅ user confirmed
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // setReload(prev => !prev);
                // await swalWithBootstrapButtons.fire(
                //     "Cancelled",
                //     // "Your imaginary file is safe :)",
                //     "error"
                // );
                return {
                    status: false,
                    // value: result.value
                }; // ✅ user cancelled
            }
    
            return false;
        }
        const swalAlert = (message, title, icon) => {
            let timerInterval;
    
            Swal.fire({
                title: title,
                html: message,
                icon: icon,
                timer: 5000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
        }
    
        useEffect(() => {
            getLoan()
        }, [dataFilter])

    return(
       <Fragment>
            <Seo title={"Report Pinjaman"} />
            <PageHeaderVms title='Human Resources' item='Human Resources' active_item='Report Pinjaman' />
            <LoadersSimUmira open={loader} />
            <Row>

                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            {/* <Col xl={12} className="d-flex gap-2">
                           
                            <Col xl={12} >
                                <Card className={`custom-card card-bg-success`}>
                                    <Card.Body >
                                        <div className="d-flex align-items-center w-100">
                                            
                                            <div className="">
                                                <div className="fs-15 fw-semibold">Total Lembur</div>
                                                <p className="mb-0 text-fixed-white op-7 fs-12"></p>
                                            </div>
                                           
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                            
                        </Col> */}
                            <Row className="w-100 align-items-end">

                                {/* Filter Tahun */}
                                <Col xl={2} lg={3} md={6} className="mb-3">
                                    <Form.Label className="fw-semibold">
                                        Tahun
                                    </Form.Label>

                                    <Form.Select
                                        value={dataFilter.year}
                                        onChange={(e) => {
                                            setDataFilter({
                                                ...dataFilter,
                                                year: e.target.value,
                                            });
                                        }}
                                    >
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                    </Form.Select>
                                </Col>
                                {/* Button */}
                               
                            </Row>

                        </Card.Header>
                        <Card.Body>

                            <div className="table-responsive">
                                <BasicTableCostControl column={COLUMNS} datatable={datatable} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}

ReportLoan.layout = "ContentlayoutVms";
export default ReportLoan;