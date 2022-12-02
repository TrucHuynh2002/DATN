import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Figure from 'react-bootstrap/Figure';
import axios from 'axios'
import Pagination from './Pagination';
import PaginationBlog from './PaginationBlog';

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
 
  const id_post = useParams();
  const id_blog = useParams();
  const [listBlog, setListBlog] = useState([]);
  const [listPost, setListPost] = useState([]);
  const [listBanner, setListBanner] = useState([]);

  // phan trang post
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] =useState(9);

  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);

  // phan trang blog
  const [ currentPageBlog, setCurrentPageBlog ] = useState(1);
  const [ blogPerPage, setBlogPerPage ] =useState(9);

  const lastPageIndexBlog = currentPageBlog * blogPerPage;
  const firstPageIndexBlog = lastPageIndexBlog - blogPerPage;
  const currentBlog = listBlog.slice(firstPageIndexBlog, lastPageIndexBlog);


  useEffect(() => {
    getData();
    getDataBlog();
    getDataBanner();
  },[]);

  // danh sách post
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/post/show');
   setListPost(res.data.data);
  };
 
  // danh sach Blog
  const getDataBlog = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/blog/show');
      setListBlog(res.data.data);
  };

  // danh sach banner
    const getDataBanner = async () => {
     const result = await axios.get("http://127.0.0.1:8000/api/banner/show");
     console.log(result);
     setListBanner(result.data.data);
    };

  return (
    <>

      {/* banner */}
      <section className="banner_main">
        <div id="myCarousel" className="carousel slide banner" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to={1} />
            <li data-target="#myCarousel" data-slide-to={2} />
            <li data-target="#myCarousel" data-slide-to={3} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="first-slide"
                src={Slide1}
                alt="First slide"/>
              <div className="container"></div>
            </div>
            <div className="carousel-item">
              <img
                className="second-slide"
                src={Slide2}
                alt="Second slide"/>
            </div>
            <div className="carousel-item">
              <img
                className="third-slide"
                src={Slide3}
                alt="Third slide"/>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#myCarousel"
            role="button"
            data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#myCarousel"
            role="button"
            data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
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
                        {/* <div className='search'> */}
                          <button className="book_btn_search"><i class='bx bx-search'></i></button>
                        {/* </div> */}
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
                          <option>Dưới 20m</option>
                          <option>Dưới 20m</option>
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
                  .com cung cấp thông tin các nhà trọ giá rẻ tại Cần Thơ, nhà trọ dành cho mọi tầng lớp sinh viên, từ bình dân giá rẻ cho tới các nhà trọ cao cấp tại địa bàn Thành Phố Cần Thơ.
                  Nhà trọ tại giá rẻ luôn được quan tâm chú ý vì giá cả phải chăng phù hợp với sinh viên và người đi làm xa nhà. Để tìm được một nhà trọ ưng ý thì phải mất rất nhiều công sức.
                  Vì vậy NHATUI luôn mang đến cho các bạn thông tin những nhà trọ giá rẻ nhất hoàn toàn miễn phí. 
                </p>~
                <a className="read_more" href="1">
                  Xem thêm
                </a>
              </div>
            </div>
            <div className="col-md-7">
              <div className="about_img">
              <Figure> 
                  <img src={Slide1} width={700} height={500} alt="loading..." />
                </Figure>
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
            {currentPosts.map((post, index) => {
              return (     
                <div className="col-md-4 col-sm-6" key={index}>
                    <div id="serv_hover" className="room">
                        <div className="room_img">
                            <Figure><img src={RoomNew} alt="#" /></Figure>
                        </div>
                        <div className="bed_room">
                            <h3><Link to={`../roomdetail/${index+1}`}>{post.post_name}</Link></h3>
                            <h4>Giá: {post.room_price}</h4>
                            <p>{post.description_sort}</p>
                        </div>
                    </div>
                </div>
              );
            })}          
          </div>        
        </div>
        {/* phan trang */}
        <Pagination totalPost={listPost.length} 
            postsPerPage={postsPerPage} 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage} />
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
                <Figure>
                  <img src={TabCanTho} alt="#" />
                </Figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <Figure>
                  <img src={TabHaNoi} alt="#" />
                </Figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <Figure>
                  <img src={TabDaNang} alt="#" />
                </Figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <Figure>
                  <img src={TabHCM} alt="#" />
                </Figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <Figure>
                  <img src={TabHue} alt="#" />
                </Figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <Figure>
                  <img src={TabCanTho} alt="#" />
                </Figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <Figure>
                  <img src={TabCanTho} alt="#" />
                </Figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="gallery_img">
                <Figure>
                  <img src={TabCanTho} alt="#" />
                </Figure>
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
            {currentBlog.map((blog, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <div className="blog_box">
                    <div className="blog_img">
                      <Figure>
                        <img src={Slide3} alt="#" />
                      </Figure>
                    </div>
                    <div className="blog_room">
                      <h3><Link to={`../blogdetail/${blog.id_blog}`}>{blog.name_blog}</Link></h3>
                      <span>Trúc Huỳnh</span>
                      <p>
                        {blog.description_sort}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}            
          </div>
        </div>
        {/* phan trang */}
        <PaginationBlog totalBlog={listBlog.length}
            blogPerPage={blogPerPage} 
            setCurrentPageBlog={setCurrentPageBlog}
            currentPageBlog={currentPageBlog} />
      </div>
      {/* end blog */}     
    </>
  )
}

export default Home