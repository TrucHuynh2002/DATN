import React from 'react'
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

function ListPost() {

  const id_post = useParams();
  const [listPost, setListPost] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  // danh sach post
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/post/show');
   setListPost(res.data.data);
  };

  // xoa post
  const deletePost = async (id_post) => {
    await axios.delete(`http://127.0.0.1:8000/api/post/delete/${id_post}`);
    getData();
  };

  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách bài viết</h1>
            <Link to="../add_post" className="btn btn-primary form-add">Thêm bài viết</Link>
            <Table bordered>
            <thead>
            <tr>
                <th>#</th>
                <th></th>
                <th>Tên bài viết</th>
                <th>Trạng thái</th>
                <th></th>
            </tr>
            </thead>
            <tbody>

                {listPost.map((post, index) => {
                    return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td></td>
                        <td>{post.post_name}</td>
                        <td>
                          {post.status === 1 && <Button variant="outline-success" disable name='' className="">Đã duyệt</Button> }
                          {post.status === 0 && <Button variant="outline-danger" name='' className="">Phê duyệt</Button> }
                        </td>
                        <td>
                          <Link to={`../detail_post/${post.id_post}`} className="bx bx-detail btn-edit btn btn-primary"></Link>
                            <Link to={`../edit_post/${post.id_post}`} className="bx bxs-edit btn-edit btn btn-primary">
                            </Link>
                            <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deletePost(post.id_post)}></Button>
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

export default ListPost