import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
function Bloged() {
    const {id_post} = useParams();
    const [listblog, setListblog] = useState([]);
    useEffect(() => {
        getData();
    },[]);

    // danh sach blogdetail
    const getData = async () => {
        console.log(id_post)
    const res = await axios.get(`http://127.0.0.1:8000/blog/show/user/${id_post}`);
    console.log(res);
    // setListblog(res.data.data);
    };
  return (
    <div className="list-blog">
    <h1><b>Bài viết đã đăng</b></h1>
    <div className='row'>
        <hr></hr>
        <div className='col-md-8'>
        {listblog ? listblog.map((post, index) => {
            <div className='row'>
                <div className='col-md-2'>
                    <img src='https://static2.yan.vn/YanNews/2167221/202208/doi-227a6767.jpg' alt='hình ảnh' style={{width:'100px', height:'100px'}} />                        
                </div>
                <div className='col-md-6'>
                    <p><b>{listblog.name_blog}</b></p>
                    <p>{listblog.description_sort}</p>
                    <div style={{marginTop:"25px"}}>
                        <img src='https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-1/298208490_3105609269749725_6224150366325883573_n.jpg?stp=dst-jpg_p240x240&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Av3PaLuHHAYAX_rdVrc&_nc_ht=scontent.fvca1-4.fna&oh=00_AfD6d0g4yoyayKUl1yqmjJIw6in2lIQpqpKNlWOzpZmWxQ&oe=6389BCD6' alt='hình ảnh' style={{width:'30px', height:'30px', borderRadius:'50%'}}/> Văn Vũ | 20 phút trước | Cần Thơ
                    </div>
                </div>
            </div>
              }) : <span>Không có dữ liẹu</span>
            }
        </div>
    </div>
</div>
  )
}

export default Bloged