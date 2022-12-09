import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditFurniture() {

    const {id_furniture} = useParams();
    const [editFurniture, setEditFurniture] = useState({
        name: "",
        icon: "",
    });

    const [alert, setAlert] = useState({
        err_list: {},
    });

    const { name, icon } = editFurniture;

    const handleChange = (e) => {
        setEditFurniture({ ...editFurniture, [e.target.name]: e.target.value });
    };

    const handleSumbit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData();
        dataForm.append('name',name);
        dataForm.append('icon',icon);
        const res = await axios.put(`http://127.0.0.1:8000/api/furniture/update/${id_furniture}`, editFurniture);
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
        loadFurn();
    }, []);

    const loadFurn = async () => {
        const result = await axios.get(`http://127.0.0.1:8000/api/furniture/show/${id_furniture}`);
        setEditFurniture(result.data.data);
    };

  return (
    <div className="content">
    <div className="add-post">
        <h1 className="content_h1_admin">Cập nhật nội thất</h1>
        <Form onSubmit={(e) => handleSumbit(e)}>
        <Row>
            <Col sm={6}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Tên nội thất</Form.Label>
                    <Form.Control type="text" onChange={(e) => handleChange(e)}
                    value={name} name="name" className=''/>
                    { alert.err_list.status == false && alert.err_list.messages.name &&
                                <div className="notice warning_____">{alert.err_list.messages.name[0]}</div>}
                </Form.Group>
            </Col>
            <Col sm={6}>
                <Form.Group className="mb-3" controlId="icon">
                    <Form.Label>Icons</Form.Label>
                    <Form.Control type="text" onChange={(e) => handleChange(e)}
                    value={icon} name="icon" className=''/>
                    { alert.err_list.status == false && alert.err_list.messages.icon &&
                                <div className="notice warning_____">{alert.err_list.messages.icon[0]}</div>}
                </Form.Group>
            </Col>
            <div className="d-grid gap-2">
            {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
                <Button variant="primary" size="sm" name='' type="submit">
                    Cập nhật nội thất
                </Button>
            </div>
        </Row>
    </Form>
   </div>
    </div>
  )
}

export default EditFurniture