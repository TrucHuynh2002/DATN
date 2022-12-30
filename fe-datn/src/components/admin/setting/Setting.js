import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { url } from '../../url';
import { TabTitle } from '../../title';
import HashLoader from "react-spinners/HashLoader";

function Setting() {
  TabTitle('Cập nhật logo');
  const [loading, setLoading] = useState(false);
  const [listConfig, setListConfig] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  // xu ly loi
  const [alert, setAlert] = useState({
    err_list: {},
});
  const handleChangeImages = (e) => {
    setUploadImages(e.target.files)
}
  const handleSumbit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('logo[]',uploadImages[0])   
    const res = await axios.post(`${url}/config/update/logo/1?_method=PUT`, formData);
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
  setLoading(true)
  setTimeout(() => {
    setLoading(false)
  }, 3000)
  getData()
},[]);
  const getData = async () => {
   const result = await axios.get(`${url}/config`);
    setListConfig(result.data.data);
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
            <Form.Group className="mb-3" controlId="logo">
              <Form.Control type="file" name="logo" onChange={(e) => handleChangeImages(e)}/>
              {
              listConfig.logo
              ? 
              <img src={listConfig.logo} style={{margin:'18px 0',background: 'black'}} alt={listConfig.name_logo} width={120} height={120} />
              :
              <img src={listConfig} alt="images" width={120} height={120} />
              
            }
              {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.logo[0]}</div>}
            </Form.Group>
            {/* Thông báo */}
          
            {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
            <Button variant="primary" className='' name="" type="submit">Cập nhật</Button>   
          </Form>  
        </>
      }
    </> 
  )
}

export default Setting