import React from 'react';
import Figure from 'react-bootstrap/Figure';
import { Link } from 'react-router-dom';
import Slide1 from '../../../images/banner2.jpg';

function HomeGallery() {
  return (
    
    <>         
      <div className="gallery">       
        <div className="container">
        <div className="row">
            <div className="col-12">
              <div className="titlepage text-center">
                <h2>Nổi bật</h2>
              </div>
            </div>
          </div>
          <div className="row">          
          <div className="col-7 gallery_col">
            <div className="about_img">
              <Figure> 
                  <img src={Slide1} width={700} height={500} alt="loading..." />
                </Figure>
            </div>
            </div>
            
            <div className="col-5">             
              <div className="titlepage">               
                <h3><b>Xu hướng tìm kiếm nổi bật 2022</b></h3>
                <p align="justify">
                  Khám phá nội dung tìm kiếm nhà trọ cung cấp thông tin các nhà trọ giá rẻ.
                  Dành cho mọi tầng lớp sinh viên từ bình dân giá rẻ cho tới các nhà trọ cao cấp.
                </p>
                <Link className="read_more" to="gallery">
                  Xem thêm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeGallery