import React from 'react'
import { Button, Form } from 'react-bootstrap';

function EditAvata() {
  return (
    <>
        <div className="contact">
            <div className="container">
                <div className="content_profile">
                    <div className="list-post">
                        <div className='profile row'>
                            <div className='col-md-6'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="logo">
                                            <h3 style={{textAlign:"center", margin:"20px", fontSize:"20px"}}><b>Cập nhật ảnh đại diện</b></h3>
                                            {/* <Form.Label>Avata</Form.Label> */}
                                            <Form.Control type="file" name="avata" className=''/>
                                        </Form.Group>
                                        <Button variant="primary" className='' name="" type="submit">Cập nhật</Button>   
                                    </Form>                      
                                    </div>
                                </div>
                            </div>                           
                        </div>
                    </div>                                   
                </div>
            </div>
        </div>
    </>
  )
}

export default EditAvata