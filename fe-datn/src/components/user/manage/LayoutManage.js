import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListManageRoom from './ListManageRoom';
import { url } from '../../url';
import { TabTitle } from '../../title';

function LayoutManage() {
  TabTitle('Quản lý phòng - Nhà Tui.com');
    const navigate = useNavigate();
    const checkManage = async () => {
        const get_user = JSON.parse(localStorage.getItem('user'));
        if(get_user){
          const res = await axios.get(`${url}/user/show/`+get_user[0].id);
          if(res.data.status === true){
            const user_data = res.data.data;
            if(user_data[0].role != 1){

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
            <div className="container-fluid">           
              <ListManageRoom  />
            </div>            
        </div>        
    </>
  )
}

export default LayoutManage