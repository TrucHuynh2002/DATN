import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../Pagination';

function Posted() {
    var user = JSON.parse(localStorage.getItem("user"));
    const {id_post} = useParams();
    const [listPost, setListPost] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ postsPerPage, setPostsPerPage ] =useState(3);

    const lastPageIndex = currentPage * postsPerPage;
    const firstPageIndex = lastPageIndex - postsPerPage;
    const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);

    useEffect(() => {
        getData();
    },[]);

    // danh sach Posted
    const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/post/showUser/${id_post}`);
    setListPost(res.data.data);
    };

  return (
    <div>
    <h1><b className="b_title">Tin đã đăng</b></h1>
    <hr></hr>
    <div className='row'>
        {!currentPosts ?
        <div className="text-center No_user____">
            <img className="img_________" src="https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A3nh-icon-bu%E1%BB%93n-mu%E1%BB%91n-kh%C3%B3c-1024x1024.jpg" alt="images" />
            <p>Chưa đăng bài nào </p>
        </div>
         : currentPosts.map((post, index) => {
            return (    
            <div className='row' key={index}>
                <div className='col-md-2 text-center'>
                    <img src='https://th.bing.com/th/id/R.0e0b8048a60c7df1b006dc922ccb40c2?rik=lef4Lt2Og7ea2Q&pid=ImgRaw&r=0'
                     alt='' className=" avt_img" />                        
                </div>
                <div className='col-md-10'>
                    <div className='account_content____'>
                        <h1 className="name_title">{post.post_name}</h1>
                        <h3 className="content___">{post.description_sort}</h3>
                            <img src='https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-1/298208490_3105609269749725_6224150366325883573_n.jpg?stp=dst-jpg_p240x240&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Av3PaLuHHAYAX_rdVrc&_nc_ht=scontent.fvca1-4.fna&oh=00_AfD6d0g4yoyayKUl1yqmjJIw6in2lIQpqpKNlWOzpZmWxQ&oe=6389BCD6' alt='' className="avtuser" /> 
                        <span> {post.full_name} | </span>
                        <span> {post.address}  | </span>
                        <span> {post.created_at}  | </span>
                    </div>
                    {user ? 
                        user[0].id = post.id_user  ?
                            <div className='button-fdp row'>
                                <Link to={`../editpost/${post.id_post}`} className='button-fix'>Sửa</Link>
                                <Link className='button-del'>Xóa</Link>
                            </div>
                            : <div></div> 
                        : <div></div> }
                    <hr></hr>                
                </div>
            </div>
           )})
    }
        {/* phan trang */}
        <Pagination totalPost={listPost.length} 
        postsPerPage={postsPerPage} 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage} />
        </div>
    </div>
  )
}

export default Posted