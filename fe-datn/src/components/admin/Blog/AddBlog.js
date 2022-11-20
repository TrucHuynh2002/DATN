import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function AddBlog() {

    // const navigate = useNavigate();
    const [addBlog, setAddBlog] = useState({
        name_blog:"",
        meta_keywords:"",
        description_sort:"",
        description:"",
    });

    const [alert, setAlert] = useState({
        err_list: {},
    });

    const { name_blog,meta_keywords,description_sort,description} = addBlog;
  
    const handleChange = (e) => {
        setAddBlog({ ...addBlog, [e.target.name]: e.target.value});
    };
    
    const handleSumbit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://127.0.0.1:8000/api/blog/create", addBlog);
        console.log(res);
        // if(res.data.status === true){
        //     setAlert({
        //         err_list: res.data
        //     });
        //     console.log(alert.err_list)
        // }
        // {           
        //     setAlert({
        //         err_list: res.data
        //     });
        //     console.log(alert.err_list.messages.name_blog[0])
        // }
        };

  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm Blog </h1>
                <Form onSubmit={(e) => handleSumbit(e)}>
                    <Form.Group className="mb-3" controlId="name_blog">
                        <Form.Label>Tên Blog</Form.Label>
                        <Form.Control type="text" onChange={(e) => handleChange(e)} value={name_blog} name="name_blog"  />
                        {/* Thông báo  */}
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.name_blog[0]}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_keywords">
                        <Form.Label>Từ Khóa</Form.Label>
                        <Form.Control type="text" onChange={(e) => handleChange(e)} value={meta_keywords} name="meta_keywords" />
        
                        {/* Thông báo  */}
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.meta_keywords[0]}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description_sort">
                        <Form.Label>Mô tả ngắn</Form.Label>
                        <Form.Control type="text" onChange={(e) => handleChange(e)} value={description_sort} name="description_sort" />
        
                        {/* Thông báo  */}
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.description_sort[0]}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Mô tả </Form.Label>
                        <Form.Control type="text" onChange={(e) => handleChange(e)} value={description} name="description" />
        
                        {/* Thông báo  */}
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.description[0]}</span>}
                    </Form.Group>
                  <div className="d-grid gap-2">
                  {alert.err_list.status === true && <span className="noti">Thêm thành công</span>}
                      <Button variant="primary" size="sm" name='' type="submit">
                          Thêm Blog
                      </Button>                     
                  </div>
                </Form>     
            </div>
        </div>
  )
}

export default AddBlog