import { Divider } from "@mui/material";
import { Button, Col, Modal, Row } from "react-bootstrap";
import apiConfig from "@/utils/AxiosConfig";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";


const CostCodeProyek = ({openModal, setOpenModal, loader, setLoader}) => {
    const [proyek, setProyek] = useState([]);
    const getProyekByCostCode = async() => {
         const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Cost-Code/get-cost-code-by-proyek", {
                params:{
                    cost_code: openModal.cost_code,
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                setProyek(result.data.data);
            }
           
        } catch (error) {
            // setLoader(false);
            console.log(error);
        }finally{setLoader(false)}
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
            getProyekByCostCode()
        }
    },[openModal.open])
    return(
         <Modal size="md" show={openModal.open} onHide={() => {setOpenModal({...openModal, open: false})}}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Detail Cost Code</h6>
                <small className="text-muted">{openModal.nama_cost_code}</small>
            </Modal.Header>
            <Modal.Body>
                {proyek && (
                   proyek?.map((item, index) => (
                            <div key={index} className="mb-3 p-3 border rounded bg-light">
                                
                                <Row className="mb-2">
                                    <Col>
                                        <small className="text-muted">Proyek</small>
                                        <div className="fw-bold">{item.nama_proyek}</div>
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col>
                                        <small className="text-muted">Volume</small>
                                        <div>{item.volume}</div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <small className="text-muted">Harga Total</small>
                                        <div className="fw-semibold text-success">
                                            {toCurrency(item.harga_total)}
                                        </div>
                                    </Col>
                                </Row>

                            </div>
                        ))
                )}
               
                 
            </Modal.Body>
            <Modal.Footer>
                <Button variant='contained' type="button" className="btn btn-secondary" 
                    data-bs-dismiss="modal" onClick={() => {setOpenModal({...openModal, open: false})}}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default dynamic(() => Promise.resolve(CostCodeProyek), { ssr: false });