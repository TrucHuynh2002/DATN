import React from 'react';
import GalleryContainer from './GalleryContainer';
import { TabTitle } from '../../title';

function Gallery() {
  TabTitle('Xu hướng nổi bật');
  return (
    <>
      <GalleryContainer />
    </>
  )
}

export default Gallery