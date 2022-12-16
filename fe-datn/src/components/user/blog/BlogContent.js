import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slide3 from '../../../images/sl03.png';
import Pagination from '../Pagination';

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
   const res = await axios.get('http://127.0.0.1:8000/api/blog/show');
      setListBlog(res.data.data);
  };

  return (
    <div className="blog">
        <div className="container blog_content">
          <div className="row">
            {currentPosts.map((blog, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <div className="blog_box">
                    <div className="blog_img">
                      <figure>
                        <img src={Slide3} alt="#" />
                      </figure>
                      {/* thả tym */}
                      <div className="heart">
                        {/* <HeartRoom /> */}
                      </div>
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
