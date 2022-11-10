import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';

function EditFurniture() {
  return (
    <div className="content">
    <div className="add-post">
        <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Cập nhật nội thất</h1>
        <Row>
            <Col sm={6}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Tên nội thất</Form.Label>
                    <Form.Control type="text" name="name" className=''/>
                </Form.Group>
            </Col>
            <Col sm={6}>
                <Form.Group className="mb-3" controlId="icon">
                    <Form.Label>Icons</Form.Label>
                    <Form.Control type="text" name="icon" className=''/>
                </Form.Group>
            </Col>
            <div className="d-grid gap-2">
                <Button variant="primary" size="sm" name='' type="submit">
                    Cập nhật nội thất
                </Button>
            </div>
        </Row>

   </div>
    </div>
  )
}

export default EditFurniture