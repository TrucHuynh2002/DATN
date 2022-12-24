import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { url } from '../../url';

function UpdateAccount() {
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWard, setListWard] = useState([]);
    const [listStreet, setStreet] = useState([]);
    // tỉnh
    const getDataProvince = async () => {
        const res = await axios.get(`${url}/post/show_province`);
        setListProvince(res.data.data);
    }
    // huyện
    const getDataDistrict = async (id_province = "") => {
        const ress = await axios.get(`${url}/post/show_district?id_province=${id_province}`);
        setListDistrict(ress.data.data);
    }
    // xã
    const getDataWard = async (id_district = '', id_province = '') => {
        const resss = await axios.get(`${url}/post/show_ward?id_province=${id_province}&&id_district=${id_district}`);
        setListWard(resss.data.data);
    }     
    // đường 
    const getDataStreet = async (id_province = '', id_district = '') => {
        const resss = await axios.get(`${url}/post/show_tree?id_province=${id_province}&&id_district=${id_district}`);
        setStreet(resss.data.data);
        
    }
    const [addProvince, setProvince] = useState('');
    const handleProvince = async (e) => {
        setProvince(e.target.value);
        getDataDistrict(e.target.value);
        setEditAccount({ ...editAccount, [e.target.name]: e.target.value });
    }
    const handleDistrict = async (e) => {
        getDataWard(e.target.value,addProvince);
        getDataStreet(addProvince,e.target.value);
        setEditAccount({ ...editAccount, [e.target.name]: e.target.value });
    }

    const {id_Account} = useParams();
    const [editAccount, setEditAccount] = useState({
       full_name:"",
       phone: "",
       address:""
    });

    const [alert, setAlert] = useState({
        err_list: {},
    });
    // const {full_name,phone,address} = editAccount;
    // Xử lý input vlaue
    const handleChange = (e) => {
        setEditAccount({ ...editAccount, [e.target.name]: e.target.value });
    };  
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('full_name',editAccount.full_name);        
        formData.append('phone',editAccount.phone);        
        formData.append('address',editAccount.address);        
        formData.append('id_province',editAccount.id_province);
        formData.append('id_district',editAccount.id_district);
        formData.append('id_ward',editAccount.id_ward);
        formData.append('id_street',editAccount.id_street);
        const res = await axios.put(`${url}/user/update/${id_Account}`, editAccount);
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
    const fetch_data = () => {
        loadCate();
        // Lấy hết tỉnh
        getDataProvince();
        // Lấy hết huyện
        getDataDistrict();
        // Xã
        getDataWard();
        // Đường
        getDataStreet(); 
    }

    useEffect(() => {        
        fetch_data();
    }, []);

    const loadCate = async () => {
        const result = await axios.get(`${url}/user/showAcount/${id_Account}`);
        setEditAccount(result.data.data);
    };

  return (
    <div className="content">
        <div className="add-post">
            <h1 className="content_h1_admin">Cập nhật thông tin</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" name="full_name" value={editAccount.full_name && editAccount.full_name}className='' onChange={(e) => handleChange(e)} />
                    {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.full_name[0]}</div>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control type="text" name="phone" value={editAccount.phone && editAccount.phone} className='' onChange={(e) => handleChange(e)} />
                    {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.phone[0]}</div>}
                </Form.Group>
                <Form.Group className="mb-12 id_province">
                                <Form.Label>Tỉnh</Form.Label>
                                <Form.Select name="id_province"
                                onChange = {(e) => handleProvince(e)}
                                >
                                    <option>Tỉnh</option>
                                    {listProvince.map((room, index) => {
                                        return (
                                            editAccount.id_province && room.id == editAccount.id_province
                                            ?
                                            <option selected key={index} value={room.id}>{room._name}</option>
                                            :
                                            <option key={index} value={room.id}>{room._name}</option>
                                        );
                                    })}       
                                </Form.Select>
                                {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_province[0]}</span>}
                        </Form.Group>
                        <Form.Group className="mb-12 id_district">
                            <Form.Label>Quận/Huyện/TP</Form.Label>
                            <Form.Select name="id_district"
                            onChange = {(e) => handleDistrict(e)}
                            >  
                            <option>Quận/Huyện/TP</option>
                                {listDistrict.map((room, index) => {
                                    return (
                                       editAccount.id_district && room.id == editAccount.id_district
                                        ?
                                        <option selected key={index} value={room.id}>{room._name}</option>
                                        :
                                        <option key={index} value={room.id}>{room._name}</option>
                                    );
                                })}       
                        </Form.Select>
                            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_district[0]}</span>}
                        </Form.Group>
                        <Form.Group className="mb-12 id_ward">
                            <Form.Label>Xã/Phường/Thị Trấn</Form.Label>
                            <Form.Select name="id_ward"
                            onChange = {(e) => handleChange(e)}
                            > 
                            <option>Xã/Phường/Thị Trấn</option>
                                {listWard.map((room, index) => {
                                    return (
                                       room.id == editAccount.id_ward
                                        ?
                                        <option selected key={index} value={room.id}>{room._name}</option>
                                        :
                                        <option key={index} value={room.id}>{room._name}</option>
                                    );
                                })}       
                            </Form.Select>
                            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_ward[0]}</span>}
                        </Form.Group>  
                        <Form.Group className="mb-12 id_street">
                            <Form.Label>Đường</Form.Label>
                            <Form.Select name="id_street"
                            onChange = {(e) => handleChange(e)}
                            >
                                <option>Đường</option>
                                {listStreet.map((room, index) => {
                                    return (
                                        room.id == editAccount.id_street
                                        ?
                                        <option selected key={index} value={room.id}>{room._name}</option>
                                        :
                                        <option key={index} value={room.id}>{room._name}</option>
                                    );
                                })}   
                            </Form.Select>
                            {alert.err_list.status === false && <span className="error">{alert.err_list.messages.id_street[0]}</span>}
                        </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control type="text" name="address" value={editAccount.address && editAccount.address} className='' onChange={(e) => handleChange(e)} />
                    {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.address[0]}</div>}
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="sm" name='' type="submit">
                      Cập nhật thông tin
                    </Button>
                </div>
                {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
            </Form>
        </div>
    </div>
  );
}

export default UpdateAccount