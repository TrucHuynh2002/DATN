import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import Figure from 'react-bootstrap/Figure';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Pagination from './Pagination';
import PaginationBlog from './PaginationBlog';
import Slide1 from '../../images/sl01.png';
import Slide3 from '../../images/sl03.png';
import RoomNew from '../../images/phong1.png';
import TabCanTho from '../../images/tab-cantho.png';
import TabHaNoi from '../../images/tab-hanoi.png';
import TabDaNang from '../../images/tab-danang.png';
import TabHue from '../../images/tab-hue.png';
import TabHCM from '../../images/tab-hcm.png';
// import { Select } from 'antd';
// import HeartRoom from './HeartRoom';
// const { Option } = Select;

function Home() {
  const navigate = useNavigate();
  const id_post = useParams();
  const id_blog = useParams();
  const [listBlog, setListBlog] = useState([]);
  const [listPost, setListPost] = useState([]);
  const [listBanner, setListBanner] = useState([]);
  const [listImg, setListImg] = useState([]);
  // console.log(listImg);

  // phan trang post
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] =useState(9);

  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);
  // console.log(currentPosts);

  // phan trang blog
  const [ currentPageBlog, setCurrentPageBlog ] = useState(1);
  const [ blogPerPage, setBlogPerPage ] =useState(9);
  const lastPageIndexBlog = currentPageBlog * blogPerPage;
  const firstPageIndexBlog = lastPageIndexBlog - blogPerPage;
  const currentBlog = listBlog.slice(firstPageIndexBlog, lastPageIndexBlog);


  useEffect(() => {
    getData()
    getDataBlog()
    getDataBanner()
    getTypeRoom()
    getProvinces()
    getImg()
  },[]);
  // console.log(currentPosts, listImg)

  // danh sách post
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/post/show');
  //  console.log(res)
   setListPost(res.data.data);
  };
 
  // danh sach Blog
  const getDataBlog = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/blog/show');
      setListBlog(res.data.data);
  };
 //danh sach img
  const getImg = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/imgPost/show`);
    // console.log(res);
    setListImg(res.data.data);
    
};

  // danh sach banner
    const getDataBanner = async () => {
     const result = await axios.get("http://127.0.0.1:8000/api/banner/show");
    //  console.log(result);
     setListBanner(result.data.data);
    };
     // SEARCHING
    const [keyword,setKeyword] = useState({
      keywords: "",
      province: "",
      district: "",
      ward: null,
      price:"",
      area:"",
      typeRoom:""

    })
    const [getDataSearch,setGetDataSearch] = useState({
      typeRooms:[]
    });
    const {
      typeRooms,
    } = getDataSearch

    const [getProvince,setProvince] = useState([]);
    // const [getDistrict,setDistrict] = useState([]);
    // console.log(getProvince)
    const getTypeRoom = async () => {
      let dataRoom = await axios.get("http://127.0.0.1:8000/api/roomType/show");
      setGetDataSearch({...getDataSearch,typeRooms:dataRoom.data.data})
    }
    const {
      keywords,
      province,
      district,
      ward,
      price,
      area,
      typeRoom
    } = keyword
    console.log(district);
    const getProvinces = async () => {
      let dataRooms = await axios.get("http://127.0.0.1:8000/api/province/show");
      setProvince(dataRooms.data.data)
    }
    const handledistrice = async (e) => {
      // setAddPost({ ...addPost, [e.target.name] : e.target.value});
      getDataDistrict(({[e.id_province] : e.target.value}).undefined)
      setKeyword({ ...keyword,province: e.target.value})
  }
 
  const handleadd = async (e) => {
      getDataWard(({[e.id_district] : e.target.value}).undefined)
      console.log(e.target.value)
      setKeyword({ ...keyword,district: e.target.value})
      // setAddPost({ ...addPost, [e.target.name] : e.target.value});
  }
  const handssdbdfb = async (e) => {
      console.log(ward);
      setKeyword({ ...keyword,ward: e.target.value})

      // setAddPost({ ...addPost, [e.target.name] : e.target.value});
  }
    const [listDistrict, setListDistrict] = useState([]);
    console.log(listDistrict)
    const [listWard, setListWard] = useState([]);
    const getDataDistrict = async (id_province) => {
        const ress = await axios.get(`http://127.0.0.1:8000/api/post/show_district/${id_province}`);
        setListDistrict(ress.data.data);
    }
    const getDataWard = async (id_district) => {
        const resss = await axios.get(`http://127.0.0.1:8000/api/post/show_ward/${id_district}`);
        setListWard(resss.data.data);
    }     
    const [searching,setSearching] = useState(false);
    const handleChangeKeyWord = (e) => {
      setKeyword({ ...keyword,[e.target.name]:e.target.value})
    }

    const handleSubmitSearch = e => {
      e.preventDefault()
      // if(keyword){
      //   console.log('123')
      // }
      navigate(`searchroom?keyword=${keywords}&&province=${keyword.province}&&ward=${keyword.ward}&&district=${keyword.district}&&price=${keyword.price}&&area=${keyword.area}&&typeRoom=${typeRoom}`);
    }
  
  return (
    <>
      {/* banner */}
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
                  <h1>Nhatui.com</h1>
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
                      <div className="col-12" style={{ justifyContent: 'center', display: 'flex'}}>
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
                  <form className="book_now2" onSubmit={(e) => handleSubmitSearch(e)}>
                    <div className="row">
                      <div className="col-10">
                        <input className="form-control" placeholder="Tìm kiếm" type="text" name="keywords" onChange={(e) => handleChangeKeyWord(e)} />
                              {/* <Select className='search'
                              showSearch
                              style={{width:'133.7%'}}
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())  

                              }
                              onChange={(e) => handle(e)}
                              >
                                  {listPost.map((item) => (
                                      <Option value={item.id_post} key={item.id_post}>{item.post_name} </Option>
                                  ))}
                              </Select> */}
                            {
                              searching && (
                                <div className='show_search'>
                                <ul>
                                  <li>
                                    <Link to="">Nhà trọ cần thơ</Link>
                                  </li>
                                </ul>                            
                              </div>    
                              )
                            }
                        </div>                     
                        <div className="col-1">
                          <button className="btn btn-outline-secondary">
                            <i class='bx bx-search' style={{color:"#0d3380"}}></i>
                          </button>
                        </div>
                      </div>
                      <div className='row fitele-search'>
                        <div className="col-2">
                          <select className="form-select online_book3" name="typeRoom" onChange={(e) => handleChangeKeyWord(e)}>
                            <option>Loại phòng</option>
                            {
                              typeRooms.map((r,i) => {
                                return <option key={i} value={r.id_room_type}>{r.name_room_type}</option>
                              })
                            }
                           
                            {/* <option>Căn hộ mini</option> */}
                          </select>
                        </div>
                        <div className="col-2">
                          <Form.Select name="provinces" className="form-select online_book3"  onChange = {(e) => handledistrice(e)}>
                            <option>Tỉnh</option>
                            {
                              getProvince.map((p,i) => {
                                return <option key={i} value={p.id}>{p._name}</option>
                              })
                            }
                         
                          </Form.Select>
                        </div>
                        <div className="col-2">
                                <Form.Select name="id_district" className="form-select online_book3"
                                onChange = {(e) => handleadd(e)}
                                >
                                   <option>Quận/Huyện/TP</option>
                                    {listDistrict.map((room, index) => {
                                        return (
                                            <option key={index} value={room.id}>{room._name}</option>
                                        );
                                    })}                            
                                </Form.Select>
                        </div>
                        <div className="col-2">
                                <Form.Select name="id_ward" className="form-select online_book3"
                                onChange = {(e) => handssdbdfb(e)}
                                > 
                                <option>Xã</option>
                                    {listWard.map((room, index) => {
                                        return (
                                            <option key={index} value={room.id}  >{room._name}</option>
                                        );
                                    })}                            
                                </Form.Select>
                        </div>
                        <div className="col-2 ">
                          <select className="form-select online_book3" name="price" onChange={(e) => handleChangeKeyWord(e)}>
                            <option>Giá</option>
                            <option value={1}>Dưới 1 triệu</option>
                            <option value={2}>Từ 1 - 2 triệu</option>
                          </select>
                        </div>
                        <div className="col-2 ">
                          <select className="form-select online_book3" name="area" onChange={(e) => handleChangeKeyWord(e)}>
                            <option>Diện tích</option>
                            <option value="1">Dưới 20m</option>
                            <option value="2">Trên 20m</option>
                          </select>
                        </div>
                        <div className="col-2">
                            <button type="submit" className="book_btn">Xem kết quả</button>
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
            <div className="col-5">
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
      {/* end about */}
      {/* our_room */}
      <div className="our_room" id="room">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="titlepage">
                <h2>Phòng mới nhất</h2>
                <p>Đây là những phòng trọ mới nhất vừa được cập nhật</p>
              </div>
            </div>
          </div>
          <div className="row">
            {currentPosts.map((post, index) => {
              return (     
                <div className="col-md-4 col-sm-12" key={index}>
                    <div id="serv_hover" className="room">
                    <div className="room_img">
                            {listImg.map((a, index) => {
                              
                                return a.id_post == post.id_post && (

                                    <Figure><img src={a.link_img_user} alt="#" /></Figure>
                                   
                                
            )
            // break;
            })}
                            </div>
                        <div className="bed_room">
                            <h3><Link to={`../roomdetail/${post.id_post}`}>{post.post_name}</Link></h3>
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
            <div className="col-md-3 col-sm-12">
              <div className="gallery_img">
                <Figure>
                  <img src={TabCanTho} alt="#" />
                </Figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <div className="gallery_img">
                <Figure>
                  <img src={TabHaNoi} alt="#" />
                </Figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <div className="gallery_img">
                <Figure>
                  <img src={TabDaNang} alt="#" />
                </Figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <div className="gallery_img">
                <Figure>
                  <img src={TabHCM} alt="#" />
                </Figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <div className="gallery_img">
                <Figure>
                  <img src={TabHue} alt="#" />
                </Figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <div className="gallery_img">
                <Figure>
                  <img src={TabCanTho} alt="#" />
                </Figure>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
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
                <div className="col-md-3" key={index}>
                  <div className="blog_box">
                    <div className="blog_img">
                      <Figure>
                        <img src={Slide3} alt="#" />
                      </Figure>
                      {/* thả tym */}
                      <div className="heart">
                        {/* <HeartRoom /> */}
                      </div>
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