import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ListDeleteRoom from './ListDeleteRoom';
import ListUpdateRoom from './ListUpdateRoom';

function PriceRoom({data}) {
    var user = JSON.parse(localStorage.getItem("user"));
    const id_user = user ? user[0].id : ''
    const [loadBill,setLoadBill] = useState([])
    const [getDate,setgetDate] = useState({
        start_date: "",
        end_date: ""
    })
    const {
        start_date,
        end_date
    } = getDate
    const handleChangeDate = (e) => {
        setgetDate({...getDate,[e.target.name]:e.target.value})
    }
    const getDataBill = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/bill/user/${id_user}`);
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
            data(id_user,start_date,end_date)
        }
    };
    // show trả phòng
    const [show, setShow] = useState(false);
    const handleClose = async() => {
        setShow(false) 
        const res = await axios.put(`http://127.0.0.1:8000/api/roomNumber/update_checkRoom/${id_user}`);
    }
    const handleShow = () => setShow(true);

  return (
    <>
    <div className="manage col-7">
        <div className="container">
            <ListUpdateRoom />
            <ListDeleteRoom />
            <div className="content_profile">
                <div className="row" style={{alignItems: 'center'}}>
                    <div className="col-3">
                        <h1><b className="b_title">Hóa đơn</b></h1>
                    </div>
                    <div className="col-3">
                        <span>Từ ngày </span><span>sss</span><span>đến</span><span>dd</span>
                    </div>
                </div>
                <div className="list-post"> 
                    <div className='row bill'>                         
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
                                            <i className="fa-solid fa-filter" ></i>
                                        </Button>          
                                    </div>
                                </div>  
                            </div>                             
                        </form>                                                
                    </div>                       
                    <div className='row bill '>
                        <div className='col-lg-12 col-sm-12'>
                            { loadBill.length > 0 && loadBill.map((bill,index) => {
                                return (
                                    <div className='billDetailItem container_bill' key={index}>
                                        <h3>Ngày {bill.created_at}</h3>
                                        <div>
                                            <span> Tiền điện : 
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bill.electricity_money)}
                                            </span> |
                                            <span>  Nước : 
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bill.water_money)}
                                            </span> |
                                            <span>  Tiền phòng : 
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bill.all_money)}
                                            </span>
                                        </div>
                                        <Link to={`/billdetail/${bill.id}`}>
                                            Xem chi tiết
                                        </Link>    
                                        <hr/>
                                    </div>
                                )})}
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
