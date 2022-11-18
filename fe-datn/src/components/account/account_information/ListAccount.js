import React from 'react'
import { Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListAccount() {
  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thông tin cá nhân</h1>
            <Table>
            <tbody>
                <tr>
                    <td>Tên đăng nhập</td>
                    <td>Trúc Huỳnh</td>
                </tr> 
                <tr>
                    <td>Mật khẩu</td>
                    <td>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Control type="password" className="" name="" placeholder="********" disabled value="" />
                        </Form.Group>
                    </td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>nguyentruchuynh2002@gmail.com</td>
                </tr>  
                <tr>
                    <td>Số điện thoại</td>
                    <td>0907673005</td>
                </tr> 
                <tr>
                    <td>Địa chỉ</td>
                    <td>Trà Vinh</td>
                </tr>  
                <tr>
                    <td>
                        <Link to="update_acc">
                            <Button variant="outline-primary" name='' className="btn-edit">Cập nhật thông tin</Button>
                        </Link>
                        <Link to="confirm_acc">
                            <Button variant="outline-warning" name='' className="btn-edit">Đổi mật khẩu</Button>
                        </Link>
                        <Link to="">
                            <Button variant="outline-danger" name='' className="btn-edit">Đăng xuất</Button>
                        </Link>
                    </td>
                </tr>
            </tbody>
            </Table>
        </div>
    </div>
  )
}

export default ListAccount