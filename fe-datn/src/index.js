import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css';
import './css/style.css';
import './css/responsive.css';

// admin home
import App from './App';
import Home from './components/admin/Home';
// admin category
import AddCategory from './components/admin/category/AddCategory';
import EditCategory from './components/admin/category/EditCategory';
import ListCategory from './components/admin/category/ListCategory';
// admin postcard
import ListPostCard from './components/admin/postcard/ListPostCard';
// admin post
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

// link menu user
import HomeUser from './components/user/HomeUser';
import About from './components/user/About';
import Blog from './components/user/Blog';
import Contact from './components/user/Contact';
import Gallery from './components/user/Gallery';
// import Room from './components/user/Room';
import LayoutUser from './components/user/LayoutUser';

// admin postcard
import PostCardList from './components/account/postcard/List';
import Detail from './components/account/postcard/Detail';
import PostCardEdit from './components/account/postcard/Edit';
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
import RoomDetail from './components/user/RoomDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="add_post" element={<AddPost />} />

      {/* chuyển hướng user */}
      <Route path="/" element={<LayoutUser />}>
        <Route index element={<HomeUser />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="gallery" element={<Gallery />} />
        {/* <Route path="room" element={<Room />} /> */}
        <Route path="roomdetail" element={<RoomDetail />} />

      </Route>

      {/* chuyển hướng admin tổng */}
      <Route path="/admin" element={<App />}>
        <Route index element={<Home/>} />
        <Route path="list_postcard" element={<ListPostCard />} />

        <Route path="list_post" element={<ListPost />} />
        <Route path="add_post" element={<AddPost />} />
        <Route path="edit_post" element={<EditPost />} />

        <Route path="add_furniture" element={<AddFurniture />} />
        <Route path="edit_furniture" element={<EditFurniture />} />
        <Route path="list_furniture" element={<ListFurniture />} />

        <Route path="list_contact" element={<ListContact />} />
        <Route path="list_comment" element={<ListComment />} />

        <Route path="add_category" element={<AddCategory />} />
        <Route path="edit_category" element={<EditCategory />} />
        <Route path="list_category" element={<ListCategory />} />
        
        <Route path="list_user" element={<ListUser />} />
        {/* <Route path="setting" element={<Setting />} />   */}

        {/* chuyển hướng các trang trong setting */}
        <Route path="setting" element={<LayoutConfig />}>
          <Route index element={<Setting />} /> 
          <Route path="footerConfig" element={<FooterConfig />} />        
          <Route path="bannerConfig" element={<BannerConfig />} />        
          <Route path="homeConfig" element={<HomeConfig />} />        
          <Route path="aboutConfig" element={<AboutConfig />} />        
          <Route path="contactConfig" element={<ContactConfig />} />        
          <Route path="productConfig" element={<ProductConfig />} /> 
        </Route>
      </Route>

      {/* chuyển hướng admin user */}
      <Route path="/adminuser" element={<Layout />}>
        <Route index element={<ListAccount />} />
        <Route path="update_acc" element={<UpdateAccount />} />
        <Route path="confirm_acc" element={<ConfirmAccount />} />
        {/* post card */}
        <Route path="postcard" element={<PostCardList />} />
        <Route path="postcard-detail" element={<Detail />} />
        <Route path="postcard-edit" element={<PostCardEdit />} />
        {/* post */}
        <Route path="add" element={<Add />} />
        <Route path="edit" element={<Edit />} />
        <Route path="list" element={<List />} />
      </Route>

    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);