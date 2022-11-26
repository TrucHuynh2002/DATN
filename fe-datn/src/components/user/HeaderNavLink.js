import React from 'react'
import { Link } from 'react-router-dom';

function HeaderNavLink() {
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
                <Link className="nav-link" to="addpost">
                Đăng bài
                </Link>
            </li>
            <li className="nav-item">
                <div className="btn-group">
                   <button type="button" className="btn btn-warning " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: 'black', fontWeight: 600, backgroundColor: '#ffc70d',borderRadius: '5px'}}>TÀI KHOẢN</button>
                   <div className="dropdown-menu">
                        <Link className="dropdown-item" to="login">Đăng nhập</Link>
                        <Link className="dropdown-item" to="signin">Đăng ký</Link>
                    </div>
                </div>
              </li>

            </ul>
        {/* </div> */}
    </>
  )
}

export default HeaderNavLink
