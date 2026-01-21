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




const CreateProyek = () => {
	const [valueRab, setValueRab] = useState();
	const [valueRap, setValueRap] = useState();
	const [loader, setLoader] = useState(false);
	const [data, setData] = useState({
		nama_proyek: "",
		kode_proyek: "",
		deskripsi_proyek: "",
		tanggal_awal_kontrak: "",
		tanggal_akhir_kontrak: "",
		bk_pu_awal:"",
		kerja_tambah:0,
		kerja_kurang:0
	})

	const handleChangeRab = (e) => {
		let val = e.target.value.replace(/[^\d]/g, ""); // hanya angka
		val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
		setValueRab(val);
	};
	const handleChangeRap = (e) => {
		let val = e.target.value.replace(/[^\d]/g, ""); // hanya angka
		val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
		setValueRap(val);
	};

	const handleChangeKerjaTambah = (e) => {
		let val = e.target.value.replace(/[^\d]/g, ""); // hanya angka
		val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
		setData({...data, kerja_tambah: val});
	};
	const handleChangeKerjaKurang = (e) => {
		let val = e.target.value.replace(/[^\d]/g, ""); // hanya angka
		val = val ? new Intl.NumberFormat("id-ID").format(val) : "";
		setData({...data, kerja_kurang: val});
	};

	const submit = async () => {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		setLoader(true);
		const valueRapClean = (valueRap) ? valueRap.replace(/\./g, "") : "";
		const valueRabClean = (valueRab) ? valueRab.replace(/\./g, "") : "";
		const valueKerjaTambahClean = (data.kerja_tambah) ? data.kerja_tambah.replace(/\./g, ""): 0;
		const valueKerjaKurangClean = (data.kerja_kurang) ? data.kerja_kurang.replace(/\./g, ""): 0;
		const dataSubmit = {
			nama_proyek: data.nama_proyek,
			kode_proyek: data.kode_proyek,
			deskripsi_proyek: data.deskripsi_proyek,
			tanggal_awal_kontrak: data.tanggal_awal_kontrak,
			tanggal_akhir_kontrak: data.tanggal_akhir_kontrak,
			biaya_rap: parseInt(valueRapClean),
			biaya_rab: parseInt(valueRabClean),
			// bk_pu_awal: data.bk_pu_awal,
			kerja_tambah: parseInt(valueKerjaTambahClean),
			kerja_kurang: parseInt(valueKerjaKurangClean)
		};
		try {
			const result = await apiConfig.post(apiUrl + "/CostControl/Proyek/create-proyek", dataSubmit, {
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
			nama_proyek: "",
			kode_proyek: "",
			deskripsi_proyek: "",
			tanggal_awal_kontrak: "",
			tanggal_akhir_kontrak: ""
		})
	}
	useEffect(() => {},[data])
	
	return (
		<Fragment>
			<Seo title={"Form Proyek"} />
			<PageHeaderVms title="Form Proyek" item="Cost Control" active_item="Proyek" />
			<LoadersSimUmira open={loader} />
			<Row>
				<Col xl={12}>
					<ShowCode title="Form Proyek" customCardClass="custom-card" customCardBodyClass="" >
						<Row>
							<Col xl={12} className="rounded-3">
								<div className="row gy-2 pb-3">
									<Col xl={12}>
										<label htmlFor="kode-proyek" className="form-label ">Kode Proyek <span style={{ color: "red" }}>*</span> :</label>
										<input type="text" className={`form-control`} id="kode_proyek" placeholder="Kode Proyek" onChange={(val) => setData({ ...data, kode_proyek: val.target.value })} />
									</Col>
									<Col xl={12}>
										<label htmlFor="nama-proyek" className="form-label ">Nama Proyek <span style={{ color: "red" }}>*</span> :</label>
										<input type="text" className={`form-control`} id="nama_proyek" placeholder="Nama Proyek" onChange={(val) => setData({ ...data, nama_proyek: val.target.value })} />
									</Col>

									<Col xl={12}>
										<label htmlFor="desc-proyek" className="form-label ">Deskripsi Proyek <span style={{ color: "red" }}>*</span> :</label>
										<textarea rows={4} type="text" className={`form-control`} id="desc_proyek" placeholder="Deskripsi Proyek" onChange={(val) => setData({ ...data, deskripsi_proyek: val.target.value })} />
									</Col>
									<Col xl={12}>
										<label htmlFor="nama-proyek" className="form-label ">Tanggal Awal Kontrak <span style={{ color: "red" }}>*</span> :</label>
										{/* <input type="text" className={`form-control`} id="tanggal_awal_kontrak" placeholder="Tanggal Awal Kontrak" /> */}
										<Flatpickr
											className="form-control"
											value={data.tanggal_awal_kontrak}
											options={{
												dateFormat: "Y-m-d",
											}}
											onChange={(val, valStr) => setData({ ...data, tanggal_awal_kontrak: valStr })}
											// onChange={(val,valStr) => {
											// 	console.log(valStr)
											// }}
											placeholder="Tanggal Awal Kontrak"
										/>
									</Col>
									<Col xl={12}>
										<label htmlFor="nama-proyek" className="form-label ">Tanggal Akhir Kontrak <span style={{ color: "red" }}>*</span> :</label>
										{/* <input type="text" className={`form-control`} id="tanggal_akhir_kontrak" placeholder="Tanggal Akhir Kontrak" /> */}
										<Flatpickr
											className="form-control"
											value={data.tanggal_akhir_kontrak}
											options={{
												dateFormat: "Y-m-d",
											}}
											onChange={(val, valStr) => setData({ ...data, tanggal_akhir_kontrak: valStr })}
											placeholder="Tanggal Akhir Kontrak"
										/>
									</Col>
									{/* <Col xl={12}>
										<label htmlFor="nama-proyek" className="form-label ">BK / PU Awal (%) <span style={{ color: "red" }}>*</span> :</label>
										<input type="text" className={`form-control`} id="nama_proyek" placeholder="BK / PU Awal (%)" onChange={(val) => setData({ ...data, bk_pu_awal: val.target.value })} />
									</Col> */}
									<Col xl={12}>
										<label htmlFor="nama-proyek" className="form-label ">Total RAB (Rincian Anggaran Biaya) <span style={{ color: "red" }}>*</span> :</label>
										<input type="text" className={`form-control`} id="rab" placeholder="Rincian Anggaran Biaya" onChange={handleChangeRab} value={valueRab ? `${valueRab}` : ""} />
									</Col>
									<Col xl={12}>
										<label htmlFor="nama-proyek" className="form-label ">Total RAP (Rincian Anggaran Proyek) <span style={{ color: "red" }}>*</span> :</label>
										<input type="text" className={`form-control`} id="rap" placeholder="Rincian Anggaran Proyek" onChange={handleChangeRap} value={valueRap ? `${valueRap}` : ""} />
									</Col>
									{/* <Col xl={12}>
										<label htmlFor="nama-proyek" className="form-label ">Kerja Tambah :</label>
										<input type="text" className={`form-control`} id="rab" placeholder="Rincian Anggaran Biaya" onChange={handleChangeKerjaTambah} value={data.kerja_tambah ? `${data.kerja_tambah}` : ""} />
									</Col>
									<Col xl={12}>
										<label htmlFor="nama-proyek" className="form-label ">Kerja Kurang :</label>
										<input type="text" className={`form-control`} id="rab" placeholder="Rincian Anggaran Biaya" onChange={handleChangeKerjaKurang} value={data.kerja_kurang ? `${data.kerja_kurang}` : ""} />
									</Col> */}

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
CreateProyek.layout = "ContentlayoutVms";
export default CreateProyek;