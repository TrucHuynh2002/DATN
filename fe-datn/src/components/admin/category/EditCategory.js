import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function EditCategory() {

    const {id_category} = useParams();
    const [editCategory, setEditCategory] = useState({
        name_category: "",
        link_to: "",
    });

    const [alert, setAlert] = useState({
        err_list: {},
    });

    const { name_category, link_to } = editCategory;

    const handleChange = (e) => {
        setEditCategory({ ...editCategory, [e.target.name]: e.target.value });
    };
   
    const handleSumbit = async (e) => {
        e.preventDefault();
        const res = await axios.put(`http://127.0.0.1:8000/api/category/update/${id_category}`, editCategory);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
            });
        }
        else{           
            setAlert({
                err_list: res.data
            });
        }
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
            <h1 className="content_h1_admin">Cập nhật danh mục</h1>
            <Form onSubmit={(e) => handleSumbit(e)}>
                <Form.Group className="mb-3" controlId="name_category">
                    <Form.Label>Tên danh mục</Form.Label>
                    <Form.Control type="text" name="name_category" onChange={(e) => handleChange(e)}
                    value={name_category} className=''/>
                        {alert.err_list.status === false && <div className="notice warning_____ ">{alert.err_list.messages.name_category[0]}</div>}    
                </Form.Group>
                <Form.Group className="mb-3" controlId="link_to">
                    <Form.Label>Link to</Form.Label>
                      <Form.Control type="text" onChange={(e) => handleChange(e)} value={link_to} name="link_to" className=''/>
                      {alert.err_list.status === false && <div className="notice warning_____ ">{alert.err_list.messages.link_to[0]}</div>}                   
                </Form.Group>
                <div className="d-grid gap-2">
                {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
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