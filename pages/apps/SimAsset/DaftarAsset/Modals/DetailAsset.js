import { useEffect, useState } from "react"
import { Button, Card, Col, Modal, Row } from "react-bootstrap"
import Swal from "sweetalert2";
import api from "@/utils/AxiosConfig";



const DetailAsset = ({ openModal, setOpenModal }) => {
    const [detailAsset, setDetailAsset] = useState({
        kode_asset: "",
        id_user: "",
        nama_asset: "",
        kategori: "",
        lokasi: "",
        nilai_perolehan: 0,
        tanggal_perolehan: "",
        kondisi: "",
        status_asset: "",
        deskripsi_asset: "",
        foto: null,
        nilai_saat_ini: 0,
        umur_ekonomis: 0
    })
    const setData = async(datas) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await api.get(apiUrl + "/asset-manajemen/foto-asset?id="+datas.id_asset, {
                
                headers: {
                    "Content-Type": "application/json",
                }, responseType: "blob"
            });
            // console.log(result);
            // const url = window.URL.createObjectURL(new Blob([result.data], { type: "application/pdf" }));
            const contentType = result.headers["content-type"];
            const url = window.URL.createObjectURL(
                    new Blob([result.data], {
                        type: contentType,
                    })
            );
            setDetailAsset({...datas, foto: url, nama_user: datas.user_pemilik?.username});
            // Swal.fire({ title: "Dokumen Transaksi " + nama, html: `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`, width: "80%", showConfirmButton: false, showCloseButton: true });
        } catch (e) { 
            console.log(e);
            Swal.fire("Error", "Gagal membuka dokumen", "error"); 
        }
    }

    const InfoItem = ({ title, value }) => (
        <Col md={6}>
            <div>
                <div
                    style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        marginBottom: "4px",
                    }}
                >
                    {title}
                </div>

                <div
                    style={{
                        fontWeight: 600,
                        color: "#111827",
                    }}
                >
                    {value || "-"}
                </div>
            </div>
        </Col>
    );
    useEffect(() => {
        if(openModal.open && openModal.data){
            setData(openModal.data);
            // setDetailAsset({...openModal.data, nama_user: openModal.data?.user_pemilik?.username});
            // console.log(detailAsset)
        }
    },[openModal])

    return (
        <Modal
            size="xl"
            centered
            show={openModal.open}
            onHide={() => setOpenModal({ ...openModal, open: false })}
        >
            <Modal.Body className="p-0">

                {/* Header */}
                <div
                    className="p-4 text-white"
                    style={{
                        background:
                            "linear-gradient(135deg,#4f46e5 0%, #7c3aed 100%)"
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h3 className="mb-1">{detailAsset.nama_asset}</h3>
                            <p className="mb-0 opacity-75">
                                {detailAsset.kode_asset}
                            </p>
                        </div>

                        <span
                            className={`badge fs-6 px-3 py-2 ${detailAsset.status_asset === "AKTIF"
                                ? "bg-success"
                                : "bg-danger"
                                }`}
                        >
                            {detailAsset.status_asset}
                        </span>
                    </div>
                </div>

                <div className="p-4">
                    <Row>
                        {/* Foto Asset */}
                        <Col lg={4}>
                            <Card className="border-0 shadow-sm">
                                <Card.Body>
                                    <img
                                        src={detailAsset.foto}
                                        alt="asset"
                                        className="img-fluid rounded"
                                        style={{
                                            width: "100%",
                                            height: "280px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Informasi Asset */}
                        <Col lg={8}>
                            <Card className="border-0 shadow-sm">
                                <Card.Body>

                                    <h5 className="fw-bold mb-4">
                                        Informasi Asset
                                    </h5>

                                    <Row className="g-4">

                                        <InfoItem
                                            title="Penanggung Jawab"
                                            value={detailAsset.nama_user}
                                        />

                                        <InfoItem
                                            title="Kategori"
                                            value={detailAsset.kategori}
                                        />

                                        <InfoItem
                                            title="Lokasi"
                                            value={detailAsset.lokasi}
                                        />

                                        <InfoItem
                                            title="Kondisi"
                                            value={detailAsset.kondisi}
                                        />

                                        <InfoItem
                                            title="Tanggal Perolehan"
                                            value={detailAsset.tanggal_perolehan}
                                        />

                                        <InfoItem
                                            title="Umur Ekonomis"
                                            value={`${detailAsset.umur_ekonomis} Tahun`}
                                        />

                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* Financial */}
                            <Card className="border-0 shadow-sm mt-3">
                                <Card.Body>
                                    <h5 className="fw-bold mb-4">
                                        Informasi Finansial
                                    </h5>

                                    <Row>
                                        <Col md={6}>
                                            <div className="bg-light rounded p-3">
                                                <small className="text-muted">
                                                    Nilai Perolehan
                                                </small>
                                                <h4 className="mb-0 text-primary">
                                                    Rp{" "}
                                                    {Number(
                                                        detailAsset.nilai_perolehan || 0
                                                    ).toLocaleString("id-ID")}
                                                </h4>
                                            </div>
                                        </Col>

                                        <Col md={6}>
                                            <div className="bg-light rounded p-3">
                                                <small className="text-muted">
                                                    Nilai Saat Ini
                                                </small>
                                                <h4 className="mb-0 text-success">
                                                    Rp{" "}
                                                    {Number(
                                                        detailAsset.nilai_saat_ini || 0
                                                    ).toLocaleString("id-ID")}
                                                </h4>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* Deskripsi */}
                            <Card className="border-0 shadow-sm mt-3">
                                <Card.Body>
                                    <h5 className="fw-bold mb-3">
                                        Deskripsi Asset
                                    </h5>

                                    <p className="text-muted mb-0">
                                        {detailAsset.deskripsi_asset}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>

                <div className="border-top p-3 text-end">
                    <Button
                        variant="secondary"
                        onClick={() =>
                            setOpenModal({
                                ...openModal,
                                open: false,
                            })
                        }
                    >
                        Tutup
                    </Button>
                </div>

            </Modal.Body>
        </Modal>
    )
}

export default DetailAsset;