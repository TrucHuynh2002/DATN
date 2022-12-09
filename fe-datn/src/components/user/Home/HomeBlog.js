import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Figure from 'react-bootstrap/Figure';
import Slide3 from '../../../images/sl03.png';
import PaginationBlog from '../PaginationBlog';

function HomeBlog() {

    const [listBlog, setListBlog] = useState([]);
    // phan trang blog
    const [ currentPageBlog, setCurrentPageBlog ] = useState(1);
    const [ blogPerPage, setBlogPerPage ] =useState(9);
    const lastPageIndexBlog = currentPageBlog * blogPerPage;
    const firstPageIndexBlog = lastPageIndexBlog - blogPerPage;
    const currentBlog = listBlog.slice(firstPageIndexBlog, lastPageIndexBlog);
  
    useEffect(() => {
      getDataBlog()  
    },[]);
  
    // danh sach Blog
    const getDataBlog = async () => {
     const res = await axios.get('http://127.0.0.1:8000/api/blog/show');
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
                <div className="col-4" key={index}>
                  <div className="blog_box">
                    <div className="blog_img">
                      <Figure>
                        <img src={Slide3} alt="#" />
                      </Figure>
                      {/* thả tym */}
                      <div className="heart">
                        {/* <HeartRoom /> */}
                      </div>
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