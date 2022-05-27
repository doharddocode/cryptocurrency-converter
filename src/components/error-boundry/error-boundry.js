import React, { Component } from "react";

import { ErrorPage } from "../pages/"

export default class ErrorBoundry extends Component {
  state = {
    hasError: false
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true
    })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />
    } else {
      return this.props.children;
    }
  }

}