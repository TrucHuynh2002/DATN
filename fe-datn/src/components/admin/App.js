import axios from 'axios';
import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import FooterAdmin from './FooterAdmin';
import HeaderAdmin from './HeaderAdmin';
import NavAdmin from './NavAdmin';
import { url } from '../url';
import { TabTitle } from '../title';

function App() {
  TabTitle('Admin - Nhà Tui.com');
  const navigate = useNavigate();
  const checkAdmin = async () => {
    const get_user = JSON.parse(localStorage.getItem('user'));
    if(get_user){
      const res = await axios.get(`${url}/user/show/`+get_user[0].id);
      if(res.data.status === true){
        const user_data = res.data.data;
        if(user_data[0].role != 2){
          navigate('/Loi');
          // navigate('/');
        }
      }
    }else{
      navigate('/Loi');
    }
  }
  useEffect(() => {
    checkAdmin();
  },[])
  return (
    <>
      <Container fluid>
        <Row>
          {/* header */}
          <HeaderAdmin />
          {/* menu */}
          <NavAdmin />
          {/* content */}
          <Outlet />
          <FooterAdmin />
        </Row>
      </Container>

    </>
  );
}

export default App;
