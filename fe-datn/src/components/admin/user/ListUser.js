import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../user/Pagination';

function ListUser() {

  const id_user = useParams();

  const [listUser, setListUser] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(10);
  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listUser.slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    getData();
  },[]);

  // danh sach user
  const getData = async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/user/show');
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
      <h1 className="content_h1_admin">Danh sách người dùng</h1>
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
          {currentPosts.map((user, index) => {
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
    {/* phan trang */}
    <Pagination totalPost={listUser.length} 
      postsPerPage={postsPerPage} 
      setCurrentPage={setCurrentPage}
      currentPage={currentPage} />
    </div>             
    </div>
  )
}

export default ListUser