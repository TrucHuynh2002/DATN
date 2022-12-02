import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ContentComent() {
  const id = useParams();
  console.log(id);
  const [listComment, setListComment] = useState([]);
  const [rates,setRate] = useState([]);
  // console.log(rate);
  useEffect(() => {
      getData();
  },[]);

  // danh sach Comment
  const getData = async () => {
   
    const res = await axios.get(`http://127.0.0.1:8000/api/comment/post/show/${id.id_post}`);
    console.log(res)
    setListComment(res.data.data);
    // const resRate = await axios.get(`http://127.0.0.1:8000/api/rating/show`);
    // setRate(resRate.data.data)
    
  };
  
return (
 <div>
  {listComment.map((comment, index) => {
    
      return     <>
          <div key={index}>
               {/* { rate.id_comment === comment.id_comment &&  */}
               <span 
                  
                  style={{color: "orange"}}
                >
                <i class="bi bi-star-fill"></i>
              </span>
              }
              <div >
                <img src='https://th.bing.com/th/id/R.91cb545176720cc851687a7263984600?rik=VoUCP9UwZMLyQA&riu=http%3a%2f%2ftaihinhanhdep.xyz%2fwp-content%2fuploads%2f2016%2f03%2ftranh-anh-dep-thien-nhien.jpg&ehk=Nf6eDEiydnUXwDE2PXteDfDhxmcUKmLrxSQv9VYEZqY%3d&risl=&pid=ImgRaw&r=0' alt="images" style={{width:'30px', height:'30px', borderRadius:'50%'}} />
                <b className='cmt_name'>{comment.full_name}</b>
                <p className='cmt_name1'>{comment.content}</p>   
              </div>
          </div>
        </>
      
    })}
 </div>
  )
}

export default ContentComent