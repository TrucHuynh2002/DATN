import React from 'react';
import { Button, Table } from 'react-bootstrap';

function CheckRoomManage() {
  return (
    <div className="list-post" >                
        <div className="row">
            <div className="col-md-12">
                <h3 className="b_title">Danh sách trả phòng</h3>
            </div>
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
  )
}

export default CheckRoomManage