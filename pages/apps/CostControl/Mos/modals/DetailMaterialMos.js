import { Button, Divider} from "@mui/material";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { useEffect, useState } from "react";
import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";
import { Modal } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
// import {LoadersSimUmira} from "@";


const DetailMaterialPu = ({openModal, setOpenModal, loader, setLoader}) => {
    const [dataTable, setDataTable] = useState([]);
    
     const COLUMNS = [
        {
            Header: "Cost Code",
            accessor: "cost_code",
        },
        {
            Header: "Item",
            accessor: "item",
        },
        {
            Header: "Harga Satuan",
            accessor: "harga_satuan",
        },
        {
            Header: "Total Volume",
            accessor: "volume_total",
        },
        {
            Header: "Volume yang di gunakan",
            accessor: "volume",
        },
    ];
    const getDataMaterialPu = async() => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Mos/get-mos-by-pu", {
                params:{
                    id: openModal.id_pu
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                const arrDataMaterialPu = [];
                if(result.data.data.length > 0){
                    result.data.data.forEach(element => {
                        arrDataMaterialPu.push({
                            cost_code: element.kode_rap,
                            item: element.item_pekerjaan,
                            harga_satuan: (element.harga_satuan) ? toCurrency(element.harga_satuan): "",
                            volume_total: element.volume_rapa,
                            volume : element.volume_material
                        });
                    });
                }
                setDataTable(arrDataMaterialPu);
                setLoader(false);
            }
        }catch(error){
             console.log("e = "+error);
        }
    }
    const toCurrency = (value) => {
        if (!value) return "Rp0";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(Number(value));
    };
    useEffect(() => {
        if(openModal.open){
            getDataMaterialPu();
        }
        
    },[openModal.open])
    return(
        <Modal size="xl" show={openModal.open} onHide={() => {setOpenModal({...openModal, open: false});setDataTable([])}}>
            <LoadersSimUmira open={loader} />
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Detail Material PU</h6>
            </Modal.Header>
            <Modal.Body>
                {/* <h6>kode RAP : {dataRapa.kode_rap}</h6>
                <h6>Kategori : {dataRapa.kategori}</h6>
                <h6>group : {dataRapa.group}</h6>
                <h6>Item Pekerjaan : {dataRapa.item_pekerjaan}</h6>
                <h6>Spesifikasi : {dataRapa.spesifikasi}</h6>
                <h6>Satuan : {dataRapa.satuan}</h6>
                <h6>Volume : {dataRapa.volume}</h6>
                <h6>Harga Satuan : {toCurrency(dataRapa.harga_satuan)}</h6>
                <h6>Harga Total : {toCurrency(dataRapa.harga_total)}</h6> */}
               
                <Divider />
                 <div className="table-responsive mt-2">
                    <BasicTableCostControl column={COLUMNS} datatable={dataTable} />
                 </div>
            </Modal.Body>
            <Modal.Footer>
                 
                <Button variant='contained' type="button" className="btn btn-secondary" 
                    data-bs-dismiss="modal" onClick={() => {setOpenModal({...openModal, open: false})}}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(DetailMaterialPu), { ssr: false });