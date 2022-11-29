import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Bloged() {
    const {id_post} = useParams();
    const [listBlog, setListBlog] = useState([]);
    
    useEffect(() => {
        getData();
    },[]);

    // danh sach blogdetail
    const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/blog/showUser/${id_post}`);
    setListBlog(res.data.data);
    };
  return (
    <div className="list-blog">
    <h1><b>Bài viết đã đăng</b></h1>
    <div className='row'>
        <hr></hr>
        <div>
        {listBlog ? listBlog.map((a, index) => {
             return (     
            <div className='row'>
                <div className='col-md-2'style={{marginTop:"10px"}} >
                    <img src='https://static2.yan.vn/YanNews/2167221/202208/doi-227a6767.jpg' alt='images' className="img-fluid"/>                        
                </div>
                <div className='col-md-10'>
                    <p><b>{a.name_blog}</b></p>
                    <p>{a.description_sort}</p>
                    <div style={{marginTop:"25px"}}>
                        <img src='https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-1/298208490_3105609269749725_6224150366325883573_n.jpg?stp=dst-jpg_p240x240&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Av3PaLuHHAYAX_rdVrc&_nc_ht=scontent.fvca1-4.fna&oh=00_AfD6d0g4yoyayKUl1yqmjJIw6in2lIQpqpKNlWOzpZmWxQ&oe=6389BCD6' alt='images' style={{width:'30px', height:'30px', borderRadius:'50%'}}/> Văn Vũ | 20 phút trước | Cần Thơ
                    </div>
                </div>
            </div>
             )
              }) 
              : <span>Không có dữ liệu</span>
            }
        </div>
    </div>
</div>
  )
}

export default Bloged