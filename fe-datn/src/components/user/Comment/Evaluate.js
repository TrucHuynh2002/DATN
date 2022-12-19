import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rate from './Rate';

function Evaluate() {
  const {id_post} = useParams();
  const [listPost, setListPost] = useState([]);
  const [averageRate,setAverageRate] = useState(1);
  const [dataAverageRate,setDataAverageRate] = useState([]);
  const [getAllStar,setGetAllStar] = useState([])
  const [total,setTotal] = useState(0);
  const [reviewStar,setReviewStar]= useState({
    five_star: 0,
    four_star: 0,
    three_star: 0,
    two_star: 0,
    one_star: 0,
    count:0
  })  
  const {
    five_star,
    four_star,
    three_star,
    two_star,
    one_star,
    count
  } = reviewStar
  
  const getData = async () => {
    // danh sach post
    const Post = await axios.get(`http://127.0.0.1:8000/api/post/show/${id_post}`);
      setListPost(Post.data.data);
    // Get all Star Post
    let AllStarPost = await axios.get(`http://127.0.0.1:8000/api/rating/show/post/${id_post}`)
    if(AllStarPost.data.status == true){
      setGetAllStar(AllStarPost.data.data);
    }
    // Getting Star
    const AverageRate = await axios.get(`http://127.0.0.1:8000/api/rating/average/${id_post}`);
    setAverageRate(AverageRate.data.ratingNumber)
    setDataAverageRate(AverageRate.data.data);
    setReviewStar({...reviewStar,
      five_star: AverageRate.data.review_star.five_star,four_star: AverageRate.data.review_star.four_star,
      three_star: AverageRate.data.review_star.three_star,
      two_star: AverageRate.data.review_star.two_star,one_star: AverageRate.data.review_star.one_star, 
      count: AverageRate.data.review_star.count  
    })
  };
  useEffect(() => {
    getData();
},[]);

  return (
    <>
      <div className="component-show-rate d-flex rounded-lg">
        <div className="content-left col-sm-3 p-3 d-flex flex-column justify-content-center align-items-center">
          <p>Đánh giá trung bình</p>
          <div className="avg-rate font-weight-bold">
            <span>{averageRate}</span>
            <span>/5</span>
          </div>
          <div className="star-rate">
            {
              Array(5).fill()
              .map((_,index) => {
                let rate = index +1
                return rate > averageRate ?
                    index + 0.5 > averageRate ?
                     <i className="fa fa-star" key={index} /> 
                    : 
                    <i className="fa fa-star-half checked" key={index}/> 
                    : 
                    (
                      <i className="fa fa-star checked" key={index} /> 
                    )
              })
            }
          </div>
          <p className="review m-0">
            (<span>{dataAverageRate.length}</span> nhận xét)
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
                style={{"width":(five_star > 0 ? (five_star/count) * 100  : 0) + '%'}}
                aria-valuenow={(five_star/count)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="percent">{five_star > 0 ?  Math.round(five_star / count * 100) : 0}%</div>
          </div>
          <div className="star-percent d-flex align-items-center">
            <div className="mr-2">
              4 <i className="fas fa-star" />
            </div>
            <div className="progress mr-2">
              <div
                className="progress-bar-2 progress-bar bg-success"
                role="progressbar"
                style={{"width":((four_star > 0 ? Math.round( four_star/count * 100) : 0) + "%")}}
                aria-valuenow={four_star/count * 100}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="percent">{(four_star > 0 ? Math.round(four_star/count * 100) : 0)}%</div>
          </div>
          <div className="star-percent d-flex align-items-center">
            <div className="mr-2">
              3 <i className="fas fa-star" />
            </div>
            <div className="progress mr-2">
              <div
                className="progress-bar-3 progress-bar bg-success"
                role="progressbar"
                style={{"width":((three_star > 0 ? three_star/count * 100 : 0) + '%')}}
                aria-valuenow={three_star > 0 ?  three_star/count * 100 : 0}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="percent">{(three_star > 0 ? three_star/count * 100 : 0)}%</div>
          </div>
          <div className="star-percent d-flex align-items-center">
            <div className="mr-2">
              2 <i className="fas fa-star" />
            </div>
            <div className="progress mr-2">
              <div
                className="progress-bar-4 progress-bar"
                role="progressbar"
                style={{"width":((two_star > 0 ? Math.round(two_star/count * 100) : 0) + '%')}}
                aria-valuenow={(two_star > 0 ? Math.round(two_star/count * 100) : 0)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="percent">{(two_star > 0 ? Math.floor(two_star/count * 100) : 0)}%</div>
          </div>
          <div className="star-percent d-flex align-items-center">
            <div className="mr-2">
              1 <i className="fas fa-star" />
            </div>
            <div className="progress mr-2">
              <div
                className="progress-bar-5 progress-bar"
                role="progressbar"
                style={{"width":((one_star > 0 ? one_star/count * 100 : 0) ) + '%'}}
                aria-valuenow={one_star/count * 100}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="percent">{(one_star > 0 ? Math.round(one_star/count * 100) : 0)}%</div>
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
        <Rate />
      </div>


      {/* show đánh giá */}
      <div className="component-show-rate ">
        <div className="content-left">
          <div className="star-rate">
            {
              getAllStar.map((rate,i) => {
                return (
                  <>
                    <div key={i}>
                          <div className='Avtar'>
                            <img />
                          </div>
                          <div className='star-rate'>
                            {
                                Array(5).fill()
                                .map((_,index) => {
                                  return index+1 > rate.rate
                                  ? 
                                  index+0.5 > rate.rate
                                    ?
                                    (
                                    <i className="fa fa-star " key={index} />
                                    )
                                    :
                                  
                                    (
                                      <i className="fa fa-star-half checked" key={index}/> 
                                    )

                                  :
                                  (
                                    <i className="fa fa-star checked"  key={index}  />

                                  )
                                })
                            }
                          </div>
                          <p>
                            {rate.full_name}
                          </p>
                          <p>{rate.content}</p>
                      </div>
                  </>
                )
              })
            
            }
      </div>
</div>
      </div>
    
    </>
  )
}
export default Evaluate

