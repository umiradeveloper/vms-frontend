import { Card, Col, Row } from "react-bootstrap";
import BasicTableCostControl from "@/pages/apps/DataTables/DataTablesCostControl";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiConfig from "@/utils/AxiosConfig";


const PengajuanOvertime = ({loader, setLoader, detailOvertime, setDetailOvertime}) => {
    const [datatable, setDatatable] = useState([]);
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
            Header: "Jam Mulai",
            accessor: "jam_mulai",
        },
        {
            Header: "Jam Selesai",
            accessor: "jam_selesai",
        },
        {
            Header: "Durasi",
            accessor: "durasi",
        },
        {
            Header: "Alasan",
            accessor: "alasan",
        },
        //  
        {
            Header: "Aksi",
            accessor: "aksi",
        },
    ];
    const getMonitoringPengajuanOvertime = async () => {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		setLoader(true);
		try {
			const result = await apiConfig.get(apiUrl + "/HR-Overtime//get-montoring-approval-overtime", {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			});
			// console.log(result);
			if (result.status == 200) {
				const attendanceArr = [];
				if (result.data.data?.length > 0) {

					for (const datas of result.data.data) {
						attendanceArr.push({
							nip: datas.employee?.nip,
                            nama: datas.employee?.nama,
                            jabatan: datas.employee?.jabatan,
                            jam_mulai: datas.jam_mulai,
                            jam_selesai: datas.jam_selesai,
                            durasi: datas.durasi + " Menit",
                            alasan: datas.alasan,

							aksi: <div className="d-flex flex-row gap-2">
								<button className="btn btn-info" onClick={() =>  setDetailOvertime({open: true, data: datas})} >Detail</button>
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
        getMonitoringPengajuanOvertime();
    }, [loader])

    return(
        <Row>
			
			<Col xl={12}>
				<Card className="custom-card">
					<Card.Header>

						<div className="card-title">
							Monitoring Pengajuan Lembur
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

export default PengajuanOvertime;