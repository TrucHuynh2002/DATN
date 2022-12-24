import React, {useState,useEffect} from 'react'
import { url } from '../../url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function LoginGoogle() {
    const navigate = useNavigate();
    useEffect(() => {
        handleLoginGoogle()
    })
    const [loginGoogle, setLoginGoogle] = useState('');
    const handleLoginGoogle = async (e) => {
        const google = await axios.get(`${url}/auth/google/callback${window.location.search}`);
        
        console.log(google.data)
        if(google.data.status === true){
            var user = JSON.parse(localStorage.getItem('user'));
            if(user == null){
                user =[];
            
                user.push({
                    id:google.data.data.id_user,
                    phone:google.data.data.phone,
                    password:google.data.data.password,
                    fullname:google.data.data.full_name,
                    email:google.data.data.email,
                    address:google.data.data.address,
                    role:google.data.data.role,
                })             
            }
            localStorage.setItem("user", JSON.stringify(user));
            let item = user.find(items => items.id == google.data.data.id_user);
            if (item.role == 0 || item.role == 1) {
                navigate("../");
            } else {
                navigate("/admin");
            }
        }
        // console.log(123)
    }

    console.log(window.location.search)
  return (
    <div>Loading</div>
  )
}

export default LoginGoogle