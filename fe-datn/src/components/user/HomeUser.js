import React from 'react'
import { Link } from 'react-router-dom';

// link img
import Slide1 from '../../images/sl01.png';
import Slide2 from '../../images/sl02.png';
import Slide3 from '../../images/sl03.png';
import RoomNew from '../../images/phong1.png';
import TabCanTho from '../../images/tab-cantho.png';
import TabHaNoi from '../../images/tab-hanoi.png';
import TabDaNang from '../../images/tab-danang.png';
import TabHue from '../../images/tab-hue.png';
import TabHCM from '../../images/tab-hcm.png';

function Home() {
  return (
    <>

      {/* banner */}
      <section className="banner_main">
        <div id="myCarousel" className="carousel slide banner" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to={0} className="active" />
            <li data-target="#myCarousel" data-slide-to={1} />
            <li data-target="#myCarousel" data-slide-to={2} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="first-slide"
                src={Slide1}
                alt="First slide"
              />
              <div className="container"></div>
            </div>
            <div className="carousel-item">
              <img
                className="second-slide"
                src={Slide2}
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="third-slide"
                src={Slide3}
                alt="Third slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#myCarousel"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#myCarousel"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
        <div className="booking_ocline">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="book_room">
                  <h1>Nhatui.com</h1>
                  <form className="book_now">
                    <div className="row">
                      <div className="col-md-12">
                        <p className="decr">
                          Nhatui.com là hệ thống website tìm kiếm phòng trọ miễn phí
                          cho người đi thuê hàng đầu Việt Nam
                        </p>
                      </div>
                      <div className="col-md-12" style={{ justifyContent: 'center', display: 'flex'}}>
                        <a href="#room">
                          <lottie-player src="https://lottie.host/75d1e144-bb4b-4acc-a098-c787e3e4b4df/QHNHSZZxqA.json"
                            background="transparent"
                            speed={1}
                            style={{ width: 75, height: 75 }}
                            loop=""
                            autoPlay=""></lottie-player>
                        </a>
                      </div>
                      <div className="col-md-12" style={{ justifyContent: 'center', display: 'flex'}}>
                        <a className="khampha" href="#room">
                          Tìm phòng ngay
                        </a>
                      </div>
                    </div>
                  </form>
                </div>

                {/* search */}
                <div className="book_room2">
                  <h1>Tìm phòng trống</h1>
                  <form className="book_now2">
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          className="online_book2"
                          placeholder="Tìm kiếm"
                          type="text"
                          name=""
                        />
                      </div>
                      <div className="col-md-3 col-search">
                        <select className="form-select online_book3">
                          <option>Lọc</option>
                          <option></option>
                          <option></option>
                        </select>
                      </div>
                      <div className="col-md-3 col-search">
                        <select className="form-select online_book3">
                          <option>Loại phòng</option>
                          <option>Phòng trọ</option>
                          <option>Căn hộ mini</option>
                        </select>
                      </div>
                      <div className="col-md-3 col-search">
                        <select className="form-select online_book3">
                          <option>Tỉnh</option>
                          <option>Hồ Chí Minh</option>
                          <option>Cần Thơ</option>
                        </select>
                      </div>
                      <div className="col-md-3 col-search">
                        <select className="form-select online_book3">
                          <option>Giá</option>
                          <option>Dưới 1 triệu</option>
                          <option>Từ 1 - 2 triệu</option>
                        </select>
                      </div>
                      <div className="col-md-3 col-search">
                        <select className="form-select online_book3">
                          <option>Diện tích</option>
                          <option>Dưới 20m<sup>2</sup></option>
                          <option>Dưới 20m<sup>2</sup></option>
                        </select>
                      </div>
                      <div className="col-md-12">
                        <button className="book_btn">Xem kết quả</button>
                      </div>
                    </div>
                  </form>
                </div>
                {/* end search */}

              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end banner */}
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
      {/* our_room */}
      <div className="our_room" id="room">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>Phòng mới nhất</h2>
                <p>Đây là những phòng trọ mới nhất vừa được cập nhật</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={RoomNew} alt="#" />
                  </figure>
                </div>
                <div className="bed_room">
                  <h3><Link to="../roomdetail">Phòng trọ cần thơ</Link></h3>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need to be
                    sure there{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={RoomNew} alt="#" />
                  </figure>
                </div>
                <div className="bed_room">
                <h3><Link to="../roomdetail">Phòng trọ cần thơ</Link></h3>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need to be
                    sure there{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={RoomNew} alt="#" />
                  </figure>
                </div>
                <div className="bed_room">
                <h3><Link to="../roomdetail">Phòng trọ cần thơ</Link></h3>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need to be
                    sure there{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={RoomNew} alt="#" />
                  </figure>
                </div>
                <div className="bed_room">
                <h3><Link to="../roomdetail">Phòng trọ cần thơ</Link></h3>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need to be
                    sure there{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={RoomNew} alt="#" />
                  </figure>
                </div>
                <div className="bed_room">
                <h3><Link to="../roomdetail">Phòng trọ cần thơ</Link></h3>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need to be
                    sure there{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div id="serv_hover" className="room">
                <div className="room_img">
                  <figure>
                    <img src={RoomNew} alt="#" />
                  </figure>
                </div>
                <div className="bed_room">
                <h3><Link to="../roomdetail">Phòng trọ cần thơ</Link></h3>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need to be
                    sure there{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end our_room */}
      {/* gallery */}
      <div className="gallery">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>Xu hướng tìm kiếm</h2>
              </div>
            </div>
          </div>
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
      {/* end gallery */}
      {/* blog */}
      <div className="blog">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>Blog</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="blog_box">
                <div className="blog_img">
                  <figure>
                    <img src={Slide3} alt="#" />
                  </figure>
                </div>
                <div className="blog_room">
                  <h3><Link to='../blogdetail'>Tiêu đề bài viết</Link></h3>
                  <span>Tên người viết</span>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need to be
                    sure there isn't anything embarrassing hidden in the middle of
                    text. All the Lorem Ipsum generatorsIf you are
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="blog_box">
                <div className="blog_img">
                  <figure>
                    <img src={Slide2} alt="#" />
                  </figure>
                </div>
                <div className="blog_room">
                  <h3><Link to='../blogdetail'>Tiêu đề bài viết</Link></h3>
                  <span>Tên người viết </span>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need to be
                    sure there isn't anything embarrassing hidden in the middle of
                    text. All the Lorem Ipsum generatorsIf you are
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="blog_box">
                <div className="blog_img">
                  <figure>
                    <img src={Slide3} alt="#" />
                  </figure>
                </div>
                <div className="blog_room">
                  <h3><Link to='../blogdetail'>Tiêu đề bài viết</Link></h3>
                  <span>Tên người viết</span>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need to be
                    sure there isn't anything embarrassing hidden in the middle of
                    text. All the Lorem Ipsum generatorsIf you are
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end blog */}     
    </>
  )
}

export default Home