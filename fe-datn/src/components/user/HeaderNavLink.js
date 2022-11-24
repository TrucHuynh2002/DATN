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
            <li className="nav-item" >  
                <div className="btn-group" style={{fontSize:"3.0em"}}>
                    <svg 
                    data-toggle="dropdown"  xmlns="http://www.w3.org/2000/svg"  
                    aria-haspopup="true" 
                    aria-expanded="false" 
                    data-type="monochrome" viewBox="0 0 15.706 19.271" width="1em" 
                    height="1em" fill="none" className="aw__ixo30vg">
                        <path d="M13.033 7.739l-.03 8.149H2.705l-.03-8.148c0-2.953 2.226-5.181 5.179-5.183 2.952.002 5.18 2.23 5.18 5.182zm-3.775 9.296c-.194.635-.75 1.066-1.404 1.067-.654-.001-1.21-.432-1.404-1.067zm5.88-1.147h-.947l-.01-8.17c0-3.381-2.409-6-5.746-6.277V.568c0-.37-.292-.566-.582-.568-.288.002-.58.198-.58.568v.873c-3.337.276-5.746 2.896-5.746 6.277l-.01 8.17H.568c-.373 0-.568.293-.568.584 0 .29.195.584.568.584H5.26a2.642 2.642 0 002.593 2.215 2.641 2.641 0 002.593-2.215h4.692c.373 0 .568-.294.568-.584s-.195-.584-.568-.584z" fill="currentColor"></path>
                    </svg>

                   <div  style={{textAlign: 'center',height: 110,width:400}} className="dropdown-menu">
                        <div class="aw__t16jo35">
                            <div>Vui lòng đăng nhập để xem danh sách thông báo</div>
                                <a class="aw__b1358qut accent r-normal medium w-bold i-left aw__p1phhhcp" rel="nofollow"></a>
                            </div>  
                          <div >
                            <Link className="dropdown" to="signin">Đăng ký  </Link> /
                            <Link className="dropdown" to="login"> &nbsp;Đăng Nhập</Link> 
                        </div>
                    </div>
                </div> 
            </li>
            <li className="nav-item">
                <Link className="nav-link btn btn-warning" to="contact">
                Đăng bài
                </Link>
            </li>
           
              <li className="nav-item" >
                <div className="btn-group">
                   <button type="button" className="btn btn-warning " 
                   data-toggle="dropdown" aria-haspopup="true" 
                   aria-expanded="false" >
                           TÀI KHOẢN
                   </button>
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
