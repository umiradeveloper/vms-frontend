import { Fragment, useEffect, useState } from "react";
import { Card, Col, Row, Modal, Button } from "react-bootstrap";
import BasicTableCostControl from "./DataTables/DataTablesCostControl";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "./Component/PageHeaderVms";
import LoadersSimUmira from "./Component/LoaderSimUmira";
import Select from "react-select";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";


const Announcement = () => {
    const [loader, setLoader] = useState(false);
    const [datatable, setDataTable] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showDokumen, setShowDokumen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [form, setForm] = useState({
        judul_announcement: "",
        isi_announcement: "",
        dokumen: null,
        kode_role: [],
        foto_pengumuman: null
    });

    const [fileUrl, setFileUrl] = useState(null);

    const COLUMNS = [
        {
            Header: "Judul Announcement",
            accessor: "judul_announcement",
        },
        {
            Header: "Dibuat Oleh",
            accessor: "created_by",
        },
        {
            Header: "Tanggal Announcement",
            accessor: "created_at",
        },
        {
            Header: "Aksi",
            Cell: ({ row }) => {
                const item = row.original;

                return (
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-sm btn-info"
                            onClick={() => {
                                setSelectedAnnouncement(item);
                                setShowDetail(true);
                            }}
                        >
                            Read More
                        </button>

                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={() =>
                                getFile(item.id_announcement)
                            }
                        >
                            Lihat Dokumen
                        </button>

                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(item)}
                        >
                            Hapus
                        </button>

                        <button
                            className="btn btn-sm btn-info"
                            onClick={() => publish(item.id_announcement)    
                            }
                        >
                            Publish Announcement
                        </button>
                    </div>
                );
            },
        },
    ];

    const handleDelete = async (item) => {
        const confirmed = await Swal.fire({
            title: "Hapus Kategori?",
            text: `Apakah Anda yakin ingin menghapus kategori '${item.judul_announcement}'?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((r) => r.isConfirmed);

        if (!confirmed) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            const response = await apiConfig.delete(
                apiUrl + `/Announcement/delete-announcement?id=${item.id_announcement}`,
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

            getAnnouncement();
        } catch (error) {
            Swal.fire({
                title: "Gagal!",
                text: error.message,
                icon: "error",
            });
        }
    };

    const publish = async (id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const confirmed = await Swal.fire({
            title: "Publish Announcement?",
            text: "Notifikasi akan dikirim ke semua user sesuai role.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Publish!",
            cancelButtonText: "Batal",
        }).then((r) => r.isConfirmed);

        if (!confirmed) return;

        setLoader(true);

        try {
            const response = await apiConfig.get(
                apiUrl + "/Announcement/publish-announcement",
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                    params: { id },
                }
            );

            Swal.fire({
                title: "Berhasil!",
                text: "Announcement berhasil dipublish & notifikasi terkirim",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });

            getAnnouncement(); 

        } catch (error) {
            Swal.fire({
                title: "Gagal!",
                text: error.response?.data || error.message,
                icon: "error",
            });
        }

        setLoader(false);
    };

    const getRole = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const response = await apiConfig.get(
                apiUrl + "/role/get-role",
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            const datas = response.data.data
            let arrData = [];
            for (const res of datas) {
                arrData.push({
                    label: res.nama_role,
                    value: res.kode_role
                })
            }
            setRoleList(arrData);

        } catch (error) {
            console.log(error);
        }

        setLoader(false);
    };

    const getFile = async (id) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const response = await apiConfig.get(
                apiUrl + "/Announcement/dokumen-file",
                {
                    responseType: "blob",
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                    params: { id },
                }
            );

            const fileURL = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );

            setFileUrl(fileURL);
            setShowDokumen(true);

        } catch (error) {
            console.log(error);
        }

        setLoader(false);
    };

    const getAnnouncement = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const result = await apiConfig.get(
                apiUrl + "/Announcement/get-announcement",
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            if (result.status === 200) {
                // console.log(result);
                const arr = result.data.data.map((d) => ({
                    id_announcement: d.id_announcement,
                    judul_announcement: d.judulAnnouncement,
                    isi_announcement: d.isiAnnouncement,
                    created_by: d.userBy?.username ?? "",
                    created_at: formatdate(d.created_at),
                }));

                setDataTable(arr);
            }

        } catch (err) {
            console.log(err);
        }

        setLoader(false);
    };

    useEffect(() => {
        getAnnouncement();
        getRole();
    }, []);

    const formatdate = (tanggal) =>
        new Date(tanggal).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
        );

    const isFormValid =
        form.judul_announcement.trim() &&
        form.isi_announcement.trim() &&
        form.dokumen &&
        form.kode_role.length > 0;

    const submitAnnouncement = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        try {
            const formData = new FormData();

            formData.append("judul_announcement", form.judul_announcement);
            formData.append("isi_announcement", form.isi_announcement);
            formData.append("role_id", form.kode_role.join(","));
            // formData.append("dokumen", form.dokumen);
            // formData.append("foto_pengumuman", form.foto_pengumuman);

            // kalau file tidak wajib, cek dulu
            if (form.dokumen) {
                formData.append("dokumen", form.dokumen);
            }

            if (form.foto_pengumuman) {
                formData.append("foto_pengumuman", form.foto_pengumuman);
            }

            const result = await apiConfig.post(
                apiUrl + "/Announcement/create-announcement",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
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
            setForm({
                judul_announcement: "",
                isi_announcement: "",
                dokumen: null,
                foto_pengumuman: null
            });

            getAnnouncement();

        } catch (err) {
            Swal.fire({
                title: "Gagal!",
                text: err.response?.data || err.message,
                icon: "error",
            });
        }

        setLoader(false);
    };

    return (
        <Fragment>
            <Seo title={"Announcement"} />
            <PageHeaderVms
                title="Announcement"
                item="Pengumuman"
                active_item="Daftar Pengumuman"
            />
            <LoadersSimUmira open={loader} />

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div className="card-title">Daftar Pengumuman</div>

                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => setShowModal(true)}
                            >
                                + Buat Announcement
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
                    <Modal.Title>Buat Announcement</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <label>Judul Announcement</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={form.judul_announcement}
                        onChange={(e) =>
                            setForm({ ...form, judul_announcement: e.target.value })
                        }
                    />

                    <div className="mb-3">
                        <label className="form-label">
                            Isi Announcement
                        </label>

                        <textarea
                            className="form-control"
                            rows={4}
                            maxLength={200}
                            value={form.isi_announcement}
                            onChange={(e) =>
                                setForm({ ...form, isi_announcement: e.target.value })
                            }
                        />

                        <div className="d-flex justify-content-end">
                            <small className="text-muted">
                                {form.isi_announcement.length}/200 karakter
                            </small>
                        </div>
                    </div>

                    <label>Upload Dokumen</label>
                    <input
                        type="file"
                        className="form-control mb-3"
                        onChange={(e) =>
                            setForm({ ...form, dokumen: e.target.files[0] })
                        }
                    />

                    <label>Upload Foto</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control mb-3"
                        onChange={(e) =>
                            setForm({ ...form, foto_pengumuman: e.target.files[0] })
                        }
                    />

                    <label className="form-label">
                        Pilih Role :
                    </label>
                    <Select
                        options={roleList}
                        isMulti
                        isSearchable
                        placeholder="Pilih Role"
                        classNamePrefix="Select2"
                        onChange={(selected) => {
                            const roles = selected
                                ? selected.map((item) => item.value)
                                : [];
                            // console.log(roles);
                            setForm({
                                ...form,
                                kode_role: roles
                            });
                        }}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={submitAnnouncement} disabled={!isFormValid}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showDetail}
                onHide={() => setShowDetail(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Detail Announcement</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedAnnouncement && (
                        <>
                            <h4 className="fw-bold mb-3">
                                {selectedAnnouncement.judul_announcement}
                            </h4>

                            {selectedAnnouncement.foto_pengumuman && (
                                <div className="mb-3 text-center">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/Announcement/foto-pengumuman/${selectedAnnouncement.foto_pengumuman}`}
                                        alt="Foto Announcement"
                                        style={{
                                            width: "100%",
                                            maxHeight: "300px",
                                            objectFit: "cover",
                                            borderRadius: "8px"
                                        }}
                                    />
                                </div>
                            )}

                            {/* ISI */}
                            <div
                                style={{
                                    whiteSpace: "pre-line",
                                    fontSize: "15px",
                                    marginBottom: "20px"
                                }}
                            >
                                {selectedAnnouncement.isi_announcement}
                            </div>
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDetail(false)}
                    >
                        Tutup
                    </Button>
                    {/* {selectedAnnouncement && (
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(selectedAnnouncement)}
                        >
                            Delete
                        </button>
                    )} */}
                </Modal.Footer>
            </Modal>
            <Modal
                show={showDokumen}
                onHide={() => setShowDokumen(false)}
                size="xl"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Preview Dokumen</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ height: "80vh" }}>
                    {fileUrl && (
                        <iframe
                            src={fileUrl}
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                            title="Dokumen Preview"
                        />
                    )}
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

Announcement.layout = "ContentlayoutVms";
export default Announcement;
