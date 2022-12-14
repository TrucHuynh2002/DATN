import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function QA() {
  const user = JSON.parse(localStorage.getItem('user'));
  const id_user = !user ? "" : user[0].id ;
  const [listQa, setListQa] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [listComment, setListComment] = useState([]);
  const [loader,setLoader] = useState(0);
  const [Comment,setComment] = useState({
   qa_content:"",
  });
  const [addNotify, setNotify] = useState({
    id_user_tow: "",
    interaction:"",
    id_user: user ? user[0].id : "",
    id_post: "",
  });
  const { qa_content } = Comment;

  const [addQA,setAddQA] = useState("");
  useEffect(() => {
    getData();
    getComment();
  },[loader]);

   // danh sach 
   const getData = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/qa/show');
    setListQa(res.data.data);
   };
   
   // danh sách cmt
  const getComment = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/comment_qa/show_qa`);
    setListComment(res.data.data);  
};

  const handleQA = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content',addQA.content)
    formData.append('id_user',id_user)
    const res = await axios.post(`http://127.0.0.1:8000/api/qa/created_at`,formData);
    setLoader(res.data.length++);
  }
  const handleChangeComment = (e) => {
    setComment({...Comment, [e.target.name]: e.target.value})
  }
  const handleComment = async (e,id_qa) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content',qa_content)
    formData.append('id_user',id_user)
    formData.append('id_qa',id_qa)
    const res = await axios.post(`http://127.0.0.1:8000/api/comment_qa/create`,formData);
    if(res.data.status === true){
      setNotify({...addNotify , id_user_tow : res.data.id[0].id_user,interaction:'bình luận'});
      const ress = await axios.post(`http://127.0.0.1:8000/api/notifyComment/create`, addNotify);
    }
    // console.log(res);
    setLoader(loader + res.data.id.length);
  }
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
                  <Modal.Title>Bạn đang nghĩ gì</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form encType="multipart/form-data" onSubmit={e => handleQA(e)}>
                  <CKEditor
                                editor={ClassicEditor}
                                data={qa_content}
                                onReady={(editor)=>{
                                    editor.editing.view.change((writer)=>{
                                        writer.setStyle('height','100%',editor.editing.view.document.getRoot())
                                    })
                                }}
                                onChange={(event,editor) => {
                                    let data = editor.getData();
                                    setAddQA({addQA, content:data});
                                }}
                                >
                                </CKEditor>
                    <Button variant="primary" name='' type="submit">
                      Đăng
                    </Button>                    
                  </Form> 
                </Modal.Body>
              </Modal>
            </div>
            {listQa.map((listQa, index) => {
              return (
              <div className="qa" key={index}>
                <div className='qa_avatar'>             
                    <img src={listQa.link_img_user}
                     alt='' className="img" />
                    <div className="qa_div_userAndDay">
                      <div className="feedback_comment_time">
                        <Link to={`../profile/${listQa.id_user}`} className='qa_link'>{listQa.full_name}</Link>
                      </div>
                      <div className="feedback_comment_time"> 
                        {moment(listQa.created_at).local().startOf('day').fromNow()}
                      </div>
                    </div> 
                </div>
                <h3>{listQa.title}</h3>
                <div className="qa_container" dangerouslySetInnerHTML={{__html: listQa.content}} />   
                <hr />
                <div className='qa_cmt'>
              
                  <Form className="display_comment" onSubmit={(e) => handleComment(e,listQa.id_qa)}>
                    <Form.Group className="col-11" controlId="">
                        <Form.Control 
                        type="text" 
                        name="qa_content" 
                        className='' 
                        placeholder="Viết bình luận của bạn"
                        onChange = {(e) => handleChangeComment(e)} />            
                    </Form.Group>
                    <Button className="col-1 button_input_submit btn btn-primary"  variant="primary" size="sm" name='' type="submit"> Gửi </Button>                    
                  </Form>    
                </div>
                <div style={{margin:' 26px 10px 0'}}>
                  <span>Xem {listComment.length} bình luận trong bài </span>
                  <i className="fa-regular fa-comment"></i>
                </div>
              {listComment.map((listComment, index) => {
                return(
                    listQa.id_qa == listComment.id_qa && (
                    <div className="qa_comment_feedback" key={index}>
                        <div className='qa_avatar'>
                          <img src={listComment.link_img_user}
                          alt='' className="content_comment_img___" />
                          <div>
                            <div className="feedback_comment_time">
                              <Link to={`../profile/${listQa.id_user}`} className='qa_link'>{listComment.full_name}</Link>
                            </div>  
                            <div className="feedback_comment_time">
                              {moment(listComment.created_at).local().startOf('day').fromNow()}
                            </div>
                          </div>
                        </div>
                      <div className='qa_content' style={{marginTop: '15px'}}>
                        <p>{listComment.content}</p>
                      </div>
                      <hr />
                    </div>                 
                    )
              )
              })}
            </div>
            );
          })}
          </div>
        </div>
    </>
  )
}
export default QA