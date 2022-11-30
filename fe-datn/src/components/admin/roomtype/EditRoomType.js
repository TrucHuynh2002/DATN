import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function EditRoomtype() {

  // const navigate = useNavigate();
  const {id_room_type} = useParams();
  const [editRoomType, setEditRoomType] = useState({
    name_room_type: "",
});

  // xu ly loi
  const [alert, setAlert] = useState({
      err_list: {},
  });

  const { name_room_type } = editRoomType;

  const handleChange = (e) => {
    setEditRoomType({ ...editRoomType, [e.target.name]: e.target.value});
  };

  const handleSumbit = async (e) => {
      e.preventDefault();
      const res = await axios.put(`http://127.0.0.1:8000/api/roomType/update/${id_room_type}`, editRoomType);
    //   console.log(res);
      if(res.data.status === true){
          setAlert({
              err_list: res.data
          });
          console.log(alert.err_list)
      }
      else{           
          setAlert({
              err_list: res.data
          });
      }
      // navigate("../list_furniture");
  };

  useEffect(() => {
    loadRoom();
}, []);

  const loadRoom = async () => {
      const result = await axios.get(`http://127.0.0.1:8000/api/roomType/show/${id_room_type}`);
      // console.log(result)
      setEditRoomType(result.data.data);
  };

  return (
    <div className="content">
        <div className="add-post">
            <h1 className="content_h1_admin">Cập nhật loại phòng</h1>
            <Form onSubmit={(e) => handleSumbit(e)}>
                <Form.Group className="mb-3" controlId="name_room_type">
                    <Form.Label>Tên loại phòng</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="name_room_type" 
                    value={name_room_type}
                    className=''
                    onChange={(e) => handleChange(e)}/>
                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.name_room_type[0]}</span>}
                </Form.Group>
                
                <div className="d-grid gap-2">
                    {alert.err_list.status === true && <span className="noti">Cập nhật thành công</span>}
                    <Button variant="primary" size="sm" name='' type="submit">
                        Cập nhật loại phòng
                    </Button>
                </div>
            </Form>
       </div>
    </div>
  )
}

export default EditRoomtype