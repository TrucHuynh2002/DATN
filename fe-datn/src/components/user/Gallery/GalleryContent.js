import React from 'react';
import { Link } from 'react-router-dom';
import{ Figure} from'react-bootstrap';
import TabCanTho from '../../../images/tab-cantho.png';
import TabHaNoi from '../../../images/tab-hanoi.png';
import TabDaNang from '../../../images/tab-danang.png';
import TabHue from '../../../images/tab-hue.png';
import TabHCM from '../../../images/tab-hcm.png';

function GalleryContent() {
  return (
    <div className="gallery">
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <div className="gallery_img show-first">
            <Figure>
              <img src={TabCanTho} alt="#" />
            </Figure>
            <div className="mask">
              <h2 className='tab-text'>Cần Thơ</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="gallery_img show-first">
            <Figure>
              <img src={TabHaNoi} alt="#" />
            </Figure>
            <div className="mask">
              <h2 className='tab-text'>Hà Nội</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 ">
          <div className="gallery_img show-first">
            <Figure>
              <img src={TabDaNang} alt="#" />
            </Figure>
            <div className="mask">
              <h2 className='tab-text'>Đà Nẵng</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="gallery_img show-first">
            <Figure>
              <img src={TabHCM} alt="#" />
            </Figure>
            <div className="mask">
              <h2 className='tab-text'>Hồ Chí Minh</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default GalleryContent
