import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function GalleryContent() {
  useEffect(() => {
    getData();
    getDataPostTrend();
  },[]);
  const [ListSearchTrend, setListSearchTrend] = useState([]);
  const [ListDataPostTrend, setDataPostTrend] = useState([]);
  const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/trend`);
    setListSearchTrend(res.data.data);
  };
  const getDataPostTrend = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/trendPost`);
    setDataPostTrend(res.data.data);
  };
  return (
    <>
    <div className="gallery">
      <div className="container">
        {ListSearchTrend.map((list,a) => {
          return (
            <div
            type="button"
            className="row searchTrend"  
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample" >
              <div className="col-1">{list.id_search}</div>
              <div className="col-8">
                <div> {list.key_word}</div>
                {ListDataPostTrend.map((list,a) =>{
                  return(
                    <Link className="link-info link_____" to={`../roomdetail/${list.id_post}`}>{list.post_name}</Link>
                  )
                }
                )}
             </div>
              <div className="col-2 view___">
            
                <div>{list.view}</div>
                <span >lượt tìm kiếm</span>
              </div>
              <div className="col-1">
                <i className="	fas fa-angle-down"></i>
              </div>
          </div>
         
          )
        })}
         <div className="collapse-show-rate collapse row" id="collapseExample">
          <h3>sdvsdvsdv</h3>
         </div>
    </div>

  </div>

  <div className="collapse-show-rate collapse row" id="collapseExample">

  </div>
   
    </>
  )
}

export default GalleryContent
