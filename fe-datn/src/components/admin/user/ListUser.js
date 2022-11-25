import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

function ListUser() {

  const id_user = useParams();

  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    getData();
  },[]);

  // danh sach user
  const getData = async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/user/show');
  console.log(res);
  setListUser(res.data.data);
  };

  // xoa user
  const deleteUser = async (id_user) => {
    await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id_user}`);
    getData();
  };

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
          </tr>
        </thead>
        <tbody>
          {listUser.map((user, index) => {
            return (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{user.full_name}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.email}</td>
              <td>
                {/* <Link to="123">
                  <Button variant="outline-primary" name="" className="bx bxs-edit btn-edit"></Button>
                </Link> */}
                {/* <Link to="#"> */}
                <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => 
                  deleteUser(user.id_user)}></Button>
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

export default ListUser