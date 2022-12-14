import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { url } from '../../url';

function ChartManage() {

var user = JSON.parse(localStorage.getItem("user"));
const id_user = user[0].id;
const [listRevenueRoom, setListRevenueRoom] = useState([]);
const [listEmptyRoom, setListEmptyRoom] = useState([]);
const [listDepositRoom, setListDepositRoom] = useState([]);
const [listOwnershipRoom, setListOwnershipRoom] = useState([]);
const [listMonthRoom,setListMonthRoom] = useState([])
useEffect(() => {
  getData();
},[]);
const getData = async () => {
  // phong trong
  const EmptyRoom = await axios.get(`${url}/StatisticalSController/emptyRoom/${id_user}`);
  setListEmptyRoom(EmptyRoom.data.data);
 
  // phong dat coc
  const DepositRoom = await axios.get(`${url}/StatisticalSController/depositRoom/${id_user}`);
  setListDepositRoom(DepositRoom.data.data);

  // phong so huu
  const OwnershipRoom = await axios.get(`${url}/StatisticalSController/ownershipRoom/${id_user}`);
  setListOwnershipRoom(OwnershipRoom.data.data);

  // doanh thu
  const RevenueRoom = await axios.get(`${url}/StatisticalSController/revenueRoom/${id_user}`);
  setListRevenueRoom(RevenueRoom.data.data);

  // doanh thu
  const MonthRoom = await axios.get(`${url}/StatisticalSController/monthRoom/${id_user}`);
  setListMonthRoom(MonthRoom.data.data);

}
  
  return (
    <>
      <div className="content_profile">
        <div className="list-post">
          <div className='row'>
            <h1><b className="b_title">Thống kê doanh số hàng tháng</b></h1>
            <div className='chart_sales row'>
              <div className='chart_salesItem col-lg-3 col-md-6 col-xs-12'>
                <div className='doanh_thu'>
                      <p>Doanh thu</p>
                      <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(listRevenueRoom)}</span>
                </div>
              </div>
              <div className='chart_salesItem col-lg-3 col-md-6 col-xs-12'>
                <div className='phong_trong'>
                    <p>Phòng trống</p>
                    <span>{listEmptyRoom}</span>
                </div>
              </div>
              <div className=' chart_salesItem col-lg-3 col-md-6 col-xs-12'>
                <div className='phong_coc'>
                  <p>Phòng đặt cọc</p>
                  <span>{listDepositRoom}</span>
                </div>
              </div>
              <div className=' chart_salesItem col-lg-3 col-md-6 col-xs-12'>
                <div className='phong_dang_o'>
                <p>Phòng đang ở</p>
                <span>{listOwnershipRoom}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChartManage