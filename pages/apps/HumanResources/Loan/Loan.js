import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import { Button } from "@mui/material";
import CreateLoan from "../Loan/Component/CreateLoan";
import DetailLoan from "../Loan/Component/DetailLoan";



const Loan = ({ loader, setLoader }) => {
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
            Header: "Nominal Pinjaman",
            accessor: "nominal_pinjaman",
        },
        {
            Header: "Jumlah Cicilan",
            accessor: "jumlah_cicilan",
        },
        {
            Header: "Bulan Awal Cicilan",
            accessor: "bulan_awal_cicilan",
        },
        {
            Header: "Bulan Akhir Cicilan",
            accessor: "bulan_akhir_cicilan",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];
    const [openModal, setOpenModal] = useState({
        open: false
    });
    const [openModalDetail, setOpenModalDetail] = useState({
        open: false,
        datas: [],
        loanInfo: {
            nama: "",
            nip: "",
            jabatan: "",
            total_pinjaman: ""
        }
    });
    const [datatable, setDatatable] = useState([]);
    const [reload, setReload] = useState(false);
    const [tableDetail, setTableDetail] = useState([]);

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


    const getLoan = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/Loan/get-loan", {
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log("loan = > ",result);
            if (result.status == 200) {
                const dataArr = [];
                if (result.data.data?.length > 0) {
                    for (const datas of result.data.data) {
                        const result = datas.loanDetail.some(item => item.status === "PAID");

                        dataArr.push({
                            nip: datas.employee?.nip ?? "",
                            nama: datas.employee?.nama ?? "",
                            jabatan: datas.employee?.jabatan ?? "",
                            nominal_pinjaman: formatCurrency(datas.total_pinjaman) ?? 0,
                            jumlah_cicilan: datas.jumlah_cicilan ?? 0,
                            bulan_awal_cicilan: datas.bulan_tahun_awal ?? "",
                            bulan_akhir_cicilan: datas.bulan_tahun_akhir ?? "",
                            aksi: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-info label-btn" onClick={() => setOpenModalDetail({ open: true, datas: datas.loanDetail, loanInfo: { nama: datas.employee?.nama ?? "", nip: datas.employee?.nip ?? "", jabatan: datas.employee?.jabatan ?? "", total_pinjaman: formatCurrency(datas.total_pinjaman) ?? "" } })} ><i className="ri-chat-smile-line label-btn-icon me-2"></i> Detail</button>
                                {(!result) ? <button className="btn btn-danger" onClick={() => {handleDelete(datas.id_pinjaman)}}>Hapus</button> : ""}
                                {/* <button className="btn btn-warning" onClick={() => handlerEditEmployee(res) } >Edit</button> */}
                                {/* <button className="btn btn-danger" onClick={() => {deleteEmployee(res.id_employee)}} >Hapus</button> */}
                            </div>
                        })
                    }
                }
                setDatatable(dataArr);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Hapus Data?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Ya, Hapus",
            cancelButtonText: "Batal"
        }).then((result) => {
            if (result.isConfirmed) {
                // deleteData();
                deleteData(id);
            }
        });
    };

    const deleteData = async(id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/Loan/delete-loan", {
                params: {
                    id: id
                },
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log("loan = > ",result);
            if (result.status == 200) {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Data Berhasil Di Hapus",
                    timer: 2000,
                    showConfirmButton: false
                });
                setReload(prev => !prev)
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        getLoan();
    }, [reload])


    return (
        <Row>
            <CreateLoan openModal={openModal} setOpenModal={setOpenModal} loader={loader} setLoader={setLoader} reload={reload} setReload={setReload} />
            <DetailLoan openModal={openModalDetail} setOpenModal={setOpenModalDetail} />
            <Col xl={12}>
                <Card className="custom-card">

                    <Card.Header>
                        <Col xl={12} className="d-flex justify-content-end">
                            <Button variant="contained" color="success" onClick={() => setOpenModal({ open: true })}>Tambah Pinjaman</Button>
                        </Col>
                        <div className="card-title">
                            Daftar Pinjaman Karyawan
                        </div>
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

export default Loan;