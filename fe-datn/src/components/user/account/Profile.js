import React from 'react'
import InfoAccount from './InfoAccount'
import Posted from './Posted'
import Bloged from './Bloged'

function Profile() {
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2>Thông tin cá nhân</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="contact">
            <div className="container">
                <div className="content_profile">
                    <div className="list-post">
                        <div className='profile row'>
                            <div className='col-md-6'>
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <img src='https://th.bing.com/th/id/R.0e0b8048a60c7df1b006dc922ccb40c2?rik=lef4Lt2Og7ea2Q&pid=ImgRaw&r=0' alt='hình ảnh' style={{width:'100px', height:'100px', borderRadius:'50%'}} />                        
                                    </div>
                                    <div className='col-md-3'>
                                        <b>Nhóm 1 (DATN)</b>
                                        <p> 10 Người theo dõi</p>
                                        <button className='follow'>+ Theo dõi</button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <p><i className='icon_profile bx bx-star'></i> Đánh giá: Chưa có đánh giá</p>
                                <p><i className='icon_profile bx bx-table'></i> Ngày tham gia: 11/1/2000</p>
                                <p><i className='icon_profile bx bx-map'></i> Địa chỉ: Chợ Mới, An Giang</p>
                                <p><i className='icon_profile bx bx-message-dots'></i> Phản hồi chat: Thỉnh thoảng (Phản hồi chậm)</p>
                                <p><i className='icon_profile bx bx-check-circle'></i> Đã cung cấp: <i className='icon_profile bx bxl-facebook-circle'></i> <i className='icon_profile bx bxl-google-plus-circle'></i> <i className='icon_profile bx bx-envelope'></i></p>
                            </div>
                        </div>
                    </div>
                <InfoAccount />
                <Posted />
                <Bloged />
                   
                  
                </div>
            </div>
        </div>
    </>    
  )
}

export default Profile