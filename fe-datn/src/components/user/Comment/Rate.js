import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Comment({data}) {
 
  const user = JSON.parse(localStorage.getItem("user"));
  const id = useParams();
       // thêm comment
  const [addComment, setAddComment] = useState({
        rate: undefined,
        content: "",
        id_user: user ? user[0].id : "",
        id_post: id.id_post,
      });
  const {rate,cotent,id_user,id_post} = addComment;

  const [hoverStar, setHoverStar] = useState(undefined);
         // thêm chuông
  const [addNotify, setNotify] = useState({
    id_user_tow: "",
    id_user: user ? user[0].id : "",
    id_post: id.id_post,
  });
  const handleChange = (e) => {
    setAddComment({ ...addComment, [e.target.name]: e.target.value});
    };
    const [checkUser,setCheckUser] = useState(false);
  const handleSumbit = async (e) => {
    e.preventDefault();
    const check = await axios.get(`http://127.0.0.1:8000/api/check-old-user/${id_user}`);
    console.log(check.data)
      if(check.data.data != null){
        const res = await axios.post(`http://127.0.0.1:8000/api/rating/create`, addComment);
        if(res.data.status){
          const {id_user_tow} = addNotify;
          setNotify({...addNotify , id_user_tow : res.data.data});
          const resss = await axios.post(`http://127.0.0.1:8000/api/notifyComment/create`, addNotify);
          setAlert({
            err_list: res.data
            });
        }else{           
          setAlert({
            err_list: res.data
          });
        }
      }else{
        setCheckUser(true);
      }
       

        }
       
    
  
    
  const [alert, setAlert] = useState({
      err_list: {},
  });
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
                                  <i className="bi bi-star-fill "></i>
                                </span>
                              )
                              :
                               (
                                <span 
                                key={index}
                                onMouseOver={() => setHoverStar(index+1)}
                                onMouseLeave = {() => setHoverStar(undefined)}
                                onClick={() => setAddComment({...addComment, rate:index+1})}
                                      ><i className="bi bi-star"></i>
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
              {alert.err_list.status === false && <div className="noticecmt warning_____">{alert.err_list.messages.content[0]}</div>} 
              {alert.err_list.status === true && <div className="noticecmt success_____">Bình luận thành công</div>} 
              <button type="submit" className="btn btn-warning">
                Gửi nhận xét
              </button>
                <div>
                  {checkUser && <span className='text-warning' >Bạn chưa từng ở phòng nào nên chưa thể đánh giá</span>}
                </div>
              <Form.Group>
              
              </Form.Group>
            </Form>

            : <Form>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="txtTitle">2.Email</Form.Label>
                  <Form.Control name="email" className="form-control form-control-sm" placeholder="Vui lòng đăng nhập đê bình luận" disabled="true" />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="txtReview">3. Viết nhận xét của bạn vào bên dưới:</Form.Label>
                  <textarea 
                    name="content" 
                    className="form-control" 
                    rows={3} placeholder="Vui lòng đăng nhập đê bình luận" 
                    value={addComment.content} 
                    disabled="true" 
                    onChange={(e) => handleChange(e)} 
                  />
                </Form.Group>
              </Form> }
        </div>
    </div>
  )
}
export default Comment