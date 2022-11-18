import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
    <footer>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className=" col-md-4">
              <h3>Thông tin</h3>
              <ul className="conta">
                <li>
                  <i className="fa fa-map-marker" aria-hidden="true" /> Address
                </li>
                <li>
                  <i className="fa fa-mobile" aria-hidden="true" /> phone
                </li>
                <li>
                  {" "}
                  <i className="fa fa-envelope" aria-hidden="true" />
                  <Link to="#"> email</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>Menu</h3>
              <ul className="link_menu">
                <li className="active">
                  <Link to="../">Home</Link>
                </li>
                <li>
                  <Link to="../about">About</Link>
                </li>
                <li>
                  <Link to="../room">Our Room</Link>
                </li>
                <li>
                  <Link to="../gallery">Gallery</Link>
                </li>
                <li>
                  <Link to="../blog">Blog</Link>
                </li>
                <li>
                  <Link to="../contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>Liên hệ ngay</h3>
              <form className="bottom_form">
                <input
                  className="enter"
                  placeholder="Enter your email"
                  type="text"
                  name="Enter your email"
                />
                <button className="sub_btn">subscribe</button>
              </form>
              <ul className="social_icon">
                <li>
                  <Link to="#">
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fa fa-linkedin" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fa fa-youtube-play" aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <p>© 2019 All Rights Reserved. Design by Galaticos Team</p>
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