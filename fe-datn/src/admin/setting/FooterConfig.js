import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import NavConfig from './NavConfig';

function FooterConfig() {
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
              <Form.Label>Footer Logo</Form.Label>
              <Form.Control type="file" name="logo" className='' value="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control type="text" name="address" className='' rows={3} value="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" className='' rows={3} value="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="sdt">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type="text" name="sdt" className='' rows={3} value="" />
            </Form.Group>
            <Button variant="primary" className='' name="" type="submit">Cập nhật</Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default FooterConfig