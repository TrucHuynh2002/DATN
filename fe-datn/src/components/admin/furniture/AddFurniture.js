import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function AddFurniture() {

    // const navigate = useNavigate();
    const [addFurniture, setAddFurniture] = useState({
        name: "",
        icon: "",
    });

    const [alert, setAlert] = useState({
        err_list: {},
    });

    const { name, icon } = addFurniture;

    const handleChange = (e) => {
        setAddFurniture({ ...addFurniture, [e.target.name]: e.target.value});
    };

    const handleSumbit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData();
        dataForm.append('name',name);
        dataForm.append('icon',icon);
        const res = await axios.post('http://127.0.0.1:8000/api/furniture/create', addFurniture);
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
            <h1 className="content_h1_admin">Thêm nội thất</h1>
            <Form onSubmit={(e) => handleSumbit(e)}>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Tên nội thất</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="name" 
                        value={name}
                        className=''
                        onChange={(e) => handleChange(e)}/>
                            { alert.err_list.status == false && alert.err_list.messages.name &&
                                <div className="notice warning_____">{alert.err_list.messages.name[0]}</div>}                    
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="icon">
                        <Form.Label>Icons</Form.Label>
                        <Form.Control
                        type="text"
                        name="icon" 
                        value={icon}
                        className=''
                        onChange={(e) => handleChange(e)}/>
                            { alert.err_list.status == false && alert.err_list.messages.icon &&
                                <div className="notice warning_____">{alert.err_list.messages.icon[0]}</div>}                   
                    </Form.Group>
                </Col>
                
                <div className="d-grid gap-2">
                    {alert.err_list.status === true && <div className="notice success_____">Thêm thành công</div>}
                    <Button variant="primary" size="sm" name='' type="submit">
                        Thêm nội thất
                    </Button>
                </div>
            </Row>
            </Form>

       </div>
    </div>
  )
}

export default AddFurniture