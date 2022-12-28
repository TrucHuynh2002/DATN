import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { url } from '../../url';
import { TabTitle } from '../../title';

function AddCategory() {
    TabTitle('Thêm danh mục');
    const [addCategory, setAddCategory] = useState({
        name_category:"",
        link_to:"",
    });
    const [alert, setAlert] = useState({
        err_list: {},
    });
    const { name_category, link_to } = addCategory;
    const handleChange = (e) => {
        setAddCategory({ ...addCategory, [e.target.name]: e.target.value});
    };
    const handleSumbit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${url}/category/create`, addCategory);
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

  return (
    <div className="content">
        <div className="add-post">
            <h1 className="content_h1_admin">Thêm danh mục </h1>
              <Form onSubmit={(e) => handleSumbit(e)}>
                  <Form.Group className="mb-3" controlId="name_category">
                    <Form.Label>Tên danh mục</Form.Label>
                      <Form.Control type="text" onChange={(e) => handleChange(e)} value={name_category} name="name_category" className=''/>
                      {alert.err_list.status === false && <div className="notice warning_____ ">{alert.err_list.messages.name_category[0]}</div>}                   
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="link_to">
                    <Form.Label>Link to</Form.Label>
                      <Form.Control type="text" onChange={(e) => handleChange(e)} value={link_to} name="link_to" className=''/>
                      {alert.err_list.status === false && <div className="notice warning_____ ">{alert.err_list.messages.link_to[0]}</div>}                   
                  </Form.Group>
                  <div className="d-grid gap-2">
                  {alert.err_list.status === true && <div className="notice success_____">Thêm thành công</div>}
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