import React from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListCategory() {
  return (
    <div className="content">
            <div className="add-post">
              <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách danh mục</h1>
              <Link to="/add_category" className="btn btn-primary form-add">Thêm danh mục</Link>
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
                        <Button variant="outline-primary" name='' className="bx bxs-edit btn-edit"></Button>{' '}
                        </a>
                        <a href="123">
                        <Button variant="outline-danger" name='' className="bx bxs-trash"></Button>
                        </a>
                    </td>
                    </tr>
                </tbody>
              </Table>
            </div>
    </div>
  )
}

export default ListCategory