    import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { url } from '../../url';

function ListSendNoti() {
    // show detail sendnoti
    const [show, setShow] = useState(false);
    const [alertCancel,setAlertCancel] = useState(false)
    const [alertMess,setAlertMess] = useState(false)
    const handleClose = () =>{ 
        setShow(false);
        getDataSendNoti()
    };
    const handleShow = () => setShow(true);
    const {id_user} = useParams();
    const [dataSendNoti, setDataSendNoti] = useState([]);
    const getDataSendNoti = async (e) => {
        let res= await axios.get(`${url}/roomNumber/show_sendnoti/${id_user}`)   
        setDataSendNoti(res.data.data)
    }
    useEffect(() => {
        getDataSendNoti()
        return () => {
            getDataSendNoti()
        }
    },[])
    const handleCancelSendNoti = async (e, id_room_number) => {
        let res = await axios.post(`${url}/roomNumber/cancelSendNoti/${id_room_number}`)
        if(res.data.status){
 
            setAlertMess(true)
        }
    }
    const handleDeletelSendNoti = async (e, id_room_number) => {
        let res = await axios.post(`${url}/roomNumber/deleteSendNoti/${id_room_number}`)
        if(res.data.status){
            getDataSendNoti()
        }
    }

  return (
    <>
     { dataSendNoti.length > 0 
      ?
        dataSendNoti.map((data,index) => {
            return (  
                <Table bordered>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên yêu cầu</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody className="list-cate">   
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
                        { alertMess &&
                                <div className='text-success'>
                                    Đã xác nhận trả phòng thành công
                                </div>
                        } 
                        <button className='btn btn-primary' variant="primary" onClick={e => handleCancelSendNoti(e,data.id)}>
                            Xác nhận
                        </button>
                        <Button variant="secondary" onClick={handleClose}>
                            Hủy bỏ
                        </Button>
                        </Modal.Footer>
                        </Modal>
                    
                    
                    </tbody>
                </Table>
            )})
    :  <div className="text-center No_user____" >
        <img className="img_________" src="https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A3nh-icon-bu%E1%BB%93n-mu%E1%BB%91n-kh%C3%B3c-1024x1024.jpg" alt="images" />
        <p>Chưa có yêu cầu nào </p>
    </div>
    } 
    </>
  )
}

export default ListSendNoti