import React from 'react'
import { Table } from 'react-bootstrap';

function Detail() {
  return (
    <div className="content">
    <div className="add-post">
      <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Chi tiết bài đăng</h1>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên bài đăng</th>
            <th>Mô tả</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>           
          </tr>
        </tbody>
    </Table>
    </div>             
    </div>
  )
}

export default Detail