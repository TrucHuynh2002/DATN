import React, {useEffect} from 'react'
import { Container, Row } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import NavAdmin from './NavAdmin';
import HeaderAdmin from './HeaderAdmin';
import FooterAdmin from './FooterAdmin';
import axios from 'axios';

function App() {
  const navigate = useNavigate();
  const checkAdmin = async () => {
    const get_user = JSON.parse(localStorage.getItem('user'));
    if(get_user){
      const res = await axios.get("http://127.0.0.1:8000/api/user/show/"+get_user[0].id);
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
