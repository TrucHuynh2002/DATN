import React from 'react'

function Home() {
  return (
    <>
      <div className="content">
          <div className="row content-row">
            <div className="col postcard">
              <i className="bx bx-copy-alt postcard-i"></i>
              <div className="postcard-content">
                <span> Bài đăng</span>
                <br />
                <p className="chart">20%</p>
              </div>
            </div>
            <div className="col col-admin post">
              <i className="bx bx-edit-alt postcard-i"></i>
              <div className="postcard-content">
                <span> Bài viết</span>
                <br />
                <p className="chart">20%</p>
              </div>
            </div>
            <div className="col col-admin category">
              <i className="bx bx-category-alt postcard-i"></i>
              <div className="postcard-content">
                <span> Danh mục</span>
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
          </div>

          {/* <!-- BIỂU ĐỒ -->
          <div class="row">
            <!-- biểu đồ cột -->
            <canvas id="myChart" style="width:100%;max-width:600px"></canvas>

            <!-- biểu đồ tròn -->
            <canvas id="myChart1" style="width:100%;max-width:300px"></canvas>
          </div>   */}

      </div>
    </>
  )
}

export default Home