import React from 'react';
import { Button } from 'react-bootstrap';

function CheckRoomManage() {
    

  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2 className="b_title">Cập nhật phòng đặt cọc</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='manage row'>
            <div className="container content_profile">
                <div className="list-post checkroom">
                    <div className='col-md-6'>
                        <h1>Thông tin người thuê phòng</h1>
                        <h3>Tên người thuê phòng : Nhóm 1</h3>
                        <h3>Số điện thoại : 0907673005</h3>
                        <h3>Email :  nhom1gmail.com</h3>
                        <h3>Địa chỉ :  Ninh Kiều, Cần Thơ</h3>
                    </div>                  
                    <div className='col-md-6'>
                        <h1>Thông tin phòng trọ</h1>
                        <h3>Tên chủ phòng : Nhóm</h3>
                        <h3>Tên phòng : phòng trọ cần thơ</h3>
                        <h3>Số phòng : A7</h3>
                        <h3>Tiền phòng : 1.000.000 đ</h3>
                        <h3>Tiền nước : 4.000 đ</h3>
                        <h3>Tiền điện : 4.000 đ</h3>
                    </div>                   
                </div>
                <Button style={{display:"block"}} id="room_number_button" className="btn btn-primary">Cập nhật</Button>
            </div>
        </div>
    </>
  )
}

export default CheckRoomManage