import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InfoAccount from './InfoAccount';
import Posted from './Posted';
import { TabTitle } from '../../title';

function Profile() {
  TabTitle('Thông tin tài khoản');
    const navigate = useNavigate();
    const {id_user} = useParams();
    const checkAdmin = async () => {
      if(!id_user){
        navigate('/Loi');
      }
    }
    useEffect(() => {
      checkAdmin();
    },[])
  return (
    <>
        <div className="back_re">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title" >
                            <h2 className="b_title">Thông tin cá nhân</h2>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div className="contact">
            <div className="container">
                <div className="content_profile">
                    <div className="list-post"> <InfoAccount /></div>
                    <div className="list-post"> <Posted /></div>
                </div>
            </div>
        </div>
        
    </>    
  )
}

export default Profile