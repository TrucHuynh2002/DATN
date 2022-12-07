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
            <span style={{color: "orange"}} ><i class="bi bi-star-fill"></i></span>
            <div>
              <img src='https://th.bing.com/th/id/R.91cb545176720cc851687a7263984600?rik=VoUCP9UwZMLyQA&riu=http%3a%2f%2ftaihinhanhdep.xyz%2fwp-content%2fuploads%2f2016%2f03%2ftranh-anh-dep-thien-nhien.jpg&ehk=Nf6eDEiydnUXwDE2PXteDfDhxmcUKmLrxSQv9VYEZqY%3d&risl=&pid=ImgRaw&r=0' alt="images" style={{width:'30px', height:'30px', borderRadius:'50%'}} />
              <b className='cmt_name'>{comment.full_name}</b>
              <p className='cmt_name1'>{comment.content}</p>   
            </div>
            <div>
                <span style={{"margin-left":"36px","Color":"#bebebe"}}><strong>Trả lời</strong></span>
              
            </div>
            <div>
              
            </div>
        </div>
        </> 
  
    })
    
}
 </>
)
}

export default ContentComent