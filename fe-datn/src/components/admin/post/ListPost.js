import React from 'react'
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'

function ListPost() {

    const [listPost, setListPost] = useState([]);
  useEffect(() => {
    getData();
  },[]) 
  const getData = () => {
    axios
    .get('http://127.0.0.1:8000/api/post/show')
      .then((res) => {
        // setListPost(res.data);
        setListPost(res.data.data)
      })
  }

  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách bài viết</h1>
            <Link to="../add_post" className="btn btn-primary form-add">Thêm bài viết</Link>
            <Table bordered>
            <thead>
            <tr>
                <th>#</th>
                <th>Tên bài viết</th>
                <th>Mô tả</th>
                <th></th>
            </tr>
            </thead>
            <tbody>

                {listPost.map(post => {
                    return (
                    <tr>
                        <td>{post.id_post}</td>
                        <td>{post.post_name}</td>
                        <td>{post.description_sort}</td>
                        <td>
                            <Link to="../edit_post">
                                <Button variant="outline-primary" name='' className="bx bxs-edit btn-edit"></Button>
                            </Link>
                            <Link to="#">
                                <Button variant="outline-danger" name='' className="bx bxs-trash"></Button>
                            </Link>
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