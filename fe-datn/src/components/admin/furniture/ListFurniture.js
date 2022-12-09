import React from 'react'
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../user/Pagination';

function ListFurniture() {

  const [listFurniture, setListFurniture] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(10);

  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listFurniture.slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    getData();
  },[]);

  // danh sach furniture
  const getData = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/furniture/show');  
      setListFurniture(res.data.data);
  };

  // xoa
  const deleteFurniture = async (id_furniture) => {
    await axios.delete(`http://127.0.0.1:8000/api/furniture/delete/${id_furniture}`);
    getData();
  };

  return (
    <div className="content">
    <div className="add-post">
      <h1 className="content_h1_admin">Danh sách nội thất</h1>
      <Link to="../add_furniture" className="btn btn-primary form-add">Thêm nội thất</Link>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên nội thất</th>
            <th>Icons</th>
            <th></th>
          
          </tr>
        </thead>
        <tbody className='list'>
            {currentPosts.map((furn, index) => {
              return(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{furn.name}</td>
                <td><div className={furn.icon}></div></td>
                <td>
                  <Link to={`../edit_furniture/${furn.id_furniture}`} className="bx bxs-edit btn-edit btn btn-primary"></Link>
                  <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deleteFurniture(furn.id_furniture)}></Button>
                </td>
              </tr>
              );
            })}
        </tbody>
    </Table>
      {/* phan trang */}
      <Pagination totalPost={listFurniture.length} 
      postsPerPage={postsPerPage} 
      setCurrentPage={setCurrentPage}
      currentPage={currentPage} />
      </div>             
    </div>
  )
}

export default ListFurniture