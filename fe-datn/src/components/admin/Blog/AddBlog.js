import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function AddBlog() {git 
    
    var user = JSON.parse(localStorage.getItem("user"));
    const [addBlog, setAddBlog] = useState({
        name_blog:"",
        meta_keywords:"",
        img_blog:[],
        name_img_blog:"",
        description_sort:"",
        description:"",
        id_user:user[0].id
    });
    // console.log(123);
    // xu ly hinh anh
    const [uploadImages, setUploadImages] = useState([]);
    const handleChangeImages = (e) => {
        // console.log(321);
        // setUploadImages(e.target.files)
    }
    // console.log(uploadImages);

    const [alert, setAlert] = useState({
        err_list: {},
    });
    const { name_blog, meta_keywords, img_blog, name_img_blog, description_sort, description } = addBlog;
    
    const handleChange = (e) => {
        setAddBlog({ ...addBlog, [e.target.name]: e.target.value});
        // console.log(123);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let dataForm = new FormData();
        dataForm.append('img_blog[]',uploadImages[0])
        dataForm.append('name_blog',name_blog);
        dataForm.append('meta_keywords',meta_keywords);
        dataForm.append('description_sort',description_sort);
        dataForm.append('description',description);
        const res = await axios.post("http://127.0.0.1:8000/api/blog/create", dataForm);
        console.log(res);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
            });
            // console.log(alert.err_list)
        }
        else{           
            setAlert({
                err_list: res.data
            });
        }};
  return (
    <div className="content">
        <div className="add-post">
            <h1 className="content_h1_admin">Thêm blog</h1>
                <Form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
                    <Form.Group className="mb-3" controlId="name_blog">
                        <Form.Label>Tên blog</Form.Label>
                        <Form.Control type="text" onChange={(e) => handleChange(e)} value={name_blog} name="name_blog"/>
                        { alert.err_list.status == false && alert.err_list.messages.name_blog &&
                        <div className="notice warning_____">{alert.err_list.messages.name_blog[0]}</div>}
                    </Form.Group>
                   <Form.Group className="mb-3" controlId="img_blog">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control type="file" name="img_blog_add" onChange={(e) => handleChangeImages(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_keywords">
                        <Form.Label>Từ khóa</Form.Label>
                        <Form.Control type="text" onChange={(e) => handleChange(e)} value={meta_keywords} name="meta_keywords" />
                        { alert.err_list.status == false && alert.err_list.messages.meta_keywords &&
                        <div className="notice warning_____">{alert.err_list.messages.meta_keywords[0]}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description_sort">
                        <Form.Label>Mô tả ngắn</Form.Label>
                        <Form.Control type="text" onChange={(e) => handleChange(e)} value={description_sort} name="description_sort" />
                        { alert.err_list.status == false && alert.err_list.messages.description_sort &&
                        <div className="notice warning_____">{alert.err_list.messages.description_sort[0]}</div>}                                   
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Mô tả</Form.Label>
                        <CKEditor
                                editor={ClassicEditor}
                                data={description}
                                onReady={(editor)=>{
                                    editor.editing.view.change((writer)=>{
                                        writer.setStyle('height','100%',editor.editing.view.document.getRoot())
                                    })
                                }} 
                                onChange={(event,editor)=> {
                                    const data=editor.getData()
                                    setAddBlog({ ...addBlog, description : data});
                                    console.log(description);
                                }}
                                >
                        </CKEditor>
                        { alert.err_list.status == false && alert.err_list.messages.description &&
                        <div className="notice warning_____">{alert.err_list.messages.description[0]}</div>}
                    </Form.Group>
                  <div className="d-grid gap-2">
                  {alert.err_list.status === true && <div className="noti">Thêm thành công</div>}
                      <Button variant="primary" size="sm" name='' type="submit">
                          Thêm blog
                      </Button>                     
                  </div>
                </Form>     
            </div>
    </div>
  )
}

export default AddBlog