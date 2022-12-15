import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Title, ArcElement, Legend } from 'chart.js';

ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Title, ArcElement, Legend
);

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
    getView();
    getContact();
    getUser();
    getComment();
    getFurniture();
    getBlog();
    getPost();
    getRoomType();
    getCategory();
  },[]);

// list Category
  const getCategory = async () => {
   const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/category");

  setListCategory(result.data.data);
  };
// list Category
const getRoomType = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/roomType");
 setListRoomType(result.data.data);
 };
 // list Category
 const getPost = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/post");
 setListPost(result.data.data);
 };
 // list Category
 const getBlog = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/blog");
 setListBlog(result.data.data);
 };
 // list Category
 const getFurniture = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/furniture");
 setListFurniture(result.data.data);
 };
 // list Category
 const getComment = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/comment");
 setListComment(result.data.data);
 };
 // list Category
 const getUser = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/user");
 setListUser(result.data.data);
 };
 const getContact = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/contact");
 setListContact(result.data.data);
 };
 const getView = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/view");
 setListView(result.data.data);
 };

//  chartjs line
const dataLine = {
  labels: ["2022", "2020", "2021"],
  datasets: [{
      data: [2, 5.5, 7],
      backgroundColor: 'transparent',
      borderColor: 'red',
      pointBoderColor: 'transparent',
      pointBorderWidth: 4,
      tension: 0.5
  }]
};
const options = {
  plugins: {
      legend: false
  },
  scales: {
      x: {
          grid: {
              display: false
          }
      },
      y: {
          min: 1,
          max: 10,
          ticks: {
              stepSize: 2,
              callback: (value) => value + 'K'
          },
          grid: {

          }
      }
  }
};

// chartjs pie
const dataPie = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [{
    data: [2, 5, 10],
    backgroundColor: [
      'red',
      'blue',
      'yellow'
    ]
  }],
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

      {/* biểu đồ */}
      <div className='row'>
        <div className='col-md-8'>
          <Line data={dataLine} options={options}></Line>
        </div>
        <div className='col-md-4'>
          <Pie data={dataPie} />
        </div>
      </div>

    </>
  )
}

export default Home