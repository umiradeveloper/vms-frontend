
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import BasicTableCostControl from "../../../DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import { Visibility } from "@mui/icons-material";
import DetailDashboardBiayaKonstruksi from "./DetailDashboardBiayaKonstruksi";

const DetailDashboardBkKategori = ({openModal, setOpenModal, loader, setLoader}) => {
    const [dataTable, setDataTable] = useState([]);
    const COLUMNS = [
        {
            Header: "Kode Kategori",
            accessor: "kode_kategori",
        },
        {
            Header: "Kategori",
            accessor: "nama_kategori",
        },
        {
            Header: "Biaya",
            accessor: "biaya",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ]
    const [openDetailBk, setOpenDetailBk] = useState({
        open: false,
        id_kategori: "",
        nama_kategori: "",
        biaya: 0,
        data_proyek: {}
      })

    const toCurrency = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Number(val || 0));
    const getBkKategori = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-bk-kategori?id_proyek=" + openModal.data_proyek?.id_proyek, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status) {
                const arrRapa = [];
                console.log(result)
                for (const data of result.data.data) {
                    let color = (data.harga_total < data.total_bk_rapa)?"danger":"success";
                    arrRapa.push({
                        kode_kategori: data.kode_kategori,
                        nama_kategori: data.nama_kategori,
                        biaya: toCurrency(data.biaya),
                        aksi:
                         <button
                            className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: 38, height: 38 }}
                            onClick={() => setOpenDetailBk({open: true, data_proyek: openModal.data_proyek, id_kategori: data.id_kategori, nama_kategori: data.nama_kategori, biaya: data.biaya})} // function kamu
                        >
                            <Visibility fontSize="small" />
                        </button>
                    })
                    // arrRapa.push({
                    //     kode_rap: (data.kode_rap) ? <span className={`text-${color}`}>{data.kode_rap}</span> : "",
                    //     kategori: (data.Kategori) ?  <span className={`text-${color}`}>{data.Kategori}</span> : "",
                    //     group: (data.group) ? <span className={`text-${color}`}>{data.group}</span> : "",
                    //     item_pekerjaan: (data.item_pekerjaan) ? <span className={`text-${color}`}>{data.item_pekerjaan}</span> : "",
                    //     spesifikasi: (data.spesifikasi) ? <span className={`text-${color}`}>{data.spesifikasi}</span> : "",
                    //     satuan: (data.satuan) ? <span className={`text-${color}`}>{data.satuan}</span> : "",
                    //     volume: (data.volume) ? <span className={`text-${color}`}>{data.volume}</span> : "",
                    //     harga_satuan: (data.harga_satuan) ? <span className={`text-${color}`}>{toCurrency(data.harga_satuan)}</span> : "",
                    //     harga_total: (data.harga_total) ? <span className={`text-${color}`}>{toCurrency(data.harga_total)}</span> : "",
                    //     total_bk_rapa: (data.total_bk_rapa) ? <span className={`text-${color}`}>{toCurrency(data.total_bk_rapa)}</span> : "",
                    //     catatan: (data.harga_total < data.total_bk_rapa)?<span className={`text-${color}`}>Melebihi Biaya RAPA</span>:""
                      
                    // })
                }
                setDataTable(arrRapa);


            }
            setLoader(false)
            console.log(result)
        } catch (error) {
            setLoader(false)
            console.log("e = " + error);
        }
    }
    useEffect(() => {
        if(openModal.open){
            getBkKategori()
            console.log(openModal);
        }
        
    },[openModal.open])
    return (
        <Modal size="xl" show={openModal.open} enforceFocus={false} onHide={() => { setOpenModal({ ...openModal, open: false }); setDataTable([]) }}>
            <DetailDashboardBiayaKonstruksi openModal={openDetailBk} setOpenModal={setOpenDetailBk} loader={loader} setLoader={setLoader}/>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Detail Biaya Konstruksi</h6>
            </Modal.Header>
            <Modal.Body>
                <h6>Kode Proyek : {openModal.data_proyek?.kode_proyek}</h6>
                <h6>Nama Proyek : {openModal.data_proyek?.nama_proyek}</h6>
                <h6>Tanggal Berakhir Kontrak : {openModal.data_proyek?.tanggal_kontrak}</h6>
                <h6>RAB (Rincian Anggaran Biaya) : {toCurrency(openModal.data_proyek?.biaya_rab)}</h6>
                <h6>RAP (Rincian Anggaran Proyek) : {toCurrency(openModal.data_proyek?.biaya_rap)}</h6>
                <Divider />

                <div className="table-responsive mt-2">
                    <BasicTableCostControl column={COLUMNS} datatable={dataTable} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant='contained' type="button" className="btn btn-primary" >Upload</Button> */}
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => { setOpenModal({ ...openModal, open: false }); setDataTable([]) }}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailDashboardBkKategori;