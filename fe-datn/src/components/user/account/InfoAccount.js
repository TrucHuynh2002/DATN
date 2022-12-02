import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import EditAvata from './EditAvata';

function InfoAccount() {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user[0].id);
    const {id_post} = useParams();
    const [InfoAccount, setInfoAccount] = useState([]);
    useEffect(() => {
        getData();
    },[]);

    // danh sach Account
    const getData = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/user/show/${id_post}`);
        setInfoAccount(res.data.data);
    };
    return (
            <div>
                <h1><b className="b_title">Thông tin cá nhân</b></h1>
                <hr></hr>
                <div className='row'>
                    <div className='col-md-2 text-center div_imggggg'>
                        <Link to="#">
                        <img src='https://th.bing.com/th/id/R.0e0b8048a60c7df1b006dc922ccb40c2?rik=lef4Lt2Og7ea2Q&pid=ImgRaw&r=0' alt='' className="avt_img" />
                            <div className="update_imggg">
                                <Link to="">
                                    <span>Sửa</span>
                                </Link>
                            </div>  
                        </Link>
                        <EditAvata />
                    </div>
                    <div className='col-md-4 info_content____'>
                        <div>
                            <span>Tên đăng nhập : </span>
                            <span>{InfoAccount.full_name}</span>
                        </div>
                        <div>
                            <span>Email : </span>
                            <span>{InfoAccount.email}</span>
                        </div>
                        <div>
                            <span>Phone : </span>
                            <span>{InfoAccount.phone}</span>
                        </div>
                        <div>
                            <span>Địa chỉ : </span>
                            <span>{InfoAccount.address}</span>
                        </div>
                    </div>
                    <div className='col-md-6 info_content____'>
                        <div>
                            <span className='icon_profile bx bx-star'> Đánh giá : </span>
                            <span> Chưa có đánh giá</span> 
                        </div>
                        <div>
                            <span className='icon_profile bx bx-table'> Ngày tham gia : </span>
                            <span> {InfoAccount.created_at} </span> 
                        </div>
                        <div>
                            <span className='icon_profile bx bx-message-dots'> Phản hồi chat : </span> 
                            <span> Thỉnh thoảng (Phản hồi chậm)</span>
                        </div>
                        <div>
                            <span className='icon_profile bx bx-check-circle'> Đã cung cấp : </span> 
                            <span className='icon_profile bx bxl-facebook-circle'></span> 
                            <span className='icon_profile bx bxl-google-plus-circle'></span> 
                            <span className='icon_profile bx bx-envelope'></span>
                        </div>
                    </div>
                </div>
                {user ? 
                user[0].id = InfoAccount.id_user  ?
                    <div>
                        <Link to={`../update_acc/${InfoAccount.id_user}`}>
                            <Button variant="outline-primary" name='' className="btn-edit">Cập nhật thông tin</Button>
                        </Link>
                        <Link to={`../confirm_acc/${InfoAccount.id_user}`}>
                            <Button variant="outline-warning" name='' className="btn-edit">Đổi mật khẩu</Button>
                        </Link>
                    </div>
                  : <div></div> : <div></div> }
            </div>
      
  )
}

export default InfoAccount