import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import NavConfig from './NavConfig';

function Setting() {
  return (
    <div className="content">
      <div className="add-post">
        <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thiết lập cấu hình</h1>
        <Row>
          <Col sm={4}>
            <NavConfig />
          </Col>
          <Col sm={8}>
            <Form.Group className="mb-3" controlId="logo">
              <Form.Label>Logo</Form.Label>
              <Form.Control type="file" name="logo" className=''/>
            </Form.Group>
            <Button variant="primary" className='' name="" type="submit">Cập nhật</Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Setting