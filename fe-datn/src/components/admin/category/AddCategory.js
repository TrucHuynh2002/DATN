import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';






function AddCategory() {
    const [name, setName] = useState('')
    const handleSubmit = () => {
        console.log({
            name
        })
    }


  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm danh mục</h1>
            <Form>
                <Form.Group className="mb-3" controlId="name_roomType">
                    <Form.Label>Tên danh mục </Form.Label>
                    <Form.Control 
                     value={name}
                    type="text"
                     name="name_roomType" 
                     className=''
                      onChange = {e => setName(e.target.value)}
                      
                      />
                    
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button
                    onClick={handleSubmit}
                   >
                        Thêm danh mục
                    </Button>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default AddCategory