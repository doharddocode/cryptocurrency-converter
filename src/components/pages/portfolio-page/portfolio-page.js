import React from "react";

import { PageWrapper } from "../index";
import PortfolioTable from "../../portfolio-table";
import PortfolioBuy from "../../portfolio-buy";
import PortfolioStats from "../../portfolio-stats";

import './portfolio.sass'

const PortfolioPage = () => {
  return (
    <PageWrapper>
      <PortfolioTable />

      <PortfolioBuy />

      <PortfolioStats />
    </PageWrapper>
  );
}

export default PortfolioPage;