import React from 'react'
// import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function NavConfig() {
  const {id_config} = useParams();

  return (   
        <ul id='nav-setting'>
          <li><NavLink to="" className='nav-config'>Logo</NavLink></li>
          <li><NavLink to="footerConfig/1" className='nav-config'>Footer</NavLink></li>
          <li><NavLink to="bannerConfig" className='nav-config'>Banner</NavLink></li>
        </ul>
  )
}

export default NavConfig