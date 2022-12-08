import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
// import moment from 'moment';
import axios from 'axios';

function ContentComent() {
  const user = JSON.parse(localStorage.getItem('user'));

  const id_user = user[0].id;
  const {id_post} = useParams();
  const [loader,setLoader] = useState(0);
  const [listComment, setListComment] = useState({
      Comment_parent: [],
      Comment_child: []
  });
  const [Comment,setComment] = useState('');
  const [getIdComment,setGetIdComment] = useState(undefined);
  console.log(getIdComment);
  const [Reply,setReply] = useState(false);

  const handleChangeComment = (e) => {
    // console.log(e.target.value)
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
    setLoader(res.data.length+1);
  }
  const {
    Comment_parent,
    Comment_child
  } = listComment
  // console.log(rate);
  useEffect(() => {
      getData();
  },[loader]);

  // danh sach Comment
  const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/comment/post/show/${id_post}`);
    console.log(res)
    setListComment({...listComment,Comment_parent: res.data.data,Comment_child:res.data.comment_child});
  };
return (
 <>
  {Comment_parent.map((comment, index) => {
    return <>
       <div key={index}>
           <div key={index}>
            <span style={{color: "orange"}} ><i class="bi bi-star-fill"></i></span>
              <div>
                <img src={comment.link_img_user} alt="images" style={{width:'30px', height:'30px', borderRadius:'50%'}} />
                <b className='cmt_name'>{comment.full_name}</b>
                <p className='cmt_name1'>{comment.content}</p> 
                {/* <p style={{"marginLeft":"36px"}}>{moment(comment.created_at).fromNow()}</p>   */}
              </div>
              <div>
                  <span onClick={() => {setGetIdComment(comment.id_comment); setReply(true)}} style={{"marginLeft":"36px","Color":"#bebebe"}}><strong>Trả lời</strong></span>
                  {
                  Reply == true 
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
               &&     
               <>
                   <div key={i}>
                    <hr />
                      <div style={{ "paddingLeft": "36px" }}>
                      <span style={{ color: "orange" }}><i class="bi bi-star-fill"></i></span>
                      <div>
                        <img src={cmt.link_img_user} alt="images" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                        <b className='cmt_name'>{cmt.full_name}</b>
                        <p className='cmt_name1'>{cmt.content}</p>
                        {/* <p>{moment(cmt.created_at).fromNow()}</p> */}
                      </div>
                      <div>
                        <span onClick={() => {setGetIdComment(cmt.id_comment); setReply(true)}} style={{ "marginLeft": "36px", "Color": "#bebebe" }}><strong>Trả lời</strong></span>
                        {
                        Reply == true 
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
        </>  
    })    
}
 </>
)
}

export default ContentComent