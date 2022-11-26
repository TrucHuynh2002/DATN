import React from 'react'
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import RoomNew from '../../images/phong1.png';

function RoomND() {
    // const id_post = useParams();
  const [listPost, setListPost] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  // danh sach post
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/post/show');
//    console.log(res);
   setListPost(res.data.data);
  };
  
  return (
  <>
    <div className="our_room">
        <div className="container">
            <div className="row">
            {listPost.map((post, index) => {
                  return (     
                    <div className="col-md-4 col-sm-6">
                        <div id="serv_hover" className="room">
                            <div className="room_img">
                                <figure><img src={RoomNew} alt="#" /></figure>
                            </div>
                            <div className="bed_room">
                                <h3><Link to={`../roomdetail/${index+1}`}>{post.post_name}</Link></h3>
                                <h4>Giá: {post.room_price}</h4>
                                <p>{post.description_sort}</p>
                            </div>
                        </div>
                    </div>
                  );
                })}
            </div>
        </div>
    </div>
    </>
  )
}

export default RoomND
