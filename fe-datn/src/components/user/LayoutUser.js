import axios from 'axios';
import { React, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../user/Header/Header';
import Footer from './Footer';
import { url } from '../url';
import { TabTitle } from '../title';

function LayoutUser() {
  TabTitle('Tìm trọ sinh viên');
  useEffect(() => {
    getData();
  },[])
  const getData = async () => {
    const res = await axios.get(`${url}/view_index/update_view`);
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