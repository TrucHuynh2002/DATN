import React from 'react';
import HomeAbout from './Home/HomeAbout';
import HomeBanner from './Home/HomeBanner';
import HomeBlog from './Home/HomeBlog';
import HomeGallery from './Home/HomeGallery';
import HomePost from './Home/HomePost';
function Home() {
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