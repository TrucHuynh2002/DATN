import React from 'react'
import { Link } from 'react-router-dom';
// import '../../css/dang-nhap-tinh.css';

function Login() {
  return (
    <>
        <div className="login">
            <h2 className="active">Đăng nhập </h2>
            <form>
            <input
                type="text"
                className="text"
                name="username"
                placeholder="tài khoản"
            />
            <span>tài khoản*</span>
            <br />
            <br />
            <input
                type="password"
                className="text"
                name="password"
                placeholder="mật khẩu"
            />
            <span>mật khẩu*</span>
            <br />
            <input
                style={{ border: "1px solid #0D3380" }}
                type="checkbox"
                id="checkbox-1-1"
                className="custom-checkbox"
            />
            <label style={{ color: "black" }} htmlFor="checkbox-1-1">
                Lưu tài khoản
            </label>
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