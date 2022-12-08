import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function UpdateAccount() {
    const {id_Account} = useParams();
    const [editAccount, setEditAccount] = useState({
       full_name:"",
       phone: "",
       address:""
    });

    const [alert, setAlert] = useState({
        err_list: {},
    });

    const {full_name,phone,address } = editAccount;

    const handleChange = (e) => {
        setEditAccount({ ...editAccount, [e.target.name]: e.target.value });
    };
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.put(`http://127.0.0.1:8000/api/user/update/${id_Account}`, editAccount);
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
        loadCate();
    }, []);

    const loadCate = async () => {
        const result = await axios.get(`http://127.0.0.1:8000/api/user/showAcount/${id_Account}`);
        setEditAccount(result.data.data);
    };
  return (
    <div className="content">
        <div className="add-post">
            <h1 className="content_h1_admin">Cập nhật thông tin</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" name="full_name" value={full_name} className='' onChange={(e) => handleChange(e)} />
                    {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.full_name[0]}</div>}
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={email} className='' onChange={(e) => handleChange(e)} />
                    {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.email[0]}</div>}
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control type="text" name="phone" value={phone} className='' onChange={(e) => handleChange(e)} />
                    {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.phone[0]}</div>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control type="text" name="address" value={address} className='' onChange={(e) => handleChange(e)} />
                    {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.address[0]}</div>}
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="sm" name='' type="submit">
                      Cập nhật thông tin
                    </Button>
                </div>
                {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
            </Form>
        </div>
    </div>
  );
}

export default UpdateAccount