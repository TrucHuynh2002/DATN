import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function GalleryContent() {
  useEffect(() => {
    getData();
    getDataPostTrend();
  },[]);
  const [ListSearchTrend, setListSearchTrend] = useState([]);
  const [ListDataPostTrend, setDataPostTrend] = useState([]);
  const [ListDataPostTrendShow, setDataPostTrendShow] = useState([]);
  const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/trend`);
    setListSearchTrend(res.data.data);
  };
  const getDataPostTrend = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/trendPost`);
    setDataPostTrend(res.data.data);
  };
  const getDataPostTrendShow = async (keyword) => {
    let res = await axios.get(`http://127.0.0.1:8000/api/search?key_word=${keyword}`);
    console.log(res);
    setDataPostTrendShow(res.data.data);
  };
  let x = document.querySelectorAll(".searchTrend");

// Lặp qua các phần tử có class là menu
for (let i = 0; i < x.length; i++) {
    // Lắng nghe sự kiện click
    x[i].onclick = function() {
      handleShow();
    };
}
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <div className="gallery">
      <div className="container">
        {ListSearchTrend.map((list,index) => {
          return (
            <div
            type="button"
            className="row searchTrend"  
            >
              <div className="col-1">{list.id_search}</div>
              <div className="col-8">
                <div> {list.key_word}</div>
                {ListDataPostTrend.map((list,a) =>{
                  return(
                    <Link className="link-info link_____" to={`../roomdetail/${list.id_post}`}>{list.post_name}</Link>
                  )
                }
                )}
             </div>
              <div className="col-2 view___">
            
                <div>{list.view}</div>
                <span >lượt tìm kiếm</span>
              </div>
              <div className="col-1">
                <i className="	fas fa-angle-down"></i>
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
                        return    <div className=''>   
                                    <div className="room">
                                        <div className="bed_room">
                                            <h3><Link to={`../roomdetail/${room.id_post}`}>{room.post_name}</Link></h3>
                                            <h4>Giá: {room.room_price}</h4>
                                            <p>{room.description_sort}</p>
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
   
    </>
  )
}

export default GalleryContent
