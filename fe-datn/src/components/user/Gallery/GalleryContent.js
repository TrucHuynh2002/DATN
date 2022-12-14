import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { url } from '../../url';
import HashLoader from "react-spinners/HashLoader";

function GalleryContent() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
    getData()
  },[]);
  const [ListSearchTrend, setListSearchTrend] = useState([]);
  const [ListDataPostTrend, setDataPostTrend] = useState([]);
  const [ListDataPostTrendShow, setDataPostTrendShow] = useState([]);
  const getData = async () => {
    const res = await axios.get(`${url}/trendPost`);
    setListSearchTrend(res.data.data);
    setDataPostTrend(res.data.post);
  };
  const getDataPostTrendShow = async (keyword) => {
    let res = await axios.get(`${url}/searchAll?keyword=${keyword}`);
    setDataPostTrendShow(res.data.data);
    setShow(true);
    
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <>
      {loading ? 
          <HashLoader className='css_loading'
          color={'#0d3380'}
          loading={loading}
          size={100}
          style={{display: 'inherit', position: 'relative', height: '100px', transform: 'rotate(165deg)'}}
          />
          :
          <>
            <div className="gallery">
              <div className="container">
                {ListSearchTrend.length > 0 && ListSearchTrend.map((list,index) => {
                  return (
                  <div
                    key={index}
                    type="button"
                    className="row searchTrend"  
                    onClick={(e) =>getDataPostTrendShow(list.key_word) }
                    >
                      <div className="col-lg-1 col-md-1 col-sm-12">{index+1}</div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div> {list.key_word}</div>
                        <div className="content____________">
                          <Link 
                            className="link-info Link_________" 
                            to={`../roomdetail/${ListDataPostTrend[index][0] != null ?  ListDataPostTrend[index][0].id_post : 0}`}
                            >{ListDataPostTrend[index][0] != null ? ListDataPostTrend[index][0].post_name : ""}
                          </Link> 
                          <span style={{"fontSize":"17px",'marginLeft': '10px'}}>
                          {moment(ListDataPostTrend[index][0] != null  ? ListDataPostTrend[index][0].created_at : "").local().startOf('day').fromNow()}
                            </span>
                        </div>
                    </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 view___">
                        <div>{list.view}</div>
                        <span >l?????t t??m ki???m</span>
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-12">
                        <i className="fas fa-angle-down"></i>
                      </div>
                  </div>
                  )
                })}
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Nh???ng b??i li??n quan ?????n keyword</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                    {/* {ListDataPostTrendShow.status == true && ListDataPostTrendShow.length >= 1 ? ( */}
                          {ListDataPostTrendShow.length > 0 
                          ?
                            ListDataPostTrendShow.map((room,index) => {
                                return    <div className='searchTrend_content____' key={index}>   
                                            <div className="room">
                                                <div className="bed_room">
                                                    <h3><Link to={`../roomdetail/${room.id_post}`}>{room.post_name}</Link></h3>
                                                    <h4>Gi??: {room.room_price}</h4>
                                                    <p>{room.description_sort}</p>
                                                    <p style={{"fontSize":"17px",'marginTop': '10px'}}>
                                                    {moment(room.created_at).local().startOf('day').fromNow()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                            })
                            :
                            <div style={{textAlign:"center"}}>
                              Kh??ng c?? k???t qu??? t??m ki???m
                            </div>
                        // )
                        // : 
                        // (
                        //       <div className="">
                        //         <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png" alt='' className=""></img>
                        //                 <p>Kh??ng t??m th???y k???t qu??? n??o</p>
                        //         </div>
                        // )
        }
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>????ng</Button> 
              </Modal.Footer>
            </Modal>
            </div>  
          </>
      }     
    </>
  )
}

export default GalleryContent
