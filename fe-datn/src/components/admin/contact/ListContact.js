import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../user/Pagination';

function ListContact() {

  const id_contact = useParams();
  const [listContact, setListContact] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(5);

  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listContact.slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    getData();
  },[]);

  // danh sach contact
  const getData = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/contact/show');
      // console.log(res.data);
      setListContact(res.data.data);
  };

  //  // cập nhật trạng thái liên hệ
  //  const updatecontact = async (id_contact) => {
  //   await axios.put(`http://127.0.0.1:8000/api/contact/update/${id_contact}`);
  //   getData();
  // };

  // const statusContact

  return (
    <div className="content">
    <div className="add-post">
      <h1 className="content_h1_admin">Danh sách liên hệ</h1>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên người dùng</th>
            <th>Tiêu đề</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Nội dung</th>
            <th>Trạng thái</th>
            <th></th>

          </tr>
        </thead>
        <tbody className='list'>
          {currentPosts.map((contact, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{contact.full_name}</td>
                <td>{contact.subject}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.content}</td>
                <td>
                  {contact.status === 1 && <Button variant="outline-danger" disable="true" name='' className="">Đã liên hệ</Button> }
                  {contact.status === 0 && <Button variant="outline-success" name='' className="">Chưa liên hệ</Button> }
                </td>
                {contact.status === 0 &&  <Link to={`../edit_contact/${contact.id_contact}`} className="bx bxs-edit btn-edit btn btn-primary"></Link> }
                {contact.status === 1 &&  <Link to="" className="bx bxs-edit btn-edit btn btn-primary"></Link> }
               
                {/* <Button variant="outline-danger" name='' className="bx bx-edit" onClick={() => updatecontact(contact.id_contact)}></Button> */}
              
              
              </tr>
            );
          })}
        </tbody>
    </Table>
    {/* phan trang */}
    <Pagination totalPost={listContact.length} 
      postsPerPage={postsPerPage} 
      setCurrentPage={setCurrentPage}
      currentPage={currentPage} />
    </div>             
    </div>
  )
}

export default ListContact