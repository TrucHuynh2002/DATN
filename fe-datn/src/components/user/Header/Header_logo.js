import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';

function Header_logo() {
  return (
    <div className="col-lg-2 col-md-6 col-sm-6 logo_section">
    <div className="logo">
      <Link to="/">
        <img className="logo" src={logo} alt="#" />
      </Link>
    </div>
</div>
  )
}

export default Header_logo
