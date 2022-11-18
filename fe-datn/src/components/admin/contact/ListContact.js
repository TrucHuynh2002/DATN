import React from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListContact() {
  return (
    <div className="content">
    <div className="add-post">
      <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách liên hệ</h1>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên người dùng</th>
            <th>Tiêu đề</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Nội dung</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Nhóm 1</td>
            <td>DATN</td>
            <td>nhom1@fpt.edu.vn</td>
            <td>0907673005</td>
            <td>Liên hệ hỗ trợ</td>
            <td>
              <Link to="#">
                <Button variant="outline-success" name='' className="btn-edit">Đã liên hệ</Button>
              </Link>
            </td>
          </tr>
        </tbody>
    </Table>
    </div>             
    </div>
  )
}

export default ListContact