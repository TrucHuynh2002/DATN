import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddFurniture() {

    const navigate = useNavigate();
    const [addFurniture, setAddFurniture] = useState({
        name: "",
        icon: "",
    });

    const { name, icon } = addFurniture;

    const handleChange = (e) => {
        setAddFurniture({ ...addFurniture, [e.target.name]: e.target.value});
    };

    const handleSumbit = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:8000/api/furniture/create', addFurniture)
        navigate("../list_furniture");
    };

  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm nội thất</h1>
            <Form onSubmit={(e) => handleSumbit(e)}>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Tên nội thất</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="name" 
                        value={name}
                        className=''
                        onChange={(e) => handleChange(e)}/>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="icon">
                        <Form.Label>Icons</Form.Label>
                        <Form.Control
                        type="file"
                        name="icon" 
                        value={icon}
                        className=''
                        onChange={(e) => handleChange(e)}/>
                    </Form.Group>
                </Col>
                
                <div className="d-grid gap-2">
                    <Button variant="primary" size="sm" name='' type="submit">
                          Thêm nội thất
                      </Button>
                </div>
            </Row>
            </Form>

       </div>
    </div>
  )
}

export default AddFurniture