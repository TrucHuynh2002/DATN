import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { url } from '../../url';
import { TabTitle } from '../../title';
import HashLoader from "react-spinners/HashLoader";

function ListLogo() {
  TabTitle('Logo');
  const [loading, setLoading] = useState(false);
  const [listLogo, setListLogo] = useState([]);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    getData()
  },[]);
  const getData = async () => {
   const result = await axios.get(`${url}/config`);
  setListLogo(result.data.data);
  };

  return (
    <>
      {loading ? 
        <HashLoader className='' style={{marginTop:"500px"}}
        color={'#0d3380'}
        loading={loading}
        size={100}
        />
        :
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
      }
    </>
  )
}

export default ListLogo