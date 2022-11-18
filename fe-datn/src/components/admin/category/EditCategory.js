import React from 'react'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
// import axios from 'axios';


function EditCategory() {

    const [editCategory, setEditCategory] = useState([]);

    const handleChange = (e) =>{
        setEditCategory(e.target.value)
    }
    
    const handleSumbit = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/category/update?_method=put", {
            method: "PUT",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(editCategory)
          })
          .then((response) => {
            console.log(response);
            return response.json();          
        });
        // axios.post('http://127.0.0.1:8000/api/category/create?_method=put', {
        //         name_category: editCategory,        
        //     })
        //     .then((res) => {
        //         console.log(res.data);
        //         this.props.history.push('/');
        //     })
        //     .catch((err) => {
        //         console.log(err);
            // })
    }

  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Cập nhật danh mục</h1>
            <Form onSubmit={handleSumbit}>
                <Form.Group className="mb-3" controlId="name_category">
                    <Form.Label>Tên danh mục</Form.Label>
                    <Form.Control type="text" name="name_category" onChange={handleChange} 
                    value={editCategory} className=''/>
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