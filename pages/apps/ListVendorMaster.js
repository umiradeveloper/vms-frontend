

import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, CardFooter, Col, Row } from "react-bootstrap";
// import { BasicTable, ResponsiveDataTable, Savetable, columns, data } from "@/shared/data/tables/datatablesdata";
import BasicTableVendor from "./DataTables/DataTablesVendor";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "./Component/PageHeaderVms";
import LoadersSimUmira from "./Component/LoaderSimUmira";
import Swal from "sweetalert2";
import axios from "axios";
import DetailVendorVms from "./DetailVendorVms";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";
import EditVendorMaster from "./EditModalVendorMaster";
import EditModalVendorMaster from "./EditModalVendorMaster";

const ListVmsMaster = () => {
    const [datatable, setDatatable] = useState([]);
    const [appStatus, setAppStatus] = useState(false);
    const [openDetail, setOpenDetail] = useState({
        open_modal: false,
        data_detail: {}
    })
    const [openDetailEdit, setOpenDetailEdit] = useState({
        open_modal: false,
        data_detail: {}
    })
    const router = useRouter();
    const [dataxlsx, setDataxslx] = useState([]);
    const [loader, setLoader] = useState();
    const COLUMNS = [
        // {
        //     Header: "ID Pengajuan",
        //     accessor: "id_pengajuan",
        // },
        {
            Header: "Nama Perusahaan",
            accessor: "nama_perusahaan",
        },
        {
            Header: "Alamat Perusahaan",
            accessor: "alamat_perusahaan",
        },
        {
            Header: "Kualifikasi Usaha",
            accessor: "kualifikasi_usaha",
        },
        {
            Header: "Klasifikasi Usaha",
            accessor: "klasifikasi_usaha",
        },
        {
            Header: "Kategori",
            accessor: "kategori",
        },
        {
            Header: "Spesialisasi",
            accessor: "spesialisasi",
        },
        // {
        //     Header: "No Handphone",
        //     accessor: "no_hp",
        // },
        {
            Header: "Edit",
            accessor: "edit",
        },
        {
            Header: "Detail",
            accessor: "detail",
        },
        // {
        //     Header: "Aksi",
        //     accessor: "aksi",
        // },
    ];
    useEffect(() => {
        getPengajuan();
        if(!localStorage.getItem("token")){
			router.push("/apps/LoginRegister");
		}
    }, [appStatus]);

    const ExportToExcel = (data, fileName) => {
        // 1. Convert JSON → worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // 2. Create workbook & append worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // 3. Export to Excel file
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        // 4. Save file
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, `${fileName}.xlsx`);
    };
    const getPengajuan = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const response = await axios.get(apiUrl + "/vms/list-vendor", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = response.data.data;
            if (data) {
                // console.log(data);
                const pengajuanArr = [];
                const xlsxArr = [];
                for await (const user of data) {

                    pengajuanArr.push({
                        // id_pengajuan: user.id_pengajuan,
                        nama_perusahaan: user.nama_perusahaan,
                        alamat_perusahaan: user.alamat_perusahaan,
                        kualifikasi_usaha: user.kualifikasi_usaha.kualifikasi,
                        klasifikasi_usaha: user.klasifikasi_usaha,
                        kategori: user.kategori,
                        spesialisasi: user.spesialisasi,
                        kategori: user.kategori,
                        edit:  <button className="btn btn-secondary" data-user={user} onClick={() => {handleEdit(user)}}>Edit</button>,
                        detail: <button className="btn btn-info" onClick={() => setOpenDetail({ ...openDetail, open_modal: true, data_detail: user })}>Detail</button>,
                        // aksi:   <div className="d-flex flex-row gap-2">
                        //             <button className="btn btn-success">Approve</button>
                        //             <button className="btn btn-danger">Reject</button>
                        //         </div>
                    });
                    xlsxArr.push({
                        nama_perusahaan: user.nama_perusahaan,
                        alamat_perusahaan: user.alamat_perusahaan,
                        kualifikasi_usaha: user.kualifikasi_usaha.kualifikasi,
                        klasifikasi_usaha: user.klasifikasi_usaha,
                        kategori: user.kategori,
                        spesialisasi: user.spesialisasi,
                        kategori: user.kategori
                    })
                }
                setDatatable(pengajuanArr)
                setDataxslx(xlsxArr);
                // setSelectedOptions(kualifikasiArr);
                // setTableData(userArr);
                setLoader(false);
            }

        } catch (error) {
            console.log(error);
            // setError(error.message);
            if(error.status == 401){
                localStorage.removeItem("token");
                localStorage.removeItem("menu");
                localStorage.removeItem("user");
                router.push("/apps/LoginRegister");
            }
            setLoader(false);
            swalAlert(error.message, error.status, "error");
        }
    }
    const handleEdit = (user) => {
        // const userData = e.currentTarget.getAttribute("data-user");
        setOpenDetailEdit({ ...openDetail, open_modal: true, data_detail: user });
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
                clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
    }
    return (
        <Fragment>
            <Seo title={"List Vendor VMS"} />
            <PageHeaderVms title='List Vendor VMS' item='VMS List' active_item='List Vendor VMS' />
            <LoadersSimUmira open={loader} />
            <EditModalVendorMaster open={openDetailEdit}  setOpen={setOpenDetailEdit} loader={loader} setLoader={setLoader}/>
            <DetailVendorVms open={openDetail} setOpen={setOpenDetail} openLoader={loader} setOpenLoader={setLoader} />
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Data Vendor VMS
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">
                                <BasicTableVendor column={COLUMNS} datatable={datatable} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Responsive Datatable
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <ResponsiveDataTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}


        </Fragment>
    );
};
ListVmsMaster.layout = "ContentlayoutVms";
export default ListVmsMaster;
