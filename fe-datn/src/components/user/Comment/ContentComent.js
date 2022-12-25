import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { url } from '../../url';

function ContentComent() {
  const user = JSON.parse(localStorage.getItem('user'));
  const id_user = !user ? "" : user[0].id ;
  const {id_post} = useParams();
  const [loader,setLoader] = useState(0);
  const [listComment, setListComment] = useState({
      Comment_parent: [],
      Comment_child: []
  });
  const {
    Comment_parent,
    Comment_child
  } = listComment
  const [addNotify, setNotify] = useState({
    id_user_tow: "",
    interaction:"",
    id_user: user ? user[0].id : "",
    id_post: id_post,
  });
  const [VisableCmt, setVisableCmt] = useState(1); //loader cmt number
  const [Comment,setComment] = useState('');
  const [getIdComment,setGetIdComment] = useState(undefined);
  const [Reply,setReply] = useState({
    activeComment: false,
    id:""
  });
  const {
    activeComment,
    id
  } = Reply
  const {id_user_tow,interaction} = addNotify;
  const [updateCmt,setUpdateCmt] = useState(false);
  const [contentUpdateCmt, setContentUpdateCmt] = useState('');
  // danh sach Comment
  const getData = async () => {
    const res = await axios.get(`${url}/comment/post/show/${id_post}`);
    setListComment({...listComment,Comment_parent: res.data.data,Comment_child:res.data.comment_child});
  };

  useEffect(() => {
    getData();
  },[loader]);

  const handleChangeComment = (e) => {
    setComment(e.target.value)
  }
  const handleReplyComment = async (e,idReplyCmt) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content',Comment)
    formData.append('id_user',id_user)
    formData.append('id_post',id_post)
    formData.append('parent_id',getIdComment)
    formData.append('id_Replycomment',idReplyCmt)
    // const res = await axios.post(`http://127.0.0.1:8000/api/comment/create`,formData);
    const res = await axios.post(`${url}/comment/create`,formData);
      if(res.data.status == true ){
        setNotify({...addNotify , id_user_tow : res.data.id[0].id_user,interaction:'phản hồi bình luận'});
        const ress = await axios.post(`${url}/notifyComment/create`, addNotify);
        setReply({...Reply,activeComment:false,id:""})

      }
      setLoader(loader + res.data.id.length);
  }
  const handleComment = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content',Comment)
    formData.append('id_user',id_user)
    formData.append('id_post',id_post)
    // formData.append('parent_id',getIdComment)
    const res = await axios.post(`${url}/comment/create`,formData);
    if(res.data.status == true ){
      setNotify({...addNotify , id_user_tow : res.data.id[0].id_user,interaction:'bình luận'});
      const ress = await axios.post(`${url}/notifyComment/create`, addNotify);
    }
    setLoader(loader + res.data.id.length);
  }
 
  const handleDeleteComment = async (e,id_cmt) => {
      let res = await axios.post(`${url}/comment/delete/${id_cmt}?_method=DELETE`);
      if(res.data.status = true){
        setLoader(loader + 1 );
      }
  }

  const handleChangeContent = (e) => {
    setContentUpdateCmt(e.target.value);
  }

  const handleUpdateComment = async (e,id_cmt) => {
    e.preventDefault();
    setUpdateComment({activeUpdateComment:true,idUpdateCmt:id_cmt})
    let res = await  axios.get(`${url}/comment/show/${id_cmt}`)
    setContentUpdateCmt(res.data.data.content);
  
  }

  const handleUpdateContent = async (e,id_cmt) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content',contentUpdateCmt);
    let res = await  axios.post(`${url}/comment/update/${id_cmt}?_method=PUT`,formData)
    setLoader(loader + 1)
    setUpdateComment({...UpdateComment,activeUpdateComment:false})
  }

  const [UpdateComment,setUpdateComment] = useState({
    activeUpdateComment:false,
    idUpdateCmt: ''
  })
  const {
    activeUpdateComment,
    idUpdateCmt
  } = UpdateComment
  //loader cmt number
  const loadmoreCmt = () => {
    setVisableCmt(VisableCmt + 10);
    getData();
  }
