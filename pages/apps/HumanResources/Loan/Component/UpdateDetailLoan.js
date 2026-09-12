
import { Col, Modal, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const Select = dynamic(() => import("react-select"), { ssr: false });

const UpdateDetailLoan = ({ loader, setLoader, openModal, setOpenModal, reload, setReload, openModalDetailLoan, setOpenModalDetailLoan }) => {
   
    const [dataLoan, setDataLoan] = useState({
        id_detail_loan: "",
        bulan:"",
        nominal: "",
        sisa: "",
        nama:"",
        jabatan:"",
        cicilan_ke:""
    })
  
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
                         clearInterval(timerInterval);
                     },
                 }).then((result) => {
                     /* Read more about handling dismissals below */
                     if (result.dismiss === Swal.DismissReason.timer) {
                         console.log("I was closed by the timer");
                     }
                 });
             }

    const UpdateDetailLoan = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
       
        try {
            const result = await apiConfig.get(apiUrl + "/Loan/update-detail-loan", {
                params:{
                    id: dataLoan.id_detail_loan,
                    nominal: cleanCurrency(dataLoan.nominal)
                },
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                swalAlert(result.data.message, result.statusText, "success");
                setReload(prev => !prev);
                setOpenModal({open: false});
            }
        }catch (error) {
            // setLoader(false);
            console.log(error);
        }finally{
            setLoader(false);
        }
     }
    const formatCurrency = (value) => {
        if (value === null || value === undefined || value === "") {
            return "Rp 0";
        }

        const cleanValue = String(value).replace(/\D/g, "");
        const number = parseInt(cleanValue, 10);

        if (isNaN(number)) {
            return "Rp 0";
        }

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    };
    const cleanCurrency = (value) => {
        return String(value).replace(/\D/g, "");
    };

    

    useEffect(() => {
        if (openModal.open) {
            setDataLoan({
                id_detail_loan: openModal.datas.id_detail_loan,
                bulan: openModal.datas.bulan,
                nominal: openModal.datas.nominal,
                nama: openModal.datas.nama,
                jabatan: openModal.datas.jabatan,
                cicilan_ke: openModal.datas.cicilan_ke
                // sisa

            })
            // console.log(openModal.datas);
            // getEmployee();

        }
    }, [openModal.open])

    

    return (
        <Modal size="md" className="modal-level-2" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }); setOpenModalDetailLoan({...openModalDetailLoan, open: true}); }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Update Detail Pinjaman</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Nama<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nip" placeholder="Bulan" value={dataLoan.nama} disabled/>
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Jabatan<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nip" placeholder="Bulan" value={dataLoan.jabatan} disabled/>
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Bulan<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nip" placeholder="Bulan" value={dataLoan.bulan} disabled/>
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Cicilan Ke<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nip" placeholder="Bulan" value={dataLoan.cicilan_ke} disabled/>
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Nominal<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nip" placeholder="Nominal Pinjaman" value={formatCurrency(dataLoan.nominal)} onChange={(e) => setDataLoan({ ...dataLoan, nominal: e.target.value })} />
                            </Col>
                            
                        </div>
                    </Col>

                </Row>
            </Modal.Body>
            <Modal.Footer className="gap-2">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={UpdateDetailLoan}>Update</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => {setOpenModal({ ...openModal, open: false }); setOpenModalDetailLoan({...openModalDetailLoan, open: true});}}>Close</Button>

            </Modal.Footer>
        </Modal>
    )


}

export default dynamic(() => Promise.resolve(UpdateDetailLoan), { ssr: false });