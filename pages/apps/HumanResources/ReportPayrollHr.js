
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

const ReportPayrollHr = () => {
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
            Header: "Status TK",
            accessor: "status_tk",
        },
        {
            Header: "Project",
            accessor: "Project",
        },
        {
            Header: "Jabatan",
            accessor: "jabatan_karyawan",
        },
        {
            Header: "Status Pajak",
            accessor: "status_pajak",
        },
        {
            Header: "Gaji Pokok",
            accessor: "gaji_pokok",
        },
        {
            Header: "Tunjangan Jabatan",
            accessor: "tunjangan_jabatan",
        },
        {
            Header: "Tunjangan Operasional",
            accessor: "tunjangan_operasional",
        },
        {
            Header: "Tunjangan Transport",
            accessor: "tunjangan_transport",
        },
        {
            Header: "Tunjangan Makan",
            accessor: "tunjangan_makan",
        },
        {
            Header: "Tunjangan Lembur",
            accessor: "tunjangan_lembur",
        },
        {
            Header: "Tunjangan Lainnya",
            accessor: "tunjangan_lainnya",
        },
        {
            Header: "BPJS Kesehatan",
            accessor: "bpjs_kesehatan",
        },
        {
            Header: "BPJS Ketenagakerjaan",
            accessor: "bpjs_ketenagakerjaan",
        },

        {
            Header: "Total Pendapatan",
            accessor: "total_pendapatan",
        },
        {
            Header: "Potongan Kehadiran",
            accessor: "potongan_kehadiran",
        },
        {
            Header: "Pinjaman",
            accessor: "pinjaman",
        },

        {
            Header: "Potongan BPJS Kesehatan",
            accessor: "potongan_bpjskes",
        },
        {
            Header: "Potongan BPJS Ketenagakerjaan",
            accessor: "potongan_bpjstk",
        },
        {
            Header: "Potongan PPH 21",
            accessor: "potongan_pph21",
        },
        {
            Header: "Total Potongan",
            accessor: "total_potongan",
        },
        {
            Header: "Gaji Bersih",
            accessor: "gaji_bersih",
        },

        {
            Header: "Bank",
            accessor: "bank",
        },
        {
            Header: "Akun Bank",
            accessor: "akun_bank",
        },
        {
            Header: "Nama Pemilik Bank",
            accessor: "nama_pemilik_bank",
        },

    ];
    const [datatable, setDatatable] = useState([]);
    const [reload, setReload] = useState(false);
    const [loader, setLoader] = useState(false);
    // const [columns, setColumns] = useState([]);
    const [dataFilter, setDataFilter] = useState({
        month: "",
        year: ""
    });


    const toCurrency = (value) => {
        if (!value && value !== 0) return "Rp0";
        return new Intl.NumberFormat("id-ID", {
            style: "currency", currency: "IDR", minimumFractionDigits: 0,
        }).format(Number(value));
    };

    const getPayroll = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const now = new Date();

        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/HR-Payroll/get-payroll", {
                params: {
                    bulan: (dataFilter.month != "") ? dataFilter.month : month,
                    tahun: (dataFilter.year != "") ? dataFilter.year : year
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log("payroll", result);

            if (result.status == 200) {
                const tableData = [];
                if (result.data.data.length > 0) {
                    for (const datas of result.data.data) {
                        const total_pendapatan = parseInt(datas.payroll?.gaji_pokok ?? 0, 10) + parseInt(datas.payroll?.tunjangan_jabatan ?? 0, 10) + parseInt(datas.payroll?.tunjangan_operasional ?? 0, 10) + parseInt(datas.payroll?.tunjangan_transport ?? 0, 10) + parseInt(datas.payroll?.tunjangan_makan ?? 0, 10) + parseInt(datas.payroll?.tunjangan_lembur ?? 0, 10) + parseInt(datas.payroll?.bpjs_kesehatan ?? 0, 10) + parseInt(datas.payroll?.bpjs_ketenagakerjaan ?? 0, 10);
                        const total_deduction = parseInt(datas.deduction?.potongan_kehadiran ?? 0, 10) + parseInt(datas.deduction?.pinjaman ?? 0, 10) + parseInt(datas.deduction?.bpjskes ?? 0, 10) + parseInt(datas.deduction?.bpjstk ?? 0, 10) + parseInt(datas.deduction?.pph21 ?? 0, 10);
                        // console.log("nama "+datas.payroll?.employee?.nama)
                        tableData.push({
                            nip: datas.master?.employee?.nip ?? "",
                            nama_karyawan: datas.master?.employee?.nama ?? "",
                            status_tk: (datas.payroll?.employee?.status_employee == 1) ? "Aktif" : "Non Aktif" ?? "",
                            project: datas.payroll?.employee?.project ?? "",
                            jabatan_karyawan: datas.payroll?.employee?.jabatan ?? "",
                            status_pajak: datas.payroll?.employee?.ptkp_status ?? "",
                            gaji_pokok: toCurrency(datas.payroll?.gaji_pokok) ?? "",
                            tunjangan_jabatan: toCurrency(datas.payroll?.tunjangan_jabatan) ?? "",
                            tunjangan_operasional: toCurrency(datas.payroll?.tunjangan_operasional) ?? "",
                            tunjangan_transport: toCurrency(datas.payroll?.tunjangan_transport) ?? "",
                            tunjangan_makan: toCurrency(datas.payroll?.tunjangan_makan) ?? "",
                            tunjangan_lembur: toCurrency(datas.payroll?.tunjangan_lembur) ?? "",
                            bpjs_kesehatan: toCurrency(datas.payroll?.bpjs_kesehatan) ?? "",
                            bpjs_ketenagakerjaan: toCurrency(datas.payroll?.bpjs_ketenagakerjaan) ?? "",
                            total_pendapatan: toCurrency(total_pendapatan),
                            potongan_kehadiran: toCurrency(datas.deduction?.potongan_kehadiran) ?? "",
                            pinjaman: toCurrency(datas.deduction?.pinjaman) ?? "",
                            potongan_bpjskes: toCurrency(datas.deduction?.bpjskes) ?? "",
                            potongan_bpjstk: toCurrency(datas.deduction?.bpjstk) ?? "",
                            potongan_pph21: toCurrency(datas.deduction?.pph21) ?? "",
                            total_potongan: toCurrency(total_deduction),
                            gaji_bersih: toCurrency(total_pendapatan - total_deduction),
                            bank: datas.master?.employee?.bank_name ?? "",
                            akun_bank: datas.master?.employee?.bank_account ?? "",
                            nama_pemilik_bank: datas.master?.employee?.bank_account_holder ?? "",
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
                "Tidak ada data payroll yang dapat di-export.",
                "Informasi",
                "info"
            );
            return;
        }

        const exportData = datatable.map((row) => ({
            NIP: row.nip,
            "Nama Karyawan": row.nama_karyawan,
            "Status TK": row.status_tk,
            Project: row.project,
            Jabatan: row.jabatan_karyawan,
            "Status Pajak": row.status_pajak,

            "Gaji Pokok": row.gaji_pokok,
            "Tunjangan Jabatan": row.tunjangan_jabatan,
            "Tunjangan Operasional": row.tunjangan_operasional,
            "Tunjangan Transport": row.tunjangan_transport,
            "Tunjangan Makan": row.tunjangan_makan,
            "Tunjangan Lembur": row.tunjangan_lembur,
            "Tunjangan Lainnya": row.tunjangan_lainnya,

            "BPJS Kesehatan": row.bpjs_kesehatan,
            "BPJS Ketenagakerjaan": row.bpjs_ketenagakerjaan,

            "Total Pendapatan": row.total_pendapatan,

            "Potongan Kehadiran": row.potongan_kehadiran,
            Pinjaman: row.pinjaman,
            "Potongan BPJS Kesehatan": row.potongan_bpjskes,
            "Potongan BPJS Ketenagakerjaan": row.potongan_bpjstk,
            "Potongan PPH 21": row.potongan_pph21,

            "Total Potongan": row.total_potongan,
            "Gaji Bersih": row.gaji_bersih,

            Bank: row.bank,
            "Akun Bank": row.akun_bank,
            "Nama Pemilik Bank": row.nama_pemilik_bank,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);

        // Auto width
        const columnWidths = Object.keys(exportData[0]).map((key) => {
            const maxLength = Math.max(
                key.length,
                ...exportData.map((row) =>
                    String(row[key] ?? "").length
                )
            );

            return {
                wch: Math.min(maxLength + 2, 35),
            };
        });

        worksheet["!cols"] = columnWidths;

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Report Payroll"
        );

        const month = dataFilter.month || new Date().getMonth() + 1;
        const year = dataFilter.year || new Date().getFullYear();

        XLSX.writeFile(
            workbook,
            `Report-Payroll-${month}-${year}.xlsx`
        );
    };


    const exportPDF = () => {
        if (!datatable || datatable.length === 0) {
            swalAlert(
                "Tidak ada data payroll yang dapat di-export.",
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
            "Desember",
        ];

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a3",
        });

        // =========================
        // TITLE
        // =========================

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);

        doc.text(
            "REPORT PAYROLL KARYAWAN",
            210,
            15,
            {
                align: "center",
            }
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

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

        const headers = [
            "NIP",
            "Nama",
            "Status TK",
            "Project",
            "Jabatan",
            "Status Pajak",
            "Gaji Pokok",
            "Tunj. Jabatan",
            "Tunj. Operasional",
            "Tunj. Transport",
            "Tunj. Makan",
            "Tunj. Lembur",
            "Tunj. Lainnya",
            "BPJS Kesehatan",
            "BPJS TK",
            "Total Pendapatan",
            "Pot. Kehadiran",
            "Pinjaman",
            "Pot. BPJS Kes",
            "Pot. BPJS TK",
            "Pot. PPH 21",
            "Total Potongan",
            "Gaji Bersih",
            "Bank",
            "Akun Bank",
            "Pemilik Bank",
        ];

        // =========================
        // BODY
        // =========================

        const body = datatable.map((row) => [
            row.nip,
            row.nama_karyawan,
            row.status_tk,
            row.project,
            row.jabatan_karyawan,
            row.status_pajak,

            row.gaji_pokok,
            row.tunjangan_jabatan,
            row.tunjangan_operasional,
            row.tunjangan_transport,
            row.tunjangan_makan,
            row.tunjangan_lembur,
            row.tunjangan_lainnya,

            row.bpjs_kesehatan,
            row.bpjs_ketenagakerjaan,

            row.total_pendapatan,

            row.potongan_kehadiran,
            row.pinjaman,
            row.potongan_bpjskes,
            row.potongan_bpjstk,
            row.potongan_pph21,

            row.total_potongan,
            row.gaji_bersih,

            row.bank,
            row.akun_bank,
            row.nama_pemilik_bank,
        ]);

        // =========================
        // TABLE
        // =========================

        autoTable(doc, {
            head: [headers],
            body: body,

            startY: 28,

            theme: "grid",

            styles: {
                fontSize: 4.5,
                cellPadding: 1,
                valign: "middle",
                overflow: "linebreak",
            },

            headStyles: {
                fontSize: 4.8,
                fontStyle: "bold",
                halign: "center",
                valign: "middle",
            },

            columnStyles: {
                // NIP
                0: {
                    cellWidth: 20,
                },

                // Nama
                1: {
                    cellWidth: 28,
                },

                // Status TK
                2: {
                    cellWidth: 15,
                },

                // Project
                3: {
                    cellWidth: 22,
                },

                // Jabatan
                4: {
                    cellWidth: 25,
                },

                // Status Pajak
                5: {
                    cellWidth: 18,
                },

                // Bank
                23: {
                    cellWidth: 18,
                },

                // Akun Bank
                24: {
                    cellWidth: 25,
                },

                // Pemilik Bank
                25: {
                    cellWidth: 28,
                },
            },

            didParseCell: function (data) {
                if (data.section === "body") {

                    // Informasi karyawan
                    if (data.column.index <= 5) {
                        data.cell.styles.halign = "left";
                    }

                    // Nominal
                    if (
                        data.column.index >= 6 &&
                        data.column.index <= 22
                    ) {
                        data.cell.styles.halign = "right";
                    }

                    // Bank
                    if (data.column.index >= 23) {
                        data.cell.styles.halign = "left";
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
                `Report Payroll - ${monthNames[Number(month) - 1]} ${year}`,
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
            `Report-Payroll-${month}-${year}.pdf`
        );
    };

    useEffect(() => {
        getPayroll()
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
                                {/* Button */}
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
                                <BasicTableCostControl column={COLUMNS} datatable={datatable} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}


ReportPayrollHr.layout = "ContentlayoutVms";
export default ReportPayrollHr;