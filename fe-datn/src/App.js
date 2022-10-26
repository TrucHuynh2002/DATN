import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom';
import { Container, Row, Navbar, NavDropdown } from 'react-bootstrap';
import AddCategory from './admin/category/AddCategory';
import EditCategory from './admin/category/EditCategory';
import ListCategory from './admin/category/ListCategory';
import Home from './admin/Home';
import ListPostCard from './admin/postcard/ListPostCard';
import AddPost from './admin/post/AddPost';
import EditPost from './admin/post/EditPost';
import ListPost from './admin/post/ListPost';
import AddFurniture from './admin/furniture/AddFurniture';
import EditFurniture from './admin/furniture/EditFurniture';
import ListFurniture from './admin/furniture/ListFurniture';
import ListContact from './admin/contact/ListContact';
import ListComment from './admin/comment/ListComment';
import ListUser from './admin/user/ListUser';
import Setting from './admin/setting/Setting';

import AboutConfig from './admin/setting/AboutConfig';
import BannerConfig from './admin/setting/BannerConfig';
import ContactConfig from './admin/setting/ContactConfig';
import FooterConfig from './admin/setting/FooterConfig';
import HomeConfig from './admin/setting/HomeConfig';
import ProductConfig from './admin/setting/ProductConfig';

function App() {
  return (
    <>
      <Container fluid>
      <Row>
        <div class="nav-top">
        <div class="menu">
            <i class='bx bx-menu'></i>
        </div>
        <a href="123">
            <img src="../img/logo_nhatro.png" alt="logo" />
        </a>
        <div class="nav-top-logout">
            <NavLink to="/" className='logout'>Đăng xuất</NavLink>
        </div>
        </div>

        <Navbar bg="light" expand="lg">
            {/* Trang chủ */}
              <NavLink to="/" className='bx bx-home'> Trang chủ</NavLink>
             {/* Bài đăng */}
              <NavDropdown title="Bài đăng" className="" id="basic-nav-dropdown">
                  <NavLink to="/list_postcard" className="drop-nav">Danh sách</NavLink>                  
              </NavDropdown>
            {/* Bài viết */}
              <NavDropdown title="Bài viết" className='' id="basic-nav-dropdown">
                  <NavLink to="/list_post" className="drop-nav">Danh sách</NavLink>                   
                  <NavLink to="/add_post" className="drop-nav">Thêm</NavLink>                   
              </NavDropdown>
            {/* Danh mục */}
              <NavDropdown title="Danh mục" className='' id="basic-nav-dropdown">
                  <NavLink to="/list_category" className="drop-nav">Danh sách</NavLink>                   
                  <NavLink to="/add_category" className="drop-nav">Thêm</NavLink>                   
              </NavDropdown>
            {/* Nội thất */}
              <NavDropdown title="Nội thất" className='' id="basic-nav-dropdown">
                  <NavLink to="/list_furniture" className="drop-nav">Danh sách</NavLink>                   
                  <NavLink to="/add_furniture" className="drop-nav">Thêm</NavLink>                   
              </NavDropdown>
            {/* Bình luận */}
              <NavDropdown title="Bình luận" className='' id="basic-nav-dropdown">
                  <NavLink to="/list_comment" className="drop-nav">Danh sách</NavLink>                   
              </NavDropdown>
            {/* Người dùng */}
              <NavDropdown title="Người dùng" className='' id="basic-nav-dropdown">
                  <NavLink to="/list_user" className="drop-nav">Danh sách</NavLink>                   
                  <NavLink to="/list_contact" className="drop-nav">Liên hệ</NavLink>                   
              </NavDropdown>
            {/* Cấu hình */}
              <NavDropdown title="Cấu hình" className='' id="basic-nav-dropdown">
                  <NavLink to="/setting" className="drop-nav">Cấu hình</NavLink>                   
              </NavDropdown>

        </Navbar>

        {/* Footer */}
        {/* <div class="footer">
          <p>Copyright © 2022. DATN WEB 16.3</p>
        </div> */}
      </Row>
      </Container>

    {/* Chuyển hướng các trang chính */}
      <Routes>
        {/* index */}
          <Route path="/" element={<Home />} />
        {/* post card */}
          <Route path="/list_postcard" element={<ListPostCard />} />
        {/* post */}
          <Route path="/add_post" element={<AddPost />} />
          <Route path="/edit_post" element={<EditPost />} />
          <Route path="/list_post" element={<ListPost />} />
        {/* furniture */}
          <Route path="/add_furniture" element={<AddFurniture />} />
          <Route path="/edit_furniture" element={<EditFurniture />} />
          <Route path="/list_furniture" element={<ListFurniture />} />
        {/* contact */}
          <Route path="/list_contact" element={<ListContact />} />
        {/* comment */}
          <Route path="/list_comment" element={<ListComment />} />
        {/* category */}
          <Route path="/add_category" element={<AddCategory />} />
          <Route path="/edit_category" element={<EditCategory />} />
          <Route path="/list_category" element={<ListCategory />} />
        {/* user */}
          <Route path="/list_user" element={<ListUser />} />
        {/* setting */}
          <Route path="/setting" element={<Setting />} />  

        {/* chuyển hướng các trang trong setting */}
          <Route path="/footerConfig" element={<FooterConfig />} />        
            <Route path="/bannerConfig" element={<BannerConfig />} />        
            <Route path="/homeConfig" element={<HomeConfig />} />        
            <Route path="/aboutConfig" element={<AboutConfig />} />        
            <Route path="/contactConfig" element={<ContactConfig />} />        
          <Route path="/productConfig" element={<ProductConfig />} /> 

      </Routes>

      </>
  );
}

export default App;
