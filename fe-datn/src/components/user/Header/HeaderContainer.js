import React from 'react';
import HeaderLogo from './Header_logo';
import HeaderMenu from './Header_menu';

function HeaderContainer() {
  return (
    <>
     <div className="row header-nav">
          <HeaderLogo />
          <HeaderMenu />
      </div>
    </>
  )
}

export default HeaderContainer
