import React from 'react';
import { Link } from 'react-router-dom';
import RoomNew from '../../images/phong1.png';

function Search() {
  return (
    <>
    <div className="back_re">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="title">
                        <h2>Kết quả tìm kiếm</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="our_room">
        <div className="container">
            <div className="row">  
                <div className="col-md-4 col-sm-6">
                    <div id="serv_hover" className="room">
                        <div className="room_img">
                            <figure><img src={RoomNew} alt="#" /></figure>
                            <div class="heart">
                            <i class='bx bxs-heart'></i>
                            </div>
                        </div>
                        <div className="bed_room">
                            <h3><Link to="../roomdetail">Nhà trọ sinh viên</Link></h3>
                            <h4>Giá: 1.000.000 VNĐ</h4>
                            <p>Mô tả nhà trọ sinh viên</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default Search