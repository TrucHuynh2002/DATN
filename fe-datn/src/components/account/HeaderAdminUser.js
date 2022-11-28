import React from 'react';
import { Link } from 'react-router-dom';
import LogoAdminuser from '../../images/logo-ft.png';

function HeaderAdminUser() {
  var user = JSON.parse(localStorage.getItem("user"));
  const handleSumbit = async (e) => {
      localStorage.removeItem("user");
  }
  return (
    <>
        <div className="nav-top">
        <div className="menu">
            <i className='bx bx-menu'></i>
        </div>
        <a href="/">
              <img src={LogoAdminuser} alt="logo" width="100%" />
          </a>
        <div className="nav-top-logout">
        <form  onSubmit={(e) => handleSumbit(e)}>
            <Link type="submit">Đăng xuất</Link>
        </form>
        </div>
      </div>   
       
    </>
    
  )
}

export default HeaderAdminUser