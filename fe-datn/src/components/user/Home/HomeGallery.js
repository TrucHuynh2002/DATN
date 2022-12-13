import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import moment from 'moment';
// import Figure from 'react-bootstrap/Figure';
// import TabCanTho from '../../../images/tab-cantho.png';
// import TabHaNoi from '../../../images/tab-hanoi.png';
// import TabDaNang from '../../../images/tab-danang.png';
// import TabHue from '../../../images/tab-hue.png';
// import TabHCM from '../../../images/tab-hcm.png';

function HomeGallery() {

  useEffect(() => {
    getData();
    // getDataPostTrend();
  },[]);
  const [ListSearchTrend, setListSearchTrend] = useState([]);
  const [ListDataPostTrend, setDataPostTrend] = useState([]);
  const [ListDataPostTrendShow, setDataPostTrendShow] = useState([]);
  const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/trendPost`);
    setListSearchTrend(res.data.data);
    setDataPostTrend(res.data.post);
  };
  // const getDataPostTrend = async (keyword) => {
  //   console.log(keyword)
  //   // const res = await axios.get(`http://127.0.0.1:8000/api/trendPost`);
  //   // setDataPostTrend(res.data.data);
  // };
  const getDataPostTrendShow = async (keyword) => {
    let res = await axios.get(`http://127.0.0.1:8000/api/search?keyword=${keyword}`);
    setDataPostTrendShow(res.data.data);
    setShow(true);
    
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <>
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
            <div className="gallery">
              <div className="container">
                {ListSearchTrend.map((list,index) => {
                  return (
                  <div
                  key={index}
                    type="button"
                    className="row searchTrend"  
                    onClick={(e) =>getDataPostTrendShow(list.key_word) }
                    // onChange={(e) => getDataPostTrend(list.key_word)}
                    >
                      <div className="col-1">{index+1}</div>
                      <div className="col-8">
                        <div> {list.key_word}</div>
                        <div className="content____________">
                          <Link className="link-info Link_________" to={`../roomdetail/${ListDataPostTrend[index][0].id_post}`}>{ListDataPostTrend[index][0].post_name}
                          </Link>
                          <span style={{"fontSize":"17px",'marginLeft': '10px'}}>
                          {moment(ListDataPostTrend[index][0].created_at).local().startOf('day').fromNow()}
                            </span>
                        </div>
                    </div>
                      <div className="col-2 view___">
                        <div>{list.view}</div>
                        <span >lượt tìm kiếm</span>
                      </div>
                      <div className="col-1">
                        <i className="fas fa-angle-down"></i>
                      </div>
                  </div>
                  )
                })}
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Những bài liên quan đến keyword</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                    {/* {ListDataPostTrendShow.status == true && ListDataPostTrendShow.length >= 1 ? ( */}
                          {ListDataPostTrendShow.map((room,index) => {
                                return    <div className='searchTrend_content____' key={index}>   
                                            <div className="room">
                                                <div className="bed_room">
                                                    <h3><Link to={`../roomdetail/${room.id_post}`}>{room.post_name}</Link></h3>
                                                    <h4>Giá: {room.room_price}</h4>
                                                    <p>{room.description_sort}</p>
                                                    <p style={{"fontSize":"17px",'marginTop': '10px'}}>
                                                    {moment(room.created_at).local().startOf('day').fromNow()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                            })
                        // )
                        // : 
                        // (
                        //       <div className="">
                        //         <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png" alt='' className=""></img>
                        //                 <p>Không tìm thấy kết quả nào</p>
                        //         </div>
                        // )
        }
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Đóng</Button> 
              </Modal.Footer>
            </Modal>
            </div>
          </div>
          {/* <div className="row">
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
          </div> */}
        </div>
      </div>
    </>
  )
}

export default HomeGallery