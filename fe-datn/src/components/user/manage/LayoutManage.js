import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListManageRoom from './ListManageRoom';
import { url } from '../../url';
import { TabTitle } from '../../title';
import HashLoader from "react-spinners/HashLoader";

function LayoutManage() {
  TabTitle('Quản lý phòng');
  const [loading, setLoading] = useState(false);
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
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      checkManage();
    },[]);

  return (
    <>
      {loading ? 
        <HashLoader className='css_loading'
        color={'#0d3380'}
        loading={loading}
        size={100}
        style={{display: 'inherit', position: 'relative', height: '100px', transform: 'rotate(165deg)'}}
        />
        :
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
      }
    </>
  )
}

export default LayoutManage