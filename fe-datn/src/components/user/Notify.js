import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { url } from '../url';

function Notify() {
    var user = JSON.parse(localStorage.getItem("user"));
    // const id_userRole = user ? user[0].role : 0;
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
        const res = await axios.get(`http://127.0.0.1:8000/api/notify/${id_user}`)
        console.log(res.data)
        setNotification(res.data.data)
        setNotificationUnread(res.data.notificationUnread)
    }
    const [handleBooking,setHandleBooking] = useState(false);
    const handleBookingRoom = async (e,id_roomNumber,id_userBooking,id_notification) => {
        console.log(id_notification)
        // let formData = new FormData();
        // formData.append('id_user_two',id_userBooking)
        // formData.append('id_notification',id_notification)
        let res = await axios.get(`http://127.0.0.1:8000/api/roomNumber/updateRoomNumber/${id_roomNumber}?id_notification=${id_notification}`);
        setHandleBooking(true)
    }

    const handleCancelBookingRoom = async (e,id_roomNumber,id_notification) => {
        let res = await axios.get(`http://127.0.0.1:8000/api/roomNumber/cancel-booking-room/${id_roomNumber}?id_notification=${id_notification}`);
        setHandleBooking(true)
    }
        
    return (
    <div className="dropdown-menu" style={{zIndex:"1001",padding:"10px"}}>
    <ul className="nav nav-tabs" id="myTab" aria-label="notification" role="tablist">
        <li className="nav-item">
            <a className="nav-link nav-item-link active" tabIndex="-1" id="notify-tab" data-toggle="tab" href="#notify" role="tab" aria-controls="notify" aria-selected="false">THÔNG BÁO </a>
        </li>
    </ul>
    <div className="tab-content" id="myTabContent" style={{ marginTop:"10px"}}>
        <div className="aw__t16jo35 tab-pane fade show active" id="notify" role="tabpanel" aria-labelledby="notify-tab">
            {!localStorage.getItem('user') ?
                <div className="">
                    <div>Vui lòng đăng nhập để xem thông báo.</div>
                </div>
                : 
                (
                <>
                    <div className="notifyInteractive">
                        {
                            Notification.length > 0 && Notification.map((noti,index) => {
                                // if(noti.type == "App\\Notifications\\ReplyParentCommentNotification"){
                                //     if(noti.data.Comment.id_user != id_user){
                                //         if(noti.data.Comment.id_user == noti.data.replyCmt.id_user){
                                //             return <div>{noti.data.Comment.full_name} Vừa phản hồi bình luận của chính anh ấy</div>
                                //         }
                                      
                                //         else{
                                //             return <div>{noti.data.Comment.full_name} Vừa phản hồi bình luận của của {noti.data.replyCmt.full_name} trên bài viết {noti.data.post.post_name} của bạn</div>
                                //         }
                                //     }
                                // }
                                // if(noti.type == "App\\Notifications\\ReplyCommentPostNotification"){
                                //     if(noti.data.Comment.id_user != id_user){
                                //         return <div>{noti.data.Comment.full_name} vừa trả lời bình luận của {noti.data.replyCmt.full_name} trên bài viết {noti.data.post_name} của bạn</div>
                                //     }
                                // }

                                if(noti.type == "App\\Notifications\\CommentPostNotification"){
                                    if(noti.data.Comment.id_user == id_user){
                                        return ''
                                    }else{
                                        return <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft' : 'textNoti'}><strong>{noti.data.Comment.full_name}</strong> Vừa bình luận phòng trọ <strong> {noti.data.post.post_name}</strong> của bạn </div>
                                    }
                                }

                                if(noti.type == "App\\Notifications\\ReplyCommentPostNotification"){
                                    if(noti.data.Comment.id_user != id_user){
                                        if(noti.data.replyCmt.id_user == id_user){
                                            return  <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft' : 'textNoti'}><strong>{noti.data.Comment.full_name}</strong> Vừa trả lời bình luận của bạn tại bài viết <strong>{noti.data.post.post_name}</strong> </div>
                                        }
                                        else if(noti.data.Comment.id_user == noti.data.replyCmt.id_user){
                                            return  <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft' : 'textNoti'}><strong>{noti.data.Comment.full_name}</strong> Vừa trả lời bình luận của chính mình tại bài viết <strong>{noti.data.post.post_name}</strong> </div>
                                        }
                                        else{
                                            return  <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft' : 'textNoti'}><strong>{noti.data.Comment.full_name}</strong> Vừa trả lời bình luận <strong>{noti.data.replyCmt.full_name}</strong>  bài viết <strong>{noti.data.post.post_name}</strong> của bạn </div>
                                        }
                                       
                                    }
                                }
                                if(noti.type == "App\\Notifications\\ReplyParentCommentNotification"){
                                    
                                        if(noti.data.Comment.id_user != id_user){
                                            return   <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft' : 'textNoti'}>{noti.data.Comment.full_name} Vừa trả lời bình luận của bạn tại bài viết {noti.data.post.post_name} </div>
                                        }
                                }

                                if(noti.type == "App\\Notifications\\CommentQANotification"){
                                    if(noti.data.Comment.id_user != id_user){
                                        return <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft' : 'textNoti'}><strong>{noti.data.Comment.full_name}</strong> Vừa bình luận bài viết trên <strong>Hỏi - Đáp</strong>  của bạn </div>
                                    }
                                }

                                if(noti.type == "App\\Notifications\\ReplyCommentQANotification"){
                                    if(noti.data.replyCmt.id_user == id_user){
                                        return  <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft' : 'textNoti'}><strong>{noti.data.Comment.full_name}</strong> Vừa trả lời bình luận của bạn trên <strong> Hỏi - Đáp </strong></div>
                                    }
                                    if(noti.data.Comment.id_user == noti.data.replyCmt.id_user && noti.data.Comment.id_user != id_user){
                                        return  <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft' : 'textNoti'}><strong>{noti.data.Comment.full_name}</strong> Vừa trả lời bình luận của chính mình tại bài viết của bạn trên <strong>Hỏi - Đáp</strong> của bạn. </div>
                                    }
                                    
                                    if(noti.data.Comment.id_user != noti.data.replyCmt.id_user && noti.data.Comment.id_user != id_user){
                                        return  <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft' : 'textNoti'}><strong>{noti.data.Comment.full_name}</strong> Vừa trả lời bình luận <strong>{noti.data.replyCmt.full_name}</strong>  bài viết của bạn trên <strong>Hỏi - Đáp</strong> </div>
                                    }    

                                    
                                }

                                if(noti.type == "App\\Notifications\\ReplyParentCommentQA"){
                                    
                                    if(noti.data.replyCmt.id_user == id_user){
                                        return   <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft' : 'textNoti'}><strong>{noti.data.Comment.full_name}</strong> Vừa trả lời bình luận của bạn tại bài viết <strong>Hỏi - Đáp</strong> </div>
                                    }
                                }

                                if(noti.type == "App\\Notifications\\NotificationOwnerPost"){
                                    if(noti.data.ownerPost.id_user == id_user &&  noti.read_at == null){
                                        return      <div className='listBookingRoom'>
                                                        <div className={noti.read_at == null ? 'textNoti textNotiMaskRead textMdLeft' : 'textNoti'}><strong>{noti.data.ownerBookingRoom.full_name}</strong> Vừa đặt phòng <strong>A0{noti.data.ownerPost.room_number}</strong> tại <strong>{noti.data.ownerPost.post_name}</strong> của bạn </div>
                                                       
                                                        {
                                                        noti.read_at == null
                                                         &&
                                                          handleBooking == false
                                                          &&
                                                          <div className='btn-handle-booking-room'>
                                                          <div className='btn-handle-accept-booking-room'>
                                                              <div className='btn btn-outline-primary' onClick={e => handleBookingRoom(e,noti.data.ownerPost.id,noti.data.ownerBookingRoom.id_user,noti.id)}>Chấp nhận</div>
                                                          </div>
                                                          <div className='btn-handle-cancel-booking-room'>
                                                              <div className='btn btn-outline-danger' onClick={e => handleCancelBookingRoom(e,noti.data.ownerPost.id,noti.id)}>Từ chối</div>
                                                          </div>
                                                        </div> 
                                                        }   
                                                           
                                                           
                                                           {
                                                             handleBooking &&
                                                            <div className='text-muted'>
                                                             Lựa chọn thành công
                                                            </div>
                                                           }
                                                        
                                                       
                                                    </div>
                                    }
                                   
                                }


                            


                            })
                        }
                    </div> 

                    <div className="notifyInteractive">
                        <h3 style={{textAlign: "center"}}>Hóa đơn</h3>
                        {listBillUser.length > 0 && listBillUser.map((cate, index) => {
                            return (     
                                <div className='row' key={index}>  
                                    
                                    <div className="content_notifyInteractive col-10">
                                        <Link to={`../billdetail/${cate.id}`} style={{textTransform: 'none'}}>
                                            <button className="notify_name">Bạn vừa nhận được hóa đơn tiền phòng</button> 
                                            <button className='notify_interaction'> {cate.created_at}</button>
                                            
                                        </Link>   
                                        <hr/>
                                    </div>
                                </div> 
                            );
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