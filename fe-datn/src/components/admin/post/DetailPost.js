import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useParams } from 'react-router-dom';
import { url } from '../../url';
import { TabTitle } from '../../title';

function DetailPost() {
    TabTitle('Chi tiết bài viết');
    const {id_post} = useParams();
    const [listPost, setListPost] = useState([]);
    const [listImg, setListImg] = useState([]);
    const [listFurniture, setListFurniture] = useState([]);
    const [listprovince, setListprovince] = useState([]);
    const [listdistrict, setListdistrict] = useState([]);
    const [listward, setListward] = useState([]);
    const [listRoom, setListRoom] = useState([]);
    const [loader,setLoader] = useState(0);
    useEffect(() => {
        updateView();
        getData();
        province();
        district();
        ward();
    },[loader]);
    // show phone contact
    var showBtn = document.querySelector('#button_contact')
    var hideBtn = document.querySelector('#button_phone')
    const handleClick = (e) => {
        showBtn.style.display = 'none'
        hideBtn.style.display = 'block'        
    };
    // danh sach post
    const getData = async () => {
        const res = await axios.get(`${url}/post/showPost/${id_post}`);
            setListPost(res.data.data);
        const getImg = await axios.get(`${url}/imgPost/show_detail/${id_post}`);
            setListImg(getImg.data.data);
        const Furniture = await axios.get(`${url}/post/furniture/${id_post}`);  
            setListFurniture(Furniture.data.data);
        const room = await axios.get(`${url}/post/show_roomtype/${id_post}`);
            setListRoom(room.data.data);
    };
    const updateView = async () => {
        const update = await axios.put(`${url}/post/updateView/${id_post}`);
    };
    // tinh
    const province = async () => {
        const res = await axios.get(`${url}/post/show_province_detail/${id_post}`);
          setListprovince(res.data.data);
    }; 
    // huyen
    const district = async () => {
        const res = await axios.get(`${url}/post/show_district_detail/${id_post}`);
          setListdistrict(res.data.data);
    };  
    // xa 
    const ward = async () => {
        const res = await axios.get(`${url}/post/show_ward_detail/${id_post}`);
          setListward(res.data.data);
    };
    const handleLoaderPost = (e,loaders) => {
        setLoader(loader+1);
    };
 
    
  return (
    <div className="pd-wrap" style={{marginTop:"200px"}}>
    {listPost.map((a, index) => {
        return(
        <div className="container" key={index}>
            <div className="row">
                <div className="col-md-6">
                    <div className="product-slider">
                        <div className='slider-image'>
                            {/* SAU NÀY PHẢI LÀM SLIDER */}
                           <Carousel>
                            {listImg.map((img,i) => {
                            return (
                            <div className="item" key={i}>   
                                    <img className="img-fluid" src={img.link_img_user} alt="abcd"  />
                                </div>
                            );})}
                            </Carousel>
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
                    <div className='master-information'>
                       
                       <b>Thông tin chủ phòng</b>
             
                  
                      </div>
                    <div className="product-count">
                       <div>
                            <Link to={`../square/${a.id_post}`} className="round-black-btn">
                             <span className='xempt'> Xem phòng trống</span>
                            </Link>
                            
                       </div>
                       <div>
                            <Button onClick ={(e) => handleClick(e)} className="round-black-btn">
                                <span className='lienhn' id="button_contact" >Liên hệ ngay</span>
                                <span id="button_phone" style={{display:"none"}}>{a.phone}</span> 
                            </Button>
                       </div>
                           
                     
                       


                    </div>
                    
                    
                </div>
            </div>
            <div className="detail_room">
            <h1 className='thongtinchitiet-roomdetail'><b className='b_title'>Thông tin chi tiết</b></h1>
            <hr />   
                <div className='row'>   
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <div className='content_detail_____'>
                            <p>Giá phòng : </p>    
                            <span style={{marginLeft:'3px'}}> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a.room_price)}</span>
                        </div>
                        <div className='content_detail_____'>
                            <p>Diện tích    : </p>
                            <span style={{marginLeft:'3px'}}> {a.area}m<sup>2</sup></span>
                        </div>
                        <div className='content_detail_____'>
                            <p>Địa chỉ : </p>        
                        <span>
                        <strong> {a.address},</strong>
                            {listward.map((ward_detail, index) => {
                            return (   
                                <strong key={index}> {ward_detail._name}, </strong>                        
                                );
                            })}                  
                            {listdistrict.map((dis_detail, index) => {
                                return (   
                                    <strong key={index}> {dis_detail._name}, </strong>            
                                );
                            })}  
                            <strong> Thành phố </strong>
                            {listprovince.map((pro_detail, index) => {
                                return (   
                                <strong key={index}> {pro_detail._name}.</strong>                    
                            );
                            })}                   
                        </span>
                        </div>
                    </div>                        
                    <div className="col-lg-5 col-md-12 col-sm-12">
                        <div className='content_detail_____'>
                            <p>Giá nước : </p>
                            <span style={{marginLeft:'3px'}}> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a.water_price)}</span>
                        </div>
                        <div className='content_detail_____'>
                            <p>Giá điện : </p>
                            <span style={{marginLeft:'3px'}}> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a.electricity_price)}</span>
                        </div>
                        <div className='content_detail_____'>
                            <p> Loại phòng : </p>
                            {listRoom.map((room_detail, index) => {
                                return (                                             
                                    <span key={index} value={room_detail.id_room_type} style={{margin:'3px'}}>{room_detail.name_room_type} </span>                           
                                );
                            })} 
                        </div>
                    </div>
                    <div className='content___________'>
                            <p>Nội Thất : </p>
                            <div className="content_detail_____">
                                {listFurniture.map((furn_detail, index) => {
                                    return (       
                                    <div className='furniture__' key={index}>                                               
                                        <span  value={furn_detail.id_furniture} className={furn_detail.icon}>   {furn_detail.name}</span> 
                                    </div>         
                                    );
                                })}  
                            </div>
                        </div>  
                </div>
            </div>
            <div className="product-info-tabs">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" 
                        aria-controls="description" aria-selected="true"> Mô Tả </a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab" >
                        <div className='container'>
                            <div dangerouslySetInnerHTML={{__html:a.description}} />
                        </div>
                        <div className='' style={{'marginTop':'19px'}}>
                            <h3 className="dccuthe">Vị trí cụ thể</h3>
                            <div className='map' style={{maxWidth: '414px'}} dangerouslySetInnerHTML={{__html: a.ifarme}} /> 
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    )})}
</div>
  )
}

export default DetailPost