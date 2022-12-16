import React,  { useState,useEffect } from 'react'
import ChartBill from './ChartBill';
import PriceRoom from './PriceRoom';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem("user"));
// if(!user){
//     window.location="https://localhost:3000/Loi";
// }


function LayoutBill() {
    // const [filter,setFilter] = useState({
    //     id_user: "",
    //     start_date: "",
    //     end_date:""
    // })
    
    // const {
    //     id_user,
    //     start_date,
    //     end_date
    // } = filter
    const [dataChart,setDataChart] = useState([]);
    
    const handleFilterDate = async (id_user,start_date, end_date) => {
        // e.preventDefault();
        const res = await axios.get(`http://127.0.0.1:8000/api/bill/user/${id_user}?start_date=${start_date}&&end_date=${end_date}`);
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