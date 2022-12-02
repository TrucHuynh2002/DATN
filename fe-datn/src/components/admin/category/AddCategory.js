import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function AddCategory() {

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
        else{           
            setAlert({
                err_list: res.data
            });
          
        }
        };

  return (
    <div className="content">
        <div className="add-post">
            <h1 className="content_h1_admin">Thêm danh mục </h1>
              <Form onSubmit={(e) => handleSumbit(e)}>
                  <Form.Group className="mb-3" controlId="name_category">
                    <Form.Label>Tên danh mục</Form.Label>
                      <Form.Control type="text" onChange={(e) => handleChange(e)} value={name_category} name="name_category" className=''/>
                      {alert.err_list.status === false && <span className="notice warning_____ ">{alert.err_list.messages.name_category[0]}</span>}                   
                  </Form.Group>
                  <div className="d-grid gap-2">
                  {alert.err_list.status === true && <span className="notice success_____">Thêm thành công</span>}
                      <Button variant="primary" size="sm" name='' type="submit">
                          Thêm danh mục
                      </Button>                     
                  </div>
              </Form>     
        </div>
    </div>
  )
}

export default AddCategory