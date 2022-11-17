import React from 'react'
import { NavLink, Link } from 'react-router-dom';

function HeaderAdminUser() {
  return (
    <>
        <div className="nav-top">
        <div className="menu">
            <i className='bx bx-menu'></i>
        </div>
        <Link href="123">
            <img src="../img/logo_nhatro.png" alt="logo" />
        </Link>
        <div className="nav-top-logout">
            <NavLink to="" className='logout'>Đăng xuất</NavLink>
        </div>
      </div>    
    </>
  )
}

export default HeaderAdminUser