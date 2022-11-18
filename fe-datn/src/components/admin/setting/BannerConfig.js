import React from 'react'
import { Button, Form } from 'react-bootstrap';

function BannerConfig() {
  return (
    <>
      <Form.Group className="mb-3" controlId="slide">
        <Form.Label>Slide</Form.Label>
        <Form.Control type="file" name="slide" className=''/>
      </Form.Group>
      <Button variant="primary" name="" className='' type="submit">Cập nhật</Button>
    </>
  )
}

export default BannerConfig