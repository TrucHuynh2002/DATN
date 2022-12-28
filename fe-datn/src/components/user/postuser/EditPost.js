import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { url } from '../../url';
import { TabTitle } from '../../title';

function EditPost() {
    TabTitle('Cập nhật bài viết');
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWard, setListWard] = useState([]);
    const [listStreet, setStreet] = useState([]);
    // tỉnh  
    const getDataProvince = async () => {
        const res = await axios.get(`${url}/post/show_province`);
        setListProvince(res.data.data);          
    }
    // huyện 
    const getDataDistrict = async (id_province = "") => {    
        const ress = await axios.get(`${url}/post/show_district?id_province=${id_province}`);
        setListDistrict(ress.data.data);
    }
    // xã
    const getDataWard = async (id_district = '', id_province = '') => {
        const resss = await axios.get(`${url}/post/show_ward?id_province=${id_province}&&id_district=${id_district}`);
        setListWard(resss.data.data);
    }     
    // đường 
    const getDataStreet = async (id_province = '', id_district = '') => {
        const resss = await axios.get(`${url}/post/show_tree?id_province=${id_province}&&id_district=${id_district}`);
        setStreet(resss.data.data);       
    }
    const [addProvince, setProvince] = useState('');
    const handleProvince = async (e) => {
        setProvince(e.target.value);
        getDataDistrict(e.target.value);
        setEditPost({ ...editPost, [e.target.name]: e.target.value});
    }
    const handleDistrict = async (e) => {
        getDataWard(e.target.value,addProvince);
        getDataStreet(addProvince,e.target.value);
        setEditPost({ ...editPost, [e.target.name]: e.target.value});
        
    }
    const [Images,setLinkImage] = useState([])
    const {id_post} = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const [editPost, setEditPost] = useState({
        description: ""
    });
       const [furPost,setFurPost] = useState([]);
       const [alert, setAlert] = useState({
        err_list: {
            messages: "",
            status: ""
        },
    });
    const [loader,setLoader] = useState(0);
    
    const [uploadImages, setUploadImages] = useState([]);
    // Xử lý update hình ảnh
    const handleDeleteImage = async (e,id_img) => {
        let res = await axios.delete(`${url}/post/image/delete/${id_img}`);      
        if(res.data.status == true) {
            setLoader(loader+1);
        }
    }
    // Xử lý input vlaue
    const handleChange = (e) => {       
        setEditPost({ ...editPost, [e.target.name]: e.target.value});
    };
    // Lấy nội thất
    const [checkFur, setFur] = useState([]);
    const [furniture, setfuriture] = useState([]);
    const get_furnitures = async () => {
        var  get_data = await axios.get(`${url}/furniture/show`);
        setfuriture(get_data.data.data)
    };

    // Lấy roomtype
    const [listRoomType, setListRoomType] = useState([]);  
    const getDataRoomType = async () => {
        const res = await axios.get(`${url}/roomType/show`);
        setListRoomType(res.data.data);
        };
        const loadFurn = async () => {
            const result = await axios.get(`${url}/post/show/${id_post}`);
            setEditPost(result.data.data);
            setFurPost(result.data.fur)
            setLinkImage(result.data.img);
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

    const handleChangeImages = (e) => {     
        let formData = new FormData();
        if(e.target.files){
        const fileArray = Array.from(e.target.files).map((file) => { URL.createObjectURL(file)});
        setUploadImages(e.target.files)       
    }
    }
  
    const handleSumbit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
         for(let i = 0; i<uploadImages.length; i++) {
            formData.append('img[]',uploadImages[i])
        }
        formData.append('post_name',editPost.post_name);
        formData.append('address', editPost.address);
        formData.append('area',editPost.area);
        formData.append('description', editPost.description);
        formData.append('description_sort', editPost.description_sort);
        formData.append('electricity_price', editPost.electricity_price);
        formData.append('id_roomType', editPost.id_roomType);
        formData.append('id_user', editPost.id_user);
        // formData.append('meta_keywords', editPost.meta_keywords);
        // formData.append('meta_description', editPost.meta_description);
        // formData.append('meta_title', editPost.meta_title);
        formData.append('quantity', editPost.quantity);
        formData.append('room_price',  editPost.room_price);
        formData.append('water_price', editPost.water_price);
        formData.append('id_street',editPost.id_street)
        for(let i = 0; i<checkFur.length; i++){

            formData.append('id_furniture[]',checkFur[i]);
        }
        formData.append('id_province',editPost.id_province);
        formData.append('id_district',editPost.id_district);
        formData.append('id_ward',editPost.id_ward);
        formData.append('id_street',editPost.id_street);
        const res =  await axios.post(`${url}/post/update/${id_post}?_method=PUT`, formData);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
            });
            setLoader(loader + 1)
        }
        else{        
            setAlert({
                err_list: res
            });
        }
    };

    const fetch_data = () => {
        loadFurn();
        getDataRoomType();
        get_furnitures();
        // Lấy hết tỉnh
        getDataProvince();
        // Lấy hết huyện
        getDataDistrict();
        // Xã
        getDataWard();
        // Đường
        getDataStreet(); 
    }
    

    useEffect(() => {
      fetch_data();
    },[loader]);

  return (
    <div className="content">
        <div className="add-post">
            <h1 className="content_h1_admin">Cập nhật bài viết</h1>
            <Form onSubmit={(e) => handleSumbit(e)} encType="multipart/form-data">
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3 post_name">
                            <Form.Label>Tên bài viết</Form.Label>
                            <Form.Control type="text" name="post_name" className=''
                            value={editPost.post_name && editPost.post_name}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && 
                            <div className="notice warning_____">
                            {alert.err_list.messages.post_name[0]}
                            </div>}
                        </Form.Group>
                        {/* <Form.Group className="mb-3 meta_title">
                            <Form.Label>Tiêu đề bài viết</Form.Label>
                            <Form.Control type="text" name="meta_title" className=''
                            value={editPost.meta_title && editPost.meta_title}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && 
                            <div className="notice warning_____">
                            {alert.err_list.messages.meta_title[0]}
                            </div>}
                        </Form.Group> */}
                        <Form.Group className="mb-3 img">
                            <Form.Label>Hình ảnh</Form.Label>
                            <Form.Control type="file" name="img" multiple
                            onChange = {(e) => handleChangeImages(e)} />
                        <div className="container containeredit">
      
      <div className="preview-images-zone row">
      {
    
          Images.length > 0 &&
          Images.map((img,i) => {
          return  (
                <div className="preview-image preview-show-3 col-lg-4 col-xm-12" key={i}>
                  <div className="image-cancel" data-no={1} onClick={(e) => handleDeleteImage(e,img.id_img_post)} >x</div>
                  <div className="image-zone"><img id="pro-img-3" src={img.link_img_user} alt="No_Image" /></div>
                  {/* <div className="tools-edit-image"><a href="javascript:void(0)" data-no={3} className="btn btn-light btn-edit-image">edit</a></div> */}
                </div> 
            )
          })
      }                        
       
      </div>
    </div>
                        </Form.Group>
                        <Form.Group className="mb-3 description_sort">
                            <Form.Label>Nội dung ngắn</Form.Label>
                            <Form.Control type="text" name="description_sort" className=''
                            value={editPost.description_sort && editPost.description_sort}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.description_sort[0]}</div>}
                        </Form.Group>
                        <Form.Group className="mb-3 description">
                            <Form.Label>Nội dung</Form.Label>

                            <CKEditor
                                editor={ClassicEditor}
                                data={editPost.description != '' ? editPost.description : '' }
                                onReady={(editor)=>{
                                    editor.editing.view.change((writer)=>{
                                        writer.setStyle('height','100%',editor.editing.view.document.getRoot())
                                    })
                                }}
                                onChange={(event,editor)=> {
                                    const data=editor.getData()
                                    setEditPost({ ...editPost, [editPost.description] : data});
                                }}
                                >
                        </CKEditor>
                            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.description[0]}</div>}
                        </Form.Group>
                        <Form.Group className="mb-3 room_price">
                            <Form.Label>Giá phòng</Form.Label>
                            <Form.Control type="number" name="room_price" className="" 
                            value={editPost.room_price && editPost.room_price}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.room_price[0]}</div>}
                        </Form.Group>
                        <Form.Group className="mb-3 water_price">
                            <Form.Label>Giá nước</Form.Label>
                            <Form.Control type="number" name="water_price" className="" 
                            value={editPost.water_price && editPost.water_price}
                            onChange = {(e) => handleChange(e)}
                            />
                            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.water_pirce[0]}</div>}
                        </Form.Group>                   
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3 electricity_price">
                            <Form.Label>Giá điện</Form.Label>
                            <Form.Control type="text" name="electricity_price" className=""
                            value={editPost.electricity_price && editPost.electricity_price}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.electricity_price[0]}</div>}
                        </Form.Group> 
                        <Form.Group className="mb-12 id_province">
                                <Form.Label>Tỉnh</Form.Label>
                                <Form.Select name="id_province"
                                onChange = {(e) => handleProvince(e)}
                                >
                                    <option>Tỉnh</option>
                                    {
                                    
                                    listProvince.map((room, index) => {
                                        // editPost.id_province &&
                                        //  room.id == editPost.id_province 
                                        // &&
                                        // getDataDistrict(({id_province : editPost.id_province}).undefined);

                                        return (
                                          
                                            <option selected={room.id == editPost.id_province ? 'selected' : 'false'} key={index} value={room.id}>{room._name}</option>
                                           
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
                                             editPost.id_province &&  room._province_id == editPost.id_province
                                          
                                            ?
                                            <option selected  key={index} value={room.id}>{room._name}</option>
                                            : 
                                            <option  key={index} value={room.id}>{room._name}</option>                                   
                                    );
                                })}       
                        </Form.Select>
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
                                        editPost.id_ward && editPost.id_ward
                                          
                                        ?
                                        // <option selected  key={index} value={room.id}>{room._name}</option>
                                        <option selected key={index} value={room.id}>{room._name}</option>
                                        : 
                                        <option  key={index} value={room.id}>{room._name}</option>                                       
                                    );
                                })}       
                            </Form.Select>
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
                                        room.id == editPost.id_street
                                        ?
                                        <option selected key={index} value={room.id}>{room._name}</option>
                                        :
                                        <option key={index} value={room.id}>{room._name}</option>
                                    );
                                })}       
                            </Form.Select>
                            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_street[0]}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3 address">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" name="address" className=""
                            value={editPost.address && editPost.address}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.address[0]}</div>}
                        </Form.Group>
                        <Form.Group className="mb-3 area">
                            <Form.Label>Diện tích</Form.Label>
                            <Form.Control type="text" name="area" className="" 
                            value={editPost.area && editPost.area}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.area[0]}</div>}
                        </Form.Group>
                        <Form.Group className="mb-3 quantity">
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control type="number" name="quantity" className=""
                            value={editPost.quantity}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.quantity[0]}</div>}
                        </Form.Group>
                        <Form.Group className="mb-3 formGridCheckbox">
                            <Form.Label >Nội thất</Form.Label>
                            <div className='row' style={{marginLeft:"10px",alginItem:"center"}}>
                                {furniture.map((data,index) => {
                                    return (
                                        <div className="col-md-3" key={index}>
                                        {
                                            <Form.Check type="checkbox" name="id_furniture" value={data.id_furniture} onChange = {(e) => handle_idFuniture(e)} />
                                        }
                                           
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
                                        room.id_room_type == editPost.id_roomType
                                        ?
                                        <option selected key={index} value={room.id_room_type} >{room.name_room_type}</option>
                                        :
                                        <option key={index} value={room.id_room_type}>{room.name_room_type}</option>
                                    );
                                })}                            
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.id_roomType[0]}</div>}
                            </Form.Select>
                        </Form.Group>
                        {/* <Form.Group className="mb-3 meta_keywords">
                            <Form.Label>Từ khóa - Seo</Form.Label>
                            <Form.Control type="text" name="meta_keywords" className='' 
                            value={editPost.meta_keywords}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.meta_keywords[0]}</div>}
                        </Form.Group>
                        <Form.Group className="mb-3 meta_description">
                            <Form.Label>Mô tả tiêu đề - Seo</Form.Label>
                            <Form.Control as="textarea" name="meta_description" className="" rows={3} 
                            value={editPost.meta_description}
                            onChange = {(e) => handleChange(e)}/>
                            {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.meta_description[0]}</div>}
                        </Form.Group> */}
                    </Col>
                    <div className="d-grid gap-2">
                        {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
                        <Button variant="primary" size="sm" name='' type="submit">
                            Cập nhật bài viết
                        </Button>
                    </div>
                </Row>
            </Form>
       </div>
    </div>
  
  )
}

export default EditPost