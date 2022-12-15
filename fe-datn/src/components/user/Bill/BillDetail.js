import React from 'react'
import { Link,useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
function BillDetail() {
    let { id_bill } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const id_user = user ?  user[0].id : '';
    const [loadBill,setLoadBill] = useState([])
    const getDataBill = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/bill-detail/user/${id_bill}?id_user=${id_user}`);
        console.log(res.data.data);
        setLoadBill(res.data.data)
    }

    useEffect(() => {
        getDataBill()
    },[])
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2>Chi tiết hóa đơn</h2>
                        </div>
                    </div>
               </div>
            </div>  
        </div>
        <div className='row'>
            <div className="manage col-12 bill_deatail">
                <div className="container">
                    <div className="content_profile">
                        <div className="list-post">
                            <div className='bill_row'>
                                <h2>Chi tiết phòng trọ số: <strong>A{loadBill.room_number}</strong></h2>
                                <p>Tên người thuê phòng: {loadBill.full_name}</p>
                                <p>Số phòng: A{loadBill.room_number}</p>
                                <p>Tổng giá phòng: {loadBill.all_money} đ</p>
                                <p>Tổng giá điện: {loadBill.electricity_money} đ</p>
                                <p>Tổng giá nước: {loadBill.water_money} đ</p>
                                <p>Thời gian: {loadBill.created_at}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default BillDetail