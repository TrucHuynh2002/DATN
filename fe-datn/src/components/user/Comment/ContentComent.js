import React from 'react'
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
function ContentComent() {
  const [listComment, setListComment] = useState([]);
  // console.log(id_Comment);
  useEffect(() => {
      getData();
  },[]);

  // danh sach Comment
  const getData = async () => {
  const res = await axios.get(`http://127.0.0.1:8000/api/comment/show`);
  // console.log(res);
  setListComment(res.data.data);
  };
return (
 <div>
  {listComment.map((comment, index) => {
    return (
    <div>
      <img src='https://th.bing.com/th/id/R.91cb545176720cc851687a7263984600?rik=VoUCP9UwZMLyQA&riu=http%3a%2f%2ftaihinhanhdep.xyz%2fwp-content%2fuploads%2f2016%2f03%2ftranh-anh-dep-thien-nhien.jpg&ehk=Nf6eDEiydnUXwDE2PXteDfDhxmcUKmLrxSQv9VYEZqY%3d&risl=&pid=ImgRaw&r=0' alt="img_cmnt" style={{width:'30px', height:'30px', borderRadius:'50%'}} />
      <b className='cmt_name'>{comment.full_name}</b>
      <p className='cmt_name1'>{comment.content}</p>   
    </div>
  );
})}    
 </div>
)
}

export default ContentComent