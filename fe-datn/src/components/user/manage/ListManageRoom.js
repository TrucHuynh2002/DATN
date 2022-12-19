import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import Pagination from '../Pagination';
// import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import EditManage from './EditManage';

ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Title, ArcElement, Legend
);
function ListManageRoom() {
    const dataLine = {
        labels: ["2022", "2020", "2021"],
        datasets: [{
            data: [2, 3, 3.5, 5.5, 6, 7],
            backgroundColor: 'transparent',
            borderColor: 'red',
            pointBoderColor: 'transparent',
            pointBorderWidth: 4,
            tension: 0.5
        }]
      };
   
      const options = {
        plugins: {
            legend: false
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                min: 1,
                max: 10,
                tick: {
                    stepSize: 2,
                    callback: (value) => value + 'K'
                },
                grid: {
      
                }
            }
        }
      };
    var user = JSON.parse(localStorage.getItem("user"));
    const {id_user} = useParams();
    const [listPost, setListPost] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ postsPerPage, setPostsPerPage ] =useState(10);
    const lastPageIndex = currentPage * postsPerPage;
    const firstPageIndex = lastPageIndex - postsPerPage;
    const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);
    const [quantityPost, setQuantityPost] = useState([]);
    const [roomNumber, setRoomNumber] = useState([]);
    const [listBill, setBill] = useState([]);
    const [listMomneyWater, setMomneyWater] = useState(0);
    const [listMomneyRoom, setMomneyRoom] = useState(0);
    const [listMomneyElc, setMomneyElc] = useState(0);
    
    
    const [Input, setInput] = useState({
        electricity_month : "",
        water_month : "",
    });
   
    const {electricity_month ,water_month } = Input;
  
    const [buttonID, setButtonID] = useState();
    const [alert, setAlert] = useState({
        err_list: {},
    });
    const [check, setCheck] = useState(true);

    const [addBill, setAddBill] = useState({
        water_money: "",
        electricity_money: "",
        all_money: "",
        id_roomNumber: ""
    });
    const {water_money, electricity_money, all_money, id_roomNumber} = addBill;
   
    useEffect(() => {
        getData();
    },[]);

     // Xử lý input vlaue
    const handleChangeAddbill = async (e) => {
        setAddBill({ ...addBill, [e.target.name] : e.target.value});
    }
    // lấy giá trị input 
    const handleChangeInputWater = async (e) => {
        setInput({...Input,[e.target.name]: e.target.value})
        setMomneyWater(e.target.value * listBill[0].water_price)
        setMomneyRoom( Number(e.target.value)  + Number(listMomneyElc) + Number(listBill[0].room_price))
    }
    const handleChangeInputElc = async (e) => {
        setInput({...Input,[e.target.name]: e.target.value})
        setMomneyElc(e.target.value * listBill[0].electricity_price)
        setMomneyRoom(Number(listMomneyWater) + Number(e.target.value) + Number(listBill[0].room_price))
    }

    // danh sach user
    const getData = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/post/showUser/${id_user}`); 
        setListPost(res.data.data);
    };

    const handleChange = async (e,id_post) => {
        const res = await axios.get(`http://127.0.0.1:8000/api/roomNumber/show_one/${id_post}`);
     
        setQuantityPost(res.data.data);
    };
    const [yellow,setYellow] = useState(false)
    const [blue,setBlue] = useState(false)
    const [white,setWhite] = useState(false)
    const [active,setActive] = useState({
        id_rooms:"",
        status: "",
        checked:false,
        id_user_two: "",
        id_post: ""
    })
    const {
        id_rooms,
        status,
        checked,
        id_user_two,
        id_post
    } = active
    const [alertError,setAlertError] = useState('')
   

    const handleClickBlue = async (e,quality) =>{
        // setQuantityButtonAll(false)
        // setQuantityButton()

        setBlue(true);
        yellow ?  setYellow(false) : setYellow(true);
        setWhite(true);
        // yellow && setYellow(false);
        // white && setWhite(false);
        var button_bill = document.querySelector('#bill_button')
        var list_bill = document.querySelector('#edit_list_manage')
        var room_number = document.querySelector(`[data-id="${quality}"]`)
        check ? room_number.style.background = 'red' : room_number.style.background = '' 
        check ? button_bill.style.display = 'initial' :  button_bill.style.display = 'none' 
        check ? list_bill.style.display = 'contents' :  list_bill.style.display = 'none' 
        check ?  setRoomNumber({[e.id]:quality}) : setRoomNumber('')
        check ? setCheck(false) :  setCheck(true)
    }
    const handleClickYellow = async (e,quality) => {
     
        var buttton = document.querySelector('#room_number_button')
        var room_number = document.querySelector(`[data-id="${quality}"]`)
        check ? room_number.style.background = 'red' : room_number.style.background = '' 
        check ? buttton.style.display = 'initial' :  buttton.style.display = 'none' 
        check ? setCheck(false) :  setCheck(true) 
        check ? setButtonID({[e.id]:quality}) : setButtonID('')
    }

    const handleClickWhite = async (e,quality) => {
       
        var buttton = document.querySelector('#room_number_button')
        var room_number = document.querySelector(`[data-id="${quality}"]`)
        check ? room_number.style.background = 'red' : room_number.style.background = '' 
        check ? buttton.style.display = 'initial' :  buttton.style.display = 'none' 
        check ? setCheck(false) :  setCheck(true)
        check ? setButtonID({[e.id]:quality}) : setButtonID('')
    }

    const handleClickRoom = (e,id_room,typeRoom,id_user_two= '',id_post = '') => {
        // status === typeRoom
        // ?
        // setActive({...active,[id_room]: quality })
        // :
        // active.length <= 0 && setActive([...active,{id_rooms:id_room, status: typeRoom}])
        // active.length > 0 && active.map((arr,i) => {
            
        //     if(arr.status == typeRoom){
        //         console.log(arr.id_rooms,id_room)
        //         if(arr.id_rooms != id_room){
        //             // return setActive([...active,{id_room:id_room, status: typeRoom}])
                    
                    
        //             setActive([...active,{id_rooms:id_room, status: typeRoom}])
        //             console.log('khác nè')
                
        //         }else{
        //             console.log('giống quà')
        //         }
        //     }
        //     else if(arr.status != typeRoom){
        //        console.log('Ôi khác room bạn ơi!')
        //        setActive([{id_rooms:id_room, status: typeRoom}])
        //     }           
        // })

        
        // active.length > 0 && active.map((arr,i) => {
        //    return  arr.id_room == id_room 
        //     ?
        //     '223'
        //     :
        //      ''
        // })
        // console.log(id_room)
        setActive({id_rooms:id_room, status: typeRoom,checked:true,id_user_two: id_user_two,id_post: id_post})        
    }

    // Trả phòng
    const handleCheckOut = async (e) => {
        const res = await axios.get(`http://127.0.0.1:8000/api/roomNumber/checkout/${id_rooms}`);
        if(res.data.status == true){
            handleChange(e,id_post)
            setActive({id_rooms:id_rooms, status: 0,checked:true,id_user_two: '',id_post: ''})    
        }
        // setActive({id_rooms:"", status: 0,checked:true,id_user_two: '',id_post: ''})       
    }

    // Bỏ chọn
    
    const CancelSelect = (e) => {
        setActive({id_rooms:"", status: "",checked:false})
    }

    const handleClickUpdate = async (e) => {
        const res = await axios.post(`http://127.0.0.1:8000/api/roomNumber/update_user/${id_rooms}?id_user_two=${id_user_two}&&_method=PUT`,);
        if(res.data.status === true){
            handleChange(e,id_post)    
            setAlert({
                err_list: res.data
            });
        }
        else{           
            setAlert({
                err_list: res.data
            });
        }
    };

  

    // show add bill
    const [showAddBill, setShowAddBill] = useState(false);
    const handleCloseAddBill = () => setShowAddBill(false);
    const handleShowAddBill = async (e) => {
        setShowAddBill(true)
       
        const res = await axios.get(`http://127.0.0.1:8000/api/roomNumber/show_post/${id_rooms}`);
        
        setBill(res.data.data);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
            });
        }
        else{           
            setAlert({
                err_list: res.data
            });
        }
    }
   
    const handleSumbitAddBill = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('water_money', listMomneyWater);
        formData.append('electricity_money', listMomneyElc);
        formData.append('all_money', listMomneyRoom);
        formData.append('id_roomNumber', id_rooms);
        const res =  await axios.post('http://127.0.0.1:8000/api/bill/create', formData);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
            });
        }
        else{
            setAlert({
                err_list: res
            });
        }
    };
    
  

  return (
    <div className="row">
        <div className="manage col-md-6 col-lg-4 col-sm-12">
            <div className="container-fluid">
                <div className="content_profile">
                    <div className="list-post">
                        <h1><b className="b_title">Tin đã đăng</b></h1>
                        <hr></hr>
                        <div className='row'>
                            {currentPosts.length > 0 ?
                            currentPosts.map((post, index) => {
                                return (    
                                <div className='col-md-12' key={index} onClick={(e) =>handleChange(e,post.id_post)}>
                                    <div className='account_content____' >
                                        <span>  {index+1} / </span>
                                      <span>  {post.post_name}</span>
                                    </div>
                                </div>
                            )})
                            : <div className="text-center No_user____">
                            <img className="img_________" src="https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A3nh-icon-bu%E1%BB%93n-mu%E1%BB%91n-kh%C3%B3c-1024x1024.jpg" alt="images" />
                            <p>Chưa đăng bài nào </p>
                        </div>
                        }
                            {/* phan trang */}
                            <Pagination totalPost={listPost.length} 
                            postsPerPage={postsPerPage} 
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="manage col-md-8 col-sm-12">
            <div className="content_profile">
                <div className="list-post">
                    <div className='row'>
                        {quantityPost.map((quantity,index)=>{

                            if(quantity.status == 1 ) {
                              return  (
                          
                                
                                    <>
                                        <div className={`circle circle-yellow text-center red_room_number ${quantity.id == id_rooms && 'red'} `}
                                            style={{background:quantity.id == id_rooms ? "red" : ''}}
                                            name="id_" key={index} 
                                            data-id ={quantity.id}
                                            onClick={(e) => handleClickRoom(e,quantity.id,quantity.status,quantity.id_user_two,quantity.id_post)} >
                                                A{quantity.room_number}
                                               
                                        </div>
                                     

                                    </>
                                
                                ) 
                            }else if( quantity.status == 2 ){
                                return  (
                                    <>
                                     <div className={`circle circle-blue text-center `}
                                        style={{background:quantity.id == id_rooms ? "red" : ''}}
                                        key={index} 
                                        data-id ={quantity.id}
                                        onClick={e => handleClickRoom(e,quantity.id,quantity.status,'',quantity.id_post)} 
                                    > 
                                            A{quantity.room_number}
                                            
                                    </div> 
                                    
                                  
                                      
                                    
                                    </>
                                )
                            }else{
                              return     (
                                    <>
                                     <div 
                                     className={`circle circle-white text-center ${quantity.id == id_rooms && 'red'} ` }
                                     style={{background:quantity.id == id_rooms ? "red" : ''}}
                                     data-id={quantity.id}
                                     onClick={(e) => handleClickRoom(e,quantity.id,quantity.status,quantity.id_user_two,quantity.id_post)} 
                                     key={index} >
                                             A{quantity.room_number}
                                            
                                     </div> 
                                    
                                      

                                    </>
                                 )
                            }
                         
                        }
                        )}

                        {
                            checked  &&
                            <div>
                                <Button variant="danger" onClick={e => CancelSelect(e)}>Hủy bỏ chọn</Button>
                            </div>
                        }

                       { status == 2 && (<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px",marginTop:"12px"}}>
                            <div style={{border:"1px solid red",padding:"4px 6px",cursor:"pointer"}} onClick={e => handleShowAddBill(e)}>
                                    Thêm hóa đơn
                            </div>
                            <div onClick={e => handleCheckOut(e)} style={{border:"1px solid red",padding:"4px 6px",cursor:"pointer"}}>
                                    Đã trả phòng
                            </div>
                        </div>)}
                       
                        <div className='color_room_manage' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <div className='color_ownership_room'></div><span style={{marginLeft:"5px"}}>Phòng trống</span>
                            <div className='color_empty_room'></div><span style={{marginLeft:"5px"}}>Phòng đã sở hữu</span>
                            <div className='color_deposit_room'></div><span style={{marginLeft:"5px"}}>Phòng đặt cọc</span>
                        </div>
        
                    </div>                      
                </div>       
                    
                <div className="room_number____">
                {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
              
                {
                    status == 0
                    &&
                    <>
                    <Button style={{display:"block"}} id="room_number_button" className="btn btn-primary" onClick={(e) => handleClickUpdate(e)} >Cập nhật phòng đã sở hữu</Button>
                    </>

                }    
                {
                    status == 1
                    &&
                    <>
                    <Button style={{display:"block"}} id="room_number_button" className="btn btn-primary" onClick={(e) => handleClickUpdate(e)} >Cập nhật phòng đã sở hữu</Button>
                    </>

                }    
               
                </div>
                
                <div className="row">
                    <div className="bill____ col-lg-6 col-sm-12">
                        <Button id="bill_button" 
                        className="btn btn-primary" 
                        onClick={(e) =>handleShowAddBill()}
                        >
                            Thêm hóa đơn
                        </Button>
                    </div>
                    {/* start add bill */}
                    <Modal show={showAddBill} onHide={handleCloseAddBill} >
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm hóa đơn</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e) => handleSumbitAddBill(e)}>
                                {listBill.map((bill,index) => {
                                    return ( 
                                        <div key={index}>
                                        <Form.Group className="mb-12">
                                            <Form.Label>Tên phòng</Form.Label>
                                            <Form.Control type="text" disable="true" value={bill.post_name}/>
                                        </Form.Group>
                                        <Form.Group className="mb-12">
                                            <Form.Label>Người sở hữu</Form.Label>
                                            <Form.Control type="text" disable="true" value={bill.id_user_two}/>
                                        </Form.Group>
                                        <Form.Group className="mb-12">
                                            <Form.Label>Tiền điện/KWH</Form.Label>
                                            <Form.Control type="text" disable="true" 
                                                name="electricity"
                                            value={bill.electricity_price} 
                                            
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-12">
                                            <Form.Label>Tiền nước /m<sup>3</sup></Form.Label>
                                            <Form.Control type="text" disable="true" 
                                            name="water"
                                            value={bill.water_price} 
                                                />
                                        </Form.Group>
                                        <Form.Group className="mb-12">
                                            <Form.Label>Giá phòng</Form.Label>
                                            <Form.Control type="number" disable="true" 
                                            value={bill.room_price}
                                                name="room_money"
                                                
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-12">
                                            <Form.Label>Số nước tiêu thụ / 1 tháng </Form.Label>
                                            <Form.Control type="number" 
                                            name="water_month"
                                            value={water_month}
                                            placeholder="Vui lòng nhập số nước tiêu thụ trên 1 tháng" required 
                                            onChange = {(e) => handleChangeInputWater(e)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-12">
                                            <Form.Label>Số điện tiêu thụ / 1 tháng</Form.Label>
                                            <Form.Control type="number" 
                                            name="electricity_month"
                                            value={electricity_month}
                                            placeholder="Vui lòng nhập số điện tiêu thụ trên 1 tháng" required 
                                            onChange = {(e) => handleChangeInputElc(e)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-12 water_money">
                                            <Form.Label>Tổng tiền nước</Form.Label>
                                            <Form.Control type="text" 
                                            disable="true"
                                            value={listMomneyWater}
                                            name="water_money" 
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-12 electricity_money">
                                            <Form.Label>Tổng tiền điện</Form.Label>
                                            <Form.Control type="text" 
                                            name="electricity_money"
                                            disable="true" 
                                            value={listMomneyElc}

                                                />
                                        </Form.Group>
                                        <Form.Group className="mb-12 all_money">
                                            <Form.Label>Tổng tiền phòng</Form.Label>
                                            <Form.Control 
                                            name="all_money" 
                                            disable="true" 
                                            value={listMomneyRoom}
                                            />
                                        </Form.Group>
                                    </div> );
                                })}
                                <Form.Group>
                                <hr />
                                 <Button type="submit">Thêm</Button>
                                </Form.Group>
                                <Form.Group>
                                    {
                                        alert.err_list.status == true 
                                        &&
                                        <div className='text-success'>
                                            Thêm hóa đơn thành công
                                        </div>

                                    } 
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    {/* end add bill */}
                </div>
            </div>  
            <div className="content_profile" id="edit_list_manage">
                <EditManage id_roomNumber={roomNumber.undefined} />                                   
            </div>      
        </div>      
        </div>      
  )
}

export default ListManageRoom