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
    const res = await axios.get(`http://127.0.0.1:8000/api/post/user/${id_post}`);
    console.log(res);
    // setListpost(res.data.data);
    };

  return (
    <div className="list-post">
    <h1><b>Tin đã đăng</b></h1>
    <div className='row'>
        <hr></hr>
        <div className='col-md-8'>
        {listpost ? listpost.map((post, index) => {
            <div className='row'>
                <div className='col-md-2'>
                    <img src='https://th.bing.com/th/id/R.0e0b8048a60c7df1b006dc922ccb40c2?rik=lef4Lt2Og7ea2Q&pid=ImgRaw&r=0' alt='hình ảnh' style={{width:'100px', height:'100px'}} />                        
                </div>
                <div className='col-md-6'>
                    <p>{post.post_name}</p>
                    <p style={{color:"red"}}><b>{post.room_price}</b></p>
                    <div style={{marginTop:"25px"}}>
                        <img src='https://th.bing.com/th/id/R.0e0b8048a60c7df1b006dc922ccb40c2?rik=lef4Lt2Og7ea2Q&pid=ImgRaw&r=0' alt='hình ảnh' style={{width:'30px', height:'30px', borderRadius:'50%'}}/> 
                        <p>{post.fuulname}</p>
                        <p>{post.created_at}</p>
                        <p>{post.address}</p>
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

export default Posted