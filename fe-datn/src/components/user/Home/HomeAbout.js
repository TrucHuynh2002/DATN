import React from 'react';
import Figure from 'react-bootstrap/Figure';
import Slide1 from '../../../images/sl01.png';

function HomeAbout() {
  return (
    <>
        <div className="about">
        <div className="container-fluid">
          <div className="row">
            <div className="col-5">
              <div className="titlepage">
                <h2>Giới thiệu</h2>
                <p align="justify">
                  Tìm trọ Nhà Tui cung cấp thông tin các nhà trọ giá rẻ tại Cần Thơ, nhà trọ dành cho mọi tầng lớp sinh viên, từ bình dân giá rẻ cho tới các nhà trọ cao cấp tại địa bàn Thành Phố Cần Thơ.
                  Nhà trọ tại giá rẻ luôn được quan tâm chú ý vì giá cả phải chăng phù hợp với sinh viên và người đi làm xa nhà. Để tìm được một nhà trọ ưng ý thì phải mất rất nhiều công sức.
                  Vì vậy NHATUI luôn mang đến cho các bạn thông tin những nhà trọ giá rẻ nhất hoàn toàn miễn phí. 
                </p>
                <a className="read_more" href="1">
                  Xem thêm
                </a>
              </div>
            </div>
            <div className="col-7">
              <div className="about_img">
              <Figure> 
                  <img src={Slide1} width={700} height={500} alt="loading..." />
                </Figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeAbout