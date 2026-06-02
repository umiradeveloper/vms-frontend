import { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
import { Card, Col, Container, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
import apiConfig from "@/utils/AxiosConfig";

const ReactApexChart = dynamic(
    () => import("react-apexcharts"),
    { ssr: false }
);

const CostControlSection = ({ loader, setLoader }) => {
    const [seriesChart, setSeriesChart] = useState([]);
    const [cardSection, setCardSection] = useState([]);
    const getDataChart = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/Dashboard/get-data/get-chart-proyek", {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            // console.log(result);
            if (result.status == 200) {
                const seriesChartOption = [];
                if (result.data.data.length > 0) {
                    for (const data of result.data.data) {
                        seriesChartOption.push({
                            project: data.proyek,
                            opt: {
                                series: [
                                    {
                                        name: "Kurva S",
                                        data: data.series.map(i => i.kurva_s)
                                    },
                                    {
                                        name: "Action Plan",
                                        data: data.series.map(i => i.action_plan)
                                    },
                                    {
                                        name: "Realisasi",
                                        data: data.series.map(i => i.realisasi)
                                    },
                                ],
                                options: {

                                    chart: {
                                        height: 320,
                                        type: 'line',
                                        zoom: {
                                            enabled: false
                                        },
                                        dropShadow: {
                                            enabled: true,
                                            enabledOnSeries: undefined,
                                            top: 5,
                                            left: 0,
                                            blur: 3,
                                            color: '#000',
                                            opacity: 0.1
                                        },
                                    },
                                    dataLabels: {
                                        enabled: false
                                    },
                                    legend: {
                                        position: "top",
                                        horizontalAlign: "center",
                                        offsetX: -15,
                                        fontWeight: "bold",
                                    },
                                    stroke: {
                                        curve: 'smooth',
                                        width: '3',
                                        dashArray: [0, 5],
                                    },
                                    grid: {
                                        borderColor: '#f2f6f7',
                                    },
                                    colors: ["rgb(98, 89, 202)", "rgba(98, 89, 202, 0.3)", "rgba(138, 8, 12, 0.3)"],
                                    yaxis: {
                                        // min: 1,
                                        // max: 10,
                                        // tickAmount: 9,
                                        title: {
                                            text: '',
                                            style: {
                                                color: '#adb5be',
                                                fontSize: '14px',
                                                fontFamily: 'poppins, sans-serif',
                                                fontWeight: 600,
                                                cssClass: 'apexcharts-yaxis-label',
                                            },
                                        }
                                    },
                                    xaxis: {
                                        // type: 'Week',
                                        categories: data.series.map(i => `Week ${i.week} - ${i.currentEnd}`),
                                        axisBorder: {
                                            show: false,
                                            color: 'rgba(119, 119, 142, 0.05)',
                                            offsetX: 0,
                                            offsetY: 0,
                                        },
                                        axisTicks: {
                                            show: true,
                                            borderType: 'solid',
                                            color: 'rgba(119, 119, 142, 0.05)',
                                            width: 6,
                                            offsetX: 0,
                                            offsetY: 0
                                        },
                                        labels: {
                                            rotate: -90
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
                console.log(seriesChartOption);
                setSeriesChart(seriesChartOption)
                //    setDataVendor(result.data.data)
                // setDatatable(pengajuanArr);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    const getCardCostControl = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoader(true);
        try {
            const result = await apiConfig.get(apiUrl + "/Dashboard/get-data/get-card-costcontrol", {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(result);
            if (result.status == 200) {
                setCardSection(result.data.data)
                // setDatatable(pengajuanArr);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        getDataChart();
        getCardCostControl();
    }, [])

    // const [seriesChart, setSeriesChart]= useState({
    //         series: [{
    // 			name: "Kurva S",
    // 			data: [20, 38, 38, 72, 55, 63, 43, 76, 55, 80, 40, 80]
    // 		}, {
    // 			name: "Action Plan",
    // 			data: [85, 65, 75, 38, 85, 35, 62, 40, 40, 64, 50, 89]
    // 		},{
    // 			name: "Realisasi",
    // 			data: [20, 40, 80, 15, 56, 57, 90, 34, 78, 34, 93, 70]
    // 		}],
    // 		options: {

    // 			chart: {
    // 				height: 320,
    // 				type: 'line',
    // 				zoom: {
    // 					enabled: false
    // 				},
    // 				dropShadow: {
    // 					enabled: true,
    // 					enabledOnSeries: undefined,
    // 					top: 5,
    // 					left: 0,
    // 					blur: 3,
    // 					color: '#000',
    // 					opacity: 0.1
    // 				},
    // 			},
    // 			dataLabels: {
    // 				enabled: false
    // 			},
    // 			legend: {
    // 				position: "top",
    // 				horizontalAlign: "center",
    // 				offsetX: -15,
    // 				fontWeight: "bold",
    // 			},
    // 			stroke: {
    // 				curve: 'smooth',
    // 				width: '3',
    // 				dashArray: [0, 5],
    // 			},
    // 			grid: {
    // 				borderColor: '#f2f6f7',
    // 			},
    // 			colors: ["rgb(98, 89, 202)", "rgba(98, 89, 202, 0.3)","rgba(138, 8, 12, 0.3)"],
    // 			yaxis: {
    // 				title: {
    // 					text: '',
    // 					style: {
    // 						color: '#adb5be',
    // 						fontSize: '14px',
    // 						fontFamily: 'poppins, sans-serif',
    // 						fontWeight: 600,
    // 						cssClass: 'apexcharts-yaxis-label',
    // 					},
    // 				}
    // 			},
    // 			xaxis: {
    // 				type: 'month',
    // 				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    // 				axisBorder: {
    // 					show: false,
    // 					color: 'rgba(119, 119, 142, 0.05)',
    // 					offsetX: 0,
    // 					offsetY: 0,
    // 				},
    // 				axisTicks: {
    // 					show: true,
    // 					borderType: 'solid',
    // 					color: 'rgba(119, 119, 142, 0.05)',
    // 					width: 6,
    // 					offsetX: 0,
    // 					offsetY: 0
    // 				},
    // 				labels: {
    // 					rotate: -90
    // 				}
    // 			}
    // 		}
    // })

    return (
        <Row>
            {cardSection && (
                cardSection.map((item, index) => (
                    <Col sm={12} md={6} lg={6} xl={6} key={index}>
                        <Card className="custom-card">
                            <Card.Body>
                                <div className="card-item">
                                    {/* <div className="card-item-icon card-icon">
                                        <svg
                                            className="text-primary"
                                            xmlns="http://www.w3.org/2000/svg"
                                            enableBackground="new 0 0 24 24"
                                            height="24" viewBox="0 0 24 24" width="24">
                                            <g><rect height="14" opacity=".3" width="14" x="5" y="5" /><g>
                                                <rect fill="none" height="24" width="24" />
                                                <g>
                                                    <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z" />
                                                    <rect height="5" width="2" x="7" y="12" />
                                                    <rect height="10" width="2" x="15" y="7" />
                                                    <rect height="3" width="2" x="11" y="14" />
                                                    <rect height="2" width="2" x="11" y="10" />
                                                </g>
                                            </g>
                                            </g>
                                        </svg>
                                    </div> */}
                                    <div className="card-item-title mb-2">
                                        <label className="main-content-label fs-17 fw-bold mb-1">
                                            {item.nama}
                                        </label>
                                        <span className="d-block fs-16 mb-0 text-muted">
                                            {item.total} Pengajuan
                                        </span>
                                    </div>

                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            )}
            {seriesChart && (
                seriesChart.map((item, index) => (
                    <Card className="custom-card overflow-hidden" key={index}>
                        <Card.Header className="border-bottom-0">
                            <div>
                                <label className="card-title">
                                    {item.project?.nama_proyek}
                                </label>
                                <span className="d-block fs-12 mb-0 text-muted">
                                    {item.project?.deskripsi_proyek}
                                </span>
                            </div>
                        </Card.Header>
                        <Card.Body className="ps-12">
                            <div>
                                <Container>
                                    <div className="chart-dropshadow2">
                                        <div className="card-item">
                                            <div id="chart">
                                                <ReactApexChart height={320} options={item.opt.options} series={item.opt.series} type="line" />
                                            </div>
                                        </div>
                                    </div>
                                </Container>
                                <div
                                    className="mt-4 px-4 py-3 d-flex align-items-center gap-3"
                                    style={{
                                        background: "#f8fafc",
                                        borderRadius: "16px",
                                        border: "1px solid #e5e7eb",
                                    }}
                                >
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "38px",
                                            height: "38px",
                                            borderRadius: "12px",
                                            background:
                                                "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                            minWidth: "38px",
                                        }}
                                    >
                                        <i
                                            className="ti ti-info-circle text-white"
                                            style={{
                                                fontSize: "18px",
                                            }}
                                        />
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <span
                                            className="fw-semibold mb-0"
                                            style={{
                                                color: "#111827",
                                                fontSize: "14px",
                                            }}
                                        >
                                            BK/PU Awal : {item.project.bk_pu_awal} %
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            )}
            {/* <Card className="custom-card overflow-hidden">
                <Card.Header className="border-bottom-0">
                    <div>
                        <label className="card-title">
                            Project Budget
                        </label>
                        <span className="d-block fs-12 mb-0 text-muted">
                            The Project Budget is a tool used by project managers to
                            estimate the total cost of a project
                        </span>
                    </div>
                </Card.Header>
                <Card.Body className="ps-12">
                    <div>
                        <Container>
                            <div className="chart-dropshadow2">
                                <div className="card-item">
                                    <div id="chart">
                                        <ReactApexChart height={320} options={seriesChart.options} series={seriesChart.series} type="line" />
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </Card.Body>
            </Card> */}

        </Row>

    )

}
export default CostControlSection;