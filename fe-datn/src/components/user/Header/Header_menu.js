import React from 'react'
import HeaderNavLink from './HeaderNavLink';

function Header_menu() {
  return (
    <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10">
              <nav className="navigation navbar navbar-expand-md navbar-dark">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarExample04"
                  aria-controls="navbarExample04"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <HeaderNavLink />
              </nav>
            </div>
  )
}

export default Header_menu
