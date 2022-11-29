import React from 'react'
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import StarRading from './starRading';
import axios from 'axios';

function Comment() {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = useParams();
     // thêm comment
 
  const [addComment, setAddComment] = useState({
    content: "",
    id_user: user ? user[0].id : "",
    id_post: id.id_post,
  });

  const [alert, setAlert] = useState({
      err_list: {},
  });
  const {content} = addComment;
  const handleChange = (e) => {
      setAddComment({ ...addComment, [e.target.name]: e.target.value});
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const a = addComment;
    // console.log(a);
    const res = await axios.post(`http://127.0.0.1:8000/api/comment/create/`, addComment);
    if(res.data.status === true){
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
  return (
    <div className="comment position-relative p-3 rounded-lg">
      <div className="align-items-center col-4">
         <StarRading />
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
                  value={content}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <button type="submit" className="btn btn-warning">
                Gửi nhận xét
              </button>
              {alert.err_list.status === false && <span className="error">{alert.err_list.messages}</span>} 
            </Form>
            : <Form>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="txtTitle">2.Email</Form.Label>
                  <Form.Control name="email" className="form-control form-control-sm" placeholder="Vui lòng đăng nhập đê bình luận" disabled />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="txtReview">3. Viết nhận xét của bạn vào bên dưới:</Form.Label>
                  <textarea name="content" className="form-control" rows={3} placeholder="Vui lòng đăng nhập đê bình luận" value={content} disabled onChange={(e) => handleChange(e)} />
                </Form.Group>
              </Form> }
          </div>
        </div>
  )
}

export default Comment