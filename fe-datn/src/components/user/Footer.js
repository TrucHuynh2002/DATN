import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../url';

function Footer() {
  const [listConfig, setListConfig] = useState([]);
  useEffect(() => {
    getData();
  },[]);
  // danh sach category
  const getData = async () => {
   const res = await axios.get(`${url}/config`);
    setListConfig(res.data.data);
  };

  return (
    <>
      <footer>
        <div className="footer">
          <div className="container-fluid">
            <div className="row ft">
              <div className="col-md-3">
                <img src={listConfig.logo} alt="" style={{width:"70%", height:"55%"}} />
                <h4 style={{ textAlign: "center" }}>
                  {listConfig.title}
                </h4>
              </div>
              <div className="col-md-3">
                <h3>THÔNG TIN LIÊN HỆ</h3>
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
                <h3>HỖ TRỢ KHÁCH HÀNG</h3>
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
                <h3>THEO DÕI CHÚNG TÔI TẠI</h3>
                <ul className="social_icon">
                  <li>
                    <Link to="https://www.facebook.com/profile.php?id=100088986281952">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <i className="fa fa-twitter" aria-hidden="true" />
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