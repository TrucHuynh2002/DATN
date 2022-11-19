import React from 'react'
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'

function ListFurniture() {

  const [listFurniture, setListFurniture] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/furniture/show')
        // setListFurniture(res.data);
        setListFurniture(res.data)
  };

  // const deleteFurniture = async (id_furniture) => {
  //   await axios.delete(`http://127.0.0.1:8000/api/category/delete/${id_furniture}`);
  //   getData();
  // };

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

          {listFurniture.map((furnture, index) => {
            return (
              <tr key={index}>
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