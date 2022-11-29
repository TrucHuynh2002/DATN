import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function InfoAccount() {
    var user = JSON.parse(localStorage.getItem("user"));
    const [InfoAccount, setInfoAccount] = useState([]);
    useEffect(() => {
        getData();
    },[]);

    // danh sach Account
    const getData = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/user/show/${user[0].id}`);
        setInfoAccount(res.data.data);
    };
    return (
        
            <div className="Info-post">
                <h1 style={{  padding: "5px", color: "#0d3380" }}>Thông tin cá nhân</h1>
                <hr></hr>
                
                <tbody>
                    <tr>
                        <td>Tên đăng nhập:&nbsp;{InfoAccount.full_name}</td>
                    </tr> 
                    <tr>
                        <td>Email:&nbsp; {InfoAccount.email}</td>
                    </tr>  
                    <tr>
                        <td>Số điện thoại: &nbsp;{InfoAccount.phone}</td>
                    </tr> 
                    <tr>
                        <td>Địa chỉ:&nbsp;{InfoAccount.address}</td>
                    </tr>  
                    <tr>
                        <td>
                            <Link to={`update_acc/${InfoAccount.id_user}`}>
                                <Button variant="outline-primary" name='' className="btn-edit">Cập nhật thông tin</Button>
                            </Link>
                            <Link to={`confirm_acc/${InfoAccount.id_user}`}>
                                <Button variant="outline-warning" name='' className="btn-edit">Đổi mật khẩu</Button>
                            </Link>
                            <Link to="avata">
                                <Button variant="outline-primary" name='' className="btn-edit">Avata</Button>
                            </Link>
                        </td>
                    </tr>
                </tbody>              
            </div>     
  )
}
export default InfoAccount