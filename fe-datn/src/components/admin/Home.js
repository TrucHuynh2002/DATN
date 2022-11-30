import React from 'react'

function Home() {
  return (
    <>      
        <div className="content">
            <div className="row content-row">
              <div className="col col-admin category">
                <i className="bx bx-category-alt postcard-i"></i>
                <div className="postcard-content">
                  <span> Danh mục</span>
                  <br />
                  <p className="chart">20%</p>
                </div>
              </div>
              <div className="col col-admin roomtype">
                <i className="bx bx-category-alt postcard-i"></i>
                <div className="postcard-content">
                  <span> Loại phòng</span>
                  <br />
                  <p className="chart">20%</p>
                </div>
              </div>  
              <div className="col col-admin postcard">
                <i className="bx bx-copy-alt postcard-i"></i>
                <div className="postcard-content">
                  <span> Bản tin</span>
                  <br />
                  <p className="chart">20%</p>
                </div>
              </div>
              <div className="col col-admin post">
                <i className="bx bx-edit-alt postcard-i"></i>
                <div className="postcard-content">
                  <span> Bài blog</span>
                  <br />
                  <p className="chart">20%</p>
                </div>
              </div>
            </div>

            <div className="row content-row">
              <div className="col col-admin interior">
                <i className="bx bx-arch postcard-i"></i>
                <div className="postcard-content">
                  <span> Nội thất</span>
                  <br />
                  <p className="chart">20%</p>
                </div>
              </div>
              <div className="col col-admin comment">
                <i className="bx bx-message-dots postcard-i"></i>
                <div className="postcard-content">
                  <span> Bình luận</span>
                  <br />
                  <p className="chart">20%</p>
                </div>
              </div>
              <div className="col col-admin user">
                <i className="bx bx-user postcard-i"></i>
                <div className="postcard-content">
                  <span> Người dùng</span>
                  <br />
                  <p className="chart">20%</p>
                </div>
              </div>
              <div className="col col-admin contactlist">
                <i className="bx bx-user postcard-i"></i>
                <div className="postcard-content">
                  <span> Liên hệ</span>
                  <br />
                  <p className="chart">20%</p>
                </div>
              </div>
            </div>            
            </div>

         


    </>
  )
}

export default Home