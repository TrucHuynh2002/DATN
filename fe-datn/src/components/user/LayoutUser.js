import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from '../user/Header/Header';
import  { useEffect, useState } from 'react';
import axios from 'axios';

function LayoutUser() {
  useEffect(() => {
    updateView();
},[]);
  const updateView = async () => {
    const update= await axios.put(`http://127.0.0.1:8000/api/updateViewIndex/`);
    // console.log(update)
}
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  )
}

export default LayoutUser