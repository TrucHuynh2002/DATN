import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { url } from '../url';
import { TabTitle } from '../title';
import HashLoader from "react-spinners/HashLoader";

function QA() {
  TabTitle('Hỏi đáp');
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')); 
  const [VisableCmt, setVisableCmt] = useState(3); //loader cmt
  const id_user = !user ? "" : user[0].id ;
  const [listQa, setListQa] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [listCountComment, setListCountComment] = useState([]);
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

  const [index, setIndex] = useState(5);

  const handleUpdateComment = async (e,id_cmt) => {
    e.preventDefault();
    let res = await  axios.get(`${url}/comment_qa/show/${id_cmt}`)
    setContentUpdateCmt(res.data.data.content);
    setUpdateComment({activeUpdateComment:true,idUpdateCmt:id_cmt})

  }

  const handleUpdateContent = async (e,id_cmt) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content',contentUpdateCmt);
    let res = await  axios.post(`${url}/comment_qa/update/${id_cmt}?_method=PUT`,formData)
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
    id_qa: "",
  });
  const { qa_content } = Comment;

  const [addQA,setAddQA] = useState("");
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
    getData()
  },[loader]);

   // danh sach 
   const getData = async () => {
    const Qa = await axios.get(`${url}/qa/show`);
    setListQa(Qa.data.data);
    const res = await axios.get(`${url}/comment_qa/show_qa`);
    setListComment(res.data.data);  
    setListChildComment(res.data.data_child);
    
   };
   const countcmt = async (e,id_qa) => {
    const countcmt = await axios.get(`${url}/comment_qa/count/${id_qa}`);
      setListCountComment(countcmt.data.data)
   }
  const handleQA = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content',addQA.content)
    formData.append('id_user',id_user)
    const res = await axios.post(`${url}/qa/created_at`,formData);
    setLoader(res.data.length++);
  }
  const handleChangeComment = (e) => {
    setComment({[e.target.name]: e.target.value})
  }
  const handleComment = async (e,id_qa,parent_id = '',childIdComment) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content',qa_content)
    formData.append('id_user',id_user)
    formData.append('id_qa',id_qa)
    formData.append('parent_id',parent_id)
    formData.append('child_idComment',childIdComment)
    // const res = await axios.post(`http://127.0.0.1:8000/api/comment_qa/create`,formData);
    const res = await axios.post(`${url}/comment_qa/create`,formData);
    console.log(res.data)
    if(res.data.status == true){
      setNotify({...addNotify , id_user_tow : res.data.id_qa.id_user,interaction : 'bình luận',id_qa:id_qa});
      const ress = await axios.post(`${url}/noty_qa/create`, addNotify);
    }
    setReply({
      activeComment:false
    })
    setLoader(loader + 1);
  }
  // xoa cmtQa
  const handleDeleteComment = async (e,id_cmt) => {
    let res = await axios.post(`${url}/comment_qa/delete/${id_cmt}?_method=DELETE`);
    if(res.data.status = true){
      setLoader(loader + 1 );
    }
  }
  // xoa qa
  const deleteQa = async (id_qa) => {
    await axios.delete(`${url}/qa/deleteQa/${id_qa}`);
    getData();
  };

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
  const loadmoreCmt = () => {
        setVisableCmt(VisableCmt + 3);
       getData();
  }
  const [countCommentQA, setCountCommentQA] = useState({
    id_qa : '',
    count:0
  })
  return (
    <>
      {loading ? 
          <HashLoader className='css_loading'
          color={'#0d3380'}
          loading={loading}
          size={100}
          />
          :
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
            <div className="our_room row">
              <div className="container col-lg-10 col-md-12 col-xs-12 classQA">
                <div className='qa_input'>
                  <Button variant="secondary" className='btn_qa' onClick={handleShow}>
                    Bạn đang thắc mắc?
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Bạn đang nghĩ gì</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      { alertShow ?
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
                          />
                          <div className='btn_qa2' ><Button  variant="primary" name='' type="submit"> Đăng </Button>  </div>                  
                        </Form>  
                        :
                        (
                          <div style={{padding:"16px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            CLICK ĐĂNG NHẬP ĐỂ HỎI - ĐÁP
                          </div>
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
                            <Link to={`../qaDetail/${listQa.id_qa}`} className='qa_link'>{moment(listQa.created_at).local().startOf('day').fromNow()}</Link>
                            </div>
                          </div> 
                            {id_user == listQa.id_user &&
                              <div className="content_comment_chammmm_delete"> ...
                                  <div className="content_comment_Delete">
                                    <span onClick={() => deleteQa(listQa.id_qa)}>Xóa</span>
                                  </div>
                              </div>
                            }
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
                          <Button className="button_input_submit btn btn-primary"  variant="primary" size="sm" name='' type="submit"> Gửi </Button>                    
                        </Form>    
                      </div>
                      <div style={{margin:' 26px 10px 0'}}>
                        {/* <span>Xem {listComment.length} bình luận trong bài </span> */}
                        <span>Xem {listComment.length} bình luận trong bài </span>
                        {/* {
                          countCommentQA.id_qa == listQa.id_qa ? countCommentQA.id_qa
                        } */}
                        <i className="fa-regular fa-comment"></i>
                      </div>
                      {listComment.slice(0,VisableCmt).map((listComment, index) => {
                          // if(listComment.id_qa == listQa.id_qa){
                          //   setCountCommentQA({
                          //     ...countCommentQA,
                          //     [countCommentQA.id_qa]: listQa.id_qa,
                          //    [ countCommentQA.count]:  countCommentQA.count + 1
                          //   })
                          // }
                        return( listQa.id_qa == listComment.id_qa && (
                          <div className="container_qa" key={index}>
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
                          <div className="display_comment dispaly_qa_comment">
                            <div className='qa_content content_comment____'>
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
                                ) : ( <p className='cmt_name1' key={index}>{listComment.content}</p> ) 
                              }
                              </div>
                                { id_user == listComment.id_user &&
                                  <div className="content_comment_chammmm"> ...
                                      <div className="content_comment_editAndDelete">
                                        <span  onClick={(e) => handleDeleteComment(e,listComment.id_comment_qa)}>Xóa</span> <br />
                                        <span onClick={(e) => handleUpdateComment(e,listComment.id_comment_qa)} >Cập nhật</span>  
                                      </div>
                                  </div>
                                }
                          </div>
                            
                            <span 
                            onClick={() => {
                            setReply({
                              activeComment:true,id:listComment.id_comment_qa
                            })}}
                            className="feedback_comment___"
                            >
                            <strong>Trả lời</strong>
                            { activeComment && id == listComment.id_comment_qa &&
                              <div className="content_comment____form_input__">
                                <Form className="display_comment" 
                                onSubmit={e => handleComment(e,listComment.id_qa,listComment.id_comment_qa,listComment.id_comment_qa)}
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
                              <div key={i}>
                                <div className='qa_avatar'>
                                  <img src={child.link_img_user} alt='' className="content_comment_img___" />
                                  <div>
                                    <div className="feedback_comment_time">
                                      <Link to={`../profile/${child.id_user}`} className='qa_link'>{child.full_name}</Link>
                                    </div>  
                                    <div className="feedback_comment_time">
                                      {moment(child.created_at).local().startOf('day').fromNow()}
                                    </div>
                                  </div>                            
                                </div>
                                <div className="display_comment dispaly_qa_comment">
                                  <div className='qa_content qa_content content_comment____' style={{marginTop: '15px'}}>
                                  { activeUpdateComment && idUpdateCmt == child.id_comment_qa ? 
                                    ( 
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
                                    ) 
                                    : 
                                    ( <p className='cmt_name1' key={i}>{child.content}</p> ) 
                                  }
                                  </div>
                                  <div className="content_comment_chammmm"> ...
                                  {
                                    id_user == child.id_user  && 
                                    <div className="content_comment_editAndDelete">
                                        <span  onClick={(e) => handleDeleteComment(e,child.id_comment_qa)}>Xóa</span> <br />
                                        <span onClick={(e) => handleUpdateComment(e,child.id_comment_qa)} >Cập nhật</span> 
                                    </div>
                                  }
                                  </div>
                                </div>
                                <span 
                                    onClick={() => {
                                    setReply({activeComment:true,id:child.id_comment_qa})}}
                                    className="feedback_comment___"
                                    >
                                    <strong>Trả lời</strong>
                                    { activeComment && id == child.id_comment_qa &&
                                      <div className="content_comment____form_input__">
                                        <Form className="display_comment" 
                                        onSubmit={e => handleComment(e,listComment.id_qa,listComment.id_comment_qa,child.id_comment_qa)}
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
                                  <hr/>
                              </div>
                              )})}
                            </div>
                          </div>
                        ))}
                      )}
                      {VisableCmt < listComment.length &&
                      <p onClick={(e) => loadmoreCmt(e)} className="loadCmt">Xem thêm bình luận</p>
                      } 
                    </div>
                  );})}
                  
              </div>
            </div>
          </>
      }
    </>
  )
}
export default QA