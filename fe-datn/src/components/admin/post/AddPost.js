import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPost() {

    const navigate = useNavigate();
    const [addPost, setAddPost] = useState({
        post_name: "",
        description_sort: "",
        description: "",
        meta_keyword: "",
        area: "",
        room_price: "",
        water_pirce: "",
        electricity_price: "",
        address: "",
        quantity: "",
        created_at: "",
        id_furniture: "",
        meta_title: "",
        meta_description: "",
        verification: "",
        status: "",
        id_user: "",
        id_roomType: "",
    });


    // });
    // const handleChange = (e) => {
    //     setAddPost({ ...addPost, [e.target.name]: e.target.value});
    // };

    const { post_name, description_sort, description, meta_keyword, area, room_price, water_pirce, electricity_price, address, quantity, created_at, id_furniture, meta_title, meta_description, verification, status, id_user, id_roomType } = addPost;

    const handleChange = (e) => {
        setAddPost({ ...addPost, [e.target.name]: e.target.value});
    };


    const handleSumbit = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:8000/api/post/create', addPost);
        // navigate("../list_post");
    };

  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm bài viết</h1>
            <Form onSubmit={(e) => handleSumbit(e)}>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="post_name">
                        <Form.Label>Tên bài viết</Form.Label>
                        <Form.Control type="text" name="post_name" className=''
                        value={post_name}
                        onChange = {(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description_sort">
                        <Form.Label>Mô tả ngắn</Form.Label>
                        <Form.Control type="text" name="description_sort" className=''
                        value={description_sort}
                        onChange = {(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" name="description" className='ckeditor' rows={3} 
                        value={description}
                        onChange = {(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_keywords">
                        <Form.Label>Từ khóa</Form.Label>
                        <Form.Control type="text" name="meta_keyword" className='' 
                        value={meta_keyword}
                        onChange = {(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="area">
                        <Form.Label>Diện tích</Form.Label>
                        <Form.Control type="text" name="area" className="" 
                        value={area}
                        onChange = {(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="room_price">
                        <Form.Label>Giá phòng</Form.Label>
                        <Form.Control type="text" name="room_price" className="" 
                        value={room_price}
                        onChange = {(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="water_pirce">
                        <Form.Label>Giá nước</Form.Label>
                        <Form.Control type="text" name="water_pirce" className="" 
                        value={water_pirce}
                        onChange = {(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="electricity_price">
                        <Form.Label>Giá điện</Form.Label>
                        <Form.Control type="text" name="electricity_price" className=""
                        value={electricity_price}
                        onChange = {(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type="text" name="address" className=""
                        value={address}
                        onChange = {(e) => handleChange(e)}/>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="quantity">
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control type="text" name="quantity" className=""
                        value={quantity}
                        onChange = {(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="created_at">
                        <Form.Label>Ngày đăng</Form.Label>
                        <Form.Control type="date" name="created_at" className=""
                        value={created_at}
                        onChange = {(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="id_furniture">Nội thất</Form.Label>
                        <Form.Select id="id_furniture" 
                        value={id_furniture}
                        onChange = {(e) => handleChange(e)}>
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_title">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="text" name="meta_title" className="" 
                        value={meta_title}
                        onChange = {(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_description">
                        <Form.Label>Mô tả tiêu đề</Form.Label>
                        <Form.Control as="textarea" name="meta_description" className="" rows={3} 
                        value={meta_description}
                        onChange = {(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="verification" 
                        value={verification}
                        onChange = {(e) => handleChange(e)}
                        >Xác thực</Form.Label>
                        <Form.Select id="verification" >
                            <option></option>
                            <option>Chưa xác thực</option>
                            <option>Đã xác thực</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="status" 
                        value={status}
                        onChange = {(e) => handleChange(e)}
                        >Trạng thái</Form.Label>
                        <Form.Select id="status">
                            <option></option>
                            <option>Chưa duyệt</option>
                            <option>Đã duyệt</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="id_user" 
                        value={id_user}
                        onChange = {(e) => handleChange(e)}
                        >ID user</Form.Label>
                        <Form.Select id="id_user">
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="id_roomType"
                        value={id_roomType}
                        onChange = {(e) => handleChange(e)}
                        >ID room type</Form.Label>
                        <Form.Select id="id_roomType">
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="sm" name='' type="submit">
                        Thêm bài viết
                    </Button>
                </div>
            </Row>
            </Form>

       </div>
    </div>
  )
}

export default AddPost