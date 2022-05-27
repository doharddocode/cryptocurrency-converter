import React from 'react'
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";

import './nav.sass'

const Nav = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const menuObject = [
    { label: 'Главная страница', link: '/' },
    { label: 'Портфель', link: 'portfolio' },
  ];
  const menu = !menuObject ? null : menuObject.map((menuItem, index) => {
    return(
      <li key={ index } className="nav-item" onClick={ handleClose }>
        <NavLink className="nav-link" to={ menuItem.link }>{ menuItem.label }</NavLink>
      </li>
    );
  });

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <h5 className="offcanvas-title" id="offcanvasLabel">Меню</h5>
      </Offcanvas.Header>
      <ul className="primary-menu__nav nav">{ menu }</ul>
    </Offcanvas>
  );
  //
  // return(
  //   <div className="primary-menu offcanvas offcanvas-start"
  //        tabIndex="-1" id="offcanvasMenu"
  //        aria-labelledby="offcanvasLabel">
  //     <div className="offcanvas-header">
  //
  //     </div>
  //
  //
  //   </div>
  // );
}

export default Nav;