import { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "../../DataTables/DataTablesCostControl";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";
import EditProyek from "@/pages/apps/CostControl/Proyek/modals/EditProyek";



const DaftarProyek = () => {
    const [loading, setLoading] = useState(false);
    const [datatable, setDataTable] = useState([]);
    const [reload, setReload] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState({
        id_proyek: "",
        open_modal: false
    });
     const COLUMNS = [
        {
            Header: "Kode Proyek",
            accessor: "kode_proyek",
        },
        {
            Header: "Nama Proyek",
            accessor: "nama_proyek",
        },
        {
            Header: "Deskripsi Proyek",
            accessor: "deskripsi_proyek",
        },
        {
            Header: "Tanggal Awal Kontrak",
            accessor: "tanggal_awal_kontrak",
        },
        {
            Header: "Tanggal Akhir Kontrak",
            accessor: "tanggal_akhir_kontrak",
        },
       
        {
            Header: "RAP (Rincian Anggaran Proyek)",
            accessor: "rap",
        },
        {
            Header: "RAB (Rincian Anggaran Biaya)",
            accessor: "rab",
        },
        
        {
            Header: "BK / PU awal",
            accessor: "bk_pu_awal",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];
    const getDaftarProyek = async() => {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Proyek/get-proyek", {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			});
            if(result.status == 200){
                const daftarArr = [];
                for await (const data of result.data.data) {
                    console.log(data)
                    daftarArr.push({
                        kode_proyek: data.kode_proyek,
                        nama_proyek: data.nama_proyek,
                        deskripsi_proyek: data.deskripsi_proyek,
                        tanggal_awal_kontrak: data.tanggal_awal_kontrak,
                        tanggal_akhir_kontrak: data.tanggal_akhir_kontrak,
                        rap: toCurrency(data.biaya_rap),
                        rab: toCurrency(data.biaya_rab),
                        bk_pu_awal: (data.bk_pu_awal)?data.bk_pu_awal+" %":"",
                        aksi:   <div className="d-flex flex-row gap-2">
                                    <button className="btn btn-success" onClick={() => setOpenModalEdit({id_proyek:data.id_proyek, open_modal: true})}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteData(data.id_proyek)}>Delete</button>
                                </div>
                    })
                }
                setDataTable(daftarArr);
                setLoading(false)
            }
            // console.log(result);
        } catch (error) {
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

    const deleteData = async(id) => {
        const resultConfirm = await AlertConfirm("Apakah anda yakin ingin menghapus data ini ? ", "warning", "Hapus", false, "Data berhasil di hapus");
        if(resultConfirm.status){
            setLoading(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            try {
                const result = await apiConfig.delete(apiUrl + "/CostControl/Proyek/delete-proyek?id="+id, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
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
        getDaftarProyek();
    },[reload, openModalEdit.open_modal])
    return (
        <Fragment>
            <Seo title={"Daftar Proyek"} />
            <PageHeaderVms title='Daftar Proyek' item='Daftar Proyek' active_item='Daftar Proyek' />
            <LoadersSimUmira open={loading} />
            <EditProyek openModal={openModalEdit} setOpenModal={setOpenModalEdit} loader={loading} setLoader={setLoading}/>
             <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Data Proyek
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">
                                <BasicTableCostControl column={COLUMNS} datatable={datatable} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )

}

DaftarProyek.layout = "ContentlayoutVms";
export default DaftarProyek;


