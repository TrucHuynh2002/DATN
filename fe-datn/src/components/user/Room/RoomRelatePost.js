import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams  } from 'react-router-dom';
import axios from 'axios';
import Figure from 'react-bootstrap/Figure';

function RoomRelatePost({onClick}) {

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

  return (
    <>     
    <div className="our_room">
        <div className="container">
          <div className="row">
              <div className="col-12">
                <div className="titlepage">
                  <h2>Phòng liên quan</h2>
                  <p>Đây là những phòng trọ phù hợp với bạn</p>
                </div>
              </div>
            </div>
            <div className="row">
            {listPost.map((post, index) => {
                return (     
                  <div className="col-md-4 col-sm-6" key={index}>
                      <div id="serv_hover" className="room">
                          <div className="room_img">
                          { listImg.id_post == post.id_post && (
                              <Figure key={index}><img src={listImg.link_img_user} alt="#" /></Figure>
                            )}

                              {/* thả tym */}
                              {/* {listHeart.map((heart, index) => { */}
                              <div className="btn-heart" value={post.id_post}>
                               
                              </div>
                                {/* })}  */}
                          </div>
                          <div className="bed_room">
                              <h3><NavLink to={`../roomdetail/${post.id_post}`} onClick={(e) => onClick(e,post.id_post)}>{post.post_name}</NavLink></h3>
                             <span className='currency'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(post.room_price)}</span>
                              <p>{post.description_sort}</p>
                          </div>
                      </div>
                  </div>
                );
            })}

            </div>
        </div>
    </div>
    </>
  )
}

export default RoomRelatePost