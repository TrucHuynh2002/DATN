import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios'

function ListContact() {

  const id_contact = useParams();
  const [listContact, setListContact] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  // danh sach contact
  const getData = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/contact/show');
      // console.log(res.data);
      setListContact(res.data.data);
  };

  // const statusContact

  return (
    <div className="content">
    <div className="add-post">
      <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách liên hệ</h1>
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
          </tr>
        </thead>
        <tbody className='list'>
          {listContact.map((contact, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{contact.full_name}</td>
                <td>{contact.subject}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.content}</td>
                <td>
                  <Button variant="outline-success" name='' className="btn-edit">Đã liên hệ</Button>
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

export default ListContact