import React from 'react'
// link css
// import '../../css/bootstrap.min.css';
// import '../../css/style.css';
// import '../../css/responsive.css';

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
                  <a href="#"> email</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>Menu</h3>
              <ul className="link_menu">
                <li className="active">
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="about.html"> about</a>
                </li>
                <li>
                  <a href="room.html">Our Room</a>
                </li>
                <li>
                  <a href="gallery.html">Gallery</a>
                </li>
                <li>
                  <a href="blog.html">Blog</a>
                </li>
                <li>
                  <a href="contact.html">Contact Us</a>
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
                  <a href="#">
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-linkedin" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-youtube-play" aria-hidden="true" />
                  </a>
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