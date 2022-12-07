import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import Pagination from '../../user/Pagination';

function ListBlog() {

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
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/blog/show');
      setListBlog(res.data.data);
  };

  // xoa Blog
  const deleteBlog = async (id_blog) => {
    await axios.delete(`http://127.0.0.1:8000/api/blog/delete/${id_blog}`);
    getData();
  };

  return (
    <div className="content">
            <div className="add-post">
              <h1 className="content_h1_admin">Danh sách Blog</h1>
              <Link to="../add_blog" className="btn btn-primary form-add">Thêm Blog</Link>
              <Table bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tên bLog</th>
                    <th>Từ khóa</th>
                    <th>Mô tả ngắn</th>
                    <th>Mô tả</th>
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
                        <td>{blog.description_sort}</td>
                        <td>{blog.description}</td>
                        <td>{blog.img_blog}</td>
                        <td>                            
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