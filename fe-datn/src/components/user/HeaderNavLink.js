import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
function HeaderNavLink() {
    var user = JSON.parse(localStorage.getItem("user"));
    const handleSumbit = async (e) => {
        localStorage.removeItem("user");
    }
    // const {id_user} = useParams();
    // console.log(id_user);
    const [listnotifyfavorite, setListnotifyfavorite] = useState([]);
    const [listnotifyInteractive, setListnotifyInteractive] = useState([]);
    
    useEffect(() => {
        getDatafavorite();
        getDataInteractive();
    },[]);

  // danh sach notify
  const getDatafavorite = async () => {
    const id_user = user[0].id;
   const ress = await axios.get(`http://127.0.0.1:8000/api/favorite/show/${id_user}`);
        console.log(ress);
      setListnotifyfavorite(ress.data.data);
  };

  // xoa notify
  const deletenotify = async (id_notify_favorite) => {
    await axios.delete(`http://127.0.0.1:8000/api/notify/delete/${id_notify_favorite}`);
    getDatafavorite();
  };
  // danh sach notify interactive
  const getDataInteractive = async () => {
    const id_user = user[0].id;
    const res = await axios.get(`http://127.0.0.1:8000/api/notify_interactive/show/${id_user}`);
    console.log(res);
      setListnotifyInteractive(res.data.data);
};
// xoa notify interactive
const deletenotifyInteractive = async (id_notify_interactive) => {
    await axios.delete(`http://127.0.0.1:8000/api/notify/delete/${id_notify_interactive}`);
    getDataInteractive();
};

  return (
    <>
        {/* <div className="collapse navbar-collapse" > */}
            <ul className="navbar-nav mr-auto header-ul" id="navbarsExample04">
            <li className="nav-item ">
                <Link className="nav-link" to="">
                Trang chủ
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="about">
                Giới thiệu
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="room">
                Phòng
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="gallery">
                Nổi bật
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="blog">
                Blog
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="contact">
                Liên hệ
                </Link>
            </li>
            <li className="nav-item">
                <div class="btn-group" >
                   <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
                        style={{color: 'black', fontSize:'1.8em',border: 'none'}} >
                        <i class='bx bx-bell'></i>
                    </div>
                    <div class="dropdown-menu" style={{zIndex:"1001",padding:"10px"}}>
                        <ul class="nav nav-tabs" id="myTab" aria-label="notification" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link nav-item-link active" tabindex="-1" id="notify-tab" data-toggle="tab" href="#notify" role="tab" aria-controls="notify" aria-selected="false">THÔNG BÁO</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-item-link"  tabindex="-1" id="postSave-tab" data-toggle="tab" href="#postSave" role="tab" aria-controls="postSave" aria-selected="false">TIN ĐÃ LƯU</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent" style={{ marginTop:"10px"}}>
                            <div class="aw__t16jo35 tab-pane fade show active" id="notify" role="tabpanel" aria-labelledby="notify-tab">
                                {!localStorage.getItem('user') ?
                                    <div class="">
                                        <div>Vui lòng đăng nhập để xem thông báo.</div>
                                    </div>
                                    : 
                                    <div class="notifyInteractive">
                                            {listnotifyInteractive.map((cate, index) => {
                                                return (     
                                                    <div className='row'>  
                                                        <div className="content_notifyInteractive_img col-2">
                                                            <img className="img-fluid" src={cate.id_img_user} />
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
                            <div class="aw__t16jo35 tab-pane fade " id="postSave" role="tabpanel" aria-labelledby="postSave-tab">
                                {!localStorage.getItem('user') ?
                                    <div class="">
                                        <div>Vui lòng đăng nhập để xem danh sách hoạt động.</div>
                                    </div>
                                    : 
                                    <div class="">
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
                            </div>
                        </div>
                       
                    </div>
                </div>
            </li>
            <li className="nav-item">
                <div class="btn-group">
                    <Link className="nav-link btn btn-warning" style={{color: 'black', fontWeight: 600, backgroundColor: '#ffc70d',borderRadius: '5px'}} to="addpost">
                    Đăng bài
                    </Link>
                </div>
            </li>
            <li class="nav-item">
                {!localStorage.getItem('user') ?
                <div class="btn-group">
                    <button type="button" class="btn btn-warning " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: 'black', fontWeight: 600, backgroundColor: '#ffc70d',borderRadius: '5px'}}>TÀI KHOẢN</button>
                    <div class="dropdown-menu" style={{zIndex:"1001",padding:"10px"}}>
                        <Link class="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} to="login">Đăng nhập</Link>
                        <Link class="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} to="signin">Đăng ký</Link>
                    </div> 
                </div>
                : 
               
                <div class="btn-group">
                    <button type="button" class="btn btn-warning " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: 'black', fontWeight: 600, backgroundColor: '#ffc70d',borderRadius: '5px'}}>{user[0].fullname}</button>
                    <div class="dropdown-menu" style={{zIndex:"1001",padding:"10px"}}>
                        <Link class="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} to="adminuser">Thông tin tài khoản</Link>
    
                        <form  onSubmit={(e) => handleSumbit(e)}>
                            <button class="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} type="submit">Đăng xuất</button>
                        </form>
                       
                    </div>
                </div> }
            </li>
        </ul>
        {/* </div> */}
    </>
  )
}

export default HeaderNavLink
