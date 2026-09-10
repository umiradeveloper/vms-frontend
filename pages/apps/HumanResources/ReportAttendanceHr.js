
import { Card, Col, Form, Row } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import LoadersSimUmira from "../Component/LoaderSimUmira";

import Link from "next/link";

const ReportAttendanceHr = () => {
    //    const COLUMNS = [
    //     {
    //         Header: "NIP",
    //         accessor: "nip",
    //     },
    //     {
    //         Header: "Nama",
    //         accessor: "nama",
    //     },
    //     {
    //         Header: "Jabatan",
    //         accessor: "jabatan",
    //     },
    //     {
    //         Header: "Jam Masuk",
    //         accessor: "jam_masuk",
    //     },
    //     {
    //         Header: "Jam Keluar",
    //         accessor: "jam_keluar",
    //     },
    //     {
    //         Header: "Status",
    //         accessor: "status_absensi",
    //     },
    //     {
    //         Header: "Keterangan",
    //         accessor: "keterangan",
    //     },
    //     //  
    //     {
    //         Header: "Aksi",
    //         accessor: "aksi",
    //     },
    // ];
    const [datatable, setDatatable] = useState([]);
    const [reload, setReload] = useState(false);
    const [loader, setLoader] = useState(false);
    const [columns, setColumns] = useState([]);
    const [dataFilter, setDataFilter] = useState({
        month: "",
        year: ""
    });
    const [cardDashboard, setCardDashboard] = useState({
        allTotalAlfa: 0,
        allTotalIzin: 0,
        allTotalHadir: 0,
        allTotalSakit: 0,
        allTotalCuti: 0
    });



    const getAbsensi = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const now = new Date();

        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/HR-Attendance/get-attendance-employee", {
                params: {
                    month: (dataFilter.month != "") ? dataFilter.month : month,
                    year: (dataFilter.year != "") ? dataFilter.year : year
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);

            if (result.status == 200) {
                const employees = result.data?.data;
                if (!employees || employees.length === 0) {
                    setDatatable([]);
                    setColumns([]);
                    return;
                }

                // Ambil semua tanggal dari attendance
                const dates = Object.keys(
                    employees[0].attendance || {}
                );

                // =========================
                // COLUMNS
                // =========================

                const dynamicColumns = [
                    {
                        Header: "NIP",
                        accessor: "employeeId",
                    },
                    {
                        Header: "Nama",
                        accessor: "employeeName",
                    },

                    ...dates.map((date) => ({
                        Header: date,
                        accessor: date,
                    })),
                    // =========================
                    // TOTAL
                    // =========================
                    {
                        Header: "Total Hadir",
                        accessor: "totalHadir",
                    },
                    {
                        Header: "Total Alfa",
                        accessor: "totalAlfa",
                    },
                    {
                        Header: "Total Sakit",
                        accessor: "totalSakit",
                    },
                    {
                        Header: "Total Izin",
                        accessor: "totalIzin",
                    },
                    {
                        Header: "Total Cuti",
                        accessor: "totalCuti",
                    },

                ];

                setColumns(dynamicColumns);

                // =========================
                // DATATABLE
                // =========================

                let allTotalAlfa = 0;
                let allTotalHadir = 0;
                let allTotalSakit = 0;
                let allTotalIzin = 0;
                let allTotalCuti = 0;

                const rows = employees.map((employee) => {

                    const row = {
                        employeeId: employee.employeeId,
                        employeeName: employee.employeeName,
                    };
                    let totalHadir = 0;
                    let totalAlfa = 0;
                    let totalSakit = 0;
                    let totalIzin = 0;
                    let totalCuti = 0;

                    dates.forEach((date) => {
                        // row[date] =
                        // employee.attendance?.[date] || "-";
                        const status = employee.attendance[date] || "-";

                        row[date] = status;

                        switch (status) {

                            case "H":
                                totalHadir++;
                                break;

                            case "A":
                                totalAlfa++;
                                break;

                            case "S":
                                totalSakit++;
                                break;

                            case "I":
                                totalIzin++;
                                break;

                            case "C":
                                totalCuti++;
                                break;

                            // case "L":
                            //     totalLibur++;
                            //     break;

                            default:
                                break;
                        }
                    });
                    row.totalHadir = totalHadir;
                    row.totalAlfa = totalAlfa;
                    row.totalSakit = totalSakit;
                    row.totalIzin = totalIzin;
                    row.totalCuti = totalCuti;
                    allTotalAlfa += totalAlfa;
                    allTotalHadir += totalHadir;
                    allTotalSakit += totalSakit;
                    allTotalIzin += totalIzin;
                    allTotalCuti += totalCuti;
                    // row.totalLibur = totalLibur;

                    return row;
                });
                setCardDashboard({
                    allTotalAlfa: allTotalAlfa,
                    allTotalHadir: allTotalHadir,
                    allTotalSakit: allTotalSakit,
                    allTotalCuti: allTotalCuti,
                    allTotalIzin: allTotalIzin
                })
                setDatatable(rows);
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
        getAbsensi()
    }, [dataFilter])

    return (
         <Fragment>
            <Seo title={"Attendance Report"} />
            <PageHeaderVms title='Human Resources' item='Human Resources' active_item='HR System' />
            <LoadersSimUmira open={loader} />
        <Row>

            <Col xl={12}>
                <Card className="custom-card">
                    <Card.Header>
                        <Col xl={12} className="d-flex gap-2">
                            {/* {[
                                { label: "Hadir", color: "card-bg-success", val: datatable.filter(r => r.status_absensi === "Hadir").length },
                                { label: "Izin", color: "card-bg-primary", val: datatable.filter(r => r.status_absensi === "Izin").length },
                                { label: "Sakit", color: "card-bg-warning", val: datatable.filter(r => r.status_absensi === "Sakit").length },
                                { label: "Alpha", color: "card-bg-danger", val: datatable.filter(r => r.status_absensi === "Aplha").length },
                            ].map(s => ( */}
                            <Col xl={2} >
                                <Card className={`custom-card card-bg-success`}>
                                    <Card.Body >
                                        <div className="d-flex align-items-center w-100">
                                            {/* <div className="me-2">
                                                    <span className="avatar avatar-rounded">
                                                        <img src="../../../assets/images/faces/11.jpg" alt="img" />
                                                    </span>
                                                </div> */}
                                            <div className="">
                                                <div className="fs-15 fw-semibold">Hadir</div>
                                                <p className="mb-0 text-fixed-white op-7 fs-12">{cardDashboard.allTotalHadir}</p>
                                            </div>
                                            {/* <div className="ms-auto">
                                                    <Link href="#!" className="text-fixed-white"><i className="bi bi-three-dots-vertical"></i></Link>
                                                </div> */}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={2} >
                                <Card className={`custom-card card-bg-primary`}>
                                    <Card.Body >
                                        <div className="d-flex align-items-center w-100">
                                            {/* <div className="me-2">
                                                    <span className="avatar avatar-rounded">
                                                        <img src="../../../assets/images/faces/11.jpg" alt="img" />
                                                    </span>
                                                </div> */}
                                            <div className="">
                                                <div className="fs-15 fw-semibold">Sakit</div>
                                                <p className="mb-0 text-fixed-white op-7 fs-12">{cardDashboard.allTotalSakit}</p>
                                            </div>
                                            {/* <div className="ms-auto">
                                                    <Link href="#!" className="text-fixed-white"><i className="bi bi-three-dots-vertical"></i></Link>
                                                </div> */}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={2} >
                                <Card className={`custom-card card-bg-secondary`}>
                                    <Card.Body >
                                        <div className="d-flex align-items-center w-100">
                                            {/* <div className="me-2">
                                                    <span className="avatar avatar-rounded">
                                                        <img src="../../../assets/images/faces/11.jpg" alt="img" />
                                                    </span>
                                                </div> */}
                                            <div className="">
                                                <div className="fs-15 fw-semibold">Izin</div>
                                                <p className="mb-0 text-fixed-white op-7 fs-12">{cardDashboard.allTotalIzin}</p>
                                            </div>
                                            {/* <div className="ms-auto">
                                                    <Link href="#!" className="text-fixed-white"><i className="bi bi-three-dots-vertical"></i></Link>
                                                </div> */}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={2} >
                                <Card className={`custom-card card-bg-secondary`}>
                                    <Card.Body >
                                        <div className="d-flex align-items-center w-100">
                                            {/* <div className="me-2">
                                                    <span className="avatar avatar-rounded">
                                                        <img src="../../../assets/images/faces/11.jpg" alt="img" />
                                                    </span>
                                                </div> */}
                                            <div className="">
                                                <div className="fs-15 fw-semibold">Cuti</div>
                                                <p className="mb-0 text-fixed-white op-7 fs-12">{cardDashboard.allTotalCuti}</p>
                                            </div>
                                            {/* <div className="ms-auto">
                                                    <Link href="#!" className="text-fixed-white"><i className="bi bi-three-dots-vertical"></i></Link>
                                                </div> */}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={2} >
                                <Card className={`custom-card card-bg-danger`}>
                                    <Card.Body >
                                        <div className="d-flex align-items-center w-100">
                                            {/* <div className="me-2">
                                                    <span className="avatar avatar-rounded">
                                                        <img src="../../../assets/images/faces/11.jpg" alt="img" />
                                                    </span>
                                                </div> */}
                                            <div className="">
                                                <div className="fs-15 fw-semibold">Alfa</div>
                                                <p className="mb-0 text-fixed-white op-7 fs-12">{cardDashboard.allTotalAlfa}</p>
                                            </div>
                                            {/* <div className="ms-auto">
                                                    <Link href="#!" className="text-fixed-white"><i className="bi bi-three-dots-vertical"></i></Link>
                                                </div> */}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            {/* ))} */}
                        </Col>
                        <Row className="w-100 align-items-end">

                            {/* Filter Bulan */}
                            <Col xl={3} lg={4} md={6} className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Bulan
                                </Form.Label>

                                <Form.Select
                                    value={dataFilter.month}
                                    onChange={(e) => {
                                        setDataFilter({
                                            ...dataFilter,
                                            month: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="1">Januari</option>
                                    <option value="2">Februari</option>
                                    <option value="3">Maret</option>
                                    <option value="4">April</option>
                                    <option value="5">Mei</option>
                                    <option value="6">Juni</option>
                                    <option value="7">Juli</option>
                                    <option value="8">Agustus</option>
                                    <option value="9">September</option>
                                    <option value="10">Oktober</option>
                                    <option value="11">November</option>
                                    <option value="12">Desember</option>
                                </Form.Select>
                            </Col>

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
                        </Row>

                    </Card.Header>
                    <Card.Body>

                        <div className="table-responsive">
                            <BasicTableCostControl column={columns} datatable={datatable} />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </Fragment>
    )
}


ReportAttendanceHr.layout = "ContentlayoutVms";
export default ReportAttendanceHr;