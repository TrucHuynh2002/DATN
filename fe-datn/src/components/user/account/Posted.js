import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../Pagination';
import { url } from '../../url';

function Posted() {
    var user = JSON.parse(localStorage.getItem("user"));
    const {id_user} = useParams();
    const [listPost, setListPost] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ postsPerPage, setPostsPerPage ] =useState(3);
    const [InfoAccount, setInfoAccount] = useState([]);
    const lastPageIndex = currentPage * postsPerPage;
    const firstPageIndex = lastPageIndex - postsPerPage;
    const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);
    useEffect(() => {
        getData();
    },[]);
    // danh sach Posted
    const getData = async () => {
        const Post = await axios.get(`${url}/post/showUser/${id_user}`); 
            setListPost(Post.data.data);
        const Account = await axios.get(`${url}/user/showimg`);
            setInfoAccount(Account.data.data);
    };   
    const deletePost = async (id_post) => {
        await axios.delete(`${url}/post/delete/${id_post}`);
        getData();
      };

  return (
    <>
    <h1><b className="b_title">Tin đã đăng</b></h1>
    <hr></hr>
    <div className='container'>
        {currentPosts.length > 0 ?
            currentPosts.map((post, index) => {
            return (    
            <div className='row' key={index}>
                <div className='col-md-2 text-center'>
                    <img src={post.link_img}
                    alt={post.name_img} className="avt_img" />                        
                </div>
                <div className='col-md-10'>
                    <div className='account_content____'>
                        <h1 className="name_title">{post.post_name}</h1>
                        <h3 className="content___">{post.description_sort}</h3>
                        {InfoAccount.map((a, index) => {
                                return a.id_user == post.id_user && (
                                    <img src={a.link_img_user} alt='' className="avtuser" key={index} /> 
                        );})}
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