import React from "react";
import { NavLink } from "react-router-dom";

import './logo.sass'

const Logo = () => {
  return (
    <NavLink
      to="/"
      className="logo"
    >
      <h1 className="header__title">Личный кабинет</h1>
    </NavLink>
  );
}

export default Logo;