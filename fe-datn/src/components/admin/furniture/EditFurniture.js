import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditFurniture() {

    const navigate = useNavigate();
    const {id_furniture} = useParams();
    const [editFurniture, setEditFurniture] = useState({
        name: "",
        icon: "",
    });

    // const [alert, setAlert] = useState({
    //     err_list: {},
    // });

    const { name, icon } = editFurniture;

    const handleChange = (e) => {
        setEditFurniture({ ...editFurniture, [e.target.name]: e.target.value });
        // setEditCategory(e.target.value);
    };

    const handleSumbit = async (e) => {
        e.preventDefault();
        const res = await axios.put(`http://127.0.0.1:8000/api/furniture/update/${id_furniture}`, editFurniture);
        // if(res.data.status === true){
        //     setAlert({
        //         err_list: res.data
        //     });
        //     console.log(alert.err_list)
        // }
        // else{           
        //     setAlert({
        //         err_list: res.data
        //     });
        //     console.log(alert.err_list.messages.name[0])
        // }
        // navigate("../list_furniture");
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
        <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Cập nhật nội thất</h1>
        <Form onSubmit={(e) => handleSumbit(e)}>
        <Row>
            <Col sm={6}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Tên nội thất</Form.Label>
                    <Form.Control type="text" onChange={(e) => handleChange(e)}
                    value={name} name="name" className=''/>
                </Form.Group>
            </Col>
            <Col sm={6}>
                <Form.Group className="mb-3" controlId="icon">
                    <Form.Label>Icons</Form.Label>
                    <Form.Control type="text" onChange={(e) => handleChange(e)}
                    value={icon} name="icon" className=''/>
                </Form.Group>
            </Col>
            <div className="d-grid gap-2">
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