import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function Setting() {

  const {id_config} = useParams();

  const [navConfig, setEditConfig] = useState({
    logo:"",
  });

  // xu ly loi
  const [alert, setAlert] = useState({
    err_list: {},
});

  const {logo} = navConfig;

  const handleChange = (e) => {
    setEditConfig({ ...navConfig, [e.target.name]: e.target.value });
}; 

  const handleSumbit = async (e) => {
    e.preventDefault();
    const res = await axios.put(`http://127.0.0.1:8000/api/config/update/${id_config}`, navConfig);
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
    }
    // navigate("../list_category");
};

useEffect(() => {
  getData();
},[]);

  // list config
  const getData = async () => {
   const result = await axios.get(`http://127.0.0.1:8000/api/config/${id_config}`);
   console.log(result);
   setEditConfig(result.data.data);
  };


  return (
    <>     
      <Form onSubmit={(e) => handleSumbit(e)}>
        <Form.Group className="mb-3" controlId="logo">
          <Form.Label>Logo</Form.Label>
          <img src="https://images3.content-hci.com/commimg/myhotcourses/blog/post/myhc_94121.jpg" alt="#" style={{width:'100px',margin:"20px"}}></img>
          <Form.Control type="text" name="logo" onChange={(e) => handleChange(e)} value={logo} className=''/>
        </Form.Group>
        {/* Thông báo  */}
        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.logo[0]}</span>}
        {alert.err_list.status === true && <span className="noti">Cập nhật thành công</span>}
        <Button variant="primary" className='' name="" type="submit">Cập nhật</Button>   
      </Form>  
    </> 
  )
}

export default Setting