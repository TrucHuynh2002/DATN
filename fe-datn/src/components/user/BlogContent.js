import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Slide3 from '../../images/sl03.png';

function BlogContent() {

  const id_blog = useParams();
  const [listBlog, setListBlog] = useState([]);
  useEffect(() => {
    getData();
  },[]);

  // danh sach Blog
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/blog/show');
      setListBlog(res.data.data);
  };

  return (
    <div className="blog">
        <div className="container">
          <div className="row">
            {listBlog.map((blog, index) => {
              return (
                <div className="col-md-4">
                  <div className="blog_box">
                    <div className="blog_img">
                      <figure>
                        <img src={Slide3} alt="#" />
                      </figure>
                    </div>
                    <div className="blog_room">
                      <h3><Link to={`../blogdetail/${blog.id_blog}`}>{blog.name_blog}</Link></h3>
                      <span>Trúc Huỳnh</span>
                      <p>
                        {blog.description_sort}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}            

          </div>
        </div>
      </div>
  )
}

export default BlogContent
