import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function EditManage() {
  return (
    <>
        <div className="list-post">                
                    <div className="row">
                        <Table bordered>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Người sở hữu</th>
                                <th>Tiền phòng</th>
                                <th>Tiền điện</th>
                                <th>Tiền nước</th>
                                <th>Ngày</th>
                                <th>Ngày cập nhật</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                        
                            <tbody className="list-cate">                    
                                <tr>
                                    <td>12</td>
                                    <td>Nhóm</td>
                                    <td>2.000.000 đ</td>
                                    <td>100.000 đ</td>                        
                                    <td>30.000 đ</td>
                                    <td>01/01/2022</td>
                                    <td>01/01/2022</td>
                                    <td>
                                        <Button className="bx bx-detail btn btn-primary"></Button>            
                                    </td>
                                    <td>
                                        <Button variant="outline-danger" name='' className="bx bxs-trash"></Button>
                                    </td>
                                </tr>  
                            </tbody>
                        </Table>
                    </div>
                </div> 
    </>
  )
}

export default EditManage