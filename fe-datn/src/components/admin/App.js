import React, {useEffect} from 'react'
import { Container, Row } from 'react-bootstrap';
import { Outlet, navigator, useNavigate } from 'react-router-dom';
import NavAdmin from './NavAdmin';
import HeaderAdmin from './HeaderAdmin';
import FooterAdmin from './FooterAdmin';
import axios from 'axios';

function App() {
  const navigate = useNavigate();
  const checkAdmin = async () => {
    const get_user = JSON.parse(localStorage.getItem('user'));
    const res = await axios.get("http://127.0.0.1:8000/api/user/show/"+get_user[0].id);
    if(!get_user){
      if(res.data.status == true){
        const user_data = res.data.data;
        console.log(user_data); 
        if(user_data.role == 0){
          navigate('/');
        }
      }else{
        navigate('/');
      }
    }else{
      navigate('/');
    }
   
  }
    // console.log(get_user[0].id)
    
    // const id_user = get_user[0].id
    // console.log(id_user)

      // if(get_user){
    //   if(get_user[0].role == 0 ){
    //     navigate('/');
    //   }
    // }
  
  useEffect(() => {

    checkAdmin();

    
   
  },[])
  return (
    <>
      <Container fluid>
        <Row>
          {/* header */}
          <HeaderAdmin />
          {/* menu */}
          <NavAdmin />
          {/* content */}
          <Outlet />
          <FooterAdmin />
        </Row>
      </Container>

    </>
  );
}

export default App;
