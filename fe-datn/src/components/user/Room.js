import React from 'react'
import { Link } from 'react-router-dom';

// link img
import RoomNew from '../../images/phong1.png';

function Room() {
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2>Tất cả phòng</h2>
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
                            <figure>
                            <img src={RoomNew} alt="#" />
                            </figure>
                        </div>
                        <div className="bed_room">
                            <h3><Link to="roomdetail">Tên phòng</Link></h3>
                            <h4>Giá: 12783612783612</h4>
                            <p>
                            If you are going to use a passage of Lorem Ipsum, you need to be
                            sure there{" "}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6">
                    <div id="serv_hover" className="room">
                    <div className="room_img">
                        <figure>
                        <img src={RoomNew} alt="#" />
                        </figure>
                    </div>
                    <div className="bed_room">
                        <h3><Link to="roomdetail">Tên phòng</Link></h3>
                        <h4>Giá: 12783612783612</h4>
                        <p>
                        If you are going to use a passage of Lorem Ipsum, you need to be
                        sure there{" "}
                        </p>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6">
                    <div id="serv_hover" className="room">
                    <div className="room_img">
                        <figure>
                        <img src={RoomNew} alt="#" />
                        </figure>
                    </div>
                    <div className="bed_room">
                        <h3><Link to="roomdetail">Tên phòng</Link></h3>
                        <h4>Giá: 12783612783612</h4>
                        <p>
                        If you are going to use a passage of Lorem Ipsum, you need to be
                        sure there{" "}
                        </p>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6">
                    <div id="serv_hover" className="room">
                    <div className="room_img">
                        <figure>
                        <img src={RoomNew} alt="#" />
                        </figure>
                    </div>
                    <div className="bed_room">
                        <h3><Link to="roomdetail">Tên phòng</Link></h3>
                        <h4>Giá: 12783612783612</h4>
                        <p>
                        If you are going to use a passage of Lorem Ipsum, you need to be
                        sure there{" "}
                        </p>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6">
                    <div id="serv_hover" className="room">
                    <div className="room_img">
                        <figure>
                        <img src={RoomNew} alt="#" />
                        </figure>
                    </div>
                    <div className="bed_room">
                        <h3><Link to="roomdetail">Tên phòng</Link></h3>
                        <h4>Giá: 12783612783612</h4>
                        <p>
                        If you are going to use a passage of Lorem Ipsum, you need to be
                        sure there{" "}
                        </p>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6">
                    <div id="serv_hover" className="room">
                    <div className="room_img">
                        <figure>
                        <img src={RoomNew} alt="#" />
                        </figure>
                    </div>
                    <div className="bed_room">
                        <h3><Link to="roomdetail">Tên phòng</Link></h3>
                        <h4>Giá: 12783612783612</h4>
                        <p>
                        If you are going to use a passage of Lorem Ipsum, you need to be
                        sure there{" "}
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Room