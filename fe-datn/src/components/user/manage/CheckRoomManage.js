import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { url } from '../../url';
import { useParams,useNavigate } from 'react-router-dom';
import { TabTitle } from '../../title';

function CheckRoomManage() {
    TabTitle('Cập nhật phòng đặt cọc');
    const {id_roomNumber} = useParams();
    const navigate = useNavigate();
    const user = JSON.parse( localStorage.getItem('user'));
    if(!user || user[0].role == 0 || user[0].role == 2){
        navigate('../')
    }

    if(!id_roomNumber){
        navigate('../loi')
    }

    const [data,setData] = useState({});
const getDataRoomBooking = async () => {
    const res = await axios.get(`${url}/roomNumber/check-room-number/${id_roomNumber}`);
    setData(res.data)
}

// const [alertBookingRoom,setAlertBookingRoom] = useState(0);
const handleBookingRoom = async () => {
    // let res =  await axios.get(`${url}/roomNumber/updateRoomNumber/${id_roomNumber}`);
}

useEffect(() => {
   getDataRoomBooking(); 
},[])
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2 className="b_title">Cập nhật phòng đặt cọc</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='manage row'>
            <div className="container content_profile">
                <div className="list-post checkroom">
                    <div className='col-lg-12'>
                        <h1>Thông tin người thuê phòng</h1>
                        <div className='avatar' style={{width:'240px',height:'240px',margin:'24px auto'}}>
                            <img 
                            src={data.OnwerBookingRoom ? data.OnwerBookingRoom.link_img_user : ''}
                             alt={!data.OnwerBookingRoom ? '' : data.OnwerBookingRoom.full_name}
                             style={{width:'100%',height:'100%',borderRadius:'50%'}}
                            />
                        </div>
                        <h3>Tên người thuê phòng : <strong>{data.OnwerBookingRoom ? data.OnwerBookingRoom.full_name : ''}</strong></h3>
                        <h3>Số điện thoại :<strong>{!data.OnwerBookingRoom ? '' : data.OnwerBookingRoom.phone}</strong></h3>
                        <h3>Email :  <strong>{!data.OnwerBookingRoom ? '' : data.OnwerBookingRoom.email}</strong></h3>
                        {/* <h3>Địa chỉ :  Ninh Kiều, Cần Thơ</h3> */}
                    </div>   
                    <hr />             
                    <div className='col-lg-12'>
                        <h1><strong>Thông tin phòng trọ</strong></h1>
                        <h3>Tên chủ phòng : A0{! data.OnwerBookingRoom ? '' : data.OnwerBookingRoom.room_number}</h3>
                        <h3>Tên phòng : phòng trọ cần thơ</h3>
                        <h3>Số phòng : A7</h3>
                        <h3>Tiền phòng : {data.OnwerBookingRoom ? data.OwnerPostRoom.room_price : ''} đ</h3>
                        <h3>Tiền nước : {data.OnwerBookingRoom ? data.OwnerPostRoom.electricity_price : ''}  đ</h3>
                        <h3>Tiền điện : {data.OnwerBookingRoom ? data.OwnerPostRoom.water_price : ''} đ</h3>
                    </div>                   
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0'}}>
                   <div>
                   <button   onclick={123} className="btn btn-primary">Xác nhận cho thuê</button>
                   </div>
                    <button style={{display:"block"}} id="room_number_button" className="btn btn-danger">Hủy Bỏ</button>

            </div>
               
            </div>
          
        </div>
    </>
  )
}

export default CheckRoomManage