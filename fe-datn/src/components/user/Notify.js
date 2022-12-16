import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

function Notify() {
    var user = JSON.parse(localStorage.getItem("user"));
    const [listnotifyfavorite, setListnotifyfavorite] = useState([]);
    const [listnotifyInteractive, setListnotifyInteractive] = useState([]);
    const [listBillUser,setListBillUser] = useState([]);
    const [listImg, setListImg] = useState([]);
    useEffect(() => {
        // getDatafavorite();
        getDataInteractive();
        getImg();

        return () => {
            getDataInteractive();
            getImg();
        }
    },[]);
     // danh sach notify
//   const getDatafavorite = async () => {
//     const id_user = user ? user[0].id : 0;
//     if(id_user != 0){
//         const ress = await axios.get(`http://127.0.0.1:8000/api/favorite/show/${id_user}`);
        
//         setListnotifyfavorite(ress.data.data);
//     }
//   };

  // xoa notify
  const deletenotify = async (id_notify_favorite) => {
    await axios.delete(`http://127.0.0.1:8000/api/notify/delete/${id_notify_favorite}`);
    // getDatafavorite();
  };
  // danh sach notify interactive
  const getDataInteractive = async () => {
    const id_user = user ? user[0].id : 0;
    if(id_user != 0){
        const res = await axios.get(`http://127.0.0.1:8000/api/notify_interactive/show/${id_user}`);
        setListnotifyInteractive(res.data.data);
        setListBillUser(res.data.bill);
    }
    };
    // Noti Bill
    // const getDataBill = async () => {
    //     let id_user = user ? user[0].id : '';
    //     if(id_user != 0){
    //         const res = await axios.get(`http://127.0.0.1:8000/api/notify_interactive/show/${id_user}`);
    //         setListnotifyInteractive(res.data.data);
    //     }
    // }
    // xoa notify interactive
    const deletenotifyInteractive = async (id_notify_interactive) => {
        await axios.delete(`http://127.0.0.1:8000/api/notify/delete/${id_notify_interactive}`);
        getDataInteractive();
    };
    const getImg = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/user/showimg`);
        setListImg(res.data.data);   

    };
  return (
    <div className="dropdown-menu" style={{zIndex:"1001",padding:"10px"}}>
    <ul className="nav nav-tabs" id="myTab" aria-label="notification" role="tablist">
        <li className="nav-item">
            <a className="nav-link nav-item-link active" tabIndex="-1" id="notify-tab" data-toggle="tab" href="#notify" role="tab" aria-controls="notify" aria-selected="false">THÔNG BÁO </a>
        </li>
        <li className="nav-item" style={{fontSize: "44px",color: "#dbe0e4"}}>
            <p>|</p>
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
                            {listnotifyInteractive.map((cate, index) => {
                                    return (     
                                    
                                            <div className='row' key={index}>  
                                            
                                                    {listImg.map((a, index) => {
                                                        return a.id_user == cate.id_user_tow && (
                                                            <div className='content_notifyInteractive_img col-1' key={index}>
                                                                <img src={a.link_img_user}
                                                                alt='images' className="img-fluid" />                        
                                                            </div>
                                                        );
                                                    })}
                                                    <div className="content_notifyInteractive col-10">
                                                        <Link to={`/roomdetail/${cate.id_post}`} style={{textTransform: 'none'}}>
                                                            <span className="notify_name">{cate.full_name}</span> vừa 
                                                            <span className='notify_interaction'> {cate.interaction}</span>
                                                            <span> bài của bạn </span>  
                                                        </Link>   
                                                    </div>
                                            
                                            </div> 
                                        
                                    );     
                            })} 
                        </div> 
                    <hr/>
                    <div className="notifyInteractive">
                        <h3 style={{textAlign:"center",fontWeight:"700"}} >Hóa Đơn</h3>
                            {listBillUser.length > 0 && listBillUser.map((cate, index) => {
                                    return (     
                                    
                                            <div className='row' key={index}>  
                                            
                                                    {/* {listImg.map((a, index) => {
                                                        return a.id_user == cate.id_user_tow && (
                                                            <div className='content_notifyInteractive_img col-1' key={index}>
                                                                <img src={a.link_img_user}
                                                                alt='images' className="img-fluid" />                        
                                                            </div>
                                                        );
                                                    })} */}
                                                    <div className="content_notifyInteractive col-10">
                                                        <Link to={`/layoutBill/${cate.id_user_two}`} style={{textTransform: 'none'}}>
                                                            {/* <span className="notify_name">{cate.full_name}</span> vừa 
                                                            <span className='notify_interaction'> {cate.interaction}</span>
                                                            <span> bài của bạn </span>   */}
                                                            <h3>Hóa đơn tiền phòng: <strong> {moment(cate.created_at).local().startOf('day').fromNow()}</strong></h3>
                                                        </Link>   
                                                    </div>
                                            
                                            </div> 
                                        
                                    );     
                            })} 
                    </div> 
                    <hr/>
                </>
               )
            }
        </div>
        {/* <div className="aw__t16jo35 tab-pane fade " id="postSave" role="tabpanel" aria-labelledby="postSave-tab">
            {!localStorage.getItem('user') ?
                <div className="">
                    <div>Vui lòng đăng nhập để xem danh sách hoạt động.</div>
                </div>
                : 
                <div className="">
                    <div>
                    {listnotifyfavorite.map((cate, index) => {
                            return (     
                                <div className='row'>  
                                    <div className="content_notifyfavorite col-10">
                                        <span className='notify_interaction'> {cate.post_name}</span>
                                    </div>
                                                                                            
                                </div>  
                            );     
                        })} 
                    </div> 
                </div> 
            }
        </div> */}
    </div> 
</div>
  )
}

export default Notify