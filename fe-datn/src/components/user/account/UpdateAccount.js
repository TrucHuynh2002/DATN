import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function UpdateAccount() {
    const {id_Account} = useParams();
    const [editAccount, setEditAccount] = useState({
       full_name:"",
       email:"",
       phone: "",
       address:""
    });

    const [alert, setAlert] = useState({
        err_list: {},
    });

    const {full_name,email,phone,address } = editAccount;

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
            console.log(alert.err_list)
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
        const result = await axios.get(`http://127.0.0.1:8000/api/user/show/${id_Account}`);
        console.log(result);
        setEditAccount(result.data.data);
    };
  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Cập nhật thông tin</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" name="full_name" value={full_name} className='' onChange={(e) => handleChange(e)} />
                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.full_name[0]}</span>}
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="2">
                    <Form.Label>Hình</Form.Label>
                    <Form.Control type="file" name="" value="" className='' onChange={(e) => handleChange(e)} />
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={email} className='' onChange={(e) => handleChange(e)} />
                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.email[0]}</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control type="text" name="phone" value={phone} className='' onChange={(e) => handleChange(e)} />
                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.phone[0]}</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control type="text" name="address" value={address} className='' onChange={(e) => handleChange(e)} />
                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.address[0]}</span>}
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="sm" name='' type="submit">
                      Cập nhật thông tin
                    </Button>
                </div>
                {alert.err_list.status === true && <span className="noti">Cập nhật thành công</span>}
            </Form>
        </div>
    </div>
  );
}

export default UpdateAccount