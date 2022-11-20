import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function AddCategory() {

    // const navigate = useNavigate();
    const [addCategory, setAddCategory] = useState({
        name_category:"",
    });

    const [alert, setAlert] = useState({
        err_list: {},
    });

    const { name_category } = addCategory;

    const handleChange = (e) => {
        setAddCategory({ ...addCategory, [e.target.name]: e.target.value});
    };
    
    const handleSumbit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://127.0.0.1:8000/api/category/create", addCategory);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
               
            });
            console.log(alert.err_list)
        }
        {           
            setAlert({
                err_list: res.data
            });
            console.log(alert.err_list.messages.name_category[0])
        }
        };

  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm Blog </h1>
              <Form onSubmit={(e) => handleSumbit(e)}>
                  <Form.Group className="mb-3" controlId="name_category">
                      <Form.Label>Tên Blog</Form.Label>
                      <Form.Control type="text" onChange={(e) => handleChange(e)} value={name_category} name="name_category" className=''/>
                      
                      {/* Thông báo  */}
                      {alert.err_list.status === false && <span className="error">{alert.err_list.messages.name_category[0]}</span>}
                      {alert.err_list.status === true && <span className="noti">Thêm thành công</span>}
                  </Form.Group>
                  <div className="d-grid gap-2">
                      <Button variant="primary" size="sm" name='' type="submit">
                          Thêm Blog
                      </Button>                     
                  </div>
              </Form>     
        </div>
    </div>
  )
}

export default AddCategory