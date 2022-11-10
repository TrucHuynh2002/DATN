import React from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function List() {
  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách bài viết</h1>
            <Link to="/add" className="btn btn-primary form-add">Thêm bài viết</Link>
            <Table bordered>
            <thead>
            <tr>
                <th>#</th>
                <th>Tên bài viết</th>
                <th>Hình ảnh</th>
                <th>Mô tả</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td></td>
                <td>
                    <Link to="/edit">
                        <Button variant="outline-primary" name='' className="bx bxs-edit btn-edit"></Button>
                    </Link>
                    <Link to="#">
                        <Button variant="outline-danger" name='' className="bx bxs-trash"></Button>
                    </Link>
                </td>
                </tr>
            </tbody>
            </Table>
        </div>
    </div>
  )
}

export default List