import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { url } from '../../url';
import { TabTitle } from '../../title';

function BannerConfig() {
  TabTitle('Banner');
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
     const result = await axios.get(`${url}/banner/show`);
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
              <td>  <div><img src={banner.link_img_banner} alt={banner.name_banner} /></div></td>
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