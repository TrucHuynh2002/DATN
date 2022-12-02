import React from 'react'
import { useState } from 'react';
import { useEffect} from 'react';

import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import StarRading from './starRading';
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
      const handleChange = (e) => {
        setAddComment({ ...addComment, [e.target.name]: e.target.value});
    };
          const handleSumbit = async (e) => {
            e.preventDefault();
            const a = addComment;
            // console.log(a);
            const res = await axios.post(`http://127.0.0.1:8000/api/comment/create/`, addComment);
            if(res.data.status === true){
              // const ress = await axios.post(`http://127.0.0.1:8000/api/notifyComment/create`, addNotify);
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
       setListCmt(resss.data.data);
   };
   // thêm chuông
   const [addNotify, setNotify] = useState({
    id_user_tow: "",
    id_user: user ? user[0].id : "",
    id_post: id.id_post,
  });


  const [alert, setAlert] = useState({
      err_list: {},
  });
  // {listCmt.map((a, index) => {
  //   const {id_user_tow} = a.id_user  = addNotify
  //  })}


// STAR

// const handleChangeStar = (star) => {
//   console.log(star)
// }


 
  return (
    <div className="comment position-relative p-3 rounded-lg">
        <div className="align-items-center col-4">
              <div>
                <p className="m-0 mr-2">1. Đánh giá của bạn về sản phẩm này:</p>
                <div className="rate">
                  {/* <Form.Control type="radio" id="star1" name="rate" defaultValue={1} />
                  <label htmlFor="star1" title="text" />
                  <Form.Control type="radio" id="star2" name="rate" defaultValue={2} />
                  <label htmlFor="star2" title="text" />
                  <Form.Control type="radio" id="star3" name="rate" defaultValue={3} />
                  <label htmlFor="star3" title="text" />
                  <Form.Control type="radio" id="star4" name="rate" defaultValue={4} />
                  <label htmlFor="star4" title="text" />
                  <Form.Control type="radio" id="star5" name="rate" defaultValue={5} />
                  <label htmlFor="star5" title="text" /> */}
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
        <div className="col-4">
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
              <button type="submit" className="btn btn-warning">
                Gửi nhận xét
              </button>
              {alert.err_list.status === false && <span className="error">{alert.err_list.messages}</span>} 
              {alert.err_list.status === true && <span className="error">Bình luận thành công</span>} 
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