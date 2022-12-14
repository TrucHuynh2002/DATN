import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../../url';
import { TabTitle } from '../../title';
import HashLoader from "react-spinners/HashLoader";

function BlogDetail() {
  TabTitle('Chi tiết blog');
  const [loading, setLoading] = useState(false);
    const {id_blog} = useParams();
    const [listBlog, setListBlog] = useState([]);
    const [InfoAccount, setInfoAccount] = useState([]);
    useEffect(() => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 3000)
      getData()
    },[]);
    const getData = async () => {
        const res = await axios.get(`${url}/blog/show/${id_blog}`);
        setListBlog(res.data.data);
        const update= await axios.put(`${url}/blog/updateView/${id_blog}`);
        const Info = await axios.get(`${url}/user/show`);
        setInfoAccount(Info.data.data);
    };
    
  return (
    <>
      {loading ? 
          <HashLoader className='css_loading'
          color={'#0d3380'}
          loading={loading}
          size={100}
          />
          :
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
              <div className="description" dangerouslySetInnerHTML={{__html: listBlog.description}} />
            </div>
          </>
      }
    </>
  )
}

export default BlogDetail