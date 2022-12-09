import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import Figure from 'react-bootstrap/Figure';

function HomePost() {

const [listPost, setListPost] = useState([]);
const [listImg, setListImg] = useState([]);
// phan trang post
const [ currentPage, setCurrentPage ] = useState(1);
const [ postsPerPage, setPostsPerPage ] =useState(9);
const lastPageIndex = currentPage * postsPerPage;
const firstPageIndex = lastPageIndex - postsPerPage;
const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);

useEffect(() => {
    getData()
    getImg()
  },[]);
// danh sách post
const getData = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/post/show');
    setListPost(res.data.data);
   };
   //danh sach img
  const getImg = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/imgPost/show`);
    setListImg(res.data.data);  
};

  return (
    <>
    <div className="our_room" id="room">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="titlepage">
                <h2>Phòng mới nhất</h2>
                <p>Đây là những phòng trọ mới nhất vừa được cập nhật</p>
              </div>
            </div>
          </div>
          <div className="row">
            {currentPosts.map((post, index) => {
              return (     
                <div className="col-md-4 col-sm-12" key={index}>
                    <div id="serv_hover" className="room">
                    <div className="room_img">
                            {listImg.map((a, index) => {
                              
                                return a.id_post == post.id_post && (
                                    <Figure><img src={a.link_img_user} alt="#" /></Figure>                                
            )
            // break;
            })}
                            </div>
                        <div className="bed_room">
                            <h3><Link to={`../roomdetail/${post.id_post}`}>{post.post_name}</Link></h3>
                            <span className='currency'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(post.room_price)} /Tháng</span>
                            <p className='mota'>{post.description_sort}</p>
                        </div>
                    </div>
                </div>
              );
            })}          
          </div>        
        </div>
        {/* phan trang */}
        <Pagination totalPost={listPost.length} 
            postsPerPage={postsPerPage} 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage} />
      </div>
    </>
  )
}

export default HomePost