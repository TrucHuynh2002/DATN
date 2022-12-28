import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { url } from '../../url';
import { TabTitle } from '../../title';

function AddRoomType() {
    TabTitle('Thêm loại phòng');
    const [addRoomType, setAddRoomType] = useState({
        name_room_type: "",
    });

    // xu ly loi
    const [alert, setAlert] = useState({
        err_list: {},
    });

    const { name_room_type } = addRoomType;

    const handleChange = (e) => {
        setAddRoomType({ ...addRoomType, [e.target.name]: e.target.value});
    };

    const handleSumbit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${url}/roomType/create`, addRoomType);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
            });
        }
        else {           
            setAlert({
                err_list: res.data
            });
        }
    };

  return (
    <div className="content">
        <div className="add-post">
            <h1 className="content_h1_admin">Thêm loại phòng</h1>
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
                    {alert.err_list.status === true && <div className="notice success_____">Thêm thành công</div>}
                    <Button variant="primary" size="sm" name='' type="submit">
                        Thêm loại phòng
                    </Button>
                </div>
            </Form>
       </div>
    </div>
  )
}

export default AddRoomType