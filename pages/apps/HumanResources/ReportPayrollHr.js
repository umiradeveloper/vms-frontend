
import { Card, Col, Form, Row } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../Component/PageHeaderVms";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import LoadersSimUmira from "../Component/LoaderSimUmira";

import Link from "next/link";

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