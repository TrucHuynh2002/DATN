import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function RoomDetail() {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const id_post = urlParam.get('id_post');
    const id_roomNumber = urlParam.get('id_roomNumber');
    const [listPost, setListPost] = useState([]);
    const [listImg, setListImg] = useState([]);
    const [listFurniture, setListFurniture] = useState([]);
    const [listprovince, setListprovince] = useState([]);
    const [listdistrict, setListdistrict] = useState([]);
    const [listward, setListward] = useState([]);
    const [liststreet, setListstreet] = useState([]);
    const [listRoom, setListRoom] = useState([]);
    const [quantityPost, setQuantityPost] = useState([]);
    useEffect(() => {
        getData();
        getImg();
        province();
        district();
        ward();
        street();
        Furniture();
        room();
        handleChange();
    },[]);
    const handleChange = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/roomNumber/show/${id_roomNumber}`); 
        setQuantityPost(res.data.data);
    };
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
      const street = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/post/show_street_detail/${id_post}`);
          setListstreet(res.data.data);
      }; 
      const room = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/post/show_roomtype/${id_post}`);
        setListRoom(res.data.data);
      };  
    return (
    <>
         <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2 className="b_title">Đặt Phòng</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container" style={{marginTop:'15px'}}>
        {listPost.map((a, index) => {
            return(
            <div className="row" key={index}>
                <div className="product-slider col-md-5">
                    <div className='slider-image' style={{"display":"flex","alignItems":"center"}}>
                        <Carousel>
                            { listImg.map((img,i) => {
                            return (
                            <div className="item" key={i}>   
                                    <img className="img-fluid" src={img.link_img_user} alt="abcd"  />
                                </div>
                            );})}
                        </Carousel>
                    </div>
                </div>
                <div className="col-md-7" style={{paddingLeft:'15px'}}>
                    <div className='account_content____' key={index}>
                        <h1 className="name_title">{a.post_name}</h1>
                        <h3 className="content___">{a.description_sort}</h3>                             
                    </div>
                    <div className='account_content____'>
                        <h4 className="name_title2"> Giá phòng : 
                            <span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a.room_price)} </span>
                        </h4>
                    </div>
                    <div className='account_content____'>
                        <h4 className="name_title2"> Giá điện : 
                            <span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a.water_price)} </span>
                        </h4>
                    </div>
                    <div className='account_content____'>
                        <h4 className="name_title2"> Giá nước : <span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a.electricity_price)}</span></h4>
                    </div>
                    <div className='account_content____'>
                        <h4 className="name_title2"> Diện tích : <span> {a.area}m<sup>2</sup></span>  </h4>
                    </div>
                    <div className='account_content____'>
                        <h4 className="name_title2"> Loại phòng : 
                            <span>
                                {listRoom.map((room_detail, index) => {
                                    return (                                             
                                        <span key={index} value={room_detail.id_room_type} style={{margin:'3px'}}>{room_detail.name_room_type} </span>                           
                                    );
                                })} 
                            </span> 
                        </h4>
                    </div>  
                    <div className='account_content____'>
                        <h4 className="name_title2"> Số phòng : 
                            <span key={index} value={quantityPost.room_number} style={{margin:'3px'}}>{quantityPost.room_number} </span>                           
                        </h4>
                    </div>  
                    <div className='account_content____'>
                        <h4 className="name_title2" style={{fontWeight: '300'}}> Địa chỉ: 
                            <strong style={{marginRight:'2px'}}> Thành phố </strong>
                                {listprovince.map((pro_detail, index) => {
                                    return (   
                                    <strong style={{marginRight:'2px'}}  key={index}> {pro_detail._name}, </strong>                    
                                );
                                })}                   
                            <strong style={{marginRight:'2px'}}> Quận </strong> 
                                {listdistrict.map((dis_detail, index) => {
                                    return (   
                                        <strong style={{marginRight:'2px'}} key={index}> {dis_detail._name}, </strong>            
                                    );
                                })}                   
                            <strong style={{marginRight:'2px'}}> Xã </strong>
                                {listward.map((ward_detail, index) => {
                                return (   
                                    <strong style={{marginRight:'2px'}} key={index}> {ward_detail._name}, </strong>                        
                                    );
                                })} 
                        </h4>                  
                    </div>
                    <div className='account_content____'>
                        <h4 className="name_title2">Nội thất: 
                        <div className="content_detail_____">
                            {listFurniture.map((furn_detail, index) => {
                                return (       
                                <div className='furniture__' key={index}>                                               
                                    <span  value={furn_detail.id_furniture} className={furn_detail.icon}>   {furn_detail.name}</span> 
                                </div>         
                                );
                            })}  
                        </div>
                        </h4>                    
                    </div>
                </div>
            </div>
            );
            })}
        </div>
    </>
      )

}

export default RoomDetail