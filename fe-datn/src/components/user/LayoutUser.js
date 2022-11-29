import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from '../user/Header/Header';

function LayoutUser() {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  )
}

export default LayoutUser