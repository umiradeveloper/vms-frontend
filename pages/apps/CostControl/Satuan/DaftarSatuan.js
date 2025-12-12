import { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "../../DataTables/DataTablesCostControl";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import apiConfig from "@/utils/AxiosConfig";
import Swal from "sweetalert2";




const DaftarSatuan = () => {
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);
    const [datatable, setDataTable] = useState([]);
     const COLUMNS = [
        {
            Header: "Kode Satuan",
            accessor: "kode_satuan",
        },
        {
            Header: "Nama Satuan",
            accessor: "nama_satuan",
        },
        {
            Header: "Hapus Satuan",
            accessor: "hapus",
            Cell: ({ row }) => (
            <div className="d-flex gap-2">
                <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(row.original)}
                >
                    Delete
                </button>
            </div>
        )
        },
    ];

    const handleDelete = async (item) => {
        const confirmed = await Swal.fire({
            title: "Hapus Satuan?",
            text: `Apakah Anda yakin ingin menghapus satuan '${item.nama_satuan}'?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal"
        }).then((result) => result.isConfirmed);

        if (!confirmed) return; // user tekan batal → stop

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            const response = await apiConfig.delete(
                apiUrl + `/CostControl/Satuan/delete-satuan?id=${item.id_satuan}`,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            Swal.fire({
                title: "Berhasil!",
                text: response.data.message,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            setReload(prev => !prev) // ← Refresh tabel

        } catch (error) {
            console.log(error);

            Swal.fire({
                title: "Gagal!",
                text: error.message,
                icon: "error"
            });
        }
    };

    const swalAlert = (message, title, icon) => {
        let timerInterval;
        
            Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            });
    }

    const getDaftarSatuan = async() => {
        setLoader(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Satuan/get-satuan", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if(result.status == 200){
                const daftarArr = [];
                for await (const data of result.data.data) {
                    daftarArr.push({
                        id_satuan: data.id_satuan,
                        kode_satuan: data.kode_satuan,
                        nama_satuan: data.nama_satuan
                    })
                }
                setDataTable(daftarArr);
                setLoader(false)
            }
            // console.log(result);
        } catch (error) {
            console.log("e = "+error);
        }
    }
    useEffect(() => {
        getDaftarSatuan();
    },[reload])
    return (
        <Fragment>
            <Seo title={"Daftar Satuan"} />
            <PageHeaderVms title='Daftar Satuan' item='Daftar Satuan' active_item='Daftar Satuan' />
            <LoadersSimUmira open={loader} />
             <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Data Satuan
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

DaftarSatuan.layout = "ContentlayoutVms";
export default DaftarSatuan;


