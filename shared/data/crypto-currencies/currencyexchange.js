import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Component } from "react";

export class BTC extends Component {
	constructor(props) {
		super(props);

		this.state = {

			series: [
				{
					name: "Value",
					data: [54, 38, 56, 35, 65, 43, 53, 45, 62, 80, 35, 48],
				},
			],

			options: {
				chart: {
					events: {
						mounted: (chart) => {
							chart.windowResizeHandler();
						}
					},
					type: "area",
					height: 130,
					sparkline: {
						enabled: true,
					},
					dropShadow: {
						enabled: true,
						enabledOnSeries: undefined,
						top: 0,
						left: 0,
						blur: 1,
						color: "#fff",
						opacity: 0.05,
					},
				},
				stroke: {
					show: true,
					curve: "smooth",
					lineCap: "butt",
					colors: undefined,
					width: 2,
					dashArray: 0,
				},
				grid: {
					padding: {
						bottom: 10,
					},
				},
				yaxis: {
					min: 0,
					show: false,
				},
				xaxis: {
					axisBorder: {
						show: false,
					},
				},
				colors: ["rgba(98, 89, 202,0.7)"],
				tooltip: {
					enabled: true,
				},
			}
		};
	}

	render() {
		return (

			<div id="chart">
				<ReactApexChart height={130} options={this.state.options} series={this.state.series} type="area" />
			</div>
		);
	}
}

export class ETH extends Component {
	constructor(props) {
		super(props);

		this.state = {

			series: [
				{
					name: "Value",
					data: [48, 35, 80, 62, 45, 53, 43, 65, 35, 56, 38, 54],
				},
			],

			options: {
				chart: {
					events: {
						mounted: (chart) => {
							chart.windowResizeHandler();
						}
					},
					type: "area",
					height: 130,
					sparkline: {
						enabled: true,
					},
					dropShadow: {
						enabled: true,
						enabledOnSeries: undefined,
						top: 0,
						left: 0,
						blur: 1,
						color: "#fff",
						opacity: 0.05,
					},
				},
				stroke: {
					show: true,
					curve: "smooth",
					lineCap: "butt",
					colors: undefined,
					width: 2,
					dashArray: 0,
				},
				yaxis: {
					min: 0,
					show: false,
				},
				xaxis: {
					axisBorder: {
						show: false,
					},
				},
				grid: {
					padding: {
						bottom: 10,
					},
				},
				colors: ["rgba(98, 89, 202,0.7)"],
				tooltip: {
					enabled: true,
				},
			}
		};
	}

	render() {
		return (

			<div id="chart">
				<ReactApexChart height={130} options={this.state.options} series={this.state.series} type="area" />
			</div>
		);
	}
}

export class Ripple extends Component {
	constructor(props) {
		super(props);

		this.state = {

			series: [
				{
					name: "Value",
					data: [20, 50, 15, 35, 65, 43, 53, 45, 62, 22, 22, 55],
				},
			],

			options: {
				chart: {
					events: {
						mounted: (chart) => {
							chart.windowResizeHandler();
						}
					},
					type: "area",
					height: 130,
					sparkline: {
						enabled: true,
					},
					dropShadow: {
						enabled: true,
						enabledOnSeries: undefined,
						top: 0,
						left: 0,
						blur: 1,
						color: "#fff",
						opacity: 0.05,
					},
				},
				stroke: {
					show: true,
					curve: "smooth",
					lineCap: "butt",
					colors: undefined,
					width: 2,
					dashArray: 0,
				},
				grid: {
					padding: {
						bottom: 10,
					},
				},

				yaxis: {
					min: 0,
					show: false,
				},
				xaxis: {
					axisBorder: {
						show: false,
					},
				},
				colors: ["rgba(98, 89, 202,0.7)"],
				tooltip: {
					enabled: true,
				},
			}
		};
	}

	render() {
		return (

			<div id="chart">
				<ReactApexChart height={130} options={this.state.options} series={this.state.series} type="area" />
			</div>
		);
	}
}

