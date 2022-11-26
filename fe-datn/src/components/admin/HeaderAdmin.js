import React from 'react'
import { NavLink } from 'react-router-dom';
// link img
import LogoAdmin from '../../images/logo-ft.png';

function HeaderAdmin() {
  return (
    <>
        <div className="nav-top">
          <div className="menu">
              <i className='bx bx-menu'></i>
          </div>
          <a href="/">
              <img src={LogoAdmin} alt="logo" width="100%" />
          </a>
          <div className="nav-top-logout">
              <NavLink to="" className='logout'>Đăng xuất</NavLink>
          </div>
        </div>   
    </>
  )
}

export default HeaderAdmin