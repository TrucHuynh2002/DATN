import React from 'react';
import { NavLink } from 'react-router-dom';

function NavAdmin() {
  return (
    <>
        <ul id="menu">
          <li><NavLink to="/admin">
            <i className='bx bx-home'></i> Trang chủ</NavLink>
          </li>
          <li><NavLink to="list_category">
              <i className='bx bx-category-alt'></i> Danh mục 
              <i className='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">             
              <li><NavLink to="list_category" className='sub-menu'>Danh sách</NavLink></li>
              <li><NavLink to="add_category" className='sub-menu'>Thêm</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="list_roomtype"><i className='bx bx-category-alt'></i> Loại phòng 
              <i className='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">             
              <li><NavLink to="list_roomtype" className='sub-menu'>Danh sách</NavLink></li>
              <li><NavLink to="add_roomtype" className='sub-menu'>Thêm</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="list_post"><i className='bx bx-book-content'></i> Bản Tin
              <i className='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">          
              <li><NavLink to="list_post" className='sub-menu'>Danh sách</NavLink></li>
              {/* <li><NavLink to="../../addpost" className='sub-menu'>Thêm</NavLink></li>*/}
            </ul>
          </li>
          <li><NavLink to="list_blog"><i className='bx bx-book-content'></i> Blog
              <i className='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">          
              <li><NavLink to="list_blog" className='sub-menu'>Danh sách</NavLink></li>
              <li><NavLink to="add_blog" className='sub-menu'>Thêm</NavLink></li>          
            </ul>
          </li>
          <li><NavLink to="list_furniture"><i className='bx bx-buildings'></i> Nội thất
                <i className='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">             
              <li><NavLink to="list_furniture" className='sub-menu'>Danh sách</NavLink></li>
              <li><NavLink to="add_furniture" className='sub-menu'>Thêm</NavLink></li>
            </ul>
          </li>         
          <li><NavLink to="list_comment"><i className='bx bx-message-dots'></i> Bình luận
                <i className='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">             
              <li><NavLink to="list_comment" className='sub-menu'>Danh sách</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="list_user"><i className='bx bx-user-circle'></i> Tài khoản
                <i className='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">             
              <li><NavLink to="list_user" className='sub-menu'>User</NavLink></li>
              <li><NavLink to="list_contact" className='sub-menu'>Liên hệ</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="listlogo"><i className='bx bx-cog'></i> Cấu hình
                <i className='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">             
              <li><NavLink to="listlogo" className='sub-menu'>Cấu hình chung</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/"><i className='bx bx-log-out-circle'></i> Quay lại trang user</NavLink></li>
        </ul>
    </>
  )
}

export default NavAdmin