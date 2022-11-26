import React from 'react'
import TabCanTho from '../../images/tab-cantho.png';
import TabHaNoi from '../../images/tab-hanoi.png';
import TabDaNang from '../../images/tab-danang.png';
import TabHue from '../../images/tab-hue.png';
import TabHCM from '../../images/tab-hcm.png';
function GalleryContent() {
  return (
    <div className="gallery">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <figure>
                  <img src={TabCanTho} alt="#" />
                </figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <figure>
                  <img src={TabHaNoi} alt="#" />
                </figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <figure>
                  <img src={TabDaNang} alt="#" />
                </figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <figure>
                  <img src={TabHCM} alt="#" />
                </figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <figure>
                  <img src={TabHue} alt="#" />
                </figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <figure>
                  <img src={TabCanTho} alt="#" />
                </figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <figure>
                  <img src={TabCanTho} alt="#" />
                </figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <figure>
                  <img src={TabCanTho} alt="#" />
                </figure>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default GalleryContent