export class Dash extends Component {
	constructor(props) {
		super(props);

		this.state = {

			series: [
				{
					name: "Value",
					data: [80, 38, 56, 22, 45, 43, 62, 45, 62, 35, 35, 25],
				},
			],

			options: {
				chart: {
					events: {
						mounted: (chart) => {
							chart.windowResizeHandler();
						}
					},
					type: "area",
					height: 130,
					sparkline: {
						enabled: true,
					},
					dropShadow: {
						enabled: true,
						enabledOnSeries: undefined,
						top: 0,
						left: 0,
						blur: 1,
						color: "#fff",
						opacity: 0.05,
					},
				},
				stroke: {
					show: true,
					curve: "smooth",
					lineCap: "butt",
					colors: undefined,
					width: 2,
				},
				grid: {
					padding: {
						bottom: 10,
					},
				},

				yaxis: {
					min: 0,
					show: false,
				},
				xaxis: {
					axisBorder: {
						show: false,
					},
				},
				colors: ["rgba(98, 89, 202,0.7)"],
				tooltip: {
					enabled: true,
				},
			}
		};
	}

	render() {
		return (

			<div id="chart">
				<ReactApexChart height={130} options={this.state.options} series={this.state.series} type="area" />
			</div>
		);
	}
}

export class NEO extends Component {
	constructor(props) {
		super(props);

		this.state = {

			series: [
				{
					name: "Value",
					data: [54, 38, 56, 35, 65, 43, 53, 45, 62, 80, 35, 48],
				},
			],

			options: {
				chart: {
					events: {
						mounted: (chart) => {
							chart.windowResizeHandler();
						}
					},
					type: "area",
					height: 130,
					sparkline: {
						enabled: true,
					},
					dropShadow: {
						enabled: true,
						enabledOnSeries: undefined,
						top: 0,
						left: 0,
						blur: 1,
						color: "#fff",
						opacity: 0.05,
					},
				},
				stroke: {
					show: true,
					curve: "smooth",
					lineCap: "butt",
					colors: undefined,
					width: 2,
				},
				yaxis: {
					min: 0,
					show: false,
				},
				xaxis: {
					axisBorder: {
						show: false,
					},
				},
				grid: {
					padding: {
						bottom: 10,
					},
				},
				colors: ["rgba(98, 89, 202,0.7)"],
				tooltip: {
					enabled: true,
				},
			}
		};
	}

	render() {
		return (

			<div id="chart">
				<ReactApexChart height={130} options={this.state.options} series={this.state.series} type="area" />
			</div>
		);
	}
}
export class Litecoin extends Component {
	constructor(props) {
		super(props);

		this.state = {

			series: [
				{
					name: "Value",
					data: [10, 56, 35, 35, 65, 32, 53, 45, 48, 35, 56, 20],
				},
			],

			options: {
				chart: {
					events: {
						mounted: (chart) => {
							chart.windowResizeHandler();
						}
					},
					type: "area",
					height: 130,
					sparkline: {
						enabled: true,
					},
					dropShadow: {
						enabled: true,
						enabledOnSeries: undefined,
						top: 0,
						left: 0,
						blur: 1,
						color: "#fff",
						opacity: 0.05,
					},
				},
				stroke: {
					show: true,
					curve: "smooth",
					lineCap: "butt",
					colors: undefined,
					width: 2,
				},

				yaxis: {
					min: 0,
					show: false,
				},
				grid: {
					padding: {
						bottom: 10,
					},
				},
				xaxis: {
					axisBorder: {
						show: false,
					},
				},
				colors: ["rgba(98, 89, 202,0.7)"],
				tooltip: {
					enabled: true,
				},
			}
		};
	}

	render() {
		return (

			<div id="chart">
				<ReactApexChart height={130} options={this.state.options} series={this.state.series} type="area" />
			</div>
		);
	}
}
export const Singleselectdata1 = [
	{ label: "BTC", value: "btc", },
	{ label: "LTC", value: "ltc" },
	{ label: "NEO", value: "neo" },
	{ label: "DASH", value: "dash" },
	{ label: " XRP", value: "xrp " },
];
export const Singleselectdata2 = [
	{ label: "USD", value: "usd" },
	{ label: "EURO", value: "euro" },
	{ label: "POUND", value: "pound" },
];
