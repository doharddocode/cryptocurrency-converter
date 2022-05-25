import React from "react";

import Logo from "../logo";

import './header.sass'

const Header = () => {
  return (
    <header className="header row align-items-center">
      <div className="col-md-9">
        <Logo />
      </div>

      <div className="col-md-3">
        <button type="button" className="header__open-menu-btn btn btn-primary"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasMenu"
                aria-controls="offcanvasMenu">Открыть меню
        </button>
      </div>
    </header>
  );
}

export default Header;