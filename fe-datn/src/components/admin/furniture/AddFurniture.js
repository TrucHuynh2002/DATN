
import { Button, Form, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react'
function AddFurniture() {
    const [name, setName] = useState('')
    const [icon, setIcon] = useState('')
    const handleSubmit = () => {
        console.log({
            name,
            icon
        })
    }

  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm nội thất</h1>
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
                    <Button
                     onClick={handleSubmit}>
                        Thêm nội thất
                    </Button>
                </div>
            </Row>

       </div>
    </div>
  )
}

export default AddFurniture