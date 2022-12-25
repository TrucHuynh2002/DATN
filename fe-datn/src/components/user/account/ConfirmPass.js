import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { url } from '../../url';

function ConfirmPass() {
    const {id_Account} = useParams();
    const [editPassword, setEditPassword] = useState({
    password_new:"",
    password_neww:"",
    });
 const [alert, setAlert] = useState({
     err_list: {},
 });
 const { password_new, password_neww } = editPassword;
 const handleChange = (e) => {
    setEditPassword({ ...editPassword, [e.target.name]: e.target.value });
 };
 const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await axios.put(`${url}/user/updatepasswordsocial/${id_Account}`, editPassword);
  if(res.data.status === true){
      setAlert({
          err_list: res.data
      });
  }
  else{           
      setAlert({
          err_list: res.data
      });
  }
};

  return (
    <>
        <div className="content">
            <div className="add-post">
                <h1 className="content_h1_admin">Đổi mật khẩu</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Nhập mật khẩu mới</Form.Label>
                        <Form.Control type="password" name="password_new" value={password_new} onChange={(e) => handleChange(e)} className=''/>
                    {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.password_new[0]}</div>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                    <Form.Control type="password" name="password_neww" value={password_neww} onChange={(e) => handleChange(e)} className=''/>
                    {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.password_neww[0]}</div>}
                </Form.Group>
                    <div className="d-grid gap-2">
                        {alert.err_list.status === true && <span className="notice success_____">Cập nhật thành công</span>}
                        <Button variant="primary" size="sm" name='' type="submit">
                        Cập nhật
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    </>
  )
}

export default ConfirmPass