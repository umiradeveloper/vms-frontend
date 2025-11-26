import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Component } from "react";
export class BtcMarket extends Component {
	constructor(props) {
		super(props);

		this.state = {

			series: [{
				name: 'Value',
				data: [20, 14, 19, 10, 23, 20, 22, 9, 12]
			}],

			options: {
				chart: {
					type: 'area',
					height: 40,
					width: 50,
					sparkline: {
						enabled: true
					}
				},
				stroke: {
					show: true,
					curve: 'smooth',
					lineCap: 'butt',
					colors: undefined,
					width: 2,
					dashArray: 0,
				},
				fill: {
					type: 'gradient',
					gradient: {
						opacityFrom: 0.8,
						opacityTo: 0.05,
						stops: [0, 98],
					}
				},
				yaxis: {
					min: 0,
					show: false,
					axisBorder: {
						show: false
					},
				},
				xaxis: {
					show: false,
					axisBorder: {
						show: false
					},
				},
			    //tooltip: {
			    //    enabled: false,
			    //},
				colors: ["rgb(98, 89, 202)"],
			}
		};
	}

	render() {
		return (

			<div id="chart">
				<ReactApexChart height={40} width={50} options={this.state.options} series={this.state.series} type="area" />
			</div>
		);
	}
}
export class EthMarket extends Component {
	constructor(props) {
		super(props);

		this.state = {

			series: [{
				name: "Value",
				data: [20, 20, 22, 9, 14, 19, 10, 25, 12]
			}],

			options: {
				chart: {
					type: 'area',
					height: 40,
					width: 50,
					sparkline: {
						enabled: true
					}
				},
				stroke: {
					show: true,
					curve: 'smooth',
					lineCap: 'butt',
					colors: undefined,
					width: 2,
					dashArray: 0,
				},
				fill: {
					type: 'gradient',
					gradient: {
						opacityFrom: 0.8,
						opacityTo: 0.1,
						stops: [0, 98],
					}
				},
				series: [{
					name: 'Value',
					data: [20, 20, 22, 9, 14, 19, 10, 25, 12]
				}],
				yaxis: {
					min: 0,
					show: false,
					axisBorder: {
						show: false
					},
				},
				xaxis: {
					show: false,
					axisBorder: {
						show: false
					},
				},
			    //tooltip: {
			    //    enabled: false,
			    //},
				colors: ["rgb(98, 89, 202)"],
			}
		};
	}

	render() {
		return (

			<div id="chart">
				<ReactApexChart height={40} width={50} options={this.state.options} series={this.state.series} type="area" />
			</div>
		);
	}
}
export class ItcMarket extends Component {
	constructor(props) {
		super(props);

		this.state = {

			series: [{
				name: "Value",
				data: [20, 20, 22, 9, 12, 14, 19, 10, 25]
			}],

			options: {
				chart: {
					events: {
						mounted: (chart) => {
							chart.windowResizeHandler();
						}
					},
					type: "area",
					height: 40,
					width: 50,
					sparkline: {
						enabled: true
					}
				},
				stroke: {
					show: true,
					curve: "smooth",
					lineCap: "butt",
					colors: undefined,
					width: 2,
					dashArray: 0,
				},
				fill: {
					type: "gradient",
					gradient: {
						opacityFrom: 0.8,
						opacityTo: 0.1,
						stops: [0, 98],
					}
				},

				yaxis: {
					min: 0,
					show: false,
					axisBorder: {
						show: false
					},
				},
				xaxis: {
					axisBorder: {
						show: false
					},
				},
				//tooltip: {
				//	enabled: true,
				//},
				colors: ["rgb(98, 89, 202)"],
			}
		};
	}

