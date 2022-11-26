import React, {useEffect} from 'react'
import { Container, Row } from 'react-bootstrap';
import { Outlet, navigator, useNavigate } from 'react-router-dom';
import HeaderAdminUser from './HeaderAdminUser';
import NavAdminUser from './NavAdminUser';


function layout() {

  return (
   <>
      <Container fluid>
      <Row>
        {/* header */}
        <HeaderAdminUser />      
        {/* menu */}
        <NavAdminUser />  
        <Outlet />   
      </Row>
      </Container>

   </>
  )
}

export default layout