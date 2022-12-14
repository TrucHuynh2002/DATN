import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { url } from '../../url';
import { TabTitle } from '../../title';

function AddFurniture() {
    TabTitle('Thêm nội thất');
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
        const res = await axios.post(`${url}/furniture/create`, addFurniture);
        if(res.data.status === true){
            setAlert({
                err_list: res.data
            });
        }
        else{           
            setAlert({
                err_list: res.data
            });
        };
    };

  return (
    <>
        <div className="content">
            <div className="add-post">
                <h1 className="content_h1_admin">Thêm nội thất</h1>
                <Form onSubmit={(e) => handleSumbit(e)}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Tên nội thất</Form.Label>
                            <Form.Control 
                            type="text" 
                            name="name" 
                            value={name}
                            className=''
                            onChange={(e) => handleChange(e)}/>
                        </Form.Group>
                        { alert.err_list.status == false && alert.err_list.messages.name && <div className="notice warning_____">{alert.err_list.messages.name[0]}</div>} 
                        <Form.Group className="mb-3" controlId="icon">
                            <Form.Label>Icons</Form.Label>
                            <Form.Control
                            type="text"
                            name="icon" 
                            value={icon}
                            className=''
                            onChange={(e) => handleChange(e)}/>
                        </Form.Group>
                        { alert.err_list.status == false && alert.err_list.messages.icon && <div className="notice warning_____">{alert.err_list.messages.icon[0]}</div>}     
                    <div className="d-grid gap-2">
                        {alert.err_list.status === true && <div className="notice success_____">Thêm thành công</div>}
                        <Button variant="primary" size="sm" name='' type="submit">
                            Thêm nội thất
                        </Button>
                    </div>
                </Form>
        </div>
        </div>
    </>
  )
}

export default AddFurniture