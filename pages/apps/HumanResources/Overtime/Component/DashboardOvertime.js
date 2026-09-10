import { Button, Card, Col, Form, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { useEffect, useState } from "react";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";

const DashboardOvertime = ({ loader, setLoader }) => {
    const [datatable, setDatatable] = useState([]);
    const [reload, setReload] = useState(false);
     const [dataFilter, setDataFilter] = useState({
            tanggal: "",
        });
    const COLUMNS = [
        {
            Header: "NIP",
            accessor: "nip",
        },
        {
            Header: "Nama",
            accessor: "nama",
        },
        {
            Header: "Jabatan",
            accessor: "jabatan",
        },
        {
            Header: "Tanggal",
            accessor: "tanggal",
        },
        {
            Header: "Jam Mulai",
            accessor: "jam_mulai",
        },
        {
            Header: "Jam Selesai",
            accessor: "jam_selesai",
        },
        {
            Header: "Durasi",
            accessor: "durasi",
        },
        {
            Header: "Alasan",
            accessor: "alasan",
        },
        //  
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ]

    const getOvertime = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
         const date = new Date();
        const formattedDate = (dataFilter.tanggal != null && dataFilter.tanggal != "") ? dataFilter.tanggal : date.toLocaleDateString("en-CA");
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/HR-Overtime/get-overtime-monitor?tanggal="+formattedDate, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result);
            if (result.status == 200) {
                const overtimeArr = [];
                if (result.data.data?.length > 0) {

                    for (const datas of result.data.data) {
                        overtimeArr.push({
                            nip: datas.emp?.nip,
                            nama: datas.emp?.nama,
                            jabatan: datas.emp?.jabatan,
                            tanggal: datas.tanggal,
                            jam_mulai: datas.jam_mulai ?? "",
                            jam_selesai: datas.jam_selesai ?? "",
                            durasi: datas.durasi + " Menit" ?? "",
                            alasan: datas.alasan ?? "",
                            aksi: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-danger" onClick={() => { deleteOvertime(datas.id_lembur) }} >Hapus</button>
                            </div>
                        })
                    }
                    // setEmployee(dataEmployeeArr);
                }
                setDatatable(overtimeArr);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }


    const deleteOvertime = async (id) => {
        const resultConfirm = await AlertConfirm("Apakah anda yakin ingin menghapus data ini ? ", "warning", "Hapus", false, "Data berhasil di hapus");
        // console.log(idDelete)
        if (resultConfirm.status) {
            setLoader(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            try {
                const result = await apiConfig.delete(apiUrl + "/HR-Overtime/delete-overtime?id=" + id, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                if (result.status == 200) {
                    setReload(prev => !prev);
                    // setIdDelete(id);

                    // setLoader(false);
                    swalAlert(result.data.message, result.statusText, "success");
                    // getEmployee();
                }

            } catch (error) {
                console.log(error);
                // setLoader(false);
                swalAlert(error.message, error.code, "error");
            } finally {
                setLoader(false);
            }


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
        getOvertime()
    }, [reload])
    return (
        <Row>

            <Col xl={12}>
                <Card className="custom-card">
                    <Card.Header>
                        <Row className="w-100 align-items-end">

                            {/* FILTER TANGGAL */}
                            <Col xl={3} lg={4} md={6} className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Tanggal
                                </Form.Label>

                                <Form.Control
                                    type="date"
                                    value={dataFilter.tanggal || ""}
                                    onChange={(e) => {
                                        setDataFilter({
                                            ...dataFilter,
                                            tanggal: e.target.value,
                                        });
                                    }}
                                />
                            </Col>

                            {/* BUTTON FILTER */}
                            <Col xl={2} lg={3} md={6} className="mb-3">
                                <Button
                                    variant="primary"
                                    onClick={() => setReload(prev => !prev)}
                                >
                                    <i className="ri-search-line me-1"></i>
                                    Filter
                                </Button>

                                <Button
                                    variant="light"
                                    className="ms-2"
                                    onClick={() => {
                                        const now = new Date();

                                        setDataFilter({
                                            tanggal:
                                                now.toLocaleDateString("en-CA"),
                                        });
                                    }}
                                >
                                    Reset
                                </Button>
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
    )
}
export default DashboardOvertime;