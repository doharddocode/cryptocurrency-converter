import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";

import LoadingIndicator from "../loading-indicator";
import CryptoService from "../../services/crypto-service";

import './exchange-chart.sass'

class ExchangeChart extends Component {
  constructor(props) {
    super(props);
    this.lineChartData = {};
    this.lineChartOptions = {};
    this.cryptoService = new CryptoService(this.props.coinID);
    this.cryptoService.getMarketsExchange()
      .then((data) => {
        this.setState({
          data,
        }, this._setupChart);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }

  _setupChart() {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
    const { data } = this.state;
    const { coinID } = this.props;
    const datasets = [];
    const lineColors = {
      bitcoin: '#3333ff',
      ethereum: '#ff3333',
    }
    const labels = data.get(coinID).timestamp
      .map((time) => new Date(time).toLocaleDateString());

    for (const [key, params] of data.entries()) {
      datasets.push({
        label: key,
        data: [...params.prices],
        backgroundColor: lineColors[key],
        borderColor: lineColors[key],
        fill: true,
        lineTension: 0.5,
      });
    }

    this.lineChartOptions = {}
    this.lineChartData = {
      labels,
      datasets,
    };
    this.setState({
      ...this.state,
      load: false
    });
  }

  render() {
    if (!Object.keys(this.lineChartData).length) return <LoadingIndicator />

    return(
      <div className="exchange-chart">
        <h2 className="exchange-chart__title">{ this.props.title }</h2>

        <div className="exchange-chart__content">
          <Line
            width={ 160 }
            height={ 60 }
            data={ this.lineChartData }
            options={ this.lineChartOptions }
          />
        </div>
      </div>
    );
  }
}

export default ExchangeChart;