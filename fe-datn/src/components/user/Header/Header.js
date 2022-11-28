 import React from 'react';
import HeaderContainer from './HeaderContainer';

function Header() {
  return (
    <>
     <header>
      {/* header inner */}
      <div className="header">
        <div className="container">
          <HeaderContainer /> 
        </div>
      </div>
    </header>
    </>
  )
}

export default Header