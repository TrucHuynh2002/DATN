import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Pagination from '../../user/Pagination';
import { url } from '../../url';
import { TabTitle } from '../../title';
import HashLoader from "react-spinners/HashLoader";

function ListRoleManage() {
  TabTitle('Danh sách quản lý tài khoản');
  const [loading, setLoading] = useState(false);
  const id_user = useParams();
  const [listUser, setListUser] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(10);
  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listUser.slice(firstPageIndex, lastPageIndex);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
    getData()
  },[]);
  // danh sach user
  const getData = async (keywordss = '',role='',status = '') => {
    const res = await axios.get(`${url}/user/owner-post?keyword=${keywordss}&&role=${role}&&status=${status}`);
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

  const handleAcceptPostRoom = async (e,id_user) => {
    const res = await axios.get(`${url}/user/handle-post-room/${id_user}`);
    if(res.data.status){
        getData();
    }
  }
  const handleCancelPostRoom = async (e,id_user) => {
    const res = await axios.get(`${url}/user/cancel-post-room/${id_user}`);
    if(res.data.status){
        getData();
    }
  }
  const [status,setStatus] = useState('');
  const handleChangeSetRole = (e) => {   
    setStatus(e.target.value,'');
      getData('',e.target.value)
  }
  const handleChangeStatusRole = (e) => {    
      getData('',status,e.target.value)   
  }

  return (
    <>
      {loading ? 
        <HashLoader className='css_loading_admin'
        color={'#0d3380'}
        loading={loading}
        size={100}
        />
        :
        <>
          <div className="content">
          <div className="add-post">
            <h1 className="content_h1_admin">Danh sách quản lý tài khoản</h1>
            <div className='nav_role'>
              <input className="form-control search_blog" placeholder="Nhập tên bạn muốn tìm kiếm " type="text" name="keywords" onChange={(e) => handleChangeKeyWord(e)} 
              />
            </div>
            <div className ="header__nav_admin">
              <select className="form-control search_blog" name="setRole" onChange={e => handleChangeSetRole(e)}>
                <option>Tất cả</option>
                <option value={1}>Người dùng</option>
                <option value={2}>Chủ trọ</option>
              </select>
              <select className="form-control search_blog" name="setStatus" onChange={e => handleChangeStatusRole(e)}>
                <option>Trạng thái</option>
                <option value={1}>Chưa duyệt</option>
                <option value={2}>Đã duyệt</option>
              </select>
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
              <tbody>
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
                                {contact.status == 1 && contact.role == 0 && <button  name='' className="btn btn-danger" onClick={e => handleCancelPostRoom(e,contact.id_user)}>Không phê duyệt</button> }
                                </div>
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
        </>
      }
    </>
  )
}

export default ListRoleManage