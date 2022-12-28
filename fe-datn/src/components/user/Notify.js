import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { url } from '../url';

function Notify({onClick}) {
    var user = JSON.parse(localStorage.getItem("user"));
    const id_user = user ? user[0].id : 0;
    const [listnotifyfavorite, setListnotifyfavorite] = useState([]);
    const [listnotifyInteractive, setListnotifyInteractive] = useState([]);
    const [listnotifyQa, setListnotifyQa] = useState([]);
    const [listBillUser,setListBillUser] = useState([]);
    const [listImg, setListImg] = useState([]);
    useEffect(() => {
        getData(); 
        return () => {
            getData();
      
        }
    },[]);
        // NOTIFY QA
    const [commentPostOwnerParent,setCommentPostOwnerParent] = useState([]);
    const [commentPostOwnerChild,setCommentPostOwnerChild] = useState([]);
    // xoa notify
    const deletenotify = async (id_notify_favorite) => {
        await axios.delete(`${url}/notify/delete/${id_notify_favorite}`);   
    };
    // danh sach notify comment
    const getData = async () => {
        if(id_user){
            const res = await axios.get(`${url}/noty_qa/show/${id_user}`);
            setListnotifyQa(res.data.data);
            const notifyInteractive = await axios.get(`${url}/notify_interactive/show/${id_user}`);
            setListnotifyInteractive(notifyInteractive.data.data);
            const ress = await axios.get(`${url}/comment/qa-comment-owner/${id_user}`);
            // setListnotifyInteractive(res.data.data);
            if(ress.data.status){
                setCommentPostOwnerParent(res.data.dataParent);
                setCommentPostOwnerChild(res.data.dataChild);
            }
        }
      // Noti notifyInteractive
        if(id_user != 0){
            const res = await axios.get(`${url}/notify_interactive/show/${id_user}`);
            setListnotifyInteractive(res.data.data);
        }
        const res = await axios.get(`${url}/user/showimg`);
        setListImg(res.data.data); 
        // Noti Bill
        const BillUser = await axios.get(`${url}/bill/user/${id_user}`);
        if(BillUser.data.status == true){
            setListBillUser(BillUser.data.data);
        }
        getNotify()     
    };
    // xoa notify interactive
    const deletenotifyInteractive = async (id_notify_interactive) => {
        await axios.delete(`${url}/notify/delete/${id_notify_interactive}`);
        getData();
    };

    const [Notification, setNotification] = useState([]);
    const [notificationUnread,setNotificationUnread] = useState([]);

    const getNotify = async () => {
        const res = await axios.get(`${url}/notify/${id_user}`)
        if(res.data.status){
            setNotification(res.data.data)
            setNotificationUnread(res.data.notificationUnread)
        }
        setNotification(res.data.data)
        setNotificationUnread(res.data.notificationUnread)
    }
    const [handleBooking,setHandleBooking] = useState(false);
    const handleBookingRoom = async (e,id_roomNumber,id_userBooking,id_notification) => {
        // let formData = new FormData();
        // formData.append('id_user_two',id_userBooking)
        // formData.append('id_notification',id_notification)
        let res = await axios.get(`${url}/roomNumber/updateRoomNumber/${id_roomNumber}?id_notification=${id_notification}&&id_user_two=${id_userBooking}`);
        setHandleBooking(true)
    }

    const handleCancelBookingRoom = async (e,id_roomNumber,id_notification) => {
        let res = await axios.get(`${url}/roomNumber/cancel-booking-room/${id_roomNumber}?id_notification=${id_notification}`);
        setHandleBooking(true)
    }

    const handleMaskRead = async (e,id_notification) => {
        let res = await axios.get(`${url}/notify/mask-as-read-id-noti/${id_notification}`);
        if(res.data.status == true){
            getNotify()  
            onClick()   
        }
    }

    const [Hidden,setHidden] = useState(0);

    return (
        <div className="dropdown-menu" style={{zIndex:"1001",padding:"10px"}}>
            <ul className="nav nav-tabs" id="myTab" aria-label="notification" role="tablist">
                <li className="nav-item">
                    <a className="nav-link nav-item-link active" tabIndex="-1" id="notify-tab" data-toggle="tab" href="#notify" role="tab" aria-controls="notify" aria-selected="false">THÔNG BÁO </a>
                </li>
                {/* <li className="nav-item">
                    <a className="nav-link nav-item-link" tabIndex="-1" id="notify-tab" data-toggle="tab" href="#bill" role="tab" aria-controls="notify" aria-selected="false">Hóa đơn </a>
                </li> */}
            </ul>
            <div className="tab-content" id="myTabContent" style={{ marginTop:"10px", height:"300px", overflow:"hidden", overflowY:"scroll"}}>
                <div className="aw__t16jo35 tab-pane fade show active" id="notify" role="tabpanel" aria-labelledby="notify-tab">
                    {!localStorage.getItem('user') ?
                        <div className="">
                            <div>Vui lòng đăng nhập để xem thông báo.</div>
                        </div>
                        : 
                        (
                            <>
                                <div className="notifyInteractive">
                                    { Notification.length > 0 && Notification.map((noti,index) => {
                                        if(noti.type == "App\\Notifications\\CommentPostNotification"){
                                            if(noti.data.Comment.id_user == id_user){
                                                return ''
                                            }else{
                                                return (
                                                    <div className="row row_noty" key={index} >
                                                        <div className="col-3 col_3_img">
                                                            <img src={noti.data.Comment.link_img_user} alt='' className="img" />
                                                        </div>
                                                        <div  className={noti.read_at == null ?'textNoti textNotiMaskRead textMdLeft col-9 col-9'  : 'textNoti col-9' } >
                                                        <Link to={`../profile/${noti.data.Comment.id_user}`} className='link_noti'>
                                                            <span>{noti.data.Comment.full_name}</span>
                                                        </Link> Vừa bình luận phòng trọ 
                                                        <Link to={`../roomdetail/${noti.data.post.id_post}`} className='link_noti'>
                                                            <span> {noti.data.post.post_name}</span>
                                                        </Link> của bạn 
                                                        </div>
                                                    </div>
                                                    
                                                )
                                            }
                                        }
                                        if(noti.type == "App\\Notifications\\ReplyCommentPostNotification"){
                                            if(noti.data.Comment.id_user != id_user){
                                                if(noti.data.replyCmt.id_user == id_user){
                                                    return  (
                                                        <div className="row row_noty" key={index} >
                                                            <div className="col-3 col_3_img">
                                                                <img src={noti.data.Comment.link_img_user} alt='' className="img" />
                                                            </div>
                                                            <div  className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' : 'textNoti'} >
                                                                <Link to={`../profile/${noti.data.Comment.id_user}`} className='link_noti'>
                                                                    <span>{noti.data.Comment.full_name}</span></Link> Vừa trả lời bình luận của bạn tại bài viết 
                                                                <Link to={`../roomdetail/${noti.data.post.id_post}`} className='link_noti'>
                                                                    <span> {noti.data.post.post_name} </span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                else if(noti.data.Comment.id_user == noti.data.replyCmt.id_user){
                                                    return (
                                                        <div className="row row_noty" key={index} >
                                                            <div className="col-3 col_3_img">
                                                                <img src={noti.data.Comment.link_img_user} alt='' className="img" />
                                                            </div>
                                                            <div  className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' :  'textNoti col-9'}>
                                                                <Link to={`../profile/${noti.data.Comment.id_user}`} className='link_noti'>
                                                                    <span>{noti.data.Comment.full_name}</span>
                                                                </Link>  
                                                                <Link to={`../roomdetail/${noti.data.post.id_post}`} className='link_noti'>
                                                                    <span> {noti.data.post.post_name}</span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                else{
                                                    return (
                                                        <div className="row row_noty" key={index} onClick={e => handleMaskRead(e,noti.id)}>
                                                            <div className="col-3 col_3_img">
                                                                <img src={noti.data.Comment.link_img_user} alt='' className="img" />
                                                            </div>
                                                            <div  className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' :  'textNoti col-9'}>
                                                                <Link to={`../profile/${noti.data.Comment.id_user}`} className='link_noti'>
                                                                <span>{noti.data.Comment.full_name}</span>
                                                                </Link> Vừa trả lời bình luận 
                                                                <Link to={`../profile/${noti.data.post.id_user}`} className='link_noti'>
                                                                    <span> {noti.data.replyCmt.full_name}</span>
                                                                </Link>  bài viết 
                                                                <Link to={`../roomdetail/${noti.data.post.id_post}`} className='link_noti'>
                                                                    <span> {noti.data.post.post_name}</span>
                                                                </Link> của bạn 
                                                            </div>
                                                        </div>
                                                    )
                                                }                                      
                                            }
                                        }
                                        if(noti.type == "App\\Notifications\\ReplyParentCommentNotification"){
                                                if(noti.data.Comment.id_user != id_user) {
                                                    return (
                                                        <div className="row row_noty"  key={index} onClick={e => handleMaskRead(e,noti.id)}>
                                                            <div className="col-3 col_3_img">
                                                                <img src={noti.data.Comment.link_img_user} alt='' className="img" />
                                                            </div>
                                                            <div  className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' :  'textNoti col-9'}>
                                                                <Link to={`../profile/${noti.data.Comment.id_user}`} className='link_noti'>
                                                                    <span>{noti.data.Comment.full_name}</span>
                                                                </Link> Vừa trả lời bình luận của bạn tại bài viết 
                                                                <Link to={`../roomdetail/${noti.data.post.id_post}`} className='link_noti'>
                                                                    <span> {noti.data.post.post_name}</span>
                                                                </Link>
                                                            </div>
                                                        </div>  
                                                    )
                                                }
                                        }
                                        if(noti.type == "App\\Notifications\\CommentQANotification"){
                                            if(noti.data.Comment.id_user != id_user){
                                                return (
                                                    <div className="row row_noty" key={index} onClick={e => handleMaskRead(e,noti.id)}>
                                                        <div className="col-3 col_3_img">
                                                            <img src={noti.data.Comment.link_img_user} alt='' className="img" />
                                                        </div>
                                                        <div  className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' :  'textNoti col-9'}>
                                                            <Link to={`../profile/${noti.data.qa.id_user}`} className='link_noti'>
                                                                <span>{noti.data.Comment.full_name}</span>
                                                            </Link> Vừa bình luận bài viết trên 
                                                            <Link to={`../qaDetail/${noti.data.qa.id_qa}`} className='link_noti'>
                                                                <span> Hỏi - Đáp</span>
                                                            </Link> của bạn 
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }
                                        if(noti.type == "App\\Notifications\\ReplyCommentQANotification"){
                                            if(noti.data.replyCmt.id_user == id_user){
                                                return  (
                                                    <div className="row row_noty" key={index} onClick={e => handleMaskRead(e,noti.id)}>
                                                        <div className="col-3 col_3_img">
                                                            <img src={noti.data.Comment.link_img_user} alt='' className="img" />
                                                        </div>
                                                        <div  className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' :  'textNoti col-9'}>
                                                            <Link to={`../profile/${noti.data.qa.id_user}`} className='link_noti'>
                                                                <span>{noti.data.Comment.full_name}</span>
                                                            </Link> Vừa trả lời bình luận của bạn trên 
                                                            <Link to={`../qaDetail/${noti.data.qa.id_qa}`} className='link_noti'>
                                                                <span> Hỏi - Đáp </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            if(noti.type == "App\\Notifications\\NotificationOwnerPost"){
                                                if(noti.data.ownerPost.id_user == id_user &&  noti.read_at == null){
                                                    return(
                                                        <div key={index} className='listBookingRoom'>
                                                            <Link to={`../checkroom/${noti.data.ownerPost.id}`} onClick={e => handleMaskRead(e,noti.id)} >
                                                                <div className={ noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft' :  'textNoti col-9'}>
                                                                    <strong>{noti.data.ownerBookingRoom.full_name}</strong> Vừa đặt phòng <strong>A0{noti.data.ownerPost.room_number}</strong> tại 
                                                                    <strong>{noti.data.ownerPost.post_name}</strong> của bạn 
                                                                </div>
                                                            </Link>
                                                            { noti.read_at == null && handleBooking == false &&
                                                                <div className='btn-handle-booking-room'>
                                                                    <div className='btn-handle-accept-booking-room'>
                                                                        <div 
                                                                        className='btn btn-outline-primary' 
                                                                        onClick={e => handleBookingRoom(e,noti.data.ownerPost.id,noti.data.ownerBookingRoom.id_user,noti.id)} >
                                                                            Chấp nhận
                                                                        </div>
                                                                    </div>
                                                                    <div className='btn-handle-cancel-booking-room'>
                                                                        <div 
                                                                        className='btn btn-outline-danger' 
                                                                        onClick={e => handleCancelBookingRoom(e,noti.data.ownerPost.id,noti.id)}>
                                                                            Từ chối
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                            }   
                                                            { handleBooking &&
                                                                <div className='text-muted'>
                                                                    Lựa chọn thành công
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                }                                  
                                            }
                                            if(noti.type == "App\\Notifications\\UpdateRoomNumber"){
                                                return   (
                                                    <Link to={`../layoutSendNoti/${id_user}`} className='link_noti' onClick={e => handleMaskRead(e,noti.id)}>
                                                        <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft' :  'textNoti col-9'}>
                                                            <strong>{noti.data.subject.full_name} </strong> Vừa yêu cầu trả phòng phòng số 
                                                            <strong> {noti.data.roomnumber.room_number} </strong> tại bài viết 
                                                            <strong> {noti.data.roomnumber.post_name}</strong>
                                                        </div>
                                                    </Link>
                                                )
                                            }
        
                                            if(noti.type == "App\\Notifications\\ReplyUpdateRoomDelete"){
                                            if(noti.data.Comment.id_user == noti.data.replyCmt.id_user && noti.data.Comment.id_user != id_user){
                                                return  (
                                                    <div className="row row_noty" key={index} onClick={e => handleMaskRead(e,noti.id)}>
                                                        <div className="col-3 col_3_img">
                                                            <img src={noti.data.Comment.link_img_user} alt='' className="img" />
                                                        </div>
                                                        <div  className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' : 'textNoti col-9'}>
                                                            <Link to={`../profile/${noti.data.qa.id_user}`} className='link_noti'>
                                                                <span>{noti.data.Comment.full_name}</span>
                                                            </Link> Vừa trả lời bình luận của chính mình tại bài viết của bạn trên 
                                                            <Link to={`../qaDetail/${noti.data.qa.id_qa}`} className='link_noti'>
                                                                <span> Hỏi - Đáp</span>
                                                            </Link> của bạn.
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            }
                                            
                                            if(noti.data.Comment.id_user != noti.data.replyCmt.id_user && noti.data.Comment.id_user != id_user){
                                                return  (
                                                    <div className="row row_noty" key={index} onClick={e => handleMaskRead(e,noti.id)}>
                                                        <div className="col-3 col_3_img">
                                                            <img src={noti.data.Comment.link_img_user} alt='' className="img" />
                                                        </div>
                                                        <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' : ''} >
                                                            <Link to={`../profile/${noti.data.qa.id_user}`} className='link_noti'>
                                                                <span>{noti.data.Comment.full_name}</span>
                                                            </Link> Vừa trả lời bình luận 
                                                            <Link to={`../profile/${noti.data.qa.id_user}`} className='link_noti'>
                                                                <span>{noti.data.replyCmt.full_name}</span>
                                                            </Link>  bài viết của bạn trên 
                                                            <Link to={`../qaDetail/${noti.data.qa.id_qa}`} className='link_noti'>
                                                                <span> Hỏi - Đáp</span>
                                                            </Link> 
                                                        </div>
                                                    </div>
                                                )
                                            }                                       
                                            return  (
                                                <div className="row row_noty" key={index} onClick={e => handleMaskRead(e,noti.id)}>
                                                    <div className="col-3 col_3_img">
                                                        <img src={noti.data.Comment.link_img_user} alt='' className="img" />
                                                    </div>
                                                    <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' : 'textNoti col-9'}
                                                    >
                                                        <Link to={`../profile/${noti.data.qa.id_user}`} className='link_noti'>
                                                            <span>{noti.data.Comment.full_name}</span>
                                                        </Link> Vừa trả lời bình luận 
                                                        <Link to={`../profile/${noti.data.qa.id_user}`} className='link_noti'>
                                                            <span>{noti.data.replyCmt.full_name}</span>
                                                        </Link> bài viết của bạn trên 
                                                        <Link to={`../qaDetail/${noti.data.qa.id_qa}`} className='link_noti'>
                                                            <span> Hỏi - Đáp</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        }    
                                        if(noti.type == "App\\Notifications\\ReplyParentCommentQA"){
                                            if(noti.data.replyCmt.id_user == id_user){
                                                return   (
                                                    <div className="row row_noty" key={index} onClick={e => handleMaskRead(e,noti.id)}>
                                                        <div className="col-3 col_3_img">
                                                            <img src={noti.data.Comment.link_img_user} alt='' className="img" />
                                                        </div>
                                                        <div  className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' :  'textNoti col-9'}>
                                                            <Link 
                                                            to={`../profile/${noti.data.qa.id_user}`} 
                                                            className='link_noti'>
                                                                <span>{noti.data.Comment.full_name}</span>
                                                            </Link> 
                                                            Vừa trả lời bình luận của bạn tại bài viết 
                                                            <Link to={`../qaDetail/${noti.data.qa.id_qa}`} className='link_noti'>
                                                                <span> Hỏi - Đáp</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }
                                        if(noti.type == "App\\Notifications\\NotificationOwnerPost"){
                                            if(noti.data.ownerPost.id_user == id_user &&  noti.read_at == null){
                                                return(
                                                    <div className="row row_noty" key={index}>
                                                        <div  className='listBookingRoom'>
                                                            <Link to={`../checkroom/${noti.data.ownerPost.id}`} onClick={e => handleMaskRead(e,noti.id)} >
                                                                <div className={ noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' :  'textNoti col-9'}>
                                                                    <span>{noti.data.ownerBookingRoom.full_name}</span> Vừa đặt phòng <span>A0{noti.data.ownerPost.room_number}</span> tại 
                                                                    <span>{noti.data.ownerPost.post_name}</span> của bạn 
                                                                </div>
                                                            </Link>
                                                            { noti.read_at == null && handleBooking == false &&
                                                                <div className='btn-handle-booking-room'>
                                                                    <div className='btn-handle-accept-booking-room'>
                                                                        <div 
                                                                        className='btn btn-outline-primary' 
                                                                        onClick={e => handleBookingRoom(e,noti.data.ownerPost.id,noti.data.ownerBookingRoom.id_user,noti.id)} >
                                                                            Chấp nhận
                                                                        </div>
                                                                    </div>
                                                                    <div className='btn-handle-cancel-booking-room'>
                                                                        <div 
                                                                        className='btn btn-outline-danger' 
                                                                        onClick={e => handleCancelBookingRoom(e,noti.data.ownerPost.id,noti.id)}>
                                                                            Từ chối
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                            }   
                                                            { handleBooking &&
                                                                <div className='text-muted'>
                                                                    Lựa chọn thành công
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }                                  
                                        }
                                        if(noti.type == "App\\Notifications\\UpdateRoomNumber"){
                                            return   (
                                                <div className="row row_noty" key={index} onClick={e => handleMaskRead(e,noti.id)}>
                                                    <Link to={`../layoutSendNoti/${id_user}`} className='link_noti' 
                                                    onClick={e => handleMaskRead(e,noti.id)}>
                                                        <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-12' :  'textNoti col-9'}>
                                                            <span>{noti.data.subject.full_name} </span> Vừa yêu cầu trả phòng phòng số 
                                                            <span> {noti.data.roomnumber.room_number} </span> tại bài viết 
                                                            <span> {noti.data.roomnumber.post_name}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        }
                                        if(noti.type == "App\\Notifications\\ReplyUpdateRoomDelete"){
                                            return  (
                                                <div className="row row_noty" key={index}>
                                                    <Link to={`../layoutBill/${id_user}`}className='link_noti'onClick={e => handleMaskRead(e,noti.id)}>
                                                        <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' :  'textNoti col-9'}>
                                                            Yêu cầu trả phòng của bạn không thành công
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        }
                                        if(noti.type == "App\\Notifications\\ReplyUpdateRoomCancel"){
                                            return  (
                                                <div className="row row_noty" key={index} onClick={e => handleMaskRead(e,noti.id)}>
                                                    <Link to={`../layoutBill/${id_user}`} className='link_noti' onClick={e => handleMaskRead(e,noti.id)}>
                                                        <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' :  'textNoti col-9'} onClick={e => handleMaskRead(e,noti.id)}>
                                                            Yêu cầu trả phòng của bạn thành công
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        }
                                        if(noti.type == "App\\Notifications\\RatePostNotification"){
                                            return   (
                                                <div className="row row_noty" key={index} onClick={e => handleMaskRead(e,noti.id)}>
                                                    <div className="col-3 col_3_img">
                                                        <img src={noti.data.user.link_img_user} alt='' className="img" />
                                                    </div>
                                                    <Link to={`../roomdetail/${noti.data.user_two.id_post}`} className='link_noti' onClick={e => handleMaskRead(e,noti.id)}>
                                                        <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' :  'textNoti col-9'} onClick={e => handleMaskRead(e,noti.id)}>
                                                            <span>{noti.data.user_two.full_name} </span> 
                                                            Vừa đánh giá bài viết 
                                                            <span> {noti.data.user.post_name} </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        }
                                        if(noti.type == "App\\Notifications\\NotificationOwnerBookingRoom"){
                                            if(noti.data.ownerBookingRoom.id_user != id_user){
                                                if(noti.data.status ==  '2') {
                                                    return (
                                                        <div className="row row_noty" key={index} onClick={e => handleMaskRead(e,noti.id)}>
                                                            <div 
                                                                onClick={e => handleMaskRead(e,noti.id)} 
                                                                className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' :  'textNoti col-9'}>
                                                                    Chúc mừng bạn đã đặt phòng thành công phồng số 
                                                                <span>A0{noti.data.ownerBookingRoom.room_number}</span> tại bài viết 
                                                                <span>{noti.data.ownerBookingRoom.post_name}</span> 
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                if(noti.data.status ==  '0' ) {
                                                    return (
                                                        <div className="row row_noty" key={index}>
                                                            <div 
                                                            onClick={e => handleMaskRead(e,noti.id)} 
                                                            className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' :  'textNoti col-9'}
                                                            > Đặt phòng 
                                                                <span>A0{noti.data.ownerBookingRoom.room_number}</span> tại bài viết <span>{noti.data.ownerBookingRoom.post_name}</span> thất bại 
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }
                                        }
                                        if(noti.type == "App\\Notifications\\BillNotification"){
                                            return (
                                                <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft col-9' :  'textNoti col-9'} onClick={e => handleMaskRead(e,noti.id)}>
                                                    Bạn vừa nhận được hóa đơn tháng 
                                                    <span>{moment(noti.data.bill.created_at).local().format('MM')}</span>
                                                </div>
                                            )
                                        }
                                    })}
                                </div> 
                            </>
                        )
                    }
                </div>
              
            </div> 
        </div>
    )
}

export default Notify