import React from "react";
import { Link } from "react-router-dom";

import './logo.sass'

const Logo = () => {
  return (
    <Link to="/" className="logo navbar-brand">
      <i className="logo__icon fa-solid fa-arrows-spin"></i>
      Конвертер
    </Link>
  );
}

export default Logo;