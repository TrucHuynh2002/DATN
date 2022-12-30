import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { url } from '../../url';
import { TabTitle } from '../../title';
import HashLoader from "react-spinners/HashLoader";

function EditBanner() {
  TabTitle('Cập nhật banner');
  const [loading, setLoading] = useState(false);
  const {id_banner_config} = useParams();
  const [listBanner, setListBanner] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  // xu ly loi
  const [alert, setAlert] = useState({
    err_list: {},
  });
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
    getData()
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
    const res = await axios.post(`${url}/banner/update/${id_banner_config}?_method=PUT`, formData);
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
    const result = await axios.get(`${url}/banner/show/${id_banner_config}`);
    setListBanner(result.data.data);
  };

  return (
    <>
      {loading ? 
        <HashLoader className='' style={{marginTop:"500px"}}
        color={'#0d3380'}
        loading={loading}
        size={100}
        />
        :
        <>
          <Form onSubmit={(e) => handleSumbit(e)} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="slide">
              <Form.Control type="file" name="banner" onChange={(e) => handleChangeImages(e)}/>
              {
                listBanner.link_img_banner 
                ? 
              <div> <img src={listBanner.link_img_banner} style={{margin:'18px 0'}} alt={listBanner.name_banner} width={120} height={120} /></div>
                :
                <div> <img src={listBanner} alt="images" width={120} height={120} /></div>
                
              }
            </Form.Group>
            {/* Thông báo  */}
            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages}</div>}
            {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
            <Button variant="primary" name="" className='' type="submit">Cập nhật</Button>
          </Form>
        </>
      }
    </>
  )
}

export default EditBanner