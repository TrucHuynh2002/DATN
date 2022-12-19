import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function ListUpdateRoom() {
    const [show, setShow] = useState(false);
    const {id_user} = useParams();
    const [dataBookingRoom,setDataBookingRoom] = useState([]);
    const getDataBookingRoom = async (e) => {
        let res= await axios.get(`http://127.0.0.1:8000/api/roomNumber/booking_room/${id_user}`)
        setDataBookingRoom(res.data.data)
    }
    const CancelBookingRoom = async (e,id_room) => {        
        let res= await axios.get(`http://127.0.0.1:8000/api/roomNumber/checkout/${id_room}`)
        if(res.data.status == true){
            getDataBookingRoom();
        }
    }
    useEffect(() => {
        getDataBookingRoom()
    },[])
  return (
    <>
        <div className="container content_profile">
        <div className="row">
            <div className="col-md-12">
                <h1><b className="b_title">Danh sách phòng đang đặt</b></h1>
            </div>
            <div className="list-post">
            <Table bordered>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên phòng</th>
                        <th>Số phòng</th>
                        <th>Chủ phòng</th>
                        <th></th>
                    </tr>
                    </thead>
                
                    <tbody className="list-cate">    
                    {
                        dataBookingRoom.length > 0 
                        ? dataBookingRoom.map((data,index) => {
                           return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{data.post_name}</td>
                                    <td>A{data.room_number}</td>
                                    <td>{data.full_name}</td>
                                    <td>                          
                                        <Button variant="outline-danger" name='' className="" onClick={e => CancelBookingRoom(e,data.id)}>Hủy bỏ</Button>                                        
                                    </td>
                                </tr>  
                           )
                        })
                        :
                        <tr align="center">
                            <td colSpan={5}>Trống</td>
                        </tr>  
                    }               
                       
                    </tbody>
                    </Table>
            </div>
        </div>
        </div>
    </>
  )
}

export default ListUpdateRoom