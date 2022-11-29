import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios';

function ResetPass() {

    const [password, setPassWord] = useState("");

    // xu ly loi
    const [alert, setAlert] = useState({
        err_list: {},
    });

    useEffect(() => {

    },[]);

    const handleSumbit = async (e) => {
        e.preventDefault();
        const item = { password };
        console.log(item);
        const res = await axios.post("http://127.0.0.1:8000/api/reset-password", item);
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
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.password[0]}</span>}
                            </div>
                            <div className="d-grid gap-2">
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