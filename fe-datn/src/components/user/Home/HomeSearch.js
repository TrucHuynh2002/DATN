import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../../url';

function HomeSearch() {
  // scroll menu
  const [fix, setFix] = useState(false)
  function setFixed() {
    if(window.scrollY >= 100) {
      setFix(true)
    } else {
      setFix(false)
    }
  }
  window.addEventListener("scroll", setFixed)

  const navigate = useNavigate();
  useEffect(() => {
    getTypeRoom();
    getProvinces();
  },[]);
    // SEARCHING
  const [keyword,setKeyword] = useState({
    keywords: "",
    province: "",
    district: "",
    ward: "",
    price:"",
    area:"",
    typeRoom:""
  })
  const [getDataSearch,setGetDataSearch] = useState({
    typeRooms:[]
  });
  const {typeRooms} = getDataSearch
  const [getProvince,setProvince] = useState([]);
  const getTypeRoom = async () => {
    let dataRoom = await axios.get(`${url}/roomType/show`);
    setGetDataSearch({...getDataSearch,typeRooms:dataRoom.data.data})
  }
      const {
        keywords,
        id_province,
        id_district,
        id_ward,
        price,
        area,
        typeRoom
      } = keyword
      const getProvinces = async () => {
        let dataRooms = await axios.get(`${url}/province/showPostSearch`);
            setProvince(dataRooms.data.data)
          }
          const handledistrice = async (e) => {
            getDataDistrict(({[e.id_province] : e.target.value}).undefined)
            setKeyword({ ...keyword,province: e.target.value})
        }
       
        const handleadd = async (e) => {
            getDataWard(({[e.id_district] : e.target.value}).undefined)
            setKeyword({ ...keyword,district: e.target.value})
        }
        const handssdbdfb = async (e) => {
            setKeyword({ ...keyword,ward: e.target.value})
        }
          const [listDistrict, setListDistrict] = useState([]);
          const [listWard, setListWard] = useState([]);
          const getDataDistrict = async (id_province = '') => {
              const res = await axios.get(`${url}/post/show_districtSearch?id_province=${id_province}`);
              setListDistrict(res.data.data);
          }
          const getDataWard = async (id_district1  = '') => {
              const res = await axios.get(`${url}/post/show_ward?${id_district}`);
              setListWard(res.data.data);
          }     
          const [searching,setSearching] = useState(false);
          const [getKeywords,setgetKeywords] = useState([]);
          const [getDataPostSearch,setGetDataPostSearch] = useState([]);
          const [getimage,setgetImage] = useState([]);
          const getKeyword = async (keyword) => {
            const res = await axios.get(`${url}/getKeyWord/${keyword}`);
            setgetKeywords(res.data.data)
            setGetDataPostSearch(res.data.get_post)
            setgetImage(res.data.image);
          }
          
          const handleChangeKeyWord = (e) => {
            setKeyword({ ...keyword,[e.target.name]:e.target.value});
            if(e.target.value.length > 0){
              getKeyword(e.target.value)
              setSearching(true)
            }
            else{
              setSearching(false)
              
            }
          }
          const handleSubmitSearch = (e) => {
            e.preventDefault()
            navigate(`../searchroom?keyword=${keywords}&province=${keyword.province}&ward=${keyword.ward}&stress=${keyword.stress == undefined ? "" : keyword.stress}&district=${keyword.district}&price=${keyword.price}&area=${keyword.area}&typeRoom=${typeRoom}`);
          }
  return (
    <>
      <div className='container book_room2'>
                <h1>Tìm phòng trống</h1>
                <form className="book_now2" onSubmit={(e) => handleSubmitSearch(e)}>
                  <div className="row">
                    <div className={fix ? 'scroll_search' : 'col-lg-12 col-md-12 col-sm-12 btn-search'}>
                      <input className="timkiem" placeholder="Tìm kiếm phòng trọ bạn mong muốn" type="text" name="keywords" onChange={(e) => handleChangeKeyWord(e)} />
                      <i className='btn-i bx bx-search' style={{color:"#0d3380", display:"none"}}></i>
                          {searching == true &&  (
                              <div className='show_search'>
                                 <ul>
                                  {
                                    getDataPostSearch.length > 0 && getDataPostSearch.map((post,index) => {
                                      return (
                                        <li key={index}>
                                              <Link to={`../roomdetail/${post.id_post}`}>{post.post_name}</Link>
                                              <div style={{display:"flex"}}>
                                                <img src={post.link_img} alt={post.post_name} style={{marginRight: "12px", width:"120px", height:"120px"}} />
                                              </div>    
                                              <hr />                                
                                        </li>

                                      )
                                   })

                                  }
                            
                                  {
                                    getKeywords.length > 0 && getKeywords.map((keyword,index) => {
                                      return (
                                      <>
                                        <li key={index}>
                                          <Link to="room">{keyword.key_word}</Link>
                                        </li>
                                        <hr />
                                      </>
                                      )                                          
                                    })                                  
                                  }
                                   <li>
                                      <Link to={`searchroom?keyword=${keywords}&province=${keyword.province}&ward=${keyword.ward}&district=${keyword.district}&price=${keyword.price}&area=${keyword.area}&typeRoom=${typeRoom}`}>Tìm kiếm với {keywords}</Link>
                                    </li>
                                </ul>               
                              </div>    
                            )
                          }
                    </div>                     
                    </div>
                    <div className='row fitele-search'>
                      <div className="col-md-2 col-sm-12">
                        <select className="form-select online_book3" name="typeRoom" onChange={(e) => handleChangeKeyWord(e)}>
                          <option>Loại phòng</option>
                          {
                            typeRooms.map((r,i) => {
                              return <option key={i} value={r.id_room_type}>{r.name_room_type}</option>
                            })
                          }
                        </select>
                      </div>
                      <div className="col-md-2 col-sm-12">
                        <Form.Select name="id_provinces" className="form-select online_book4"  onChange = {(e) => handledistrice(e)}>
                          <option>Tỉnh</option>
                              {getProvince.map((p,i) => {
                                return <option key={i} value={p.id_province}>{p._name}</option>
                               }
                              )
                          }
                        </Form.Select>
                      </div>
                      <div className="col-md-2 col-sm-12">
                              <Form.Select name="id_district" className="form-select online_book5"
                              onChange = {(e) => handleadd(e)}
                              >
                                  <option>Quận/Huyện</option>
                                  {listDistrict.map((room, index) => {
                                      return (
                                          <option key={index} value={room.id_district}>{room._name}</option>
                                      );
                                  })}                            
                              </Form.Select>
                      </div>
                      <div className="col-md-2 col-sm-12">
                        <select className="form-select online_book6" name="price" onChange={(e) => handleChangeKeyWord(e)}>
                          <option>Giá</option>
                          <option value={1}>Dưới 1 triệu</option>
                          <option value={2}>Từ 1 - 2 triệu</option>
                          <option value={3}>Từ 2 - 3 triệu</option>
                          <option value={4}>Từ 3 - 5 triệu</option>
                          <option value={5}>Từ 5 - 7 triệu</option>
                          <option value={6}>Từ 7 - 10 triệu</option>
                          <option value={7}>Trên 10 triệu</option>
                        </select>
                      </div>
                      <div className="col-md-2 col-sm-12">
                        <select className="form-select online_book7" name="area" onChange={(e) => handleChangeKeyWord(e)}>
                          <option>Diện tích</option>
                          <option value="1">Dưới 20m</option>
                          <option value="2">Từ 20 - 30m</option>
                          <option value="3">Từ 30 - 50m</option>
                          <option value="4">Trên 50m</option>
                        </select>
                      </div>
                      <div className="col-md-2 col-sm-12">                     
                        <button type="submit" className="search_room_btn">Lọc</button>    
                      </div>               
                    </div>
                </form>
      </div>
    </>
  )
}

export default HomeSearch