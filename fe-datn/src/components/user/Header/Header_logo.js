import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../url';
function Header_logo() {
  const [listConfig, setListConfig] = useState([]);
  useEffect(() => {
    getData();
  },[]);
  // danh sach category
  const getData = async () => {
   const res = await axios.get(`${url}/config`);
    setListConfig(res.data.data);
  };
  return (
    <div className="col-lg-2 col-md-2 col-sm-6 logo_section">
    <div className="logo">
      <Link to="/">
        <img className="logo img-fluid" src={listConfig.logo} alt="#" />
      </Link>
    </div>
</div>
  )
}

export default Header_logo
