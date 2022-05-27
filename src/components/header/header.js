import React from "react";
import { Button } from "react-bootstrap";

import Logo from "../logo";

import './header.sass'

const Header = ({ onOpenMenu }) => {
  return (
    <header className="header row align-items-center">
      <div className="col-md-9">
        <Logo />
      </div>

      <div className="col-md-3">
        {/*<button type="button" className="header__open-menu-btn btn btn-primary"*/}
        {/*        data-bs-toggle="offcanvas"*/}
        {/*        data-bs-target="#offcanvasMenu"*/}
        {/*        aria-controls="offcanvasMenu">Открыть меню*/}
        {/*</button>*/}
        <Button
          variant="primary"
          className="header__open-menu-btn btn btn-primary"
          onClick={ onOpenMenu }
        >
          Открыть меню
        </Button>
      </div>
    </header>
  );
}

export default Header;