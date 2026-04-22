import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import CreateEmployee from "../Employee/modals/CreateEmployee";
import EditEmployee from "../Employee/modals/EditEmployee";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";

const Employee = ({loader, setLoader}) => {
    const [reload ,setReload] = useState(false);
    const COLUMNS = [
          {
            Header: "NIP",
            accessor: "nip",
        },
        {
            Header: "Nama",
            accessor: "nama",
        },
        {
            Header: "Jabatan",
            accessor: "jabatan",
        },
        {
            Header: "Jenis Kelamin",
            accessor: "jenis_kelamin",
        },
        {
            Header: "Status Karyawan",
            accessor: "status_karyawan",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Grade",
            accessor: "grade",
        },
        //  
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];
    const [datatable, setDatatable] = useState([]);
    const [detailAdd, setDetailAdd] = useState({
        open: false
    });
    const [detailEdit, setDetailEdit] = useState({
        open: false,
        data_edit:{}
    });
    
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

    const getEmployee = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/HR-Employee/get-employee", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                const dataTableArr = [];
                 if(result.data.data.length > 0){

                    

                    for(const res of result.data.data){
                        dataTableArr.push({
                            nip: res.nip,
                            nama: res.nama,
                            jabatan: res.jabatan,
                            jenis_kelamin: res.jenis_kelamin,
                            status_karyawan: res.status_karyawan,
                            email: res.email,
                            grade: res.grade,
                            // class: res.kelas,
                                aksi:<div className="d-flex flex-row gap-2">
                                    <button className="btn btn-warning" onClick={() => handlerEditEmployee(res) } >Edit</button>
                                    <button className="btn btn-danger" onClick={() => {deleteEmployee(res.id_employee)}} >Hapus</button>
                                </div>

                        })
                        
                    }
                    
                    // setKategori(kategoriArr);
                    
                }
                setDatatable(dataTableArr);
                // setLoader(false);
                // setReload(prev => !prev);
            }
            // console.log(result)
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally{
            setLoader(false);
        }
    }

    const handlerEditEmployee = (datas) => {
        setDetailEdit({...detailEdit, open: true, data_edit: datas})
    
    }

    const deleteEmployee = async(id) => {
        const resultConfirm = await AlertConfirm("Apakah anda yakin ingin menghapus data ini ? ", "warning", "Hapus", false, "Data berhasil di hapus");
        // console.log(idDelete)
         if (resultConfirm.status) {
            setLoader(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            
            try {
                const result = await apiConfig.delete(apiUrl + "/HR-Employee/delete-employee?id=" + id, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                if (result.status == 200) {
                    setReload(prev => !prev);
                    // setIdDelete(id);
                    
                    // setLoader(false);
                    swalAlert(result.data.message, result.statusText, "success");
                    // getEmployee();
                }

            } catch (error) {
                console.log(error);
                // setLoader(false);
                swalAlert(error.message, error.code, "error");
            }finally{
                setLoader(false);
            }


        }
    }
    const AlertConfirm = async (message, icon, confirmButtonName, textarea = false, messageDeleted = "Your file has been deleted.") => {
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

        if (textarea) {
            objSwall.input = 'textarea';
            objSwall.inputLabel = 'Catatan';
            objSwall.inputPlaceholder = 'Catatan....';

        }
        const result = await swalWithBootstrapButtons.fire(objSwall);
        if (result.isConfirmed) {
            
            return {
                status: true,
                value: result.value
            };
            // ✅ user confirmed
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // setReload(prev => !prev);
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

    useEffect(() => {
        getEmployee();
    },[detailAdd.open, reload, detailEdit.open])

    return(
        <Row>
            <CreateEmployee openModal={detailAdd} setOpenModal={setDetailAdd} loader={loader} setLoader={setLoader} />
            <EditEmployee openModal={detailEdit} setOpenModal={setDetailEdit} loader={loader} setLoader={setLoader} />
            <Col xl={12}>
                <Card className="custom-card">
                    <Card.Header>
                        <Col xl={12} className="d-flex justify-content-end mt-2 mb-2 gap-2">
                            {/* <Button variant="contained"color="primary" onClick={() => setDetailUpload({open: true})}>Upload Data</Button> */}
                            <Button variant="contained" color="secondary" onClick={() => setDetailAdd({open: true})}>Tambah Data</Button>
                        </Col>
                        <div className="card-title">
                            Daftar Pegawai
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
    )

}

export default Employee;