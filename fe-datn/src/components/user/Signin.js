import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
function Signin() {

    const [addUser, setAddUser] = useState({
        full_name: "",
        password: "",
        email: "",
        phone: "",
        address: "",
        role: 0,
    });

    const {full_name, password, email, phone, address} = addUser;

    const handleChange = (e) => {
        setAddUser({ ...addUser, [e.target.name]: e.target.value});
    };

    // xu ly loi
    const [alert, setAlert] = useState({
        err_list: {},
    });

    const handleSumbit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData();
        dataForm.append('full_name',full_name);
        dataForm.append('password',password);
        dataForm.append('email',email);
        dataForm.append('phone',phone);
        dataForm.append('address',address);
        const res = await axios.post("http://127.0.0.1:8000/api/user/create", addUser);
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
    }
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2>ĐĂNG KÝ</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="signin">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form id="request" className="main_form" onSubmit={(e) => handleSumbit(e)}>
                            <div className="row">
                                <div className="col-md-12">
                                    <input type="text" className="text" name="full_name" value={full_name} placeholder="Tên người dùng" onChange={(e) => handleChange(e)} />
                                </div>
                                { alert.err_list.status == false && alert.err_list.messages.full_name &&
                                <div className="notice warning_____">{alert.err_list.messages.full_name[0]}</div>}     
                                <div className="col-md-12">
                                    <input type="password" className="text" name="password" value={password} placeholder="Mật khẩu" onChange={(e) => handleChange(e)} />
                                </div>
                                { alert.err_list.status == false && alert.err_list.messages.password &&
                                <div className="notice warning_____">{alert.err_list.messages.password[0]}</div>}     
                                <div className="col-md-12 ">
                                    <input type="text" className="text" name="email" value={email}
                                    placeholder="Email" onChange={(e) => handleChange(e)} />
                                </div>
                                { alert.err_list.status == false && alert.err_list.messages.email &&
                                <div className="notice warning_____">{alert.err_list.messages.email[0]}</div>}   
                                <div className="col-md-12">
                                    <input 
                                        type="text"
                                        className="text"
                                        name="phone" value={phone}
                                        placeholder="Số điện thoại" onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                { alert.err_list.status == false && alert.err_list.messages.phone &&
                                <div className="notice warning_____">{alert.err_list.messages.phone[0]}</div>} 
                                <div className="col-md-12">
                                    <input type="text" className="text" name="address" value={address} placeholder="Địa chỉ" onChange={(e) => handleChange(e)} />
                                </div>
                                { alert.err_list.status == false && alert.err_list.messages.address &&
                                <div className="notice warning_____">{alert.err_list.messages.address[0]}</div>} 
                                <div className="d-grid gap-2">
                                {alert.err_list.status == true && <div className="notice success_____">Đăng ký thành công</div>}
                                    <Button type="submit"> Đăng ký</Button>
                                </div>
                                <div className="d-grid gap-2">
                                   <button className="button">
                                        <Link to="../forgotpw">Quên mật khẩu?</Link>
                                   </button>
                                   <button className="button">
                                        <Link  to="../login">Bạn đã có tài khoản ? Đăng nhập ngay</Link>
                                   </button>
                                </div>    
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <img src="https://bandon.vn/resize/1000x700/a-c/zc-1/f/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg" alt='images'/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signin