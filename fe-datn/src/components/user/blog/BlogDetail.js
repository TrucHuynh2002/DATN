import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

function BlogDetail() {

    const {id_blog} = useParams();
    const [listBlog, setListBlog] = useState([]);
    useEffect(() => {
        updateView();
        getData();
        
    },[]);
    const getData = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/blog/show/${id_blog}`);
        setListBlog(res.data.data);
    };
    const updateView = async () => {
        const update= await axios.put(`http://127.0.0.1:8000/api/blog/updateView/${id_blog}`);
        console.log(update)
    }
  return (
    <>
      <div className="container">
        <div className="name_blog">
          <h1>{listBlog.name_blog}</h1>
        </div>
        <div className="row" style={{ color: "#131313", fontWeight: 400 }}>
          <div className="col-md-3">
            <i className="fa fa-user" aria-hidden="true"></i>
            <span className="name-user" style={{ padding: "left 5px" }}>Trúc Huỳnh</span>
          </div>
          <div className="col-md-3">
            <i className="fa fa-calendar" aria-hidden="true"></i> 
            <span className="date-public" style={{ paddingLeft: 5 }}>27/11/2022</span>
          </div>
        </div>
        <div className="description_sort">
          <p>
            {listBlog.description_sort}
          </p>
        </div>
        <div className="description">
            <div>
            <div dangerouslySetInnerHTML={{__html: listBlog.description}} /> 
            </div>
            {/* <img className="img-fluid text-center" src="https://2.bp.blogspot.com/-93lIHqW_YKM/XC70vRtpZSI/AAAAAAAAPQE/AOyXI7G9GU0C_XEmCgEYFmAzCuUZhCeFACLcBGAs/s640/For%2Ba%2Bminute%2Bshe%2Bstood%2Blooking%2Bat%2Bthe%2Bhouse.jpg" alt="#" width={640} height={367} data-original-width={1000} data-original-height={574} /> */}
        </div>
      </div>
    </>
  )
}

export default BlogDetail