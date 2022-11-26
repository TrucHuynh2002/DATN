import React from 'react'
import { Link } from 'react-router-dom'

function RoomDetail() {
  return (
    <>
        <div className="pd-wrap">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="product-slider">
                            <div className="item" >
                                <img className="img-fluid" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" />
                            </div>
                           <div className="item item-img">
                                <div className="col-3">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQI6nUmObt62eDkqNSmIvCN_KkQExtbpJmUbVx_eTh_Y3v3r-Jw" />
                                </div>
                                <div className="col-3">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQI6nUmObt62eDkqNSmIvCN_KkQExtbpJmUbVx_eTh_Y3v3r-Jw" />
                                </div>
                                <div className="col-3">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQI6nUmObt62eDkqNSmIvCN_KkQExtbpJmUbVx_eTh_Y3v3r-Jw" />
                                </div>
                                <div className="col-3">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQI6nUmObt62eDkqNSmIvCN_KkQExtbpJmUbVx_eTh_Y3v3r-Jw" />
                                </div>
                           </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product-dtl">
                            <div className="product-info">
                                <div className="product-name">
                                    <h2>Phòng trọ A</h2>
                                </div>
                                <div className="reviews-counter">
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
                                    <div >
                                        <span>3 đánh giá</span>
                                    </div>
                                </div>
                                <div className="product-price-discount">1.000.000 vnd</div>
                                <div>
                                    <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                            </div>
                        </div>
                        <div className="product-count">
                            <Link to="" className="round-black-btn">
                                Liên hệ ngay
                            </Link>
                           <br />
                            <Link to="" className="round-black-btn">
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
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum. Sed ut
                            perspiciatis unde omnis iste natus error sit voluptatem accusantium
                            doloremque laudantium, totam rem aperiam.
                        </div>
                        <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                            <div className="review-heading">
                                <h1>Đánh giá Nồi chiên không dầu AVA AF358T 4 lít</h1>
                            </div>
                            <div>
                                nơi showw đánh giá
                            </div>
                            <form className="review-form">
                                <div className="reviews-counter">
                                    {/* <h3>Đánh giá của bạn</h3> */}
                                    <div className="rate">
                                        <input type="radio" id="star5" name="rate" defaultValue={5} defaultChecked="" />
                                        <label htmlFor="star5" title="text">Rất tốt </label>
                                        <input type="radio" id="star4"name="rate"defaultValue={4}defaultChecked=""/>
                                        <label htmlFor="star4" title="text">4 stars</label>
                                        <input type="radio" id="star3" name="rate" defaultValue={3} defaultChecked=""/>
                                        <label htmlFor="star3" title="text">3 stars</label>
                                        <input type="radio" id="star2" name="rate" defaultValue={2} />
                                        <label htmlFor="star2" title="text"> 2 stars </label>
                                        <input type="radio" id="star1" name="rate" defaultValue={1} />
                                        <label htmlFor="star1" title="text"> 1 star</label>           
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" name="" className="form-control" placeholder="Tên người dùng"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" name="" className="form-control" placeholder="Email"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <h4>Viết bình luận của bạn</h4>
                                        <textarea className="form-control" rows={10} defaultValue={""} />
                                    </div>
                                    <button type="submit" className="round-black-btn">Gửi bình luận</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default RoomDetail