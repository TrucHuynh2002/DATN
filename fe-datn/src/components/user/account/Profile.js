import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InfoAccount from './InfoAccount';
import Posted from './Posted';
import { TabTitle } from '../../title';
import HashLoader from "react-spinners/HashLoader";

function Profile() {
  TabTitle('Thông tin tài khoản');
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id_user} = useParams();
    const checkAdmin = async () => {
      if(!id_user){
        navigate('/Loi');
      }
    }
    useEffect(() => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      checkAdmin();
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
      }
    </>    
  )
}

export default Profile