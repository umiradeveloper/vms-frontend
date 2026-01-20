import Swal from "sweetalert2";
import Seo from "@/shared/layout-components/seo/seo";
import { Fragment, useEffect, useState } from "react";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import { Button, Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import { useRouter } from "next/router";


const DaftarApproval = () => {
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);
    const [datatable, setDataTable] = useState([]);
    const COLUMNS = [
        {
            Header: "Nama Vendor",
            accessor: "nama_vendor",
        },
        {
            Header: "Volume Biaya Konstruksi",
            accessor: "volume_bk",
        },
        {
            Header: "Harga Total",
            accessor: "harga_total",
        },
        {
            Header: "Nama Penerima",
            accessor: "nama_penerima",
        },
        {
            Header: "Tanggal Penerima",
            accessor: "tanggal_penerima",
        },
        {
            Header: "aksi",
            accessor: "aksi",
        },
    ];

    const getApprovePengajuanBk = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(
                apiUrl + "/CostControl/pengajuan/get-approve-pengajuan-bk",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            );
            console.log(result.data.data);
            if (result.status === 200) {
                const arr = [];
                for (const data of result.data.data) {
                    arr.push({
                        nama_vendor: data.nama_vendor,
                        volume_bk: data.volume_bk,
                        harga_total: toCurrency(data.harga_total),
                        nama_penerima: data.nama_penerima,
                        tanggal_penerima: data.tanggal_penerima,
                        aksi: (
                            <div className="d-flex flex-row gap-2">
                                <button type="button"
                                    className="btn btn-sm btn-success label-btn label-end rounded-pill"
                                    onClick={() => handleApprove(data.id_pengajuan_bk)} >
                                    <i className="ri-check-line label-btn-icon me-2 rounded-pill" /> Approve
                                </button>
                                {/* <button type="button"
                                    className="btn btn-sm btn-danger label-btn label-end rounded-pill"
                                    onClick={() => handleReject(data.id_pengajuan_bk)} >
                                    <i className="ri-close-line label-btn-icon me-2 rounded-pill" /> Reject
                                </button> */}
                            </div>)
                    });
                } setDataTable(arr);
            } setLoader(false);
        } catch (error) {
            console.error("Error getApprovePengajuanBk:", error);
            setLoader(false);
        }
    };


    const handleApprove = async (id_pengajuan_bk) => {
        const confirm = await Swal.fire({
            title: "Approve Pengajuan",
            text: "Apakah Anda yakin ingin menyetujui pengajuan ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Approve",
            cancelButtonText: "Batal"
        });

        if (!confirm.isConfirmed) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            await apiConfig.post(
                apiUrl +
                `/CostControl/pengajuan/approve-pengajuan-bk`,{},
                {
                    params: {
                        id_pengajuan_bk: id_pengajuan_bk,
                        status_approver: "Approve",
                        catatan: ""
                    },
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            Swal.fire("Berhasil", "Pengajuan berhasil di-approve", "success");
            setReload(prev => !prev);

        } catch (e) {
            console.error(e);
            Swal.fire(
                "Gagal",
                e.response?.data?.message || "Gagal approve",
                "error"
            );
        }
    };


    // const handleReject = async (id_pengajuan_bk) => {
    //     const confirm = await Swal.fire({
    //         title: "Reject Pengajuan",
    //         text: "Apakah Anda yakin ingin menolak pengajuan ini?",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Ya, Reject",
    //         cancelButtonText: "Batal"
    //     });

    //     if (!confirm.isConfirmed) return;

    //     try {
    //         await apiConfig.post(
    //             process.env.NEXT_PUBLIC_API_URL +
    //             "/CostControl/pengajuan/reject",
    //             { id_pengajuan_bk },
    //             {
    //                 headers: {
    //                     Authorization: "Bearer " + localStorage.getItem("token")
    //                 }
    //             }
    //         );

    //         Swal.fire("Berhasil", "Pengajuan berhasil ditolak", "success");
    //         setReload(prev => !prev);

    //     } catch (e) {
    //         Swal.fire("Gagal", e.response?.data?.message || "Gagal reject", "error");
    //     }
    // };

    const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
    };

    useEffect(() => {
        getApprovePengajuanBk();
    }, [reload]);

    return (
        <Fragment>
            <Seo title={"Approval Pengajuan Biaya Kontruksi"} />
            <PageHeaderVms title='Approval Biaya Kontruksi' item='Approval' active_item='Daftar Pengajuan Biaya Konstruksi' />
            <LoadersSimUmira open={loader} />
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Daftar Pengajuan Biaya Konstruksi
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
        </Fragment>
    )

}

DaftarApproval.layout = "ContentlayoutVms";
export default DaftarApproval;