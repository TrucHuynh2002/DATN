import React from 'react'
import { NavLink } from 'react-router-dom';

function NavConfig() {
  return (
    <>
        <ul id='nav-setting'>
          <li><NavLink to="" className='nav-config'>Header</NavLink></li>
          <li><NavLink to="footerConfig" className='nav-config'>Footer</NavLink></li>
          <li><NavLink to="bannerConfig" className='nav-config'>Banner</NavLink></li>
          <li><NavLink to="homeConfig" className='nav-config'>Cài đặt trang chủ</NavLink></li>
          <li><NavLink to="aboutConfig" className='nav-config'>Cài đặt trang giới thiệu</NavLink></li>
          <li><NavLink to="contactConfig" className='nav-config'>Cài đặt trang liên hệ</NavLink></li>
          <li><NavLink to="productConfig" className='nav-config'>Cài đặt trang sản phẩm</NavLink></li>
        </ul>
    
    </>
  )
}

export default NavConfig