return (
 <>
  <div className="input_comment">
    <Form className="display_comment" onSubmit={e => handleComment(e)}>
      <Form.Group  className="col-10">
        <Form.Control 
          style={{"padding":"24px 0 24px 12px"}}
          type="text"
          name="reply_cmt" 
          onChange = {(e) => handleChangeComment(e)}
          placeholder="Viết bình luận của bạn"
        />
      </Form.Group>
      <Button  className="col-1 button_input_submit"  type="submit" style={{"marginTop":"12px"}}>Bình luận</Button>
    </Form>
    <div style={{margin:' 26px 10px 0'}}>
      <span>Xem {Comment_parent.length + Comment_child.length} bình luận trong bài </span>
      <i className="fa-regular fa-comment"></i>
    </div>
  </div>
  <hr />
  {Comment_parent.slice(0,VisableCmt).map((comment, index) => {
    return <>
        <div className="container_comment" key={index}>
           {/* <div key={index}> */}
              <div className="display_comment display_comment_justify" >
                <div className="content_comment_img_user" >
                  <img className="content_comment_img___" src={comment.link_img_user} alt="images" />
                  <div className="content_comment____">
                    <b className=''>{comment.full_name}</b>
                    {activeUpdateComment == true && idUpdateCmt == comment.id_comment ? (
                      <div className="content_comment____form_input__" >
                        <Form 
                          className="display_comment" 
                          onSubmit={e => handleUpdateContent(e,comment.id_comment)} 
                          encType="multipart/form-data"
                        >
                          <Form.Group className="col-9">
                            <Form.Control 
                            type="text" 
                            name="updatecmt" 
                            onChange={(e) => handleChangeContent(e)}  
                            value={contentUpdateCmt}  />
                          </Form.Group>
                          <Button  className="button_input_submit btn btn-primary" type="submit">Cập nhật</Button>
                        </Form>
                      </div>
                      ) : ( <p className=''>{comment.content}</p>) 
                    }
                  </div>
                  <div className="content_comment_chammmm">
                  ...
                    { id_user == comment.id_user &&
                      <div className="content_comment_editAndDelete">
                        <span onClick={(e) => handleDeleteComment(e,comment.id_comment)} >Xóa</span>  <br />
                        <span onClick={(e) => handleUpdateComment(e,comment.id_comment)} >Chỉnh sửa</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className="btn_feedback_comment">
                <div className="display_comment">
                  <span 
                    onClick={() => {setGetIdComment(comment.id_comment); 
                    setReply({...Reply,activeComment:true,id:comment.id_comment})}} 
                    className="feedback_comment_span" >
                    <strong>Trả lời</strong>
                  </span>
                  <p  className="feedback_comment_time" >
                    {moment(comment.created_at).local().startOf('day').fromNow()}
                  </p> 
                </div>
                { activeComment && id == comment.id_comment &&
                  <div className="content_comment____form_input__">
                    <Form className="display_comment" onSubmit={e => handleReplyComment(e,comment.id_comment)}>
                      <Form.Group className="col-9">
                        <Form.Control 
                        style={{"padding":"24px 0 24px 12px"}}
                        type="text"
                        name="reply_cmt" 
                        className=''                                 
                        onChange = {(e) => handleChangeComment(e)}
                        placeholder="Trả lời bình luận"
                        />
                      </Form.Group>
                    <Button className="col-1 button_input_submit btn btn-primary" type="submit" style={{"marginTop":"12px"}}>Bình luận</Button>
                  </Form>
                  </div> } 
              </div>
           {/* </div> */}
           { Comment_child.map((cmt,i) => {
            return  cmt.param_id == comment.id_comment && 
            <>
              {/* <hr /> */}
              <div className="feedback_comment_content" key={i}>
                <div className="display_comment display_comment_justify">
                  <div className="content_comment_img_user">
                    <img className="content_comment_img___" src={cmt.link_img_user} alt="images" />
                    <div className="content_comment____">
                      <b className='cmt_name'>{cmt.full_name}</b>
                      {activeUpdateComment == true && idUpdateCmt == cmt.id_comment ? ( 
                      <div className="content_comment____form_input__">
                        <Form 
                          className="display_comment" 
                          onSubmit={e => handleUpdateContent(e,cmt.id_comment)} 
                          encType="multipart/form-data"
                        >
                          <Form.Group className="col-9">
                            <Form.Control 
                              type="text" name="updatecmt" 
                              onChange={(e) => handleChangeContent(e)}  
                              value={contentUpdateCmt}  
                            />
                          </Form.Group>
                          <Button className="col-3" type="submit">Cập nhật</Button>
                        </Form>
                      </div> 
                      ) : ( 
                      <p className='cmt_name1' key={i}>{cmt.content}</p>) 
                      }
                    </div>
                    <div className="content_comment_chammmm"> ...
                      { id_user == cmt.id_user &&
                        <div className="content_comment_editAndDelete">
                          <span onClick={(e) => handleDeleteComment(e,cmt.id_comment)}>Xóa</span> <br />
                          <span onClick={(e) => handleUpdateComment(e,cmt.id_comment)}>Chỉnh sửa</span> 
                        </div>
                      }
                    </div>
                  </div>
                </div>
                <div className="btn_feedback_comment">
                  <div className="display_comment" >
                    <span 
                      onClick={() => {setGetIdComment(comment.id_comment); 
                      setReply({activeComment:true,id:cmt.id_comment})}}
                      className="feedback_comment_span"
                    >
                      <strong>Trả lời</strong>
                    </span>
                    <p className="feedback_comment_time" >{moment(cmt.created_at).fromNow()}</p>
                  </div>
                  { activeComment && id == cmt.id_comment &&
                  <div className="content_comment____form_input__">
                    <Form className="display_comment" onSubmit={e => handleReplyComment(e,cmt.id_comment)}>
                      <Form.Group className="col-9">
                        <Form.Control 
                          style={{"padding":"24px 0 24px 12px"}}
                          type="text"
                          name="reply_cmt" 
                          className=''                                        
                          onChange = {(e) => handleChangeComment(e)}
                          placeholder="Trả lời bình luận"
                        />
                      </Form.Group>
                      <Button className="col-2 button_input_submit btn btn-primary" type="submit">Bình luận</Button>
                    </Form>
                  </div> 
                  } 
                </div>
              </div>
            </> 
          })}            
        </div>
    </> 
    })}
    {VisableCmt < listComment.length &&
    <p onClick={(e) => loadmoreCmt(e)}>Xem thêm bình luận</p>
    }
 </>
)
}

export default ContentComent
