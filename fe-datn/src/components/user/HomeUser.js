import React from 'react';
import HomeAbout from './Home/HomeAbout';
import HomeBanner from './Home/HomeBanner';
import HomeBlog from './Home/HomeBlog';
import HomeGallery from './Home/HomeGallery';
import HomePost from './Home/HomePost';
import { TabTitle } from '../title';

function Home() {
  TabTitle('Nhà Tui.com');
  return (
    <>
        <HomeBanner />
        <HomeAbout />
        <HomePost />
        <HomeGallery />
        <HomeBlog />
    </>
  )
}

export default Home