import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { url } from '../url';
import { TabTitle } from '../title';

function Contact() {
  TabTitle('Liên hệ - Nhà Tui.com');
  const [contact, setContact] = useState({
    full_name: "",
    subject: "",
    email: "",
    phone: "",
    content: "",
    status: 0,
  });

  // xu ly loi
  const [alert, setAlert] = useState({
    err_list: {},
  });

  const { full_name, subject, email, phone, content, status } = contact;

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value});
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${url}/contact/create`, contact);
    if(res.data.status === true){
        setAlert({
            err_list: res.data
        });
    }
    else{           
        setAlert({
            err_list: res.data
        });
    }
  };

  return (
    <>
    <div className="back_re">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="title">
                        <h2>LIÊN HỆ</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <form id="request" className="main_form" onSubmit={(e) => handleSumbit(e)}>
                <div className="row">
                  <div className="col-12">
                    <input
                      className="contactus"
                      placeholder="Họ tên"
                      type="text"
                      name="full_name"
                      value={full_name}
                      onChange={(e) => handleChange(e)}/>
                      {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.full_name[0]}</div>}
                  </div>
                  <div className="col-12">
                    <input
                      className="contactus"
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => handleChange(e)}/>
                      {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.email[0]}</div>}
                  </div>
                  <div className="col-12">
                    <input
                      className="contactus"
                      placeholder="Số điện thoại"
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={(e) => handleChange(e)}/>
                      {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.phone[0]}</div>}
                  </div>
                  <div className="col-12">
                    <input
                      className="contactus"
                      placeholder="Tiêu đề"
                      type="text"
                      name="subject"
                      value={subject}
                      onChange={(e) => handleChange(e)}/>
                      {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.subject[0]}</div>}
                  </div>
                  <div className="col-12">
                    <textarea
                      className="textarea"
                      placeholder="Nội dung"
                      type="text"
                      name='content'
                      value={content}
                      onChange={(e) => handleChange(e)}/>
                      {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.content[0]}</div>}
                  </div>
                 
                  <div className="d-grid gap-2" style={{marginBottom: "20px"}}>
                    <Button type='submit'>Gửi</Button>
                    {alert.err_list.status === true && <div className="notice success_____">Liên hệ thành công</div>}
                  </div>              
                </div>
              </form>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="map_main">
                <div className="map-responsive">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8712318045555!2d105.75541005034208!3d10.027483392797139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a088476bafffdf%3A0x4da67960eb05332d!2zVHLGsOG7nW5nIENhbyDEkOG6s25nIFRo4buxYyBIw6BuaCBGUFQgUG9seXRlY2huaWMgQ-G6p24gVGjGoQ!5e0!3m2!1svi!2s!4v1668393315148!5m2!1svi!2s"
                    width={600}
                    height={550}
                    frameBorder={0}
                    style={{ border: 0, width: "100%" }}
                    allowFullScreen=""/>
                </div>
              </div>
            </div> 
          </div>
        </div>
    </div>
    </>
  )
}

export default Contact