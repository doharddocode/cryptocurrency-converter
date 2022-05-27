import React, { Component } from "react";
import Chart from "react-apexcharts";

import LoadingIndicator from "../loading-indicator";
import CryptoService from "../../services/crypto-service";
import ConvertService from "../../services/convert-service";

import './exchange-chart.sass'

const LineChart = ({ data }) => {
  const lineColors = {
    bitcoin: '#FF1654',
    ethereum: '#247BA0'
  }

  const getChartConfig = () => {
    const series = [], yaxis = [], xaxis = [];
    const convertService = new ConvertService();
    let id = 0;

    for (const [coinKey, coinData] of data.entries()) {
      const maxPrice = Math.max.apply(Math, coinData.prices);

      series.push({
        name: coinData.label,
        data: coinData.prices
      });

      yaxis.push({
          opposite: !!id,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: lineColors[coinKey]
          },
          labels: {
            style: {
              colors: lineColors[coinKey]
            },
            formatter: function (value) {
              return convertService.round(value)
            }
          },
          title: {
            text: coinData.label,
            style: {
              color: "lineColors[coinKey]"
            }
          },
        max: maxPrice + 2000
      });

      //нет смысла добавлять время для каждого коина. Оно везде одинаковое
      if (!id) {
        xaxis.push(
          ...coinData.timestamp.map((time) => new Date(time).toLocaleDateString())
        );
      }

      id++;
    }

    return {
      series,
      xaxis,
      yaxis,
    }
  }

  const chartConfig = getChartConfig();

  const state = {
    series: [...chartConfig.series],
    options: {
      colors: ["#FF1654", "#247BA0"],
      chart: {
        height: 450,
        type: 'line',
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 2,
      },
      stroke: {
        curve: 'straight'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: [...chartConfig.xaxis],
      },
      yaxis: [...chartConfig.yaxis]
    },
  };

  return (
    <Chart options={ state.options } series={ state.series } type="line" height={550} />
  );
}

class ExchangeChart extends Component {
  constructor(props) {
    super(props);
    this.cryptoService = new CryptoService(this.props.coinID);
    this._fetchMarketsExchange();
    this.updateDataIntervalID = setInterval(this._fetchMarketsExchange, 1000000000)
  }

  componentWillUnmount() {
    clearInterval(this.updateDataIntervalID);
  }

  _fetchMarketsExchange = () => {
    this.cryptoService.getMarketsExchange()
      .then((data) => {
        this.setState({
          data,
        });
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }

  render() {
    const content = !this.state ? <LoadingIndicator /> : <LineChart data={ this.state.data } />;

    return(
      <div className="exchange-chart">
        <h2 className="exchange-chart__title">{ this.props.title }</h2>

        <div className="exchange-chart__content">
          { content }
        </div>
      </div>
    );
  }
}

export default ExchangeChart;