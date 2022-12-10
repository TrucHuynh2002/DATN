import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Pagination from '../Pagination';

function RoomND() {
  var user = JSON.parse(localStorage.getItem("user"));

  const [listPost, setListPost] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] =useState(9);
  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);
  // danh sach post
  useEffect(() => {
    getData();
    getImg();
  },[]);

  const [alert, setAlert] = useState({
    err_list: {},
  });  
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/post/show');
   setListPost(res.data.data);    
  };
  const getImg = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/imgPost/show`);
    setListImg(res.data.data);   
};

// search
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
const {typeRooms} = getDataSearch
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
    const getProvinces = async () => {
      let dataRooms = await axios.get("http://127.0.0.1:8000/api/province/show");
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
        const getDataDistrict = async (id_province) => {
            const res = await axios.get(`http://127.0.0.1:8000/api/post/show_district/${id_province}`);
            setListDistrict(res.data.data);
        }
        const getDataWard = async (id_district) => {
            const res = await axios.get(`http://127.0.0.1:8000/api/post/show_ward/${id_district}`);
            setListWard(res.data.data);
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
    <div className=''>
      <div className='row search_room'>
        <div className="col-2">
          <select className="form-select online_book3" name="typeRoom" onChange={(e) => handleChangeKeyWord(e)}>
            <option>Loại phòng</option>
            {
              typeRooms.map((r,i) => {
                return <option key={i} value={r.id_room_type}>{r.name_room_type}</option>
              })
            }
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
            <button type="submit" className='search_room_btn'>Lọc</button> 
        </div>
      </div>
    </div>

    <div className="our_room">
        <div className="container">
            <div className="row">
            {currentPosts.map((post, index) => {
                return (     
                  <div className="col-md-4 col-sm-6" key={index}>
                      <div id="serv_hover" className="room">
                          <div className="room_img">
                          {listImg.map((a, index) => {
                            return a.id_post == post.id_post && (
                              <figure key={index}><img src={a.link_img_user} alt="#" /></figure>
                              )})}

                              {/* thả tym */}
                              {/* {listHeart.map((heart, index) => { */}
                              <div className="btn-heart" value={post.id_post}>
                               
                              </div>
                                {/* })}  */}
                          </div>
                          <div className="bed_room">
                              <h3><Link to={`../roomdetail/${post.id_post}`}>{post.post_name}</Link></h3>
                             <span className='currency'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(post.room_price)}</span>
                              <p>{post.description_sort}</p>
                          </div>
                      </div>
                  </div>
                );
              })}
            </div>
            {/* phan trang */}
            <Pagination totalPost={listPost.length} 
            postsPerPage={postsPerPage} 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage} />

        </div>
    </div>
  </>
  )
}

export default RoomND
