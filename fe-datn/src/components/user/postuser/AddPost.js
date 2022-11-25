import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

function AddPost() {
    
    // const navigate = useNavigate();
    const [addPost, setAddPost] = useState({
        post_name: "",
        description_sort: "",
        description: "",
        meta_keywords: "",
        area: "",
        room_price: "",
        water_price: "",
        electricity_price: "",
        address: "",
        quantity: "",
        created_at: "",
        id_furniture: "",
        meta_title: "",
        meta_description: "",
        verification: 1,
        status: 1,
        id_user: 2,
        id_roomType: "",
    });

    const { post_name, description_sort, description, meta_keyword, area, room_price, water_pirce, electricity_price, address, quantity, created_at, id_furniture, meta_title, meta_description, verification, status, id_user, id_roomType } = addPost;

    const handleChange = (e) => {
        setAddPost({ ...addPost, [e.target.name]: e.target.value});
    };

    // xu ly loi
    const [alert, setAlert] = useState({
        err_list: {},
    });

    const handleSumbit = async (e) => {
        e.preventDefault();
        const res =  await axios.post('http://127.0.0.1:8000/api/post/create', addPost);
        console.log(res);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
            });
            console.log(alert.err_list)
        }
        else{           
            setAlert({
                err_list: res.data
            });
        }
    };

    // đổ list roomtype
    const id_room_type = useParams();

    const [listRoomType, setListRoomType] = useState([]);

    useEffect(() => {
        getDataRoomType();
    },[]);

    const getDataRoomType = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/roomType/show');
        console.log(res);
        setListRoomType(res.data.data);
       };

    // đổ list nội thất
    const [listFurniture, setListFurniture] = useState([]);
  
    useEffect(() => {
        getDataFurniture();
    },[]);

    const getDataFurniture = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/furniture/show');  
          // console.log(res.data);
          setListFurniture(res.data.data);
      };


  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm bài viết</h1>
            <Form onSubmit={(e) => handleSumbit(e)} enctype="">
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="post_name">
                        <Form.Label>Tên bài viết</Form.Label>
                        <Form.Control type="text" name="post_name" className=''
                        value={post_name}
                        onChange = {(e) => handleChange(e)}/>
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.post_name[0]}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_title">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="text" name="meta_title" className="" 
                        value={meta_title}
                        onChange = {(e) => handleChange(e)}/>
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.meta_title[0]}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description_sort">
                        <Form.Label>Nội dung ngắn</Form.Label>
                        <Form.Control type="text" name="description_sort" className=''
                        value={description_sort}
                        onChange = {(e) => handleChange(e)}/>
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.description_sort[0]}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Nội dung</Form.Label>
                        <Form.Control as="textarea" name="description" className='ckeditor' rows={3} 
                        value={description}
                        onChange = {(e) => handleChange(e)}/>
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.description[0]}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="area">
                        <Form.Label>Diện tích</Form.Label>
                        <Form.Control type="text" name="area" className="" 
                        value={area}
                        onChange = {(e) => handleChange(e)}/>
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.area[0]}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="room_price">
                        <Form.Label>Giá phòng</Form.Label>
                        <Form.Control type="text" name="room_price" className="" 
                        value={room_price}
                        onChange = {(e) => handleChange(e)}/>
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.room_price[0]}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="water_pirce">
                        <Form.Label>Giá nước</Form.Label>
                        <Form.Control type="text" name="water_pirce" className="" 
                        value={water_pirce}
                        onChange = {(e) => handleChange(e)}/>
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.water_pirce[0]}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="electricity_price">
                        <Form.Label>Giá điện</Form.Label>
                        <Form.Control type="text" name="electricity_price" className=""
                        value={electricity_price}
                        onChange = {(e) => handleChange(e)}/>
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.electricity_price[0]}</span>}
                    </Form.Group> 
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="quantity">
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control type="text" name="quantity" className=""
                        value={quantity}
                        onChange = {(e) => handleChange(e)}/>
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.quantity[0]}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type="text" name="address" className=""
                        value={address}
                        onChange = {(e) => handleChange(e)}/>
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.address[0]}</span>}
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="created_at">
                        <Form.Label>Ngày đăng</Form.Label>
                        <Form.Control type="date" name="created_at" className="" value={created_at} onChange = {(e) => handleChange(e)}/>
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.created_at[0]}</span>}
                    </Form.Group> */}
                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Label htmlFor="id_furniture">Nội thất</Form.Label>
                        <div className='row'>
                            {listFurniture.map((furn, index) => {
                                return (
                                    <div className='col-md-3'>
                                        <Form.Check  type="checkbox" label={furn.name} name="" />
                                    </div>
                                );
                            })}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="img">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control type="file" name="img[]" multiple
                        onChange = {(e) => handleChange(e)} />
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.img[0]}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="id_roomType">Loại phòng</Form.Label>
                        <Form.Select id="id_roomType" value={id_roomType}
                        onChange = {(e) => handleChange(e)}>
                            {listRoomType.map((room, index) => {
                                return (
                                    <option>{room.name_room_type}</option>
                                );
                            })}                            
                            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_roomType[0]}</span>}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_keywords">
                        <Form.Label>Từ khóa - Seo</Form.Label>
                        <Form.Control type="text" name="meta_keyword" className='' 
                        value={meta_keyword}
                        onChange = {(e) => handleChange(e)}/>
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.meta_keyword[0]}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="meta_description">
                        <Form.Label>Mô tả tiêu đề - Seo</Form.Label>
                        <Form.Control as="textarea" name="meta_description" className="" rows={3} 
                        value={meta_description}
                        onChange = {(e) => handleChange(e)}/>
                        {alert.err_list.status === false && <span className="error">{alert.err_list.messages.meta_description[0]}</span>}
                    </Form.Group>
                </Col>
                <div className="d-grid gap-2">
                    {alert.err_list.status === true && <span className="noti">Thêm thành công</span>}
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