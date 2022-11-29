import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios'
function Bloged() {
    var user = JSON.parse(localStorage.getItem("user"));

    const {id_post} = useParams();
    const [listblog, setlistblog] = useState([]);
    useEffect(() => {
        getData();
    },[]);

    // danh sach blogdetail
    const getData = async () => {
        // console.log(id_post)
    const res = await axios.get(`http://127.0.0.1:8000/api/blog/showUser/${id_post}`);
    // console.log(res);
    setlistblog(res.data.data);
    };
  return (
    <div >
        <h1><b className="b_title">Bài viết đã đăng</b></h1>
        <hr></hr>
        <div className='row'>
            <>
            {!listblog ? 
            <div className="text-center No_user____">
                <img className="img_________" src="https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A3nh-icon-bu%E1%BB%93n-mu%E1%BB%91n-kh%C3%B3c-1024x1024.jpg" />
                <p>Chưa đăng bài nào </p>
            </div>
                : listblog.map((a, index) => {    
                    return (     
                    <div className='row'>
                        <div className='col-md-2 text-center' >
                            <img src='https://static2.yan.vn/YanNews/2167221/202208/doi-227a6767.jpg' alt=''
                            className="avt_img"/>                        
                        </div>
                        <div className='col-md-10'>            
                            <div className='account_content____'>
                                <h1 className="name_title">{a.name_blog}</h1>
                                <p className="content___">{a.description_sort}</p>
                                <img src='https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-1/298208490_3105609269749725_6224150366325883573_n.jpg?stp=dst-jpg_p240x240&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Av3PaLuHHAYAX_rdVrc&_nc_ht=scontent.fvca1-4.fna&oh=00_AfD6d0g4yoyayKUl1yqmjJIw6in2lIQpqpKNlWOzpZmWxQ&oe=6389BCD6' alt='' className="avtuser" />
                                <span>{a.full_name}  |</span>
                                <span> {a.created_at}  | </span>
                            </div>
                            {user ? 
                                user[0].id = a.id_user  ?
                                    <div className='button-fdp row'>
                                        <Link className='button-fix' >Sửa</Link>
                                        <Link className='button-del' >Xóa</Link>
                                    </div>
                                : <div></div> 
                            : <div></div> }
                            <hr></hr>
                        </div>
                    </div>
                    )
                    }) 
                }
            </>
        </div>
    </div>
  )
}

export default Bloged