	render() {
		return (

			<div id="chart">
				<ReactApexChart height={40} width={50} options={this.state.options} series={this.state.series} type="area" />
			</div>
		);
	}
}
export class XrpMarket extends Component {
	constructor(props) {
		super(props);

		this.state = {

			series: [{
				name: "Value",
				data: [20, 14, 20, 22, 9, 12, 19, 10, 25]
			}],
			options: {
				chart: {
					events: {
						mounted: (chart) => {
							chart.windowResizeHandler();
						}
					},
					type: "area",
					height: 40,
					width: 50,
					sparkline: {
						enabled: true
					}
				},
				stroke: {
					show: true,
					curve: "smooth",
					lineCap: "butt",
					colors: undefined,
					width: 2,
					dashArray: 0,
				},
				fill: {
					type: "gradient",
					gradient: {
						opacityFrom: 0.8,
						opacityTo: 0.1,
						stops: [0, 98],
					}
				},
				yaxis: {
					min: 0,
					show: false,
					axisBorder: {
						show: false
					},
				},
				xaxis: {
					axisBorder: {
						show: false
					},
				},
				//tooltip: {
				//	enabled: true,
				//},
				colors: ["rgb(98, 89, 202)"],
			}
		};
	}

	render() {
		return (

			<div id="chart">
				<ReactApexChart height={40} width={50} options={this.state.options} series={this.state.series} type="area" />
			</div>
		);
	}
}
export const CryptMarketingValues = [
	{ ID: 1, Symbol: "bitcoin", Name: "Bitcoin", crypt: "BTC", lastprice: "$151.00", MarkerCap: "$518", Change: "success", platform: "Trade", IMAGES: "../../../assets/images/svgs/crypto-currencies/btc.svg", },
	{ ID: 2, ymbol: "ethereum", Name: "Ethereum", crypt: "ETH", lastprice: "$723.48", MarkerCap: "$448", Change: "success", platform: "Trade", IMAGES:"../../../assets/images/svgs/crypto-currencies/eth.svg", },
	{ ID: 3, Symbol: "ripple", Name: "Ripple", crypt: "XRP", lastprice: "$425.25", MarkerCap: "$763", Change: "success", platform: "Trade", IMAGES: "../../../assets/images/svgs/crypto-currencies/xrp.svg", },
	{ ID: 4, Symbol: "litecoin", Name: "Litecoin", crypt: "LTC", lastprice: "$1.2029", MarkerCap: "$678,", Change: "danger", platform: "Trade", IMAGES:"../../../assets/images/svgs/crypto-currencies/ltc.svg", },
	{ ID: 5, Symbol: "neo", Name: "Neo", crypt: "NEO", lastprice: "$154.67", MarkerCap: "$197", Change: "danger", platform: "Trade", IMAGES: "../../../assets/images/svgs/crypto-currencies/neo.svg", },
	{ ID: 6, Symbol: "monero", Name: "Monero", crypt: "XMR", lastprice: "$305.16", MarkerCap: "$4,778", Change: "success", platform: "Trade", IMAGES: "../../../assets/images/svgs/crypto-currencies/xmr.svg", },
	{ ID: 7, Symbol: "eos", Name: "Eos", crypt: "EOS", lastprice: "$149.18", MarkerCap: "$8,44", Change: "danger", platform: "Trade", IMAGES: "../../../assets/images/svgs/crypto-currencies/eos.svg", },
	{ ID: 8, Symbol: "steem", Name: "Steem", crypt: "STEEM", lastprice: "$0.4673", MarkerCap: "$8,358", Change: "success", platform: "Trade", IMAGES: "../../../assets/images/svgs/crypto-currencies/steem.svg", },
	{ ID: 9, Symbol: "Iota", Name: "Iota", crypt: "IOTA", lastprice: "$2.34", MarkerCap: "$654", Change: "danger", platform: "Trade", IMAGES:"../../../assets/images/svgs/crypto-currencies/miota.svg", },
	{ ID: 10, Symbol: "dash", Name: "Dash", crypt: "DASH", lastprice: "$747.2", MarkerCap: "$588", Change: "success", platform: "Trade", IMAGES:"../../../assets/images/svgs/crypto-currencies/dash.svg", },
	{ ID: 11, Symbol: "waves", Name: "waves", crypt: "NEM", lastprice: "$181.39", MarkerCap: "$3,084", Change: "danger", platform: "Trade", IMAGES:"../../../assets/images/svgs/crypto-currencies/waves.svg", },
];

