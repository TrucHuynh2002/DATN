import React from 'react'

function BlogDetail() {
  return (
    <>
      <div className="container">
        <div className="name_blog">
          <h1>Cara Membuat Responsive Mega Menu di Blogger</h1>
        </div>
        <div className="row" style={{ color: "#131313", fontWeight: 400 }}>
          <div className="col-md-3">
            <i className="fa fa-user" aria-hidden="true"></i>
            <span className="name-user" style={{ padding: "left 5px" }}>Quốc Hy</span>
          </div>
          <div className="col-md-3">
            <i className="fa fa-calendar" aria-hidden="true"></i> 
            <span className="date-public" style={{ paddingLeft: 5 }}>22/11/2022</span>
          </div>
        </div>
        <div className="description_sort">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dapibus, tortor sit amet rhoncus lobortis, leo libero suscipit justo, ac tincidunt ligula eros sit amet sem. Sed lobortis nisl sed diam porttitor, quis lacinia felis lacinia. In urna nulla, consectetur nec nisi vitae, laoreet pellentesque augue. Donec feugiat, velit eu imperdiet semper, ante sem suscipit nulla, congue suscipit ipsum tellus commodo ipsum. Sed pharetra orci a volutpat faucibus.
          </p>
        </div>
        <div className="description">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dapibus, tortor sit amet rhoncus lobortis, leo libero suscipit justo, ac tincidunt ligula eros sit amet sem. Sed lobortis nisl sed diam porttitor, quis lacinia felis lacinia. In urna nulla, consectetur nec nisi vitae, laoreet pellentesque augue. Donec feugiat, velit eu imperdiet semper, ante sem suscipit nulla, congue suscipit ipsum tellus commodo ipsum. Sed pharetra orci a volutpat faucibus.
            </p>
            <img className="img-fluid text-center" src="https://2.bp.blogspot.com/-93lIHqW_YKM/XC70vRtpZSI/AAAAAAAAPQE/AOyXI7G9GU0C_XEmCgEYFmAzCuUZhCeFACLcBGAs/s640/For%2Ba%2Bminute%2Bshe%2Bstood%2Blooking%2Bat%2Bthe%2Bhouse.jpg" width={640} height={367} data-original-width={1000} data-original-height={574} />
        </div>
      </div>
    </>
  )
}

export default BlogDetail