import React from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

import LoadingIndicator from "../loading-indicator";
import ConvertService from "../../services/convert-service";

import './portfolio-stats.sass'

const getPiePercent = (coins, coinsTotalAmount) => {
  const convertService = new ConvertService();

  return coins.map((coin) => convertService.round(coin.amount / coinsTotalAmount * coin.price * 100, 4));
}

const getPieLabels = (coins) => {
  return coins.map((coin) => coin.label);
}

const PieChart = () => {
  const { coinsTotalAmount } = useSelector((state) => state.portfolio);
  const coins = useSelector((state) => state.portfolio.coins);

  const chartOptions = {
    series: getPiePercent(coins, coinsTotalAmount),
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: getPieLabels(coins),
      responsive: [{
        breakpoint: 520,
        options: {
          chart: {
            width: 350
          },
          legend: {
            position: 'top'
          }
        }
      }],
    },
  }

  if (!chartOptions.series.length) return <LoadingIndicator />

  return (
    <Chart
      options={ chartOptions.options }
      series={ chartOptions.series }
      type="pie"
      width="500"
    />
  );
}

const PortfolioStats = () => {
  return (
    <div className="crypto-distribution">
      <h2 className="crypto-distribution__title">Текущее распределение валюты в портфеле</h2>

      <div className="crypto-distribution__content">
        <PieChart />
      </div>
    </div>
  );
}

export default PortfolioStats;