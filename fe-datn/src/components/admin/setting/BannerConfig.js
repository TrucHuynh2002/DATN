import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

function BannerConfig() {
  const [uploadImages, setUploadImages] = useState([]);
  // console.log(uploadImages[0])
  const [oldImage,setOldImage] = useState([
  ]);
  console.log(oldImage);
  const [listBanner, setListBanner] = useState([])
  // console.log(listBanner);
  // xu ly loi
  const [alert, setAlert] = useState({
    err_list: {},
});

  useEffect(() => {
    getData();
  },[]);

  useEffect(() => {
    getData();
  },[]);
  
    // list banner
    const getData = async () => {
     const result = await axios.get(`http://127.0.0.1:8000/api/banner/show/`);
    //  console.log(result.data.data);
     setListBanner(result.data.data);
    };

//   const handleSumbit = async (e) => {
//     e.preventDefault();
//     let formData = new FormData();
//         // formData.append('img[]', Array(uploadImages));
//         for(let i = 0; i<uploadImages.length; i++) {
//             formData.append('banner[]',uploadImages[i])
//         }
//     const res = await axios.put("http://127.0.0.1:8000/api/config/update", formData);
//     // console.log(res)
//     if(res.data.status === true){
//         setAlert({
//             err_list: res.data
//         });
//         // console.log(alert.err_list)
//     }
//     else{           
//         setAlert({
//             err_list: res.data
//         });
//     }
//     // navigate("../list_category");
// };

  return (
    <>
      <Table bordered>
        <thead>
        <tr>
            <th>#</th>
            <th></th>
            <th></th>
        </tr>
        </thead>
        <tbody className="list-cate"> 
        {listBanner.map((a, index) => {         
            <tr key={index}>
                <td>{a.id_banner_config}</td>
                <img src={a.link_img_banner} alt="images" style={{width:'100px',height:'70px',margin:"20px"}} />
                <td>
                    <Link to={`editBanner/${a.id_banner_config}`} className="bx bxs-edit btn-edit btn btn-primary">
                    </Link>
                </td>
              </tr>
        })}
        </tbody>
      </Table>
    </>
  )
}

export default BannerConfig