import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../../user/Pagination';
import { url } from '../../url';
import { TabTitle } from '../../title';

function ListBlog() {
  TabTitle('Danh sách blog');
  const id_blog = useParams();
  const [listBlog, setListBlog] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] =useState(10);
  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listBlog.slice(firstPageIndex, lastPageIndex); 
  useEffect(() => {
    getData();
  },[]);
  // danh sach Blog
  const getData = async (keywordss = '') => {
   const res = await axios.get(`${url}/blog/show?keyword=${keywordss}`);
      setListBlog(res.data.data);
  };
  // xoa Blog
  const deleteBlog = async (id_blog) => {
    await axios.delete(`${url}/blog/delete/${id_blog}`);
    getData();
  };
  // search
    const handleChangeKeyWord = (e) => {
      getData(e.target.value)
    }

  return (
    <div className="content">
            <div className="add-post">
              <h1 className="content_h1_admin">Danh sách Blog</h1>
              {/* start search */}
              <div className ="header__nav_admin">
                <Link to="../add_blog" className="btn btn-primary form-add">Thêm Blog</Link>
                <input className="form-control search_blog" placeholder="Nhập tên bạn muốn tìm kiếm " type="text" name="keywords" onChange={(e) => handleChangeKeyWord(e)} />
                {/* end search */}
               
              </div>
              <Table bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tên blog</th>
                    <th>Từ khóa</th>
                    <th>Mô tả ngắn</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
             
                <tbody className="list-cate">                 
                {currentPosts.map((blog, index) => {
                    return (     
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{blog.name_blog}</td>
                        <td>{blog.meta_keywords}</td>
                        <td className='blog_descriptionSort'>{blog.description_sort}</td>                        
                        <td>
                          <div>
                            <img src={blog.img_blog} alt={blog.name_img_blog} />
                          </div>
                        </td>
                        <td>                
                            <Link to={`../detail_blog/${blog.id_blog}`} className="bx bx-detail btn-edit btn btn-primary"></Link>            
                            <Link to={`../edit_blog/${blog.id_blog}`} className="bx bxs-edit btn-edit btn btn-primary">
                            </Link>           
                            <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deleteBlog(blog.id_blog)}></Button>
                        </td>
                      </tr>  
                    );     
                })}
                </tbody>
              </Table>
              {/* phan trang */}
            <Pagination totalPost={listBlog.length} 
            postsPerPage={postsPerPage} 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage} />
            </div>
    </div>
  )
}

export default ListBlog