import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Setting() {

  const [listConfig, setListConfig] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  // xu ly loi
  const [alert, setAlert] = useState({
    err_list: {},
});


  const handleChangeImages = (e) => {
      
    // let formData = new FormData();
    // if(e.target.files){
    // const fileArray = Array.from(e.target.files).map((file) => {URL.createObjectURL(file)});
    // console.log(fileArray)
    setUploadImages(e.target.files)
    console.log(e.target.files);
    // Array.from(e.target.file).map(file => {
    //     // console.log(file)
    //     setAddPost({...uploadImages, file})
    // })
// }
}

  const handleSumbit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
        // formData.append('img[]', Array(uploadImages));
      
        formData.append('logo[]',uploadImages[0])
        
    const res = await axios.post(`http://127.0.0.1:8000/api/config/update/logo/1?_method=PUT`, formData);
    // console.log(res)
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
  getData();
},[]);

  // list config
  const getData = async () => {
   const result = await axios.get("http://127.0.0.1:8000/api/config");
   
    setListConfig(result.data.data);
    // console.log(setListConfig);
  };


  return (
    <>     
      <Form onSubmit={(e) => handleSumbit(e)} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="logo">
          <Form.Control type="file" name="logo" onChange={(e) => handleChangeImages(e)}/>
        </Form.Group>
        {/* Thông báo */}
        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.logo[0]}</span>}
        {alert.err_list.status === true && <span className="noti">Cập nhật thành công</span>}
        <Button variant="primary" className='' name="" type="submit">Cập nhật</Button>   
      </Form>  
    </> 
  )
}

export default Setting