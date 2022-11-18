import React from 'react'
// import '../../css/taikhoan.css';

function ForgotPassword() {
  return (
    <>
        <form>
            <div className="popup">
            <div className="form">
                <h2>Quên mật khẩu</h2>
                <div className="form-element">
                <label htmlFor="email">Email*</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Nhập email của bạn để lấy lại mật khẩu"
                />
                </div>
                <div className="form-element">
                <input
                    style={{
                    backgroundColor: "black",
                    color: "white",
                    width: 300,
                    marginLeft: 10,
                    borderRadius: 10,
                    height: 40
                    }}
                    type="button"
                    defaultValue="Đồng Ý"
                    onclick="Redirect();"
                />
                </div>
            </div>
            </div>
        </form>
    </>
  )
}

export default ForgotPassword