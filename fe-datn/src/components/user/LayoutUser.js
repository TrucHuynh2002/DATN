import axios from 'axios';
import { React, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../user/Header/Header';
import Footer from './Footer';
import { url } from '../url';

function LayoutUser() {
  useEffect(() => {
    getData();
  },[])
  const getData = async () => {
    const res = await axios.get(`${url}/view_index/update_view`);
    console.log(res.data)
  };
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  )
}

export default LayoutUser