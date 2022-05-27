import React, { Component } from "react";

import MainPage from "./main-page";
import PortfolioPage from "./portfolio-page";

class PageWrapper extends Component {
  render() {
    return (
      <main className="main">
        <div className="row">{ this.props.children }</div>
      </main>
    );
  }
}

export {
  PageWrapper,
  MainPage,
  PortfolioPage
}
