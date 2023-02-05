import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { TabTitle } from '../../title';
import { url } from '../../url';
import HashLoader from "react-spinners/HashLoader";

const ConfirmAccount = () => {
  TabTitle('Đổi mật khẩu');
  const [loading, setLoading] = useState(false);
  const {id_Account} = useParams();
  const [editPassword, setEditPassword] = useState({
    password:"",
    password_new:"",
    password_neww:"",
    });
 const [alert, setAlert] = useState({
     err_list: {},
 });
 const {password, password_new, password_neww } = editPassword;
 const handleChange = (e) => {
    setEditPassword({ ...editPassword, [e.target.name]: e.target.value });
 };
 const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await axios.put(`${url}/user/updatepassword/${id_Account}`, editPassword);
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
useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  },[]);

  return (
    <>
    {loading ? 
        <HashLoader className='css_loading'
        color={'#0d3380'}
        loading={loading}
        size={100}
        style={{display: 'inherit', position: 'relative', height: '100px', transform: 'rotate(165deg)'}}
        />
        :
        <>
            <div className="content content_title">
                <div className="add-post">
                    <h1 className="content_h1_admin">Đổi mật khẩu</h1>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Mật khẩu cũ</Form.Label>
                            <Form.Control type="password" name="password" value={password} onChange={(e) => handleChange(e)} className=''/>
                            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.password[0]}</div>}
                        </Form.Group>
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
    }
    </>
  )
}

export default ConfirmAccount