import React from 'react'
import { Link } from 'react-router-dom';

import Slide2 from '../../images/sl02.png';
import Slide3 from '../../images/sl03.png';

function BlogContent() {
  return (
    <div className="blog">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="blog_box">
                <div className="blog_img">
                  <figure>
                    <img src={Slide3} alt="#" />
                  </figure>
                </div>
                <div className="blog_room">
                  <h3><Link to='../blogdetail'>Tiêu đề bài viết</Link></h3>
                  <span>Tên người viết</span>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need to be
                    sure there isn't anything embarrassing hidden in the middle of
                    text. All the Lorem Ipsum generatorsIf you are{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="blog_box">
                <div className="blog_img">
                  <figure>
                    <img src={Slide2} alt="#" />
                  </figure>
                </div>
                <div className="blog_room">
                <h3><Link to='../blogdetail'>Tiêu đề bài viết</Link></h3>
                  <span>Tên người viết </span>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need to be
                    sure there isn't anything embarrassing hidden in the middle of
                    text. All the Lorem Ipsum generatorsIf you are{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="blog_box">
                <div className="blog_img">
                  <figure>
                    <img src={Slide3} alt="#" />
                  </figure>
                </div>
                <div className="blog_room">
                <h3><Link to='../blogdetail'>Tiêu đề bài viết</Link></h3>
                  <span>Tên người viết</span>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need to be
                    sure there isn't anything embarrassing hidden in the middle of
                    text. All the Lorem Ipsum generatorsIf you are{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default BlogContent
