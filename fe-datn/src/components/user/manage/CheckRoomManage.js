import React from 'react';
import { Button, Table } from 'react-bootstrap';

function CheckRoomManage() {
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2 className="b_title">Cập nhật phòng đặt cọc</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="manage">
            <div className="container-fluid">    
            <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Người sở hữu</th>
                        <th>Số phòng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="list-cate">       
                    <tr>
                        <td>1</td>
                        <td>Nhóm</td>
                        <td>7</td>
                        <td>
                            <Button variant="outline-primary" name='' className="">Xác nhận</Button>
                        </td>
                    </tr>              
                </tbody>
            </Table>
        </div>
        </div> 
    </>
  )
}

export default CheckRoomManage