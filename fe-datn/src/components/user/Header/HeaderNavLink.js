import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import Notify from '../Notify';
import axios from 'axios';
import {CKEditor} from  '@ckeditor/ckeditor5-react'
import ClassicEditor from  '@ckeditor/ckeditor5-build-classic'
function HeaderNavLink() {
    // CKEditor.replace('description')
    var user = JSON.parse(localStorage.getItem("user"));
    // console.log(user[0].id)
    // const navigate = useNavigate();
    const handleSLogout = async (e) => {
        localStorage.removeItem("user");
        window.location.reload();
    }
    // xu ly add post
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
            ifarme:"",
            quantity: "",
            id_furniture: [],
            meta_title: "",
            meta_description: "",
            meta_keywords: "",
            id_province : "",
            id_district : "",
            id_ward : "",
            id_user: "",
            id_roomType: "",
            img: [],
        });
        const { 
            post_name,
            phone,
            description_sort,
            description,
            area,
            room_price,
            water_price,
            electricity_price,
            address,
            ifarme,
            quantity,
            id_furniture,
            meta_title,
            meta_description,
            meta_keywords,
            id_province ,
            id_district ,
            id_ward ,
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
        // Xử lý input vlaue
        const handleChange = async (e) => {
            setAddPost({ ...addPost, [e.target.name] : e.target.value});
        }
        const handledistrice = async (e) => {
            setAddPost({ ...addPost, [e.target.name] : e.target.value});
            getDataDistrict(({[e.id_province] : e.target.value}).undefined)
        }
       
        const handleadd = async (e) => {
            getDataWard(({[e.id_district] : e.target.value}).undefined)
            setAddPost({ ...addPost, [e.target.name] : e.target.value});
        }
        const handssdbdfb = async (e) => {
            setAddPost({ ...addPost, [e.target.name] : e.target.value});
        }
        // Lấy nội thất
        const [checkFur, setFur] = useState([]);
        const [furniture, setfuriture] = useState([]);
        const get_furnitures = async () => {
            var  get_data = await axios.get('http://127.0.0.1:8000/api/furniture/show');
            setfuriture(get_data.data.data)
        };
        useEffect(() => {
            getDataProvince();
            getDataRoomType();
            get_furnitures();
            getData();
        },[]);
    
        // lấy tỉnh 
        const [listProvince, setListProvince] = useState([]);
        const [listDistrict, setListDistrict] = useState([]);
        const [listWard, setListWard] = useState([]);
        const getDataProvince = async () => {
            const res = await axios.get('http://127.0.0.1:8000/api/post/show_province');
            setListProvince(res.data.data);
        }
        const getDataDistrict = async (id_province) => {
            const ress = await axios.get(`http://127.0.0.1:8000/api/post/show_district/${id_province}`);
            setListDistrict(ress.data.data);
        }
        const getDataWard = async (id_district) => {
            const resss = await axios.get(`http://127.0.0.1:8000/api/post/show_ward/${id_district}`);
            setListWard(resss.data.data);
        }     
         // Lấy roomtype
        const [listRoomType, setListRoomType] = useState([]);
        const getDataRoomType = async () => {
            const res = await axios.get('http://127.0.0.1:8000/api/roomType/show');
            setListRoomType(res.data.data);
            };
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
        // xử lý hình ảnh 
        const [uploadImages, setUploadImages] = useState([]);
        const handleChangeImages = (e) => {
            let formData = new FormData();
            if(e.target.files){
            const fileArray = Array.from(e.target.files).map((file) => {URL.createObjectURL(file)});
            setUploadImages(e.target.files)
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
            formData.append('id_user', user[0].id);
            formData.append('id_province', id_province);
            formData.append('id_district', id_district);
            formData.append('id_ward', id_ward);
            formData.append('ifarme', ifarme);
            formData.append('meta_keywords', meta_keywords);
            formData.append('meta_description', meta_description);
            formData.append('meta_title', meta_title);
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
    const navigate = useNavigate();
    const handleShow = () => {
        const get_user = JSON.parse(localStorage.getItem('user'));
            // console.log(get_user)
        if(get_user){
            setShow(true);
        }else {
            navigate('/Loi');
        }
    };

    // list category
    const id_category = useParams();
    const [listCategory, setListCategory] = useState([]);
    const getData = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/category/show');
           setListCategory(res.data.data);
    };

    // function uploadAdapterPlugin(editor) {
    //     editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
    //       new UploadAdapter(loader)
    //   }

  return (
    <div class="collapse navbar-collapse"  id="navbarExample04">
        <ul className="navbar-nav" >
            {listCategory.map((cate, index) => {
                return (           
                    <li className="nav-item ">
                        <Link className="nav-link" to={cate.link_to}>
                        {cate.name_category}
                        </Link>
                    </li>            
                );
            })}     
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
            </li>
            {/* start Đăng bài */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng Tin</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                <Form onSubmit={(e) => handleSumbit(e)} encType="multipart/form-data">
                            <Form.Group className="mb-12 post_name">
                                <Form.Label>Tên bài viết</Form.Label>
                                <Form.Control type="text" name="post_name" className=''
                                value={post_name}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.post_name[0]}</span>}
                            </Form.Group>
                            {/* <Form.Control name="id_user" value={user[0].id}  onChange = {(e) => handleChange(e)} />
                            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_user[0]}</span>} */}
                            <Form.Group className="mb-12 meta_title">
                                <Form.Label>Tiêu đề bài viết</Form.Label>
                                <Form.Control type="text" name="meta_title" className=''
                                value={meta_title}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.meta_title[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-12 img">
                                <Form.Label>Hình ảnh</Form.Label>
                                <Form.Control type="file" name="img" multiple
                                onChange = {(e) => handleChangeImages(e)} />
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.img[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-12 description_sort">
                                <Form.Label>Nội dung ngắn</Form.Label>
                                <Form.Control type="text" name="description_sort" className=''
                                value={description_sort}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.description_sort[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-12 description">
                                <Form.Label>Nội dung</Form.Label>
                               <CKEditor
                               editor={ClassicEditor}
                               debug={true}
                               data={description}
                               onReady={editor => {
                                   console.log('Editor to ready');
                               }}>
                               </CKEditor>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.description[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-12 room_price">
                                <Form.Label>Giá phòng</Form.Label>
                                <Form.Control type="number" name="room_price" className="" 
                                value={room_price}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.room_price[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-12 water_price">
                                <Form.Label>Giá nước</Form.Label>
                                <Form.Control type="number" name="water_price" className="" 
                                value={water_price}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.water_pirce[0]}</span>}
                            </Form.Group>                   
                       
                        
                            <Form.Group className="mb-12 electricity_price">
                                <Form.Label>Giá điện</Form.Label>
                                <Form.Control type="text" name="electricity_price" className=""
                                value={electricity_price}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.electricity_price[0]}</span>}
                            </Form.Group> 
                            <Form.Group className="mb-12 id_province">
                                <Form.Label>Tỉnh</Form.Label>
                                <Form.Select name="id_province"
                                onChange = {(e) => handledistrice(e)}
                                >
                                    <option>Chọn tỉnh</option>
                                    {listProvince.map((room, index) => {
                                        return (
                                            
                                            <option key={index} value={room.id} >{room._name}</option>
                                        );
                                    })}                            
                                </Form.Select>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_province[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-12 id_district">
                                <Form.Label>Quận/Huyện/TP</Form.Label>
                                <Form.Select name="id_district"
                                onChange = {(e) => handleadd(e)}
                                >  
                                <option>Quận/Huyện/TP</option>
                                    {listDistrict.map((room, index) => {
                                        return (
                                            <option key={index} value={room.id}>{room._name}</option>
                                        );
                                    })}                            
                                </Form.Select>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_district[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-12 id_ward">
                                <Form.Label>Xã/Phường</Form.Label>
                                <Form.Select name="id_ward"
                                onChange = {(e) => handssdbdfb(e)}
                                > 
                                <option>Xã/Phường</option>
                                    {listWard.map((room, index) => {
                                        return (
                                            <option key={index} value={room.id} >{room._name}</option>
                                        );
                                    })}                            
                                </Form.Select>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_ward[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-12 address">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type="text" name="address" className=""
                                value={address}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.address[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-12 address">
                                <Form.Label>Iframe map</Form.Label>
                                <Form.Control type="text" name="ifarme" className=""
                                value={ifarme}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.address[0]}</span>}
                            </Form.Group>
                            
                            <Form.Group className="mb-12 area">
                                <Form.Label>Diện tích</Form.Label>
                                <Form.Control type="text" name="area" className="" 
                                value={area}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.area[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-12 quantity">
                                <Form.Label>Số lượng</Form.Label>
                                <Form.Control type="number" name="quantity" className=""
                                value={quantity}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.quantity[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-12 formGridCheckbox">
                                <Form.Label >Nội thất</Form.Label>
                                <div className='row ' style={{marginLeft:"10px",alginItem:"center",fontSize:"15px"}}>
                                    {furniture.map((data,index) => {
                                        return (
                                                <div class="col-2 row">
                                                 <Form.Check  type="checkbox" name="id_furniture" value={data.id_furniture} onChange = {(e) => handle_idFuniture(e)} />
                                                    <Form.Label>{data.name}</Form.Label>
                                                </div>
                                                   
                                               
                                            
                                        )
                                    })}
                                </div>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.furniture[0]}</span>}
                            </Form.Group>      
                            <Form.Group className="mb-12">
                                <Form.Label >Loại phòng</Form.Label>
                                <Form.Select name="id_roomType" 
                                onChange = {(e) => handleChange(e)}>
                                    <option value='' >Chọn</option>
                                    {listRoomType.map((room, index) => {
                                        return (
                                            <option key={index} value={room.id_room_type} >{room.name_room_type}</option>
                                        );
                                    })}                            
                                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_roomType[0]}</span>}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-12 meta_keywords">
                                <Form.Label>Từ khóa - Seo</Form.Label>
                                <Form.Control type="text" name="meta_keywords" className='' 
                                value={meta_keywords}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.meta_keywords[0]}</span>}
                            </Form.Group>
                            <Form.Group className="mb-12 meta_description">
                                <Form.Label>Mô tả tiêu đề - Seo</Form.Label>
                                <Form.Control as="textarea" name="meta_description" className="" rows={3} 
                                value={meta_description}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.meta_description[0]}</span>}
                            </Form.Group>
                        <div className="d-grid gap-2" style={{margin: "20px 0"}}>
                            <Button variant="primary" size="sm" name='' type="submit">
                                Thêm bài viết
                            </Button>
                            {alert.err_list.status === true && <div className="notice success_____">Thêm thành công</div>}
                        </div>
                    
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} > 
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
                        <form  onSubmit={(e) => handleSLogout(e)}>
                            <button className="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} type="submit">Đăng xuất</button>
                        </form>                       
                    </div>
                </div> }
            </li>
        </ul>
    </div>
  )
}

export default HeaderNavLink