import React from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListFurniture() {
  return (
    <div className="content">
    <div className="add-post">
      <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách nội thất</h1>
      <Link to="add_furniture" className="btn btn-primary form-add">Thêm nội thất</Link>
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
                <Link to="edit_furniture">
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

export default ListFurniture