import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'
function EditAvata() {
    const [uploadImages, setUploadImages] = useState([]);
    const handleUpdateAvatar = (e) => {
        setUploadImages(e.target.files);
    }
    const handleSumbitData = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('avatar[]', uploadImages[0]);
        const res =  await axios.post(`http://127.0.0.1:8000/api/user/avatar/2?_method=PUT`, formData);
        if(res.data.status === true){
            // setAlert({
            //     err_list: res.data
            // });
            console.log(res);
        }
        else{
            console.log(res.data)           
            // setAlert({
            //     err_list: res
            // });
            
        }
    }
  return (
    <>
          <div>
                            <Form onSubmit={e => handleSumbitData(e)} encType="multipart/form-data">
                                <Form.Group className="mb-3" controlId="logo">
                                    <h3 style={{textAlign:"center", margin:"20px", fontSize:"20px"}}><b>Cập nhật ảnh đại diện</b></h3>
                                    <Form.Control type="file" name="avatar" className='' onChange={e => handleUpdateAvatar(e)}/>
                                </Form.Group>
                                <Button variant="primary" className='' name="" type="submit">Cập nhật</Button> 
                            </Form>        
                        </div>      
    </>
  )
}

export default EditAvata