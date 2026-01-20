import { Button, Modal } from "react-bootstrap";
import LoadersSimUmira from "@/pages/apps/Component/LoaderSimUmira";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";



const DetailBk = ({openModal, setOpenModal}) => {
    const [loader, setLoader] = useState();
    const [reload, setReload] = useState();
    const [dataTable, setDataTable] = useState([]);
    const [dataRapa, setDataRapa] = useState({
        kode_rap: "",
        kategori: "",
        group: "",
        item_pekerjaan: "",
        spesifikasi: "",
        satuan: "",
        volume: "",
        harga_satuan: "",
        harga_total: ""
    });

    const COLUMNS = [
        {
            Header: "Nama vendor",
            accessor: "nama_vendor",
        },
        {
            Header: "Volume",
            accessor: "volume_bk",
        },
        {
            Header: "Harga Total",
            accessor: "harga_total",
        },
        {
            Header: "Nama Penerima",
            accessor: "nama_penerima",
        },
        {
            Header: "Tanggal Penerima",
            accessor: "tanggal_penerima",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ]

    const getRapaById = async() => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Rapa/get-rapa-id?id_rapa="+openModal.id_rapa, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			});
            if(result.status == 200){
                // if(result.data.data.length > 0){
                //     const rapaArr = [];
                //     for(const res of result.data.data){
                //         rapaArr.push({
                //             value: res.id_rapa,
                //             label: res.kode_rap+" | "+res.kategori+" | "+res.item_pekerjaan
                //         })
                //     }
                //     setRapa(rapaArr);
                // }
                
                // console.log(result.data)
                setDataRapa({
                    kode_rap: result.data.data.kode_rap,
                    kategori: result.data.data.kategori,
                    group: result.data.data.group,
                    item_pekerjaan: result.data.data.item_pekerjaan,
                    spesifikasi: result.data.data.spesifikasi,
                    satuan: result.data.data.satuan,
                    volume: result.data.data.volume,
                    harga_satuan: result.data.data.harga_satuan,
                    harga_total: result.data.data.harga_total
                })
                setLoader(false);
            }
        }catch(e){
            setLoader(false);
            console.log("e = "+e);
        }
    }
    const getBkByIdRapa = async() => {
         setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/BiayaKonstruksi/get-bk-by-rapa?id_rapa="+openModal.id_rapa, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			});
            console.log(result);
            if(result.status == 200){
                const arrBk = [];
                for(const data of result.data.data){
                    arrBk.push({
                        nama_vendor: data.nama_vendor,
                        volume_bk: data.volume_bk,
                        harga_total: toCurrency(data.harga_total),
                        nama_penerima: data.nama_penerima,
                        tanggal_penerima: (data.tanggal_penerima)?data.tanggal_penerima:"-",
                        aksi:<div className="d-flex flex-row gap-2">
                                    <button className="btn btn-danger" onClick={() => deleteData(data.id_biaya_kontruksi)}>Delete</button>
                                </div>
                    })
                }
                setDataTable(arrBk)
            }
        }catch(e){
            setLoader(false);
            console.log("e = "+e);
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
            setLoader(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            console.log(id)
            try {
                const result = await apiConfig.delete(apiUrl + "/CostControl/BiayaKonstruksi/delete-bk?id="+id, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                if(result.status == 200){
                    setLoader(false);
				    swalAlert(result.data.message, result.statusText, "success");
                }
                
            } catch (error) {
                // console.log(error);
                setLoader(false);
			    swalAlert(error.message, error.code, "error");
            }
            

        }
        // console.log(id)
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
        if(openModal.open){
            getRapaById();
            getBkByIdRapa();
            // console.log(openModal.id_rapa);
        }
    },[openModal.open, reload]);
    return(
        <Modal size="xl" show={openModal.open} onHide={() => {setOpenModal({...openModal, open: false});setDataTable([])}}>
            <LoadersSimUmira open={loader} />
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Detail Biaya Konstruksi</h6>
            </Modal.Header>
            <Modal.Body>
                <h6>kode RAP : {dataRapa.kode_rap}</h6>
                <h6>Kategori : {dataRapa.kategori}</h6>
                <h6>group : {dataRapa.group}</h6>
                <h6>Item Pekerjaan : {dataRapa.item_pekerjaan}</h6>
                <h6>Spesifikasi : {dataRapa.spesifikasi}</h6>
                <h6>Satuan : {dataRapa.satuan}</h6>
                <h6>Volume : {dataRapa.volume}</h6>
                <h6>Harga Satuan : {toCurrency(dataRapa.harga_satuan)}</h6>
                <h6>Harga Total : {toCurrency(dataRapa.harga_total)}</h6>
               
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

export default dynamic(() => Promise.resolve(DetailBk), { ssr: false });