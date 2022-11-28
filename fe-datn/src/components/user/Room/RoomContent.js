import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import RoomNew from '../../../images/phong1.png';
import Pagination from '../Pagination';

function RoomND() {

  // phân trang
  const [listPost, setListPost] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] =useState(9);

  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);


  // danh sach post
  // const id_post = useParams();  
  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/post/show');
   setListPost(res.data.data);
  };
  
  return (
  <>
    <div className="our_room">
        <div className="container">
            <div className="row">
            {currentPosts.map((post, index) => {
                  return (     
                    <div className="col-md-4 col-sm-6">
                        <div id="serv_hover" className="room">
                            <div className="room_img">
                                <figure><img src={RoomNew} alt="#" /></figure>
                            </div>
                            <div className="bed_room">
                                <h3><Link to={`../roomdetail/${post.id_post}`}>{post.post_name}</Link></h3>
                                <h4>Giá: {post.room_price}</h4>
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
