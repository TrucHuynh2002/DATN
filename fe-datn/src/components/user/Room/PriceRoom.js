import React,  { useState,useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import axios from 'axios';


function PriceRoom() {
    const user = JSON.parse(localStorage.getItem("user"));
    const id_user = user ?  user[0].id : '';
    const [loadBill,setLoadBill] = useState([])
    const [getDate,setgetDate] = useState({
        start_date: "",
        end_date: ""
    })
    const {
        start_date,
        end_date
    } = getDate
    console.log(start_date,end_date)
    const handleChangeDate = (e) => {
        setgetDate({...getDate,[e.target.name]:e.target.value})
    }
    const getDataBill = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/bill/user/${id_user}`);
        
        console.log(res.data.data);
        setLoadBill(res.data.data)
    }

    useEffect(() => {
        getDataBill()
    },[])
    const handleFilterDate = async (e) => {
        e.preventDefault();
        const res = await axios.get(`http://127.0.0.1:8000/api/bill/user/${id_user}?start_date=${start_date}&&end_date=${end_date}`);
        if(res.data.status == true){
            setLoadBill(res.data.data)
        }
    }
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
                            <form onSubmit={(e) => handleFilterDate(e)} encType='multipart/form-data' >                       
                                <div className='col-lg-12 col-sm-12'>
                                    <div className='row' style={{flex:"0 1 100px"}}>
                                        <div className='col-lg-4 col-sm-12'>
                                            <input 
                                            type="date"
                                            name="start_date"
                                            className='form-control'
                                            onChange={e => handleChangeDate(e)}
                                            />                  
                                        </div>
                                        <div className='col-lg-4 col-sm-12'>
                                            <input type="date" name="end_date" className='form-control'   onChange={e => handleChangeDate(e)}/>                 
                                        </div>
                                        <div className='col-lg-4 col-sm-12'>
                                            <Button   
                                                variant="warning" 
                                                type="submit"
                                                style={{color: 'black', fontWeight: 600, borderRadius: '5px'}}> Lọc
                                                <i className="fa-solid fa-filter" 
                                                style={{marginLeft: '7px',width:"100%"}} 
                                                ></i>
                                            </Button>          
                                        </div>
                                    </div>  
                                </div>                             
                            </form>      
                                           
                        </div> 
                        
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
                                                        <Link to={`../billdetail/${bill.id}`}>
                                                            Xem chi tiết
                                                        </Link>    
                                                        <hr/>
                                                    </div>
                                               
                                               
                                            )
                                    })
                                }
                            
                            </div>
                            
                        </div> 
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default PriceRoom
