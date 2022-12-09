import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment'
import axios, { AxiosHeaders } from 'axios';

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
    id_user: user ? user[0].id : "",
    id_post: id_post.id_post,
  });
  const [Comment,setComment] = useState('');
  const [getIdComment,setGetIdComment] = useState(undefined);
  // console.log(getIdComment);
  const [Reply,setReply] = useState({
    activeComment: false,
    id:""
  });
  const {
    activeComment,
    id
  } = Reply
 
const [updateCmt,setUpdateCmt] = useState(false);
const [contentUpdateCmt, setContentUpdateCmt] = useState('');
  // danh sach Comment
  const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/comment/post/show/${id_post}`);
    console.log(res.data);
    setListComment({...listComment,Comment_parent: res.data.data,Comment_child:res.data.comment_child});
  };

  useEffect(() => {
    getData();
},[loader]);

  const handleChangeComment = (e) => {
    setComment(e.target.value)
  }
  const handleReplyComment = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content',Comment)
    formData.append('id_user',id_user)
    formData.append('id_post',id_post)
    formData.append('parent_id',getIdComment)
    const res = await axios.post(`http://127.0.0.1:8000/api/comment/create`,formData);
    console.log(res);
      if(res.data.status == true ){
        const {id_user_tow} = addNotify;
        setNotify({...addNotify , id_user_tow : res.data.id[0].id_user});
        const resss = await axios.post(`http://127.0.0.1:8000/api/notifyComment/create`, addNotify);
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
    const res = await axios.post(`http://127.0.0.1:8000/api/comment/create`,formData);
    console.log(res);
    setLoader(loader + res.data.id.length);
  }

  const handleDeleteComment = async (e,id_cmt) => {
      let res = await axios.post(`http://127.0.0.1:8000/api/comment/delete/${id_cmt}?_method=DELETE`);
      if(res.data.status = true){
        setLoader(loader + 1 );
      }
  }

  const handleChangeContent = (e) => {
    setContentUpdateCmt(e.target.value);
  }

  const handleUpdateComment = async (e,id_cmt) => {
    // e.preventDefault();
    setUpdateComment({activeUpdateComment:true,idUpdateCmt:id_cmt})
    console.log(id_cmt);
    let res = await  axios.get(`http://127.0.0.1:8000/api/comment/show/${id_cmt}`)
    console.log(res)
    setContentUpdateCmt(res.data.data.content);
  
  }

  const handleUpdateContent = async (e,id_cmt) => {
    e.preventDefault();
    console.log(id_cmt)
    let formData = new FormData();
    formData.append('content',contentUpdateCmt);
    let res = await  axios.post(`http://127.0.0.1:8000/api/comment/update/${id_cmt}?_method=PUT`,formData)
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

return (
 <>
  <h2>Có {Comment_parent.length + Comment_child.length} Bình luận</h2>
  <div>
    <Form onSubmit={e => handleComment(e)}>
                          <Form.Group>
                          <Form.Control 
                                    style={{"padding":"24px 0 24px 12px"}}
                                    type="text"
                                    name="reply_cmt" 
                                    className=''
                                   
                                    onChange = {(e) => handleChangeComment(e)}
                                    placeholder="Trả lời bình luận"
                          />
                          </Form.Group>
                          <Button type="submit" style={{"marginTop":"12px"}}>Submit</Button>
                        
    </Form>
  </div>
  <hr />
  {Comment_parent.map((comment, index) => {
    return <>
       <div key={index}>
           <div key={index}>
            {/* <span style={{color: "orange"}} ><i class="bi bi-star-fill"></i></span> */}
              <div>
                <img src={comment.link_img_user} alt="images" style={{width:'30px', height:'30px', borderRadius:'50%'}} />
                <b className='cmt_name'>{comment.full_name}</b>

                {activeUpdateComment == true && idUpdateCmt == comment.id_comment
                 ? 
                 (
                    <div style={{"padding": "16px"}}>
                        <Form onSubmit={e => handleUpdateContent(e,comment.id_comment)} encType="multipart/form-data">
                            <Form.Group>
                              <Form.Control type="text" name="updatecmt" onChange={(e) => handleChangeContent(e)}  value={contentUpdateCmt}  />
                            </Form.Group>
                        <Button style={{"marginTop":"8px"}} type="submit">Cập nhật</Button>
                        </Form>
                    </div>
                  )
                 
                 :
                 ( <p className='cmt_name1'>{comment.content}</p>) 
                }

                <p style={{"marginLeft":"36px"}}>{moment(comment.created_at).local().startOf('day').fromNow()}</p>  
                {
                id_user == comment.id_user 
                &&
                    <>
                      <button onClick={(e) => handleDeleteComment(e,comment.id_comment)}>Xóa</button> 
                      <button onClick={(e) => handleUpdateComment(e,comment.id_comment)}>Cập nhật</button> 
                    </>
                }
   
              </div>
              <div>
                  <span onClick={() => {setGetIdComment(comment.id_comment); setReply({...Reply,activeComment:true,id:comment.id_comment})}} style={{"marginLeft":"36px","Color":"#bebebe"}}><strong>Trả lời</strong></span>
                  {
                  activeComment && id == comment.id_comment
                  &&
                  <div style={{"marginLeft":"36px"}}>
                        <Form onSubmit={e => handleReplyComment(e)}>
                          <Form.Group>
                          <Form.Control 
                                    style={{"padding":"24px 0 24px 12px"}}
                                    type="text"
                                    name="reply_cmt" 
                                    className=''                                 
                                    onChange = {(e) => handleChangeComment(e)}
                                    placeholder="Trả lời bình luận"
                          />
                          </Form.Group>
                          <Button type="submit" style={{"marginTop":"12px"}}>Submit</Button>
                        </Form>
                  </div> 
                  } 
              </div>
           </div>
           {
            Comment_child.map((cmt,i) => {
             return  cmt.param_id == comment.id_comment
               ?  
               <>
                   <div key={i}>
                    <hr />
                      <div style={{ "paddingLeft": "36px" }}>
                      {/* <span style={{ color: "orange" }}><i class="bi bi-star-fill"></i></span> */}
                      <div>
                        <img src={cmt.link_img_user} alt="images" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                        <b className='cmt_name'>{cmt.full_name}</b>
                        {activeUpdateComment == true && idUpdateCmt == cmt.id_comment
                            ? 
                            
                            (
                              <div style={{"padding": "16px"}}>
                                  <Form  onSubmit={e => handleUpdateContent(e,cmt.id_comment)} encType="multipart/form-data">
                                      <Form.Group>
                                        <Form.Control type="text" name="updatecmt" onChange={(e) => handleChangeContent(e)}  value={contentUpdateCmt}  />
                                      </Form.Group>
                                  <Button style={{"marginTop":"8px"}} type="submit">Cập nhật</Button>
                                  </Form>
                              </div>
                            )
                            :
                            ( <p className='cmt_name1'>{cmt.content}</p>) 
                              
                            }
                        <p>{moment(cmt.created_at).fromNow()}</p>
                        {
                        id_user == cmt.id_user 
                        &&
                            <>
                              <button onClick={(e) => handleDeleteComment(e,cmt.id_comment)}>Xóa</button> 
                              <button onClick={(e) => handleUpdateComment(e,cmt.id_comment)}>Cập nhật</button> 
                            </>
                        }
                      </div>
                      <div>
                        <span onClick={() => {setGetIdComment(cmt.id_comment); setReply({activeComment:true,id:cmt.id_comment})}} style={{ "marginLeft": "36px", "Color": "#bebebe" }}><strong>Trả lời</strong></span>
                        {
                        activeComment && id == cmt.id_comment
                        &&
                        <div style={{"marginLeft":"36px"}}>
                              <Form onSubmit={e => handleReplyComment(e)}>
                                <Form.Group>
                                <Form.Control 
                                          style={{"padding":"24px 0 24px 12px"}}
                                          type="text"
                                          name="reply_cmt" 
                                          className=''                                        
                                          onChange = {(e) => handleChangeComment(e)}
                                          placeholder="Trả lời bình luận"
                                />
                                </Form.Group>
                                <Button type="submit" style={{"marginTop":"12px"}}>Submit</Button>
                              </Form>
                        </div> 
                        } 
                      </div>
                      </div>
                   </div>
               </>    
              :
              <>
              <div key={i}>
               <hr />
                 <div style={{ "paddingLeft": "36px" }}>
                 {/* <span style={{ color: "orange" }}><i class="bi bi-star-fill"></i></span> */}
                 <div>
                   <img src={cmt.link_img_user} alt="images" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                   <b className='cmt_name'>{cmt.full_name}</b>
                   {activeUpdateComment == true && idUpdateCmt == cmt.id_comment
                       ? 
                       
                       (
                         <div style={{"padding": "16px"}}>
                             <Form  onSubmit={e => handleUpdateContent(e,cmt.id_comment)} encType="multipart/form-data">
                                 <Form.Group>
                                   <Form.Control type="text" name="updatecmt" onChange={(e) => handleChangeContent(e)}  value={contentUpdateCmt}  />
                                 </Form.Group>
                             <Button style={{"marginTop":"8px"}} type="submit">Cập nhật</Button>
                             </Form>
                         </div>
                       )
                       :
                       ( <p className='cmt_name1'>{cmt.content}</p>) 
                         
                       }
                   <p>{moment(cmt.created_at).fromNow()}</p>
                   {
                   id_user == cmt.id_user 
                   &&
                       <>
                         <button onClick={(e) => handleDeleteComment(e,cmt.id_comment)}>Xóa</button> 
                         <button onClick={(e) => handleUpdateComment(e,cmt.id_comment)}>Cập nhật</button> 
                       </>
                   }
                 </div>
                 <div>
                   <span onClick={() => {setGetIdComment(cmt.id_comment); setReply({activeComment:true,id:cmt.id_comment})}} style={{ "marginLeft": "36px", "Color": "#bebebe" }}><strong>Trả lời</strong></span>
                   {
                   activeComment && id == cmt.id_comment
                   &&
                   <div style={{"marginLeft":"36px"}}>
                         <Form onSubmit={e => handleReplyComment(e)}>
                           <Form.Group>
                           <Form.Control 
                                     style={{"padding":"24px 0 24px 12px"}}
                                     type="text"
                                     name="reply_cmt" 
                                     className=''                                        
                                     onChange = {(e) => handleChangeComment(e)}
                                     placeholder="Trả lời bình luận"
                           />
                           </Form.Group>
                           <Button type="submit" style={{"marginTop":"12px"}}>Submit</Button>
                         </Form>
                   </div> 
                   } 
                 </div>
                 </div>
              </div>
              </>       
            })
           }            
        </div>
        <hr />
        </>  
    })    
}
 </>
)
}

export default ContentComent