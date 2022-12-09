import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

function HomeSearch() {
    const navigate = useNavigate();
    
    useEffect(() => {
        getTypeRoom()
        getProvinces()
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
          const {
            typeRooms,
          } = getDataSearch
      
          const [getProvince,setProvince] = useState([]);
          const getTypeRoom = async () => {
            let dataRoom = await axios.get("http://127.0.0.1:8000/api/roomType/show");
            setGetDataSearch({...getDataSearch,typeRooms:dataRoom.data.data})
          }
          const {
            keywords,
            province,
            district,
            ward,
            price,
            area,
            typeRoom
          } = keyword
          // console.log(district);
          const getProvinces = async () => {
            let dataRooms = await axios.get("http://127.0.0.1:8000/api/province/show");
            setProvince(dataRooms.data.data)
          }
          const handledistrice = async (e) => {
            // setAddPost({ ...addPost, [e.target.name] : e.target.value});
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
          const getDataDistrict = async (id_province) => {
              const ress = await axios.get(`http://127.0.0.1:8000/api/post/show_district/${id_province}`);
              setListDistrict(ress.data.data);
          }
          const getDataWard = async (id_district) => {
              const resss = await axios.get(`http://127.0.0.1:8000/api/post/show_ward/${id_district}`);
              setListWard(resss.data.data);
          }     
          const [searching,setSearching] = useState(false);
          const handleChangeKeyWord = (e) => {
            setKeyword({ ...keyword,[e.target.name]:e.target.value})
          }
          const handleSubmitSearch = e => {
            e.preventDefault()
            navigate(`searchroom?keyword=${keywords}&province=${keyword.province}&ward=${keyword.ward}&district=${keyword.district}&price=${keyword.price}&area=${keyword.area}&typeRoom=${typeRoom}`);
          }

  return (
    <>
      <div className="book_room2">
                <h1>Tìm phòng trống</h1>
                <form className="book_now2" onSubmit={(e) => handleSubmitSearch(e)}>
                  <div className="row">
                    <div className="col-10">
                      <input className="form-control" placeholder="Tìm kiếm" type="text" name="keywords" onChange={(e) => handleChangeKeyWord(e)} />
                          {searching && (
                              <div className='show_search'>
                              <ul>
                                <li>
                                  <Link to="">Nhà trọ cần thơ</Link>
                                </li>
                              </ul>                            
                            </div>    
                            )
                          }
                      </div>                     
                      <div className="col-1">
                        <button className="btn btn-outline-secondary">
                          <i class='bx bx-search' style={{color:"#0d3380"}}></i>
                        </button>
                      </div>
                    </div>
                    <div className='row fitele-search'>
                      <div className="col-2">
                        <select className="form-select online_book3" name="typeRoom" onChange={(e) => handleChangeKeyWord(e)}>
                          <option>Loại phòng</option>
                          {
                            typeRooms.map((r,i) => {
                              return <option key={i} value={r.id_room_type}>{r.name_room_type}</option>
                            })
                          }
                          
                          {/* <option>Căn hộ mini</option> */}
                        </select>
                      </div>
                      <div className="col-2">
                        <Form.Select name="provinces" className="form-select online_book3"  onChange = {(e) => handledistrice(e)}>
                          <option>Tỉnh</option>
                          {
                            getProvince.map((p,i) => {
                              return <option key={i} value={p.id}>{p._name}</option>
                            })
                          }
                        
                        </Form.Select>
                      </div>
                      <div className="col-2">
                              <Form.Select name="id_district" className="form-select online_book3"
                              onChange = {(e) => handleadd(e)}
                              >
                                  <option>Quận/Huyện</option>
                                  {listDistrict.map((room, index) => {
                                      return (
                                          <option key={index} value={room.id}>{room._name}</option>
                                      );
                                  })}                            
                              </Form.Select>
                      </div>
                      <div className="col-2">
                              <Form.Select name="id_ward" className="form-select online_book3"
                              onChange = {(e) => handssdbdfb(e)}
                              > 
                              <option>Xã</option>
                                  {listWard.map((room, index) => {
                                      return (
                                          <option key={index} value={room.id}  >{room._name}</option>
                                      );
                                  })}                            
                              </Form.Select>
                      </div>
                      <div className="col-2 ">
                        <select className="form-select online_book3" name="price" onChange={(e) => handleChangeKeyWord(e)}>
                          <option>Giá</option>
                          <option value={1}>Dưới 1 triệu</option>
                          <option value={2}>Từ 1 - 2 triệu</option>
                        </select>
                      </div>
                      <div className="col-2 ">
                        <select className="form-select online_book3" name="area" onChange={(e) => handleChangeKeyWord(e)}>
                          <option>Diện tích</option>
                          <option value="1">Dưới 20m</option>
                          <option value="2">Trên 20m</option>
                        </select>
                      </div>
                      <div className="col-2">
                          <button type="submit" className="book_btn">Xem kết quả</button>
                      </div>
                    </div>
                </form>
      </div>
    </>
  )
}

export default HomeSearch