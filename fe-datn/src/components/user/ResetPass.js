import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPass() {

    const [password, setPassWord] = useState("");
    const [resetPassword, setResetPassword] = useState("");
    const [error,setError] = useState("");
    const {token} = useParams();

    // xu ly loi
    const [alert, setAlert] = useState({
        err_list: {},
    });

    useEffect(() => {

    },[]);

    const handleSumbit = async (e) => {
        e.preventDefault();
        console.log(password)
        console.log(resetPassword)
        const item = { password:password, token:token };
        if(password == resetPassword){
            const res = await axios.post(`http://127.0.0.1:8000/api/reset-password/${token}?_method=PUT`, item);
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
            }
        }else{
            setError('Nhập lại mật khẩu không khớp')
        }
        
    }


  return (
    <>
    <div className="back_re">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="title">
                        <h2 className="active">Đổi mật khẩu</h2>
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
                                <input type="password" id="password" name="password" className="text" placeholder="Nhập mật khẩu mới" onChange={(e) => {setPassWord(e.target.value)}} />
                                {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.password[0]}</div>}
                            </div>
                            <div className="col-md-12">
                                <input type="password" id="resetPassword" name="resetPassword" className="text" placeholder="Xác nhận mật khẩu mới" onChange={(e) => {setResetPassword(e.target.value)}} />
                            </div>
                            <div className="d-grid gap-2">
                            {alert.err_list.status === true && <div className="notice success_____">Cập Nhật Thành Công</div>}
                                <Button type="submit">Gửi</Button>
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

export default ResetPass