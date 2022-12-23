import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Figure from 'react-bootstrap/Figure';
import { Link } from 'react-router-dom';
import PaginationBlog from '../PaginationBlog';
import { url } from '../../url';

function HomeBlog() {
    const [listBlog, setListBlog] = useState([]);
    // phan trang blog
    const [ currentPageBlog, setCurrentPageBlog ] = useState(1);
    const [ blogPerPage, setBlogPerPage ] =useState(3);
    const lastPageIndexBlog = currentPageBlog * blogPerPage;
    const firstPageIndexBlog = lastPageIndexBlog - blogPerPage;
    const currentBlog = listBlog.slice(firstPageIndexBlog, lastPageIndexBlog);
  
    useEffect(() => {
      getDataBlog()  
    },[]);
  
    // danh sach Blog
    const getDataBlog = async () => {
     const res = await axios.get(`${url}/blog/show`);
        setListBlog(res.data.data);
    };

  return (
    <>
        <div className="blog">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>Blog</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {currentBlog.map((blog, index) => {
              return (
                <div className="col-md-4 col-sm-12" key={index}>
                  <div className="blog_box">
                    <div className="blog_img">
                      <Figure style={{width:"100%",height:"260px"}}>
                        <img src={blog.img_blog} alt={blog.name_img_blog} style={{width:"100%", height:"100%"}} />
                      </Figure>
                    </div>
                    <div className="blog_room">
                      <h3><Link to={`../blogdetail/${blog.id_blog}`}>{blog.name_blog}</Link></h3>
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
        {/* phan trang */}
        <PaginationBlog totalBlog={listBlog.length}
            blogPerPage={blogPerPage} 
            setCurrentPageBlog={setCurrentPageBlog}
            currentPageBlog={currentPageBlog} />
      </div>
    </>
  )
}

export default HomeBlog