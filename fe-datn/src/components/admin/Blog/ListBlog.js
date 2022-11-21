import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

function ListBlog() {

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

  // xoa Blog
  const deleteBlog = async (id_blog) => {
    await axios.delete(`http://127.0.0.1:8000/api/blog/delete/${id_blog}`);
    getData();
  };

  return (
    <div className="content">
            <div className="add-post">
              <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách Blog</h1>
              <Link to="../add_Blog" className="btn btn-primary form-add">Thêm Blog</Link>
              <Table bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tên BLog</th>
                    <th>Từ Khóa</th>
                    <th>Mô tả ngắn</th>
                    <th>Mô tả</th>
                </tr>
                </thead>
             
                <tbody className="list-cate">                 
                {listBlog.map(blog => {
                    return (     
                    <tr>
                        <td>{blog.id_blog}</td>
                        <td>{blog.name_blog}</td>
                        <td>{blog.meta_keywords}</td>
                        <td>{blog.description_sort}</td>
                        <td>{blog.description	}</td>
                        <td>
                            <Link to={`../edit_blog/${blog.id_blog}`} className="bx bxs-edit btn-edit btn btn-primary">
                              {/* <Button variant="outline-primary" name='' className="bx bxs-edit btn-edit"></Button> */}
                            </Link>
                            {/* <Link className=" btn btn-danger bx bxs-trash" onClick={() => 
                              deleteBlog(cate.id_Blog)}> */}
                              <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deleteBlog(blog.id_blog)}></Button>
                            {/* </Link> */}
                        </td>
                      </tr>  
                    );     
                })}
                </tbody>
              </Table>
            </div>
    </div>
  )
}

export default ListBlog