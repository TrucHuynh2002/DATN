import React from 'react';
import HomeBanner from './Home/HomeBanner';
import HomePost from './Home/HomePost';
import HomeBlog from './Home/HomeBlog';
import HomeAbout from './Home/HomeAbout';
import HomeGallery from './Home/HomeGallery';

function Home() {

  return (
    <>
      {/* banner */}
        <HomeBanner />
      {/* end banner */}
      {/* about */}
        <HomeAbout />
      {/* end about */}
      {/* our_room */}
        <HomePost />
      {/* end our_room */}
      {/* gallery */}
        <HomeGallery />
      {/* end gallery */}
      {/* blog */}
        <HomeBlog />
      {/* end blog */}     
    </>
  )
}

export default Home