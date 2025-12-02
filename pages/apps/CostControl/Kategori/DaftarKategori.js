import { Fragment, useEffect, useState } from "react";
import { Card, Col, Row, Modal, Button } from "react-bootstrap";
import BasicTableCostControl from "../../DataTables/DataTablesCostControl";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";

const DaftarKategori = () => {
    const [loader, setLoader] = useState(false);
    const [datatable, setDataTable] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        kode_kategori: "",
        nama_kategori: ""
    });

    const COLUMNS = [
        { Header: "Kode Kategori", accessor: "kode_kategori" },
        { Header: "Nama Kategori", accessor: "nama_kategori" },
        {
            Header: "Hapus Kategori",
            accessor: "hapus",
            Cell: ({ row }) => (
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(row.original)}
                >
                    Delete
                </button>
            )
        }
    ];

    const handleDelete = async (item) => {
        const confirmed = await Swal.fire({
            title: "Hapus Kategori?",
            text: `Apakah Anda yakin ingin menghapus kategori '${item.nama_kategori}'?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((r) => r.isConfirmed);

        if (!confirmed) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            const response = await apiConfig.delete(
                apiUrl + `/CostControl/Kategori/delete-kategori?id=${item.id_kategori}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            Swal.fire({
                title: "Berhasil!",
                text: response.data.message,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            getDaftarKategori(); 
        } catch (error) {
            Swal.fire({
                title: "Gagal!",
                text: error.message,
                icon: "error",
            });
        }
    };

    const getDaftarKategori = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Kategori/get-kategori", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (result.status === 200) {
                const arr = result.data.data.map((d) => ({
                    id_kategori: d.id_kategori,
                    kode_kategori: d.kode_kategori,
                    nama_kategori: d.nama_kategori,
                }));

                setDataTable(arr);
            }
        } catch (err) {
            console.log(err);
        }

        setLoader(false);
    };

    useEffect(() => {
        getDaftarKategori();
    }, []);

    const submitKategori = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const result = await apiConfig.post(
                apiUrl + "/CostControl/Kategori/create-kategori",
                form,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            Swal.fire({
                title: "Berhasil!",
                text: result.data.message,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            setShowModal(false);
            setForm({ kode_kategori: "", nama_kategori: "" }); 
            getDaftarKategori();
        } catch (err) {
            Swal.fire({
                title: "Gagal!",
                text: err.message,
                icon: "error",
            });
        }

        setLoader(false);
    };

    return (
        <Fragment>
            <Seo title={"Daftar Kategori"} />
            <PageHeaderVms
                title="Daftar Kategori"
                item="Kategori"
                active_item="Daftar Kategori"
            />
            <LoadersSimUmira open={loader} />

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div className="card-title">Data Kategori</div>

                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => setShowModal(true)}
                            >
                                + Tambah Kategori
                            </button>
                        </Card.Header>

                        <Card.Body>
                            <div className="table-responsive">
                                <BasicTableCostControl
                                    column={COLUMNS}
                                    datatable={datatable}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Kategori</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <label>Kode Kategori</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={form.kode_kategori}
                        onChange={(e) =>
                            setForm({ ...form, kode_kategori: e.target.value })
                        }
                    />

                    <label>Nama Kategori</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.nama_kategori}
                        onChange={(e) =>
                            setForm({ ...form, nama_kategori: e.target.value })
                        }
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={submitKategori}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

DaftarKategori.layout = "ContentlayoutVms";
export default DaftarKategori;
