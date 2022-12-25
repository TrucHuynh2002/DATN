import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { url } from '../../url';

function ListDeleteRoom() {
    const [show, setShow] = useState(false);
    const {id_user} = useParams();
    const [idRoomCancel,setIdRoomCancel] = useState('');
    const [alertCancel,setAlertCancel] = useState(false)
    const handleClose = () => {
        setShow(false);
        setAlertCancel(false)
    }
    const handleShow = (e,id_room,id_user_two) => {
        setShow(true)
        setIdRoomCancel(id_user_two)
    };
    const handleCancelRoom = async (e) => {
        let res = await axios.post(`${url}/roomNumber/update_checkRoom/${idRoomCancel}?_method=PUT`)
        if(res.data.status == true){          
            setAlertCancel(true)
        }
    } 
    const [dataBookingRoom,setDataBookingRoom] = useState([]);
    const getDataBookingRoom = async (e) => {
        let res= await axios.get(`${url}/roomNumber/get-booking-room/${id_user}`)   
        setDataBookingRoom(res.data.data)
    }
    useEffect(() => {
        getDataBookingRoom()
        return () => {
            getDataBookingRoom()
        }
    },[])

  return (
   
    <div className="container content_profile">
         <div className="col-md-12">
            <h1><b className="b_title">Danh sách phòng đang ở</b></h1>
        </div>
        <div className="list-post">
            <div className="row">
                <Table bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Họ tên</th>
                            <th>Số phòng</th>
                            <th>Tiền điện</th>
                            <th>Tiền nước</th>
                            <th>Tiền Phòng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="list-cate">      
                    {
                        dataBookingRoom.length > 0 
                        &&
                        dataBookingRoom.map((data,index) => {
                                return (
                                    <tr key={index}>
                                            <td>{index}</td>
                                            <td>{data.full_name}</td>
                                            <td>A{data.room_number}</td>
                                            <td>{data.electricity_price} đ</td>
                                            <td>{data.water_price} đ</td>                        
                                            <td>{data.room_price} đ</td>
                                            <td>                          
                                            <Button variant="outline-primary" name='' className="" onClick={e => handleShow(e,data.id,data.id_user_two)}>Trả phòng</Button>                                       
                                            </td>
                                    </tr>  
                                )
                                })}                           
                    </tbody>
                </Table>
                {/* start trả phòng */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Xác nhận trả phòng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Bạn có chắc chắn muốn trả phòng ?</p>
                    </Modal.Body>
                    <Modal.Footer>
                
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <div style={{paddingRight:"12px"}}>

                                    {
                                    alertCancel && <div className='text-success'>
                                    Đã gửi yêu cầu thành công
                                </div>

                            } 
                            </div>
                        <div>
                        <Button variant="secondary" onClick={e => handleCancelRoom(e)}>
                                Trả phòng
                            </Button>
                        </div>
                        </div>
                    
                    
                    </Modal.Footer>
                
                </Modal>
                {/* end trả phòng */}
            </div>
        </div>
    </div>
  )
}

export default ListDeleteRoom