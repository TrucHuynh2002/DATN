import React, { useEffect, useState, Component } from 'react';
// import Slider from "react-slick";
import { Link, NavLink, useParams  } from 'react-router-dom';
import axios from 'axios';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
function RoomRelatePost({onClick})  {

  var user = JSON.parse(localStorage.getItem("user"));
  const {id_post} = useParams();
  const [listPost, setListPost] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] =useState(3);
  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);
  // danh sach post
  useEffect(() => {
    getData();
    getImg();
  },[]);

  const [alert, setAlert] = useState({
    err_list: {},
  });  
  const getData = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/post/show");
    setListPost(res.data.data);
  };
  const getImg = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/imgPost/show_one`);
    setListImg(res.data.data);   
};
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

  return (
        <div className="container-fluid">
          <div className="row">
              <div className="col-12">
                <div className="titlepage">
                  <h2>Phòng liên quan</h2>
                  <p>Đây là những phòng trọ phù hợp với bạn</p>
                </div>
              </div>
            </div>
            {/* <div className="row"> */}
    {/* <div className="slide_show"> */}
            {/* <Slider {...settings} > */}
        {/* {listPost.map((post, index) => { */}
             {/* return (   */}
              {/* <div className="content_Relate" style={{padding: '0 10px'}}> */}
                  {/* <div className="room_img img_room_lq" key={index}> */}
                  {/* {listImg.map((a, index) => { */}
                    {/* return a.id_post == post.id_post && ( */}
                      {/* <img style={{padding: '5px 0'}} key={index} src={a.link_img_user} alt="#" /> */}
                      {/* )})} */}
                      {/* thả tym */}
                      {/* {listHeart.map((heart, index) => { */}
                      {/* <div className="btn-heart" value={post.id_post}></div> */}
                        {/* })}  */}
                  {/* </div> */}
                  {/* <div className="bed_room"> */}
                      {/* <h3><NavLink to={`../roomdetail/${post.id_post}`} onClick={(e) => onClick(e,post.id_post)}>{post.post_name}</NavLink></h3> */}
                     {/* <span className='currency'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(post.room_price)}</span> */}
                      {/* <p>{post.description_sort}</p> */}
                  {/* </div> */}
              {/* </div> */}
          {/* );})}  */}
          {/* </Slider> */}
          {/* </div> */}
        </div>
  )
}

export default RoomRelatePost