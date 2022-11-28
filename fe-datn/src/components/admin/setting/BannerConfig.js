import React from 'react'
import { Button, Form } from 'react-bootstrap';

function BannerConfig() {
  return (
    <>
      <Form.Group className="mb-3" controlId="slide">
        <Form.Label>Slide</Form.Label>
        <img src="https://images3.content-hci.com/commimg/myhotcourses/blog/post/myhc_94121.jpg" style={{width:'100px',margin:"20px"}}></img>
        <img src="https://images3.content-hci.com/commimg/myhotcourses/blog/post/myhc_94121.jpg" style={{width:'100px',margin:"20px"}}></img>
        <img src="https://images3.content-hci.com/commimg/myhotcourses/blog/post/myhc_94121.jpg" style={{width:'100px',margin:"20px"}}></img>
        <img src="https://images3.content-hci.com/commimg/myhotcourses/blog/post/myhc_94121.jpg" style={{width:'100px',margin:"20px"}}></img>
        <Form.Control type="file" name="slide" className=''/>
      </Form.Group>
      <Button variant="primary" name="" className='' type="submit">Cập nhật</Button>
    </>
  )
}

export default BannerConfig