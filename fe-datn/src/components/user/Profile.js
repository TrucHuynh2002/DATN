import React from 'react'
import ListAccount from '../account/account_information/ListAccount'

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
          
           <ListAccount />
           
            <div className="list-post">
                {/* <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Profile</h1> */}
                <h1><b>Tin đã đăng</b></h1>
                <div className='row'>
                    <hr></hr>
                    <div className='col-md-8'>
                        <div className='row'>
                            <div className='col-md-2'>
                                <img src='https://th.bing.com/th/id/R.0e0b8048a60c7df1b006dc922ccb40c2?rik=lef4Lt2Og7ea2Q&pid=ImgRaw&r=0' alt='hình ảnh' style={{width:'100px', height:'100px'}} />                        
                            </div>
                            <div className='col-md-6'>
                                <p>Nhà trọ giá rẻ</p>
                                <p style={{color:"red"}}><b>1.000.000 đ</b></p>
                                <div style={{marginTop:"25px"}}>
                                    <img src='https://th.bing.com/th/id/R.0e0b8048a60c7df1b006dc922ccb40c2?rik=lef4Lt2Og7ea2Q&pid=ImgRaw&r=0' alt='hình ảnh' style={{width:'30px', height:'30px', borderRadius:'50%'}}/> Khoa | 2 tháng trước | An Giang
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<hr></hr>
                <h1><b>Bài viết đã đăng</b></h1>
                <div className='row'>
                    <hr></hr>
                    <div className='col-md-8'>
                        <div className='row'>
                            <div className='col-md-2'>
                                <img src='https://static2.yan.vn/YanNews/2167221/202208/doi-227a6767.jpg' alt='hình ảnh' style={{width:'100px', height:'100px'}} />                        
                            </div>
                            <div className='col-md-6'>
                                <p><b>Ký túc xá</b></p>
                                <p>Phù hợp cho bạn nào đang tìm phòng riêng nhỏ gọn tối về nghĩ ngơi, yên tĩnh, môi truờng khu dân cư an ninh.</p>
                                <div style={{marginTop:"25px"}}>
                                    <img src='https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-1/298208490_3105609269749725_6224150366325883573_n.jpg?stp=dst-jpg_p240x240&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Av3PaLuHHAYAX_rdVrc&_nc_ht=scontent.fvca1-4.fna&oh=00_AfD6d0g4yoyayKUl1yqmjJIw6in2lIQpqpKNlWOzpZmWxQ&oe=6389BCD6' alt='hình ảnh' style={{width:'30px', height:'30px', borderRadius:'50%'}}/> Văn Vũ | 20 phút trước | Cần Thơ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
</div>
    </>    
  )
}

export default Profile