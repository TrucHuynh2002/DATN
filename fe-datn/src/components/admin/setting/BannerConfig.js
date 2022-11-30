import React from 'react';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

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
              <div>
                 <img src={banner.link_img_banner} style={{width: "20%",height:"20%px"}}  alt="images"></img>
                  <Link  to={`../editBanner/${banner.id_banner_config}`} className="bx bxs-edit btn-edit btn btn-primary ">
                      {/* <Button variant="outline-primary" name='' className="bx bxs-edit btn-edit"></Button> */}
                  </Link>
              </div>
            );     
        })}
      </Table>
    </>
  )
}

export default BannerConfig