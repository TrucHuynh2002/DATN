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
      const dataForm = new FormData();
        dataForm.append('reply',reply);
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
                  value={full_name} disabled="true" className=''/>
              </Form.Group>
             
              <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={(e) => handleChange(e)}
                  value={email} disabled="true" className=''/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" onChange={(e) => handleChange(e)}
                  value={phone} disabled="true" className=''/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control type="text" name="content" onChange={(e) => handleChange(e)}
                  value={content} disabled="true" className=''/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="subject">
                  <Form.Label>Tiêu đề</Form.Label>
                  <Form.Control type="text"  name="subject" onChange={(e) => handleChange(e)}
                  value={subject} disabled="true" className=''/>
              </Form.Group>
             
               <Form.Group className="mb-3" controlId="reply">
                  <Form.Label>Phản hồi</Form.Label>
                  <Form.Control type="text" name="reply" onChange={(e) => handleChange(e)}
                  value={reply}  className=''/>
                      {/* Thông báo  */}
                      { alert.err_list.status == false && alert.err_list.messages.reply &&
                                       <div className="notice warning_____">{alert.err_list.messages.reply[0]}</div>}  
               </Form.Group> 
            
              <div className="d-grid gap-2">
              {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
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
