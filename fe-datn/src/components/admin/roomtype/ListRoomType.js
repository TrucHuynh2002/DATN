import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

function ListRoomType() {

  const id_room_type = useParams();

  const [listRoomType, setListRoomType] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  // danh sach roomtype
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/roomType/show');
   console.log(res);
   setListRoomType(res.data.data);
  };

  // xoa category
  const deleteRoomType = async (id_room_type) => {
    await axios.delete(`http://127.0.0.1:8000/api/roomType/delete/${id_room_type}`);
    getData();
  };

  return (
    <div className="content">
            <div className="add-post">
              <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách loại phòng</h1>
              <Link to="../add_roomtype" className="btn btn-primary form-add">Thêm loại phòng</Link>
              <Table bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tên loại phòng</th>
                    <th></th>
                </tr>
                </thead>
             
                <tbody className="list-cate">                 
                {listRoomType.map((room, index) => {
                    return (     
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{room.name_room_type}</td>
                        <td>
                            <Link to={`../edit_roomtype/${room.id_room_type}`} className="bx bxs-edit btn-edit btn btn-primary">
                              {/* <Button variant="outline-primary" name='' className="bx bxs-edit btn-edit"></Button> */}
                            </Link>
                            {/* <Link className=" btn btn-danger bx bxs-trash" onClick={() => 
                              deleteCategory(cate.id_category)}> */}
                              <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deleteRoomType(room.id_room_type)}></Button>
                            {/* </Link> */}
                        </td>
                      </tr>  
                    );     
                })}
                </tbody>
              </Table>
            </div>
    </div>
  )
}

export default ListRoomType