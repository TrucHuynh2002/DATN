import React from 'react'
import { Button, Form } from 'react-bootstrap';
// import '../../css/taikhoan.css';

function ForgotPassword() {
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2 className="active">Quên Mật Khẩu</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <input type="text" id="email" className="text" placeholder="Nhập email của bạn để lấy lại mật khẩu" />
                                </div>
                                <div className="d-grid gap-2">
                                    <Button type='submit'>Gửi</Button>
                                    {/* {alert.err_list.status === false && <span className="error">{alert.err_list.messages}</span>} */}
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