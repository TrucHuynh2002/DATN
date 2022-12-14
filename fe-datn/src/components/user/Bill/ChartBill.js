import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement } from 'chart.js';
ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, ArcElement);

function ChartBill() {
    //  chartjs line
const dataLine = {
    labels: ["2022", "2020", "2021"],
    datasets: [{
        data: [2, 3, 3.5, 5.5, 6, 7],
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
            min: 1,
            max: 10,
            tick: {
                stepSize: 2,
                callback: (value) => value + 'K'
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