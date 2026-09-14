import { Card, Col, Form, Row } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import LoadersSimUmira from "../Component/LoaderSimUmira";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

    const exportExcel = () => {
        if (!datatable || datatable.length === 0) {
            swalAlert(
                "Tidak ada data yang dapat di-export.",
                "Informasi",
                "info"
            );
            return;
        }

        const exportData = datatable.map((item) => ({
            NIP: item.nip,
            Nama: item.nama_karyawan,
            Jabatan: item.jabatan,
            Departemen: item.departemen,
            "Total Pinjaman": item.total_pinjaman,
            Januari: item.januari,
            Februari: item.februari,
            Maret: item.maret,
            April: item.april,
            Mei: item.mei,
            Juni: item.juni,
            Juli: item.juli,
            Agustus: item.agustus,
            September: item.september,
            Oktober: item.oktober,
            November: item.november,
            Desember: item.desember,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);

        // Auto width column
        const columnWidths = Object.keys(exportData[0]).map((key) => {
            const maxLength = Math.max(
                key.length,
                ...exportData.map((row) =>
                    row[key] ? String(row[key]).length : 0
                )
            );

            return {
                wch: Math.min(maxLength + 2, 30),
            };
        });

        worksheet["!cols"] = columnWidths;

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Report Pinjaman"
        );

        XLSX.writeFile(
            workbook,
            `Report-Pinjaman-${dataFilter.year || new Date().getFullYear()}.xlsx`
        );
    };
    const exportPDF = () => {
        if (!datatable || datatable.length === 0) {
            swalAlert(
                "Tidak ada data yang dapat di-export.",
                "Informasi",
                "info"
            );
            return;
        }

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });

        const year = dataFilter.year || new Date().getFullYear();

        // Header
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("REPORT PINJAMAN KARYAWAN", 148, 15, {
            align: "center",
        });

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Tahun: ${year}`, 148, 21, {
            align: "center",
        });

        const headers = [
            "NIP",
            "Nama",
            "Jabatan",
            "Departemen",
            "Total",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Agt",
            "Sep",
            "Okt",
            "Nov",
            "Des",
        ];

        const body = datatable.map((item) => [
            item.nip,
            item.nama_karyawan,
            item.jabatan,
            item.departemen,
            item.total_pinjaman,
            item.januari,
            item.februari,
            item.maret,
            item.april,
            item.mei,
            item.juni,
            item.juli,
            item.agustus,
            item.september,
            item.oktober,
            item.november,
            item.desember,
        ]);

        autoTable(doc, {
            head: [headers],
            body: body,
            startY: 28,

            theme: "grid",

            styles: {
                fontSize: 5.5,
                cellPadding: 1.5,
                valign: "middle",
            },

            headStyles: {
                fontSize: 6,
                fontStyle: "bold",
                halign: "center",
            },

            columnStyles: {
                0: {
                    cellWidth: 18,
                },
                1: {
                    cellWidth: 30,
                },
                2: {
                    cellWidth: 25,
                },
                3: {
                    cellWidth: 25,
                },
                4: {
                    cellWidth: 20,
                },
            },

            didParseCell: function (data) {
                if (data.section === "body") {
                    // Kolom NIP, Nama, Jabatan, Departemen
                    if (data.column.index <= 3) {
                        data.cell.styles.halign = "left";
                    } else {
                        data.cell.styles.halign = "right";
                    }
                }
            },

            margin: {
                left: 5,
                right: 5,
            },
        });

        // Footer halaman
        const pageCount = doc.internal.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);

            doc.setFontSize(7);

            doc.text(
                `Report Pinjaman - Tahun ${year}`,
                5,
                205
            );

            doc.text(
                `Halaman ${i} dari ${pageCount}`,
                292,
                205,
                {
                    align: "right",
                }
            );
        }

        doc.save(`Report-Pinjaman-${year}.pdf`);
    };



    useEffect(() => {
        getLoan()
    }, [dataFilter])

    return (
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

                                <Col
                                    xl={6}
                                    lg={7}
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