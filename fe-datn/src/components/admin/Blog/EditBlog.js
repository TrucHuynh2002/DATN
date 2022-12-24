import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { url } from '../../url';

function EditBlog() {
    
    const {id_blog} = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const id_user = user[0].id
    const [editBlog, setEditBlog] = useState({
        name_blog:"",
        img_blog:[],
        name_img_blog:"",
        meta_keywords:"",
        description_sort:"",
        description:"",
    });
    // xu ly hinh anh
    const [uploadImages, setUploadImages] = useState([]);
    console.log(uploadImages[0])

    const [alert, setAlert] = useState({
        err_list: {},
    });

    const { name_blog, meta_keywords, img_blog, name_img_blog, description_sort, description } = editBlog;
  
    const handleChange = (e) => {
        setEditBlog({ ...editBlog, [e.target.name]: e.target.value});
    };
    
    const handleSumbit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData();
        dataForm.append('img_blog',uploadImages[0])
        dataForm.append('name_blog',name_blog);
        dataForm.append('meta_keywords',meta_keywords);
        dataForm.append('description_sort',description_sort);
        dataForm.append('description',description);
        dataForm.append('id_user',id_user);
        const res = await axios.post(`${url}/blog/update/${id_blog}?_method=PUT`, dataForm);
        console.log(res.data)
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
            const result = await axios.get(`${url}/blog/show/${id_blog}`);
            setEditBlog(result.data.data);
        }; 

  return (
    <div className="content">
        <div className="add-post">
            <h1 className="content_h1_admin">Cập nhật blog</h1>
                <Form onSubmit={(e) => handleSumbit(e)} encType="multipart/form-data">
                    <Form.Group className="mb-3" controlId="name_blog">
                        <Form.Label>Tên blog</Form.Label>
                        <Form.Control type="text" onChange={(e) => handleChange(e)} value={name_blog} name="name_blog"  />
                        { alert.err_list.status == false && alert.err_list.messages.name_blog &&
                        <div className="notice warning_____">{alert.err_list.messages.name_blog[0]}</div>}                       
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="img_blog">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control type="file" name="img_blog" onChange={(e) =>  setUploadImages(e.target.files)}/>
                        {
                            img_blog 
                            ? 
                            <div> 
                                <img src={img_blog} style={{margin:'18px 0'}} alt={name_blog} width={120} height={120} />
                            </div>
                            :
                            <div> <img src={img_blog} alt="images" width={120} height={120} /> </div>
                            
                        }
                        {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.img_blog[0]}</div>}
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
                                    setEditBlog({ ...editBlog, description : data});
                                }}
                                >
                        </CKEditor>
                        {alert.err_list.status == false && alert.err_list.messages.description &&
                        <div className="notice warning_____">{alert.err_list.messages.description[0]}</div>}
                    </Form.Group>
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