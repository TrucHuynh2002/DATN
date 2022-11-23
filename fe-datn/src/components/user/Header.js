import React from 'react'
import { Link } from 'react-router-dom';
// link img
import logo from '../../images/logo.png';
// link css
// import '../../css/bootstrap.min.css';
// import '../../css/style.css';
// import '../../css/responsive.css';
import HeaderNavLink from './HeaderNavLink';
// import HeaderNavLink from './HeaderNavLink';

function Header() {
  return (
    <>
     <header>
      {/* header inner */}
      <div className="header">
        <div className="container">
          <div className="row header-nav">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                  <div className="logo">
                    <Link to="/">
                      <img className="logo img-fluid" src={logo} alt="#" />
                    </Link>
                  </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
              <nav className="navigation navbar navbar-expand-md navbar-dark ">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarsExample04"
                  aria-controls="navbarsExample04"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <HeaderNavLink />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header