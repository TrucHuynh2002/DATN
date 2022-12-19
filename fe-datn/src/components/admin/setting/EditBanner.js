import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function EditBanner() {

  const {id_banner_config} = useParams();
  const [listBanner, setListBanner] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  // xu ly loi
  const [alert, setAlert] = useState({
    err_list: {},
  });
  useEffect(() => {
    getData();
  },[]);
  const handleChangeImages = (e) => {
    if(e.target.files){
      const fileArray = Array.from(e.target.files).map((file) => {setListBanner(URL.createObjectURL(file))});
      setUploadImages(e.target.files)
    }
  }

  const handleSumbit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
  
    formData.append('banner[]',uploadImages[0])
        
    const res = await axios.post(`http://127.0.0.1:8000/api/banner/update/${id_banner_config}?_method=PUT`, formData);
    
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


  // list banner
  const getData = async () => {
   const result = await axios.get(`http://127.0.0.1:8000/api/banner/show/${id_banner_config}`);
  setListBanner(result.data.data);
  };

  return (
    <>
     <Form onSubmit={(e) => handleSumbit(e)} encType="multipart/form-data">
      <Form.Group className="mb-3" controlId="slide">
        <Form.Control type="file" name="banner" onChange={(e) => handleChangeImages(e)}/>
        {
           listBanner.link_img_banner
            ? 
          <img src={listBanner.link_img_banner} alt={listBanner.name_banner} width={120} height={120} />
           :
           <img src={listBanner} alt="images" width={120} height={120} />
          
        }
      </Form.Group>
      {/* Thông báo  */}
      {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages}</div>}
      {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
      <Button variant="primary" name="" className='' type="submit">Cập nhật</Button>
      </Form>
    </>
  )
}

export default EditBanner