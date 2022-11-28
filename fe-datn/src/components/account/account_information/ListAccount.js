import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


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
        setListAccount(res.data.data);
    };
    return (
        
            <div className="list-post">
                <h1 style={{  padding: "5px", color: "#0d3380" }}>Thông tin cá nhân</h1>
                <hr></hr>
                
                <tbody>
                    <tr>
                        <td>Tên đăng nhập:&nbsp;{listAccount.full_name}</td>
                    </tr> 
                    <tr>
                        <td>Mật khẩu
                          
                                <Form.Control type="password" className="" name="" placeholder="********" disabled value={listAccount.password} />
                           
                        </td>
                    </tr>
                    <tr>
                        <td>Email:&nbsp; {listAccount.email}</td>
                    </tr>  
                    <tr>
                        <td>Số điện thoại: &nbsp;{listAccount.phone}</td>
                    </tr> 
                    <tr>
                        <td>Địa chỉ:&nbsp;{listAccount.address}</td>
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
                
            </div>
      
  )
}

export default ListAccount