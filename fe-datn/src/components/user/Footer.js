import React from 'react'
import { Link } from 'react-router-dom'
import LogoFooter from '../../images/logo-ft.png';

function Footer() {
  return (
    <>
      <footer>
        <div className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <img src={LogoFooter} alt="" width="80%" />
                <h4 style={{ textAlign: "center" }}>
                  Hệ thống tìm nhà trọ tốt nhất dành cho sinh viên
                </h4>
              </div>
              <div className="col-md-3">
                <h3>Thông tin liên hệ</h3>
                <ul className="conta">
                  <li>
                    <span style={{ fontWeight: 750 }}> Địa chỉ:</span> 288 Nguyễn Văn
                    Linh, phường An Khánh, quận Ninh Kiều, thành phố Cần Thơ
                  </li>
                  <li>
                    <span style={{ fontWeight: 750 }}>Hotline:</span>
                    <Link to="tel:0368503413"> 036 850 3413</Link>
                  </li>
                  <li>
                    <span style={{ fontWeight: 750 }}>Email:</span> timtronhatui@gmail.com
                  </li>
                </ul>
              </div>
              <div className="col-md-3 ">
                <h3>Hỗ trợ khách hàng</h3>
                <ul className="conta ">
                  <li>
                    <Link to="">Trung tâm hỗ trợ</Link>
                  </li>
                  <li>
                    <Link to="">Quy định cần biết</Link>
                  </li>
                  <li>
                    <Link to="">Xác minh nhà trọ</Link>
                  </li>
                  <li>
                    <Link to="">Báo cáo sự cố</Link>
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