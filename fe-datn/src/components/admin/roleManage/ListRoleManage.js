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
    const res = await axios.get(`${url}/user/owner-post?keyword=${keywordss}`);
    console.log(res.data)
    setListRoleManage(res.data.data);
  };
   // search
   const handleChangeKeyWord = (e) => {
    getData(e.target.value)
  }

  const handleAcceptPostRoom = async (e,id_user) => {
    const res = await axios.get(`${url}/user/handle-post-room/${id_user}`);
    console.log(res.data)
    if(res.data.status){
        getData();
    }
  }
  const handleCancelPostRoom = async (e,id_user) => {
    const res = await axios.get(`${url}/user/cancel-post-room/${id_user}`);
    console.log(res.data)
    if(res.data.status){
        getData();
    }
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
            <th>Chức vụ</th>
            <th>Trạng thái</th>
            {/* <th></th> */}
           
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
                  {
                   contact.status == 1 && contact.role == 0 && (
                      <div>Chủ trọ</div>
                   )
                  }
                 {  contact.role == 1 && contact.status == 0 && (
                      <div>Chủ trọ</div>
                  )}
                 {    contact.role == 0 && contact.status == '' && (
                      <div>Thành viên</div>
                  )}
                     
                    
                  
                  
                </td>
                <td>
                      {
                          contact.status == 1 && contact.role == 0 && (
                              <div className='text-warning'>Đang xử lý</div>
                          )
                          }
                        {  contact.status == 0 && contact.role == 1 && (
                              <div className='text-danger'>Đã phê duyệt</div>
                          )}
                </td>
                <td colSpan={3}>
                          <div style={{display:"flex",justifyContent:"center"}}>
                          {contact.status == 1 && contact.role == 0 &&  <button name='' className="btn btn-primary" onClick={e => handleAcceptPostRoom(e,contact.id_user)}>Phê duyệt chủ trọ</button> }
                          {contact.status == 1 && contact.role == 0 && <button  name='' className="btn btn-danger" onClick={e => handleCancelPostRoom(e,contact.id_user)}>Không Phê Duyệt</button> }
                          </div>
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