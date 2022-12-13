import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PaginationBlog from '../PaginationBlog';
import axios from 'axios';

function Bloged() {
    var user = JSON.parse(localStorage.getItem("user"));
    const {id_user} = useParams();
    const [listBlog, setListBlog] = useState([]);
    const [ currentPageBlog, setCurrentPageBlog ] = useState(1);
    const [ blogPerPage, setBlogPerPage ] =useState(3);
    const [InfoAccount, setInfoAccount] = useState([]);
    const lastPageIndexBlog = currentPageBlog * blogPerPage;
    const firstPageIndexBlog = lastPageIndexBlog - blogPerPage;
    const currentBlog = listBlog.slice(firstPageIndexBlog, lastPageIndexBlog);

    useEffect(() => {
        getData();
        getDataUser();
    },[]);

    const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/blog/showUser/${id_user}`);
    setListBlog(res.data.data);
    };

    const deleteBlog = async (id_blog) => {
        await axios.delete(`http://127.0.0.1:8000/api/blog/delete/${id_blog}`);
        getData();
    };
    const getDataUser = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/user/showimg`);
        setInfoAccount(res.data.data);
    };
  return (
    <div >
        <h1><b className="b_title">Bài viết đã đăng</b></h1>
        <hr></hr>
        <div className='container'>
            {
                currentBlog.length > 0 
                ? 
                    currentBlog.map((a, index) => {    
                        return (     
                        <div className='row' key={index}>
                            <div className='col-md-12'>            
                                <div className='account_content____'>
                                    <h1 className="name_title">{a.name_blog}</h1>
                                    <p className="content___">{a.description_sort}</p>
                                    {InfoAccount.map((inf, index) => {
                                        return inf.id_user == a.id_user && (
                                            <img src={inf.link_img_user} alt='' className="avtuser" key={index} /> 
                                    );})}
                                    <span>{a.full_name}  |</span>
                                    <span> {a.created_at}  | </span>
                                </div>
                                {!user ? "" :
                                    user[0].id != a.id_user  ?  "" :
                                        <div className='button-fdp row'>
                                            <NavLink className='button-fix' to={`../editBlog/${a.id_blog}`} >Sửa</NavLink>
                                            <Button className='button-del' onClick={() => deleteBlog(a.id_blog)} >Xóa</Button>
                                        </div>
                                    }
                                <hr></hr>
                            </div>
                        </div>
                        )
                        })
                : 
                <div className="text-center No_user____">
                            <img className="img_________" src="https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A3nh-icon-bu%E1%BB%93n-mu%E1%BB%91n-kh%C3%B3c-1024x1024.jpg" alt="images" />
                            <p>Chưa đăng bài nào</p>
                        </div>
                    
            }
            {/* phan trang */}
            <PaginationBlog totalBlog={listBlog.length}
            blogPerPage={blogPerPage} 
            setCurrentPageBlog={setCurrentPageBlog}
            currentPageBlog={currentPageBlog} />
        </div>
    </div>
  )
}

export default Bloged