import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../url';
import { TabTitle } from '../title';
import { Button } from 'react-bootstrap';
import HashLoader from "react-spinners/HashLoader";

function Search() {
    TabTitle('Kết quả tìm kiếm');
    const [loading, setLoading] = useState(false);
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const keyword = urlParam.get('keyword');
    const province = urlParam.get('province');
    const price = urlParam.get('price');
    const area = urlParam.get('area');
    const ward = urlParam.get('ward');
    const district = urlParam.get('district');
    const typeRoom = urlParam.get('typeRoom');
    const stress = urlParam.get('stress');
    // const Near = urlParam.get('Near');
    const [addTrendSearch, setListTrendSearch] = useState({
        key_word : keyword,
      })
    const {key_word} = addTrendSearch
    const [aData,setData] = useState([])
    const getPostSearch = async (keywordss = '') => {
        let res = await axios.get(`${url}/searchAll?keyword=${keyword}&&province=${province}&&stress=${stress}&&ward=${ward}&&district=${district}&&price=${price}&&area=${area}&&typeRoom=${typeRoom}&&keywordss=${keywordss}`);
        setData(res.data);
        if(aData){
            let ress = await axios.post(`${url}/search`, addTrendSearch); 
            // console.log(ress);
        }
    }
    const handleChangeSearch = (e) => {
        getPostSearch(e.target.value)
      }
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
        getPostSearch();
    },[]);

  return (
    <>
    {loading ? 
        <HashLoader className='css_loading'
        color={'#0d3380'}
        loading={loading}
        size={100}
        style={{display: 'inherit', position: 'relative', height: '100px', transform: 'rotate(165deg)'}}
        />
        :
        <>
            <div className="back_re">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 ">
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
                        <div className='SearchRoom'>
                            <input className="inputRoomSearch" placeholder="Tìm kiếm phòng trọ mong muốn" onChange={(e) => handleChangeSearch(e)} type="text" name="keywords"/>
                            <Button className='SearchRoomButton'><i className="fa-solid fa-search"></i></Button>
                        </div>                 
                        <div>
                            {aData.status == true && aData.data.length >= 1 && <p><em>Có {aData.data.length} kết quả tìm kiếm </em></p>} 
                            <hr />
                        </div>
                    {
                        aData.status == true && aData.data.length >= 1 ? (
                            aData.data.map((room,index) => {
                                return  <div className="col-md-4 col-sm-12" key={index}>
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
                            <div className="col-md-4 col-sm-12 searchroom">
                                <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png" alt='' width={300} height={300} className="shopee-search-empty-result-section__icon"></img>
                                    <p className='searchroom'>Không tìm thấy được kết quả nào ! Vui lòng nhập lại từ khóa bạn cần tìm</p>
                            </div>
                        )
                    }              
                    </div>
                </div>
            </div>
        </>
    }
    </>
  )
}

export default Search