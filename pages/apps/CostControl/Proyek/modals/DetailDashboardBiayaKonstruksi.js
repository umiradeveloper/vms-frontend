import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import BasicTableCostControl from "../../../DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";



const DetailDashboardBiayaKonstruksi = ({ openModal, setOpenModal, loader, setLoader }) => {
    const [dataTable, setDataTable] = useState([]);
    const COLUMNS = [
        {
            Header: "Cost Code",
            accessor: "kode_rap",
        },
        {
            Header: "Kategori",
            accessor: "kategori",
        },
        // {
        //     Header: "Group",
        //     accessor: "group",
        // },
        {
            Header: "Item",
            accessor: "item_pekerjaan",
        },

        {
            Header: "Spesifikasi",
            accessor: "spesifikasi",
        },
        {
            Header: "satuan",
            accessor: "satuan",
        },
        {
            Header: "Volume",
            accessor: "volume",
        },
        {
            Header: "Harga Satuan",
            accessor: "harga_satuan",
        },
        {
            Header: "Harga Total",
            accessor: "harga_total",
        },
        {
            Header: "Realisasi Biaya Konstruksi",
            accessor: "total_bk_rapa",
        },
        {
            Header: "Catatan",
            accessor: "catatan",
        },
    ]
    const toCurrency = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Number(val || 0));
    const getRapa = async () => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-rapa-proyek-dashboard?id_proyek=" + openModal.data_proyek?.id_proyek+"&id_kategori="+openModal.id_kategori, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status) {
                const arrRapa = [];
                // console.log(result)
                for (const data of result.data.data) {
                    let color = (data.harga_total < data.total_bk_rapa)?"danger":"success";
                    
                    arrRapa.push({
                        kode_rap: (data.kode_rap) ? <span className={`text-${color}`}>{data.kode_rap}</span> : "",
                        kategori: (data.Kategori) ?  <span className={`text-${color}`}>{data.Kategori}</span> : "",
                        group: (data.group) ? <span className={`text-${color}`}>{data.group}</span> : "",
                        item_pekerjaan: (data.item_pekerjaan) ? <span className={`text-${color}`}>{data.item_pekerjaan}</span> : "",
                        spesifikasi: (data.spesifikasi) ? <span className={`text-${color}`}>{data.spesifikasi}</span> : "",
                        satuan: (data.satuan) ? <span className={`text-${color}`}>{data.satuan}</span> : "",
                        volume: (data.volume) ? <span className={`text-${color}`}>{data.volume}</span> : "",
                        harga_satuan: (data.harga_satuan) ? <span className={`text-${color}`}>{toCurrency(data.harga_satuan)}</span> : "",
                        harga_total: (data.harga_total) ? <span className={`text-${color}`}>{toCurrency(data.harga_total)}</span> : "",
                        total_bk_rapa: (data.total_bk_rapa) ? <span className={`text-${color}`}>{toCurrency(data.total_bk_rapa)}</span> : "",
                        catatan: (data.harga_total < data.total_bk_rapa)?<span className={`text-${color}`}>Melebihi Biaya RAPA</span>:""
                      
                    })
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
            getRapa()
        }
        
    },[openModal.open])
    return (
        <Modal size="xl" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }); setDataTable([]) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Detail Biaya Konstruksi</h6>
            </Modal.Header>
            <Modal.Body>
                <h6>Kode Proyek : {openModal.data_proyek?.kode_proyek}</h6>
                <h6>Nama Proyek : {openModal.data_proyek?.nama_proyek}</h6>
                <h6>Kategori : {openModal.nama_kategori}</h6>
                <h6>Biaya Total : {toCurrency(openModal.biaya)}</h6>
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

export default dynamic(() => Promise.resolve(DetailDashboardBiayaKonstruksi), { ssr: false });