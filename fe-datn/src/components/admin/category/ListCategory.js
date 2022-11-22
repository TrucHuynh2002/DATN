import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

function ListCategory() {

  const id_category = useParams();

  const [listCategory, setListCategory] = useState([]);
  useEffect(() => {
    getData();
  },[]);

  // danh sach category
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/category/show');
   console.log(res);
      setListCategory(res.data.data);
  };

  // xoa category
  const deleteCategory = async (id_category) => {
    await axios.delete(`http://127.0.0.1:8000/api/category/delete/${id_category}`);
    getData();
  };

  return (
    <div className="content">
            <div className="add-post">
              <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách danh mục</h1>
              <Link to="../add_category" className="btn btn-primary form-add">Thêm danh mục</Link>
              <Table bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tên danh mục</th>
                    <th></th>
                </tr>
                </thead>
             
                <tbody className="list-cate">                 
                {listCategory.map((cate, index) => {
                    return (     
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{cate.name_category}</td>
                        <td>
                            <Link to={`../edit_category/${cate.id_category}`} className="bx bxs-edit btn-edit btn btn-primary">
                              {/* <Button variant="outline-primary" name='' className="bx bxs-edit btn-edit"></Button> */}
                            </Link>
                            {/* <Link className=" btn btn-danger bx bxs-trash" onClick={() => 
                              deleteCategory(cate.id_category)}> */}
                              <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deleteCategory(cate.id_category)}></Button>
                            {/* </Link> */}
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

export default ListCategory