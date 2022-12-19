import axios from 'axios';
import React, { useEffect, useState } from 'react';

function HeaderAdmin() {

  const [listConfig, setListConfig] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  // danh sach category
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/config/1');
    setListConfig(res.data.data);
  };

  return (
    <>
        <div className="nav-top">
          <div className="menu">
              <i className='bx bx-menu'></i>
          </div>
          <a href="/admin">
              <img src={listConfig.logo} alt="images" width="100%" />
          </a>
        </div>   
    </>
  )
}

export default HeaderAdmin