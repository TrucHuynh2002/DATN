import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';

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
        province();
        district();
        ward();
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
    // tỉnh
    const province = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/user/show_province_detail/${id_user}`);
          setListprovince(res.data.data);
      };
    // huyện 
      const district = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/user/show_district_detail/${id_user}`);
          setListdistrict(res.data.data);
      };  
    // xã
      const ward = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/user/show_ward_detail/${id_user}`);
          setListward(res.data.data);
      }; 
    // đường
      const strees = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/user/show_street_detail/${id_user}`);
          setListstreet(res.data.data);
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
                           <NavLink to="#" >
                            <img src={info.link_img_user} alt={info.id_img_user} className='avt_img'/>
                                <div className='update_imggg'>
                                   <NavLink to="#" onClick={handleShow}>
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
                                <span style={{marginRight:'2px'}}> Xã </span>
                                {liststreet.map((street_detail, index) => {
                                return (   
                                    <span style={{marginRight:'2px'}} key={index}> {street_detail._name}, </span>                        
                                    );
                                })}
                                <span style={{marginRight:'2px'}}> Xã </span>
                                {listward.map((ward_detail, index) => {
                                return (   
                                    <span style={{marginRight:'2px'}} key={index}> {ward_detail._name}, </span>                        
                                    );
                                })}
                                <span style={{marginRight:'2px'}}> Quận </span> 
                                {listdistrict.map((dis_detail, index) => {
                                    return (   
                                        <span style={{marginRight:'2px'}} key={index}> {dis_detail._name}, </span>            
                                    );
                                })} 
                                <span style={{marginRight:'2px'}}>Thành phố </span>
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
                 {!user ? <></> :
                        user[0].id != id_user  ?  <></> :
                            <div className='col-12'>
                               <NavLink to={`../update_acc/${id_user}`}>
                                    <Button variant="outline-primary" name='' className='btn-edit'>Cập nhật thông tin</Button>
                                </NavLink>
                               <NavLink to={`../confirm_acc/${id_user}`}>
                                    <Button variant="outline-warning" name='' className='btn-edit'>Đổi mật khẩu</Button>
                                </NavLink>
                                    <NavLink to={`/layoutBill`}>
                                    <Button variant="outline-warning" name='' className='btn-edit'>Phòng đang thuê</Button>
                                </NavLink>
                            </div>
                           }
            </>
      
  )
}

export default InfoAccount