import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../../url';
import { TabTitle } from '../../title';

function DetailPost() {
    TabTitle('Chi tiết bài viết');
    const {id_post} = useParams();
    const [listPost, setListPost] = useState([]);
    const [listImg, setListImg] = useState([]);

    useEffect(() => {
        getData();
        getImg();
    },[]);

    // danh sach post
    const getData = async () => {
    const res = await axios.get(`${url}/post/show/${id_post}`);
    setListPost(res.data.data);
    };
    const getImg = async () => {
        const res = await axios.get(`${url}/imgPost/show_detail/${id_post}`);
        setListImg(res.data.data);        
    };

  return (
    <>
        <div className="pd-wrap">
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
                                    <h2>{listPost.post_name}</h2>
                                </div>
                                <div className='currency'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(listPost.room_price)}</div>
                                <div className="product-price-discount">Số Lượng : {listPost.quantity}</div>
                                <div>
                                    <p>{listPost.description_sort}</p>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div className="product-info-tabs">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true"> Mô tả </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab" dangerouslySetInnerHTML={{__html:listPost.description}}>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default DetailPost