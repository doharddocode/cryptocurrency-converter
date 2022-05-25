import React from 'react'

import './nav.sass'

const Nav = () => {
  const menuObject = [
    { label: 'Главная страница', link: '#' },
    { label: 'Портфель', link: '#' },
  ];
  const menu = !menuObject ? null : menuObject.map((menuItem, index) => {
    return(
      <li key={ index } className="nav-item">
        <a className="nav-link" href={ menuItem.link }>{ menuItem.label }</a>
      </li>
    );
  });

  return(
    <div className="primary-menu offcanvas offcanvas-start" tabIndex="-1" id="offcanvasMenu"
         aria-labelledby="offcanvasLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasLabel">Меню</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Закрыть"></button>
      </div>

      <ul className="primary-menu__nav nav">{ menu }</ul>
    </div>
  );
}

export default Nav;