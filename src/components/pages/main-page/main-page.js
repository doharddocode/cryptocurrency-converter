import React from "react";

import { PageWrapper } from "../index";
import Converter from "../../converter";
import ExchangeChart from "../../exchange-chart";

const MainPage = () => {
  return (
    <PageWrapper>
      <Converter title="Конвертер криптовалюты" />

      <ExchangeChart
        title="График изменения курса валют"
        coinID="bitcoin,ethereum"
      />
    </PageWrapper>
  )
}

export default MainPage;