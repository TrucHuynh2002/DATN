import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function FooterConfig() {

  // const {id_config} = useParams();
  // console.log(id_config);
  const [editConfig, setEditConfig] = useState({
    sdt: "",
    email: "",
    address: "",
    introduce: "",
  });

  const [alert, setAlert] = useState({
    err_list: {},
  });

  const { sdt, email, address, introduce } = editConfig;

  const handleChange = (e) => {
    setEditConfig({ ...editConfig, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const res = await axios.put("http://127.0.0.1:8000/api/config/update/1", editConfig);
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
    // navigate("../list_category");
  };


  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
      const result = await axios.get("http://127.0.0.1:8000/api/config/1");
      console.log(result);
      setEditConfig(result.data.data);
  };

  return (
    <>
      <Form onSubmit={(e) => handleSumbit(e)}>
        <Form.Group className="mb-3" controlId="address">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control type="text" name="address" onChange={(e) => handleChange(e)} value={address} className=''/>
            {/* {alert.err_list.status === false && <span className="error">{alert.err_list.messages.address[0]}</span>} */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" onChange={(e) => handleChange(e)} value={email} className=''/>
            {/* {alert.err_list.status === false && <span className="error">{alert.err_list.messages.email[0]}</span>} */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="sdt">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control type="text" name="sdt" onChange={(e) => handleChange(e)} value={sdt} className=''/>
            {/* {alert.err_list.status === false && <span className="error">{alert.err_list.messages.sdt[0]}</span>} */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="introduce">
            <Form.Label>Giới thiệu</Form.Label>
            <Form.Control type="text" name="introduce" onChange={(e) => handleChange(e)} value={introduce} className=''/>
            {/* {alert.err_list.status === false && <span className="error">{alert.err_list.messages.introduce[0]}</span>} */}
        </Form.Group>
          {/* {alert.err_list.status === true && <span className="noti">Cập nhật thành công</span>} */}
        <Button variant="primary" name="" type="submit">Cập nhật</Button>
      </Form>
    </>
  )
}

export default FooterConfig