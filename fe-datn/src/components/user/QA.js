import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function QA() {
  const user = JSON.parse(localStorage.getItem('user'));
  const id_user = !user ? "" : user[0].id ;
  const [listQa, setListQa] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [listComment, setListComment] = useState([]);
  const [loader,setLoader] = useState(0);
  const [createComment,setCreateComment] = useState(0);
  const [Comment,setComment] = useState('');
  const [addQA,setAddQA] = useState({
  content:"",
  });
  const { 
    content,
  } = addQA;
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

  const handleChangeQA = (e) => {
    setQA({...addQA, [e.target.name] : e.target.value})
  }
  const handleQA = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content',content)
    formData.append('title',title)
    formData.append('id_user',id_user)
    // formData.append('id_img_qa',id_img_qa)
    // formData.append('parent_id',getIdComment)
    const res = await axios.post(`http://127.0.0.1:8000/api/comment/create`,formData);
    console.log(res);
    setLoader(res.data.length++);
  }
  const handleChangeComment = (e) => {
    setComment({...Comment, e.target.name : e.target.value})
  }
  const handleComment = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content',content)
    formData.append('id_qa',id_qa)
    formData.append('id_user',id_user)
    // formData.append('id_img_qa',id_img_qa)
    // formData.append('parent_id',getIdComment)
    const res = await axios.post(`http://127.0.0.1:8000/api/comment_qa/create`,formData);
    console.log(res);
    setCreateComment(res.data.length++);
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
                  <Modal.Title>Tạo câu hỏi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form encType="multipart/form-data" onSubmit={e => handleQA(e)}>
                  <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onReady={(editor)=>{
                                    editor.editing.view.change((writer)=>{
                                        writer.setStyle('height','100%',editor.editing.view.document.getRoot())
                                    })
                                }}
                                onChange={(event,editor) => {
                                    let data = editor.getData();
                                    setAddQA({AddQA, content:data});
                                }}
                                >
                                </CKEditor>
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
                <hr></hr>
                </>

                )
              })}
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
                  <Form onSubmit={e => handleComment(e)}>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Control type="text" name="content" className='' onChange = {(e) => handleChangeComment(e)}/>            
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="id_qa">
                        <Form.Control type="text" name="id_qa" hidden value={listQa.id_qa} className=''/>            
                    </Form.Group> */}
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