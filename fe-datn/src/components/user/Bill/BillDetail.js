import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../../url';
import { TabTitle } from '../../title';

function BillDetail() {
    TabTitle('Chi tiết hóa đơn - Nhà Tui.com');
    let { id_bill } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const id_user = user ?  user[0].id : '';
    const [loadBill,setLoadBill] = useState([])
    const getDataBill = async () => {
        const res = await axios.get(`${url}/bill-detail/user/${id_bill}?id_user=${id_user}`);
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
                            <h2>Chi tiết hóa đơn phòng trọ số<strong> A{loadBill.room_number}</strong></h2>
                        </div>
                    </div>
               </div>
            </div>  
        </div>
        <div className='row'>
            <div className="container content_profile">
                <div className="list-post" style={{fontSize: "24px"}}>
                    <h4>Tên người thuê phòng : {loadBill.full_name}</h4>
                    <h4>Số phòng : A{loadBill.room_number}</h4>
                    <h4>Tổng giá phòng :  
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(loadBill.all_money)}
                    </h4>
                    <h4>Tổng giá điện :  
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(loadBill.electricity_money)}
                    </h4>
                    <h4>Tổng giá nước :  
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(loadBill.water_money)}
                    </h4>
                    <h4>Thời gian :  {loadBill.created_at}</h4>
                </div>
            </div>
        </div>
    </>
  )
}

export default BillDetail