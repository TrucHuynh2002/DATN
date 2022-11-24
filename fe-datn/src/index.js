import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css';
import './css/style.css';
import './css/responsive.css';
import './css/blog.css';

// admin home
import App from './components/admin/App';
import Home from './components/admin/Home';
// admin category
import AddCategory from './components/admin/category/AddCategory';
import EditCategory from './components/admin/category/EditCategory';
import ListCategory from './components/admin/category/ListCategory';
// admin roomtype
import AddRoomType from './components/admin/roomtype/AddRoomType';
import EditRoomType from './components/admin/roomtype/EditRoomType';
import ListRoomType from './components/admin/roomtype/ListRoomType';

// admin post
import AddPost from './components/admin/post/AddPost';
import EditPost from './components/admin/post/EditPost';
import ListPost from './components/admin/post/ListPost';

// admin Blog 
import AddBlog from './components/admin/Blog/AddBlog';
import EditBlog from './components/admin/Blog/EditBlog';
import ListBlog from './components/admin/Blog/ListBlog';

// admin Furniture
import AddFurniture from './components/admin/furniture/AddFurniture';
import EditFurniture from './components/admin/furniture/EditFurniture';
import ListFurniture from './components/admin/furniture/ListFurniture';
// admin contact
import ListContact from './components/admin/contact/ListContact';
import EditContact from './components/admin/contact/EditContact';
// admin comment
import ListComment from './components/admin/comment/ListComment';
// admin user
import ListUser from './components/admin/user/ListUser';
// admin setting
import Setting from './components/admin/setting/Setting';
import BannerConfig from './components/admin/setting/BannerConfig';
import FooterConfig from './components/admin/setting/FooterConfig';

// link menu user
import HomeUser from './components/user/HomeUser';
import About from './components/user/About';
import Blog from './components/user/Blog';
import BlogDetail from './components/user/BlogDetail';
import Contact from './components/user/Contact';
import Gallery from './components/user/Gallery';
import Room from './components/user/Room';
import RoomDetail from './components/user/RoomDetail';
import LayoutUser from './components/user/LayoutUser';
import Login from './components/user/Login';
import Signin from './components/user/Signin';
import ForgotPassword from './components/user/ForgotPassword';
// postuser
import AddPostUser from './components/user/postuser/AddPost';

// admin post
import Add from './components/account/post/Add';
import Edit from './components/account/post/Edit';
import List from './components/account/post/List';
// admin user
import ListAccount from './components/account/account_information/ListAccount';
import UpdateAccount from './components/account/account_information/UpdateAccount';
import ConfirmAccount from './components/account/account_information/ConfirmAccount';
import Layout from './components/account/Layout';
import LayoutConfig from './components/admin/setting/LayoutConfig';

// const navigate = useNavigate();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      {/* chuyển hướng user */}
      <Route path="/" element={<LayoutUser />}>
        <Route path="" element={<HomeUser />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blogdetail" element={<BlogDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="room" element={<Room />} />
        <Route path="roomdetail" element={<RoomDetail />} />
        <Route path="addpost" element={<AddPostUser />} />

        <Route path="login" element={<Login />} />
        <Route path="signin" element={<Signin />} />
        <Route path="forgotpw" element={<ForgotPassword />} />

      </Route>

      {/* chuyển hướng admin tổng */}
      <Route path="/admin" element={<App />}>
        <Route path="" element={<Home/>} />
        {/* post */}
        <Route path="list_post" element={<ListPost />} />
        <Route path="add_post" element={<AddPost />} />
        <Route path="edit_post/:id_post" element={<EditPost />} />
        {/* blog */}
        <Route path="list_blog" element={<ListBlog />} />
        <Route path="add_blog" element={<AddBlog />} />
        <Route path="edit_blog/:id_blog" element={<EditBlog />} />
        {/* furniture */}
        <Route path="add_furniture" element={<AddFurniture />} />
        <Route path="edit_furniture/:id_furniture" element={<EditFurniture />} />
        <Route path="list_furniture" element={<ListFurniture />} />
        {/* contact */}
        <Route path="list_contact" element={<ListContact />} />
        <Route path="edit_contact/:id_contact" element={<EditContact />} />
        {/* comment */}
        <Route path="list_comment" element={<ListComment />} />
        {/* category */}
        <Route path="add_category" element={<AddCategory />} />
        <Route path="edit_category/:id_category" element={<EditCategory />} />
        <Route path="list_category" element={<ListCategory />} />

        {/* roomtype */}
        <Route path="add_roomtype" element={<AddRoomType />} />
        <Route path="edit_roomtype/:id_room_type" element={<EditRoomType />} />
        <Route path="list_roomtype" element={<ListRoomType />} />

        {/* user list */}
        <Route path="list_user" element={<ListUser />} />
        {/* <Route path="setting" element={<Setting />} />   */}

        {/* chuyển hướng các trang trong setting */}
        <Route path="setting" element={<LayoutConfig />}>
          <Route path="" element={<Setting />} /> 
          <Route path="footerConfig" element={<FooterConfig />} />        
          <Route path="bannerConfig" element={<BannerConfig />} />        
        </Route>
      </Route>

      {/* chuyển hướng admin user */}
      <Route path="/adminuser" element={<Layout />}>
        <Route path="" element={<ListAccount />} />
        <Route path="update_acc" element={<UpdateAccount />} />
        <Route path="confirm_acc" element={<ConfirmAccount />} />
        {/* post */}
        <Route path="add" element={<Add />} />
        <Route path="edit" element={<Edit />} />
        <Route path="list" element={<List />} />
      </Route>

    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);