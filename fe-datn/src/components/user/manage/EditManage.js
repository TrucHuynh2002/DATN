import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { url } from '../../url';

function EditManage({id_roomNumber}) {
    useEffect(() => {
      if (id_roomNumber){
         getData() };
    },[]);
    const [alert, setAlert] = useState({
        err_list: {},
    });
    const [listEditMomneyWater, setEditMomneyWater] = useState(0);
    const [listEditMomneyRoom, setEditMomneyRoom] = useState(0);
    const [listEditMomneyElc, setEditMomneyElc] = useState(0);
    const [listEditBill, setEditBill] = useState([]);
    const [InputEdit, setInputEdit] = useState({
        electricity_month_edit : "",
        water_month_edit : "",
    });
    const {electricity_month_edit ,water_month_edit } = InputEdit;
      // láy giá tri edit
      const handleChangeEditInputWater = async (e) => {
      
        setInputEdit({...InputEdit,[e.target.name]: e.target.value})
        setEditMomneyWater(e.target.value * listEditBill[0].water_price)
        setEditMomneyRoom(Number(e.target.value)  + Number(listEditMomneyElc) + Number(listEditBill[0].room_price))
    }
    const handleChangeEditInputElc = async (e) => {

        setInputEdit({...InputEdit,[e.target.name]: e.target.value})
        setEditMomneyElc(e.target.value * listEditBill[0].electricity_price)
        setEditMomneyRoom(Number(listEditMomneyWater) + Number(e.target.value) + Number(listEditBill[0].room_price))
    }
    // danh sách hóa đơn 
    const [showBill, setShowBill] = useState([]);
    const getData = async (e) =>{
        const id = id_roomNumber
        const res = await axios.get(`${url}/bill/show_id/${id}`); 
        setShowBill(res.data.data);
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
  // show edit bill
  const [showEditBill, setShowEditBill] = useState(false);
  const handleCloseEditBill = () => setShowEditBill(false);
  const handleShowEditBill = async (e,id) => {
      setShowEditBill(true)
      const res = await axios.get(`${url}/bill/show/${id}`); 
      setEditBill(res.data.data);
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
  const handleSumbitEditBill = async(e,id) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('water_money_edit', listEditMomneyWater);
    formData.append('electricity_money_edit', listEditMomneyElc);
    formData.append('all_money_edit', listEditMomneyRoom);
    const res = await axios.post(`${url}/bill/update/${id}?_method=PUT`,formData);
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
    <div className="list-post" >                
        <div className="row">
            <div className="col-md-12">
                <h3 className="b_title">Danh sách hóa đơn</h3>
            </div>
            <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Người sở hữu</th>
                        <th>Tiền điện</th>
                        <th>Tiền nước</th>
                        <th>Tổng hóa đơn</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="list-cate">       
                {showBill.map((list,index) =>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{list.full_name}</td>
                            <td>{list.water_money}</td>
                            <td>{list.electricity_money}</td>                        
                            <td>{list.all_money}</td>
                            <td>{list.created_at}</td>
                            <td>{list.updated_at}</td>
                            <td>
                                <Button id="edit_bill_button" onClick={(e) => handleShowEditBill(e,list.id)} className="bx bxs-edit btn-edit btn btn-primary"></Button>            
                            </td>
                            <td>
                                <Button variant="outline-danger" name='' className="bx bxs-trash"></Button>
                            </td>
                        </tr>  
                    );
                })}             
                </tbody>
            </Table>
        </div>
        <Modal show={showEditBill} onHide={handleCloseEditBill}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật hóa đơn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {listEditBill.map((bill,index) => {
                    return ( 
                        <>
                            <Form onSubmit={(e) => handleSumbitEditBill(e,bill.id)} key={index}>
                                <Form.Group className="mb-12">
                                    <Form.Label>Tên phòng</Form.Label>
                                    <Form.Control type="text" disable="true" value={bill.post_name}/>
                                </Form.Group>
                                <Form.Group className="mb-12">
                                    <Form.Label>Người sở hữu</Form.Label>
                                    <Form.Control type="text" disable="true" value={bill.id_user}/>
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
                                    name="water_month_edit"
                                    value={water_month_edit}
                                    placeholder="Vui lòng nhập số nước tiêu thụ trên 1 tháng" required 
                                    onChange = {(e) => handleChangeEditInputWater(e)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-12">
                                    <Form.Label>Số điện tiêu thụ / 1 tháng</Form.Label>
                                    <Form.Control type="number" 
                                    name="electricity_month_edit"
                                    value={electricity_month_edit}
                                    placeholder="Vui lòng nhập số điện tiêu thụ trên 1 tháng" required 
                                    onChange = {(e) => handleChangeEditInputElc(e)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-12 water_money">
                                    <Form.Label>Tổng tiền nước</Form.Label>
                                    <Form.Control type="text" 
                                    disable="true"
                                    value={ listEditMomneyWater ? listEditMomneyWater : bill.water_money}
                                    name="water_money_edit" 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-12 electricity_money">
                                    <Form.Label>Tổng tiền điện</Form.Label>
                                    <Form.Control type="text" 
                                    name="electricity_money_edit"
                                    disable="true" 
                                    value={listEditMomneyElc ? listEditMomneyElc  : bill.electricity_money}

                                    />
                                </Form.Group>
                                <Form.Group className="mb-12 all_money">
                                    <Form.Label>Tổng tiền phòng</Form.Label>
                                    <Form.Control 
                                    name="all_money_edit" 
                                    disable="true" 
                                    value={listEditMomneyRoom ? listEditMomneyRoom  : bill.all_money}
                                    />
                                </Form.Group>
                                <Button type="submit">Cập nhật</Button>
                            </Form>
                        </> 
                    );
                })}
            </Modal.Body>
        </Modal>
    </div> 
  )
}

export default EditManage