import { Button, Col, Modal, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { useEffect, useState } from "react";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import DokumenAdendum from "./DokumenAdendum";


const DaftarKontrakAdendum = ({openModal, setOpenModal, loading, setLoading}) => {
    const [datatable, setDatatable] = useState([]);
    const [reload, setReload] = useState();
    const [idDelete, setIdDelete] = useState();
    const [openModalDokumen, setOpenModalDokumen] = useState({
        open: false,
        file_url: ""
    })
    const COLUMNS = [
        {
            Header: "Nomor Adendum",
            accessor: "nomor_adendum",
        },
        {
            Header: "Kerja Tambah",
            accessor: "kerja_tambah",
        },
        {
            Header: "Kerja Kurang",
            accessor: "kerja_kurang",
        },
        {
            Header: "Dokumen Adendum",
            accessor: "lihat_dokumen",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];

    const getAdendumByProyek = async() => {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
             const result = await apiConfig.get(apiUrl + "/CostControl/AdendumProyek/get-adendum", {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				},
                params:{
                    id_proyek: openModal.id_proyek
                }
			});
            // console.log(result);
            const dataKontrak = [];
            for await (const data of result.data.data){
                dataKontrak.push({
                    nomor_adendum: data.nomor_adendum,
                    kerja_tambah: toCurrency(data.kerja_tambah),
                    kerja_kurang: toCurrency(data.kerja_kurang),
                    lihat_dokumen:   <div className="d-flex flex-row gap-2">
                                <button className="btn btn-info" onClick={() => {getDokumen(data.id_adendum)}}>Lihat Dokumen</button>
                            </div>,
                    aksi: <div className="d-flex flex-row gap-2">
                                <button className="btn btn-danger" onClick={() => {deleteData(data.id_adendum)}}>Delete</button>
                            </div>
                })
            }
            setDatatable(dataKontrak);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getDokumen = async(id) => {
         setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
             const response = await apiConfig.get(apiUrl + "/CostControl/AdendumProyek/dokumen-file", {
                responseType: "blob",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				},
                params:{
                    id: id
                }
			});
            // const typeData = {};
                // typeData.type = "application/pdf";
                const data = response.data;
                console.log(response);
                if(data){
                    // console.log(data);
                    const fileURL = window.URL.createObjectURL(
                        new Blob([data], {type: "application/pdf"})
                    );
                    //setFrameSrc(fileURL);
                    setOpenModalDokumen({
                        file_url: fileURL, open: true
                    });
                    // setSelectedOptions(kualifikasiArr);
                    // setTableData(userArr);
                    setLoading(false);
                }
        }catch(error){
            setLoading(false);
            console.log(error);
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

    const deleteData = async(id) => {
        const resultConfirm = await AlertConfirm("Apakah anda yakin ingin menghapus data ini ? ", "warning", "Hapus", false, "Data berhasil di hapus");
        if(resultConfirm.status){
             setLoading(true);
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                try {
                    const result = await apiConfig.delete(apiUrl + "/CostControl/AdendumProyek/delete-adendum", {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        },
                        params: {
                            id_adendum: id
                        }
                    });
                    if(result.status == 200){
                        setLoading(false);
                        swalAlert(result.data.message, result.statusText, "success");
                    }
                    
                } catch (error) {
                    // console.log(error);
                    setLoading(false);
                    swalAlert(error.message, error.code, "error");
                }
        }
    }

    const AlertConfirm = async(message, icon, confirmButtonName, textarea = false, messageDeleted = "Your file has been deleted.") => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger me-2"
                },
                buttonsStyling: false
            });
            let objSwall = {
                title: "Apakah Yakin?",
                text: message,
                icon: icon,
                showCancelButton: true,
                confirmButtonText: confirmButtonName,
                cancelButtonText: "Kembali",
                reverseButtons: true,
               
            };
            
            if(textarea){
                objSwall.input = 'textarea';
                objSwall.inputLabel = 'Catatan';
                objSwall.inputPlaceholder = 'Catatan....';
            
            }
            const result = await swalWithBootstrapButtons.fire(objSwall);
            if (result.isConfirmed) {
                    setReload(prev => !prev);
                    return {
                        status: true,
                        value: result.value
                    }; 
                        // ✅ user confirmed
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // await swalWithBootstrapButtons.fire(
                //     "Cancelled",
                //     // "Your imaginary file is safe :)",
                //     "error"
                // );
                return {
                    status: false,
                    // value: result.value
                }; // ✅ user cancelled
            }
    
            return false;
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
                setReload(prev => !prev);
                clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                setReload(prev => !prev);
                console.log("I was closed by the timer");
            }
        });
    }
    useEffect(() => {
        if(openModal.open_modal){
            getAdendumByProyek();
        }
        
    },[openModal.open_modal, reload])

    return(
         <Modal size="xl" show={openModal.open_modal} onHide={() => setOpenModal({ ...openModal, open_modal: false })} className="fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <DokumenAdendum openModal={openModalDokumen} setOpenModal={setOpenModalDokumen} />
            <Modal.Header closeButton>
                <h6 className="modal-title" id="exampleModalLabel">Daftar Kontrak Adendum</h6>
            </Modal.Header>
            <Modal.Body className="">
                <Row>
                    <Col xl={12}>
                        <Row>
                            <Col xl={12} className="rounded-3">
                                    <div className="table-responsive">
                                        <BasicTableCostControl column={COLUMNS} datatable={datatable} />
                                    </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="">
                
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open_modal: false })}>Close</Button>
            </Modal.Footer>
        </Modal>
    );

}

export default DaftarKontrakAdendum;