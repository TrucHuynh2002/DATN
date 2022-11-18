import React from 'react'
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'

function ListFurniture() {

  const [listFurniture, setListFurniture] = useState([]);
  useEffect(() => {
    getData();
  },[]) 
  const getData = () => {
    axios
    .get('http://127.0.0.1:8000/api/furniture/show')
      .then((res) => {
        // setListFurniture(res.data);
        setListFurniture(res.data.data)
      })
  }

  return (
    <div className="content">
    <div className="add-post">
      <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách nội thất</h1>
      <Link to="../add_furniture" className="btn btn-primary form-add">Thêm nội thất</Link>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên nội thất</th>
            <th>Icons</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {listFurniture.map(furnture => {
            return (
              <tr>
                <td>{furnture.id_furnture}</td>
                <td>{furnture.name}</td>
                <td>{furnture.icon}</td>
                <td>
                    <Link to="../edit_furniture">
                      <Button variant="outline-primary" name='' className="bx bxs-edit btn-edit"></Button>
                    </Link>
                    <Link to="#">
                      <Button variant="outline-danger" name='' className="bx bxs-trash"></Button>
                    </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
    </Table>
    </div>             
    </div>
  )
}

export default ListFurniture