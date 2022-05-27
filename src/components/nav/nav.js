import React from 'react'
import { NavLink } from "react-router-dom";

import './nav.sass'

const Nav = () => {
  const menuObject = [
    { label: 'Главная страница', link: '/' },
    { label: 'Портфель', link: 'portfolio' },
  ];
  const menu = !menuObject ? null : menuObject.map((menuItem, index) => {
    return(
      <li key={ index } className="nav-item">
        <NavLink to={ menuItem.link }
                 className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          { menuItem.label }
        </NavLink>
      </li>
    );
  });

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      { menu }
    </ul>
  );
}

export default Nav;