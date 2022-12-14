import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../Pagination';
import { url } from '../../url';
import HashLoader from "react-spinners/HashLoader";

function RoomND() {
  var user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [listPost, setListPost] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [listFur, setListFur] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] =useState(9);
  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
    getData()
    getSearch()
  },[]);

  const [alert, setAlert] = useState({
    err_list: {},
  });  
  const getSearch = async (keywordss = '') => {
    const res = await axios.get(`${url}/post/show?keyword=${keywordss}`);
    setListPost(res.data.data);
  }
  const getData = async () => {
    const getImg = await axios.get(`${url}/imgPost/show`);
      setListImg(getImg.data.data); 
    const getFur = await axios.get(`${url}/furniture/show`);
      setListFur(getFur.data.data); 
    let getTypeRoom = await axios.get(`${url}/roomType/show`);
      setGetDataSearch({...getDataSearch,typeRooms:getTypeRoom.data.data})
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
      stress,
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
    setKeyword({ ...keyword,district:e.target.value})
}
  // huy???n 
  const getDataDistrict = async (id_province) => {
      const res = await axios.get(`${url}/post/show_districtSearch?id_province=${id_province}`);
      setListDistrict(res.data.data);
  }
  // x??
  const getDataWard = async (id_district) => {
      var id_province = addProvince.undefined;
      const res = await axios.get(`${url}/post/show_wardSearch?id_province=${id_province}&&id_district=${id_district}`);
      setListWard(res.data.data);
  }        
  const [searching,setSearching] = useState(false);
  const [getKeywords,setgetKeywords] = useState([]);
  const [getDataPostSearch,setGetDataPostSearch] = useState([]);
  const [getimage,setgetImage] = useState([]);
  const handleChangeKeyWord = (e) => {
    setKeyword({ ...keyword,[e.target.name]:e.target.value});
  }
  const handleChangeSearch = (e) => {
    const data = e.target.value;
    getSearch(data)
  }
  const handleSubmitSearch = e => {
    e.preventDefault()
    navigate(`../searchroom?keyword=${keywords}&province=${keyword.province}&ward=${keyword.ward}&stress=${keyword.stress == undefined ? "" : keyword.stress}&district=${keyword.district}&price=${keyword.price}&area=${keyword.area}&typeRoom=${typeRoom}`);
  }
