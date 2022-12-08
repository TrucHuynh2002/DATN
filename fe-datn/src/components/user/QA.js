import React from 'react';
import { Link} from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
function QA() {

  const [listPost, setListPost] = useState([]);
  const [listImg, setListImg] = useState([]);

  useEffect(() => {
    getData();
    getImg();
  },[]);

   // danh sach 
   const getData = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/post/show_tv');
    setListPost(res.data.data);
   };
   //danh sach img
  const getImg = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/imgPost/show`);
    setListImg(res.data.data);
  }

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
            {listPost.map((listPost, index) => {
              return (
              <div className="qa">
                <h3>{listPost.post_name}</h3>
                <h4>{listPost.description_sort}</h4>
                <p>{listPost.description}</p>
                {listImg.map((a, index) => {
                  return a.id_post == listPost.id_post && (
                <img src={a.link_img_user} alt='' width={400} height={200}></img>
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