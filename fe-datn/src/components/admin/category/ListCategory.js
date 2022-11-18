import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import axios from 'axios'
=======


>>>>>>> 7af4fabe1b87bd270a725c7364fd4cba2e7cc55c

function ListCategory() {

  const [listCategory, setListCategory] = useState([]);
  useEffect(() => {
    getData();
    
  },[])

  const getData = () => {
    axios
    .get('http://127.0.0.1:8000/api/category/show')
      .then((res) => {
        // setListCategory(res.data);
        // console.log(res.data);
        setListCategory(res.data);
      })
  
  }
  return (
    <div className="content">
            <div className="add-post">
              <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách danh mục</h1>
              <Link to="add_category" className="btn btn-primary form-add">Thêm danh mục</Link>
              <Table bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tên danh mục</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className="list-cate">
                  
                {listCategory.map(cate => {
                    return        <tr>
                            <td>{cate.id_category}</td>
                            <td>{cate.name_category}</td>
                            <td>
                                <Link to="edit_category">
                                <Button variant="outline-primary" name='' className="bx bxs-edit btn-edit"></Button>
                                </Link>
                                <Link to="#">
                                <Button variant="outline-danger" name='' className="bx bxs-trash"></Button>
                                </Link>
                            </td>
                          </tr>       
                })}
                </tbody>
              </Table>
            </div>
    </div>
  )
}

export default ListCategory