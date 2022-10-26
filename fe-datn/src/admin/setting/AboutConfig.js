import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import NavConfig from './NavConfig';

function AboutConfig() {
  return (
    <div className="content">
      <div className="add-post">
        <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thiết lập cấu hình</h1>
        <Row>
          <Col sm={4}>
            <NavConfig />
          </Col>
          <Col sm={8}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control type="text" name="title" className='' value="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
                <Form.Label>Nội dung</Form.Label>
                <Form.Control as="textarea" name="content" className='' rows={3} value="" />
            </Form.Group>
            <Button variant="primary" name="" className='' type="submit">Cập nhật</Button>
          </Col>
        </Row>
      </div>
    </div>

  )
}

export default AboutConfig