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
<<<<<<< HEAD
                                        <Form.Group className="mb-3" controlId="logo">
                                            <h3 className="content_h1_admin"><b>Cập nhật ảnh đại diện</b></h3>
                                            {/* <Form.Label>Avata</Form.Label> */}
=======
                                        <Form.Group className="mb-3" controlId="avata">
                                            <h3 style={{textAlign:"center", margin:"20px", fontSize:"20px"}}><b>Cập nhật ảnh đại diện</b></h3>
>>>>>>> 0181eaf90ded422a7086019354fb39e259684a36
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