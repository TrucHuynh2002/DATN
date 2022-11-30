import React from 'react';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BannerConfig() {

  const [listBanner, setListBanner] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  // list banner
  const getData = async () => {
   const result = await axios.get("http://127.0.0.1:8000/api/banner/show");
  //  console.log(result);
  setListBanner(result.data.data);
  };

  return (
    <>
      <Table >
        {listBanner.map((banner, index) => {
            return (     
            <tr key={index}>
                <td>{index+1}</td>
                <img src={banner.link_img_banner} alt="images" style={{width:'100px',height:'70px',margin:"20px"}}></img>
                <td>
                    <Link to={`../editBanner/${banner.id_banner_config}`} className="bx bxs-edit btn-edit btn btn-primary">
                    </Link>
                </td>
              </tr>  
            );     
        })}
      </Table>
    </>
  )
}

export default BannerConfig