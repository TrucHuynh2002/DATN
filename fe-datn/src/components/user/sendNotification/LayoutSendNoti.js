import React from 'react';
import ListSendNoti from './ListSendNoti';
import { TabTitle } from '../../title';

function LayoutSendNoti() {
    TabTitle('Quản lý gửi yêu cầu - Nhà Tui.com');
  return (
    <>
       <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2 className="b_title">Quản lý gửi yêu cầu</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="manage">
            <div className="container-fluid">           
                <ListSendNoti />
            </div>            
        </div> 
    </>
  )
}

export default LayoutSendNoti