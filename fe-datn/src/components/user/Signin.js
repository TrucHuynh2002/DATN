import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { url } from '../url';
import { TabTitle } from '../title';

function Signin() {
    TabTitle('Đăng ký');
    const [addUser, setAddUser] = useState({
        full_name: "",
        password: "",
        email: "",
        phone: "",
        address: "",
        id_province : "",
        id_district : "",
        id_ward : "",
        // id_street : "",
        role: 0,
    });
    const {full_name, password, email, phone, address, id_province, id_district, id_ward} = addUser;
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
        dataForm.append('id_province', id_province);
        dataForm.append('id_district', id_district);
        dataForm.append('id_ward', id_ward);
        // dataForm.append('id_street', id_street);
        const res = await axios.post(`${url}/user/create`, addUser);
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
    };
    useEffect(() => {
        getDataProvince();
    },[]);

        const [listProvince, setListProvince] = useState([]);
        const [listDistrict, setListDistrict] = useState([]);
        const [listWard, setListWard] = useState([]);
        // const [listStreet, setStreet] = useState([]);
        const [addProvince, setProvince] = useState([]);
        const handleProvince = async (e) => {
            setAddUser({ ...addUser, [e.target.name]: e.target.value});
            setProvince({...addProvince,[e.id_province] : e.target.value});
            getDataDistrict(({[e.id_province] : e.target.value}).undefined);
        }
        const handleDistrict = async (e) => {
            getDataWard(({[e.id_district] : e.target.value}).undefined)
            // getDataStreet(e.target.value);
            setAddUser({ ...addUser, [e.target.name]: e.target.value});
        }
        // tỉnh
        const getDataProvince = async () => {
            const res = await axios.get(`${url}/province/show`);
            setListProvince(res.data.data);
        }
        // huyện 
        const getDataDistrict = async (id_province = '') => {
            const ress = await axios.get(`${url}/post/show_district?id_province=${id_province}`);
            setListDistrict(ress.data.data);
        }
        // xã
        const getDataWard = async (id_district = '') => {
            var id_province = addProvince.undefined;
            const resss = await axios.get(`${url}/post/show_ward?id_province=${id_province}&&id_district=${id_district}`);
            setListWard(resss.data.data);
        }     
        // đường 
        // const getDataStreet = async (id_district = '') => {
        //     var id_province = addProvince.undefined;
        //     const resss = await axios.get(`${url}/post/show_tree?id_province=${id_province}&&id_district=${id_district}`);
        //     setStreet(resss.data.data);
        // };

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
                                    <select name="id_province" className="text" onChange = {(e) => handleProvince(e)}>
                                        <option>Tỉnh</option>
                                        {listProvince.map((room, index) => {
                                            return (
                                                <option key={index} value={room.id} >{room._name}</option>
                                        );
                                    })} 
                                    </select>
                                </div>
                                { alert.err_list.status == false && alert.err_list.messages.id_province &&
                                <div className="notice warning_____">{alert.err_list.messages.id_province[0]}</div>}
                                <div className="col-md-12">
                                    <select className="text" name="id_district"
                                    onChange = {(e) => handleDistrict(e)}>
                                        <option>Quận/Huyện/TP</option>
                                        {listDistrict.map((room, index) => {
                                        return (
                                            <option key={index} value={room.id}>{room._name}</option>
                                        );
                                    })}
                                    </select>
                                </div>
                                { alert.err_list.status == false && alert.err_list.messages.id_district &&
                                <div className="notice warning_____">{alert.err_list.messages.id_district[0]}</div>}
                                <div className="col-md-12">
                                    <select className="text" name="id_ward"
                                    onChange = {(e) => handleChange(e)}>
                                        <option>Xã/Phường/Thị Trấn</option>
                                        {listWard.map((room, index) => {
                                        return (
                                            <option key={index} value={room.id} >{room._name}</option>
                                        );
                                    })} 
                                    </select>
                                </div>
                                { alert.err_list.status == false && alert.err_list.messages.id_ward &&
                                <div className="notice warning_____">{alert.err_list.messages.id_ward[0]}</div>}
                                {/* <div className="col-md-12">
                                    <select className="text" name="id_street"
                                    onChange = {(e) => handleChange(e)}>
                                        <option>Đường</option>
                                        {listStreet.map((room, index) => {
                                        return (
                                            <option key={index} value={room.id} >{room._name}</option>
                                        );
                                    })}
                                    </select>
                                </div>
                                { alert.err_list.status == false && alert.err_list.messages.id_street &&
                                <div className="notice warning_____">{alert.err_list.messages.id_street[0]}</div>} */}
                                <div className="col-md-12">
                                    <input type="text" className="text" name="address" value={address} placeholder="Địa chỉ" onChange={(e) => handleChange(e)} />
                                </div>
                                { alert.err_list.status == false && alert.err_list.messages.address &&
                                <div className="notice warning_____">{alert.err_list.messages.address[0]}</div>} 

                                <div className="d-grid gap-2">
                                {alert.err_list.status == true && 
                                <div className="notice success_____">Đăng ký thành công</div>}
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