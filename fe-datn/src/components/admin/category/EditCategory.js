import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';


function EditCategory() {

    const [editCategory, setEditCategory] = useState({
        name_category: ""
    });
    const {id_category} = useParams();

    const handleChange = (e) =>{
        // setEditCategory({ ...editCategory, [e.target.name]: e.target.value });
        setEditCategory(e.target.value);
    };

    
    const handleSumbit = async (e) => {
        e.preventDefault();
        // fetch("http://127.0.0.1:8000/api/category/update?_method=put", {
        //     method: "PUT",
        //     dataType: "JSON",
        //     headers: {
        //         "Content-Type": "application/json; charset=utf-8",
        //     },
        //     body: JSON.stringify(editCategory)
        //   })
        //   .then((response) => {
        //     console.log(response);
        //     return response.json();          
        // });
        // await axios.put(`http://127.0.0.1:8000/api/category/edit/${id_category}`, {
        //         name_category: editCategory,        
        //     })
        //     .then((res) => {
        //         console.log(res.data);
        //         this.props.history.push('/');
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })

        await axios.put(`http://127.0.0.1:8000/api/category/update/${id_category}`,{name_category: editCategory});
        // this.props.history.push('/');
    };

    useEffect(() => {
        loadCate();
    }, []);

    const loadCate = async () => {
        const result = await axios.get(`http://127.0.0.1:8000/api/category/show/${id_category}`);
        setEditCategory(result.data.data);
    };

      
  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Cập nhật danh mục</h1>
            <Form onSubmit={handleSumbit}>
                <Form.Group className="mb-3" controlId="name_category">
                    <Form.Label>Tên danh mục</Form.Label>
                    <Form.Control type="text" name="name_category" onChange={handleChange}
                    value={editCategory?.name_category} className=''/>
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