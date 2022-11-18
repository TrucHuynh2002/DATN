import React from 'react'
import { Link } from 'react-router-dom';

function HeaderNavLink() {
  return (
    <>
        <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
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
            <li class="nav-item">
                 <div class="btn-group">
                   <button type="button" class="btn btn-warning " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: black ; font-weight: 600; background-color: #ffc70d; border-radius: 5px;">
                           TÀI KHOẢN
                   </button>
                   <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Đăng nhập</a>
                        <a class="dropdown-item" href="#">Đăng ký</a>
                    </div>
                   </div>
              </li>

            </ul>
        </div>
    </>
  )
}

export default HeaderNavLink
