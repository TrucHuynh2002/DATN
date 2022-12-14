import React from 'react';

function PriceRoom() {
  return (
    <>
        <div className="manage col-6">
            <div className="container">
                <div className="content_profile">
                    <div className="list-post">
                        <h1><b className="b_title">Hóa đơn</b></h1>
                        <div className='row bill'>
                            <div className='col-lg-4 col-sm-12'>
                                <span>Từ ngày </span><span>sss</span><span>đến</span><span>dd</span>
                            </div>
                            <div className='col-lg-8 col-sm-12'>
                                <div className='row'>
                                    <div className='col-lg-6 col-sm-12'>
                                        <input type="date" name="" className='form-control'/>                  
                                    </div>
                                    <div className='col-lg-6 col-sm-12'>
                                        <input type="date" name="" className='form-control'/>                 
                                    </div>
                                </div>  
                            </div>
                        </div> 
                        <hr></hr>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default PriceRoom
