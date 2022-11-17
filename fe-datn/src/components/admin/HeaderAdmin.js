import React from 'react'
import { NavLink } from 'react-router-dom';
// link img
// import logo from '../../images/logo.png';

function HeaderAdmin() {
  return (
    <>
        <div className="nav-top">
          <div className="menu">
              <i className='bx bx-menu'></i>
          </div>
          <a href="123">
              <img src="" alt="logo" />
          </a>
          <div className="nav-top-logout">
              <NavLink to="" className='logout'>Đăng xuất</NavLink>
          </div>
        </div>   
    </>
  )
}

export default HeaderAdmin