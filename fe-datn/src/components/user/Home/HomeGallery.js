import React from 'react';
import {Link} from 'react-router-dom';
import Figure from 'react-bootstrap/Figure';
import Slide1 from '../../../images/banner2.jpg';

function HomeGallery() {
  return (
    
    <>    
     
      <div className="about">
        
        <div className="container">

          <div className="row gallerynb">
            
          
            <div class="gallerynb">
              <h2 className='glr'>Nổi Bật</h2>
              </div> 
            
          <div className="col-7">
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