import { Card, Col, Row } from "react-bootstrap";
import BasicTableSuperApps from "../../DataTables/BasicTableSuperApps";
import { useEffect, useState } from "react";
import api from "@/utils/AxiosConfig";
import Swal from "sweetalert2";


const ListApprovalMutasiAsset = ({ loader, setLoader, reload, setReload }) => {
    const [dataTable, setDataTable] = useState([]);
    const COLUMNS = [
        {
            Header: "Kode Asset",
            accessor: "kode_asset",
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
            Header: "Lokasi Asal",
            accessor: "lokasi_asal",
        },
        {
            Header: "Lokasi Tujuan",
            accessor: "lokasi_tujuan",
        },
        {
            Header: "Tanggal Mutasi",
            accessor: "tanggal_mutasi",
        },

        {
            Header: "Tanggal Penerimaan",
            accessor: "tanggal_penerimaan",
        },
        {
            Header: "PIC Sebelumnya",
            accessor: "pic_sebelumnya",
        },
        {
            Header: "PIC tujuan",
            accessor: "pic_tujuan",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ]
    const getDataAsset = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const result = await api.get(apiUrl + "/asset-manajemen/get-approval-mutasi-asset", {
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
                            lokasi_asal: datas.lokasi_asal,
                            lokasi_tujuan: datas.lokasi_tujuan,
                            pic_sebelumnya: datas.pic_sebelum?.username,
                            pic_tujuan: datas.pic_tujuan?.username,
                            tanggal_mutasi: datas.tanggal_mutasi,
                            tanggal_penerimaan: datas.tanggal_penerimaan,
                            aksi: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-success" onClick={() => {handleApprove(datas.id_mutasi_asset)}} >Approve</button>
                                <button className="btn btn-danger"  onClick={() => {handleReject(datas.id_mutasi_asset)}} >Reject</button>
                            </div>
                        })
                    }

                }
                setDataTable(ls);
                // setDataAsset(ls);
                // swalAlert(result.data.message, result.statusText, "success");

                // setOpenModal({open: false });
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
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
                const result = await api.patch(apiUrl + "/asset-manajemen/update-approval-mutasi-asset?id="+id+"&status_approval=approve", {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                console.log(result);
                if (result.status == 200) {
                    setReload(prev => !prev);
                    swalAlert("Datta berhasil di approve", result.statusText, "success");
                }
            } catch (error) {
                // setLoader(false);
                console.log(error);
            } finally {
                setLoader(false);
            }


        }
    }

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
                const result = await api.patch(apiUrl + "/asset-manajemen/update-approval-mutasi-asset?id="+id+"&status_approval=reject", {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                // console.log(result);
                if (result.status == 200) {
                    setReload(prev => !prev);
                    swalAlert("Datta berhasil di reject", result.statusText, "success");
                }
            } catch (error) {
                // setLoader(false);
                console.log(error);
            } finally {
                setLoader(false);
            }


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
        getDataAsset();
    }, [reload])
    return (
        <Row>
            <Col xl={12}>
                <Card className="custom-card">
                    <Card.Header>

                        <div className="card-title">
                            Daftar Approval Mutasi Asset
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

export default ListApprovalMutasiAsset;