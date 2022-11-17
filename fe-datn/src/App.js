import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavAdmin from './components/admin/NavAdmin';
import HeaderAdmin from './components/admin/HeaderAdmin';


function App() {
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
      </Row>
      </Container>

    </>
  );
}

export default App;
