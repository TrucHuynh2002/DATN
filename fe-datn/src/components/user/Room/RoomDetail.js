import React, { useEffect, useState } from 'react';
import { Link, useParams  } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Evaluate from '../Comment/Evaluate';
import ContentComent from '../Comment/ContentComent';

function RoomDetail() {
    const {id_post} = useParams();
    const [listPost, setListPost] = useState([]);
    const [listImg, setListImg] = useState([]);
    const [listFurniture, setListFurniture] = useState([]);
    const [listprovince, setListprovince] = useState([]);
    const [listdistrict, setListdistrict] = useState([]);
    const [listward, setListward] = useState([]);
    const [listRoom, setListRoom] = useState([]);

    useEffect(() => {
        updateView();
        getData();
        getImg();
        province();
        district();
        ward();
        Furniture();
        room();
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
          setListprovince(res.data.data);
      }; 
      const district = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/post/show_district_detail/${id_post}`);
          setListdistrict(res.data.data);
      };   
      const ward = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/post/show_ward_detail/${id_post}`);
          setListward(res.data.data);
      }; 
      const room = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/post/show_roomtype/${id_post}`);
        setListRoom(res.data.data);
      };  
  
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
                                <img className="img-fluid" src={a.link_img_user} alt="#" key={index} />
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
                            <Button onClick ={(e) => handleClick(e)} className="round-black-btn">
                                <span id="button_contact">Liên hệ ngay</span>
                                <span id="button_phone" style={{display:"none"}}>{a.phone}</span> 
                            </Button>
                            <br />
                            <Link to={`../profile/${a.id_user}`} className="round-black-btn">
                                Thông tin người đăng
                            </Link>
                        </div>
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
                <div className='row detail_room'>   
                    <h3 className='room_h3'>Thông tin phòng</h3>                                
                    <div className='col-md-3 detail_room1'>
                        
                        <p><b>Giá phòng</b></p>    
                        <span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a.room_price)}</span>
                            </div>

                            <div className='col-md-3'>
                        <p><b>Diện tích</b></p>
                            <span >{a.area}m<sup>2</sup></span>
                            </div>

                            <div className='col-md-3'>
                        <p><b>Giá nước</b></p>
                            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a.water_price)}</span>
                            </div>

                             <div className='col-md-3'>
                        <p><b>Giá điện</b></p>
                            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a.electricity_price)}</span>
                    </div>
                    
                    <div className='col-md-3 detail_room1'>
                        <p><b>Loại phòng</b></p>
                            {listRoom.map((room_detail, index) => {
                            return (                                             
                                <span key={index} value={room_detail.id_room_type} style={{margin:'3px'}}>{room_detail.name_room_type} </span>                           
                            );
                            })} 
                    </div>                           
                    <div className='col-12 detail_room1'>
                        <b>Địa chỉ:</b>                 
                        <span style={{margin:'3px'}}>Thành phố</span>
                            {listprovince.map((pro_detail, index) => {
                            return (   
                                <span style={{margin:'3px'}} key={index}>{pro_detail._name},</span>                    
                            );
                            })}                   
                        <span style={{margin:'3px'}}>Quận</span> 
                            {listdistrict.map((dis_detail, index) => {
                            return (   
                                <span style={{margin:'3px'}} key={index}>{dis_detail._name},</span>            
                            );
                            })}                   
                        <span style={{margin:'3px'}}>Xã</span>
                            {listward.map((ward_detail, index) => {
                            return (   
                                <span style={{margin:'3px'}} key={index}>{ward_detail._name}.</span>                        
                            );
                            })} 
                            </div>
                </div>

                <div className='row detail_room'>   
                    <h3 className='room_h3'>Nội thất</h3>
                                                            
                        {listFurniture.map((furn_detail, index) => {
                        return (       
                            <div className='col-md-3 detail_room1'>                                       
                                <span key={index} value={furn_detail.id_furniture} className={furn_detail.icon}>   {furn_detail.name}</span>               
                            </div>                                               
                        );
                        })}    
                </div>

                <div className="product-info-tabs">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" 
                            aria-controls="description" aria-selected="true"> Mô Tả </a>
                            
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab"
                             aria-controls="review" aria-selected="false"> <span>170</span> Bình Luận  </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="rate-tab" data-toggle="tab" href="#rate" role="tab"
                             aria-controls="rate" aria-selected="false">Đánh Giá  </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab" >
                            <div className='container'>
                                <div dangerouslySetInnerHTML={{__html:a.description}} />
                            </div>
                            <div className='' style={{'marginTop':'19px'}}>
                                 <h3 className="dccuthe">Vị trí cụ thể</h3>
                                <div dangerouslySetInnerHTML={{__html: a.ifarme}} /> 
                            </div>  
                           
                        </div>
                        <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                            <div className="review-heading">
                                <h1 className="content_room_h1">Bình Luận</h1>
                            </div>
                            <ContentComent />

                        </div>
                        <div className="tab-pane fade" id="rate" role="rate" aria-labelledby="review-tab">
                            <div className="review-heading">
                                <h1 className="content_room_h1">Đánh giá {a.post_name}</h1>
                            </div>
                            <Evaluate />                
                        </div>
                    </div>
                </div>
              
                </div>
               )})}
        </div>

    </>
  )
}

export default RoomDetail