import { Card, Col, Row } from "react-bootstrap";
import BasicTable from "@/pages/apps/DataTables/DataTablesVendor";
import { useEffect, useState } from "react";
import apiConfig from "@/utils/AxiosConfig";

const VendorManagementSystemSection = ({ loader, setLoader }) => {
    const [dataTablePengajuan, setDataTablePengajuan] = useState([]);
    const [dataTableAkunVendor, setDataTableAkunVendor] = useState([]);

    const [dataVendor, setDataVendor] = useState([]);
    const column_pengajuan = [
        {
            Header: "ID Pengajuan",
            accessor: "id_pengajuan",
        },
        {
            Header: "Nama Perusahaan",
            accessor: "nama_perusahaan",
        },
        {
            Header: "Kualifikasi",
            accessor: "kualifikasi_usaha",
        },
        {
            Header: "Status",
            accessor: "status",
        },
    ]
    const column_akun = [

        {
            Header: "Nama Perusahaan",
            accessor: "nama_perusahaan",
        },
        {
            Header: "Email",
            accessor: "email",
        },

        {
            Header: "Status",
            accessor: "status",
        },
    ]
    const getCardVendor = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/Dashboard/get-data/card-vendor", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if (result.status == 200) {
                setDataVendor(result.data.data)
                // setDatatable(pengajuanArr);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    const getPengajuanVendor = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/Dashboard/get-data/vendor-pengajuan", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if (result.status == 200) {
                const pengajuanArr = [];
                if (result.data.data.length > 0) {
                    for (const data of result.data.data) {
                        pengajuanArr.push({
                            id_pengajuan: <div
                                style={{
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                    whiteSpace: "normal",
                                }}
                            >
                                {data.id_pengajuan}
                            </div>,
                            nama_perusahaan: <div
                                style={{
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                    whiteSpace: "normal",
                                }}
                            >
                                {data.nama_perusahaan}
                            </div>,
                            tanggal_pengajuan: new Date(data.tanggal_pengajuan).toLocaleString("id-ID"),
                            kualifikasi_usaha: (data.kualifikasi_usaha) ? <div
                                style={{
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                    whiteSpace: "normal",
                                }}
                            >
                                {data.kualifikasi_usaha.kualifikasi}
                            </div> : "-",
                            status: (data.isApproval == 1) ? "Di Setujui" : (data.isApproval == 2) ? "Di Tolak" : "Proses Pengajuan"
                        })
                    }
                }
                setDataTablePengajuan(pengajuanArr)
                //    setDataVendor(result.data.data)
                // setDatatable(pengajuanArr);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    const getAkunVendor = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/Dashboard/get-data/get-pengajuan-akun-vendor", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if (result.status == 200) {
                const arrAkun = [];
                if (result.data.data.length > 0) {
                    for (const data of result.data.data) {
                        arrAkun.push({
                            nama_perusahaan: data.nama,
                            email: data.email,
                            status: "Menunggu Approval"
                        })
                    }
                }
                setDataTableAkunVendor(arrAkun);

                //    setDataVendor(result.data.data)
                // setDatatable(pengajuanArr);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    useEffect(() => {
        getCardVendor();
        getPengajuanVendor();
        getAkunVendor();
    }, [])
    return (
        <Row>
            {dataVendor && (
                dataVendor.map((item, index) => (
                    <Col sm={12} md={6} lg={6} xl={3} key={index}>
                        <Card className="custom-card">
                            <Card.Body>
                                <div className="card-item">
                                    {/* <div className="card-item-icon card-icon">
                                        <svg
                                            className="text-primary"
                                            xmlns="http://www.w3.org/2000/svg"
                                            enableBackground="new 0 0 24 24"
                                            height="24" viewBox="0 0 24 24" width="24">
                                            <g><rect height="14" opacity=".3" width="14" x="5" y="5" /><g>
                                                <rect fill="none" height="24" width="24" />
                                                <g>
                                                    <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z" />
                                                    <rect height="5" width="2" x="7" y="12" />
                                                    <rect height="10" width="2" x="15" y="7" />
                                                    <rect height="3" width="2" x="11" y="14" />
                                                    <rect height="2" width="2" x="11" y="10" />
                                                </g>
                                            </g>
                                            </g>
                                        </svg>
                                    </div> */}
                                    <div className="card-item-title mb-2">
                                        <label className="main-content-label fs-17 fw-bold mb-1">
                                            {item.nama}
                                        </label>
                                        <span className="d-block fs-16 mb-0 text-muted">
                                            {item.total} Vendor
                                        </span>
                                    </div>

                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            )}



            <Col xl={12} md={12} sm={12} lg={12}>
                <Row>
                    <Col xl={6} md={6} sm={12} lg={6}>
                        <Card className="card custom-card h-100 w-100">
                            <Card.Header>
                                <div className="card-title">
                                    Data Pengajuan Rekanan Vendor
                                </div>
                            </Card.Header>
                            <Card.Body>
                                {dataTablePengajuan.length > 0 ? (
                                    <BasicTable column={column_pengajuan} datatable={dataTablePengajuan} />
                                ) : (
                                    <div
                                        className="d-flex flex-column align-items-center justify-content-center text-center py-5"
                                        style={{
                                            minHeight: "280px",
                                        }}
                                    >
                                        <div
                                            className="mb-4 d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "90px",
                                                height: "90px",
                                                borderRadius: "50%",
                                                background:
                                                    "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)",
                                            }}
                                        >
                                            <i
                                                className="ti ti-database-off"
                                                style={{
                                                    fontSize: "42px",
                                                    color: "#6366f1",
                                                }}
                                            />
                                        </div>

                                        <h5
                                            className="fw-bold mb-2"
                                            style={{
                                                color: "#111827",
                                            }}
                                        >
                                            Tidak Ada Data
                                        </h5>

                                        <p
                                            className="mb-0"
                                            style={{
                                                color: "#6b7280",
                                                maxWidth: "320px",
                                                lineHeight: "1.7",
                                            }}
                                        >
                                            Data belum tersedia saat ini. Silakan kembali lagi
                                            nanti atau tambahkan data baru.
                                        </p>
                                    </div>
                                )}

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6} md={6} sm={12} lg={6}>
                        <Card className="card custom-card h-100 w-100">
                            <Card.Header>
                                <div className="card-title">
                                    Data Pengajuan Aktivasi Akun Vendor
                                </div>
                            </Card.Header>
                            <Card.Body>
                                {dataTableAkunVendor.length > 0 ? (
                                    <BasicTable column={column_akun} datatable={dataTableAkunVendor} />
                                ) : (
                                    <div
                                        className="d-flex flex-column align-items-center justify-content-center text-center py-5"
                                        style={{
                                            minHeight: "280px",
                                        }}
                                    >
                                        <div
                                            className="mb-4 d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "90px",
                                                height: "90px",
                                                borderRadius: "50%",
                                                background:
                                                    "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)",
                                            }}
                                        >
                                            <i
                                                className="ti ti-database-off"
                                                style={{
                                                    fontSize: "42px",
                                                    color: "#6366f1",
                                                }}
                                            />
                                        </div>

                                        <h5
                                            className="fw-bold mb-2"
                                            style={{
                                                color: "#111827",
                                            }}
                                        >
                                            Tidak Ada Data
                                        </h5>

                                        <p
                                            className="mb-0"
                                            style={{
                                                color: "#6b7280",
                                                maxWidth: "320px",
                                                lineHeight: "1.7",
                                            }}
                                        >
                                            Data belum tersedia saat ini. Silakan kembali lagi
                                            nanti atau tambahkan data baru.
                                        </p>
                                    </div>
                                )}

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>




            </Col>

        </Row>
    )
}

export default VendorManagementSystemSection;