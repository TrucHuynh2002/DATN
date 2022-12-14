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
  const [listChildComment, setListChildComment] = useState([]);
  const [loader,setLoader] = useState(0);
  const [getIdComment,setGetIdComment] = useState(undefined);
  const [Reply,setReply] = useState({
    activeComment: false,
    id:""
  });
  
  // Trả lời bình luận
  const [contentUpdateCmt, setContentUpdateCmt] = useState('');
  const [UpdateComment,setUpdateComment] = useState({
    activeUpdateComment:false,
    idUpdateCmt: ''
  })
  const {
    activeUpdateComment,
    idUpdateCmt
  } = UpdateComment

  const handleUpdateComment = async (e,id_cmt) => {
    e.preventDefault();
    let res = await  axios.get(`http://127.0.0.1:8000/api/comment_qa/show/${id_cmt}`)
    console.log(res.data);
    setContentUpdateCmt(res.data.data.content);
    setUpdateComment({activeUpdateComment:true,idUpdateCmt:id_cmt})

    // activeUpdateComment 
    // &&
    // setUpdateComment({activeUpdateComment:false,idUpdateCmt:id_cmt})
   
  }

  const handleUpdateContent = async (e,id_cmt) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content',contentUpdateCmt);
    let res = await  axios.post(`http://127.0.0.1:8000/api/comment_qa/update/${id_cmt}?_method=PUT`,formData)
    setLoader(loader + 1)
    setUpdateComment({...UpdateComment,activeUpdateComment:false})
  }
  const [CommentReply,setCommentReply] = useState('');
  const {
    activeComment,
    id
  } = Reply
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
    console.log(res.data)
    setListComment(res.data.data);  
    setListChildComment(res.data.data_child);
    // console.log(res.data.data_child)
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
    setComment({[e.target.name]: e.target.value})
    console.log(Comment)
  }
  const handleComment = async (e,id_qa,parent_id = '') => {
    
    e.preventDefault();
    console.log(id_qa)
    let formData = new FormData();
    formData.append('content',qa_content)
    formData.append('id_user',id_user)
    formData.append('id_qa',id_qa)
    formData.append('parent_id',parent_id)
    const res = await axios.post(`http://127.0.0.1:8000/api/comment_qa/create`,formData);
    // if(res.data.status === true){
    //   setNotify({...addNotify , id_user_tow : res.data.id[0].id_user,interaction:'bình luận'});
    //   const ress = await axios.post(`http://127.0.0.1:8000/api/notifyComment/create`, addNotify);
    // }
    // console.log(res);
    setLoader(loader + 1);
  }
  const handleDeleteComment = async (e,id_cmt) => {
    let res = await axios.post(`http://127.0.0.1:8000/api/comment_qa/delete/${id_cmt}?_method=DELETE`);
    if(res.data.status = true){
      setLoader(loader + 1 );
    }
}

  const [show, setShow] = useState(false);
  const [alertShow,setAlertShow] = useState(false);
  const checkManage = async () => {
    const get_user = JSON.parse(localStorage.getItem('user'));
 
    get_user ? setAlertShow(true) : setAlertShow(false);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    checkManage();
  }

  const handleReplyComment = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content',Comment)
    formData.append('id_user',id_user)
    formData.append('id_qa',id)
    formData.append('parent_id',getIdComment)
    const res = await axios.post(`http://127.0.0.1:8000/api/comment/create`,formData);
      if(res.data.status == true ){
        setNotify({...addNotify , id_user_tow : res.data.id[0].id_user,interaction:'phản hồi bình luận'});
        const ress = await axios.post(`http://127.0.0.1:8000/api/notifyComment/create`, addNotify);
        setReply({...Reply,activeComment:false,id:""})

      }
      setLoader(loader + res.data.id.length);
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
            <div className='qa_input'>
              <Button variant="secondary" className='btn_qa' onClick={handleShow}>
                Bạn đang nghĩ gì thế?
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Bạn đang nghĩ gì</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {
                    alertShow 
                    ?
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
                    :
                    (
                      <>
                        <div style={{padding:"16px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                          CLICK ĐĂNG NHẬP ĐỂ HỎI - ĐÁP
                        </div>
                      </>
                    )
                  }
               
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
                                  {activeUpdateComment && idUpdateCmt == listComment.id_comment_qa ? ( 
                                            <div className="content_comment____form_input__">
                                              <Form 
                                                className="display_comment" 
                                                onSubmit={e => handleUpdateContent(e,listComment.id_comment_qa)} 
                                                encType="multipart/form-data"
                                              >
                                                <Form.Group className="col-9">
                                                  <Form.Control 
                                                    type="text" name="updatecmt" 
                                                    onChange={(e) =>   setContentUpdateCmt(e.target.value)}  
                                                    value={contentUpdateCmt}  
                                                  />
                                                </Form.Group>
                                                <Button className="col-3" type="submit">Cập nhật</Button>
                                              </Form>
                                            </div> 
                                            ) : ( 
                                            <p className='cmt_name1' key={index}>{listComment.content}</p>) 
                                            }
                                  </div>

                                 {
                                  id_user == listComment.id_user 
                                  &&
                                  <>
                                   <span  onClick={(e) => handleDeleteComment(e,listComment.id_comment_qa)}>Xóa</span> 
                                  <span onClick={(e) => handleUpdateComment(e,listComment.id_comment_qa)} >Cập nhật</span>  
                                  </>
                                 }
                            
                              <span 
                              onClick={() => {
                                // setGetIdComment(comment.id_comment); 
                              setReply({
                                activeComment:true,id:listComment.id_comment_qa
                              })}}
                              className="feedback_comment_span"
                              >
                              <strong>Trả lời</strong>
                              { activeComment && id == listComment.id_comment_qa &&
                                <div className="content_comment____form_input__">
                                  <Form className="display_comment" 
                                  onSubmit={e => handleComment(e,listComment.id_qa,listComment.id_comment_qa)}
                                  >
                                    <Form.Group className="col-9">
                                      <Form.Control 
                                        style={{"padding":"24px 0 24px 12px"}}
                                        type="text"
                                        name="qa_content" 
                                        className=''                                        
                                        onChange = {(e) => handleChangeComment(e)}
                                        placeholder="Trả lời bình luận"
                                      />
                                    </Form.Group>
                                    <Button className="col-2 button_input_submit btn btn-primary" type="submit">Bình luận</Button>
                                  </Form>
                                </div> 
                              } 
                              </span>   
                              
                              <hr />   
                                
                                   <div style={{marginLeft:"32px"}}>
                                   {listChildComment.map((child,i) => {
                                      return child.parent_id == listComment.id_comment_qa  && (
                                       
                                      <>
                                         <div className='qa_avatar'>
                                            <img src={child.link_img_user}
                                            alt='' className="content_comment_img___" />
                                            <div>
                                              <div className="feedback_comment_time">
                                                <Link to={`../profile/${child.id_user}`} className='qa_link'>{child.full_name}</Link>
                                              </div>  
                                              <div className="feedback_comment_time">
                                                {moment(child.created_at).local().startOf('day').fromNow()}
                                              </div>
                                            </div>
                                          </div>
                                          <div className='qa_content' style={{marginTop: '15px'}}>
                                          {activeUpdateComment && idUpdateCmt == child.id_comment_qa ? ( 
                                            <div className="content_comment____form_input__">
                                              <Form 
                                                className="display_comment" 
                                                onSubmit={e => handleUpdateContent(e,child.id_comment_qa)} 
                                                encType="multipart/form-data"
                                              >
                                                <Form.Group className="col-9">
                                                  <Form.Control 
                                                    type="text" name="updatecmt" 
                                                    onChange={(e) =>   setContentUpdateCmt(e.target.value)}  
                                                    value={contentUpdateCmt}  
                                                  />
                                                </Form.Group>
                                                <Button className="col-3" type="submit">Cập nhật</Button>
                                              </Form>
                                            </div> 
                                            ) : ( 
                                            <p className='cmt_name1' key={i}>{child.content}</p>) 
                                            }
                                        </div>
                                        <span 
                                            onClick={() => {
                                              // setGetIdComment(comment.id_comment); 
                                            setReply({activeComment:true,id:child.id_comment_qa})}}
                                            className="feedback_comment_span"
                                            >
                                            <strong>Trả lời</strong>
                                            { activeComment && id == child.id_comment_qa &&
                                              <div className="content_comment____form_input__">
                                                <Form className="display_comment" 
                                                onSubmit={e => handleComment(e,listComment.id_qa,listComment.id_comment_qa)}
                                                >
                                                  <Form.Group className="col-9">
                                                    <Form.Control 
                                                      style={{"padding":"24px 0 24px 12px"}}
                                                      type="text"
                                                      name="qa_content" 
                                                      className=''                                        
                                                      onChange = {(e) => handleChangeComment(e)}
                                                      placeholder="Trả lời bình luận"
                                                    />
                                                  </Form.Group>
                                                  <Button className="col-2 button_input_submit btn btn-primary" type="submit">Bình luận</Button>
                                                </Form>
                                              </div> 
                                            } 
                                          </span>  
                                        {
                                          id_user == child.id_user 
                                          &&
                                          <>
                                             <span  onClick={(e) => handleDeleteComment(e,child.id_comment_qa)}>Xóa</span> 
                                              <span onClick={(e) => handleUpdateComment(e,child.id_comment_qa)} >Cập nhật</span> 
                                          </>
                                        }
                                          <hr/>
                                      </>
                                     
                                      )
                                   })
                                   }
                                    </div>
                                
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