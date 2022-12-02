import React from 'react';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BannerConfig() {

  const [listBanner, setListBanner] = useState([])
  // console.log(listBanner);
  // xu ly loi
  const [alert, setAlert] = useState({
    err_list: {},
});

  useEffect(() => {
    getDataBanner();
  },[]);
  
    // list banner
    const getDataBanner = async () => {
     const result = await axios.get("http://127.0.0.1:8000/api/banner/show");
    //  console.log(result.data.data);
     setListBanner(result.data.data);
    };

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
<<<<<<< HEAD
      
        <tbody className="list-cate">
          {listBanner.map((banner,index) => {
            return  <tr key={index}>
              <td>{index}</td>
              <img src={banner.link_img_banner} alt={banner.name_banner} style={{width:'100px',height:'70px',margin:"20px"}}></img>
              <td>
                  <Link to={`editBanner/${banner.id_banner_config}`} className="bx bxs-edit btn-edit btn btn-primary">
                  </Link>
              </td>
            </tr>  
          }) 
           
          }                  
            
=======
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
>>>>>>> c97b08b353d8b210abf3b1362e59b42d5b4b720c
        </tbody>
      </Table>
    </>
  )
}

export default BannerConfig