import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Pagination from '../Pagination';

function RoomND() {
  const [listPost, setListPost] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] =useState(9);
  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);
  // danh sach post
  useEffect(() => {
    getData();
    getImg();
  },[]);

  const [alert, setAlert] = useState({
    err_list: {},
  });  
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/post/show');
   setListPost(res.data.data);    
  };
  const getImg = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/imgPost/show`);
      setListImg(res.data.data);   
  };

  // search
  const navigate = useNavigate();
  useEffect(() => {
    getTypeRoom()
    getDataProvince();
  },[]);
    // SEARCHING
  const [keyword,setKeyword] = useState({
    keywords: "",
    province: "",
    district: "",
    ward: "",
    price:"",
    area:"",
    typeRoom:""
  })
  const [getDataSearch,setGetDataSearch] = useState({
    typeRooms:[]
  });
  const {typeRooms} = getDataSearch
  const getTypeRoom = async () => {
    let dataRoom = await axios.get("http://127.0.0.1:8000/api/roomType/show");
    setGetDataSearch({...getDataSearch,typeRooms:dataRoom.data.data})
  }
    const {
      keywords,
      province,
      district,
      ward,
      price,
      area,
      typeRoom
    } = keyword
    const [addProvince , setProvince] = useState([]);
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWard, setListWard] = useState([]);
    const [listStreet, setStreet] = useState([]);
    const handleProvince = async (e) => {
      setProvince({...addProvince,[e.id_province] : e.target.value});
      getDataDistrict(({[e.id_province] : e.target.value}).undefined)
      setKeyword({ ...keyword,[e.target.name]:e.target.value})
  }
  const handleDistrict = async (e) => {
    getDataWard(({[e.id_district] : e.target.value}).undefined)
    getDataStreet(({[e.id_district] : e.target.value}).undefined)
    setKeyword({ ...keyword,[e.target.name]:e.target.value})
}
  // tỉnh
  const getDataProvince = async () => {
      const res = await axios.get('http://127.0.0.1:8000/api/post/show_province');
      setListProvince(res.data.data);
  }
  // huyện 
  const getDataDistrict = async (id_province) => {
      const res = await axios.get(`http://127.0.0.1:8000/api/post/show_district?id_province=${id_province}`);
      setListDistrict(res.data.data);
  }
  // xã
  const getDataWard = async (id_district) => {
      var id_province = addProvince.undefined;
      const res = await axios.get(`http://127.0.0.1:8000/api/post/show_ward?id_province=${id_province}&&id_district=${id_district}`);
      setListWard(res.data.data);
  }     
  // đường 
  const getDataStreet = async (id_district) => {
      var id_province = addProvince.undefined;
      const res = await axios.get(`http://127.0.0.1:8000/api/post/show_tree?id_province=${id_province}&&id_district=${id_district}`);
      setStreet(res.data.data);
  }     
  const [searching,setSearching] = useState(false);
  const handleChangeKeyWord = (e) => {
    setKeyword({ ...keyword,[e.target.name]:e.target.value})
  }

  const handleSubmitSearch = e => {
    e.preventDefault()
    navigate(`../searchroom?keyword=${keywords}&province=${keyword.province}&ward=${keyword.ward}&district=${keyword.district}&price=${keyword.price}&area=${keyword.area}&typeRoom=${typeRoom}`);
  }
   // modal post
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

  return (
  <div className="container">
      <Button   
        variant="warning" 
        style={{color: 'black', fontWeight: 600, borderRadius: '5px',margin: '14px'}} 
        onClick={handleShow} > Lọc
        <i className="fa-solid fa-filter" 
        style={{marginLeft: '7px'}} 
         ></i>
     </Button>
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lọc</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <div className="modal_show">
            <Form.Select className="form-select online_book3" name="typeRoom" onChange={(e) => handleChangeKeyWord(e)}>
              <option>Loại phòng</option>
              {
                typeRooms.map((r,i) => {
                  return <option key={i} value={r.id_room_type}>{r.name_room_type}</option>
                })
              }
            </Form.Select>
          </div>
          <div className="modal_show">
            <Form.Select 
            name="id_province"
            onChange = {(e) => handleProvince(e)}
            >
              <option>Tỉnh</option>
              {listProvince.map((room, index) => {
                return (
                <option key={index} value={room.id} >{room._name}</option>
                );
                })}
            </Form.Select>
          </div>
          <div className="modal_show">
            <Form.Select name="id_district"
            onChange = {(e) => handleDistrict(e)}
            >  
              <option>Quận/Huyện</option>
              {listDistrict.map((room, index) => {
                return (
                <option key={index} value={room.id}>{room._name}</option>
                );
              })}       
            </Form.Select>
          </div>
          <div className="modal_show">
            <Form.Select name="id_ward"
            onChange = {(e) => handleChangeKeyWord(e)}
            > 
            <option>Xã/Phường</option>
            {listWard.map((room, index) => {
              return (
                <option key={index} value={room.id} >{room._name}</option>
                );
            })}       
            </Form.Select>
          </div>
          <div className="modal_show">
            <Form.Select name="id_street"
            onChange = {(e) => handleChangeKeyWord(e)}
            > 
              <option>Đường</option>
              {listStreet.map((room, index) => {
                return (
                <option key={index} value={room.id} >{room._name}</option>
                );
              })}       
            </Form.Select>
          </div>
          <div className="modal_show">
            <Form.Select className="form-select online_book3" name="price" onChange={(e) => handleChangeKeyWord(e)}>
              <option>Giá</option>
              <option value={1}>Dưới 1 triệu</option>
              <option value={2}>Từ 1 - 2 triệu</option>
            </Form.Select>
          </div>
          <div className="modal_show">
            <Form.Select className="form-select online_book3" name="area" onChange={(e) => handleChangeKeyWord(e)}>
              <option>Diện tích</option>
              <option value="1">Dưới 20m</option>
              <option value="2">Trên 20m</option>
            </Form.Select>
          </div>
          <div className="modal_show">
              <Button type="submit" className='search_room_btn' onClick={e => handleSubmitSearch(e)} >Lọc </Button> 
          </div>
        </Modal.Body>
      </Modal>
        <div className="our_room">
          <div className="row">
                {currentPosts.map((post, index) => {
                    return (     
                      <div className="col-md-4 col-sm-6" key={index}>
                          <div id="serv_hover" className="room">
                              <div className="room_img">
                              {listImg.map((a, index) => {
                                return a.id_post == post.id_post && (
                                  <figure key={index}><img src={a.link_img_user} alt="#" /></figure>
                                  )})}
                              </div>
                              <div className="bed_room">
                                  <h3><Link to={`../roomdetail/${post.id_post}`}>{post.post_name}</Link></h3>
                                  <span className='currency'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(post.room_price)}</span>
                                  <p>{post.description_sort}</p>
                              </div>
                          </div>
                      </div>
                    );
                  })}
                </div>
                {/* phan trang */}
                <Pagination totalPost={listPost.length} 
                postsPerPage={postsPerPage} 
                setCurrentPage={setCurrentPage}
                currentPage={currentPage} />
        </div>
    </div>
  )
}

export default RoomND
