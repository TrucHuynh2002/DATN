import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../url';
import { TabTitle } from '../title';
import HashLoader from "react-spinners/HashLoader";

function Login() {
    TabTitle('Đăng nhập');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // xu ly loi
    const [alert, setAlert] = useState({
        err_list: {},
    });
    const handleSumbit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData();
        dataForm.append('email',email);
        dataForm.append('password',password);
        const res = await axios.post(`${url}/user/login`, dataForm);
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
                if (item.role == 0 || item.role == 1) {
                    navigate("../");
                } else {
                    navigate("/admin");
                }
           }else{
                
                setAlert({
                    err_list: res.data
                });
           }
        }else{
            setAlert({
                err_list: res.data
            });
        }
    }
    // GOOGLE
    const [loginGoogle, setLoginGoogle] = useState('');
    const handleLoginGoogle = async (e) => {
        const google = await axios.get(`${url}/auth/google/url`);

        if(google.data.status === true){
            setLoginGoogle(google.data.url)
        }

    }
    const [loginFacebook, setLoginFacebook] = useState('');
    const handleLoginFacebook = async (e) => {
        const facebook = await axios.get(`${url}/facebook`);
        if(facebook.data.status === true){
            setLoginFacebook(facebook.data.url)
        }
    }
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 3000)
        handleLoginGoogle()
        handleLoginFacebook()
      },[]);
   
    return (
    <>
        {loading ? 
        <HashLoader className='css_loading'
        color={'#0d3380'}
        loading={loading}
        size={100}
        style={{display: 'inherit', position: 'relative', height: '100px', transform: 'rotate(165deg)'}}
        />
        : 
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
                            <form onSubmit={(e) => handleSumbit(e)} encType="multipart/form-data">
                                <div className="row">
                                    <div className="col-md-12 ">
                                        <input type="email" className="text" name="email" placeholder="Email"  onChange={e => setEmail(e.target.value)} />
                                        { alert.err_list.status == false && alert.err_list.messages.email &&
                                        <div className="notice warning_____">{alert.err_list.messages.email[0]}</div>}
                                    </div>   
                                    <div className="col-md-12 ">
                                        <input type="password" className="text" name="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        {   alert.err_list.status == false && alert.err_list.messages.password &&
                                        <div className="notice warning_____">{alert.err_list.messages.password[0]}</div>}
                                    </div>
                                    <div className="col-md-12 " style={{display:"flex",align_items:"baseline"}}>
                                        <input style={{ border: "1px solid #0D3380" }} type="checkbox" id="checkbox-1-1" className="custom-checkbox"/>
                                        <h3 style={{ color: "black" }} htmlFor="checkbox-1-1"> Ghi nhớ </h3>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <Button type='submit'>Đăng nhập</Button>
                                        {alert.err_list.status === 1 && <div className="notice warning_____">Tài khoản hoặc mật khẩu không chính xác</div>}
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
                            <div className='row'>
                                <div className='col-md-6'>
                                    <a href={loginFacebook} className='button_facebook'>
                                        <i className='fa fa-facebook'></i>
                                        Đăng nhập với Facebook
                                    </a>
                                </div>
                                <div className='col-md-6'>
                                    <a href={loginGoogle} className='button_google'>
                                        <i className='fa fa-google'></i>
                                        Đăng nhập với Google
                                    </a>
                                </div>
                            </div>  
                        </div>
                        <div className="col-md-6">
                            <img src="https://datnendep.vn/wp-content/uploads/2019/10/anh-phong-tro-1_1545126166.jpg" className="img-fluid" alt='images'/>
                        </div>
                    </div>
                </div>
            </div>
        </>
        }
    </>
  )
}

export default Login