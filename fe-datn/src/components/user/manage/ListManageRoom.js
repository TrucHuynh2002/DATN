import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import Pagination from '../Pagination';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Title, ArcElement, Legend } from 'chart.js';

ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Title, ArcElement, Legend
);
function ListManageRoom() {
     // chartjs pie
  const dataPie = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [{
      data: [2, 5, 10],
      backgroundColor: [
        'red',
        'blue',
        'yellow'
      ]
    }],
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
    const [buttonID, setButtonID] = useState({
        status:2,
    });
    const [alert, setAlert] = useState({
        err_list: {},
    });
    const [check, setCheck] = useState(true);
    useEffect(() => {
        getData();
    },[]);
    // danh sach Posted
    const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/post/showUser/${id_user}`); 
    setListPost(res.data.data);
    };
    const handleChange = async (id_post) => {
        const res = await axios.get(`http://127.0.0.1:8000/api/roomNumber/show_one/${id_post}`); 
        setQuantityPost(res.data.data);
    };
    const handleClick = async (e,quality,id_number) => {
        var buttton = document.querySelector('#room_number_button')
        var room_number = document.querySelector(`[data-id="${id_number}"]`)
        check ? room_number.style.background = 'red' : room_number.style.background = 'yellow' 
        check ? buttton.style.display = 'initial' :  buttton.style.display = 'none' 
        check ? setCheck(false) :  setCheck(true)
        setButtonID({...buttonID,[e.id]:quality})

    }
    const handleClickWhite = async (e,quality,id_number) => {
        var buttton = document.querySelector('#room_number_button')
        var room_number = document.querySelector(`[data-id="${id_number}"]`)
        check ? room_number.style.background = 'red' : room_number.style.background = '#e6dde663' 
        check ? buttton.style.display = 'initial' :  buttton.style.display = 'none' 
        check ? setCheck(false) :  setCheck(true)
        setButtonID({...buttonID,[e.id]:quality})

    }
    const handleClickUpdate = async () => {
        const id = buttonID.undefined;
        const res = await axios.post(`http://127.0.0.1:8000/api/roomNumber/update/${id}?_method=PUT`,buttonID);
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
    };
    const handleClickBlue = async (e,quality,id_number) =>{
        var button_bill = document.querySelector('#bill_button')
        var button_edit = document.querySelector('#edit_bill_button')
        var room_number = document.querySelector(`[data-id="${id_number}"]`)
        check ? room_number.style.background = 'red' : room_number.style.background = 'blue' 
        check ? button_bill.style.display = 'initial' :  button_bill.style.display = 'none' 
        check ? button_edit.style.display = 'initial' :  button_edit.style.display = 'none' 
        check ? setCheck(false) :  setCheck(true)
    }
    // show add bill
    const [showAddBill, setShowAddBill] = useState(false);
    const handleCloseAddBill = () => setShowAddBill(false);
    const handleShowAddBill = () => setShowAddBill(true);
    const [addBill, setAddBill] = useState({
        water_money: "",
        electricity_money: "",
        all_money: "",
        id_roomNumber: ""
    });
    const {water_money, electricity_money, all_money, id_roomNumber} = addBill;
    // Xử lý input vlaue
    const handleChangeAddbill = async (e) => {
        setAddBill({ ...addBill, [e.target.name] : e.target.value});
    }
    const handleSumbitAddBill = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('water_money', water_money);
        formData.append('electricity_money', electricity_money);
        formData.append('all_money', all_money);
        formData.append('id_roomNumber', id_roomNumber);
        const res =  await axios.post('', formData);
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


    // show edit bill
    const [showEditBill, setShowEditBill] = useState(false);
    const handleCloseEditBill = () => setShowEditBill(false);
    const handleShowEditBill = () => setShowEditBill(true);

  return (
    <div className="row">
        <div className="manage col-5">
            <div className="container">
                <div className="content_profile">
                    <div className="list-post">
                        <h1><b className="b_title">Tin đã đăng</b></h1>
                        <hr></hr>
                        <div className='row'>
                            {currentPosts.length > 0 ?
                            currentPosts.map((post, index) => {
                                return (    
                                <div className='col-md-12' key={index} onClick={(e) =>handleChange(post.id_post)}>
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
        <div className="manage col-7">
                <div className="content_profile">
                    <div className="list-post">
                        <div className='row'>
                            {quantityPost.map((quantity,index)=>{
                               return quantity.status == 1 
                                    ?
                                    (
                                        <div className="circle circle-yellow text-center red_room_number" 
                                        name="id_" key={index} 
                                        data-id ={quantity.room_number}
                                        onClick={(e) => handleClick(e,quantity.id,quantity.room_number)} >
                                            A{quantity.room_number}
                                        </div>
                                    ) : 
                                    quantity.status == 2 
                                    ?
                                    (
                                        <div className="circle circle-blue text-center"
                                        key={index} 
                                        data-id ={quantity.room_number}
                                        onClick={(e) => handleClickBlue(e,quantity.id,quantity.room_number)} > 
                                              A{quantity.room_number}
                                        </div> 
                                       
                                    )
                                    :
                                    (
                                        <div className="circle circle-white text-center" 
                                        data-id={quantity.room_number}
                                        onClick={(e) => handleClickWhite(e,quantity.id,quantity.room_number)} 
                                        key={index} >
                                             A{quantity.room_number}
                                        </div> 
                                    )
                            }
                            )}
                         
                            <div className='color_room_manage'>
                                <div className='color_ownership_room'></div><span style={{marginLeft:"5px"}}>Phòng trống</span>
                                <div className='color_empty_room'></div><span style={{marginLeft:"5px"}}>Phòng đã sở hữu</span>
                                <div className='color_deposit_room'></div><span style={{marginLeft:"5px"}}>Phòng đặt cọc</span>
                            </div>
           
                        </div>                      
                    </div>       
                       
                    <div className="room_number____">
                    {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
                        <Button id="room_number_button" className="btn btn-primary" onClick={(e) => handleClickUpdate()} >Cập nhật phòng đã sở hữu</Button>
                    </div>
                    
                   <div className="row">
                        <div className="bill____ col-lg-6 col-sm-12">
                            <Button id="bill_button" className="btn btn-primary" onClick={handleShowAddBill}>
                            Thêm hóa đơn
                            </Button>
                        </div>
                        {/* start add bill */}
                        <Modal show={showAddBill} onHide={handleCloseAddBill} onSubmit={(e) => handleSumbitAddBill(e)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Thêm hóa đơn</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-12 post_name">
                                        <Form.Label>Tên phòng</Form.Label>
                                        <Form.Control type="text" name="post_name" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12">
                                        <Form.Label>Người sở hữu</Form.Label>
                                        <Form.Control type="text" name="" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12">
                                        <Form.Label>Tiền điện/KWH</Form.Label>
                                        <Form.Control type="text" name="" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12">
                                        <Form.Label>Tiền phòng/m<sup>3</sup></Form.Label>
                                        <Form.Control type="text" name="" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12">
                                        <Form.Label>Giá phòng</Form.Label>
                                        <Form.Control type="text" name="" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12 electricity_money">
                                        <Form.Label>Tổng tiền điện</Form.Label>
                                        <Form.Control type="text" name="electricity_money" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12 water_money">
                                        <Form.Label>Tổng tiền nước</Form.Label>
                                        <Form.Control type="text" name="water_money" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12 all_money">
                                        <Form.Label>Tổng tiền phòng</Form.Label>
                                        <Form.Control type="text" name="all_money" className=''/>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="primary">
                                Thêm
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        {/* end add bill */}
                        <div className="edit_bill____ col-lg-6 col-sm-12">
                            <Button id="edit_bill_button" className="btn btn-primary" onClick={handleShowEditBill}>
                                Cập nhật hóa đơn 
                            </Button>
                        </div>
                       {/* start edit bill */}
                       <Modal show={showEditBill} onHide={handleCloseEditBill}>
                            <Modal.Header closeButton>
                                <Modal.Title>Cập nhật hóa đơn</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Form>
                                    <Form.Group className="mb-12 post_name">
                                        <Form.Label>Tên phòng</Form.Label>
                                        <Form.Control type="text" name="post_name" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12">
                                        <Form.Label>Người sở hữu</Form.Label>
                                        <Form.Control type="text" name="" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12">
                                        <Form.Label>Tiền điện/KWH</Form.Label>
                                        <Form.Control type="text" name="" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12">
                                        <Form.Label>Tiền phòng/m<sup>3</sup></Form.Label>
                                        <Form.Control type="text" name="" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12">
                                        <Form.Label>Giá phòng</Form.Label>
                                        <Form.Control type="text" name="" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12 electricity_money">
                                        <Form.Label>Tổng tiền điện</Form.Label>
                                        <Form.Control type="text" name="electricity_money" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12 water_money">
                                        <Form.Label>Tổng tiền nước</Form.Label>
                                        <Form.Control type="text" name="water_money" className=''/>
                                    </Form.Group>
                                    <Form.Group className="mb-12 all_money">
                                        <Form.Label>Tổng tiền phòng</Form.Label>
                                        <Form.Control type="text" name="all_money" className=''/>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="primary">
                                Cập nhật
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        {/* end edit bill */}
                   </div>
                </div>                       <div className='row dataline'>
        
        <div className='col-md-4 dataline'>
          <Pie data={dataPie} />
        </div>
      </div>       
        </div>
        
    </div>
  )
}

export default ListManageRoom