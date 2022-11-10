import React from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function ConfirmAccount() {
  return (
    <div className="content">
    <div className="add-post">
        <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Đổi mật khẩu</h1>
        <Form>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Mật khẩu mới</Form.Label>
                <Form.Control type="password" name="" className=''/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Nhập lại mật khẩu</Form.Label>
                <Form.Control type="password" name="" className=''/>
            </Form.Group>
            <div className="d-grid gap-2">
                <Button variant="primary" size="sm" name='' type="submit">
                  Cập nhật
                </Button>
            </div>
        </Form>
    </div>
</div>
  )
}

export default ConfirmAccount