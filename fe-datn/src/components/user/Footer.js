import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [listConfig, setListConfig] = useState([]);
  useEffect(() => {
    getData();
  },[]);
  // danh sach category
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/config');
    setListConfig(res.data.data);
  };

  return (
    <>
      <footer>
        <div className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <img src={listConfig.logo} alt="" width="80%" />
                <h4 style={{ textAlign: "center" }}>
                  {listConfig.title}
                </h4>
              </div>
              <div className="col-md-3">
                <h3>Thông tin liên hệ</h3>
                <ul className="conta">
                  <li>
                    <span style={{ fontWeight: 750 }}> Địa chỉ:</span> {listConfig.address}
                  </li>
                  <li>
                    <span style={{ fontWeight: 750 }}>Hotline: </span> {listConfig.sdt}
                  </li>
                  <li>
                    <span style={{ fontWeight: 750 }}>Email: </span>{listConfig.email}
                  </li>
                </ul>
              </div>
              <div className="col-md-3 ">
                <h3>Hỗ trợ khách hàng</h3>
                <ul className="conta ">
                  <li>
                    <Link to="/contact">Trung tâm hỗ trợ</Link>
                  </li>
                  <li>
                    <Link to="../baomat">Bảo mật tài khoản</Link>
                  </li>
                  <li>
                    <Link to="/contact">Báo cáo sự cố</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <h3>Theo dõi chúng tôi tại</h3>
                <ul className="social_icon">
                  <li>
                    <Link to="">
                      <i className="fa fa-facebook " aria-hidden="true" />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <i className="fa fa-twitter " aria-hidden="true" />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <i className="fa fa-linkedin " aria-hidden="true" />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <i className="fa fa-youtube-play " aria-hidden="true" />
                    </Link>
                  </li>
                </ul>
                <br/>
                <br/>
                <form className="bottom_form">
                  <input
                    className="enter"
                    placeholder="Enter your email"
                    type="email"
                    name="Enter your email"
                  />
                  <button className="sub_btn">Gửi</button>
                </form>
              </div>
            </div>
          </div>
          <div className="copyright">
            <div className="container">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <p>© 2022 All Rights Reserved. Design by Galaticos Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer