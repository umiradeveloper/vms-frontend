
import { Col, Modal, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const Select = dynamic(() => import("react-select"), { ssr: false });

const CreateLoan = ({ loader, setLoader, openModal, setOpenModal, reload, setReload }) => {
    const [employee, setEmployee] = useState();
    const [dataLoan, setDataLoan] = useState({
        id_employee: "",
        nominal_pinjaman: "",
        jumlah_cicilan: 0,
        bulan_awal: "",
        bulan_awal_int:0,
        tahun_awal: "",
        bulan_akhir: "",
        bulan_akhir_int:0,
        tahun_akhir: "",
        cicilan_perbulan: ""
    })
    const getEmployee = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/HR-Employee/get-employee", {
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            // console.log(result);
            if (result.status == 200) {
                if (result.data.data?.length > 0) {
                    const dataEmployeeArr = [];
                    for (const datas of result.data.data) {
                        dataEmployeeArr.push({
                            value: datas.id_employee,
                            label: datas.nip + "|" + datas.nama + "|" + datas.jabatan
                        })
                    }
                    setEmployee(dataEmployeeArr);
                }
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }
    const months = Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: new Date(2000, i, 1).toLocaleString("id-ID", {
            month: "long"
        })
    }));

    const getEndMonthYear = (startMonth, startYear, installments) => {
        const date = new Date(startYear, startMonth - 1, 1);

        date.setMonth(date.getMonth() + installments - 1);

        return {
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
    };
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

    const CreateLoan = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        const beforeSubmit = {
            id_employee: dataLoan.id_employee,
            total_pinjaman: cleanCurrency(dataLoan.nominal_pinjaman),
            jumlah_cicilan: dataLoan.jumlah_cicilan,
            bulan_awal: dataLoan.bulan_awal_int,
            bulan_akhir: dataLoan.bulan_akhir_int,
            tahun_awal: dataLoan.tahun_awal,
            tahun_akhir: dataLoan.tahun_akhir
        }
        try {
            const result = await apiConfig.post(apiUrl + "/Loan/create-loan", beforeSubmit,{
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(result);
            if(result.status == 200){
                swalAlert(result.data.message, result.statusText, "success");
                setReload(prev => !prev);
                setOpenModal({open: false})
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
            getEmployee();
        }
    }, [openModal.open])

    useEffect(() => {
    const {
        bulan_awal_int,
        tahun_awal,
        jumlah_cicilan,
        nominal_pinjaman
    } = dataLoan;

    if (
        bulan_awal_int &&
        tahun_awal &&
        jumlah_cicilan &&
        nominal_pinjaman
    ) {
        const nominal = parseInt(
            cleanCurrency(nominal_pinjaman),
            10
        );

        const cicilan = Math.ceil(
            nominal / parseInt(jumlah_cicilan, 10)
        );

        const end = getEndMonthYear(
            parseInt(bulan_awal_int, 10),
            parseInt(tahun_awal, 10),
            parseInt(jumlah_cicilan, 10)
        );

        const month = months.find(
            item => item.value === end.month
        );
        console.log(month)

        setDataLoan(prev => ({
            ...prev,
            cicilan_perbulan: cicilan,
            bulan_akhir: month?.label || "",
            bulan_akhir_int: month?.value || "",
            tahun_akhir: end.year
        }));
    } else {
        setDataLoan(prev => ({
            ...prev,
            cicilan_perbulan: "",
            bulan_akhir: "",
            tahun_akhir: ""
        }));
    }
}, [
    dataLoan.bulan_awal,
    dataLoan.tahun_awal,
    dataLoan.jumlah_cicilan,
    dataLoan.nominal_pinjaman
]);

    return (
        <Modal size="md" show={openModal.open} onHide={() => { setOpenModal({ ...openModal, open: false }) }}>
            <Modal.Header>
                <h6 className="modal-title" id="exampleModalLabel">Tambah Pinjaman</h6>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    <Col xl={12} className="rounded-3">
                        <div className="row gy-2 pb-3">

                            <Col xl={12}>
                                <div className="row gy-2 pb-3">
                                    <label htmlFor="nama-proyek" className="form-label ">Employee<span style={{ color: "red" }}>*</span> :</label>
                                    <Select name="state" className="basic-multi-select " options={employee} isSearchable
                                        menuPlacement='auto' classNamePrefix="Select2" placeholder="Pilih Employee" onChange={(e) => 
                                            setDataLoan({ ...dataLoan, id_employee: e.value })}
                                    />
                                </div>
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Nominal Pinjaman<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nip" placeholder="Nominal Pinjaman" value={dataLoan.nominal_pinjaman} onChange={(e) => setDataLoan({ ...dataLoan, nominal_pinjaman: formatCurrency(e.target.value) })} />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Jumlah Cicilan<span style={{ color: "red" }}>*</span> :</label>
                                <input type="number" className={`form-control`} id="nip" placeholder="Jumlah Cicilan" value={dataLoan.jumlah_cicilan} onChange={(e) => 
                                    setDataLoan({ ...dataLoan, jumlah_cicilan: e.target.value })} />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Bulan awal<span style={{ color: "red" }}>*</span> :</label>
                                <Select name="state" className="basic-multi-select " options={months} isSearchable
                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Bulan Awal" onChange={(e) => 
                                        setDataLoan({ ...dataLoan, bulan_awal_int: e.value, bulan_awal: e.label })}
                                />
                            </Col>
                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Tahun awal<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nip" placeholder="Tahun Awal" onChange={(e) => 
                                    
                                    setDataLoan({ ...dataLoan, tahun_awal: e.target.value })
                                } />
                            </Col>

                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Bulan Akhir<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nip" placeholder="Bulan Akhir" value={dataLoan.bulan_akhir} disabled />
                            </Col>

                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Tahun Akhir<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nip" placeholder="Tahun Akhir" value={dataLoan.tahun_akhir} disabled />
                            </Col>

                            <Col xl={12}>
                                <label htmlFor="nama-proyek" className="form-label ">Cicilan Perbulan<span style={{ color: "red" }}>*</span> :</label>
                                <input type="text" className={`form-control`} id="nip" placeholder="Tahun Akhir" value={formatCurrency(dataLoan.cicilan_perbulan)} disabled />
                            </Col>
                        </div>
                    </Col>

                </Row>
            </Modal.Body>
            <Modal.Footer className="">
                <Button variant='contained' type="button" className="btn btn-primary"
                    data-bs-dismiss="modal" onClick={CreateLoan}>Tambah</Button>
                <Button variant='contained' type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal" onClick={() => setOpenModal({ ...openModal, open: false })}>Close</Button>

            </Modal.Footer>
        </Modal>
    )


}

export default dynamic(() => Promise.resolve(CreateLoan), { ssr: false });