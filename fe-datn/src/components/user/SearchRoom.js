import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../url';
import { TabTitle } from '../title';

function Search() {
    TabTitle('Kết quả tìm kiếm');
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const keyword = urlParam.get('keyword');
    const province = urlParam.get('province');
    const price = urlParam.get('price');
    const area = urlParam.get('area');
    const ward = urlParam.get('ward');
    const district = urlParam.get('district');
    const typeRoom = urlParam.get('typeRoom');
    const [addTrendSearch, setListTrendSearch] = useState({
        key_word : keyword,
      })
      const {key_word} = addTrendSearch
    const [aData,setData] = useState([])
    const getPostSearch = async () => {
        if(keyword){
            let ress = await axios.post(`${url}/search`, addTrendSearch);
        }
        let res = await axios.get(`${url}/searchAll?keyword=${keyword}&&province=${province}&&ward=${ward}&&district=${district}&&price=${price}&&area=${area}&&typeRoom=${typeRoom}`);
        setData(res.data);
      }
    useEffect(() => {
        getPostSearch();
    },[])

  return (
    <>
    <div className="back_re">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="title">
                        <h2>Kết quả tìm kiếm</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="our_room">
        <div className="container">
            <div className="row">  
            {
                aData.status == true && aData.data.length >= 1 ? (
                    aData.data.map((room,index) => {
                        return  <div className="col-md-4 col-sm-6" key={index}>
                                    <div id="serv_hover" className="room">
                                        <div className="room_img">
                                            <figure><img src={room.link_img} alt={room.name_img} /></figure>
                                        </div>
                                        <div className="bed_room">
                                            <h3><Link to={`../roomdetail/${room.id_post}`}>{room.post_name}</Link></h3>
                                            <h4>Giá: {room.room_price}</h4>
                                            <p>{room.description_sort}</p>
                                        </div>
                                    </div>
                                </div>
                    })
                )
                : 
                (
                    <div className="col-md-4 col-sm-6 searchroom">
                        <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png" alt='' width={200} height={200} className="shopee-search-empty-result-section__icon"></img>
                            <p className='searchroom'>Không tìm thấy kết quả nào</p>
                    </div>
                )
            }              
            </div>
        </div>
    </div>
</>
  )
}

export default Search