import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // xu ly loi
    const [alert, setAlert] = useState({
        err_list: {},
    });

    useEffect(() => {
        // if (localStorage.getItem('user-login')){

        // }
    }, []);

    const handleSumbit = async (e) => {
        e.preventDefault();
        const item = {email,password };
        console.log(item);
        const res = await axios.post("http://127.0.0.1:8000/api/user/login", item);
        console.log(res);
        if(res.data.status === true){
            console.log(localStorage)
            // if (!localStorage.getItem('user')){
            //     localStorage.setItem('user',res.data.data)
            // }
           
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
        <div className="login">
            <h2 className="active">Đăng nhập</h2>
            <form onSubmit={(e) => handleSumbit(e)}>
            <input
                type="email"
                className="text"
                name="email"               
                placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
            <br />
            <br />
            <input
                type="password"
                className="text"
                name="password"
                placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)}/>
            <br />
            <input
                style={{ border: "1px solid #0D3380" }}
                type="checkbox"
                id="checkbox-1-1"
                className="custom-checkbox"/>
            <label style={{ color: "black" }} htmlFor="checkbox-1-1">
                Ghi nhớ
            </label>
            {alert.err_list.status === false && <span className="error">{alert.err_list.messages}</span>}
            <button className="signin">Đăng nhập</button>
            <Link to="../forgotpw">Quên mật khẩu?</Link>
            <Link style={{ marginRight: 365 }} to="../signin">
                Đăng ký
            </Link>
            </form>
        </div> 
    </>
  )
}

export default Login