
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../../Component/PageHeaderVms";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import apiConfig from "@/utils/AxiosConfig";
import { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import DetailUploadCostCode from "./DetailUploadCostCode";
import AddDetailCostCode from "./AddDetailCostCode";
import EditDetailCostCode from "./EditDetailCostCode";


const DaftarCostCode = () => {
    const [datatable, setDatatable] = useState([]);
    const [loader, setLoader] = useState(false);
    const [detailTambah, setDetailTambah] = useState({
        open: false
    })
     const [detailEdit, setDetailEdit] = useState({
        open: false
    })
    const [dataEdit, setDataEdit] = useState({});
    
    const [detailUpload, setDetailUpload] = useState({
        open: false
    })
    const COLUMNS = [
        {
            Header: "Kode",
            accessor: "kode",
        },
        {
            Header: "Kategori",
            accessor: "kategori",
        },
        {
            Header: "Kode Kategori",
            accessor: "kode_kategori",
        },
        {
            Header: "Klasifikasi",
            accessor: "klasifikasi",
        },
        {
            Header: "Kode Jenis",
            accessor: "kode_jenis",
        },
        {
            Header: "Spesifikasi",
            accessor: "spesifikasi",
        },
        {
            Header: "Jenis",
            accessor: "jenis",
        },
        {
            Header: "Nama",
            accessor: "nama",
        },
        {
            Header: "Satuan",
            accessor: "satuan",
        },
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ]

    const getDaftarCostCode = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/CostControl/Cost-Code/get-cost-code", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if(result.status == 200){
                 if(result.data.data.length > 0){

                    const dataTableArr = [];

                    for(const res of result.data.data){
                        dataTableArr.push({
                            kode: res.cost_code,
                            kategori: res.kategori.nama_kategori,
                            kode_kategori: res.kategori.kode_kategori,
                            klasifikasi: res.klasifikasi,
                            kode_jenis: res.kode_jenis,
                            spesifikasi: res.spesifikasi,
                            jenis: res.jenis,
                            nama: res.nama,
                            satuan: res.satuan,
                            aksi:<div className="d-flex flex-row gap-2">
                                    <button className="btn btn-warning" onClick={() => {
                                        setDataEdit(res);
                                        setDetailEdit({open: true});
                                        
                                    }}>Edit</button>
                                </div>
                        })
                    }
                    setDatatable(dataTableArr);
                    // setKategori(kategoriArr);
                    setLoader(false);
                }
            }
            // console.log(result)
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getDaftarCostCode();
    },[detailUpload.open, detailTambah.open, detailEdit.open])

    return( 
        <Fragment>
            <Seo title={"Daftar Cost Code"} />
            <PageHeaderVms title='Daftar Cost Code' item='Cost Code' active_item='Cost Code' />
            <LoadersSimUmira open={loader} />
            <DetailUploadCostCode openModal={detailUpload} setOpenModal={setDetailUpload} loader={loader} setLoader={setLoader}/>
            <AddDetailCostCode openModal={detailTambah} setOpenModal={setDetailTambah} loader={loader} setLoader={setLoader}/>
            <EditDetailCostCode openModal={detailEdit} setOpenModal={setDetailEdit} loader={loader} setLoader={setLoader} dataUpdate={dataEdit} />
            <Row>
                
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Col xl={12} className="d-flex justify-content-end mt-2 mb-2 gap-2">
                                <Button variant="contained"color="primary" onClick={() => setDetailUpload({open: true})}>Upload Data</Button>
                                <Button variant="contained" color="secondary" onClick={() => setDetailTambah({open: true})}>Tambah Data</Button>
                            </Col>
                            <div className="card-title">
                                Daftar Cost Code
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

DaftarCostCode.layout = "ContentlayoutVms";

export default DaftarCostCode;