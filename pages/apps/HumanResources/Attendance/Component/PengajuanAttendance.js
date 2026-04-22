import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";



const PengajuanAttendance = ({ loader, setLoader }) => {
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
			Header: "Jam Masuk",
			accessor: "jam_masuk",
		},
		{
			Header: "Jam Keluar",
			accessor: "jam_keluar",
		},
		{
			Header: "Status Absensi",
			accessor: "status_absensi",
		},
		//  
		{
			Header: "Aksi",
			accessor: "aksi",
		},
	];
	const [datatable, setDatatable] = useState([]);
	const getMonitoringPengajuanAbsensi = async () => {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		setLoader(true);
		try {
			const result = await apiConfig.get(apiUrl + "/HR-Attendance/get-monitoring-approval-attendance", {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			});
			console.log(result);
			if (result.status == 200) {
				const attendanceArr = [];
				if (result.data.data?.length > 0) {

					for (const datas of result.data.data) {
						attendanceArr.push({
							nip: datas.employee?.nip,
							nama: datas.employee?.nama,
							jabatan: datas.employee?.jabatan,
							jam_masuk: datas.jam_masuk,
							jam_keluar: datas.jam_keluar,
							status_absensi: datas.status_absensi,
							keterangan: datas.keterangan,

							aksi: <div className="d-flex flex-row gap-2">
								<button className="btn btn-info" onClick={() =>  {}} >Detail</button>
							</div>
						})
					}
					// setEmployee(dataEmployeeArr);
				}
				setDatatable(attendanceArr);
			}
		} catch (error) {
			// setLoader(false);
			console.log(error);
		} finally {
			setLoader(false);
		}
	}
	useEffect(() => {
		getMonitoringPengajuanAbsensi()
	},[])
	return (
		<Row>

			<Col xl={12}>
				<Card className="custom-card">
					<Card.Header>

						<div className="card-title">
							Daftar Monitoring Absensi
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

export default PengajuanAttendance;