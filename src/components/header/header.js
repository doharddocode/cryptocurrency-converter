import React from "react";

import Logo from "../logo";
import Nav from "../nav";

import './header.sass'

const Header = () => {
  return (
    <header className="header row align-items-center">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

          <Logo />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Nav />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;