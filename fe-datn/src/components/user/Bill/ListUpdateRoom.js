import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function ListUpdateRoom() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
        <div className="container content_profile">
        <div className="row">
            <div className="col-md-12">
                <h1><b className="b_title">Danh sách phòng đặt cọc</b></h1>
            </div>
            <div className="list-post">
            <Table bordered>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên người đặt cọc</th>
                        <th>Số phòng</th>
                        <th></th>
                    </tr>
                    </thead>
                
                    <tbody className="list-cate">                   
                        <tr>
                            <td>1</td>
                            <td>Nhóm</td>
                            <td>A7</td>
                            <td>                          
                                <Button variant="outline-danger" name='' className="" onClick={handleShow}>Hủy bỏ</Button>                                        
                            </td>
                        </tr>  
                    </tbody>
                    </Table>
            </div>
        </div>
        </div>
    </>
  )
}

export default ListUpdateRoom