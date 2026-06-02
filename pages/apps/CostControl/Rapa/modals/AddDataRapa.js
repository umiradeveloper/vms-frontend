import { useEffect, useState } from "react";
import { Col, Modal } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import { Divider } from "@mui/material";
import Swal from "sweetalert2";
const Select = dynamic(() => import("react-select"), { ssr: false });



const AddDataRapa = ({ openModal, setOpenModal, loader, setLoader }) => {
    const [costCode, setCostCode] = useState([])
    const [rows, setRows] = useState([
        { cost_code: "", volume: "", harga_satuan: "", harga_total: "" }
    ]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        console.log(name)
        const updated = [...rows];
       
        updated[index][name] = value;
        

        setRows(updated);
    };
    const handleChangeSelect = (index, selectedOption, name) => {
        const updated = [...rows];

        updated[index][name] = selectedOption?.value; // or full object

        setRows(updated);
    };
    

    const addRow = () => {
        setRows([...rows, { cost_code: "", volume: "", harga_satuan: "", harga_total: "" }]);
    };
    const removeRow = (index) => {
        const updated = rows.filter((_, i) => i !== index);
        setRows(updated);
    };
    const getCostCode = async() => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Cost-Code/get-cost-code", {
				headers: {
					"Content-Type": "application/json"
				}
			});
            if(result.status == 200){
                if(result.data.data.length > 0){
                    const costCodeArr = [];
                    for(const res of result.data.data){
                        costCodeArr.push({
                            value: res.cost_code,
                            label: res.cost_code+" | "+res.nama+" | "+res.jenis+" | "+res.kategori?.nama_kategori+" | "+res.spesifikasi
                        })
                    }
                    setCostCode(costCodeArr)
                    // setRapa(rapaArr);
                }
                
                console.log(result.data)
                setLoader(false);
            }
        }catch(e){
            setLoader(false);
            console.log("e = "+e);
        }
    }
     const submit = async() => {
        setLoader(true);
        let dataSubmit = {
            kode_proyek: openModal.kode_proyek,
            // kategori:[],
            // kode_rap:[],
            // group:[],
            // item_pekerjaan:[],
            // spesifikasi:[],
            // satuan:[],
            cost_code: [],
            volume:[],
            harga_satuan:[],
            harga_total:[]
        }
        for(const data of rows){
            // dataSubmit.kategori.push((data.kategori)?data.kategori:"-");
            // dataSubmit.kode_rap.push((data.kode_rap)?data.kode_rap:"-");
            // dataSubmit.group.push((data.group)?data.group:"-");
            // dataSubmit.item_pekerjaan.push((data.item_pekerjaan)?data.item_pekerjaan:"-");
            // dataSubmit.spesifikasi.push((data.spesifikasi)?data.spesifikasi:"-");
            // dataSubmit.satuan.push((data.satuan)?data.satuan:"-");
            dataSubmit.cost_code.push((data.cost_code)?data.cost_code:"");
            dataSubmit.volume.push((data.volume)?data.volume:0);
            dataSubmit.harga_satuan.push((data.harga_satuan)?clearCurrency(data.harga_satuan):0);
            dataSubmit.harga_total.push((data.harga_total)?clearCurrency(data.harga_total):0);
        }
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.post(apiUrl + "/CostControl/Rapa/create-rapa-bulk", dataSubmit,{
				headers: {
					"Content-Type": "application/json"
				}
			});
            if(result.status){
               setLoader(false);
               swalAlert(result.data.message, result.statusText, "success");
               setRows([]);
               setOpenModal({...openModal, open: false})
            
            }
            
            // console.log(result) 
        }catch(error){
            setLoader(false);
            console.log("e = "+error);
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
                    // setReload(prev => !prev);
                    clearInterval(timerInterval);
                },
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
        }
    const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
    };

    const clearCurrency = (value) => {
        if (!value) return 0;

        return Number(
            value
                .replace(/[^0-9,-]+/g, "") // hapus Rp, spasi, dll
                .replace(",", ".")         // handle decimal kalau ada
        );
    };
    useEffect(() => {
        getCostCode()
    },[])
    return (
        <Modal size="xl" show={openModal.open} onHide={() => setOpenModal({ ...openModal, open: false })}>

            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Tambah Rapa</h6>
            </Modal.Header>
            <Modal.Body>
                <div className="container mt-4">
                    <div className="card shadow-sm p-3">
                        {/* <h5 className="mb-3">Tambah Rapa</h5> */}
                        <div className="m-3">
                        <h5>Kode Proyek : {openModal.kode_proyek}</h5>
                        <h5>Nama Proyek : {openModal.nama_proyek}</h5>
                        <h5>Tanggal Berakhir Kontrak : {openModal.tanggal_kontrak}</h5>
                        <h5>RAB (Rincian Anggaran Biaya) : {openModal.biaya_rab}</h5>
                        <h5>RAP (Rincian Anggaran Proyek) : {openModal.biaya_rap}</h5>
                        <h5>BK/PU Awal: {openModal.bk_pu_awal}</h5>
                        </div>
                        <Divider/>
                        <div className="m-3">
                    {rows.map((row, i) => (
                            <div
                                key={i}
                                className="d-flex gap-2 align-items-center mb-2"
                            >
                                {/* Select */}
                                {/* <select
                                    className="form-select"
                                    name="category"
                                    value={row.category}
                                    onChange={(e) => handleChange(i, e)}
                                    style={{ maxWidth: "200px" }}
                                >
                                    <option value="">-- Select --</option>
                                    <option value="A">Category A</option>
                                    <option value="B">Category B</option>
                                </select> */}

                                <Col xl={3}>
                                    {/* <label htmlFor="nama-proyek" className="form-label ">RAPA <span style={{ color: "red" }}>*</span> :</label> */}
                                    {/* <input type="text" className={`form-control`} id="id_rapa" placeholder="Rapa" value={dataBk.id_rapa} onChange={(e) => setDataBk({ ...dataBk, id_rapa: e.target.value })} /> */}
                                    <Select name="id_cost_code" options={costCode} className="basic-multi-select " isSearchable
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Cost Code" onChange={(option) => handleChangeSelect(i, option, "cost_code")}
                                    />
                                </Col>

                                {/* Input */}
                                 <Col xl={2}>
                                <input
                                    className="form-control"
                                    name="volume"
                                    value={row.volume}
                                    onChange={(e) => handleChange(i, e)}
                                    placeholder="Volume"
                                />
                                </Col>

                                <Col xl={3}>
                                <input
                                    className="form-control"
                                    name="harga_satuan"
                                    value={row.harga_satuan}
                                    onChange={(e) => handleChange(i, e)}
                                    placeholder="Harga Satuan"
                                />
                                </Col>
                                 <Col xl={3}>
                                    <input
                                        className="form-control"
                                        name="harga_total"
                                        value={row.harga_total}
                                        onChange={(e) => handleChange(i, e)}
                                        placeholder="Harga Total"
                                    />
                                </Col>

                                {/* Remove Button */}
                                 <Col xl={2}>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeRow(i)}
                                        disabled={rows.length === 1}
                                    >
                                        ✕
                                    </button>
                                </Col>
                            </div>
                        ))}
                        </div>

                        {/* Add Button */}
                        <div className="m-3 d-flex gap-2">
                            <button className="btn btn-primary" onClick={addRow}>
                                + Add Row
                            </button>
                            {/* <button className="btn btn-danger" onClick={() => setOpenModal({...openModal, open: false})}>
                                Close
                            </button> */}
                        </div>
                        <Divider/>
                        <div className="m-3 d-flex justify-content-end gap-2 ">
                            <button className="btn btn-success" onClick={submit}>
                                Submit
                            </button>
                            <button className="btn btn-danger" onClick={() => setOpenModal({...openModal, open: false})}>
                                Close
                            </button>
                        </div>

                        {/* <pre className="mt-3 bg-light p-2 rounded">
                            {JSON.stringify(rows, null, 2)}
                        </pre> */}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )

}

export default dynamic(() => Promise.resolve(AddDataRapa), { ssr: false });