import axios from 'axios';
import React, { useState } from 'react';
import ChartBill from './ChartBill';
import PriceRoom from './PriceRoom';
import { url } from '../../url';
import { TabTitle } from '../../title';

const user = JSON.parse(localStorage.getItem("user"));

function LayoutBill() {
    TabTitle('Phòng đang thuê');
    const [dataChart,setDataChart] = useState([]);   
    const handleFilterDate = async (id_user,start_date, end_date) => {
        const res = await axios.get(`${url}/bill/user/${id_user}?start_date=${start_date}&&end_date=${end_date}`);
        if(res.data.status == true){
            setDataChart(res.data.data)
        }   
    }
    // Nếu k có đường dẫn sau đó là :id_user thì trả về trang lỗi
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2>Phòng đang thuê</h2>
                        </div>
                    </div>
               </div>
            </div>  
        </div>
        <div className='row'>
            <PriceRoom data={(id_user,start_date,end_date) => handleFilterDate(id_user,start_date,end_date)}/>
            <ChartBill dataChart={dataChart} />
        </div>
    </>
  )
}

export default LayoutBill