import {React,useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from '../user/Header/Header';
import axios from 'axios';

function LayoutUser() {
  useEffect(() => {
    getData();
  },[])
  const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/view_index/update_view`);
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