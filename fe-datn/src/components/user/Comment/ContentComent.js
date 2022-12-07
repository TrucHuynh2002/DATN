import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function ContentComent() {
  const {id_post} = useParams();
  const [listComment, setListComment] = useState({
      Comment_parent: [],
      Comment_child: []
  });
  const [Comment,setComment] = useState('');

  const handleChangeComment = (e) => {
    console.log(e.target.value)
  }
  const {
    Comment_parent,
    Comment_child
  } = listComment
  // console.log(rate);
  useEffect(() => {
      getData();
  },[]);

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
              </div>
              <div>
                  <span style={{"marginLeft":"36px","Color":"#bebebe"}}><strong>Trả lời</strong></span>
                <Form>
                      <Form.Group>
                      <Form.Control type="text" name="reply_cmt" className=''
                                value=''
                                onChange = {(e) => handleChangeComment(e)}/>
                      </Form.Group>
                </Form>
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
                      </div>
                      <div>
                        <span style={{ "marginLeft": "36px", "Color": "#bebebe" }}><strong>Trả lời</strong></span>

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