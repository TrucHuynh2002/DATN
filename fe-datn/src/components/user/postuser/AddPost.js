import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { url } from '../../url';

function AddPost() {
    const user = JSON.parse(localStorage.getItem('user'));
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
        // meta_title: "",
        // meta_description: "",
        // meta_keywords: "",
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
        // meta_title,
        // meta_description,
        // meta_keywords,
        id_province,
        id_district,
        id_ward,
        id_street,
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
    const [addProvince, setProvince] = useState([]);
    const handleProvince = async (e) => {
        setAddPost({ ...addPost, [e.target.name] : e.target.value});
        setProvince({...addProvince,[e.id_province] : e.target.value});
        getDataDistrict(({[e.id_province] : e.target.value}).undefined);
    }
    const handleDistrict = async (e) => {
        getDataWard(({[e.id_district] : e.target.value}).undefined)
        getDataStreet(({[e.id_district] : e.target.value}).undefined);
        setAddPost({ ...addPost, [e.target.name] : e.target.value});
    }
    // Lấy nội thất
    const [checkFur, setFur] = useState([]);
    const [furniture, setFuriture] = useState([]);
    const get_furnitures = async () => {
        var  get_data = await axios.get(`${url}/furniture/show`);
        setFuriture(get_data.data.data)
    };
    useEffect(() => {
        getDataProvince();
        getDataRoomType();
        get_furnitures();
    },[]);


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
    const getDataDistrict = async (id_province) => {
        const ress = await axios.get(`${url}/post/show_district/${id_province}`);
        setListDistrict(ress.data.data);
    }
    // xã
    const getDataWard = async (id_district) => {
        var id_province = addProvince.undefined;
        const resss = await axios.get(`${url}/post/show_ward?id_province=${id_province}&&id_district=${id_district}`);
        setListWard(resss.data.data);
    }     
    // đường 
    const getDataStreet = async (id_district) => {
        var id_province = addProvince.undefined;
        const resss = await axios.get(`${url}/post/show_tree?id_province=${id_province}&&id_district=${id_district}`);
        setStreet(resss.data.data);
    }     
     // Lấy roomtype
    const [listRoomType, setListRoomType] = useState([]);
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
        formData.append('id_street', id_street);
        formData.append('ifarme', ifarme);
        // formData.append('meta_keywords', meta_keywords);
        // formData.append('meta_description', meta_description);
        // formData.append('meta_title', meta_title);
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

      return (
        <div className="content">
            <div className="add-post">
                <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm bài viết</h1>
                <Form onSubmit={(e) => handleSumbit(e)} encType="multipart/form-data" >
                            <Form.Group className="mb-12 post_name">
                                <Form.Label>Tên bài viết</Form.Label>
                                <Form.Control type="text" name="post_name" className=''
                                value={post_name}
                                onChange = {(e) => handleChange(e)}/>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.post_name[0]}</span>}
                            </Form.Group> 
                            {/* <Form.Group className="mb-12 meta_title">
                                <Form.Label>Tiêu đề bài viết</Form.Label>
                                <Form.Control type="text" name="meta_title" className=''
                                value={meta_title}
                                onChange = {(e) => handleChange(e)} />
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.meta_title[0]}</span>}
                            </Form.Group> */}
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
                                                <div className="col-2 row" key={index}>
                                                 <Form.Check  type="checkbox" name="id_furniture" value={data.id_furniture} onChange = {(e) => handle_idFuniture(e)} />
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
                            {/* <Form.Group className="mb-12 meta_keywords">
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
                            </Form.Group>            */}
                            <div className="d-grid gap-2" style={{margin: "20px 0"}}>
                                <Button variant="primary" size="sm" name='' type="submit">
                                    Thêm bài viết
                                </Button>
                                {alert.err_list.status === true && <div className="notice success_____">Thêm thành công</div>}
                            </div>
                    </Form>
           </div>
        </div>
      )

}

export default AddPost