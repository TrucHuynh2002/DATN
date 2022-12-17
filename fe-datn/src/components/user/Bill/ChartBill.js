import React, { useState,useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement } from 'chart.js';
import axios from 'axios';
import moment from 'moment';
ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, ArcElement);

function ChartBill({dataChart}) {
    // console.log(dataChart);
    //  chartjs line
    const user = JSON.parse(localStorage.getItem("user"));
    const id_user = user ?  user[0].id : '';
    const [data,setData] = useState({});
    const [PriceMonth,setPriceMonth] = useState([]);
    const [PriceRoom,setPriceRoom] = useState([])
    const [DateRoom,setDateRoom] = useState([])
    // console.log(PriceRoom);
    Array(5).map((_,index) => {       
        setData({...data,['Tháng' + index]: index}) 
    })

    const getDataBill = async () => {
        if(dataChart.length > 0){
            setPriceRoom(dataChart)
        }else{
            const res = await axios.get(`http://127.0.0.1:8000/api/bill/user/${id_user}`);
        
            setPriceRoom(res.data.data)
        }
    
        // console.log(res.data);
        // setPriceMonth(res.data.data)
        // res.data.data.map((price,index) => {
        //     setPriceRoom(prev => {
        //         return     [...prev,price.all_money]
        //     })
        // })
        // setDateRoom(res.data.data)
        // res.data.data.map((price,index) => {
        //     setPriceRoom(prev => {
        //         return     [...prev,price.created_at]
        //     })
        // })
    }





    useEffect(() => {
        getDataBill()

            // return () => {
            //     getDataBill()
            // }
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
        <div className="manage col-6">
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