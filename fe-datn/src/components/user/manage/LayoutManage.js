import React, { useEffect } from 'react';
import ListManageRoom from './ListManageRoom';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
function LayoutManage() {
    const navigate = useNavigate();
    const checkManage = async () => {
        const get_user = JSON.parse(localStorage.getItem('user'));
          console.log(get_user)
        if(get_user){
          const res = await axios.get("http://127.0.0.1:8000/api/user/show/"+get_user[0].id);
          if(res.data.status === true){
            const user_data = res.data.data;
            if(user_data.role != 1){

              navigate('/Loi');
            }
          }
        }else{
          navigate('/Loi');
        }
      }
    useEffect(() => {
        checkManage();
    })
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