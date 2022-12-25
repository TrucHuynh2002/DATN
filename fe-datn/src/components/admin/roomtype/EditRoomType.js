import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { url } from '../../url';

function EditRoomtype() {

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
      const res = await axios.put(`${url}/roomType/update/${id_room_type}`, editRoomType);
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

  useEffect(() => {
    loadRoom();
}, []);

  const loadRoom = async () => {
      const result = await axios.get(`${url}/roomType/show/${id_room_type}`);
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
                    {alert.err_list.status === false && <div className="notice warning_____">{alert.err_list.messages.name_room_type[0]}</div>}
                </Form.Group>
                
                <div className="d-grid gap-2">
                    {alert.err_list.status === true && <div className="notice success_____">Cập nhật thành công</div>}
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