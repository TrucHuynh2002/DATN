import React from 'react';
import { Link} from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
function QA() {

  const [listQa, setListQa] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [listComment, setListComment] = useState([]);
  useEffect(() => {
    getData();
    getImg();
    getComment();
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
  const getComment = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/comment_qa/show_qa`);
    // console.log(res);
    setListComment(res.data.data);  
};

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
                <img src={a.link_img_qa} width={400} height={200}></img>
                )
            })}
              {listComment.map((listComment, index) => {
                return listQa.id_qa == listComment.id_qa && (
                  <>
                <div className='qa_avata'>
                    <img src={listComment.link_img_user}
                     alt='' className="avt_qa" />
                    <span>Trả lời bởi <Link to="" className='qa_link'>{listComment.full_name}</Link></span> - <span>{listComment.created_at}</span>
                </div>
                <div className='qa_content'>
                {listComment.content}
                </div>
                <br></br><hr></hr>
                </>
                
                )
              })}<br></br>
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