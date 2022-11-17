import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavAdminUser from './NavAdminUser';
import HeaderAdminUser from './HeaderAdminUser';

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