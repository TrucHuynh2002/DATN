import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
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
  const [listViewIndex, setListViewIndex] = useState([]);
  const [listViewPost, setListViewPost] = useState([]);

  useEffect(() => {
    getData();
  },[]);

// list Category
  const getData = async () => {
    const Category = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/category");
    setListCategory(Category.data.data);
    const RoomType = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/roomType");
    setListRoomType(RoomType.data.data);
    const Post = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/post");
    setListPost(Post.data.data);
    const Blog = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/blog");
    setListBlog(Blog.data.data);
    const Furniture = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/furniture");
    setListFurniture(Furniture.data.data);
    const Comment = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/comment");
    setListComment(Comment.data.data);
    const User = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/user");
    setListUser(User.data.data);
    const Contact = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/contact");
    setListContact(Contact.data.data);
    const View = await axios.get("http://127.0.0.1:8000/api/StatisticalSController/view");
    setListView(View.data.data);
    const ViewIndex = await axios.get("http://127.0.0.1:8000/api/view_index/show");
    setListViewIndex(ViewIndex.data.data);
    const ViewPost = await axios.get("http://127.0.0.1:8000/api/post/post_view_top5");
    setListViewPost(ViewPost.data.data);
  };

//  chartjs line
const dataLine = {
  labels: listViewIndex.map((pr,i) =>  moment(pr.created_at).format('DD-MM-YYYY')),
  datasets: [{
      data: listViewIndex.map((pr,i) =>  pr.view_index),
      backgroundColor: 'transparent',
      borderColor: 'red',
      pointBorderWidth: 4,
      tension: 0.5
  }]
};
// chartjs pie
const dataPie = {
  labels: listViewPost.map((pr,i) =>  pr.post_name),
  datasets: [{
    data: listViewPost.map((pr,i) =>  pr.view),
    backgroundColor: [
      'red',
      'blue',
      'yellow',
      'black',
      'violet'
    ]
  }],
};

  return (
    <>      
      <div className="content">
          <div className="row content-row ">
            <div className=" col-admin category">
              <i className="bx bx-category-alt postcard-i"></i>
              <div className="postcard-content">
                <span> Danh mục</span>
                <br />
                <p className="chart">{listCategory}</p>
              </div>
            </div>
            <div className=" col-admin roomtype">
              <i className="bx bx-category-alt postcard-i"></i>
              <div className="postcard-content">
                <span> Loại phòng</span>
                <br />
                <p className="chart">{listRoomType}</p>
              </div>
            </div>  
            <div className="col-admin postcard">
              <i className="bx bx-copy-alt postcard-i"></i>
              <div className="postcard-content">
                <span> Bản tin</span>
                <br />
                <p className="chart">{listPost}</p>
              </div>
            </div>
            <div className="col-admin post">
              <i className="bx bx-edit-alt postcard-i"></i>
              <div className="postcard-content">
                <span> Bài blog</span>
                <br />
                <p className="chart">{listBlog}</p>
              </div>
            </div>
            <div className="col-admin interior">
              <i className="bx bx-arch postcard-i"></i>
              <div className="postcard-content">
                <span> Nội thất</span>
                <br />
                <p className="chart">{listFurniture}</p>
              </div>
            </div>
            </div>
            <div className="row content-row ">
          
            <div className="col-admin comment">
              <i className="bx bx-message-dots postcard-i"></i>
              <div className="postcard-content">
                <span> Bình luận</span>
                <br />
                <p className="chart">{listComment}</p>
              </div>
            </div>
            <div className="col-admin user">
              <i className="bx bx-user postcard-i"></i>
              <div className="postcard-content">
                <span> Người dùng</span>
                <br />
                <p className="chart">{listUser}</p>
              </div>
            </div>
            <div className="col-admin contactlist">
              <i className="bx bx-user postcard-i"></i>
              <div className="postcard-content">
                <span> Liên hệ</span>
                <br />
                <p className="chart">{listContact}</p>
              </div>
            </div>
            <div className="col-admin contactlist">
              <i className="bx bx-user postcard-i"></i>
              <div className="postcard-content">
                <span> Lượt truy cập</span>
                <br />
                <p className="chart">{listView}</p>
              </div>
            </div>
          </div>            
      </div>
      {/* biểu đồ */}
      <div className='row'>
        <div className='col-md-8 col-lg-8 col-sm-12'>
          <Line data={dataLine} />
          <div className="name_bieudo"><h5><span>Biểu đồ :</span> Thống kê lượt xem theo tháng của trang web</h5></div>
        </div>
        <div className='col-md-4 col-lg-4 col-sm-12'>
          <Pie data={dataPie} />
          <div className="name_bieudo"><h5><span>Biểu đồ : </span>Thống kê top 5 bài Post cao nhất của trang web</h5></div>
        </div>
      </div>

    </>
  )
}

export default Home