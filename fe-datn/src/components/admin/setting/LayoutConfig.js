import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavConfig from './NavConfig';

function LayoutConfig() {
  return (
    <>
        <div className="content">
            <div className="add-post">
                <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thiết lập cấu hình</h1>
                <Row>
                    <Col sm={4}>
                        <NavConfig />
                    </Col>
                    <Col sm={8}>                   
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </div>
    </>
  )
}

export default LayoutConfig