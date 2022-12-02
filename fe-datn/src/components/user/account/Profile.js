import InfoAccount from './InfoAccount'
import Posted from './Posted';
import Bloged from './Bloged';
import { useParams } from 'react-router-dom';
import React, {useEffect} from 'react'
import { Container, Row } from 'react-bootstrap';
import { Outlet, useNavigate} from 'react-router-dom';
function Profile() {
    const navigate = useNavigate();
    const {id_post} = useParams();
    const checkAdmin = async () => {
        // console.log(get_user)
      if(!id_post){
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
                        <div className="title">
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