import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function Signin() {

    // const navigate = useNavigate();
    const [addUser, setAddUser] = useState({
        full_name: "",
        password: "",
        email: "",
        phone: "",
        address: "",
        role: 0,
    });

    const { full_name, password, email, phone, address, role } = addUser;

    const handleChange = (e) => {
        setAddUser({ ...addUser, [e.target.name]: e.target.value});
    };

    // xu ly loi
    const [alert, setAlert] = useState({
        err_list: {},
    });

    const handleSumbit = async (e) => {
        // console.log(email);
        e.preventDefault();
        // console.log(addUser);
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
            // console.log(alert.err_list.messages.name[0])
        }
        // navigate("../");
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
                        {/* <h2 className="active" style={{padding:'100px'}}>Đăng ký</h2> */}
                        <form id="request" className="main_form" onSubmit={(e) => handleSumbit(e)}>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <input  type="text" className="text" name="full_name" value={full_name} placeholder="Tên người dùng" onChange={(e) => handleChange(e)} />
                                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.full_name[0]}</span>}
                                    {/* <span>tài khoản*</span> */}
                                </div>
                                <div className="col-md-12 ">
                                    <input  type="password" className="text" name="password" value={password} placeholder="Mật khẩu" onChange={(e) => handleChange(e)} />
                                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.password[0]}</span>}
                                        {/* <span>mật khẩu*</span> */}
                                </div>
                                <div className="col-md-12 ">
                                    <input  type="text" className="text" name="email" value={email}
                                    placeholder="Email" onChange={(e) => handleChange(e)} />
                                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.email[0]}</span>}
                                    {/* <span>Email*</span> */}
                                </div>
                                <div className="col-md-12 ">
                                    <input 
                                        type="text"
                                        className="text"
                                        name="phone" value={phone}
                                        placeholder="Số điện thoại" onChange={(e) => handleChange(e)}
                                    />
                                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.phone[0]}</span>}
                                    {/* <span>số điện thoại*</span> */}
                                </div>
                                <div className="col-md-12 " >
                                    <input  type="text" className="text" name="address" value={address} placeholder="Địa chỉ" onChange={(e) => handleChange(e)} />

                                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.address[0]}</span>}
                                </div>
                               
                                <div className="d-grid gap-2">
                                    <Button type='submit'> Đăng ký</Button>
                                    {alert.err_list.status === false && <span className="noti">Đăng ký thành công</span>}
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
                        <img src="https://bandon.vn/resize/1000x700/a-c/zc-1/f/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg"/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signin