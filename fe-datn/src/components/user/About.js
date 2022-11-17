import React from 'react'
// link css
// import '../../css/bootstrap.min.css';
// import '../../css/style.css';
// import '../../css/responsive.css';
// link img
import Slide1 from '../../images/sl01.png';

function About() {
  return (
    <>
      <div className="back_re">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="title">
                        <h2>Về chúng tôi</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
      {/* about */}
      <div className="about">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5">
              <div className="titlepage">
                <h2>Giới thiệu</h2>
                <p>
                  The passage experienced a surge in popularity during the 1960s
                  when Letraset used it on their dry-transfer sheets, and again
                  during the 90s as desktop publishers bundled the text with their
                  software. Today it's seen all around the web; on templates,
                  websites, and stock designs. Use our generator to get your own, or
                  read on for the authoritative history of lorem ipsum.{" "}
                </p>
                <a className="read_more" href="1">
                  {" "}
                  Xem thêm
                </a>
              </div>
            </div>
            <div className="col-md-7">
              <div className="about_img">
                <figure>
                  <img src={Slide1} alt="#" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end about */}
    </>
  )
}

export default About