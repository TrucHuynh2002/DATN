import axios from 'axios';
import { ArcElement, CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement } from 'chart.js';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { url } from '../../url';
ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, ArcElement);

function ChartBill({dataChart}) {
    const user = JSON.parse(localStorage.getItem("user"));
    const id_user = user ?  user[0].id : '';
    const [data,setData] = useState({});
    const [PriceMonth,setPriceMonth] = useState([]);
    const [PriceRoom,setPriceRoom] = useState([])
    const [DateRoom,setDateRoom] = useState([])
    Array(5).map((_,index) => {       
        setData({...data,['Tháng' + index]: index}) 
    })

    const getDataBill = async () => {
        if(dataChart.length > 0){
            setPriceRoom(dataChart)
        }else{
            const res = await axios.get(`${url}/bill/user/${id_user}`);
        
            setPriceRoom(res.data.data)
        }
    }
    useEffect(() => {
        getDataBill()
    },[dataChart])
   
const dataLine = {
    labels: PriceRoom.map((pr,i) =>  moment(pr.created_at).format('DD-MM-YYYY')),
    datasets: [{
        data:PriceRoom.map((pr,i) =>  pr.all_money),
        backgroundColor: 'transparent',
        borderColor: 'red',
        pointBoderColor: 'transparent',
        pointBorderWidth: 4,
        tension: 0.5
    }]
  };
  
  const options = {
    plugins: {
        legend: false
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            min: 10000000,
            max: 100000000,
            tick: {
                stepSize: 2,
                callbacks: (value) => value + 'K'
            },
            grid: {
  
            }
        }
    }
  };

  return (
    <>
        <div className="manage col-5">
            <div className="container">
                <div className="content_profile">
                    <div className="list-post">
                        <div className='row'>
                            <Line data={dataLine} options={options}></Line>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ChartBill