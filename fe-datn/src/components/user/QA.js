import React from 'react';
import { Link} from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';

function QA() {
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
            <div className="row">  
              <div className="col-md-4 col-sm-6 qa">
                <Link to="">Xây nhà chung cư mini cho thuê, nên cho thuê phòng trống hay đầu tư full nội thất, cái nào dễ cho thuê hơn ạ? Xin cám ơn</Link>
                <div className='qa_avata'>
                    <img src='https://th.bing.com/th/id/R.0e0b8048a60c7df1b006dc922ccb40c2?rik=lef4Lt2Og7ea2Q&pid=ImgRaw&r=0'
                     alt='' className="avt_qa" />
                    <span>Trả lời bởi <Link to="">Nhóm 1</Link></span> - <span>19/12/2022</span>
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
                    >
                      Bình luận
                    </Link>
                  </div>
                  <div className="collapse-show-rate collapse row" id="collapseExample">
                  <Form>
                    <Form.Group className="mb-3" controlId="name_category">
                        <Form.Control type="text" name="" className=''/>            
                    </Form.Group>                  
                  </Form>    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default QA