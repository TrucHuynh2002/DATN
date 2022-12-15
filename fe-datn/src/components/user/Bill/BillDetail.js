import React from 'react'

function BillDetail() {
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2>Chi tiết hóa đơn</h2>
                        </div>
                    </div>
               </div>
            </div>  
        </div>
        <div className='row'>
            <div className="manage col-6 bill_deatail">
                <div className="container">
                    <div className="content_profile">
                        <div className="list-post">
                            <div className='bill_row'>
                                <p>Tên người thuê phòng: Oggy</p>
                                <p>Số phòng: A7</p>
                                <p>Tổng giá phòng: 2.500.000 đ</p>
                                <p>Tổng giá điện: 40.000 đ</p>
                                <p>Tổng giá nước: 14.000 đ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default BillDetail