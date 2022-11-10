import React from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function UpdateAccount() {
  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Cập nhật thông tin</h1>
            <Form>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" name="" className=''/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="2">
                    <Form.Label>Hình</Form.Label>
                    <Form.Control type="file" name="" className=''/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="" className=''/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control type="text" name="" className=''/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control type="text" name="" className=''/>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="sm" name='' type="submit">
                      Cập nhật thông tin
                    </Button>
                </div>
            </Form>
        </div>
    </div>
  );
}

export default UpdateAccount