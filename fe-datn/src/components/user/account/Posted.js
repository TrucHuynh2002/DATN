import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
function Posted() {
    const {id_post} = useParams();
    const [listpost, setListpost] = useState([]);

    useEffect(() => {
        getData();
    },[]);

    // danh sach Posted
    const getData = async () => {
        // console.log(id_post)
    const res = await axios.get(`http://127.0.0.1:8000/api/post/showUser/${id_post}`);
    // console.log(res);
    setListpost(res.data.data);
    };

  return (
    <div className="list-post">
    <h1><b>Tin đã đăng</b></h1>
    <div className='row'>
        <hr></hr>
        <div className=''>
        {listpost ? listpost.map((post, index) => {
               return (     
            <div className='row'>
                <div className='col-md-2'>
                    <img src='https://th.bing.com/th/id/R.0e0b8048a60c7df1b006dc922ccb40c2?rik=lef4Lt2Og7ea2Q&pid=ImgRaw&r=0'
                     alt='hình ảnh' className="avtpost" />                        
                </div>
                <div className='col-md-10' id='rightpost'>
                    
                    <h2>{post.post_name}</h2>
                    <p1>{post.room_price}</p1>
                    
                    
                    <div  className="row1">
                    <img src='https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-1/298208490_3105609269749725_6224150366325883573_n.jpg?stp=dst-jpg_p240x240&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Av3PaLuHHAYAX_rdVrc&_nc_ht=scontent.fvca1-4.fna&oh=00_AfD6d0g4yoyayKUl1yqmjJIw6in2lIQpqpKNlWOzpZmWxQ&oe=6389BCD6' 
                        alt='hình ảnh' className="avtuser" /> 
                        {post.fullname}{post.created_at}  &nbsp;{post.address} 
                        
                    </div>
                    <div className='button-fdp'>
                    
                    <button className='button-fix' >Sửa</button>
              <button className='button-del' >Xóa</button>
              
             </div>

                    
                    <hr></hr>
                </div>
            </div>
               )
        }) : <span>Không có dữ liệu</span>
    }
        </div>
    </div>
</div>
  )
}

export default Posted