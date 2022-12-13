import React from 'react';
import { Link } from 'react-router-dom';

function Square() {
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2 className="b_title">Xem phòng</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="manage">
            <div className="container">
                <div className="content_profile">
                    <div className="list-post">
                        <div className='row'>
                            <div className="square">
                                <div className="block1"></div>
                                <div className="block2"></div>
                                <div className="block3"></div>
                                <div className="block4"></div>
                                <div className="block5"></div>
                            </div>
                        </div>  
                        <Link to="../roomDetailManage">Đặt phòng</Link>          
                    </div>
                </div>
            </div>
        </div>
        {/* chú thích */}
        <div className='color_room_manage'>
            <div className='color_empty_room' style={{marginLeft:"100px", marginTop:"20px"}}></div><span style={{marginLeft:"5px"}}>Phòng trống</span>
            <div className='color_ownership_room'></div><span style={{marginLeft:"5px"}}>Phòng đã sở hữu</span>
            <div className='color_deposit_room'></div><span style={{marginLeft:"5px"}}>Phòng đặt cọc</span>
        </div>
    </>
  )
}

export default Square