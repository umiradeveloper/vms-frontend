import { Card, Col, Row } from "react-bootstrap";
import BasicTable from "@/pages/apps/DataTables/DataTablesVendor";
import { useEffect, useState } from "react";
import apiConfig from "@/utils/AxiosConfig";

const ChecklistPembayaranSection = ({loader, setLoader}) => {
     const [dataTablePengajuan, setDataTablePengajuan] = useState([]);
     const [cardPembayaran, setCardPembayaran] = useState([]);
     const column_pengajuan = [
        {
            Header: "ID Transaksi",
            accessor: "id_transaksi",
        },
         {
            Header: "Nama Pemohon",
            accessor: "nama_pemohon",
        },
         {
            Header: "Proyek",
            accessor: "proyek",
        },
        {
            Header: "Jenis Transaksi",
            accessor: "jenis_transaksi",
        },
       
        {
            Header: "Status",
            accessor: "status",
        },
    ]
   
     const getCardPembayaran = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/Dashboard/get-data/card-checklist-pembayaran", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if (result.status == 200) {
                // setDataVendor(result.data.data)
                setCardPembayaran(result.data.data);
                // setDatatable(pengajuanArr);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    const getPengajuanPembayaran = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/Dashboard/get-data/get-pengajuan-checklist-pembayaran", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result);
            if (result.status == 200) {
                const pengajuanArr = [];
                if(result.data.data.length > 0){
                    for(const data of result.data.data){
                        pengajuanArr.push({
                            id_transaksi: <div
                                style={{
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                    whiteSpace: "normal",
                                }}
                            >
                                {data.kode_transaksi}
                            </div> ?? "-",
                            nama_pemohon: <div
                                style={{
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                    whiteSpace: "normal",
                                }}
                            >
                                {data.user_pengajuan?.username}
                            </div> ?? "-",
                            proyek: <div
                                style={{
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                    whiteSpace: "normal",
                                }}
                            >
                                {data.proyek}
                            </div> ?? "-",
                            jenis_transaksi: <div
                                style={{
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                    whiteSpace: "normal",
                                }}
                            >
                                {data.jenis_transaksi}
                            </div> ?? "-",
                            status: <div
                                style={{
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                    whiteSpace: "normal",
                                }}
                            >
                                {data.status_pengajuan}
                            </div> ?? "-"
                        })
                    }
                }
               setDataTablePengajuan(pengajuanArr)
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    useEffect(() => {
        getCardPembayaran();
        getPengajuanPembayaran();
    },[])
    return (
        <Row>
            {cardPembayaran && (
                cardPembayaran.map((item, index) => (
                    <Col sm={12} md={6} lg={6} xl={3} key={index}>
                        <Card className="custom-card">
                            <Card.Body>
                                <div className="card-item">
                                    
                                    <div className="card-item-title mb-2">
                                        <label className="main-content-label fs-17 fw-bold mb-1">
                                            {item.nama}
                                        </label>
                                        <span className="d-block fs-16 mb-0 text-muted">
                                            {item.total} Pengajuan
                                        </span>
                                    </div>

                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            )}
             <Col xl={12} md={12} sm={12} lg={12}>
              
                        <Card className="card custom-card h-100 w-100">
                            <Card.Header>
                                <div className="card-title">
                                    Data Pengajuan Checklist Pembayaran
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

        </Row>
    )
}

export default ChecklistPembayaranSection;