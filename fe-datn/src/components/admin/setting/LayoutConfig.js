import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavConfig from './NavConfig';
import { TabTitle } from '../../title';

function LayoutConfig() {
    TabTitle('Thiết lập cấu hình - Nhà Tui.com');
  return (
    <>
        <div className="content">
            <div className="add-post">
                <h1 className="content_h1_admin">Thiết lập cấu hình</h1>
                <Row>
                    <Col sm={2}>
                        <NavConfig />
                    </Col>
                    <Col sm={10}>
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </div>
    </>
  )
}

export default LayoutConfig