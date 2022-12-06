import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';



function AddPost() {
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
            // console.log(fileA)
            setUploadImages(e.target.files)
                    // console.log(e.target.files)
            // Array.from(e.target.file).map(file => {
            //     // console.log(file)
            //     setAddPost({...uploadImages, file})
            // })
        }
        }
      
        const handleSumbit = async (e) => {
            e.preventDefault();
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

      return (
        <div className="content">
            <div className="add-post">
                <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm bài viết</h1>
                <Form onSubmit={(e) => handleSumbit(e)} encType="multipart/form-data">
                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-3 post_name">
                                <Form.Label>Tên bài viết</Form.Label>
                                <Form.Control type="text" name="post_name" className=''
                                value={post_name}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && 
                                <div className="notice warning_____">
                                {alert.err_list.messages.post_name[0]}
                                </div>}
                            </Form.Group>
                            <Form.Group className="mb-3 meta_title">
                                <Form.Label>Tiêu đề bài viết</Form.Label>
                                <Form.Control type="text" name="meta_title" className=''
                                value={meta_title}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && 
                                <div className="notice warning_____">
                                {alert.err_list.messages.meta_title[0]}
                                </div>}
                            </Form.Group>
                            <Form.Group className="mb-3 img">
                                <Form.Label>Hình ảnh</Form.Label>
                                <Form.Control type="file" name="img" multiple
                                onChange = {(e) => handleChangeImages(e)} />
                                {/* {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.img[0]}</div>} */}
                                <div className='row'>
                                    
                                </div>
                            </Form.Group>
                            
                            <Form.Group className="mb-3 phone">
                                <Form.Label>Số điện thoại liên hệ</Form.Label>
                                <Form.Control type="text" name="phone" className=''
                                value={phone}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.description_sort[0]}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3 description_sort">
                                <Form.Label>Nội dung ngắn</Form.Label>
                                <Form.Control type="text" name="description_sort" className=''
                                value={description_sort}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.description_sort[0]}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3 description">
                                <Form.Label>Nội dung</Form.Label>
                                <Form.Control as="textarea" name="description" className='ckeditor' rows={3} 
                                value={description}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.description[0]}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3 room_price">
                                <Form.Label>Giá phòng</Form.Label>
                                <Form.Control type="number" name="room_price" className="" 
                                value={room_price}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.room_price[0]}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3 water_price">
                                <Form.Label>Giá nước</Form.Label>
                                <Form.Control type="number" name="water_price" className="" 
                                value={water_price}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.water_pirce[0]}</div>}
                            </Form.Group>                   
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-3 electricity_price">
                                <Form.Label>Giá điện</Form.Label>
                                <Form.Control type="text" name="electricity_price" className=""
                                value={electricity_price}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.electricity_price[0]}</div>}
                            </Form.Group> 
                            <Form.Group className="mb-3 address">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type="text" name="address" className=""
                                value={address}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.address[0]}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3 area">
                                <Form.Label>Diện tích</Form.Label>
                                <Form.Control type="text" name="area" className="" 
                                value={area}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.area[0]}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3 quantity">
                                <Form.Label>Số lượng</Form.Label>
                                <Form.Control type="number" name="quantity" className=""
                                value={quantity}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.quantity[0]}</div>}
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
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.furniture[0]}</div>}
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
                                    {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.id_roomType[0]}</div>}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3 meta_keywords">
                                <Form.Label>Từ khóa - Seo</Form.Label>
                                <Form.Control type="text" name="meta_keywords" className='' 
                                value={meta_keywords}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.meta_keywords[0]}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3 meta_description">
                                <Form.Label>Mô tả tiêu đề - Seo</Form.Label>
                                <Form.Control as="textarea" name="meta_description" className="" rows={3} 
                                value={meta_description}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.meta_description[0]}</div>}
                            </Form.Group>
                        </Col>
                        <div className="d-grid gap-2">
                            {alert.err_list.status === true && <div className="notice success_____">Thêm thành công</div>}
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