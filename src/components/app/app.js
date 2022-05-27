import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import Header from "../header";
import Footer from "../footer";
import {
  MainPage,
  PortfolioPage
} from '../../components/pages'

import './app.sass'

const App = () => {
  return (
    <div className="container d-flex flex-column min-vh-100">
      <div className="wrapper flex-grow-1">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />
          <Route
            path="/portfolio"
            element={<PortfolioPage />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

const AppWrapper = () => {
  return (
    <div className="app" id="app">
      <Router>
        <App />
      </Router>
    </div>
  )
}

export default AppWrapper;