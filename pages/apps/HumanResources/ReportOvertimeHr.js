
import { Card, Col, Form, Row } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import LoadersSimUmira from "../Component/LoaderSimUmira";

import Link from "next/link";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ReportOvertimeHr = () => {
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




    const getOvertime = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const now = new Date();

        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/HR-Overtime/get-overtime-report", {
                params: {
                    month: (dataFilter.month != "") ? dataFilter.month : month,
                    year: (dataFilter.year != "") ? dataFilter.year : year
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result);

            if (result.status == 200) {
                const employees = result.data?.data;
                if (!employees || employees.length === 0) {
                    setDatatable([]);
                    setColumns([]);
                    return;
                }

                // Ambil semua tanggal dari attendance
                const dates = Object.keys(
                    employees[0].overtime || {}
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
                        Header: "Total Lembur",
                        accessor: "totalLembur",
                    }

                ];

                setColumns(dynamicColumns);

                // =========================
                // DATATABLE
                // =========================


                let allTotalLembur = 0;

                const rows = employees.map((employee) => {

                    const row = {
                        employeeId: employee.employeeId,
                        employeeName: employee.employeeName,
                    };
                    let totalLembur = 0;

                    dates.forEach((date) => {
                        // console.log(employee.overtime?.[date] ?? "-");

                        const lembur = employee.overtime?.[date];
                        const totalMinutes = parseInt(lembur?.durasi ?? "0", 10);

                        const hours = Math.floor(totalMinutes / 60);
                        const remainingMinutes = totalMinutes % 60;

                        const result = `${hours} jam ${remainingMinutes} menit`;
                        let field = "-";
                        if (lembur != null) {
                            field = result + "\n" + lembur?.jam_mulai + "-" + lembur?.jam_selesai
                        }
                        row[date] = field;
                        totalLembur += parseInt(lembur?.durasi ?? "0", 10);
                        // employee.overtime?.[date] || "-";

                    });

                    const minutesTotal = parseInt(totalLembur ?? 0, 10);

                    const hoursTotal = Math.floor(minutesTotal / 60);
                    const remainingMinutesTotal = minutesTotal % 60;

                    const resultTotal = `${hoursTotal} jam ${remainingMinutesTotal} menit`;
                    // console.log(totalLembur);
                    row.totalLembur = resultTotal;



                    return row;
                });

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

    const exportExcel = () => {
        if (!datatable || datatable.length === 0) {
            swalAlert(
                "Tidak ada data lembur yang dapat di-export.",
                "Informasi",
                "info"
            );
            return;
        }

        const exportData = datatable.map((row) => {
            const data = {};

            columns.forEach((column) => {
                data[column.Header] = row[column.accessor] ?? "-";
            });

            return data;
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);

        // Auto width
        const columnWidths = columns.map((column) => {
            const headerLength = String(column.Header).length;

            const maxDataLength = Math.max(
                ...datatable.map((row) =>
                    String(row[column.accessor] ?? "-").length
                )
            );

            return {
                wch: Math.min(
                    Math.max(headerLength, maxDataLength) + 2,
                    35
                ),
            };
        });

        worksheet["!cols"] = columnWidths;

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Report Lembur"
        );

        const month = dataFilter.month || new Date().getMonth() + 1;
        const year = dataFilter.year || new Date().getFullYear();

        XLSX.writeFile(
            workbook,
            `Report-Lembur-${month}-${year}.xlsx`
        );
    };

    const exportPDF = () => {
        if (!datatable || datatable.length === 0) {
            swalAlert(
                "Tidak ada data lembur yang dapat di-export.",
                "Informasi",
                "info"
            );
            return;
        }

        const month = dataFilter.month || new Date().getMonth() + 1;
        const year = dataFilter.year || new Date().getFullYear();

        const monthNames = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember"
        ];

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a3",
        });

        // =========================
        // TITLE
        // =========================

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");

        doc.text(
            "REPORT LEMBUR KARYAWAN",
            210,
            15,
            {
                align: "center",
            }
        );

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        doc.text(
            `Periode: ${monthNames[Number(month) - 1]} ${year}`,
            210,
            21,
            {
                align: "center",
            }
        );

        // =========================
        // HEADER
        // =========================

        const headers = columns.map(
            (column) => column.Header
        );

        // =========================
        // BODY
        // =========================

        const body = datatable.map((row) => {
            return columns.map((column) => {
                return row[column.accessor] ?? "-";
            });
        });

        // =========================
        // TABLE
        // =========================

        autoTable(doc, {
            head: [headers],
            body: body,

            startY: 28,

            theme: "grid",

            styles: {
                fontSize: 5,
                cellPadding: 1,
                valign: "middle",
                overflow: "linebreak",
            },

            headStyles: {
                fontSize: 5.5,
                fontStyle: "bold",
                halign: "center",
                valign: "middle",
            },

            columnStyles: {
                0: {
                    cellWidth: 25,
                },
                1: {
                    cellWidth: 35,
                },
            },

            didParseCell: function (data) {
                if (data.section === "body") {

                    // NIP
                    if (data.column.index === 0) {
                        data.cell.styles.halign = "left";
                    }

                    // Nama
                    if (data.column.index === 1) {
                        data.cell.styles.halign = "left";
                    }

                    // Tanggal dan Total
                    if (data.column.index >= 2) {
                        data.cell.styles.halign = "center";
                    }
                }
            },

            margin: {
                left: 5,
                right: 5,
            },
        });

        // =========================
        // FOOTER
        // =========================

        const pageCount = doc.internal.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);

            doc.setFontSize(7);
            doc.setFont("helvetica", "normal");

            doc.text(
                `Report Lembur - ${monthNames[Number(month) - 1]} ${year}`,
                5,
                290
            );

            doc.text(
                `Halaman ${i} dari ${pageCount}`,
                415,
                290,
                {
                    align: "right",
                }
            );
        }

        doc.save(
            `Report-Lembur-${month}-${year}.pdf`
        );
    };

    useEffect(() => {
        getOvertime()
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
                                {/* Export */}
                                <Col
                                    xl={5}
                                    lg={5}
                                    md={12}
                                    className="mb-3 d-flex align-items-end gap-2"
                                >
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={exportExcel}
                                    >
                                        <i className="ri-file-excel-2-line me-1"></i>
                                        Export Excel
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={exportPDF}
                                    >
                                        <i className="ri-file-pdf-2-line me-1"></i>
                                        Export PDF
                                    </button>
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


ReportOvertimeHr.layout = "ContentlayoutVms";
export default ReportOvertimeHr;