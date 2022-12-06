import React from 'react'
import { useState } from 'react';
import { useEffect} from 'react';

import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// import StarRading from './starRading';
import axios from 'axios';


function Comment() {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = useParams();
  // const [number , setNumber] = useState(undefined);
  // console.log(id);
  // list comment 
  const [listCmt, setListCmt] = useState([]);
       // thêm comment
       const [addComment, setAddComment] = useState({
        rate: undefined,
        content: "",
        id_user: user ? user[0].id : "",
        id_post: id.id_post,
      });
     const {
        rate,
        cotent,
        id_user,
        id_post
      } = addComment;
      const [hoverStar, setHoverStar] = useState(undefined);
         // thêm chuông
   const [addNotify, setNotify] = useState({
    id_user_tow: '',
    id_user: user ? user[0].id : "",
    id_post: id.id_post,
  });
      const handleChange = (e) => {
        setAddComment({ ...addComment, [e.target.name]: e.target.value});
    };
          const handleSumbit = async (e) => {
            e.preventDefault();
            const a = addComment;
            // console.log(a);
            const res = await axios.post(`http://127.0.0.1:8000/api/comment/create/`, addComment);
            if(res.data.status === true){
              // addNotify.id_user_tow = 
              const ress = await axios.post(`http://127.0.0.1:8000/api/notifyComment/create`, addNotify);
                setAlert({
                    err_list: res.data
                });
                console.log(alert.err_list)
            }else{           
                setAlert({
                    err_list: res.data
                });
            }
        
          };

  useEffect(() => {
    getData();
  },[]);
  const getData = async () => {
    const resss = await axios.get('http://127.0.0.1:8000/api/comment/showUserDes');
    console.log(resss)
       setListCmt(resss.data.data);
   };
  


  const [alert, setAlert] = useState({
      err_list: {},
  });
  {listCmt.map((a, index) => {
    const {id_user_tow} = a.id_user  = addNotify
   })}

  return (
    <div className="comment position-relative p-3 rounded-lg">
        <div className="align-items-center col-4">
              <div>
                <p className="m-0 mr-2">1. Đánh giá của bạn về sản phẩm này:</p>
                <div className="rate">
                  {
                    Array(5).fill()
                            .map((_,index) => 
                              
                              rate >= index + 1 || hoverStar >= index + 1
                              ?
                               (
                                <span 
                                  key={index}
                                  onMouseOver={() => setHoverStar(index+1)}
                                  onMouseLeave = {() => setHoverStar(undefined)}
                                  onClick={() => setAddComment({...addComment, rate:index+1})}
                                  style={{color: "orange"}}
                                >
                                  <i class="bi bi-star-fill"></i>
                                </span>
                              )
                              :
                               (
                                <span 
                                key={index}
                                onMouseOver={() => setHoverStar(index+1)}
                                onMouseLeave = {() => setHoverStar(undefined)}
                                onClick={() => setAddComment({...addComment, rate:index+1})}
                                      ><i class="bi bi-star"></i>
                                </span>
                              )

                            )
                  }
                </div>
              </div>
        </div>
        <div className="col-8">
         {user ? 
          <Form className="" onSubmit={(e) => handleSumbit(e)}>
            <Form.Group className="form-group">
                <Form.Label htmlFor="txtTitle">2.Email</Form.Label>
                <Form.Control
                name="email"
                value={user[0].email}
                className="form-control form-control-sm"
                placeholder="Vui lòng đăng nhập đê bình luận"
                disabled="true"
                />
              </Form.Group>
             
              <Form.Group className="form-group">
                <Form.Label htmlFor="txtReview">3. Viết nhận xét của bạn vào bên dưới:</Form.Label>
                <textarea 
                name="content"
                  className="form-control"
                  rows={3}
                  placeholder="Nhận xét của bạn về sản phẩm này"
                  value={addComment.content}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.content[0]}</div>} 
              <button type="submit" className="btn btn-warning">
                Gửi nhận xét
              </button>
          
              {alert.err_list.status === true && <div className="notice success_____">Bình luận thành công</div>} 
            </Form>
            : <Form>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="txtTitle">2.Email</Form.Label>
                  <Form.Control name="email" className="form-control form-control-sm" placeholder="Vui lòng đăng nhập đê bình luận" disabled />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="txtReview">3. Viết nhận xét của bạn vào bên dưới:</Form.Label>
                  <textarea name="content" className="form-control" rows={3} placeholder="Vui lòng đăng nhập đê bình luận" value={addComment.content} disabled onChange={(e) => handleChange(e)} />
                </Form.Group>
              </Form> }
        </div>
    </div>
  )
}

export default Comment