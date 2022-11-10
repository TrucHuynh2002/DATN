import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import '../../css/app.css';
// admin postcard
import PostCardList from './postcard/List';
import Detail from './postcard/Detail';
import PostCardEdit from './postcard/Edit';
// admin post
import Add from './post/Add';
import Edit from './post/Edit';
import List from './post/List';
// admin user
import ListAccount from './account_information/ListAccount';
import UpdateAccount from './account_information/UpdateAccount';
import ConfirmAccount from './account_information/ConfirmAccount';

function layout() {
  return (
   <>
    <Container fluid>
    <Row>
      <div className="nav-top">
        <div className="menu">
            <i className='bx bx-menu'></i>
        </div>
        <a href="123">
            <img src="../img/logo_nhatro.png" alt="logo" />
        </a>
        <div className="nav-top-logout">
            <NavLink to="/" className='logout'>Đăng xuất</NavLink>
        </div>
      </div>
      {/* menu */}
      <ul id="menu-account">
        <li><NavLink to="/">
          <i class='bx bx-home'></i> Thông tin tài khoản</NavLink>
        </li>
        <li><NavLink to="/list"><i class='bx bx-book-content'></i> Bài viết
            <i class='bx bx-chevron-down'></i>
            </NavLink>
          <ul id="sub">             
            <li><NavLink to="/list" className='sub-menu'>Danh sách</NavLink></li>
            <li><NavLink to="/add" className='sub-menu'>Thêm</NavLink></li>
          </ul>
        </li>
        <li><NavLink to="/postcard">
          <i class='bx bx-notepad'></i> Bài đăng</NavLink>
        </li>
        <li><NavLink to="/"><i class='bx bx-log-out-circle'></i> Quay lại</NavLink></li>
      </ul>
      
    </Row>
    </Container>

    <Routes>
       {/* user */}
        <Route path="/" element={<ListAccount />} />
        <Route path="/update_acc" element={<UpdateAccount />} />
        <Route path="/confirm_acc" element={<ConfirmAccount />} />
        {/* post card */}
          <Route path="/postcard" element={<PostCardList />} />
          <Route path="/postcard-detail" element={<Detail />} />
          <Route path="/postcard-edit" element={<PostCardEdit />} />
        {/* post */}
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/list" element={<List />} />
      </Routes>
   </>
  )
}

export default layout