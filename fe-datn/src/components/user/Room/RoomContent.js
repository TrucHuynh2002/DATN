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
  // huyện 
  const getDataDistrict = async (id_province) => {
      const res = await axios.get(`${url}/post/show_districtSearch?id_province=${id_province}`);
      setListDistrict(res.data.data);
  }
  // xã
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
                  <input className="form-control inputRoomSearch" placeholder="Nhập tên bạn muốn tìm kiếm " type="text" name="keywords" onChange={(e) => handleChangeSearch(e)} />
                  {/* <i className="fa-solid fa-search"></i> */}
                </div>
                <div className='col-lg-1 col-md-1 col-sm-12'>
                  <Button   
                    variant="warning"
                    style={{color: 'black', fontWeight: 600, borderRadius: '5px'}} 
                    onClick={(e) => handleSubmitNear(e)}
                    > 
                    Gần bạn 
                    <i className="fa-sharp fa-solid fa-location-dot" 
                    style={{marginLeft: '7px'}} ></i>
                  </Button>
                </div>
                <div className='col-lg-1 col-md-1 col-sm-12'>
                  <Button   
                    variant="warning" 
                    style={{color: 'black', fontWeight: 600, borderRadius: '5px'}} 
                    onClick={handleShow} > Lọc
                    <i className="fa-solid fa-filter" 
                    style={{marginLeft: '7px'}} ></i>
                  </Button>
                </div>
              </div>
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
                    <input type="text" name="stress" className="form-control" placeholder="Nhập tên đường bạn muốn tìm "  value={stress} onChange={(e) => handleChangeKeyWord(e)} />
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
                      <Button type="submit" className='search_room_btn2' onClick={e => handleSubmitSearch(e)} >Lọc </Button> 
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
                                <p className='searchroom'>Không tìm thấy được kết quả nào ! Vui lòng nhập lại từ khóa bạn cần tìm</p>
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
