import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Pagination from '../../user/Pagination';
import { url } from '../../url';
import { TabTitle } from '../../title';

function ListUser() {
  TabTitle('Danh sách người dùng - Nhà Tui.com');
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
  const getData = async (keywordss = '') => {
  const res = await axios.get(`${url}/user/show?keyword=${keywordss}`);
  setListUser(res.data.data);
  };

  // xoa user
  const deleteUser = async (id_user) => {
    await axios.delete(`${url}/user/delete/${id_user}`);
    getData();
  };
  // search
  const handleChangeKeyWord = (e) => {
    getData(e.target.value)
  }

  return (
    <div className="content">
    <div className="add-post">
      <h1 className="content_h1_admin">Danh sách người dùng</h1>
      <div className ="header__nav_admin">
        <input className="form-control search_blog" placeholder="Nhập tên bạn muốn tìm kiếm " type="text" name="keywords" onChange={(e) => handleChangeKeyWord(e)} 
        />
      </div>
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
                <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => 
                  deleteUser(user.id_user)}></Button>
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