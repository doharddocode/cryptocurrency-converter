import React from "react";

import { PageWrapper } from "../index";
import Converter from "../../converter";
import ExchangeChart from "../../exchange-chart";

const MainPage = () => {
  return (
    <PageWrapper>
      <Converter title="Конвертер криптовалюты" />

      <ExchangeChart
        title="График изменения курса Bitcoin"
        coinID="bitcoin"
      />

      <ExchangeChart
        title="График изменения курса Ethereum"
        coinID="ethereum"
      />
    </PageWrapper>
  )
}

export default MainPage;