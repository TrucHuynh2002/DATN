import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import './css/app.css';
// admin home
import Home from './components/admin/Home';
// admin category
import AddCategory from './components/admin/category/AddCategory';
import EditCategory from './components/admin/category/EditCategory';
import ListCategory from './components/admin/category/ListCategory';
// admin postcard
import ListPostCard from './components/admin/postcard/ListPostCard';
// admin posst
import AddPost from './components/admin/post/AddPost';
import EditPost from './components/admin/post/EditPost';
import ListPost from './components/admin/post/ListPost';
// admin Furniture
import AddFurniture from './components/admin/furniture/AddFurniture';
import EditFurniture from './components/admin/furniture/EditFurniture';
import ListFurniture from './components/admin/furniture/ListFurniture';
// admin contact
import ListContact from './components/admin/contact/ListContact';
// admin comment
import ListComment from './components/admin/comment/ListComment';
// admin user
import ListUser from './components/admin/user/ListUser';
// admin setting
import Setting from './components/admin/setting/Setting';
import AboutConfig from './components/admin/setting/AboutConfig';
import BannerConfig from './components/admin/setting/BannerConfig';
import ContactConfig from './components/admin/setting/ContactConfig';
import FooterConfig from './components/admin/setting/FooterConfig';
import HomeConfig from './components/admin/setting/HomeConfig';
import ProductConfig from './components/admin/setting/ProductConfig';

function App() {
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
        <ul id="menu">
          <li><NavLink to="/">
            <i class='bx bx-home'></i> Trang chủ</NavLink>
          </li>
          <li><NavLink to="/list_category"><i class='bx bx-category-alt'></i> Danh mục 
              <i class='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">             
              <li><NavLink to="/list_category" className='sub-menu'>Danh sách</NavLink></li>
              <li><NavLink to="/add_category" className='sub-menu'>Thêm</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/list_post"><i class='bx bx-book-content'></i> Bài viết
              <i class='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">             
              <li><NavLink to="/list_post" className='sub-menu'>Danh sách</NavLink></li>
              <li><NavLink to="/add_post" className='sub-menu'>Thêm</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/list_furniture"><i class='bx bx-buildings'></i> Nội thất
                <i class='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">             
              <li><NavLink to="/list_furniture" className='sub-menu'>Danh sách</NavLink></li>
              <li><NavLink to="/add_furniture" className='sub-menu'>Thêm</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/list_postcard"><i class='bx bx-notepad'></i> Bài đăng
                <i class='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">             
              <li><NavLink to="/list_postcard" className='sub-menu'>Danh sách</NavLink></li>
            </ul>
          </li>
          
          <li><NavLink to="/list_comment"><i class='bx bx-message-dots'></i> Bình luận
                <i class='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">             
              <li><NavLink to="/list_comment" className='sub-menu'>Danh sách</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/list_user"><i class='bx bx-user-circle'></i> Tài khoản
                <i class='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">             
              <li><NavLink to="/list_user" className='sub-menu'>Danh sách</NavLink></li>
              <li><NavLink to="/list_contact" className='sub-menu'>Liên hệ</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/setting"><i class='bx bx-cog'></i> Cấu hình
                <i class='bx bx-chevron-down'></i>
              </NavLink>
            <ul id="sub">             
              <li><NavLink to="/setting" className='sub-menu'>Cấu hình chung</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/"><i class='bx bx-log-out-circle'></i> Quay lại</NavLink></li>
        </ul>
       
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
