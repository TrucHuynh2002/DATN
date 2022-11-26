import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios';

function ForgotPassword() {

    const [email, setForgotEmail] = useState("");

    // xu ly loi
    const [alert, setAlert] = useState({
        err_list: {},
    });

    useEffect(() => {

    }, []);

    const handleSumbit = async (e) => {
        e.preventDefault();
        const item = { email };
        const res = await axios.post("http://127.0.0.1:8000/api/forgot-password", item);
        console.log(res);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
            });          
        }
        else{           
            setAlert({
                err_list: res.data
            });
            console.log(res.data);
        }
    }

  return (
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
                                <div className="col-md-12 ">
                                    <input type="email" id='email' name="email" className="text" placeholder="Nhập email của bạn để lấy lại mật khẩu" onChange={(e) => {setForgotEmail(e.target.value)}} />
                                    {alert.err_list === false && <span className="error">{alert.err_list.message.email[0]}</span>}
                                </div>
                                <div className="d-grid gap-2">
                                    <Button type='submit'>Gửi</Button>
                                </div>                              
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>

    
  )
}

export default ForgotPassword