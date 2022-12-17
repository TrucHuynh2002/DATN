import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

function Notify() {
    var user = JSON.parse(localStorage.getItem("user"));
    const [listnotifyfavorite, setListnotifyfavorite] = useState([]);
    const [listnotifyInteractive, setListnotifyInteractive] = useState([]);
    const [listnotifyQa, setListnotifyQa] = useState([]);
    const [listBillUser,setListBillUser] = useState([]);
    const [listImg, setListImg] = useState([]);
    useEffect(() => {
        // getDatafavorite();
        getDataInteractive();
        getImg();
        getDataBill()

        return () => {
            getDataInteractive();
            getImg();
            getDataQa();
            getDataBill()
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
  // danh sach notify comment
  const getDataInteractive = async () => {
        const id_user = user ? user[0].id : 0;
        if(id_user){
            const res = await axios.get(`http://127.0.0.1:8000/api/notify_interactive/show/${id_user}`);
            setListnotifyInteractive(res.data.data);
            setListBillUser(res.data.bill);
        }
    };
    // danh sach notify comment
  const getDataQa = async () => {
    const id_user = user ? user[0].id : 0;
    if(id_user){
        const res = await axios.get(`http://127.0.0.1:8000/api/noty_qa/show/${id_user}`);
        setListnotifyQa(res.data.data);
    }
};
    // Noti Bill
    const getDataBill = async () => {
        let id_user = user ? user[0].id : '';
        if(id_user != 0){
            const res = await axios.get(`http://127.0.0.1:8000/api/notify_interactive/show/${id_user}`);
            setListnotifyInteractive(res.data.data);
        }
    }
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
                    <div className="notifyInteractive">
                        {listnotifyQa.map((cate, index) => {
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
                </>
               )
            }
        </div>
    </div> 
</div>
  )
}

export default Notify