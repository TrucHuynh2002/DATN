import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Notify from '../Notify';
import axios from 'axios';

function HeaderNavLink() {
    var user = JSON.parse(localStorage.getItem("user"));
    // const handleSumbit = async (e) => {
    //     localStorage.removeItem("user");
    // }
    // xu ly add post
    const get_user = JSON.parse(localStorage.getItem('user'));
        const [addPost, setAddPost] = useState({
            post_name: "",
            phone: "",
            description_sort: "",
            description: "",
            area: "",
            room_price: "",
            water_price: "",
            electricity_price: "",
            address: "",
            quantity: "",
            id_furniture: [],
            meta_title: "",
            meta_description: "",
            meta_keywords: "",
            id_user: 1,
            id_roomType: "",
            img: [],
        });
        const { 
            post_name, phone,
            description_sort,
            description,
            area,
            room_price,
            water_price,
            electricity_price,
            address,
            quantity,
            id_furniture,
            meta_title,
            meta_description,
            meta_keywords,
            id_user,
            id_roomType,
            img,
            } = addPost;
           // xu ly loi
           const [alert, setAlert] = useState({
            err_list: {
                messages: "",
                status: ""
            },
        });
        
        const [uploadImages, setUploadImages] = useState([]);
        // Xử lý input vlaue
        const handleChange = (e) => {
            setAddPost({ ...addPost, [e.target.name]: e.target.value});
        };
        // Lấy nội thất
        const [checkFur, setFur] = useState([]);
        const [furniture, setfuriture] = useState([]);
        const get_furnitures = async () => {
            var  get_data = await axios.get('http://127.0.0.1:8000/api/furniture/show');
            setfuriture(get_data.data.data)
        };
        useEffect(() => {
            get_furnitures();
        },[]);
    
        // Lấy roomtype
        const [listRoomType, setListRoomType] = useState([]);
      
        const getDataRoomType = async () => {
            const res = await axios.get('http://127.0.0.1:8000/api/roomType/show');
            setListRoomType(res.data.data);
            };
    
            useEffect(() => {
                getDataRoomType();
            },[]);
    
        
        const handle_idFuniture =  (e) => {     
            if(e.target.checked){
                setFur(pre => {
                   return  [...pre, e.target.value]
                });
            }
            else{
                setFur(pre => {
                    return [...pre.filter(check => check !== e.target.value) ]
                })           
            }      
        }
    
        const handleChangeImages = (e) => {
          
            let formData = new FormData();
            if(e.target.files){
            const fileArray = Array.from(e.target.files).map((file) => {   URL.createObjectURL(file)});
            setUploadImages(e.target.files)
        }
        }     
        const handleSumbit = async (e) => {
            e.preventDefault();
            localStorage.removeItem("user");
            let formData = new FormData();
            for(let i = 0; i<uploadImages.length; i++) {
                formData.append('img[]',uploadImages[i])
            }
            formData.append('post_name', post_name);
            formData.append('address', address);
            formData.append('area',area);
            formData.append('description', description);
            formData.append('description_sort', description_sort);
            formData.append('electricity_price', electricity_price);
            formData.append('id_roomType', id_roomType);
            formData.append('id_user', id_user);
            formData.append('meta_keywords', meta_keywords);
            formData.append('meta_description', meta_description);
            formData.append('meta_title', meta_title);
            // formData.append('phone', phone);
            formData.append('quantity', quantity);
            formData.append('room_price', room_price);
            formData.append('water_price', water_price);
            formData.append('id_furniture', Array(checkFur));
            const res =  await axios.post('http://127.0.0.1:8000/api/post/create', formData);
            if(res.data.status === true){
                setAlert({
                    err_list: res.data
                });
            }
            else{
                console.log(res.data)           
                setAlert({
                    err_list: res
                });
            }
        };

    // modal post
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
            <ul className="navbar-nav mr-auto header-ul" id="navbarExample04">
            <li className="nav-item ">
                <Link className="nav-link" to="">
                Trang chủ
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="about">
                Giới thiệu
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="room">
                Phòng
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="gallery">
                Nổi bật
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="blog">
                Blog
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="contact">
                Liên hệ
                </Link>
            </li>
            <li className="nav-item">
                <div className="btn-group" >
                   <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
                        style={{color: 'black', fontSize:'1.8em',border: 'none'}} >
                        <i className='bx bx-bell'></i>
                    </div>
                   <Notify />
                </div>
            </li>
            <li className="nav-item">
                <Button variant="warning" style={{color: 'black', fontWeight: 600, backgroundColor: '#ffc70d',borderRadius: '5px'}} onClick={handleShow}>
                    Đăng bài
                </Button>
                {/* <div className="btn-group">
                    <Link className="nav-link btn btn-warning" style={{color: 'black', fontWeight: 600, backgroundColor: '#ffc70d',borderRadius: '5px'}} to="addpost">
                    Đăng bài
                    </Link>
                </div> */}
            </li>
            {/* start Đăng bài */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Bài viết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={(e) => handleSumbit(e)} encType="multipart/form-data">
                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-3 post_name">
                                <Form.Label>Tên bài viết</Form.Label>
                                <Form.Control type="text" name="post_name" className=''
                                value={post_name}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && 
                                <span className="error">
                                {alert.err_list.messages.post_name[0]}
                                </span>}
                            </Form.Group>
                            <Form.Group className="mb-3 meta_title">
                                <Form.Label>Tiêu đề bài viết</Form.Label>
                                <Form.Control type="text" name="meta_title" className=''
                                value={meta_title}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && 
                                <span className="error">
                                {alert.err_list.messages.meta_title[0]}
                                </span>}
                            </Form.Group>
                            <Form.Group className="mb-3 img">
                                <Form.Label>Hình ảnh</Form.Label>
                                <Form.Control type="file" name="img" multiple
                                onChange = {(e) => handleChangeImages(e)} />
                                {/* {alert.err_list.status === false && <span className="error">{alert.err_list.messages.img[0]}</span>} */}
                                <div className='row'>
                                    
                                </div>
                            </Form.Group>
                            
                            <Form.Group className="mb-3 phone">
                                <Form.Label>Số điện thoại liên hệ</Form.Label>
                                <Form.Control type="text" name="phone" className=''
                                value={phone}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.description_sort[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 description_sort">
                                <Form.Label>Nội dung ngắn</Form.Label>
                                <Form.Control type="text" name="description_sort" className=''
                                value={description_sort}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.description_sort[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 description">
                                <Form.Label>Nội dung</Form.Label>
                                <Form.Control as="textarea" name="description" className='ckeditor' rows={3} 
                                value={description}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.description[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 room_price">
                                <Form.Label>Giá phòng</Form.Label>
                                <Form.Control type="number" name="room_price" className="" 
                                value={room_price}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.room_price[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 water_price">
                                <Form.Label>Giá nước</Form.Label>
                                <Form.Control type="number" name="water_price" className="" 
                                value={water_price}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.water_pirce[0]}</span>}
                            </Form.Group>                   
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-3 electricity_price">
                                <Form.Label>Giá điện</Form.Label>
                                <Form.Control type="text" name="electricity_price" className=""
                                value={electricity_price}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.electricity_price[0]}</span>}
                            </Form.Group> 
                            <Form.Group className="mb-3 address">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type="text" name="address" className=""
                                value={address}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.address[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 area">
                                <Form.Label>Diện tích</Form.Label>
                                <Form.Control type="text" name="area" className="" 
                                value={area}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.area[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 quantity">
                                <Form.Label>Số lượng</Form.Label>
                                <Form.Control type="number" name="quantity" className=""
                                value={quantity}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.quantity[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 formGridCheckbox">
                                <Form.Label >Nội thất</Form.Label>
                                <div className='row' style={{marginLeft:"10px",alginItem:"center"}}>
                                    {furniture.map((data,index) => {
                                        return (
                                                <div className="col-md-3" key={index}>
                                                    <Form.Check  type="checkbox" name="id_furniture" value={data.id_furniture} onChange = {(e) => handle_idFuniture(e)} />
                                                    <Form.Label>{data.name}</Form.Label>
                                                </div>
                                            
                                        )
                                    })}
                                </div>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.furniture[0]}</span>}
                            </Form.Group>      
                            <Form.Group className="mb-3">
                                <Form.Label >Loại phòng</Form.Label>
                                <Form.Select name="id_roomType" 
                                onChange = {(e) => handleChange(e)}>
                                    {listRoomType.map((room, index) => {
                                        return (
                                            <option key={index} value={room.id_room_type} >{room.name_room_type}</option>
                                        );
                                    })}                            
                                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_roomType[0]}</span>}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3 meta_keywords">
                                <Form.Label>Từ khóa - Seo</Form.Label>
                                <Form.Control type="text" name="meta_keywords" className='' 
                                value={meta_keywords}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.meta_keywords[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 meta_description">
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* end Đăng bài */}
            <li className="nav-item">
                {!localStorage.getItem('user') ?
                <div className="btn-group">
                    <button type="button" className="btn btn-warning " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: 'black', fontWeight: 600, backgroundColor: '#ffc70d',borderRadius: '5px'}}>TÀI KHOẢN</button>
                    <div className="dropdown-menu" style={{zIndex:"1001",padding:"10px"}}>
                        <Link className="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} to="login">Đăng nhập</Link>
                        <Link className="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} to="signin">Đăng ký</Link>
                    </div>
                </div>
                : 
                <div className="btn-group">
                    <button type="button" className="btn btn-warning " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: 'black', fontWeight: 600, backgroundColor: '#ffc70d',borderRadius: '5px'}}>{user[0].fullname}</button>
                    <div className="dropdown-menu" style={{zIndex:"1001",padding:"10px"}}>
                        <Link className="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} to={`profile/${user[0].id}`}>Thông tin tài khoản</Link>
                        <form  onSubmit={(e) => handleSumbit(e)}>
                            <button className="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} type="submit">Đăng xuất</button>
                        </form>                       
                    </div>
                </div> }
            </li>
        </ul>
    </>
  )
}

export default HeaderNavLink
