import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function AddPost() {

    const [name, setName] = useState([]);
    const [shortdescription, setShortdescription] = useState([]);
    const [description, setDescription] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [area, setArea] = useState([]);
    const [roomprice, setRoomprice] = useState([]);
    const [waterprice, setWaterprice] = useState([]);
    const [electricityprice, setElectricityprice] = useState([]);
    const [address, setAddress] = useState([]);
    const [amount, setAmount] = useState([]);
    const [date, setDate] = useState([]);
    const [title, setTitle] = useState([]);
    const [titledescription, setTitledescription] = useState([]);
    const [furniture, setFurniture] = useState([]);
    // const [confirm, setConfirm] = useState([]);
    // const [statuss, setStatuss] = useState([]);
    // const [iduser, setIduser] = useState([]);
    // const [idroom, setIdroom] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log({
        //     name,
        //     shortdescription,
        //     description,
        //     keywords,
        //     area,
        //     roomprice,
        //     waterprice,
        //     electricityprice,
        //     address,
        //     amount,
        //     date,
        //     title,
        //     titledescription,
        //     furniture,
        //     confirm,
        //     statuss,
        //     iduser,
        //     idroom
        // })

        axios.post('http://127.0.0.1:8000/api/furniture/create', {
                name: name,
                shortdescription: shortdescription,
                description:description,
                keywords:keywords,
                area:area,
                roomprice:roomprice,
                waterprice:waterprice,
                electricityprice:electricityprice,
                address:address,
                amount:amount,
                date:date,
                title:title,
                titledescription:titledescription,
                furniture:furniture
            })
            .then((res) => {
                console.log(res.data);
                this.props.history.push('/');
            })
            .catch((err) => {
                console.log(err);
            })

    }


  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm bài viết</h1>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="post_name">
                        <Form.Label>Tên bài viết</Form.Label>
                        <Form.Control type="text" name="post_name" className=''
                        value={name}
                        onChange = {e => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description_sort">
                        <Form.Label>Mô tả ngắn</Form.Label>
                        <Form.Control type="text" name="description_sort" className=''
                        value={shortdescription}
                        onChange = {e => setShortdescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" name="description" className='ckeditor' rows={3} 
                        value={description}
                        onChange = {e => setDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_keyword">
                        <Form.Label>Từ khóa</Form.Label>
                        <Form.Control type="text" name="meta_keyword" className='' 
                        value={keywords}
                        onChange = {e => setKeywords(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="area">
                        <Form.Label>Diện tích</Form.Label>
                        <Form.Control type="text" name="area" className="" 
                        value={area}
                        onChange = {e => setArea(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="room_price">
                        <Form.Label>Giá phòng</Form.Label>
                        <Form.Control type="text" name="room_price" className="" 
                        value={roomprice}
                        onChange = {e => setRoomprice(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="water_pirce">
                        <Form.Label>Giá nước</Form.Label>
                        <Form.Control type="text" name="water_pirce" className="" 
                        value={waterprice}
                        onChange = {e => setWaterprice(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="electricity_price">
                        <Form.Label>Giá điện</Form.Label>
                        <Form.Control type="text" name="electricity_price" className=""
                        value={electricityprice}
                        onChange = {e => setElectricityprice(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type="text" name="address" className=""
                        value={address}
                        onChange = {e => setAddress(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="quantity">
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control type="text" name="quantity" className=""
                        value={amount}
                        onChange = {e => setAmount(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="created_at">
                        <Form.Label>Ngày đăng</Form.Label>
                        <Form.Control type="date" name="created_at" className=""
                        value={date}
                        onChange = {e => setDate(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="id_furniture">Nội thất</Form.Label>
                        <Form.Select id="id_furniture" 
                        value={furniture}
                        onChange = {e => setFurniture(e.target.value)
                        }>
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_title">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="text" name="meta_title" className="" 
                        value={title}
                        onChange = {e => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_description">
                        <Form.Label>Mô tả tiêu đề</Form.Label>
                        <Form.Control as="textarea" name="meta_description" className="" rows={3} 
                        value={titledescription}
                        onChange = {e => setTitledescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="verification" 
                        // value={confirm}
                        // onChange = {e => setConfirm(e.target.value)}
                        >Xác thực</Form.Label>
                        <Form.Select id="verification" >
                            <option></option>
                            <option>Chưa xác thực</option>
                            <option>Đã xác thực</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="status" 
                        // value={statuss}
                        // onChange = {e => setStatuss(e.target.value)}
                        >Trạng thái</Form.Label>
                        <Form.Select id="status">
                            <option></option>
                            <option>Chưa duyệt</option>
                            <option>Đã duyệt</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="id_user" 
                        // value={iduser}
                        // onChange = {e => setIduser(e.target.value)}
                        >ID user</Form.Label>
                        <Form.Select id="id_user">
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="id_roomType"
                        // value={idroom}
                        // onChange = {e => setIdroom(e.target.value)}
                        >ID room type</Form.Label>
                        <Form.Select id="id_roomType">
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <div className="d-grid gap-2">
                    <Button  onClick={handleSubmit}>
                        Thêm bài viết
                    </Button>
                </div>
            </Row>

       </div>
    </div>
  )
}

export default AddPost