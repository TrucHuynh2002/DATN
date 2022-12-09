import React from 'react';
import HomeBanner from './Home/HomeBanner';
import HomePost from './Home/HomePost';
import HomeBlog from './Home/HomeBlog';
import HomeAbout from './Home/HomeAbout';
import HomeGallery from './Home/HomeGallery';
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