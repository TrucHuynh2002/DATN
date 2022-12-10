import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Pagination from '../Pagination';

function Posted() {
    var user = JSON.parse(localStorage.getItem("user"));
    const {id_user} = useParams();
    const [listPost, setListPost] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ postsPerPage, setPostsPerPage ] =useState(3);

    const lastPageIndex = currentPage * postsPerPage;
    const firstPageIndex = lastPageIndex - postsPerPage;
    const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);
    const [listImg, setListImg] = useState([]);

    useEffect(() => {
        getData();
        getImg();
    },[]);
    const getImg = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/imgPost/show`);
        setListImg(res.data.data);   
    };
    // danh sach Posted
    const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/post/showUser/${id_user}`); 
    setListPost(res.data.data);
    };
    
    const deletePost = async (id_post) => {
        await axios.delete(`http://127.0.0.1:8000/api/post/delete/${id_post}`);
        getData();
      };

  return (
    <>
    <h1><b className="b_title">Tin đã đăng</b></h1>
    <hr></hr>
    <div className='row'>
        {currentPosts.length > 0 ?
        currentPosts.map((post, index) => {
            return (    
            <div className='row' key={index}>
                {listImg.map((a, index) => {
                return a.id_post == post.id_post && (
                    <div className='col-md-2 text-center' key={index}>
                        <img src={a.link_img_user}
                        alt='' className=" avt_img" />                        
                    </div>
                )})}
                <div className='col-md-10'>
                    <div className='account_content____'>
                        <h1 className="name_title">{post.post_name}</h1>
                        <h3 className="content___">{post.description_sort}</h3>
                            <img src='https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-1/298208490_3105609269749725_6224150366325883573_n.jpg?stp=dst-jpg_p240x240&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Av3PaLuHHAYAX_rdVrc&_nc_ht=scontent.fvca1-4.fna&oh=00_AfD6d0g4yoyayKUl1yqmjJIw6in2lIQpqpKNlWOzpZmWxQ&oe=6389BCD6' alt='' className="avtuser" /> 
                        <span> {post.full_name} | </span>
                        <span> {post.address}  | </span>
                        <span> {post.created_at}  | </span>
                    </div>
                    {!user ? <div></div> :
                         user[0].id != post.id_user  ?  <div></div> :
                            <div className='button-fdp row'>
                                <Link to={`../editpost/${post.id_post}`} className='button-fix'>Sửa</Link>
                                <Button className='button-del' onClick={() => deletePost(post.id_post)}>Xóa</Button>
                            </div>
                           }
                    <hr></hr>                
                </div>
            </div>
           )})
           : <div className="text-center No_user____">
           <img className="img_________" src="https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A3nh-icon-bu%E1%BB%93n-mu%E1%BB%91n-kh%C3%B3c-1024x1024.jpg" alt="images" />
           <p>Chưa đăng bài nào </p>
       </div>
    }
        {/* phan trang */}
        <Pagination totalPost={listPost.length} 
        postsPerPage={postsPerPage} 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage} />
        </div>
    </>
  )
}

export default Posted