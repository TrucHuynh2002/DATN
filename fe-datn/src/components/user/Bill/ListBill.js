import React, { useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { TabTitle } from '../../title';

function ListBill() {
    TabTitle('Danh sách hóa đơn');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2>Danh sách hóa đơn</h2>
                        </div>
                    </div>
               </div>
            </div>  
        </div>
        <div className='row'>
            <div className="container content_profile">
                <div className="list-post">
                    <Table bordered>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên người thuê</th>
                        <th>Số phòng</th>
                        <th>Tổng tiền phòng</th>
                        <th>Tổng tiền nước</th>
                        <th>Tổng tiền điện</th>
                        <th></th>
                    </tr>
                    </thead>
                
                    <tbody className="list-cate">                   
                        <tr>
                            <td>1</td>
                            <td>Nhóm</td>
                            <td>A7</td>
                            <td>1.000.000 đ</td>
                            <td>20.000 đ</td>                        
                            <td>300.000 đ</td>
                            <td>                          
                                <Button variant="outline-primary" name='' className="bx bxs-edit" onClick={handleShow}></Button>                                        
                            </td>
                        </tr>  
                    </tbody>
                    </Table>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cập nhật hóa đơn</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label>Tên người sở hữu</Form.Label>
                                    <Form.Control type="text" name=""/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label>Số phòng</Form.Label>
                                    <Form.Control type="text" name=""/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label>Tổng tiền phòng</Form.Label>
                                    <Form.Control type="text" name=""/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label>Tổng tiền điện</Form.Label>
                                    <Form.Control type="text" name=""/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label>Tổng tiền nước</Form.Label>
                                    <Form.Control type="text" name=""/>
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
                                    <Button variant="primary" size="sm" name='' type="submit">Cập nhật</Button>                     
                                </div>
                            </Form>    
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        </Modal.Footer>
                    </Modal> 
                </div>
            </div>
        </div>
    </>
  )
}

export default ListBill