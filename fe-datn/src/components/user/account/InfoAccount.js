import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
// import EditAvata from './EditAvata';

function InfoAccount() {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user[0].id);
    const {id_post} = useParams();
    const [InfoAccount, setInfoAccount] = useState([]);
    useEffect(() => {
        getData();
    },[]);

    // xu ly loi
    const [alert, setAlert] = useState({
        err_list: {
            messages: "",
            status: ""
        },
    });

    // danh sach Account
    const getData = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/user/show/${id_post}`);
        setInfoAccount(res.data.data);
    };

    // xu ly avata
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [uploadImages, setUploadImages] = useState([]);
    const handleUpdateAvatar = (e) => {
        setUploadImages(e.target.files);
    }
    const handleSumbitData = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('avatar[]', uploadImages[0]);
        const res =  await axios.post(`http://127.0.0.1:8000/api/user/avatar/2?_method=PUT`, formData);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
            });
            // console.log(res);
        }
        else{
            // console.log(res.data)           
            setAlert({
                err_list: res
            });
            
        }
    };
    const now = new Date(InfoAccount.created_at);
    const dateString = now.toLocaleDateString({
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric"
    })

console.log(dateString);

    return (
            <div>
                <h1><b className="b_title">Thông tin cá nhân</b></h1>
                <hr></hr>
                <div className='row'>
                    <div className='col-md-2 text-center div_imggggg'>
                        <Link to="#">
                        <img src='https://th.bing.com/th/id/R.0e0b8048a60c7df1b006dc922ccb40c2?rik=lef4Lt2Og7ea2Q&pid=ImgRaw&r=0' alt='' className="avt_img" />
                            <div className="update_imggg">
                                <Link to="#" onClick={handleShow}>
                                    <span>Sửa</span>
                                </Link>  
                            </div>  
                        </Link>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Cập nhật ảnh đại diện</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={e => handleSumbitData(e)} encType="multipart/form-data">
                                    <Form.Group className="mb-3" controlId="logo">
                                       
                                        <Form.Control type="file" name="avatar" className='' onChange={e => handleUpdateAvatar(e)}/>
                                    </Form.Group>
                                    {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
                                    <Button variant="primary" className='' name="" type="submit">Cập nhật</Button> 
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            </Modal.Footer>
                        </Modal>
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
                    </div>
                    <div className='col-md-6 info_content____'> 
                        <div>
                            <span> Địa chỉ : </span>
                            <span>{InfoAccount.address}</span>
                        </div>
                        <div>
                            <span> Ngày tham gia : </span>
                            <span> {dateString}</span> 
                        </div>
                    </div>
                </div>
                {user ? 
                user[0].id = InfoAccount.id_user  ?
                    <div className='col-12'>
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