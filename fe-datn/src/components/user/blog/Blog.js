import React from 'react';
import BlogContainer from './BlogContainer';
import { TabTitle } from '../../title';

function Blog() {
  TabTitle('Blog - Nhà Tui.com');
  return (
    <>
      <BlogContainer />
    </>
  )
}

export default Blog