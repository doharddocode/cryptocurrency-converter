import React, { Fragment } from 'react'

import Header from "../header";
import Nav from "../nav";
import Converter from "../converter/";
import Footer from "../footer";

import './app.sass'

const App = () => {
  return (
    <Fragment>
      <div className="container d-flex flex-column min-vh-100">
        <div className="wrapper flex-grow-1">
          <Header />

          <main className="main">
            <div className="row">
              <Converter title="Конвертер криптовалюты" />
            </div>
          </main>
        </div>

        <Nav />
       <Footer />
      </div>
    </Fragment>
  );
}

export default App;