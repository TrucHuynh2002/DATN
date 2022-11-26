import React from 'react'

function Evaluate() {
  return (
    <>
      <div className="component-show-rate d-flex rounded-lg">
        <div className="content-left col-sm-3 p-3 d-flex flex-column justify-content-center align-items-center">
          <p>Đánh giá trung bình</p>
          <div className="avg-rate font-weight-bold">
            <span>4.5</span>
            <span>/5</span>
          </div>
          <div className="star-rate">
            <i className="fa fa-star checked" />
            <i className="fa fa-star checked" />
            <i className="fa fa-star checked" />
            <i className="fa fa-star checked" />
            <i className="fa fa-star-half-alt checked" />
          </div>
          <p className="review m-0">
            (<span>10</span> nhận xét)
          </p>
        </div>
        <div className="content-center col-sm-6 p-3 d-flex flex-column justify-content-center align-items-center">
          <div className="star-percent d-flex align-items-center">
            <div className="mr-2">
              5 <i className="fas fa-star" />
            </div>
            <div className="progress mr-2">
              <div
                className="progress-bar-1 progress-bar bg-success"
                role="progressbar"
                aria-valuenow={76}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="percent">76%</div>
          </div>
          <div className="star-percent d-flex align-items-center">
            <div className="mr-2">
              4 <i className="fas fa-star" />
            </div>
            <div className="progress mr-2">
              <div
                className="progress-bar-2 progress-bar bg-success"
                role="progressbar"
                aria-valuenow={6}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="percent">6%</div>
          </div>
          <div className="star-percent d-flex align-items-center">
            <div className="mr-2">
              3 <i className="fas fa-star" />
            </div>
            <div className="progress mr-2">
              <div
                className="progress-bar-3 progress-bar bg-success"
                role="progressbar"
                aria-valuenow={9}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="percent">9%</div>
          </div>
          <div className="star-percent d-flex align-items-center">
            <div className="mr-2">
              2 <i className="fas fa-star" />
            </div>
            <div className="progress mr-2">
              <div
                className="progress-bar-4 progress-bar"
                role="progressbar"
                aria-valuenow={7}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="percent">7%</div>
          </div>
          <div className="star-percent d-flex align-items-center">
            <div className="mr-2">
              1 <i className="fas fa-star" />
            </div>
            <div className="progress mr-2">
              <div
                className="progress-bar-5 progress-bar"
                role="progressbar"
                aria-valuenow={2}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="percent">2%</div>
          </div>
        </div>
        <div className="content-right col-sm-3 p-3 d-flex flex-column justify-content-center align-items-center">
          <p className="mb-2">Chia sẻ nhận xét về sản phẩm</p>
          <button
            type="button"
            className="btn btn-warning"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Viết nhận xét của bạn
          </button>
        </div>
      </div>
      <div className="collapse-show-rate collapse row" id="collapseExample">
        <form className="comment position-relative p-3 rounded-lg">
          <div className="align-items-center col-4">
            <p className="m-0 mr-2">1. Đánh giá của bạn về sản phẩm này:</p>
            <div className="rate">
              <input type="radio" id="star1" name="rate" defaultValue={1} />
              <label htmlFor="star1" title="text" />
              <input type="radio" id="star2" name="rate" defaultValue={2} />
              <label htmlFor="star2" title="text" />
              <input type="radio" id="star3" name="rate" defaultValue={3} />
              <label htmlFor="star3" title="text" />
              <input type="radio" id="star4" name="rate" defaultValue={4} />
              <label htmlFor="star4" title="text" />
              <input type="radio" id="star5" name="rate" defaultValue={5} />
              <label htmlFor="star5" title="text" />
            </div>
          </div>
         <div className="col-4" >
            <div className="form-group">
              <label htmlFor="txtTitle">2. Tiêu Đề</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Nhập tiêu đề nhận xét (không bắt buộc)"
                id="txtTitle"
              />
            </div>
            <div className="form-group">
              <label htmlFor="txtReview">3. Viết nhận xét của bạn vào bên dưới:</label>
              <textarea
                className="form-control"
                id="txtReview"
                rows={3}
                placeholder="Nhận xét của bạn về sản phẩm này"
                defaultValue={""}
              />
            </div>
          </div>
          <button type="button" className="btn btn-warning position-absolute">
            Gửi nhận xét
          </button>
        </form>
      </div>
      <hr />
      <div className='content_cmt'>                             
        <img src='https://th.bing.com/th/id/R.91cb545176720cc851687a7263984600?rik=VoUCP9UwZMLyQA&riu=http%3a%2f%2ftaihinhanhdep.xyz%2fwp-content%2fuploads%2f2016%2f03%2ftranh-anh-dep-thien-nhien.jpg&ehk=Nf6eDEiydnUXwDE2PXteDfDhxmcUKmLrxSQv9VYEZqY%3d&risl=&pid=ImgRaw&r=0' alt="img_cmnt" style={{width:'30px', height:'30px', borderRadius:'50%'}} />
        <b className='cmt_name'>Nhóm 1</b>
        <p className='cmt_name1'>Sản phẩm chất lượng tốt</p>                                                                  
      </div>  
    </>
  )
}
export default Evaluate

