import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ListSendNoti() {
    // show detail sendnoti
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {id_user} = useParams();
    const [dataSendNoti, setDataSendNoti] = useState([]);
    const getDataSendNoti = async (e) => {
        let res= await axios.get(`http://127.0.0.1:8000/api/roomNumber/show_sendnoti/${id_user}`)   
        setDataSendNoti(res.data.data)
    }
    useEffect(() => {
        getDataSendNoti()
        return () => {
            getDataSendNoti()
        }
    },[])
    const handleCancelSendNoti = async (e, id_room_number) => {
        let res = await axios.post(`http://127.0.0.1:8000/api/roomNumber/cancelSendNoti/${id_room_number}`)
        if(res.data.status){
            getDataSendNoti()
        }
    }
    const handleDeletelSendNoti = async (e, id_room_number) => {
        let res = await axios.post(`http://127.0.0.1:8000/api/roomNumber/deleteSendNoti/${id_room_number}`)
        if(res.data.status){
            getDataSendNoti()
        }
    }

  return (
    <>
        <Table bordered>
            <thead>
            <tr>
                <th>#</th>
                <th>Tên yêu cầu</th>
                <th></th>
            </tr>
            </thead>
            
            <tbody className="list-cate">   
            { 
            dataSendNoti.length > 0 
                &&
                dataSendNoti.map((data,index) => {
                    return ( <>       
                <tr key={index}>
                    <td>{data.id}</td>
                    <td>Trả phòng</td>                       
                    <td>                      
                        <Button variant="outline-primary" name='' className="bx bx-detail btn-edit" onClick={handleShow}></Button>
                        <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={e => handleDeletelSendNoti(e,data.id)}></Button>
                    </td>
                </tr>  
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Xác nhận yêu cầu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>Tên người sở hữu: {data.full_name}</h2>
                    <h2>Số phòng: A{data.room_number}</h2>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={e => handleCancelSendNoti(e,data.id)}>
                    Xác nhận
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy bỏ
                </Button>
                </Modal.Footer>
                </Modal>
                </>  
                )})} 
            </tbody>
        </Table>
    </>
  )
}

export default ListSendNoti