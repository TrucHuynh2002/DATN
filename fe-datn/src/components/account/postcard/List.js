import React from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function list() {
  return (
    <div className="content">
    <div className="add-post">
      <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Bản tin đã đăng</h1>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Tên bài đăng</th>
            <th>Ngày đăng</th>
            <th>Mô tả</th>
            <th>Lượt xem</th>
            <th></th>        
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>hình ảnh</td>
            <td>ký túc xá</td>
            <td>20-11-2022</td>
            <td>Tiện nghi</td>
            <td>10</td>
            <td>
              <Link to="../postcard-detail">
                <Button variant="outline-success" name="" className="btn-edit">Chi tiết</Button>
              </Link>
              <Link to="../postcard-edit">
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

export default list