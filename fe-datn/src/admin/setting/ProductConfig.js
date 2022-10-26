import React from 'react'
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import NavConfig from './NavConfig';

function ProductConfig() {
  return (
    <div className="content">
      <div className="add-post">
        <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thiết lập cấu hình</h1>
        <Row>
          <Col sm={4}>
            <NavConfig />
          </Col>
          <Col sm={8}>
          <Table bordered>
            <thead>
            <tr>
                <th>#</th>
                <th>Tiêu đề</th>
                <th>Từ khóa chủ đề</th>
                <th>Vấn đề</th>
                <th>Điểm SEO</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                <td>
                    <img src="../img/logo_nhatro.png" alt="hình ảnh" style= {{ width:"100px", height:"100px" }} />
                 </td>
                <td>
                    <a href="123" className="a-td">Nhà trọ sinh viên</a>
                </td>
                <td>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Control type="text" className="" name="" placeholder="nhà trọ sinh viên" value="" />
                    </Form.Group>
                </td>
                <td>Cảnh báo</td>
                <td>
                    <Button variant="outline-primary" name="" className=''>90</Button>
                </td>
                </tr>
            </tbody>
            </Table>
            <Button variant="primary" type="submit" name="" className=''>Cập nhật</Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ProductConfig