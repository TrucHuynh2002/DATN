import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

function NavConfig() {
  return (
    <>
      <Nav className="flex-column">
          <NavLink to="/setting" className="nav-config">Header</NavLink>             
          <NavLink to="/footerConfig" className="nav-config">Footer</NavLink>             
          <NavLink to="/bannerConfig" className="nav-config">Banner</NavLink>             
          <NavLink to="/homeConfig" className="nav-config">Cài đặt trang chủ</NavLink>             
          <NavLink to="/aboutConfig" className="nav-config">Cài đặt trang giới thiệu</NavLink>             
          <NavLink to="/contactConfig" className="nav-config">Cài đặt trang liên hệ</NavLink>             
          <NavLink to="/productConfig" className="nav-config">Cài đặt trang sản phẩm</NavLink>             
      </Nav>
    
    </>
  )
}

export default NavConfig