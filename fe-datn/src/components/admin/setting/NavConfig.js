import React from 'react'
// import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
function NavConfig() {

  return (   
        <ul id='nav-setting'>
          <li><NavLink to="" className='nav-config'>Logo</NavLink></li>
          <li><NavLink to="footerConfig" className='nav-config'>Footer</NavLink></li>
          <li><NavLink to="bannerConfig" className='nav-config'>Banner</NavLink></li>
        </ul>
  )
}

export default NavConfig