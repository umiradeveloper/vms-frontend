import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";
import { useState, useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";

const Select = dynamic(() => import("react-select"), { ssr: false });

const formatNum = (val) => {
    let clean = String(val || "").replace(/[^\d]/g, "");
    return clean ? new Intl.NumberFormat("id-ID").format(clean) : "";
};

const cleanNum = (val) => Number(String(val || "").replace(/\./g, "")) || 0;

const emptyForm = {
    id_employee:              "",
    gaji_pokok:               "",
    tunjangan_jabatan:        "",
    tunjangan_transport:      "",
    tunjangan_makan:          "",
    tunjangan_lembur:         "",
    tunjangan_lainnya:        "",
    bpjs_kesehatan:           "",
    bpjs_ketenagakerjaan:     "",
    // deductions
    kasbon:                   "",
    pinjaman:                 "",
    thr_paid:                 "",
    jaminan_pensiun:          "",
    bpjs_kesehatan_deduction: "",
    bpjs_kesehatan_family:    "",
    jht_employee:             "",
    pph21:                    "",
};

const CreatePayrollMaster = ({ loader, setLoader, openModal, setOpenModal, onSuccess, reload, setReload }) => {
    const [daftarEmployee, setDaftarEmployee] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [daftarLembur, setDaftarLembur] = useState();

    const authHeader = () => ({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
    });

    const getEmployee = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const res = await apiConfig.get(apiUrl + "/HR-Employee/get-employee", {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            });
            if (res.status === 200) {
                setDaftarEmployee(res.data.data.map(e => ({
                    value: e.id_employee,
                    label: e.nama + " — " + e.jabatan,
                })));
            }
            // console.log(data);
        } catch (e) { console.log(e); }
    };

     const getJenisLembur = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const res = await apiConfig.get(apiUrl + "/master/get-jenis-lembur");
            if (res.status === 200) {

                setDaftarLembur(res.data.data.map(e => ({
                    value: e.kode_lembur+"|"+e.biaya_lembur,
                    label: e.biaya_lembur,
                })));
            }
            console.log(res);
        } catch (e) { console.log(e); }
    };

    const handleSubmit = async () => {
        if (!form.id_employee) {
            Swal.fire("Validasi", "Karyawan wajib dipilih", "warning");
            return;
        }
        if (!form.gaji_pokok) {
            Swal.fire("Validasi", "Gaji pokok wajib diisi", "warning");
            return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);

        const body = {
            id_employee:              form.id_employee,
            gaji_pokok:               cleanNum(form.gaji_pokok),
            tunjangan_transport:      cleanNum(form.tunjangan_transport),
            tunjangan_jabatan:        cleanNum(form.tunjangan_jabatan),
            tunjangan_makan:          cleanNum(form.tunjangan_makan),
            // tunjangan_lembur:         cleanNum(form.tunjangan_lembur),
            tunjangan_lainnya:        cleanNum(form.tunjangan_lainnya),
            bpjs_kesehatan:           cleanNum(form.bpjs_kesehatan),
            bpjs_ketenagakerjaan:     cleanNum(form.bpjs_ketenagakerjaan),
            kasbon:                   cleanNum(form.kasbon),
            pinjaman:                 cleanNum(form.pinjaman),
            thr_paid:                 cleanNum(form.thr_paid),
            jaminan_pensiun:          cleanNum(form.jaminan_pensiun),
            bpjs_kesehatan_deduction: cleanNum(form.bpjs_kesehatan_deduction),
            bpjs_kesehatan_family:    cleanNum(form.bpjs_kesehatan_family),
            jht_employee:             cleanNum(form.jht_employee),
            pph21:                    cleanNum(form.pph21),
        };

        try {
            const result = await apiConfig.post(
                apiUrl + "/HR-Payroll/create-payroll-master",
                body,
                { headers: authHeader() }
            );
            if (result.status === 200) {
                setLoader(false);
                Swal.fire("Berhasil", result.data.message, "success");
                setOpenModal({ open: false });
                setForm(emptyForm);
                if (onSuccess) onSuccess();
                setReload(prev => !prev);
            }
        } catch (e) {
            setLoader(false);
            Swal.fire("Gagal", e.response?.data?.message || "Gagal menyimpan", "error");
        }
    };

    useEffect(() => {
        if (openModal.open) {
            getEmployee();
            setForm(emptyForm);
            getJenisLembur();
        }
    }, [openModal.open]);

    const numField = (key, label, required = false) => (
        <Col xl={6} key={key}>
            <label className="form-label">
                {label} {required && <span style={{ color: "red" }}>*</span>} :
            </label>
            <div className="input-group">
                <span className="input-group-text">Rp</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="0"
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: formatNum(e.target.value) })}
                />
            </div>
        </Col>
    );
    const selectedField = (key, label, required = false, option = []) => ( 
        <Col xl={6} key={key}>
            <label className="form-label">
                {label} {required && <span style={{ color: "red" }}>*</span>} :
            </label>
            <div className="input-group">
                <span className="input-group-text">Rp</span>
                 <div className="flex-grow-1">
                <Select
                    name={key}
                    options={option}
                    placeholder="Pilih..."
                    classNamePrefix="select"
                    isSearchable
                    menuPlacement="auto"
                    value={
                        option.find(
                            (item) => item.value === form[key]
                        ) || null
                    }
                    onChange={(selected) =>
                        setForm({
                            ...form,
                            [key]: selected?.value || ""
                        })
                    }
                    styles={{
                        container: (base) => ({
                            ...base,
                            width: "100%"
                        }),

                        control: (base) => ({
                            ...base,
                            minHeight: "46px",
                            width: "100%",
                            borderRadius: "0 7px 7px 0",
                            borderColor: "#e9edf4",
                            boxShadow: "none"
                        })
                    }}
                />
            </div>
            </div>
        </Col>
    );
   
    return (
        <Modal
            size="lg"
            show={openModal.open}
            onHide={() => setOpenModal({ open: false })}
            className="fade"
        >
            <LoadersSimUmira open={loader} />
            <Modal.Header closeButton>
                <h6 className="modal-title">Tambah Master Payroll</h6>
            </Modal.Header>
            <Modal.Body>
                {/* Karyawan */}
                <Row className="gy-3 mb-3">
                    <Col xl={12}>
                        <label className="form-label">
                            Karyawan <span style={{ color: "red" }}>*</span> :
                        </label>
                        <Select
                            options={daftarEmployee}
                            placeholder="Pilih karyawan..."
                            classNamePrefix="Select2"
                            onChange={(s) => setForm({ ...form, id_employee: s?.value || "" })}
                            value={daftarEmployee.find(e => e.value === form.id_employee) || null}
                            isClearable
                        />
                    </Col>
                </Row>

                {/* Pendapatan */}
                <p className="fw-bold mb-2" style={{ fontSize: "13px", color: "#22c55e" }}>
                    <i className="ri-add-circle-line me-1" /> Pendapatan
                </p>
                <Row className="gy-3 mb-4">
                    {numField("gaji_pokok",           "Gaji Pokok",                    true)}
                    {numField("tunjangan_transport",  "Tunjangan Transport")}
                    {numField("tunjangan_makan",      "Tunjangan Makan")}
                    {numField("tunjangan_jabatan",      "Tunjangan Jabatan")}
                    {/* {numField("tunjangan_lembur",     "Tunjangan Lembur")} */}
                    {selectedField("tunjangan_lembur", "Tunjangan Lembur", false, daftarLembur)}
                    {numField("tunjangan_lainnya",    "Tunjangan Lainnya")}
                    {numField("bpjs_kesehatan",       "BPJS Kesehatan (Employer)")}
                    {numField("bpjs_ketenagakerjaan", "BPJS Ketenagakerjaan (Employer)")}
                </Row>

                {/* Potongan */}
                <p className="fw-bold mb-2" style={{ fontSize: "13px", color: "#ef4444" }}>
                    <i className="ri-subtract-line me-1" /> Potongan
                </p>
                <Row className="gy-3">
                    {numField("kasbon",                   "Kasbon")}
                    {numField("pinjaman",                 "Pinjaman")}
                    {numField("thr_paid",                 "THR Paid")}
                    {numField("jaminan_pensiun",          "Jaminan Pensiun")}
                    {numField("bpjs_kesehatan_deduction", "BPJS Kesehatan (Employee)")}
                    {numField("bpjs_kesehatan_family",    "BPJS Kesehatan Family")}
                    {numField("jht_employee",             "JHT Employee")}
                    {numField("pph21",                    "PPh21")}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" type="button" className="btn btn-secondary"
                    onClick={() => setOpenModal({ open: false })}>
                    Batal
                </Button>
                <Button variant="contained" type="button" className="btn btn-primary"
                    onClick={handleSubmit}>
                    Simpan
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default dynamic(() => Promise.resolve(CreatePayrollMaster), { ssr: false });