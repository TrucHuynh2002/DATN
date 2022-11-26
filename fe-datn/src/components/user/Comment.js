import React from 'react'
import { useEffect, useState } from 'react';
import { Table, Button,Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
function Comment() {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = useParams();

     // thêm comment
  const [addComment, setAddComment] = useState({
    content:"",
    id_user:"",
    id_post: ""
  });
  const [alert, setAlert] = useState({
      err_list: {},
  });
  const { content, id_user, id_post  } = addComment;
  const handleChange = (e) => {
      setAddComment({ ...addComment, [e.target.name]: e.target.value});
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://127.0.0.1:8000/api/comment/create", addComment);
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
    <Form className="comment position-relative p-3 rounded-lg"  onSubmit={(e) => handleSumbit(e)} >
          <div className="align-items-center col-4">
            {/* <p className="m-0 mr-2">1. Đánh giá của bạn về sản phẩm này:</p>
            <div className="rate">
              <Form.Control type="radio" id="star1" name="rate" defaultValue={1} />
              <label htmlFor="star1" title="text" />
              <Form.Control type="radio" id="star2" name="rate" defaultValue={2} />
              <label htmlFor="star2" title="text" />
              <Form.Control type="radio" id="star3" name="rate" defaultValue={3} />
              <label htmlFor="star3" title="text" />
              <Form.Control type="radio" id="star4" name="rate" defaultValue={4} />
              <label htmlFor="star4" title="text" />
              <Form.Control type="radio" id="star5" name="rate" defaultValue={5} />
              <label htmlFor="star5" title="text" />
            </div> */}
          </div>
         <div className="col-4" >
            <Form.Group className="form-group">
              <Form.Label htmlFor="txtTitle">2.Email</Form.Label>
              <Form.Control
              name="email"
              value={user[0].email}
                className="form-control form-control-sm"
                placeholder="Vui lòng đăng nhập đê bình luận"
                disabled
              />
                 <Form.Control
                hidden
              name="id_user"
              value={user[0].id}
              onChange={(e) => handleChange(e)}
              />
                 <Form.Control
                 
                hidden
              name="id_post"
              value={id.id_post}
              onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label htmlFor="txtReview">3. Viết nhận xét của bạn vào bên dưới:</Form.Label>
              <textarea 
              name="content"
                className="form-control"
                id="txtReview"
                rows={3}
                placeholder="Nhận xét của bạn về sản phẩm này"
                value={content}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </div>
          <button type="submit" className="btn btn-warning position-absolute">
            Gửi nhận xét
          </button>
          {alert.err_list.status === false && <span className="error">{alert.err_list.messages}</span>}                   
        </Form>
  )
}

export default Comment