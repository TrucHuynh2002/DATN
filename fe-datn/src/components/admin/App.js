import React, {useEffect} from 'react'
import { Container, Row } from 'react-bootstrap';
import { Outlet, navigator, useNavigate } from 'react-router-dom';
import NavAdmin from './NavAdmin';
import HeaderAdmin from './HeaderAdmin';
import FooterAdmin from './FooterAdmin';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const get_user = JSON.parse(localStorage.getItem('user'));
    console.log(get_user[0].id);
    if(get_user){
      if(get_user[0].role == 0 ){
        navigate('/');
      }
    }
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
