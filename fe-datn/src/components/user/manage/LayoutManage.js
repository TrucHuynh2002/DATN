import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ListManageRoom from './ListManageRoom';
import TableManageRoom from './TableManageRoom';

function LayoutManage() {
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2 className="b_title">Quản lý phòng</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="manage">
            <div className="container">
                 <Row>
                    <Col sm={4}>
                        <ListManageRoom />
                    </Col>
                    <Col sm={8}>                       
                        <TableManageRoom />
                    </Col>
                </Row>
            </div>
        </div> 
    </>
  )
}

export default LayoutManage