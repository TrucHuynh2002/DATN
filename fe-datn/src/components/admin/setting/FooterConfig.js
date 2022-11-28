import React from 'react'
import { Button, Form } from 'react-bootstrap';

function FooterConfig() {
  return (
    <>
      <Form.Group className="mb-3" controlId="logo">
        <Form.Label>Footer Logo</Form.Label>
        <Form.Control type="file" name="logo" className=''/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="address">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control type="text" name="address" className='' rows={3}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" className='' rows={3}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="sdt">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control type="text" name="sdt" className='' rows={3}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="introduce">
          <Form.Label>Giới thiệu</Form.Label>
          <Form.Control type="text" name="introduce" className='' rows={3}/>
      </Form.Group>
      <Button variant="primary" className='' name="" type="submit">Cập nhật</Button>
    </>
  )
}

export default FooterConfig