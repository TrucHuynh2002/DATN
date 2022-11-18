import React from 'react'
import { Link } from 'react-router-dom';
// import '../../css/dang-nhap-tinh.css';

function Signin() {
  return (
    <>
        <div className="login">
            <h2 className="active">Đăng ký</h2>
            <form style={{ marginTop: "-55px" }}>
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
            <br />
            <input
                type="password"
                className="text"
                name="password"
                placeholder="xác nhận mật khẩu"
            />
            <span>xác nhận mật khẩu*</span>
            <br />
            <br />
            <input type="text" className="text" name="email" placeholder="email" />
            <span>Email*</span>
            <br />
            <br />{" "}
            <input
                type="text"
                className="text"
                name="sodienthoai"
                placeholder="số điện thoại"
            />
            <span>số điện thoại*</span>
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
            <button className="signin"> Đăng nhập</button>
            <Link to="../forgotpw">Quên mật khẩu?</Link>
            <Link style={{ marginRight: 180 }} to="../login">
                Bạn đã có tài khoản ? Đăng nhập ngay
            </Link>
            </form>
        </div>
    </>
  )
}

export default Signin