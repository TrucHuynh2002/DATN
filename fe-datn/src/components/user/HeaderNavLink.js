import React from 'react'
import { Link } from 'react-router-dom';

function HeaderNavLink() {
    var user = JSON.parse(localStorage.getItem("user"));
    const handleSumbit = async (e) => {
        localStorage.removeItem("user");
    }
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
                        <ul class="aw__t1bz0i0v" aria-label="notification" role="tablist">
                            <li class="aw__tfaflwg">
                                <span class="aw__i1mg2bze" tabindex="-1" role="tab">THÔNG BÁO</span>
                            </li>
                        </ul>
                        <div class="aw__t16jo35">
                            
                            {!localStorage.getItem('user') ?
                                <div class="">
                                    <div>Vui lòng đăng nhập để xem danh sách hoạt động.</div>
                                    <button type="button" class="btn btn-warning " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: 'black', fontWeight: 600, backgroundColor: '#ffc70d',borderRadius: '5px'}}>TÀI KHOẢN</button>
                                    <div class="dropdown-menu" style={{zIndex:"1001",padding:"10px"}}>
                                        <Link class="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} to="login">Đăng nhập</Link>
                                        <Link class="dropdown-item nav-link btn btn-warning" style={{color: 'black', fontWeight: 600,borderRadius: '5px'}} to="signin">Đăng ký</Link>
                                    </div> 
                                </div>
                                : 
                                <div class="">
                                    <div>Thông báo mới nhất gồm</div> 
                                    <div>
                                        <Link type="button" class="btn btn-warning " to="/adminuser" style={{color: 'black', fontWeight: 600, backgroundColor: '#ffc70d',borderRadius: '5px'}}>{user[0].fullname}</Link>
                                    </div>
                                </div> 
                            }
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
