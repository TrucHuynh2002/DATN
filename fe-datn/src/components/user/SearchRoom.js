import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import RoomNew from '../../images/phong1.png';

function Search() {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const keyword = urlParam.get('keyword');
    const province = urlParam.get('province');
    const price = urlParam.get('price');
    const area = urlParam.get('area');
    const typeRoom = urlParam.get('typeRoom');
    const [Data,setData] = useState([])
    const getPostSearch = async () => {
        let res = await axios.get(`http://127.0.0.1:8000/api/search?keyword=${keyword}&&province=${province}&&price=${price}&&area=${area}&&typeRoom=${typeRoom}`);
        console.log(res.data)
        setData(res.data);
      }
    
    useEffect(() => {
        getPostSearch();
    },[])
    // console.log(keyword,province)
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
                Data.status == true && Data.data.length >= 1 ? (
                    Data.data.map((room,index) => {
                        return  <div className="col-md-4 col-sm-6">
                                    <div id="serv_hover" className="room">
                                        <div className="room_img">
                                            <figure><img src={RoomNew} alt="#" /></figure>
                                            <div class="heart">
                                            <i class='bx bxs-heart'></i>
                                            </div>
                                        </div>
                                        <div className="bed_room">
                                            <h3><Link to="../roomdetail">Nhà trọ sinh viên</Link></h3>
                                            <h4>Giá: 1.000.000 VNĐ</h4>
                                            <p>Mô tả nhà trọ sinh viên</p>
                                        </div>
                                    </div>
                                </div>
                    })
                )
                : 
                (
                      <div className="col-md-4 col-sm-6">
                                Không có kết quả tìm kiếm
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