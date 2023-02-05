import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { url } from '../../url';
import { TabTitle } from '../../title';
import HashLoader from "react-spinners/HashLoader";

function FooterConfig() {
  TabTitle('Footer');
  const [loading, setLoading] = useState(false);
  const [editConfig, setEditConfig] = useState({
    sdt: "",
    title: "",
    email: "",
    address: "",
    introduce: "",
  });
  const [alert, setAlert] = useState({
    err_list: {},
  });
  const { sdt, title, email, address, introduce } = editConfig;
  const handleChange = (e) => {
    setEditConfig({ ...editConfig, [e.target.name]: e.target.value });
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData();
        dataForm.append('title',title);
        dataForm.append('address',address);
        dataForm.append('email',email);
        dataForm.append('sdt',sdt);
        dataForm.append('introduce',introduce);
    const res = await axios.put(`${url}/config/update`, editConfig);
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
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    loadConfig();
  },[]);
  const loadConfig = async () => {
      const result = await axios.get(`${url}/config`);
      setEditConfig(result.data.data);
  };

  return (
    <>
      {loading ? 
        <HashLoader className='' style={{marginTop:"500px"}}
        color={'#0d3380'}
        loading={loading}
        size={100}
        />
        :
        <>
          <Form onSubmit={(e) => handleSumbit(e)}>
          <Form.Group className="mb-3" controlId="title">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control type="text" name="title" onChange={(e) => handleChange(e)} value={title} className=''/>
                { alert.err_list.status == false && alert.err_list.messages.title &&
                                          <div className="notice warning_____">{alert.err_list.messages.title[0]}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control type="text" name="address" onChange={(e) => handleChange(e)} value={address} className=''/>
                { alert.err_list.status == false && alert.err_list.messages.address &&
                                          <div className="notice warning_____">{alert.err_list.messages.address[0]}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" onChange={(e) => handleChange(e)} value={email} className=''/>
                { alert.err_list.status == false && alert.err_list.messages.email &&
                                          <div className="notice warning_____">{alert.err_list.messages.email[0]}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="sdt">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type="text" name="sdt" onChange={(e) => handleChange(e)} value={sdt} className=''/>
                { alert.err_list.status == false && alert.err_list.messages.sdt &&
                                          <div className="notice warning_____">{alert.err_list.messages.sdt[0]}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="introduce">
                <Form.Label>Giới thiệu</Form.Label>
                <CKEditor
                                    editor={ClassicEditor}
                                    data={introduce}
                                    onReady={(editor)=>{
                                        editor.editing.view.change((writer)=>{
                                            writer.setStyle('height','100%',editor.editing.view.document.getRoot())
                                        })
                                    }}
                                    onChange={(event,editor)=> {
                                        const data=editor.getData()
                                        setEditConfig({ ...editConfig, introduce : data});
                                    }}
                                    >
                            </CKEditor>
                { alert.err_list.status == false && alert.err_list.messages.introduce &&
                                          <div className="notice warning_____">{alert.err_list.messages.introduce[0]}</div>}
            </Form.Group>
              {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>} 
            <Button variant="primary" name="" type="submit">Cập nhật</Button>
          </Form>
        </>
      }
    </>
  )
}

export default FooterConfig