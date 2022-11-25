import React from 'react'
import { Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function ListAccount() {
    var user = JSON.parse(localStorage.getItem("user"));
    const id_user =user[0].id;

  const [listAccount, setListAccount] = useState([]);
 
  useEffect(() => {
    getData();
  },[]);

  // danh sach Account
  const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/user/show/${id_user}`);
   console.log(res);
      setListAccount(res.data.data);
  };


  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thông tin cá nhân</h1>
            <Table>
            <tbody>
                <tr>
                    <td>Tên đăng nhập</td>
                    <td>{listAccount.full_name}</td>
                </tr> 
                <tr>
                    <td>Mật khẩu</td>
                    <td>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Control type="password" className="" name="" placeholder="********" disabled value={listAccount.password} />
                        </Form.Group>
                    </td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{listAccount.email}</td>
                </tr>  
                <tr>
                    <td>Số điện thoại</td>
                    <td>{listAccount.phone}</td>
                </tr> 
                <tr>
                    <td>Địa chỉ</td>
                    <td>{listAccount.address}</td>
                </tr>  
                <tr>
                    <td>
                        <Link to={`update_acc/${listAccount.id_user}`}>
                            <Button variant="outline-primary" name='' className="btn-edit">Cập nhật thông tin</Button>
                        </Link>
                        <Link to={`confirm_acc/${listAccount.id_user}`}>
                            <Button variant="outline-warning" name='' className="btn-edit">Đổi mật khẩu</Button>
                        </Link>
                    </td>
                </tr>
            </tbody>
            </Table>
        </div>
    </div>
  )
}

export default ListAccount