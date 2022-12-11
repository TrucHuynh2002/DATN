import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function EditPost() {

    const {id_post} = useParams();
    const [loader,setLoader] = useState(0);
    const [editPost, setEditPost] = useState({
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
        id_street : "",
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
        id_province,
        id_district,
        id_ward,
        id_street,
        id_user,
        id_roomType,
        img,
        } = editPost;
       // xu ly loi
       const [alert, setAlert] = useState({
        err_list: {
            messages: "",
            status: ""
        },
    });
    const [Images,setLinkImage] = useState([])
    
    // Xử lý input vlaue
    const handleChange = async (e) => {
        setEditPost({ ...editPost, [e.target.name] : e.target.value});
    };
    const [addProvince, setProvince] = useState([]);
    const handleProvince = async (e) => {
        setProvince({...addProvince,[e.id_province] : e.target.value});
        getDataDistrict(({[e.id_province] : e.target.value}).undefined);
    }
    const handleDistrict = async (e) => {
        getDataWard(({[e.id_district] : e.target.value}).undefined)
        getDataStreet(({[e.id_district] : e.target.value}).undefined);
    }
    // Lấy nội thất
    const [checkFur, setFur] = useState([]);
    const [furniture, setfuriture] = useState([]);
    const get_furnitures = async () => {
        var get_data = await axios.get('http://127.0.0.1:8000/api/furniture/show');
        setfuriture(get_data.data.data)
    };
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWard, setListWard] = useState([]);
    const [listStreet, setStreet] = useState([]);
    // tỉnh
    const getDataProvince = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/post/show_province');
        setListProvince(res.data.data);
    }
    // huyện 
    const getDataDistrict = async (id_province) => {
        const ress = await axios.get(`http://127.0.0.1:8000/api/post/show_district/${id_province}`);
        setListDistrict(ress.data.data);
    }
    // xã
    const getDataWard = async (id_district) => {
        var id_province = addProvince.undefined;
        const resss = await axios.get(`http://127.0.0.1:8000/api/post/show_ward?id_province=${id_province}&&id_district=${id_district}`);
        setListWard(resss.data.data);
    }     
    // đường 
    const getDataStreet = async (id_district) => {
        var id_province = addProvince.undefined;
        const resss = await axios.get(`http://127.0.0.1:8000/api/post/show_tree?id_province=${id_province}&&id_district=${id_district}`);
        setStreet(resss.data.data);
    }
    // Lấy roomtype
    const [listRoomType, setListRoomType] = useState([]);
  
    const getDataRoomType = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/roomType/show');
        setListRoomType(res.data.data);
        };
        useEffect(() => {
            loadFurn();
            get_furnitures();
            getDataRoomType();
        },[loader])
    
    const handle_idFuniture =  (e) => {     
        if(e.target.checked){
            setFur(pre => {
               return  [...pre, e.target.value]
            });
        }
        else{
            setFur(pre => {
return [...pre.filter(check => check !== e.target.value)]
            })    
        }
       
    }
    const [uploadImages, setUploadImages] = useState([]);
    const handleChangeImages = (e) => {     
        let formData = new FormData();
        if(e.target.files){
        const fileArray = Array.from(e.target.files).map((file) => {   URL.createObjectURL(file)});
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
        formData.append('id_user', id_user);
        formData.append('id_province', id_province);
        formData.append('id_district', id_district);
        formData.append('id_ward', id_ward);
        formData.append('id_street', id_street);
        formData.append('ifarme', ifarme);
        formData.append('meta_keywords', meta_keywords);
        formData.append('meta_description', meta_description);
        formData.append('meta_title', meta_title);
        formData.append('quantity', quantity);
        formData.append('room_price', room_price);
        formData.append('water_price', water_price);
        formData.append('id_furniture', Array(checkFur));
        
        const res = await axios.put(`http://127.0.0.1:8000/api/post/update/${id_post}`, formData);
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
    const loadFurn = async () => {
        const result = await axios.get(`http://127.0.0.1:8000/api/post/show/${id_post}`);
        setEditPost(result.data.data);
        setLinkImage(result.data.img);
    };

    // Xử lý update hình ảnh
    const handleDeleteImage = async (e,id_img) => {
        console.log(id_img)
        let res = await axios.delete(`http://127.0.0.1:8000/api/post/image/delete/${id_img}`);
        console.log(res.data)
       
        if(res.data.status == true) {
            setLoader(loader+1);
        }
    }

    useEffect(() => {
        getDataProvince();
    },[]);

       
      


  return (
    <div className="content">
        <div className="add-post">
            <h1 className="content_h1_admin">Cập nhật bản tin</h1>
            <Form onSubmit={(e) => handleSumbit(e)} encType="multipart/form-data">
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3 post_name">
                            <Form.Label>Tên bản tin</Form.Label>
                            <Form.Control type="text" name="post_name" className=''
                            value={post_name}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && 
                            <div className="notice warning_____">
                            {alert.err_list.messages.post_name[0]}
                            </div>}
                        </Form.Group>
                        <Form.Group className="mb-3 meta_title">
                            <Form.Label>Tiêu đề bản tin</Form.Label>
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
                        </Form.Group>            
      <div className="container containeredit">
      
        <div className="preview-images-zone row">
        {
      
            Images.length > 0 &&
            Images.map((img,i) => {
            return  (
                <div className="preview-image preview-show-3 col-lg-4 col-xm-12" key={i}>
                    <div className="image-cancel" data-no={1} onClick={(e) => handleDeleteImage(e,img.id_img_post)} >x</div>
                    <div className="image-zone"><img id="pro-img-3" src={img.link_img_user} alt="No_Image" /></div>
                    <div className="tools-edit-image"><a href="javascript:void(0)" data-no={3} className="btn btn-light btn-edit-image">edit</a></div>
                </div> 
              )
            })
        }                        
         
        </div>
      </div>
                        <Form.Group className="mb-3 description_sort">
                            <Form.Label>Nội dung ngắn</Form.Label>
                            <Form.Control type="text" name="description_sort" className=''
                            value={description_sort}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.description_sort[0]}</div>}
                        </Form.Group>
                        <Form.Group className="mb-3 description">
                            <Form.Label>Nội dung</Form.Label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={description}
                                onReady={(editor)=>{
                                    editor.editing.view.change((writer)=>{
                                        writer.setStyle('height','100%',editor.editing.view.document.getRoot())
                                    })
                                }}
                                onChange={(event,editor)=> {
                                    const data=editor.getData()
                                    setEditPost({ ...editPost, description : data});
                                    // console.log(description);
                                }}
                                >
                        </CKEditor>
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
                        <Form.Group className="mb-12 id_province">
                                <Form.Label>Tỉnh</Form.Label>
                                <Form.Select name="id_province"
                                onChange = {(e) => handleProvince(e)}
                                >
                                    <option>Tỉnh</option>
                                    {listProvince.map((room, index) => {
                                        return (
                                            <option key={index} value={room.id}>{room._name}</option>
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
                            <Form.Group className="mb-12 id_street">
                                <Form.Label>Đường</Form.Label>
                                <Form.Select name="id_street"
                                onChange = {(e) => handleChange(e)}
                                > 
                                <option>Đường</option>
                                    {listStreet.map((room, index) => {
                                        return (
                                            <option key={index} value={room.id} >{room._name}</option>
                                        );
                                    })}       
                                </Form.Select>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_street[0]}</span>}
                            </Form.Group>
                        <Form.Group className="mb-3 address">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" name="address" className=""
                            value={address}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.address[0]}</div>}
                        </Form.Group>
                        <Form.Group className="mb-12 address">
                                <Form.Label>Iframe map</Form.Label>
                                <Form.Control type="text" name="ifarme" className=""
                                value={ifarme}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.address[0]}</span>}
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
                        {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
                        <Button variant="primary" size="sm" name='' type="submit">
                            Cập nhật bản tin
                        </Button>
                    </div>
                </Row>
            </Form>
       </div>
    </div>
  )
}

export default EditPost