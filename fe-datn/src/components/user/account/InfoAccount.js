import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function InfoAccount() {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user[0].id);
    const {id_user} = useParams();
    const [InfoAccount, setInfoAccount] = useState([]);
    // console.log(imgUser);
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
        const res = await axios.get(`http://127.0.0.1:8000/api/user/show/${id_user}`);
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
        const res =  await axios.post(`http://127.0.0.1:8000/api/user/avatar/${id_user}?_method=PUT`, formData);
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
    console.log(InfoAccount.created_at);
    const now = new Date(InfoAccount.updated_at);
    const dateString = now.toLocaleDateString({
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric"
    })

// console.log(dateString);

// list img user
// const getImgUser = async () => {
//     const img = await axios.get(`http://127.0.0.1:8000/api/user/showimg/${id_user}`);
//     console.log(img);
//     // setImgUser(img.data.data[0]);
// };

    return (
            <div>
                <h1><b className="b_title">Thông tin cá nhân</b></h1>
                <hr></hr>
                {InfoAccount.map((info, index) => {
                    return (
                        <div className='row'>
                        <div className='col-md-2 text-center div_imggggg'>
                            <Link to="#">
                            <img src={info.link_img_user} alt={info.id_img_user} className="avt_img"/>
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
                                <span>{info.full_name}</span>
                            </div>
                            <div>
                                <span>Email : </span>
                                <span>{info.email}</span>
                            </div>
                            <div>
                                <span>Phone : </span>
                                <span>{info.phone}</span>
                            </div>
                        </div>
                        <div className='col-md-6 info_content____'> 
                            <div>
                                <span> Địa chỉ : </span>
                                <span>{info.address}</span>
                            </div>
                            <div>
                                <span> Ngày tham gia : </span>
                                <span> {dateString}</span> 
                            </div>
                        </div>
                    </div>
                     );
                })}
                 {user ? 
                        user[0].id = id_user  ?
                            <div className='col-12'>
                                <Link to={`../update_acc/${id_user}`}>
                                    <Button variant="outline-primary" name='' className="btn-edit">Cập nhật thông tin</Button>
                                </Link>
                                <Link to={`../confirm_acc/${id_user}`}>
                                    <Button variant="outline-warning" name='' className="btn-edit">Đổi mật khẩu</Button>
                                </Link>
                            </div>
                       
                          : <div></div>  : <div></div> }
            </div>
      
  )
}

export default InfoAccount