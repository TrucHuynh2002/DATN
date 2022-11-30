import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BannerConfig() {
  const [Listbanner, setListbanner] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  // list banner
  const getData = async () => {
   const result = await axios.get("http://127.0.0.1:8000/api/banner/show/");
  //  console.log(result);
  setListbanner(result.data.data);
  };

  return (
    <>
  <h1>banner</h1>
      <Table bordered>
        <thead>
        <tr>
            <th>#</th>
            <th></th>
            <th></th>
        </tr>
        </thead>
        <tbody className="list-cate"> 
        {Listbanner.map((a, index) => {         
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