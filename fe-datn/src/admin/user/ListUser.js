import React from 'react'
import { Table, Button } from 'react-bootstrap';

function ListUser() {
  return (
    <div className="content">
    <div className="add-post">
      <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách người dùng</h1>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>1</th>
            <th>2</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>
              <a href="123">
                <Button variant="outline-primary" name="" className="bx bxs-edit btn-edit"></Button>{' '}
              </a>
              <a href="123">
                <Button variant="outline-danger" name="" className="bx bxs-trash"></Button>
              </a>
            </td>
          </tr>
        </tbody>
    </Table>
    </div>             
    </div>
  )
}

export default ListUser