import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function AddRoomType() {

    // const navigate = useNavigate();
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
        const res = await axios.post('http://127.0.0.1:8000/api/roomType/create', addRoomType);
        console.log(res);
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
            // console.log(alert.err_list.messages.name[0])
        }
        // navigate("../list_furniture");
    };

  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm loại phòng</h1>
            <Form onSubmit={(e) => handleSumbit(e)}>
                <Form.Group className="mb-3" controlId="name_room_type">
                    <Form.Label>Tên loại phòng</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="name_room_type" 
                    value={name_room_type}
                    className=''
                    onChange={(e) => handleChange(e)}/>
                    {alert.err_list.status === false && <span className="error">{alert.err_list.messages.name[0]}</span>}
                </Form.Group>
                
                <div className="d-grid gap-2">
                    {alert.err_list.status === true && <span className="noti">Thêm thành công</span>}
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