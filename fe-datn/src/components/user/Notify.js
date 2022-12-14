import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'

function Notify() {
    var user = JSON.parse(localStorage.getItem("user"));
    const [listnotifyfavorite, setListnotifyfavorite] = useState([]);
    const [listnotifyInteractive, setListnotifyInteractive] = useState([]);
    
    useEffect(() => {
        // getDatafavorite();
        getDataInteractive();
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
    console.log(res);
          setListnotifyInteractive(res.data.data);
    }
};
// xoa notify interactive
const deletenotifyInteractive = async (id_notify_interactive) => {
    await axios.delete(`http://127.0.0.1:8000/api/notify/delete/${id_notify_interactive}`);
    getDataInteractive();
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
        {/* <li className="nav-item">
            <a className="nav-link nav-item-link" tabIndex="-1" id="postSave-tab" data-toggle="tab" href="#postSave" role="tab" aria-controls="postSave" aria-selected="false">TIN ĐÃ LƯU</a>
        </li> */}
    </ul>
    <div className="tab-content" id="myTabContent" style={{ marginTop:"10px"}}>
        <div className="aw__t16jo35 tab-pane fade show active" id="notify" role="tabpanel" aria-labelledby="notify-tab">
            {!localStorage.getItem('user') ?
                <div className="">
                    <div>Vui lòng đăng nhập để xem thông báo.</div>
                </div>
                : 
                <div className="notifyInteractive">
                    {listnotifyInteractive.map((cate, index) => {
                            return (     
                                <div className='row' key={index}>  
                                    <div className="content_notifyInteractive_img col-2">
                                        <img className="img-fluid" src={cate.id_img_user} alt="images" />
                                    </div>
                                    <div className="content_notifyInteractive col-10">
                                        <span className="notify_name">{cate.full_name}</span> vừa 
                                        <span className='notify_interaction'> {cate.interaction}</span>
                                        <span> bài của bạn </span>      
                                    </div>
                                </div>  
                            );     
                        })} 
                </div> 
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