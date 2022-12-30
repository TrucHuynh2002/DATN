import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { url } from '../../url'
function CommentQA({props}) {
    const [countComment,setCountComment] = useState([]);
    const [HiddenComment,SetHiddenComment] = useState(true);
    // const [getLoader,setGetLoader] = useState
    const getCountComment = async () => {
        let res = await axios.get(`${url}/comment-qa-count`);
        // console.log(res.data);
        if(res.data.status){
            setCountComment(res.data.data);
             if(res.data.data.length > 0) {
            res.data.data.map((data,index) => {
                data.id_qa == props.id_qa && SetHiddenComment(false)
            })
        }
        }
    }
    useEffect(() => {
        getCountComment();
       
        return () => {
            getCountComment();
            
        }
    },[props.loader])
  return (
  
    <div  className='Reaction'>
          {
            HiddenComment 
            ?
            <>
                    <span><i className="fa-regular fa-comment"></i></span>
                    <span>0</span>
            </>
            :
            countComment.length > 0 && countComment.map((data,index) => {
                return data.id_qa == props.id_qa 
                && 
                <>
                    <span><i className="fa-regular fa-comment"></i></span>
                    <span>{data.CountCommentQA}</span>
                </>

        })
    }
           
     </div>
  )
}

export default CommentQA