import React, { useEffect, useState } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Button} from 'react-bootstrap';

function Square() {
    const navigate = useNavigate();
    const {id_post} = useParams();
    const [quantityPost, setQuantityPost] = useState([]);
    const [buttonID, setButtonID] = useState([]);
    const [check, setCheck] = useState(true);
    useEffect(() => {
        getData();
    },[]);
    
    // danh sach 

    const getData = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/roomNumber/show_one/${id_post}`); 
        setQuantityPost(res.data.data);
    };
    const handleClick = async (e,quality,id_number) => {
        var buttton = document.querySelector('#room_number_button')
        var room_number = document.querySelector(`[data-id="${id_number}"]`)
        check ? room_number.style.background = 'red' : room_number.style.background = '#e6dde663' 
        check ? buttton.style.display = 'inline-block' :  buttton.style.display = 'none' 
        check ? setCheck(false) :  setCheck(true)
        setButtonID({...buttonID,[e.id]:quality})

    }
    const handleClickTo = async (e) => {
        const id = buttonID.undefined;
        e.preventDefault()
        navigate(`../roomDetailManage?id_post=${id_post}&id_roomNumber=${id}`);
    };
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2 className="b_title">Xem phòng</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="manage">
            <div className="container">
                <div className="content_profile">
                    <div className="list-post">
                        <div className='row'>
                        {quantityPost.map((quantity,index)=>{
                               return quantity.status == 1 
                                    ?
                                    (
                                        <div className="circle circle-yellow text-center " 
                                        name="id_" key={index} 
                                        >
                                            A{quantity.room_number}
                                        </div>
                                    ) : 
                                    quantity.status == 2 
                                    ?
                                    (
                                        <div className="circle circle-blue text-center" key={index} >
                                              A{quantity.room_number}
                                        </div> 
                                       
                                    )
                                    :
                                    (
                                        <div className="circle circle-white text-center red_room_number" key={index}
                                        data-id ={quantity.room_number}
                                        onClick={(e) => handleClick(e,quantity.id,quantity.room_number)} >
                                             A{quantity.room_number}
                                        </div> 
                                    )
                            }
                            )}
                        </div>  
                        <div className='color_room_manage'>
                            <div className='color_ownership_room'></div><span style={{marginLeft:"5px"}}>Phòng trống</span>
                            <div className='color_empty_room'></div><span style={{marginLeft:"5px"}}>Phòng đã sở hữu</span>
                            <div className='color_deposit_room'></div><span style={{marginLeft:"5px"}}>Phòng đặt cọc</span>
                        </div>
                        <div className="room_number____">
                            <Link id="room_number_button" className="btn btn-primary roomNumber_link" onClick={(e) =>handleClickTo(e)}>Đặt phòng</Link> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Square