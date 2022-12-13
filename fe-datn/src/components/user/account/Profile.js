import React, {useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import InfoAccount from './InfoAccount'
import Posted from './Posted';
import Bloged from './Bloged';

function Profile() {
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
                        <div className="title" value="{tilte}">
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
                    <div className="list-post"> <Bloged /></div>
                </div>
            </div>
        </div>
    </>    
  )
}

export default Profile