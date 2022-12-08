import React, { useEffect, useState } from 'react';
import { Link, useParams  } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Evaluate from '../Comment/Evaluate';
import Modal from 'react-bootstrap/Modal';

function RoomDetail() {
    const {id_post} = useParams();
    const [listPost, setListPost] = useState([]);
    const [listImg, setListImg] = useState([]);
    const [listFurniture, setListFurniture] = useState([]);
    const [listprovince, setListprovince] = useState([]);
    const [listdistrict, setListdistrict] = useState([]);
    const [listward, setListward] = useState([]);
    // const [listAddress, setListAddress] = useState([]);

    useEffect(() => {
        updateView();
        getData();
        getImg();
        province();
        district();
        ward();
        Furniture();
    },[]);
    // show phone contact
    var showBtn = document.querySelector('#button_contact')
    var hideBtn = document.querySelector('#button_phone')
    const handleClick = (e) => {
        showBtn.style.display = 'none'
        hideBtn.style.display = 'block'        
    };
    // danh sach post
    const getData = async () => {
                const res = await axios.get(`http://127.0.0.1:8000/api/post/showPost/${id_post}`);
                setListPost(res.data.data);
    };
    const getImg = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/imgPost/show_detail/${id_post}`);
        setListImg(res.data.data);        
    };
    const updateView = async () => {
        const update= await axios.put(`http://127.0.0.1:8000/api/post/updateView/${id_post}`);
    };
    const Furniture = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/post/furniture/${id_post}`);  
          setListFurniture(res.data.data);
      };
      const province = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/post/show_province_detail/${id_post}`);
        console.log(res);
          setListprovince(res.data.data);
      }; 
      const district = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/post/show_district_detail/${id_post}`);
        console.log(res);
          setListdistrict(res.data.data);
      };   
      const ward = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/post/show_ward_detail/${id_post}`);
        console.log(res);
          setListward(res.data.data);
      };  
    //    const street = async () => {
    //     const res = await axios.get(`http://127.0.0.1:8000/api/post/show_street_detail/${id_post}`);
    //     console.log(res);
    //       setListstreet(res.data.data);
    //   }; 
    // show mo ta phong
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <>
        <div className="pd-wrap">
            {listPost.map((a, index) => {
               return(
                <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="product-slider">
                            <div className="item" >
                            {listImg.map((a, index) => {
                                return(
                                <img className="img-fluid" src={a.link_img_user} alt="#" />
                                )})}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product-dtl">
                            <div className="product-info">
                                <div className="product-name">
                                    <h2>{a.post_name}</h2>
                                </div>
                               
                                <span className='currency'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a.room_price)}</span>
                                <div className="product-price-discount">Số Lượng : {a.quantity}</div>
                                <div>
                                    <p>{a.description_sort}</p>
                                </div>
                            </div>
                        </div>
                        <div className="product-count">
                            <Button onClick={handleShow} className="round-black-btn">
                                Chi tiết
                            </Button>
                            <br />
                            <Button onClick ={(e) => handleClick(e)} className="round-black-btn">
                                <span id="button_contact">Liên hệ ngay</span>
                                <span id="button_phone" style={{display:"none"}}>{a.phone}</span> 
                            </Button>
                            <br />
                            <Link to={`../profile/${a.id_user}`} className="round-black-btn">
                                Thông tin người đăng
                            </Link>
                        </div>
                        {/* start show chi tiết phòng */}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Mô tả chi tiết</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className=''>                                   
                                    <p>Diện tích: {a.area}m<sup>2</sup></p>    
                                    <p>Giá nước: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a.water_price)}</p>
                                    <p>Giá điện: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a.electricity_price)}</p>
                                    <p>Nội thất:
                                    {listFurniture.map(( furn, index) => {
                                    return (                                             
                                        <option key={index} value={furn.id_furniture}>{furn.name}</option>                           
                                    );
                                    })}
                                    </p> 
                                    <p> Tinh : </p>  
                                    {listprovince.map(( furn, index) => {
                                    return (   
                                        <>
                                        <p>{furn._name}</p>   
                                       
                                        </> 
                                                               
                                    );
                                    })}
                                     <p> quna : </p>  
                                    {listdistrict.map(( furn, index) => {
                                    return (   
                                        <>
                                        <p>{furn._name}</p>   
                                       
                                        </> 
                                                               
                                    );
                                    })}
                                     <p> xa : </p>  
                                    {listward.map(( furn, index) => {
                                    return (   
                                        <>
                                        <p>{furn._name}</p>   
                                       
                                        </> 
                                                               
                                    );
                                    })}
                                   
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button> 
                            </Modal.Footer>
                        </Modal>
                        {/* end show chi tiết phòng */}
                        <div className="product-count-help" >
                            <div>
                            <i className='bx bx-support'></i>
                                <label>Cần sự trợ giúp</label>
                            </div>
                            <div>
                            <i className='bx bx-error'></i>
                                <label>Báo cáo tin này</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-info-tabs">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true"> Mô tả </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false"> <span>170</span> lượt Đánh giá  </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab" >
                        <div dangerouslySetInnerHTML={{__html:a.description}} />   
                        </div>
                        <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                            <div className="review-heading">
                                <h1 class="content_room_h1">Đánh giá {a.post_name}</h1>
                            </div>
                            <Evaluate />                
                        </div>
                    </div>
                </div>
                <h3 className="dccuthe">Vị trí cụ thể</h3>
                <div dangerouslySetInnerHTML={{__html: a.ifarme}} />
                </div>
               )})}
        </div>

    </>
  )
}

export default RoomDetail