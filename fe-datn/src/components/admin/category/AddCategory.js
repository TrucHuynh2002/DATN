import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import  {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';

function AddCategory() {

    // const navigate = useNavigate();
    
    // if (localStorage.getItem('user')){
    //     const user = localStorage.getItem('user');
    //     if(user['role'] != 1 or user['role'] != 2 ){
    //         // Da no ra
    //     }
        
    // }else{
    //     // da no ra
    // }
    // this.setSate({
    //     name_category:"",
    // })
    //  this.handleEditorDataChange = this.handleEditorDataChange.bind( this );
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
            console.log(alert.err_list.messages.name_category[0])
        }
        // navigate("../list_category");  
        };

  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm danh mục </h1>
              <Form onSubmit={(e) => handleSumbit(e)}>
                  <Form.Group className="mb-3" controlId="name_category">
                    <Form.Label>Tên danh mục</Form.Label>
                    {/* <CKEditor
                        // name="name_category"
                        editor={ ClassicEditor }
                        content={this.state.name_category} 
                        data={name_category}
                        onChange={(e, editor ) => {
                            const data = editor.getData();
                            this.setState({
                                name_category: data
                              })
                              console.log( { e, editor, data } );
                           
                            console.log(data)
                        } }
                    /> */}
                      <Form.Control type="text" onChange={(e) => handleChange(e)} value={name_category} name="name_category" className=''/>
                      {alert.err_list.status === false && <span className="error">{alert.err_list.messages.name_category[0]}</span>}                   
                  </Form.Group>
                  <div className="d-grid gap-2">
                  {alert.err_list.status === true && <span className="noti">Thêm thành công</span>}
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