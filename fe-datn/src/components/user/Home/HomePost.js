import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Figure from 'react-bootstrap/Figure';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { url } from '../../url';

function HomePost() {

  const [listPost, setListPost] = useState([]);
  // phan trang post
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] =useState(9);
  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);

useEffect(() => {
    getData()
  },[]);
  // danh sách post
  // cho biến line 23 bằng rỗng xong truyền vào line 19 
  const getData = async () => {
    const res = await axios.get(`${url}/post/show`);
    setListPost(res.data.data);
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
                      <div className="room_img" >
                          <Figure style={{width:"100%",height:"260px"}}><img src={post.link_img} alt={post.name_img} /></Figure>
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