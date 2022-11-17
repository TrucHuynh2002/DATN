import React from 'react'
import { Button, Form } from 'react-bootstrap';

function EditCategory() {
  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Cập nhật danh mục</h1>
            <Form>
                <Form.Group className="mb-3" controlId="name_roomType">
                    <Form.Label>Tên danh mục</Form.Label>
                    <Form.Control type="text" name="name_roomType" className=''/>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="sm" name='' type="submit">
                        Cập nhật danh mục
                    </Button>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default EditCategory