import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Notify from '../Notify';
import { url } from '../../url';

function HeaderNavLink() {
    const user = JSON.parse(localStorage.getItem('user'));
    const id_users = user ? user[0].id : '';
    
    const navigate = useNavigate();
    const handleSLogout = async (e) => {
        localStorage.removeItem("user");
        navigate(`../`);
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
        id_province,
        id_district,
        id_ward,
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
    const [keyword,setKeyword] = useState({
        keywords: "",
      })
    const {
        keywords,
      } = keyword
    // Xử lý input vlaue
    const handleChange = async (e) => {
        setAddPost({ ...addPost, [e.target.name] : e.target.value});
    }
    const [addProvince, setProvince] = useState([]);
    const handleProvince = async (e) => {
        setAddPost({ ...addPost, [e.target.name] : e.target.value});
        setProvince({...addProvince,[e.id_province] : e.target.value});
        getDataDistrict(({[e.id_province] : e.target.value}).undefined);
    }
    const handleDistrict = async (e) => {
        getDataWard(({[e.id_district] : e.target.value}).undefined)
        setAddPost({ ...addPost, [e.target.name] : e.target.value});
    }
     
    const get_furnitures = async () => {
        // Lấy nội thất
        var get_data = await axios.get(`${url}/furniture/show`);
        setFuriture(get_data.data.data)
    };
    const handleChangeKeyWord = (e) => {
        setKeyword({ ...keyword,[e.target.name]:e.target.value});
        // if(e.target.value.length > 0){
        //   getKeyword(e.target.value)
        //   setSearching(true)
        // }
        // else{
        //   setSearching(false)
        // }
    }
    useEffect(() => {
        getDataProvince();
        getDataRoomType();
        get_furnitures();
        getData();
        if(user){
            getNotify();
        }
       
    },[]);
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWard, setListWard] = useState([]);
    const [checkFur, setFur] = useState([]);
    const [furniture, setFuriture] = useState([]);
    const [listRoomType, setListRoomType] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    // tỉnh
    const getDataProvince = async () => {
        const res = await axios.get(`${url}/post/show_province`);
        setListProvince(res.data.data);
    }
    // huyện 
    const getDataDistrict = async (id_province) => {
        const res = await axios.get(`${url}/post/show_district?id_province=${id_province}`);
        setListDistrict(res.data.data);
    }
    // xã
    const getDataWard = async (id_district) => {
        var id_province = addProvince.undefined;
        const res = await axios.get(`${url}/post/show_ward?id_province=${id_province}&&id_district=${id_district}`);
        setListWard(res.data.data);
    }         
     // Lấy roomtype    
    const getDataRoomType = async () => {
        const res = await axios.get(`${url}/roomType/show`);
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
    const [uploadImagesAvatar, setUploadImagesAvatar] = useState([]);
    const handleChangeImages = (e) => {
        let formData = new FormData();
        if(e.target.files){
        const fileArray = Array.from(e.target.files).map((file) => {URL.createObjectURL(file)});
        setUploadImages(e.target.files)
        }
    }     
    const handleChangeImagesBig = (e) => {
        let formData = new FormData();
        if(e.target.files){
        const fileArray = Array.from(e.target.files).map((file) => {URL.createObjectURL(file)});
        setUploadImagesAvatar(e.target.files)
        }
    }     
    const handleSumbit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        for(let i = 0; i<uploadImages.length; i++) {
            formData.append('img[]',uploadImages[i])
        }
        for(let i = 0; i<uploadImagesAvatar.length; i++) {
            formData.append('imgavt[]',uploadImages[i])
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
        formData.append('quantity', quantity);
        formData.append('room_price', room_price);
        formData.append('water_price', water_price);
        formData.append('id_furniture', Array(checkFur));
        const res =  await axios.post(`${url}/post/create`, formData);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
            });
        }
        else{
            setAlert({
                err_list: res
            });
        }
    };
    // modal post
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
    const handleShow = async() => {
        if(user){
            const res = await axios.get(`${url}/user/show/`+user[0].id);
            if(res.data.status == true){
              const user_data = res.data.data;
              if(user_data[0].role == 1){
                setShow(true);
              }else if(user_data[0].role == 0){
                navigate('/rules');
              }else{
                navigate('/Loi');
              }
            }else{
                navigate('/Loi');
            }
          }else{
            navigate('/Loi');
          }
    };
    
    // list category
    
    const getData = async () => {
        const res = await axios.get(`${url}/category/show`);
           setListCategory(res.data.data);
    };
    const [notificationUnread,setNotificationUnread] = useState([])
    const getNotify = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/notify/${id_users}`)
        // setNotification(res.data.data)
        if(res.data.status == true){
            if(res.data.notificationUnread.length > 0){
              setNotificationUnread(res.data.notificationUnread)
            }
        }
    }
    const [loader,setLoader] = useState(0);
    const handleClickNoti = async (e) => {
        setLoader(loader+1)
        getNotify()
    }
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        navigate(`../searchroom?keyword=${keywords}`);
      }
  return (
    <div className="collapse navbar-collapse" id="navbarExample04">
        <ul className="navbar-nav" >
       
            {listCategory.map((cate, index) => {
                return (           
                    <li className="nav-item" key={index}>
                        <Link className="nav-link" to={cate.link_to}>
                        {cate.name_category}
                        </Link>
                    </li>            
                );
            })} 
         <li className="nav-item">
                <div className="btn-group" >
                   <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
                        style={{color: 'black', fontSize:'1.8em',border: 'none'}} className="bell" >
                        <i className='bx bx-bell' style={{color:notificationUnread.length > 0 && id_users ? "red" : ''}} ></i>
                        {
                            notificationUnread.length > 0 && id_users
                            &&
                            <div className='count-bell-unread'>
                                {notificationUnread.length}
                            </div>
                        }
                     
                    </div>
                   <Notify  onClick={e => handleClickNoti(e)}/>
                </div>
            </li>
            <li className="nav-item">
                <Button 
                className='dangbai'
                    variant="warning" 
                    style={{color: 'black', fontWeight: 600, backgroundColor: '#ffc70d',borderRadius: '5px'}} 
                    onClick={handleShow}
                >
                    ĐĂNG BÀI
                </Button>
            </li>
            {/* start Đăng bài chủ trọ*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng Tin</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form onSubmit={(e) => handleSumbit(e)} encType="multipart/form-data" >
                        <Form.Group className="mb-12 post_name">
                            <Form.Label>Tên bài viết</Form.Label>
                            <Form.Control type="text" name="post_name" className=''
                            value={post_name}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.post_name[0]}</span>}
                        </Form.Group> 
                        <Form.Group className="mb-12 img">
                            <Form.Label>Ảnh đại diện</Form.Label>
                            <Form.Control type="file" name="img"
                            onChange = {(e) => handleChangeImagesBig(e)} />
                            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.img[0]}</span>}
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
                            data={description}
                            onReady={(editor)=>{
                                editor.editing.view.change((writer)=>{
                                    writer.setStyle('height','100%',editor.editing.view.document.getRoot())
                                })
                            }}
                            onChange={(event,editor) => {
                                let data = editor.getData();
                                setAddPost({...addPost, description:data});
                            }}
                            >
                            </CKEditor>
                            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.description[0]}</span>}
                        </Form.Group>
                        <Form.Group className="mb-12 room_price">
                            <Form.Label>Giá phòng</Form.Label>
                            <Form.Control type="number" name="room_price" className="" 
                            value={room_price}
                            onChange = {(e) => handleChange(e)} />
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
                            onChange = {(e) => handleProvince(e)}
                            >
                                <option>Tỉnh</option>
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
                            onChange = {(e) => handleDistrict(e)}
                            >  
                            <option>Quận/Huyện/TP</option>
                                {listDistrict.map((room, index) => {
                                    return (
                                        <option key={index} value={room.id}>{room._name}</option>
                                    );
                                })}       </Form.Select>
                            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_district[0]}</span>}
                        </Form.Group>
                        <Form.Group className="mb-12 id_ward">
                            <Form.Label>Xã/Phường/Thị Trấn</Form.Label>
                            <Form.Select name="id_ward"
                            onChange = {(e) => handleChange(e)}
                            > 
                            <option>Xã/Phường/Thị Trấn</option>
                                {listWard.map((room, index) => {
                                    return (
                                        <option key={index} value={room.id} >{room._name}</option>
                                    );
                                })}       </Form.Select>
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
                                            <div className="col-2" key={index}>
                                                <Form.Check type="checkbox" name="id_furniture" value={data.id_furniture} onChange = {(e) => handle_idFuniture(e)} />
                                                <Form.Label>{data.name}</Form.Label>
                                            </div>
                                            )
                                })}
                            </div>
                            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.furniture[0]}</span>}
                        </Form.Group>   
                        <Form.Group className="mb-12">
                            <Form.Label>Loại phòng</Form.Label>
                            <Form.Select name="id_roomType" 
                            onChange = {(e) => handleChange(e)}>
                                <option value='' >Chọn</option>
                                {listRoomType.map((room, index) => {
                                    return (
                                        <option key={index} value={room.id_room_type}>{room.name_room_type}</option>
                                    );
                                })}           {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_roomType[0]}</span>}
                            </Form.Select> 
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
                    <Button variant="secondary" onClick={handleClose} > Đóng </Button>
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
                    {
                        user[0].role == 1 &&
                        (<>
                        <Link className="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} to={`layoutManage/${user[0].id}`}>Quản lý phòng</Link>
                        <Link className="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} to={`layoutSendNoti/${user[0].id}`}>Gửi yêu cầu</Link>
                        </>)
                    }    
                        <Link className="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} to={`profile/${user[0].id}`}>Thông tin tài khoản</Link>
                        <form  onSubmit={(e) => handleSLogout(e)}> 
                            <button className="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} type="submit">Đăng xuất</button>
                        </form>                       
                    </div>
                </div> }
            </li>
            <li className="nav-item">
                <form className="book_now2" onSubmit={(e) => handleSubmitSearch(e)}>
                    <div className="row timkiemrow">
                        <input className="timkiem2 form-control" placeholder="Tìm kiếm" type="text" name="keywords" onChange={(e) => handleChangeKeyWord(e)} /> 
                    </div> 
                </form>    
            </li>
            
        </ul>
    </div>
  )
}

export default HeaderNavLink