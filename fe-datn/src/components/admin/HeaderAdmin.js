import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../url';

function HeaderAdmin() {

  const [listConfig, setListConfig] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  // danh sach category
  const getData = async () => {
   const res = await axios.get(`${url}/config/1`);
    setListConfig(res.data.data);
  };

  return (
    <>
        <div className="nav-top">
          <a href="/admin">
              <img src={listConfig.logo} alt="images" width="100%" />
          </a>
        </div>   
    </>
  )
}

export default HeaderAdmin