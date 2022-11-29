import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


function EditCategory() {

    // const navigate = useNavigate();
    const {id_category} = useParams();
    const [editCategory, setEditCategory] = useState({
        name_category: "",
    });

    const [alert, setAlert] = useState({
        err_list: {},
    });

    const { name_category } = editCategory;

    const handleChange = (e) => {
        setEditCategory({ ...editCategory, [e.target.name]: e.target.value });
        // setEditCategory(e.target.value);
    };
   
    const handleSumbit = async (e) => {
        e.preventDefault();
        const res = await axios.put(`http://127.0.0.1:8000/api/category/update/${id_category}`, editCategory);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
            });
            console.log(alert.err_list)
        }
        else{           
            setAlert({
                err_list: res.data
            });
        }
        // navigate("../list_category");
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

                        {/* Thông báo  */}
                      {alert.err_list.status === false && <span className="error">{alert.err_list.messages.name_category[0]}</span>}
                      {alert.err_list.status === true && <span className="noti">Cập nhật thành công</span>}
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