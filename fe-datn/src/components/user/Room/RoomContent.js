import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';

function RoomND() {
  var user = JSON.parse(localStorage.getItem("user"));

  const [listPost, setListPost] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [listHeart, setListHeart] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] =useState(9);
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
  // const {id_post} = addHeart;
  // const handleClick = async (index) => {
  //   setAddHeart({...addHeart , id_post : index });
  //   const res = await axios.post(`http://127.0.0.1:8000/api/heartFeeling/create`,addHeart);
  //   if(res.data.status === true){
  //     setAlert({
  //         err_list: res.data
  //     });
  //     console.log(alert.err_list)
  //   }
  //   else{           
  //       setAlert({
  //           err_list: res.data
  //       });
  //   }
  // };
 
    // var btnColor = document.querySelector(".btn_heart");
   
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/post/show');
  //  console.log(res);
   setListPost(res.data.data);
  //  setListHeart(res.data.heart);
  //  var heart = document.querySelector('.heart');
  //  var btn_heart =  document.querySelectorAll(".btn-heart");
  //  for (let i = 0; i < btn_heart.length; i++) {
  //   heart[i].style.backgroundColor = "red";
  //   for (let i = 0; i < btn_heart.length; i++) {
  //     btn_heart.innerHTML = btn_heart[i];
  //   }
  // }
 
  //  {listHeart.map((e,index) => {
   
  //     // for (let i = 0; i < btn_heart.length; i++) {
  //       if(btn_heart.value = e.id_post){
  //         // console.log(btn_heart)
  //         for (let i = 0; i < btn_heart.value.length; i++) {
  //           // console.log(btn_heart.value)
  //           btn_heart[i].innerHTML = `<div class="heart"><i class="bx bxs-heart" onclick=handleClick(e.id_post)></i></div>`;
  //           var heart=  document.querySelectorAll(".btn-heart");
  //           for (let i = 0; i < heart.length; i++) {
  //           heart[i].style.backgroundColor = "red";
  //           }
  //         }
  //       }
  //   // }
  //   else{
  //     // btnColor.style.color = 'red'
  //   }
  //  })}
    
  };
  // console.log(listHeart);
  const getImg = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/imgPost/show`);
    // console.log(res);
    setListImg(res.data.data);   
};

  return (
  <>
    <div className="our_room">
        <div className="container">
            <div className="row">
            {currentPosts.map((post, index) => {
                return (     
                  <div className="col-md-4 col-sm-6" key={index}>
                      <div id="serv_hover" className="room">
                          <div className="room_img">
                          {listImg.map((a, index) => {
                            return a.id_post == post.id_post && (
                              <figure><img src={a.link_img_user} alt="#" /></figure>
                              )})}

                              {/* thả tym */}
                              {/* {listHeart.map((heart, index) => { */}
                              <div className="btn-heart" value={post.id_post}>
                               
                              </div>
                                {/* })}  */}
                          </div>
                          <div className="bed_room">
                              <h3><Link to={`../roomdetail/${post.id_post}`}>{post.post_name}</Link></h3>
                             <span className='currency'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(post.room_price)}</span>
                              <p>{post.description_sort}</p>
                          </div>
                      </div>
                  </div>
                );
              })}
            </div>
            {/* phan trang */}
            <Pagination totalPost={listPost.length} 
            postsPerPage={postsPerPage} 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage} />

        </div>
    </div>
  </>
  )
}

export default RoomND
