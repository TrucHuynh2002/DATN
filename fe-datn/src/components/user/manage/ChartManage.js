import React from 'react';
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
    
  return (
    <>
      <div className="content_profile">
        <div className="list-post">
          <div className='row'>
            <h1>Thống kê doanh số hàng tháng</h1>
            <div className='chart_sales'>
              <div className='doanh_thu'>
                <p>Doanh thu</p>
                <span>100.000.000 đ</span>
              </div>
              <div className='phong_trong'>
                <p>Phòng trống</p>
                <sapn>7</sapn>
              </div>
              <div className='phong_coc'>
                <p>Phòng đặt cọc</p>
                <span>7</span>
              </div>
              <div className='phong_dang_o'>
                <p>Phòng đang ở</p>
                <span>10</span>
              </div>
            </div>
            <div className='search_chart'>
              Lọc <input type="date" name='' className='search_input' />
            </div>
            <Line data={dataLine}></Line>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChartManage