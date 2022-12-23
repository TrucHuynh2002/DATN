import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { url } from '../../url';
import { ArcElement, CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, ArcElement);

function ChartManage() {
  //  chartjs line

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
const dataLine = {
  labels: listMonthRoom.map((pr,i) =>  moment(pr.created_at).format('DD-MM-YYYY')),
  datasets: [{
      data: listMonthRoom.map((pr,i) =>  pr.all_money),
      backgroundColor: 'transparent',
      borderColor: 'red',
      pointBorderWidth: 4,
      tension: 0.5
  }]
};
    
  return (
    <>
      <div className="content_profile">
        <div className="list-post">
          <div className='row'>
            <h1>Thống kê doanh số hàng tháng</h1>
            <div className='chart_sales row'>
              <div className=' chart_salesItem col-lg-3 col-md-6 col-xs-12'>
                <div className=' doanh_thu'>
                      <p>Doanh thu</p>
                      <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(listRevenueRoom)}</span>
                </div>
              </div>
              <div className='chart_salesItem col-lg-3 col-md-6 col-xs-12'>
                <div className=' phong_trong'>
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
            <div className='search_chart'>
              Lọc <input type="date" name='' className='search_input' />
            </div>
            <Line data={dataLine}></Line>
            <div className="name_bieudo"><h5><span>Biểu đồ :</span> Thống kê doanh thu theo tháng của trang web</h5></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChartManage