import React from 'react'
import Header_logo from './Header_logo'
import Header_menu from './Header_menu'
function HeaderContainer() {
  return (
    <>
     <div className="row header-nav">
     <Header_logo />
        <Header_menu />
          </div>
       
    </>
  )
}

export default HeaderContainer
