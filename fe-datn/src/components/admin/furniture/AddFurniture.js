import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function AddFurniture() {
    const [name, setName] = useState([]);
    const [icon, setIcon] = useState([]);

    // const handleChange = (e) =>{
    //     setName(e.target.value);
    // }

    // const handleChange = (e) =>{
    //     setName(e.target.value);
    // }

    const handleSumbit = (e) => {
        e.preventDefault();
        // fetch("http://127.0.0.1:8000/api/category/create", {
        //     method: "POST",
        //     dataType: "JSON",
        //     headers: {
        //         "Content-Type": "application/json; charset=utf-8",
        //     },
        //     body: JSON.stringify(addCategory)
        //   })
        //   .then((response) => {
        //     console.log(response);
        //     return response.json();
           
        // });
        axios.post('http://127.0.0.1:8000/api/furniture/create', {
                name: name,
                icon: icon    
            })
            .then((res) => {
                console.log(res.data);
                this.props.history.push('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // const handleSubmit = () => {
    //     console.log({
    //         name,
    //         icon
    //     })
    // }

  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm nội thất</h1>
            <Form onSubmit={handleSumbit}>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Tên nội thất</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="name" 
                        className=''
                        value={name}
                         onChange = {e => setName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="icon">
                        <Form.Label>Icons</Form.Label>
                        <Form.Control
                        type="text" 
                        name="icon" 
                        className=''
                        value={icon}
                         onChange = {e => setIcon(e.target.value)}
                        />
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