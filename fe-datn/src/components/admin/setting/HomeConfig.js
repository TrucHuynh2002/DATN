import React from 'react'
import { Button, Form } from 'react-bootstrap';

function HomeConfig() {
  return (
    <>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Tiêu đề</Form.Label>
        <Form.Control type="text" name="title" className=''/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="introduce">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control as="textarea" name="introduce" className='' rows={3}/>
      </Form.Group>
      <Button variant="primary" name="" className='' type="submit">Cập nhật</Button>
    </>
  )
}

export default HomeConfig