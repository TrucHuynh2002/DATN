import React, { useEffect, useState } from 'react';
import { Link, useParams  } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Evaluate from '../Comment/Evaluate';
// import HeartRoom from '../HeartRoom';

function RoomDetail() {
    const {id_post} = useParams();
    const [listPost, setListPost] = useState([]);
    const [listImg, setListImg] = useState([]);
    // console.log(listImg);
    useEffect(() => {
        updateView();
        getData();
        getImg();
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
        // console.log(update)
    }
    
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
                            {/* <div className="item item-img">
                            
                                <div className="col-3">
                                    <img src={a.link_img_user} alt="#" />
                                </div>
           
                            </div> */}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product-dtl">
                            <div className="product-info">
                                <div className="product-name">
                                    <h2>{a.post_name}</h2>
                                </div>
                                {/* <div className="reviews-counter">
                                    <div className="rate">
                                        <input type="radio" id="star5" name="rate" defaultValue={5} defaultChecked="" />
                                        <label htmlFor="star5" title="text">5 stars </label>
                                        <input type="radio"id="star4"name="rate" defaultValue={4} defaultChecked=""/>
                                        <label htmlFor="star4" title="text">4 stars</label>
                                        <input type="radio" id="star3" name="rate" defaultValue={3} defaultChecked=""/>
                                        <label htmlFor="star3" title="text">3 stars</label>
                                        <input type="radio" id="star2" name="rate" defaultValue={2} />
                                        <label htmlFor="star2" title="text"> 2 stars </label>
                                        <input type="radio" id="star1" name="rate" defaultValue={1} />
                                        <label htmlFor="star1" title="text"> 1 star</label>
                                    </div>
                                    <div>
                                        <span>3 đánh giá</span>
                                    </div>
                                </div> */}
                                <div className="product-price-discount">{a.room_price} VNĐ</div>                                   
                                <div className="product-price-discount">Số Lượng : {a.quantity}</div>
                                <div>
                                    <p> {a.description_sort}</p>
                                </div>
                            </div>
                        </div>
                        <div className="product-count">
                            {/* <Button className="round-btn">
                                 <HeartRoom /> *
                            </Button> */}
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