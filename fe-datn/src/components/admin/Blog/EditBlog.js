import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

function EditBlog() {
    
    // const navigate = useNavigate();
    const {id_blog} = useParams();
    const [editBlog, setEditBlog] = useState({
        name_blog:"",
        meta_keywords:"",
        description_sort:"",
        description:"",
    });

    const [alert, setAlert] = useState({
        err_list: {},
    });

    const { name_blog, meta_keywords, description_sort, description } = editBlog;
  
    const handleChange = (e) => {
        setEditBlog({ ...editBlog, [e.target.name]: e.target.value});
    };
    
    const handleSumbit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData();
        dataForm.append('name_blog',name_blog);
        dataForm.append('meta_keywords',meta_keywords);
        dataForm.append('description_sort',description_sort);
        dataForm.append('description',description);
        const res = await axios.put(`http://127.0.0.1:8000/api/blog/update/${id_blog}`, editBlog);
        console.log(res);
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
            // console.log(alert.err_list.messages.name_blog[0])
        }
        };

        useEffect(() => {
            loadCate();
        }, []);

        const loadCate = async () => {
            const result = await axios.get(`http://127.0.0.1:8000/api/blog/show/${id_blog}`);
            setEditBlog(result.data.data);
        }; 

  return (
    <div className="content">
        <div className="add-post">
            <h1 className="content_h1_admin">Cập nhật blog</h1>
                <Form onSubmit={(e) => handleSumbit(e)}>
                    <Form.Group className="mb-3" controlId="name_blog">
                        <Form.Label>Tên blog</Form.Label>
                        <Form.Control type="text" onChange={(e) => handleChange(e)} value={name_blog} name="name_blog"  />
                        { alert.err_list.status == false && alert.err_list.messages.name_blog &&
                                       <div className="notice warning_____">{alert.err_list.messages.name_blog[0]}</div>}                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_keywords">
                        <Form.Label>Từ khóa</Form.Label>
                        <Form.Control type="text" onChange={(e) => handleChange(e)} value={meta_keywords} name="meta_keywords" />
                        { alert.err_list.status == false && alert.err_list.messages.meta_keywords &&
                                       <div className="notice warning_____">{alert.err_list.messages.meta_keywords[0]}</div>}                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description_sort">
                        <Form.Label>Mô tả ngắn</Form.Label>
                        <Form.Control type="text" onChange={(e) => handleChange(e)} value={description_sort} name="description_sort" />
                        { alert.err_list.status == false && alert.err_list.messages.description_sort &&
                                       <div className="notice warning_____">{alert.err_list.messages.description_sort[0]}</div>}                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control type="text" onChange={(e) => handleChange(e)} value={description} name="description" />
                        { alert.err_list.status == false && alert.err_list.messages.description &&
                                       <div className="notice warning_____">{alert.err_list.messages.description[0]}</div>}                    </Form.Group>
                  <div className="d-grid gap-2">
                  {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
                      <Button variant="primary" size="sm" name='' type="submit">
                      Cập nhật blog
                      </Button>                     
                  </div>
                </Form>     
            </div>
        </div>
  )
}

export default EditBlog