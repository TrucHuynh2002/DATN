import React from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListComment() {
  return (
    <div className="content">
    <div className="add-post">
      <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách bình luận</h1>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên người dùng</th>
            <th>Nội dung</th>
            <th>Ngày bình luận</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Trúc Huỳnh</td>
            <td>Hello</td>
            <td>20-11-2022</td>
            <td>
              <Link to="#">
                <Button variant="outline-success" name='' className="btn-edit">Phê duyệt</Button>
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>             
    </div>
  )
}

export default ListComment