import React, { Component } from "react";

import MainPage from "./main-page";
import PortfolioPage from "./portfolio-page";
import NotFoundPage from "./404-page";
import ErrorPage from "./error-page";

import './pages.sass'

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
  PortfolioPage,
  NotFoundPage,
  ErrorPage,
}
