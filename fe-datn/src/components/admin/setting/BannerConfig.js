import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

function BannerConfig() {
  const [navConfig, setEditConfig] = useState({
    banner:[],
  });
  const [listConfig, setListConfig] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  // xu ly loi
  const [alert, setAlert] = useState({
    err_list: {},
});

  const {banner} = navConfig;

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
    const res = await axios.put("http://127.0.0.1:8000/api/config/update", navConfig);
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

useEffect(() => {
  getData();
},[]);

  // list config
  const getData = async () => {
   const result = await axios.get("http://127.0.0.1:8000/api/config/banner");
  //  console.log(result);
  setListConfig(result.data.data);
  };
  return (
    <>
      <Form.Group className="mb-3" controlId="slide" encType="multipart/form-data">
        <Form.Label>Slide</Form.Label>
        {listConfig.map((cate, index) => {
          return (
            <img src={cate.link_img_banner} alt="images" style={{width:'100px',height:'70px',margin:"20px"}}></img>
          );
        })}
        <Form.Control type="file" name="banner[]" multiple onChange={(e) => handleChangeImages(e)}/>
      </Form.Group>
      {/* Thông báo  */}
      {alert.err_list.status === false && <span className="error">{alert.err_list.messages.banner[0]}</span>}
      {alert.err_list.status === true && <span className="noti">Cập nhật thành công</span>}
      <Button variant="primary" name="" className='' type="submit">Cập nhật</Button>
    </>
  )
}

export default BannerConfig