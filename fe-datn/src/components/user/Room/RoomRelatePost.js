import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { url } from '../../url';


function RoomRelatePost({onClick}) {
  const [listPost, setListPost] = useState([]);
  useEffect(() => {
    getData();
  },[onclick]);

  const [alert, setAlert] = useState({
    err_list: {},
  });  
  const getData = async () => {
    const res = await axios.get(`${url}/post/show`);
    setListPost(res.data.data);
  };
var settings = {
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
            <div className="slide_show">
            <Slider {...settings} >
            {listPost.map((post, index) => {
             return (   
               <div className="content_Relate" style={{padding: '0 10px'}} key={index}> 
                   <div className="room_img img_room_lq" > 
                       <img style={{padding: '5px 0', width:"100%",height:"300px"}} src={post.link_img} alt={post.name_img} /> 
                   </div> 
                   <div className="bed_room"> 
                       <h3><NavLink to={`../roomdetail/${post.id_post}`} onClick={(e) => onClick(e,post.id_post)}>{post.post_name}</NavLink></h3> 
                      <span className='currency'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(post.room_price)}</span> 
                       <p>{post.description_sort}</p> 
                   </div> 
               </div> 
            );})}  
           </Slider> 
            </div>
          
        </div>
  )
}

export default RoomRelatePost