const handleSubmitNear = async (e) => {
  e.preventDefault()
const id_user = user ? user[0].id : "";
const Account = await axios.get(`${url}/user/show/${id_user}`);
if(Account.data.data[0].id_province == null || Account.data.data[0].id_district == null || Account.data.data[0].id_ward == null ) {
  navigate(`../update_acc/${id_user}`);
 }else{
  navigate(`../searchroom?province=${Account.data.data[0].id_province}&district=${Account.data.data[0].id_district}&ward=${Account.data.data[0].id_ward}&&stress=${Account.data.data[0].address}`);
 }
 
}
   // modal post
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

  return (
    <>
      {loading ? 
          <HashLoader className='css_loading'
          color={'#0d3380'}
          loading={loading}
          size={100}
          style={{display: 'inherit', position: 'relative', height: '100px', transform: 'rotate(165deg)'}}
          />
          :
         
            <div className="container">
              <div className="row room_search">
                <div className='col-lg-9 col-md-9 col-sm-12 SearchRoom'>
                  <input className="form-control inputRoomSearch" placeholder="Nh???p t??n b???n mu???n t??m ki???m " type="text" name="keywords" onChange={(e) => handleChangeSearch(e)} />
                  {/* <i className="fa-solid fa-search"></i> */}
                </div>
                <div className='col-lg-1 col-md-1 col-sm-12'>
                  <Button   
                    variant="warning"
                    style={{color: 'black', fontWeight: 600, borderRadius: '5px'}} 
                    onClick={(e) => handleSubmitNear(e)}
                    > 
                    G???n b???n 
                    <i className="fa-sharp fa-solid fa-location-dot" 
                    style={{marginLeft: '7px'}} ></i>
                  </Button>
                </div>
                <div className='col-lg-1 col-md-1 col-sm-12'>
                  <Button   
                    variant="warning" 
                    style={{color: 'black', fontWeight: 600, borderRadius: '5px'}} 
                    onClick={handleShow} > L???c
                    <i className="fa-solid fa-filter" 
                    style={{marginLeft: '7px'}} ></i>
                  </Button>
                </div>
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>L???c</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                  <div className="modal_show">
                    <select className="form-select online_book3" name="typeRoom" onChange={(e) => handleChangeKeyWord(e)}>
                      <option>Lo???i ph??ng</option>
                      { 
                        typeRooms.map((r,i) => {
                          return <option key={i} value={r.id_room_type}>{r.name_room_type}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="modal_show">
                    <select className="form-select online_book3" name="fur" onChange={(e) => handleChangeKeyWord(e)}>
                      <option>N???i th???t</option>
                      {
                        listFur.map((f,i) => {
                          return <option key={i} value={f.id_furniture}>{f.name}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="modal_show">
                    <select className="form-select online_book3" name="id_province" onChange = {(e) => handleProvince(e)} >
                      <option>T???nh</option>
                      {listProvince.map((room, index) => {
                        return (
                        <option key={index} value={room.id_province} >{room._name}</option>
                        );
                        })}
                    </select>
                  </div>
                  <div className="modal_show">
                    <select className="form-select online_book3" name="id_district" onChange = {(e) => handleDistrict(e)} >  
                      <option>Qu???n/Huy???n</option>
                      {listDistrict.map((room, index) => {
                        return (
                        <option key={index} value={room.id_district}>{room._name}</option>
                        );
                      })}       
                    </select>
                  </div>
                  <div className="modal_show">
                    <select className="form-select online_book3" name="id_ward"onChange = {(e) => handleChangeKeyWord(e)} > 
                    <option>X??/Ph?????ng</option>
                    {listWard.map((room, index) => {
                      return (
                        <option key={index} value={room.id} >{room._name}</option>
                        );
                    })}       
                    </select>
                  </div>
                  <div className="modal_show">
                    <input type="text" name="stress" className="form-control" placeholder="Nh???p t??n ???????ng b???n mu???n t??m "  value={stress} onChange={(e) => handleChangeKeyWord(e)} />
                  </div>
                  <div className="modal_show">
                    <select className="form-select online_book3" name="price" onChange={(e) => handleChangeKeyWord(e)}>
                      <option>Gi??</option>
                      <option value={1}>D?????i 1 tri???u</option>
                      <option value={2}>T??? 1 - 2 tri???u</option>
                    </select>
                  </div>
                  <div className="modal_show">
                    <select className="form-select online_book3" name="area" onChange={(e) => handleChangeKeyWord(e)}>
                      <option>Di???n t??ch</option>
                      <option value="1">D?????i 20m</option>
                      <option value="2">Tr??n 20m</option>
                    </select>
                  </div>
                  <div className="modal_show">
                      <Button type="submit" className='search_room_btn2' onClick={e => handleSubmitSearch(e)} >L???c </Button> 
                  </div>
                </Modal.Body>
              </Modal>
              <div className="all-room">
                <div className="row rs_screen">
                      {currentPosts.length > 0 ? currentPosts.map((post, index) => {
                        return (     
                          <div className="col-lg-4 col-md-12 col-sm-12 " key={index}>
                              <div id="serv_hover" className="room allRoom">
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
                      })
                      :(
                        <div className="col-md-4 col-sm-6 searchroom">
                            <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png" alt='' width={300} height={300} className="shopee-search-empty-result-section__icon"></img>
                                <p className='searchroom'>Kh??ng t??m th???y ???????c k???t qu??? n??o ! Vui l??ng nh???p l???i t??? kh??a b???n c???n t??m</p>
                        </div>
                    )}
                      </div>
                      {/* phan trang */}
                      <Pagination totalPost={listPost.length} 
                      postsPerPage={postsPerPage} 
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage} />
              </div>
            </div>
      }
    </>
  )
}

export default RoomND
