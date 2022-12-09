import React from 'react';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BannerConfig() {

  const [listBanner, setListBanner] = useState([])
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
      
        <tbody className="list-cate">
          {listBanner.map((banner,index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <img src={banner.link_img_banner} alt={banner.name_banner} />
                <td>
                    <Link to={`editBanner/${banner.id_banner_config}`} className="bx bxs-edit btn-edit btn btn-primary">
                    </Link>
                </td>
              </tr>  
            );            
          })}                             
        </tbody>
      </Table>
    </>
  )
}

export default BannerConfig