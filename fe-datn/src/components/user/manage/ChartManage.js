import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { ArcElement, CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, ArcElement);

function ChartManage() {
  //  chartjs line
const dataLine = {
  labels: [2022.2021],
  datasets: [{
      data: [12, 34],
      backgroundColor: 'transparent',
      borderColor: 'red',
      pointBorderWidth: 4,
      tension: 0.5
  }]
};
var user = JSON.parse(localStorage.getItem("user"));
const id_user = user[0].id;
const [listEmptyRoom, setListEmptyRoom] = useState([]);
const [listDepositRoom, setListDepositRoom] = useState([]);
const [listOwnershipRoom, setListOwnershipRoom] = useState([]);
useEffect(() => {
  getData();
},[]);
const getData = async () => {
  // phong trong
  const EmptyRoom = await axios.get(`http://127.0.0.1:8000/api/StatisticalSController/emptyRoom/${id_user}`);
  setListEmptyRoom(EmptyRoom.data.data);
 
  // phong dat coc
  const DepositRoom = await axios.get(`http://127.0.0.1:8000/api/StatisticalSController/depositRoom/${id_user}`);
  setListDepositRoom(DepositRoom.data.data);

  // phong so huu
  const OwnershipRoom = await axios.get(`http://127.0.0.1:8000/api/StatisticalSController/ownershipRoom/${id_user}`);
  setListOwnershipRoom(OwnershipRoom.data.data);


}

    
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
                      <span>100.000.000 đ</span>
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