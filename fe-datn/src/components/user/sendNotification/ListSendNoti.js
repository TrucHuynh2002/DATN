import React, {useState} from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

function ListSendNoti() {
    // show detail sendnoti
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
        <Table bordered>
            <thead>
            <tr>
                <th>#</th>
                <th>Tên yêu cầu</th>
                <th></th>
            </tr>
            </thead>
            
            <tbody className="list-cate">                 
                <tr>
                    <td>1</td>
                    <td>Yêu cầu trả phòng</td>                       
                    <td>                      
                        <Button variant="outline-primary" name='' className="bx bx-detail btn-edit" onClick={handleShow}></Button>
                        <Button variant="outline-danger" name='' className="bx bxs-trash"></Button>
                    </td>
                    </tr>  
            </tbody>
        </Table>
        {/* start show detail sendnoti */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Xác nhận yêu cầu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Tên người sở hữu: Nhóm</h2>
                <h2>Số phòng: A7</h2>
                <h2>Yêu cầu: Trả phòng</h2>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary">
                Xác nhận
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Hủy bỏ
            </Button>
            </Modal.Footer>
      </Modal>
      {/* end show detail sendnoti */}
    </>
  )
}

export default ListSendNoti