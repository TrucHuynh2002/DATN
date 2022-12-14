import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { url } from '../url';
import { TabTitle } from '../title';
import HashLoader from "react-spinners/HashLoader";

function ResetPass() {
    TabTitle('Đổi mật khẩu');
    const [loading, setLoading] = useState(false);
    const [password, setPassWord] = useState("");
    const [password_confirm, SetPasswordConfirm] = useState("");
    const [error,setError] = useState("");
    const {token} = useParams();
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
        const item = { password:password, token:token, password_confirm:password_confirm};
            const res = await axios.post(`${url}/reset-password/${token}?_method=PUT`, item);
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
                                            {alert.err_list.status === false && alert.err_list.messages.password && <div className="notice warning_____">{alert.err_list.messages.password[0]}</div>}
                                        </div>
                                        <div className="col-md-12">
                                            <input type="password" id="password_confirm" name="password_confirm" className="text" placeholder="Xác nhận mật khẩu mới" onChange={(e) => {SetPasswordConfirm(e.target.value)}} />
                                            {alert.err_list.status === false && alert.err_list.messages.password_confirm && <div className="notice warning_____">{alert.err_list.messages.password_confirm[0]}</div>}
                                        </div>
                                        <div className="d-grid gap-2">
                                        {alert.err_list.status === 1 && <div className="notice warning_____">Đổi pass thất bại</div>}
                                        {alert.err_list.status === 2 && <div className="notice warning_____">Nhập lại mật khẩu không khớp</div>}
                                        {alert.err_list.status === true && <div className="notice success_____">Đổi mật khẩu thành công</div>}
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

export default ResetPass