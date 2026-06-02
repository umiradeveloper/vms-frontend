import { useEffect, useState } from "react";
import BasicTableSuperApps from "../../DataTables/BasicTableSuperApps";
import { Card, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import DetailExam from "./modals/DetailExam";
import EditExam from "./modals/EditExam";
import ResultExam from "./modals/ResultExam";
import AxiosConfig from "@/utils/AxiosConfig";

const ListExam = ({ reload, setReload, loader, setLoader }) => {
    const [dataTable, setDataTable] = useState([]);
    const [openDetail, setOpenDetail] = useState({
        open: false,
        datas: {}
    })
     const [openEdit, setOpenEdit] = useState({
        open: false,
        data: {}
    })
    const [openResult, setOpenResult] = useState({
        open: false,
        data: {}
    })
    const COLUMNS = [
        {
            Header: "Kode Test",
            accessor: "kode_test",
        },
        {
            Header: "Tipe test",
            accessor: "tipe_test",
        },
        {
            Header: "Judul test",
            accessor: "judul_test",
        },
        {
            Header: "Deskripsi test",
            accessor: "desk_test",
        },
        {
            Header: "Tanggal test",
            accessor: "tanggal_test",
        },
        {
            Header: "Durasi Test",
            accessor: "durasi_test",
        },
        {
            Header: "Distribusi Test",
            accessor: "distribusi_test",
        },
        {
            Header: "Status Test",
            accessor: "status_test",
        },

        {
            Header: "Hasil Test",
            accessor: "hasil_test",
        },
        {
            Header: "Detail",
            accessor: "detail",
        },
        {
            Header: "Edit",
            accessor: "edit",
        },
        {
            Header: "Hapus",
            accessor: "hapus",
        },
    ]
    const getExam = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await AxiosConfig.get(apiUrl + "/UmiraTest/get-exam", {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (result.status == 200) {
                const arrExam = [];
                for (const res of result.data.data) {
                    arrExam.push({
                        kode_test: res.kode_exam,
                        tipe_test: res.type_exam,
                        judul_test: res.title_exam,
                        deskripsi_test: res.desc_exam,
                        tanggal_test: res.date_exam,
                        durasi_test: res.duration_exam + " Minutes",
                        distribusi_test: res.examAccess?.role?.nama_role?.split(","),
                        status_test: res.status_exam,
                        hasil_test: <div className="d-flex flex-row gap-2">
                            <button className="btn btn-info" onClick={() => setOpenResult({open: true, datas : res})}><i className="ri-eye-line me-1"></i></button>
                        </div>,
                        detail: <div className="d-flex flex-row gap-2">
                            <button className="btn btn-info" onClick={() => setOpenDetail({open: true, datas : res})}><i className="ri-eye-line me-1"></i></button>
                        </div>,
                        edit: <div className="d-flex flex-row gap-2">
                            <button className="btn btn-warning" onClick={() => setOpenEdit({open: true, data : res})}><i className="ri-pencil-line me-1"></i></button>
                        </div>,
                        hapus: <div className="d-flex flex-row gap-2">
                            <button className="btn btn-danger" onClick={() => { deleteData(res.id_exam) }} ><i className="ri-delete-bin-line me-1"></i></button>
                        </div>
                    })
                }
                setDataTable(arrExam);
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
            buttonsStyling: false,

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
            objSwall.inputValidator = (value) => {
                if (!value) {
                    return "Catatan wajib diisi!";
                }
            };
            objSwall.didOpen = () => {
                Swal.getInput().focus();
            };
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

    const deleteData = async (id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        
        const resultConfirm = await AlertConfirm("Apakah anda yakin ingin menghapus data ini ? ", "warning", "Hapus", false, "Data berhasil Delete");
        if (resultConfirm.status) {
            setLoader(true);
            try {
                const result = await AxiosConfig.delete(apiUrl + "/UmiraTest/delete-exam", {
                    params: {
                        id: id
                    },
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                // console.log(result);
                if (result.status == 200) {
                    setReload(prev => !prev);
                    swalAlert(result.data.message, result.statusText, "success");

                    // setOpenModal({ open: false });
                    //     // setFormTransaksi(result.data?.data);
                }
            } catch (error) {
                // setLoader(false);
                console.log(error);
            } finally {
                setLoader(false);
            }
        }
    }

    useEffect(() => {
        getExam();
    }, [reload])
    return (
        <Row>
            <Col xl={12}>
                <ResultExam openModal={openResult}  setOpenModal={setOpenResult}/>
                <DetailExam openModal={openDetail} setOpenModal={setOpenDetail} />
                <EditExam openModal={openEdit} setOpenModal={setOpenEdit} loader={loader} setLoader={setLoader} reload={reload} setReload={setReload}/>
                <Card className="custom-card">
                    <Card.Header>
                        <div className="card-title">
                            Daftar Exam
                        </div>
                    </Card.Header>
                    <Card.Body>

                        <div className="table-responsive">
                            <BasicTableSuperApps column={COLUMNS} datatable={dataTable} />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ListExam;