import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [listCategory, setListCategory] = useState([]);
  const [listRoomType, setListRoomType] = useState([]);
  const [listPost, setListPost] = useState([]);
  const [listBlog, setListBlog] = useState([]);
  const [listFurniture, setListFurniture] = useState([]);
  const [listComment, setListComment] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [listContact, setListContact] = useState([]);
  const [listView, setListView] = useState([]);

  useEffect(() => {
    getCategory();
  },[]);
  useEffect(() => {
    getRoomtype();
  },[]);
  useEffect(() => {
    getPost();
  },[]);
  useEffect(() => {
    getBlog();
  },[]);
  useEffect(() => {
    getFurniture();
  },[]);
  useEffect(() => {
    getComment();
  },[]);
  useEffect(() => {
    getUser();
  },[]);
  useEffect(() => {
    getContact();
  },[]);
  useEffect(() => {
    getView();
  },[]);

// list Category
  const getCategory = async () => {
   const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/category");
  //  console.log(result);
  setListCategory(result.data.data);
  };
// list Category
const getRoomtype = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/roomType");
 //  console.log(result);
 setListRoomType(result.data.data);
 };
 // list Category
 const getPost = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/post");
 //  console.log(result);
 setListPost(result.data.data);
 };
 // list Category
 const getBlog = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/blog");
 //  console.log(result);
 setListBlog(result.data.data);
 };
 // list Category
 const getFurniture = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/furniture");
 //  console.log(result);
 setListFurniture(result.data.data);
 };
 // list Category
 const getComment = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/comment");
 //  console.log(result);
 setListComment(result.data.data);
 };
 // list Category
 const getUser = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/user");
 //  console.log(result);
 setListUser(result.data.data);
 };
 const getContact = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/contact");
 //  console.log(result);
 setListContact(result.data.data);
 };
 const getView = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/view");
 //  console.log(result);
 setListView(result.data.data);
 };

  return (
    <>      
        <div className="content">
            <div className="row content-row">
              <div className="col col-admin category">
                <i className="bx bx-category-alt postcard-i"></i>
                <div className="postcard-content">
                  <span> Danh mục</span>
                  <br />
                  <p className="chart">{listCategory}</p>
                </div>
              </div>
              <div className="col col-admin roomtype">
                <i className="bx bx-category-alt postcard-i"></i>
                <div className="postcard-content">
                  <span> Loại phòng</span>
                  <br />
                  <p className="chart">{listRoomType}</p>
                </div>
              </div>  
              <div className="col col-admin postcard">
                <i className="bx bx-copy-alt postcard-i"></i>
                <div className="postcard-content">
                  <span> Bản tin</span>
                  <br />
                  <p className="chart">{listPost}</p>
                </div>
              </div>
              <div className="col col-admin post">
                <i className="bx bx-edit-alt postcard-i"></i>
                <div className="postcard-content">
                  <span> Bài blog</span>
                  <br />
                  <p className="chart">{listBlog}</p>
                </div>
              </div>
            </div>

            <div className="row content-row">
              <div className="col col-admin interior">
                <i className="bx bx-arch postcard-i"></i>
                <div className="postcard-content">
                  <span> Nội thất</span>
                  <br />
                  <p className="chart">{listFurniture}</p>
                </div>
              </div>
              <div className="col col-admin comment">
                <i className="bx bx-message-dots postcard-i"></i>
                <div className="postcard-content">
                  <span> Bình luận</span>
                  <br />
                  <p className="chart">{listComment}</p>
                </div>
              </div>
              <div className="col col-admin user">
                <i className="bx bx-user postcard-i"></i>
                <div className="postcard-content">
                  <span> Người dùng</span>
                  <br />
                  <p className="chart">{listUser}</p>
                </div>
              </div>
              <div className="col col-admin contactlist">
                <i className="bx bx-user postcard-i"></i>
                <div className="postcard-content">
                  <span> Liên hệ</span>
                  <br />
                  <p className="chart">{listContact}</p>
                </div>
              </div>
              <div className="col col-admin contactlist">
                <i className="bx bx-user postcard-i"></i>
                <div className="postcard-content">
                  <span> Lượt truy cập</span>
                  <br />
                  <p className="chart">{listView.view_index}</p>
                </div>
              </div>
            </div>            
            </div>

         


    </>
  )
}

export default Home