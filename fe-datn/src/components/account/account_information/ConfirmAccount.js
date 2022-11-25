import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
function ConfirmAccount() {
  const {id_Account} = useParams();
  // console.log(id_Account)
  const [editPassword, setEditPassword] = useState({
    password:"",
    password_new:""
 });

 const [alert, setAlert] = useState({
     err_list: {},
 });

 const {password, password_new } = editPassword;
 const handleChange = (e) => {
     setEditPassword({ ...editPassword, [e.target.name]: e.target.value });
     
     // setEditAccount(e.target.value);
 };
 const handleSumbit = async (e) => {
  e.preventDefault();
  const res = await axios.put(`http://127.0.0.1:8000/api/user/updatepassword/${id_Account}`, editPassword);
  if(res.data.status === true){
      setAlert({
          err_list: res.data
      });
      console.log(alert.err_list)
  }
  else{           
      setAlert({
          err_list: res.data
      });
  }
  // navigate("../list_Account");
};
  return (
    <div className="content">
    <div className="add-post">
        <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Đổi mật khẩu</h1>
        <Form onSubmit={(e) => handleSumbit(e)}>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Mật khẩu củ</Form.Label>
                <Form.Control type="password" name="password" value={password} onChange={(e) => handleChange(e)} className=''/>
                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.password[0]}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Nhập mật khẩu mới</Form.Label>
                <Form.Control type="password" name="password_new" value={password_new} onChange={(e) => handleChange(e)} className=''/>
                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.password_new[0]}</span>}

            </Form.Group>
            <div className="d-grid gap-2">
                {alert.err_list.status === true && <span className="noti">Cập nhật thành công</span>}
                <Button variant="primary" size="sm" name='' type="submit">
                  Cập nhật
                </Button>
            </div>
            
        </Form>
    </div>
</div>
  )
}

export default ConfirmAccount