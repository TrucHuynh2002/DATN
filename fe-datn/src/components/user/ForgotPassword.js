import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {url} from '../url';
import { TabTitle } from '../title';
import HashLoader from "react-spinners/HashLoader";

function ForgotPassword() {
    TabTitle('Quên mật khẩu');
    const [loading, setLoading] = useState(false);
    const [email, setForgotEmail] = useState("");
    // xu ly loi
    const [alert, setAlert] = useState({
        err_list: {},
    });
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 3000)
      },[]);
    const handleSumbit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email',email);
        const item = {email};
        const res = await axios.post(`${url}/forgot-password`, formData);        
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
    }

  return (
    <>
    {loading ? 
        <HashLoader className='css_loading'
        color={'#0d3380'}
        loading={loading}
        size={100}
        style={{display: 'inherit', position: 'relative', height: '100px', transform: 'rotate(165deg)'}}
        />
        :
        <>
            <div className="back_re">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title">
                                <h2 className="active">Quên mật khẩu</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={(e) => handleSumbit(e)}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="email" id="email" name="email" className="text" placeholder="Nhập email của bạn để lấy lại mật khẩu" onChange={(e) => {setForgotEmail(e.target.value)}} />
                                        { alert.err_list.status == false && alert.err_list.messages.email &&
                                        <div className="notice warning_____">{alert.err_list.messages.email[0]}</div>}
                                        {alert.err_list.status === 1 && <div className="notice warning_____">Email không tồn tại</div>}
                                    </div>
                                    <div className="d-grid gap-2">
                                    {alert.err_list.status === true && <div className="notice success_____">Vui lòng kiểm tra mail để lấy lại mật khẩu</div>}
                                        <Button type="submit">Gửi</Button>
                                    </div>                              
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
    </>    
  )
}

export default ForgotPassword