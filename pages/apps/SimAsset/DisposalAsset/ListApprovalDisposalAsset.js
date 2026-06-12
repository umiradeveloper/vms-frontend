import { Card, Col, Row } from "react-bootstrap";
import BasicTableSuperApps from "../../DataTables/BasicTableSuperApps";
import { useEffect, useState } from "react";
import api from "@/utils/AxiosConfig";
import DetailApprovalDisposalAsset from "./Modals/DetailApprovalDisposalAsset";
import { Button } from "@mui/material";
import Swal from "sweetalert2";


const ListApprovalDisposalAsset = ({ loader, setLoader, reload, setReload }) => {
    const [dataTable, setDataTable] = useState([]);
    const [detailDisposal, setDetailDisposal] = useState({
        open: false,
        datas: {}
    })
    const COLUMNS = [
        {
            Header: "Kode Asset",
            accessor: "kode_asset",
        },
        {
            Header: "Tanggal Pengajuan",
            accessor: "tanggal_pengajuan",
        },
        {
            Header: "Nama Asset",
            accessor: "nama_asset",
        },
        {
            Header: "Kategori",
            accessor: "kategori",
        },
        {
            Header: "Alasan",
            accessor: "alasan",
        },
        {
            Header: "Metode Penghapusan",
            accessor: "metode_penghapusan",
        },

        {
            Header: "Tanggal Approval",
            accessor: "tanggal_approval",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
        {
            Header: "Verifikasi",
            accessor: "verifikasi",
        },
    ]
    const handleReject = async (id) => {
        const result = await Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Menolak Pengajuan Ini",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Tolak",
            cancelButtonText: "Batal",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            setLoader(true);

            try {
                const result = await api.patch(apiUrl + "/asset-manajemen/update-approval-disposal-asset?id=" + id + "&status_approval=reject", {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                // console.log(result);
                if (result.status == 200) {
                    setReload(prev => !prev);
                    swalAlert("Data berhasil di reject", result.statusText, "success");
                }
            } catch (error) {
                // setLoader(false);
                console.log(error);
            } finally {
                setLoader(false);
            }


        }
    }
    const handleApprove = async (id) => {
            const result = await Swal.fire({
                title: "Apakah Anda yakin?",
                text: "Menyetujui Pengajuan Ini",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, Setuju",
                cancelButtonText: "Batal",
                reverseButtons: true,
            });
    
            if (result.isConfirmed) {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                setLoader(true);
    
                try {
                    const result = await api.patch(apiUrl + "/asset-manajemen/update-approval-disposal-asset?id="+id+"&status_approval=approve", {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    console.log(result);
                    if (result.status == 200) {
                        setReload(prev => !prev);
                        swalAlert("Data berhasil di approve", result.statusText, "success");
                    }
                } catch (error) {
                    // setLoader(false);
                    console.log(error);
                } finally {
                    setLoader(false);
                }
    
    
            }
        }
    const getDataDisposal = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const result = await api.get(apiUrl + "/asset-manajemen/get-approval-disposal-asset", {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log(result);
            if (result.status == 200) {
                // setReload(prev => !prev);
                const ls = [];
                if (result.data.data?.length > 0) {

                    for (const datas of result.data.data) {
                        ls.push({
                            kode_asset: datas.asset?.kode_asset,
                            nama_asset: datas.asset?.nama_asset,
                            kategori: datas.asset?.kategori,
                            tanggal_pengajuan: datas.tanggal_pengajuan,
                            alasan: datas.alasan,
                            metode_penghapusan: datas.metode_penghapusan,
                            tanggal_approval: datas.tanggal_approval,
                            aksi: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-info" onClick={() => setDetailDisposal({ open: true, datas: datas })}><i className="ri-eye-line me-1"></i></button>
                            </div>,
                            verifikasi: <div className="d-flex flex-row gap-2">
                                {/* <button className="btn btn-success"><i className="ri-eye-line me-1"></i> Approve</button> */}
                                <Button variant='contained' type="button" className="btn btn-success" onClick={() => {handleApprove(datas.id_asset_disposal)}}><i className="ri-shield-check-line me-1"></i> </Button>
                                <Button variant='contained' type="button" className="btn btn-danger" onClick={() => {handleReject(datas.id_asset_disposal)}}><i className="ri-close-circle-line me-1"></i> </Button>
                            </div>,
                        })
                    }

                }
                setDataTable(ls);

            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
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
        getDataDisposal();
    }, [reload])
    return (
        <Row>
            <DetailApprovalDisposalAsset openModal={detailDisposal} setOpenModal={setDetailDisposal} />
            <Col xl={12}>
                <Card className="custom-card">
                    <Card.Header>

                        <div className="card-title">
                            Daftar Approval Disposal Asset
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

export default ListApprovalDisposalAsset;