import React from 'react';
import ListManageRoom from './ListManageRoom';
function LayoutManage() {
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title">
                            <h2 className="b_title">Quản lý phòng</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="manage">
            <div className="container">
                <ListManageRoom  />
            </div>
        </div> 
    </>
  )
}

export default LayoutManage