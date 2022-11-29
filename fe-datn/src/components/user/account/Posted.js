import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Posted() {
    const {id_post} = useParams();
    const [listPost, setListPost] = useState([]);

    useEffect(() => {
        getData();
    },[]);

    // danh sach Posted
    const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/post/showUser/${id_post}`);
    setListPost(res.data.data);
    };

  return (
    <div className="list-post">
    <h1><b>Tin đã đăng</b></h1>
    <div className='row'>
        <hr></hr>
        <div className=''>
        {listPost ? listPost.map((post, index) => {
               return (     
            <div className='row'>
                <div className='col-md-2'>
                    <img src='https://th.bing.com/th/id/R.0e0b8048a60c7df1b006dc922ccb40c2?rik=lef4Lt2Og7ea2Q&pid=ImgRaw&r=0' alt='images' className="img-fluid" />                        
                </div>
                <div className='col-md-10'>
                    <p>{post.post_name}</p>
                    <p style={{color:"red"}}><b>{post.room_price}</b></p>
                    <div className="row">
                        <img src='https://th.bing.com/th/id/R.0e0b8048a60c7df1b006dc922ccb40c2?rik=lef4Lt2Og7ea2Q&pid=ImgRaw&r=0' alt='images' className="img-fluid"/> 
                        <p>{post.fullname}</p>
                        <p>{post.created_at}</p>
                        <p>{post.address}</p>
                    </div>
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