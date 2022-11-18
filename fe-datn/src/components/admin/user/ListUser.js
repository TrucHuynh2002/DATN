import React from 'react'
import { Table, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

function ListUser() {
  return (
    <div className="content">
    <div className="add-post">
      <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách người dùng</h1>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên người dùng</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Email</th>
            <th>?</th>
            <th>Hình ảnh</th>
            <th>Mật khẩu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            {/* <td>
              <Link to="123">
                <Button variant="outline-primary" name="" className="bx bxs-edit btn-edit"></Button>
              </Link>
              <Link to="#">
                <Button variant="outline-danger" name="" className="bx bxs-trash"></Button>
              </Link>
            </td> */}
          </tr>
        </tbody>
    </Table>
    </div>             
    </div>
  )
}

export default ListUser