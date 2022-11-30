import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function EditBanner() {

  const {id_banner_config} = useParams();
  const [listBanner, setListBanner] = useState({
    banner:[],
    link_img_banner:"",
  });

  const [uploadImages, setUploadImages] = useState([]);
  // xu ly loi
  const [alert, setAlert] = useState({
    err_list: {},
});

  const {banner, link_img_banner} = listBanner;

  const handleChangeImages = (e) => {
      
    let formData = new FormData();
    if(e.target.files){
    const fileArray = Array.from(e.target.files).map((file) => {URL.createObjectURL(file)});
    // console.log(fileArray)
    setUploadImages(e.target.files)
    console.log(e.target.files);
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
    const res = await axios.put(`http://127.0.0.1:8000/api/banner/update/${id_banner_config}`, listBanner);
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
};

useEffect(() => {
  getData();
},[]);

  // list banner
  const getData = async () => {
   const result = await axios.get(`http://127.0.0.1:8000/api/banner/show/${id_banner_config}`);
  //  console.log(result);
  setListBanner(result.data.data);
  };

  return (
    <>
     <Form onSubmit={(e) => handleSumbit(e)} encType="multipart/form-data">
      <Form.Group className="mb-3" controlId="slide">
        <Form.Control type="file" name="banner[]" multiple onChange={(e) => handleChangeImages(e)}/>
      </Form.Group>
      {/* Thông báo  */}
      {alert.err_list.status === false && <span className="error">{alert.err_list.messages.banner[0]}</span>}
      {alert.err_list.status === true && <span className="noti">Cập nhật thành công</span>}
      <Button variant="primary" name="" className='' type="submit">Cập nhật</Button>
      </Form>
    </>
  )
}

export default EditBanner