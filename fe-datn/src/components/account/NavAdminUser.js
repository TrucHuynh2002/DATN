import React from 'react'
import { NavLink } from 'react-router-dom';

function NavAdminUser() {
  return (
    <>
        {/* menu */}
        
      <ul id="menu-account">
        <li><NavLink to="">
          <i className='bx bx-home'></i> Thông tin tài khoản</NavLink>
        </li>
        <li><NavLink to="list"><i className='bx bx-book-content'></i> Bài viết
            <i className='bx bx-chevron-down'></i>
            </NavLink>
          <ul id="sub">             
            <li><NavLink to="list" className='sub-menu'>Danh sách</NavLink></li>
            <li><NavLink to="add" className='sub-menu'>Thêm</NavLink></li>
          </ul>
        </li>
        <li><NavLink to="postcard">
          <i className='bx bx-notepad'></i> Bài đăng</NavLink>
        </li>
        <li><NavLink to=""><i className='bx bx-log-out-circle'></i> Quay lại</NavLink></li>
      </ul>
    </>
  )
}

export default NavAdminUser