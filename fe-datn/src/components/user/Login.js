import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    console.log(email);
    const [password, setPassword] = useState("");

    // xu ly loi
    const [alert, setAlert] = useState({
        err_list: {
            status: Boolean,
            messages: {
                email: [],
                password: []
            }
        },
    });
    // console.log('TRIEN KD');
    console.log(alert.err_list.messages.password[0]);
    const handleSumbit = async (e) => {
        e.preventDefault();
        const item = { email,password };
        const res = await axios.post("http://127.0.0.1:8000/api/user/login", item);
        console.log(res.data);
        if(res.data.status === true){
           var user = JSON.parse(localStorage.getItem('user'));
           if(user === null){
                user =[];
                user.push({
                    id:res.data.data.id_user,
                    phone:res.data.data.phone,
                    password:res.data.data.password,
                    fullname:res.data.data.full_name,
                    email:res.data.data.email,
                    address:res.data.data.address,
                    role:res.data.data.role,
                })
                
                setAlert({
                    err_list: res.data
                });
                localStorage.setItem("user", JSON.stringify(user));
                let item = user.find(items => items.id == res.data.data.id_user);
                if (item.role == 0) {
                    navigate("/");
                } else {
                    navigate("/admin/");
                }
           }else{
                
                setAlert({
                    err_list: res.data
                });
           }
        }else{
            console.log(res.data);
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
                        <h2 className="active">Đăng nhập</h2>
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
                                <div className="col-md-12 ">
                                    <input type="email" className="text" name="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                                    {alert.err_list.messages.email[0] && <div className="notice warning_____">{alert.err_list.messages.email[0]}</div>}
                                </div>    
                                <div className="col-md-12 ">
                                    <input type="password" className="text" name="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)}/>
                                    {alert.err_list.messages.password[0] && <div className="notice warning_____">{alert.err_list.messages.password[0]}</div>}
                                </div>
                                <div className="col-md-12 " style={{display:"flex",align_items:"baseline"}}>
                                    <input style={{ border: "1px solid #0D3380" }} type="checkbox" id="checkbox-1-1" className="custom-checkbox"/>
                                    <h3 style={{ color: "black" }} htmlFor="checkbox-1-1"> Ghi nhớ </h3>
                                </div>
                                <div className="d-grid gap-2">
                                    <Button type='submit'>Đăng nhập</Button>
                                    {alert.err_list.status === true && <div className="notice success_____">Đăng Nhập Thành Công</div>}
                                </div>
                            </div> 
                        </form>
                        <div className="d-grid gap-2">
                            <button className="button">
                                <Link to="../forgotpw">Quên mật khẩu?</Link>
                            </button>
                            <button className="button">
                                <Link  to="../signin">Bạn chưa có tài khoản ? Đăng ký ngay</Link>
                            </button>
                        </div>    
                    </div>
                    <div className="col-md-6">
                        <img src="https://datnendep.vn/wp-content/uploads/2019/10/anh-phong-tro-1_1545126166.jpg" className="img-fluid" alt='images'/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login