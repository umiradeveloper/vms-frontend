import Seo from "@/shared/layout-components/seo/seo";
import PageHeaderVms from "../../Component/PageHeaderVms";
import { Col, Row } from "react-bootstrap";
import ShowCode from "@/shared/showcode/showcode";
import { Fragment, useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import apiConfig from "@/utils/AxiosConfig";
import LoadersSimUmira from "../../Component/LoaderSimUmira";
import Swal from "sweetalert2";




const CreateSatuan = () => {
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({
        nama_satuan: "",
        kode_satuan: "",
    })


    const submit = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const dataSubmit = {
            nama_satuan: data.nama_satuan,
            kode_satuan: data.kode_satuan,
        };
        try {
            const result = await apiConfig.post(apiUrl + "/CostControl/Satuan/create-satuan", dataSubmit, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (result.status == 200) {
                setLoader(false);
                swalAlert(result.data.message, result.statusText, "success");
                resetData();
                // console.log(result)
            }
        } catch (error) {
            console.log(error)
            setLoader(false);
            swalAlert(error.message, error.code, "error");
        }

        // console.log(dataSubmit);
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

    const resetData = () => {
        setData({
            nama_satuan: "",
            kode_satuan: ""
        })
    }
    useEffect(() => {},[data])
    
    return (
        <Fragment>
            <Seo title={"Form Satuan"} />
            <PageHeaderVms title="Form Satuan" item="Cost Control" active_item="Satuan" />
            <LoadersSimUmira open={loader} />
            <Row>
                <Col xl={12}>
                    <ShowCode title="Form Satuan" customCardClass="custom-card" customCardBodyClass="" >
                        <Row>
                            <Col xl={12} className="rounded-3">
                                <div className="row gy-2 pb-3">
                                    <Col xl={12}>
                                        <label htmlFor="kode-satuan" className="form-label ">Kode Satuan <span style={{ color: "red" }}>*</span> :</label>
                                        <input type="text" className={`form-control`} id="kode_satuan" placeholder="Kode Satuan" onChange={(val) => setData({ ...data, kode_satuan: val.target.value })} />
                                    </Col>
                                    <Col xl={12}>
                                        <label htmlFor="nama-satuan" className="form-label ">Nama Satuan <span style={{ color: "red" }}>*</span> :</label>
                                        <input type="text" className={`form-control`} id="nama_satuan" placeholder="Nama Satuan" onChange={(val) => setData({ ...data, nama_satuan: val.target.value })} />
                                    </Col>
                                </div>
                                <div className="text-center mt-4">
                                    <button className="btn btn-primary btn-wave" onClick={submit}>Submit</button>
                                </div>
                            </Col>
                        </Row>
                    </ShowCode>
                </Col>
            </Row>

        </Fragment>
    )
}
CreateSatuan.layout = "ContentlayoutVms";
export default CreateSatuan;