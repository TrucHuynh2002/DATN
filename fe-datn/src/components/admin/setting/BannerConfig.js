import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BannerConfig() {
  const [uploadImages, setUploadImages] = useState([]);
  // console.log(uploadImages[0])
  const [oldImage,setOldImage] = useState([
  ]);
  console.log(oldImage);
  // xu ly loi
  const [alert, setAlert] = useState({
    err_list: {},
});

  // const {banner} = navConfig;

  const handleChangeImages = (e) => {
    if(e.target.files){
      const fileArray = Array.from(e.target.files).map((file) => {
        setOldImage({...oldImage,[e.target.name]:URL.createObjectURL(file)})
      });
      // console.log(e.target.files)
      setUploadImages([ ,e.target.files[0]])
      
      // console.log(e.target.files);
      // Array.from(e.target.file).map(file => {
      //     // console.log(file)
      //     setAddPost({...uploadImages, file})
      // })
  }
}

  const handleSumbit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
        // formData.append('img[]', Array(uploadImages));
        for(let i = 0; i<uploadImages.length; i++) {
            formData.append('banner[]',uploadImages[i])
        }
    const res = await axios.put("http://127.0.0.1:8000/api/config/update", formData);
    // console.log(res)
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
    }
    // navigate("../list_category");
};

  return (
    <>
      <Form  encType="multipart/form-data" >
        <Form.Group className="mb-3" controlId="slide">
          <Form.Label>Slide 1</Form.Label>
          
          <Form.Control type="file" name="banner1" multiple onChange={(e) => handleChangeImages(e)}/>
          {oldImage['banner1'] && <img src={oldImage['banner1']} />}
        </Form.Group>
        <Form.Group className="mb-3" controlId="slide">
          <Form.Label>Slide 2</Form.Label>
          
          <Form.Control type="file" name="banner2" multiple onChange={(e) => handleChangeImages(e)}/>
          {oldImage['banner2'] && <img src={oldImage['banner2']} />}
        </Form.Group>
        <Form.Group className="mb-3" controlId="slide">
          <Form.Label>Slide 3</Form.Label>
          
          <Form.Control type="file" name="banner3" multiple onChange={(e) => handleChangeImages(e)}/>
          {oldImage['banner3'] && <img src={oldImage['banner3']} />}
        </Form.Group>
        {/* Thông báo  */}
        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.logo[0]}</span>}
        {alert.err_list.status === true && <span className="noti">Cập nhật thành công</span>}
        <Button variant="primary" name="" className='' type="submit">Cập nhật</Button>
      </Form>
    </>
  )
}

export default BannerConfig