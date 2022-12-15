import React,  { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


function PriceRoom() {
    const user = JSON.parse(localStorage.getItem("user"));
    const id_user = user ?  user[0].id : '';
    const [loadBill,setLoadBill] = useState([])
    const getDataBill = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/bill/user/${id_user}`);
        
        console.log(res.data.data);
        setLoadBill(res.data.data)
    }

    useEffect(() => {
        getDataBill()
    },[])
  return (
    <>
        <div className="manage col-6">
            <div className="container">
                <div className="content_profile">
                    <div className="list-post">
                        <h1><b className="b_title">Hóa đơn</b></h1>
                        <div className='row bill'>
                            <div className='col-lg-4 col-sm-12'>
                                <span>Từ ngày </span><span>sss</span><span>đến</span><span>dd</span>
                            </div>

                            <div className='col-lg-8 col-sm-12'>
                                <div className='row'>
                                    <div className='col-lg-6 col-sm-12'>
                                        <input type="date" name="" className='form-control'/>                  
                                    </div>
                                    <div className='col-lg-6 col-sm-12'>
                                        <input type="date" name="" className='form-control'/>                 
                                    </div>
                                </div>  
                            </div>
                        </div> 
                        <hr></hr>
                    </div>

                    <div className="list-post">
                       
                        <div className='row bill'>
                            <div className='col-lg-12 col-sm-12'>
                                {
                                    loadBill.length > 0 
                                    &&
                                    loadBill.map((bill,index) => {
                                            return (
                                                <div className='billDetailItem'>
                                                    <h3>Ngày {bill.created_at}</h3>
                                                    <div>
                                                        <span>Tiền điện: {bill.electricity_money}đ</span> |
                                                        <span> Nước: {bill.water_money}đ</span> |
                                                        <span> Tiền phòng: {bill.all_money}tr</span>
                                                    </div>
                                                </div>
                                            )
                                    })
                                }
                            
                            </div>
                            
                        </div> 
                        <hr/>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default PriceRoom
