import React from 'react';
import { Button, Form } from 'react-bootstrap';

function ConfirmPost() {
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2 className="b_title">Xác nhận đăng tin</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="manage">
            <div className="container">
                <div className="">
                    <div className="">
                        <div className='confirm_post'>
                            <h1 style={{textAlign:"center"}}>Vui lòng xác nhận danh tính của bạn</h1>
                            <p>Hoạt động gần đây có thể ảnh hưởng đến khả năng bảo mật tài khoản của bạn. Vì vậy, nếu muốn đăng tin về việc cho thuê phòng. Thì bạn phải đồng ý với các điều khoản cửa chúng tôi.</p>
                            <div style={{display:"flex"}}>
                                <input style={{ border: "1px solid #0D3380" }} type="checkbox" className=""/>
                                <h4 style={{ color: "black", marginLeft:"5px", marginTop:"5px" }}> Ghi nhớ </h4>
                            </div>
                            <Button variant="primary" type="submit">
                                Gửi
                            </Button>
                            {/* <Form>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Tôi đồng ý" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Gửi
                                </Button>
                            </Form> */}
                        </div>
                    </div>
                </div> 
            </div> 
        </div> 
    </>
  )
}

export default ConfirmPost