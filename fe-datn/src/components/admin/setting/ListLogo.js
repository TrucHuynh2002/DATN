import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListLogo() {

  const [listLogo, setListLogo] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  // list banner
  const getData = async () => {
   const result = await axios.get("http://127.0.0.1:8000/api/config");
  setListLogo(result.data.data);
  };

  return (
    <>
      <Table bordered>
        <thead>
        <tr>
            <th></th>
            <th></th>
        </tr>
        </thead>
        <tbody className="list-cate">                  
            <tr style={{'background': 'black'}}>
              <td>
                <div>
                <img src={listLogo.logo} alt="images"  />
                </div>
              </td>
                <td>
                    <Link to="setting/1" className="bx bxs-edit btn-edit btn btn-primary">
                    </Link>
                </td>
              </tr>  
        </tbody>
      </Table>
    </>
  )
}

export default ListLogo