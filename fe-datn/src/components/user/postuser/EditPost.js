import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';

function EditPost() {
  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Cập nhật bài viết</h1>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="post_name">
                        <Form.Label>Tên bài viết</Form.Label>
                        <Form.Control type="text" name="post_name" className=''/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description_sort">
                        <Form.Label>Mô tả ngắn</Form.Label>
                        <Form.Control type="text" name="description_sort" className=''/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" name="description" className='ckeditor' rows={3}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_keyword">
                        <Form.Label>Từ khóa</Form.Label>
                        <Form.Control type="text" name="meta_keyword" className=''/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="area">
                        <Form.Label>Diện tích</Form.Label>
                        <Form.Control type="text" name="area" className=""/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="room_price">
                        <Form.Label>Giá phòng</Form.Label>
                        <Form.Control type="text" name="room_price" className=""/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="water_pirce">
                        <Form.Label>Giá nước</Form.Label>
                        <Form.Control type="text" name="water_pirce" className=""/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="electricity_price">
                        <Form.Label>Giá điện</Form.Label>
                        <Form.Control type="text" name="electricity_price" className=""/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type="text" name="address" className=""/>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="quantity">
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control type="text" name="quantity" className=""/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="created_at">
                        <Form.Label>Ngày đăng</Form.Label>
                        <Form.Control type="date" name="created_at" className=""/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="id_furniture">Nội thất</Form.Label>
                        <Form.Select id="id_furniture">
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_title">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="text" name="meta_title" className=""/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_description">
                        <Form.Label>Mô tả tiêu đề</Form.Label>
                        <Form.Control as="textarea" name="meta_description" className="" rows={3}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="verification">Xác thực</Form.Label>
                        <Form.Select id="verification">
                            <option></option>
                            <option>Chưa xác thực</option>
                            <option>Đã xác thực</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="status">Trạng thái</Form.Label>
                        <Form.Select id="status">
                            <option></option>
                            <option>Chưa duyệt</option>
                            <option>Đã duyệt</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="id_user">ID user</Form.Label>
                        <Form.Select id="id_user">
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="id_roomType">ID room type</Form.Label>
                        <Form.Select id="id_roomType">
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="sm" name='' className='' type="submit">
                        Thêm bài viết
                    </Button>
                </div>
            </Row>

       </div>
    </div>
  )
}

export default EditPost