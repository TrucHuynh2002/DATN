import React from 'react'
import { Button, Form } from 'react-bootstrap';

function Setting() {
  return (
    <>     
      <Form.Group className="mb-3" controlId="logo">
        <Form.Label>Logo</Form.Label>
        <Form.Control type="file" name="logo" className=''/>
      </Form.Group>
      <Button variant="primary" className='' name="" type="submit">Cập nhật</Button>     
    </> 
  )
}

export default Setting