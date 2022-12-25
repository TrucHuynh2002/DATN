import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import { url } from '../../url';

function InfoAccount() {

    const user = JSON.parse(localStorage.getItem("user"));
    const {id_user} = useParams();
    const [InfoAccount, setInfoAccount] = useState([]);
    const [listprovince, setListprovince] = useState([]);
    const [listdistrict, setListdistrict] = useState([]);
    const [listward, setListward] = useState([]);
    const [liststreet, setListstreet] = useState([]);
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
    
    const getData = async () => {
        // danh sach Account
        const Account = await axios.get(`${url}/user/show/${id_user}`);
            setInfoAccount(Account.data.data);
        // tỉnh
        const province = await axios.get(`${url}/user/show_province_detail/${id_user}`);
          setListprovince(province.data.data);
        // huyện
        const district = await axios.get(`${url}/user/show_district_detail/${id_user}`);
          setListdistrict(district.data.data);
        // xã
        const ward = await axios.get(`${url}/user/show_ward_detail/${id_user}`);
          setListward(ward.data.data);
        // đường
        const strees = await axios.get(`${url}/user/show_street_detail/${id_user}`);
          setListstreet(strees.data.data);
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
        const res =  await axios.post(`${url}/user/avatar/${id_user}?_method=PUT`, formData);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
            });
        }
        else{
            setAlert({
                err_list: res
            });
            
        }
    };
  
    const now = new Date(InfoAccount.updated_at);
    const dateString = now.toLocaleDateString({
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric"
    });

    return (
    <>
        <h1><b className='b_title'>Thông tin cá nhân</b></h1>
        <hr></hr>
        {InfoAccount.map((info, index) => {
            return (
                <div className='row' key={index}>
                <div className='col-md-2 text-center div_imggggg'>
                    <NavLink  href="">
                    <img src={info.link_img_user} alt={info.id_img_user} className='avt_img'/>
                        <div className='update_imggg'>
                            <NavLink href="" onClick={handleShow}>
                                <span>Sửa</span>
                            </NavLink>  
                        </div>  
                    </NavLink>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cập nhật ảnh đại diện</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={e => handleSumbitData(e)} encType="multipart/form-data">
                                <Form.Group className="mb-3" controlId="logo">
                                    <Form.Control type="file" name="avatar" className='' onChange={e => handleUpdateAvatar(e)}/>
                                </Form.Group>
                                {alert.err_list.status === true && <div className='notice success_____'>Cập nhật thành công</div>}
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
                        <span>Tên người dùng: </span>
                        <span>{info.full_name}</span>
                    </div>
                    <div>
                        <span>Email: </span>
                        <span>{info.email}</span>
                    </div>
                    <div>
                        <span>Số điện thoại: </span>
                        <span>{info.phone}</span>
                    </div>
                </div>
                <div className='col-md-6 info_content____'> 
                    <div>
                        <span> Địa chỉ : </span>
                        <span>{info.address}, </span>
                        
                        {liststreet.map((street_detail, index) => {
                        return (   
                            <span style={{marginRight:'2px'}} key={index}> {street_detail._name}, </span>                        
                            );
                        })}
                       
                        {listward.map((ward_detail, index) => {
                        return (   
                            <span style={{marginRight:'2px'}} key={index}> {ward_detail._name}, </span>                        
                            );
                        })}
                      
                        {listdistrict.map((dis_detail, index) => {
                            return (   
                                <span style={{marginRight:'2px'}} key={index}> {dis_detail._name}, </span>            
                            );
                        })} 
                       
                        {listprovince.map((pro_detail, index) => {
                            return (   
                            <span style={{marginRight:'2px'}}  key={index}> {pro_detail._name}. </span>                    
                        );
                        })}  
                    </div>
                    <div>
                        <span> Ngày tham gia : </span>
                        <span> {info.updated_at}</span> 
                    </div>
                </div>
            </div>
            );
            })}
            {!user ? <></> : user[0].id != id_user  ?  <></> :
                <div className='col-12'>
                    <NavLink to={`../update_acc/${id_user}`}>
                        <Button variant="outline-primary" name='' className='btn-edit'>Cập nhật thông tin</Button>
                    </NavLink>
                    <NavLink to={`../confirm_acc/${id_user}`}>
                        <Button variant="outline-warning" name='' className='btn-edit'>Đổi mật khẩu</Button>
                    </NavLink>
                    {user[0].role == 0 && 
                        <NavLink to={`../layoutBill/${id_user}`}>
                            <Button variant="outline-warning" name='' className='btn-edit'>Phòng đang thuê</Button>
                        </NavLink>
                    } 
                    {user[0].role == 2 &&
                        <NavLink to={`../admin`}>
                            <Button variant="outline-primary" name='' className='btn-edit'>Quản trị Admin</Button>
                        </NavLink>
                    }
                </div>
            }
    </>
  )
}

export default InfoAccount