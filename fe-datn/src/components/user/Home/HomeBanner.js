import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import HomeSearch from './HomeSearch';
import { url } from '../../url';

function Baner() {

  const [listBanner, setListBanner] = useState([]);
  const getDataBanner = async () => {
      const result = await axios.get(`${url}/banner/show`);
      setListBanner(result.data.data);
   };
  useEffect(() => {
    getDataBanner()
  },[]);
  
  return (
    <section className="banner_main">
    <div className="carousel slide banner">
      <Carousel>
        {listBanner.map((banner, index) => {
          return (
            <Carousel.Item key={index}>
              <img
              className="first-slide"
              src={banner.link_img_banner}
              alt={banner.name_banner}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
      <div className="booking_ocline">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="book_room">
                <h1 className='tieudenhatui'>Nhatui.com</h1>
                <form className="book_now">
                  <div className="row">
                    <div className="col-12">
                      <p className="decr">
                        Nhatui.com là hệ thống website tìm kiếm phòng trọ miễn phí
                        cho người đi thuê hàng đầu Việt Nam
                      </p>
                    </div>
                    <div className="col-12" style={{ justifyContent: 'center', display: 'flex'}}>
                      <a href="#room">
                        <lottie-player src="https://lottie.host/75d1e144-bb4b-4acc-a098-c787e3e4b4df/QHNHSZZxqA.json"
                          background="transparent"
                          speed={1}
                          style={{ width: 75, height: 75 }}
                          loop=""
                          autoPlay=""></lottie-player>
                      </a>
                    </div>                  
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* search */}
        <HomeSearch />
              {/* end search */}
    </section>
  )
}

export default Baner