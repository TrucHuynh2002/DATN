import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function ListDeleteRoom() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
    <div className="container content_profile">
        <div className="list-post">
        <div className="row">
            <div className="col-md-12">
                <h1><b className="b_title">Danh sách phòng đang ở</b></h1>
            </div>
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
                    <Button variant="outline-primary" name='' className="" onClick={handleShow}>Trả phòng</Button>                                       
                    </td>
                </tr>  
            </tbody>
        </Table>
        {/* start trả phòng */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Xác nhận trả phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có chắc chắn muốn trả phòng ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Trả phòng
                </Button>
            </Modal.Footer>
        </Modal>
        {/* end trả phòng */}
        </div>
    </div>
    </div>
</>
  )
}

export default ListDeleteRoom