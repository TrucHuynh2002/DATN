import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

function QA() {

  const [listQa, setListQa] = useState([]);
  const [listImg, setListImg] = useState([]);

  useEffect(() => {
    getData();
    getImg();
  },[]);

   // danh sach 
   const getData = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/qa/show');
    setListQa(res.data.data);
   };
   //danh sach img
  const getImg = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/imgQa/show`);
    // console.log(res);
    setListImg(res.data.data);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2>Hỏi đáp</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="our_room">
          <div className="container">
            <div className='qa_input'>
              <Button variant="secondary" className='btn_qa' onClick={handleShow}>
                Bạn đang nghĩ gì thế?
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Tạo câu hỏi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form encType="multipart/form-data">
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Control type="text" name="title" placeholder='Tiêu đề' className=''/>            
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="content">
                        <Form.Control type="text" name="content" placeholder='Nội dung' className=''/>            
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="link_img_qa">
                        <Form.Control type="file" name="link_img_qa" className=''/>            
                    </Form.Group>
                    <Button variant="primary" name='' type="submit">
                      Đăng
                    </Button>                    
                  </Form> 
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Đóng
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            {/* <div className="row">   */}
            {listQa.map((listQa, index) => {
              return (
              <div className="qa">
                <div className='qa_avata'>             
                    <img src={listQa.link_img_user}
                     alt='' className="avt_qa" />   
                    <span><Link to={`../profile/${listQa.id_user}`}>{listQa.full_name}</Link></span> - <span>{listQa.created_at}</span>
                </div><br></br>
                <h3>{listQa.title}</h3>
                <p>{listQa.content}</p>
                {listImg.map((a, index) => {
                  return a.id_qa == listQa.id_qa && (
                <img src={a.link_img_qa} width={400} alt='' height={200}></img>
                )
            })}

                <div className='qa_avata'>
                    <img src='https://th.bing.com/th/id/R.0e0b8048a60c7df1b006dc922ccb40c2?rik=lef4Lt2Og7ea2Q&pid=ImgRaw&r=0'
                     alt='' className="avt_qa" />
                    <span>Trả lời bởi <Link to="" className='qa_link'>Nhóm 1</Link></span> - <span>19/12/2022</span>
                </div>
                <div className='qa_content'>
                  Đầu tư full sẽ hay hơn là cho thuê theo kiểu phòng trọ công nhân.
                </div>

                <div className='qa_cmt'>
                  <div className="content-right col-sm-3 p-3 d-flex flex-column justify-content-center align-items-center">
                    <Link 
                      data-toggle="collapse"
                      data-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample" 
                      className='qa_link'
                    >
                     <i class='bx bx-message-dots'></i> Bình luận
                    </Link>
                  </div>
                  <div className="collapse-show-rate collapse row" id="collapseExample">
                  <Form>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Control type="text" name="" className=''/>            
                    </Form.Group>
                    <Button variant="primary" size="sm" name='' type="submit">
                      Gửi
                    </Button>                    
                  </Form>    
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
    </>
  )
}
export default QA