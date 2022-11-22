import React, { useState } from 'react'
import { Link } from 'react-router-dom';
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
        <div className="login">
            {/* <h2 className="active" style={{padding:'100px'}}>Đăng ký</h2> */}
            <form onSubmit={(e) => handleSumbit(e)}>
            <input
                type="text"
                className="text"
                name="full_name" value={full_name}
                placeholder="Tên người dùng" onChange={(e) => handleChange(e)}
            />
            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.full_name[0]}</span>}
            {/* <span>tài khoản*</span> */}
            <br />
            <br />
            <input
                type="password"
                className="text"
                name="password" value={password}
                placeholder="Mật khẩu" onChange={(e) => handleChange(e)}
            />
            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.password[0]}</span>}
            {/* <span>mật khẩu*</span> */}
            <br />
            <br />
            <input type="text" className="text" name="email" value={email}
             placeholder="Email" onChange={(e) => handleChange(e)} />
             {alert.err_list.status === false && <span className="error">{alert.err_list.messages.email[0]}</span>}
            {/* <span>Email*</span> */}
            <br />
            <br />
            <input
                type="text"
                className="text"
                name="phone" value={phone}
                placeholder="Số điện thoại" onChange={(e) => handleChange(e)}
            />
            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.phone[0]}</span>}
            {/* <span>số điện thoại*</span> */}
            <br />
            <br />
            <input
                type="text"
                className="text"
                name="address" value={address}
                placeholder="Địa chỉ" onChange={(e) => handleChange(e)}
            />
            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.address[0]}</span>}
            <br />
            <input
                style={{ border: "1px solid #0D3380" }}
                type="checkbox"
                id="checkbox-1-1"
                className="custom-checkbox"
            />
            <label style={{ color: "black" }} htmlFor="checkbox-1-1">
                Ghi nhớ
            </label>
            {alert.err_list.status === false && <span className="noti">Đăng ký thành công</span>}
            <button className="signin"> Đăng ký</button>
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