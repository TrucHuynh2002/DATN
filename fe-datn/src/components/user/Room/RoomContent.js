import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../Pagination';
import { url } from '../../url';

function RoomND() {
  const [listPost, setListPost] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [listFur, setListFur] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] =useState(9);
  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);
  // danh sach post
  useEffect(() => {
    getData();
  },[]);

  const [alert, setAlert] = useState({
    err_list: {},
  });  
  const getData = async () => {
   const res = await axios.get(`${url}/post/show`);
    setListPost(res.data.data);   
   const getImg = await axios.get(`${url}/imgPost/show`);
      setListImg(getImg.data.data); 
    const getFur = await axios.get(`${url}/furniture/show`);
      setListFur(getFur.data.data); 
    let getTypeRoom = await axios.get(`${url}/roomType/show`);
      setGetDataSearch({...getDataSearch,typeRooms:getTypeRoom.data.data})
        // tỉnh
    const getDataProvince = await axios.get(`${url}/province/showPostSearch`);
      setListProvince(getDataProvince.data.data);
  };
  // search
  const navigate = useNavigate();
    // SEARCHING
  const [keyword,setKeyword] = useState({
    keywords: "",
    province: "",
    district: "",
    ward: "",
    price:"",
    area:"",
    typeRoom:"",
    fur:""
  })
  const [getDataSearch,setGetDataSearch] = useState({
    typeRooms:[]
  });
  const {typeRooms} = getDataSearch
    const {
      keywords,
      province,
      district,
      ward,
      price,
      area,
      typeRoom,
      fur
    } = keyword
    const [addProvince , setProvince] = useState([]);
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWard, setListWard] = useState([]);
    const [listStreet, setStreet] = useState([]);
    const handleProvince = async (e) => {
      setProvince({...addProvince,[e.id_province] : e.target.value});
      getDataDistrict(({[e.id_province] : e.target.value}).undefined)
      setKeyword({ ...keyword,province: e.target.value})
  }
  
  const handleDistrict = async (e) => {
    getDataWard(({[e.id_district] : e.target.value}).undefined)
    getDataStreet(({[e.id_district] : e.target.value}).undefined)
    setKeyword({ ...keyword,district:e.target.value})
}
  // huyện 
  const getDataDistrict = async (id_province) => {
      const res = await axios.get(`${url}/post/show_districtSearch?id_province=${id_province}`);
      setListDistrict(res.data.data);
  }
  // xã
  const getDataWard = async (id_district) => {
      var id_province = addProvince.undefined;
      const res = await axios.get(`${url}/post/show_ward?id_province=${id_province}&&id_district=${id_district}`);
      setListWard(res.data.data);
  }     
  // đường 
  const getDataStreet = async (id_district) => {
      var id_province = addProvince.undefined;
      const res = await axios.get(`${url}/post/show_tree?id_province=${id_province}&&id_district=${id_district}`);
      setStreet(res.data.data);
  }     
  const [searching,setSearching] = useState(false);
  const handleChangeKeyWord = (e) => {
    setKeyword({ ...keyword,[e.target.name]:e.target.value});
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
            <select className="form-select online_book3" name="typeRoom" onChange={(e) => handleChangeKeyWord(e)}>
              <option>Loại phòng</option>
              {
                typeRooms.map((r,i) => {
                  return <option key={i} value={r.id_room_type}>{r.name_room_type}</option>
                })
              }
            </select>
          </div>
          <div className="modal_show">
            <select className="form-select online_book3" name="fur" onChange={(e) => handleChangeKeyWord(e)}>
              <option>Nội thất</option>
              {
                listFur.map((f,i) => {
                  return <option key={i} value={f.id_furniture}>{f.name}</option>
                })
              }
            </select>
          </div>
          <div className="modal_show">
            <select className="form-select online_book3" name="id_province" onChange = {(e) => handleProvince(e)} >
              <option>Tỉnh</option>
              {listProvince.map((room, index) => {
                return (
                <option key={index} value={room.id_province} >{room._name}</option>
                );
                })}
            </select>
          </div>
          <div className="modal_show">
            <select className="form-select online_book3" name="id_district" onChange = {(e) => handleDistrict(e)} >  
              <option>Quận/Huyện</option>
              {listDistrict.map((room, index) => {
                return (
                <option key={index} value={room.id_district}>{room._name}</option>
                );
              })}       
            </select>
          </div>
          <div className="modal_show">
            <select className="form-select online_book3" name="id_ward"onChange = {(e) => handleChangeKeyWord(e)} > 
            <option>Xã/Phường</option>
            {listWard.map((room, index) => {
              return (
                <option key={index} value={room.id} >{room._name}</option>
                );
            })}       
            </select>
          </div>
          <div className="modal_show">
            <select className="form-select online_book3" name="id_street"
            onChange = {(e) => handleChangeKeyWord(e)}
            > 
              <option>Đường</option>
              {listStreet.map((room, index) => {
                return (
                <option key={index} value={room.id} >{room._name}</option>
                );
              })}       
            </select>
          </div>
          <div className="modal_show">
            <select className="form-select online_book3" name="price" onChange={(e) => handleChangeKeyWord(e)}>
              <option>Giá</option>
              <option value={1}>Dưới 1 triệu</option>
              <option value={2}>Từ 1 - 2 triệu</option>
            </select>
          </div>
          <div className="modal_show">
            <select className="form-select online_book3" name="area" onChange={(e) => handleChangeKeyWord(e)}>
              <option>Diện tích</option>
              <option value="1">Dưới 20m</option>
              <option value="2">Trên 20m</option>
            </select>
          </div>
          <div className="modal_show">
              <Button type="submit" className='search_room_btn' onClick={e => handleSubmitSearch(e)} >Lọc </Button> 
          </div>
        </Modal.Body>
      </Modal>
        <div className="our_room">
          <div className="row rs_screen">
                {currentPosts.map((post, index) => {
                    return (     
                      <div className="col-lg-4 col-md-12 col-sm-12" key={index}>
                          <div id="serv_hover" className="room">
                              <div className="room_img col-lg-12 col-md-5 col-xs-4">
                                  <figure style={{width:"100%",height:"250px"}}><img src={post.link_img} alt={post.name_img} /></figure>
                              </div>
                              <div className="bed_room col-lg-12 col-md-7 col-xs-8 ">
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
