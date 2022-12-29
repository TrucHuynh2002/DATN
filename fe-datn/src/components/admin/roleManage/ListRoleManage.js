import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from '../../user/Pagination';
import { url } from '../../url';
import { TabTitle } from '../../title';

function ListRoleManage() {
  TabTitle('Danh sách quản lý chủ trọ');
  const [listRoleManage, setListRoleManage] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(10);

  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listRoleManage.slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    getData();
  },[]);

  // danh sach contact
  const getData = async (keywordss = '') => {
    const res = await axios.get(`${url}/contact/show?keyword=${keywordss}`);
    setListRoleManage(res.data.data);
  };
   // search
   const handleChangeKeyWord = (e) => {
    getData(e.target.value)
  }

  return (
    <div className="content">
    <div className="add-post">
      <h1 className="content_h1_admin">Danh sách quản lý chủ trọ</h1>
      <div className ="header__nav_admin">
        <input className="form-control search_blog" placeholder="Nhập tên bạn muốn tìm kiếm " type="text" name="keywords" onChange={(e) => handleChangeKeyWord(e)} 
        />
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody className='list'>
          {currentPosts.map((contact, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{contact.full_name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.content}</td>
                <td>
                  {contact.status === 1 && <Button variant="outline-success" disable="true" name='' className="">Đã duyệt</Button> }
                  {contact.status === 0 && <Button variant="outline-danger" name='' className="">Duyệt</Button> }
                </td>
              </tr>
            );
          })}
        </tbody>
    </Table>
    {/* phan trang */}
    <Pagination totalPost={listRoleManage.length}
      postsPerPage={postsPerPage} 
      setCurrentPage={setCurrentPage}
      currentPage={currentPage} />
    </div>             
    </div>
  )
}

export default ListRoleManage