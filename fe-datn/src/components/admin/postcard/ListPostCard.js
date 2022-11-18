import React from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListPostCard() {
  return (
    <div className="content">
    <div className="add-post">
      <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách bài đăng</h1>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Bài đăng</th>
            <th>Duyệt bài đăng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>
              <Link to="#">
                <Button variant="outline-success" name="" className="btn-edit">Phê duyệt</Button>
              </Link>
            </td>
          </tr>
        </tbody>
    </Table>
    </div>             
    </div>
  )
}

export default ListPostCard