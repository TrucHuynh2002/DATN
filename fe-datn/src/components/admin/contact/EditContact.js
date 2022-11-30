import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function EditContact() {

  const {id_contact} = useParams();
  const [editContact, setEditContact] = useState({
      full_name: "",
      subject: "",
      email: "",
      phone: "",
      content: "",
      status:"",
      reply: ""
  });

  const [alert, setAlert] = useState({
      err_list: {},
  });

  const { full_name,subject,email,phone,content,status,reply } = editContact;

  const handleChange = (e) => {
      setEditContact({ ...editContact, [e.target.name]: e.target.value })
      // setEditContact(e.target.value);
  };

  const handleSumbit = async (e) => {
      e.preventDefault();
      const res = await axios.put(`http://127.0.0.1:8000/api/contact/update/${id_contact}`, editContact);
      if(res.data.status === true){
          setAlert({
              err_list: res.data
          });
          console.log(alert.err_list)
      }
      else{           
          setAlert({
              err_list: res.data
          });
      }
      // navigate("../list_Contact");
  };

  useEffect(() => {
      loadCate();
  }, []);

  const loadCate = async () => {
      const result = await axios.get(`http://127.0.0.1:8000/api/contact/show/${id_contact}`);
      setEditContact(result.data.data);
  };

return (
  <div className="content">
      <div className="add-post">
          <h1 className="content_h1_admin">Phản hồi nội dung</h1>
          <Form onSubmit={(e) => handleSumbit(e)}>
              <Form.Group className="mb-3" controlId="full_name">
                  <Form.Label>Tên khách hàng</Form.Label>
                  <Form.Control type="text" name="full_name" onChange={(e) => handleChange(e)}
                  value={full_name} disable className=''/>

                      {/* Thông báo  */}
                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.full_name[0]}</span>}
                   
              </Form.Group>
             
              <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={(e) => handleChange(e)}
                  value={email} disable className=''/>

                      {/* Thông báo  */}
                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.email[0]}</span>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" onChange={(e) => handleChange(e)}
                  value={phone} disable className=''/>

                      {/* Thông báo  */}
                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.phone[0]}</span>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control type="text" name="content" onChange={(e) => handleChange(e)}
                  value={content} disable className=''/>

                      {/* Thông báo  */}
                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.content[0]}</span>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="subject">
                  <Form.Label>Tiêu đề</Form.Label>
                  <Form.Control type="text"  name="subject" onChange={(e) => handleChange(e)}
                  value={subject} disable className=''/>

                      {/* Thông báo  */}
                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.subject[0]}</span>}
                   
              </Form.Group>
             
               <Form.Group className="mb-3" controlId="reply">
                  <Form.Label>Phản hồi</Form.Label>
                  <Form.Control type="text" name="reply" onChange={(e) => handleChange(e)}
                  value={reply}  className=''/>

                      {/* Thông báo  */}
                     {alert.err_list.status === false && <span className="error">{alert.err_list.messages.name_Contact[0]}</span>}  
               </Form.Group> 
            
              <div className="d-grid gap-2">
              {alert.err_list.status === true && <span className="noti">Cập nhật thành công</span>}
                  <Button variant="primary" size="sm" name='' type="submit">
                      Gửi
                  </Button>
              </div>
          </Form>
      </div>
  </div>
)

}

export default EditContact
