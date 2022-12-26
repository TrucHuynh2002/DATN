import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { url } from '../../url';

function ListLogo() {

  const [listLogo, setListLogo] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  // list banner
  const getData = async () => {
   const result = await axios.get(`${url}/config`);
  setListLogo(result.data.data);
  };

  return (
    <>
    {/* start search */}
    <form>
      <div className='row'>
          <input className="form-control search_blog" placeholder="Tìm kiếm" type="text" name="" />
          <div className="btn-search col-1">
            <button className="btn btn-outline-secondary">
              <i className='bx bx-search' style={{color:"#0d3380"}}></i>
            </button>
          </div>
      </div>
    </form>
    {/* end search */}
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