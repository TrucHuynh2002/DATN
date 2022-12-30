import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { url } from '../url';
import { TabTitle } from '../title';

function QADetail() {
  TabTitle('Hỏi đáp');
  const user = JSON.parse(localStorage.getItem('user'));
  const {id_qa} = useParams();
  const [VisableCmt, setVisableCmt] = useState(10); //loader cmt number
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

  const [index, setIndex] = useState(5);

  const handleUpdateComment = async (e,id_cmt) => {
    e.preventDefault();
    let res = await  axios.get(`${url}/comment_qa/show/${id_cmt}`)
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
    getData();
    getComment();
  },[loader]);

   // danh sach 
   const getData = async () => {
    const res = await axios.get(`${url}/qa/show_detail/${id_qa}`);
    setListQa(res.data.data);
   };
   
   // danh sách cmt
  const getComment = async () => {
    const res = await axios.get(`${url}/comment_qa/show_qa`);
    setListComment(res.data.data);  
    setListChildComment(res.data.data_child);
};

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
    const res = await axios.post(`${url}/comment_qa/create`,formData);
    if(res.data.status == true){
      setNotify({...addNotify , id_user_tow : res.data.id_qa.id_user,interaction : 'bình luận',id_qa:id_qa});
      const ress = await axios.post(`${url}/noty_qa/create`, addNotify);
    }
    setReply({
      activeComment:false
    })
    setLoader(loader + 1);
  }
  const handleDeleteComment = async (e,id_cmt) => {
    let res = await axios.post(`${url}/comment_qa/delete/${id_cmt}?_method=DELETE`);
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
  //loader cmt number
  const loadmoreCmt = () => {
    setVisableCmt(VisableCmt + 10);
   getComment();
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
          {listQa.map((listQa, index) => {
            return (
              <div className="qa" key={index}>
                <div className='qa_avatar'>             
                    <img src={listQa.link_img_user}
                      alt='' className="img" />
                    <div className="qa_div_userAndDay">
                      <div className="feedback_comment_time">
                        <Link to={`../profile/${listQa.id_user}`} className='qa_link'>{listQa.full_name }</Link>
                      </div>
                      <div className="feedback_comment_time"> 
                        {moment(listQa.created_at).local().startOf('day').fromNow()}
                      </div>
                    </div>
                </div>
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
                {listComment.slice(0,VisableCmt).map((listComment, index) => {
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
                        <div className="content_comment_chammmm"> ...
                          {id_user == listComment.id_user &&
                            <div className="content_comment_editAndDelete">
                              <span  onClick={(e) => handleDeleteComment(e,listComment.id_comment_qa)}>Xóa</span> <br />
                              <span onClick={(e) => handleUpdateComment(e,listComment.id_comment_qa)} >Cập nhật</span>  
                            </div>
                          }
                        </div>
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
                          <div className='qa_avatar' >
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
  )
}
export default QADetail