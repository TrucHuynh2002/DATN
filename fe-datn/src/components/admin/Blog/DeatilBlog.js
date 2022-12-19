import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment'

function DetailBlog() {
    const {id_blog} = useParams();
    const [listBlog, setListBlog] = useState([]);
    const [InfoAccount, setInfoAccount] = useState([]);
    useEffect(() => {
      getDataUser();
        updateView();
        getData();        
    },[]);
    const getData = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/blog/show/${id_blog}`);
        setListBlog(res.data.data);
    };
    const updateView = async () => {
        const update= await axios.put(`http://127.0.0.1:8000/api/blog/updateView/${id_blog}`);
    }
    const getDataUser = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/user/show`);
      setInfoAccount(res.data.data);
  };
  return (
    <>
      <div className="container">
        <div className="name_blog">
          <h1>{listBlog.name_blog}</h1>
        </div>
        <div className="row" style={{ color: "#131313", fontWeight: 400 }}>
        {InfoAccount.map((a, index) => {
            return a.id_user === listBlog.id_user && (
                <div className="col-md-3" key={index}>
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <span className="name-user" style={{ padding: "left 5px" }}>{a.full_name}</span>
                </div>
          );})}
           <div className="col-md-3">
              <i className="fa fa-calendar" aria-hidden="true"></i> 
              <span className="date-public" style={{ paddingLeft: 5 }}>
              {moment(listBlog.created_at).local().startOf('day').fromNow()}</span>
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
             </div>
      </div>
    </>
  )
}

export default DetailBlog