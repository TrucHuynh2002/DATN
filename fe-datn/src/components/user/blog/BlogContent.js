import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { url } from '../../url';

function BlogContent() {
  
  const [listBlog, setListBlog] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] =useState(9);

  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listBlog.slice(firstPageIndex, lastPageIndex);
  useEffect(() => {
    getData();
  },[]);

  // danh sach Blog
  const getData = async () => {
   const res = await axios.get(`${url}/blog/show`);
      setListBlog(res.data.data);
  };

  return (
    <div className="blog">
        <div className="container blog_content">
          <div className="row">
            {currentPosts.map((blog, index) => {
              return (
                <div className="col-lg-4 col-md-12 col-sm-12" key={index}>
                  <div className="blog_box">
                    <div className="blog_img col-lg-12 col-md-4 col-sm-3">
                      <figure>
                      <img src={blog.img_blog} alt={blog.name_img_blog} style={{width:"100%", height:"100%"}} />
                      </figure>
                    </div>
                    <div className="blog_room col-lg-12 col-md-8 col-sm-9">
                      <h3><Link to={`../blogdetail/${blog.id_blog}`}>{blog.name_blog}</Link></h3>
                      <p>{blog.description_sort}</p>
                    </div>
                  </div>
                </div>
              );
            })}            

          </div>
          {/* phan trang */}
          <Pagination totalPost={listBlog.length} 
            postsPerPage={postsPerPage} 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage} />
        </div>
      </div>
  )
}

export default BlogContent
